import { Vector2D } from './physics/vector.js?v=3.0';
import { PhysicsEngine } from './physics/engine.js?v=3.0';
import { Pen, PEN_PRESETS } from './entities/pen.js?v=3.0';
import { Desk } from './entities/desk.js?v=3.0';
import { Obstacle } from './entities/obstacle.js?v=3.0';
import { SoundEngine } from './audio/sound.js?v=3.0';
import { BotAI, BOT_PERSONALITIES } from './ai/bot.js?v=3.0';
import { UIManager } from './game/ui.js?v=3.0';
import { CAMPAIGN_LEVELS } from './game/campaign.js?v=3.0';
import { TRICKSHOT_CHALLENGES } from './game/trickshots.js?v=3.0';
import { ClassroomIntro } from './classroom_intro.js?v=3.0';
import { ClassroomViewer } from './game/classroom_viewer.js?v=3.0';

// Polyfill for CanvasRenderingContext2D.roundRect if not supported in older browsers
if (typeof CanvasRenderingContext2D !== 'undefined' && !CanvasRenderingContext2D.prototype.roundRect) {
  CanvasRenderingContext2D.prototype.roundRect = function (x, y, w, h, r = 0) {
    if (typeof r === 'number') r = [r, r, r, r];
    const [tl, tr, br, bl] = r;
    this.moveTo(x + tl, y);
    this.lineTo(x + w - tr, y);
    this.quadraticCurveTo(x + w, y, x + w, y + tr);
    this.lineTo(x + w, y + h - br);
    this.quadraticCurveTo(x + w, y + h, x + w - br, y + h);
    this.lineTo(x + bl, y + h);
    this.quadraticCurveTo(x, y + h, x, y + h - bl);
    this.lineTo(x, y + tl);
    this.quadraticCurveTo(x, y, x + tl, y);
    return this;
  };
}

class PenFightGame {
  constructor() {
    this.canvas = document.getElementById('game-canvas');
    this.ctx = this.canvas.getContext('2d');

    this.physics = new PhysicsEngine();
    this.sound = new SoundEngine();
    this.desk = new Desk(window.innerWidth, window.innerHeight);
    this.intro = new ClassroomIntro(window.innerWidth, window.innerHeight);
    this.viewer = new ClassroomViewer(this);
    this.botAI = new BotAI('nerd');

    this.state = 'MENU'; // MENU, CLASSROOM_VIEW, INTRO_ZOOM, AIMING, SIMULATING, ROUND_OVER, GAME_OVER
    this.mode = 'BOT'; // BOT, TWO_PLAYER, CAMPAIGN, TRICKSHOT

    this.pens = [];
    this.obstacles = [];
    this.particles = [];

    this.currentTurn = 'p1'; // 'p1' or 'p2' / 'ai'
    this.scores = { p1: 0, p2: 0 };
    this.targetScore = 3; // First to 3 points wins ("দাইন দাইন তিন দাইন!")

    this.currentCampaignLevel = 1;
    this.currentTrickshotId = 1;
    this.trickshotsRemaining = 1;

    // Drag Aiming State
    this.isDragging = false;
    this.dragStart = new Vector2D();
    this.dragCurrent = new Vector2D();
    this.dragTouchPoint = null;
    this.selectedPen = null;

    // Screen Shake
    this.shakeAmount = 0;

    // Timing
    this.lastTime = performance.now();

    this.ui = new UIManager(this);

    this.initCanvas();
    this.bindInputs();
    this.startLoop();

    // Show initial menu with classroom background
    this.ui.showMainMenu();
  }

  initCanvas() {
    this.resizeCanvas();
    window.addEventListener('resize', () => this.resizeCanvas());
  }

  resizeCanvas() {
    const dpr = window.devicePixelRatio || 1;
    this.width = window.innerWidth;
    this.height = window.innerHeight;

    this.canvas.width = this.width * dpr;
    this.canvas.height = this.height * dpr;
    this.canvas.style.width = `${this.width}px`;
    this.canvas.style.height = `${this.height}px`;

    this.ctx.scale(dpr, dpr);
    this.desk.resize(this.width, this.height);
    this.intro.resize(this.width, this.height);
  }

  openClassroomTour() {
    this.ui.hideAllModals();
    this.viewer.openTour();
  }

  bindInputs() {
    // Global audio unlocker: starts loud classroom chatter on first touch anywhere
    const unlockAudio = () => {
      this.sound.init();
      this.sound.resume();
    };
    window.addEventListener('click', unlockAudio, { passive: true });
    window.addEventListener('touchstart', unlockAudio, { passive: true });
    window.addEventListener('keydown', unlockAudio, { passive: true });
    window.addEventListener('pointerdown', unlockAudio, { passive: true });

    const onPointerDown = (e) => {
      this.sound.init(); // Initialize audio & start classroom murmur ambience
      this.sound.resume();
      const pos = this.getPointerPos(e);

      if (this.state === 'CLASSROOM_VIEW') {
        this.viewer.handlePointerClick(pos);
        return;
      }

      if (this.state !== 'AIMING') return;

      const activePen = this.getActivePen();
      if (!activePen || activePen.isFalling || activePen.isOffDesk) return;

      const distToPen = activePen.pos.dist(pos);
      // Generous responsive touch radius (distance to center or anywhere along the pen)
      if (distToPen < activePen.length + 80) {
        this.isDragging = true;
        this.dragStart.copy(pos);
        this.dragCurrent.copy(pos);
        this.dragTouchPoint = pos.clone();
        this.selectedPen = activePen;
      }
    };

    const onPointerMove = (e) => {
      const pos = this.getPointerPos(e);

      if (this.state === 'CLASSROOM_VIEW') {
        this.viewer.handlePointerMove(pos);
        // 3D Parallax Tilt based on cursor position
        this.intro.targetPanX = (pos.x / this.width - 0.5) * 30;
        this.intro.targetPanY = (pos.y / this.height - 0.5) * 16;
        return;
      }

      if (!this.isDragging) return;
      this.dragCurrent.copy(pos);
    };

    const onPointerUp = (e) => {
      if (!this.isDragging) return;
      this.isDragging = false;

      if (this.selectedPen && this.state === 'AIMING') {
        const pullVector = Vector2D.sub(this.dragStart, this.dragCurrent);
        const pullMag = pullVector.mag();

        if (pullMag > 8) {
          const powerRatio = Math.min(1.0, pullMag / 160);
          const forceMag = powerRatio * this.selectedPen.maxPower;
          const forceVector = pullVector.clone().normalize().mult(forceMag);

          this.selectedPen.applyFlick(forceVector, this.dragTouchPoint);
          this.sound.playFlick(powerRatio);

          this.createFlickBurst(this.selectedPen.pos, forceVector);

          this.state = 'SIMULATING';
          this.simulationTimer = 0;
        }
      }
      this.selectedPen = null;
    };

    // Unified Pointer Events (handles Mouse, Stylus, and Multi-touch cleanly)
    this.canvas.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);

    // Window-level fallback click dispatcher for Classroom Tour hotspots
    window.addEventListener('pointerdown', (e) => {
      if (this.state === 'CLASSROOM_VIEW') {
        const target = e.target;
        if (target && (target.closest('.btn-tour-action') || target.closest('.btn-close-modal') || target.closest('.modal-card') || target.closest('#hud'))) {
          return;
        }
        const pos = this.getPointerPos(e);
        this.viewer.handlePointerClick(pos);
      }
    });
  }

  getPointerPos(e) {
    const rect = this.canvas.getBoundingClientRect();
    const clientX = e.clientX !== undefined ? e.clientX : (e.touches && e.touches[0] ? e.touches[0].clientX : 0);
    const clientY = e.clientY !== undefined ? e.clientY : (e.touches && e.touches[0] ? e.touches[0].clientY : 0);
    return new Vector2D(clientX - rect.left, clientY - rect.top);
  }

  getActivePen() {
    if (this.mode === 'TRICKSHOT') {
      return this.pens[0];
    }
    if (this.currentTurn === 'p1') {
      return this.pens[0];
    } else {
      return this.mode === 'TWO_PLAYER' ? this.pens[1] : null;
    }
  }

  triggerMatchStartWithZoom(startMatchFn) {
    this.viewer.closeTour();
    const hud = document.getElementById('hud');
    if (hud) hud.style.display = 'flex';
    this.sound.init();
    this.sound.playSchoolBell();
    this.state = 'AIMING';
    startMatchFn();
  }

  startQuickMatch(p1Preset = 'matador_alltime', p2Preset = 'pilot_bp1_rt', isTwoPlayer = false, botPersonality = 'nerd') {
    this.triggerMatchStartWithZoom(() => {
      this.mode = isTwoPlayer ? 'TWO_PLAYER' : 'BOT';
      this.botAI.setPersonality(botPersonality);
      this.scores = { p1: 0, p2: 0 };
      this.targetScore = 3; // First to 3 points
      this.obstacles = [];

      this.resetRoundPens(p1Preset, p2Preset);
      this.state = 'AIMING';
      this.currentTurn = 'p1';

      this.updateHUDText();

      if (!isTwoPlayer) {
        const dialogue = this.botAI.getRandomDialogue(this.ui.lang);
        this.ui.showDialogue(this.botAI.personality.nameBN, dialogue, 3200);
      }
    });
  }

  startCampaignLevel(levelId) {
    this.triggerMatchStartWithZoom(() => {
      this.mode = 'CAMPAIGN';
      this.currentCampaignLevel = levelId;
      const lvl = CAMPAIGN_LEVELS.find(l => l.id === levelId) || CAMPAIGN_LEVELS[0];

      this.botAI.setPersonality(lvl.opponentId);
      this.scores = { p1: 0, p2: 0 };
      this.targetScore = lvl.winScore || 3;

      this.setupLevelObstacles(lvl.obstacles);
      this.resetRoundPens(lvl.playerPenId || this.ui.selectedPlayer1Pen, lvl.opponentPenId);
      this.state = 'AIMING';
      this.currentTurn = 'p1';

      this.updateHUDText();

      const isBn = this.ui.lang === 'bn';
      this.ui.showToast(isBn ? lvl.titleBN : lvl.titleEN, 3000);
    });
  }

  startTrickshot(challengeId) {
    this.triggerMatchStartWithZoom(() => {
      this.mode = 'TRICKSHOT';
      this.currentTrickshotId = challengeId;
      const ch = TRICKSHOT_CHALLENGES.find(c => c.id === challengeId) || TRICKSHOT_CHALLENGES[0];

      this.trickshotsRemaining = ch.maxShots;
      this.obstacles = [];
      this.pens = [];

      const bounds = this.desk.getPlayableBounds();
      const bw = bounds.maxX - bounds.minX;
      const bh = bounds.maxY - bounds.minY;

      // 1. Setup static obstacles first
      this.setupLevelObstacles(ch.obstacles);

      // 2. Setup player pen
      const px = bounds.minX + ch.playerPosRel.x * bw;
      const py = bounds.minY + ch.playerPosRel.y * bh;
      const playerPenId = this.ui.selectedPlayer1Pen || ch.playerPenId || 'matador_allrounder';
      const playerPen = new Pen(playerPenId, px, py, ch.playerPosRel.angle, 'player1');
      this.pens.push(playerPen);

      // 3. Setup targets (eraser targets, target pens)
      ch.targets.forEach((tgt) => {
        const tx = bounds.minX + tgt.xRel * bw;
        const ty = bounds.minY + tgt.yRel * bh;

        if (tgt.type === 'eraser_target') {
          const obs = new Obstacle('eraser', tx, ty, tgt.width, tgt.height, tgt.angle, true);
          obs.isTarget = true;
          this.obstacles.push(obs);
        } else if (tgt.type === 'pen_target') {
          const targetPen = new Pen(tgt.presetId, tx, ty, tgt.angle, 'target');
          this.pens.push(targetPen);
        }
      });

      this.state = 'AIMING';
      this.currentTurn = 'p1';
      this.updateHUDText();

      const isBn = this.ui.lang === 'bn';
      this.ui.showToast(isBn ? ch.titleBN : ch.titleEN, 3000);
    });
  }

  setupLevelObstacles(obsList = []) {
    this.obstacles = [];
    const bounds = this.desk.getPlayableBounds();
    const bw = bounds.maxX - bounds.minX;
    const bh = bounds.maxY - bounds.minY;

    for (const o of obsList) {
      const x = bounds.minX + o.xRel * bw;
      const y = bounds.minY + o.yRel * bh;
      const obs = new Obstacle(o.type, x, y, o.width, o.height, o.angle);
      this.obstacles.push(obs);
    }
  }

  resetRoundPens(p1Preset = 'matador_alltime', p2Preset = 'pilot_bp1_rt') {
    this.pens = [];
    const bounds = this.desk.getPlayableBounds();
    const bw = bounds.maxX - bounds.minX;
    const bh = bounds.maxY - bounds.minY;

    // Left side (Player 1) vs Right side (Player 2 / Bot) facing each other across the long horizontal bench
    const p1 = new Pen(
      p1Preset,
      bounds.minX + bw * 0.22,
      bounds.minY + bh * 0.52,
      0,
      'player1'
    );

    const p2 = new Pen(
      p2Preset,
      bounds.minX + bw * 0.78,
      bounds.minY + bh * 0.48,
      Math.PI,
      this.mode === 'TWO_PLAYER' ? 'player2' : 'ai'
    );

    this.pens.push(p1, p2);
  }

  restartCurrentMode() {
    if (this.mode === 'CAMPAIGN') {
      this.startCampaignLevel(this.currentCampaignLevel);
    } else if (this.mode === 'TRICKSHOT') {
      this.startTrickshot(this.currentTrickshotId);
    } else {
      this.startQuickMatch(
        this.ui.selectedPlayer1Pen,
        this.ui.selectedPlayer2Pen,
        this.mode === 'TWO_PLAYER',
        this.botAI.personality.id
      );
    }
  }

  nextCampaignLevel() {
    if (this.mode === 'TRICKSHOT') {
      if (this.currentTrickshotId < TRICKSHOT_CHALLENGES.length) {
        this.startTrickshot(this.currentTrickshotId + 1);
      } else {
        this.ui.showMainMenu();
      }
    } else if (this.currentCampaignLevel < CAMPAIGN_LEVELS.length) {
      this.startCampaignLevel(this.currentCampaignLevel + 1);
    } else {
      this.ui.showMainMenu();
    }
  }

  handleMatchWin(isPlayer1Win) {
    this.state = 'GAME_OVER';

    if (this.mode === 'CAMPAIGN') {
      const lvl = CAMPAIGN_LEVELS.find(l => l.id === this.currentCampaignLevel) || CAMPAIGN_LEVELS[0];
      const isBn = this.ui.lang === 'bn';

      if (isPlayer1Win) {
        if (lvl.rewardPenId) {
          this.ui.unlockPen(lvl.rewardPenId);
        }

        const hasNext = this.currentCampaignLevel < CAMPAIGN_LEVELS.length;
        const msg = hasNext
          ? (isBn ? `৩টি দাইন অর্জন করে ${lvl.titleBN} সম্পন্ন করেছেন! পরবর্তী পিরিয়ডের লড়াইয়ে এগিয়ে যান!` : `Scored 3 Dains to complete ${lvl.titleEN}! Proceed to the next period!`)
          : (isBn ? 'অভিনন্দন! লাস্ট বেঞ্চার টুর্নামেন্টের সকল পিরিয়ড জয় করে আপনি ক্লাসের অপ্রতিদ্বন্দ্বী চ্যাম্পিয়ন হয়েছেন!' : 'Congratulations! You conquered all periods and won the Backbenchers League!');

        this.ui.showGameOverModal(true, msg, hasNext, true);
      } else {
        const msg = isBn
          ? `প্রতিপক্ষ ৩টি দাইন পেয়ে ${lvl.titleBN} জিতে নিয়েছে! আবার চেষ্টা করুন!`
          : `Opponent scored 3 Dains to win ${lvl.titleEN}! Try again!`;
        this.ui.showGameOverModal(false, msg, false, false);
      }
    } else {
      const isBn = this.ui.lang === 'bn';
      const msg = isPlayer1Win
        ? (isBn ? '৩টি দাইন অর্জন করে আপনি ম্যাচ জিতেছেন!' : 'Scored 3 Dains to win the match!')
        : (isBn ? 'প্রতিপক্ষ ৩টি দাইন পেয়ে ম্যাচ জিতে নিয়েছে!' : 'Opponent scored 3 Dains to win the match!');
      this.ui.showGameOverModal(isPlayer1Win, msg, false, isPlayer1Win);
    }
  }

  drawPenStaticPreview(ctx, penPresetId) {
    const tempPen = new Pen(penPresetId, 0, 0, 0, 'player1');
    tempPen.render(ctx, false);
  }

  updateHUDText() {
    const isBn = this.ui.lang === 'bn';

    if (this.mode === 'TRICKSHOT') {
      this.ui.updateHUD(
        `${isBn ? 'শট বাকি' : 'Shots Left'}: ${this.trickshotsRemaining}`,
        `${isBn ? 'টার্গেট চ্যালেঞ্জ' : 'Trickshot'}`
      );
      return;
    }

    let turnStr = '';
    if (this.currentTurn === 'p1') {
      turnStr = this.mode === 'TWO_PLAYER' ? this.ui.t('p1Turn') : this.ui.t('yourTurn');
    } else {
      turnStr = this.mode === 'TWO_PLAYER' ? this.ui.t('p2Turn') : this.ui.t('botThinking');
    }

    const p1Name = this.pens[0] && this.pens[0].preset ? (isBn ? this.pens[0].preset.nameBN : this.pens[0].preset.nameEN) : 'P1';
    const p2Name = this.pens[1] && this.pens[1].preset ? (isBn ? this.pens[1].preset.nameBN : this.pens[1].preset.nameEN) : 'P2';

    // Dain score notation (১ম দাইন, ২য় দাইন, ৩য় দাইন)
    const scoreStr = `${p1Name} ${this.scores.p1} - ${this.scores.p2} ${p2Name} (লক্ষ্য: ৩ দাইন)`;
    this.ui.updateHUD(turnStr, scoreStr);
  }

  handlePhysicsEvent(eventType, data) {
    if (eventType === 'hit') {
      this.sound.playHit(data.speed, data.heavy);
      this.createCollisionSparks(data.point, data.speed);
      if (data.heavy) {
        this.shakeAmount = Math.min(10, data.speed / 50);
      }
    } else if (eventType === 'obstacle_hit') {
      this.sound.playObstacleHit(data.obstacle.type);
    } else if (eventType === 'fall') {
      this.sound.playFall();
      this.ui.showToast(`[পতন] ${data.pen.nameBN} ${this.ui.t('penFell')}`, 2500);
    }
  }

  createCollisionSparks(pos, speed) {
    const count = Math.min(14, Math.floor(speed / 28) + 4);
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const spd = (Math.random() * 90 + 30) * (speed / 150);
      this.particles.push({
        x: pos.x,
        y: pos.y,
        vx: Math.cos(angle) * spd,
        vy: Math.sin(angle) * spd,
        color: Math.random() > 0.4 ? '#ffd54f' : '#ffffff',
        radius: Math.random() * 2.8 + 1.2,
        life: 0.3,
        maxLife: 0.3
      });
    }
  }

  createFlickBurst(pos, force) {
    const count = 8;
    const angle = force.heading() + Math.PI;
    for (let i = 0; i < count; i++) {
      const spread = (Math.random() - 0.5) * 0.8;
      const spd = Math.random() * 100 + 40;
      this.particles.push({
        x: pos.x,
        y: pos.y,
        vx: Math.cos(angle + spread) * spd,
        vy: Math.sin(angle + spread) * spd,
        color: 'rgba(255, 230, 180, 0.85)',
        radius: Math.random() * 3 + 1,
        life: 0.22,
        maxLife: 0.22
      });
    }
  }

  createVictoryConfetti() {
    for (let i = 0; i < 45; i++) {
      const x = Math.random() * this.width;
      const y = Math.random() * this.height * 0.4;
      const colors = ['#f5b041', '#00e676', '#00e5ff', '#ff5252', '#ffd600', '#ffffff'];
      this.particles.push({
        x: x,
        y: y,
        vx: (Math.random() - 0.5) * 120,
        vy: Math.random() * 100 + 60,
        color: colors[Math.floor(Math.random() * colors.length)],
        radius: Math.random() * 4 + 2,
        life: 1.6,
        maxLife: 1.6
      });
    }
  }

  update(dt) {
    if (this.shakeAmount > 0) {
      this.shakeAmount = Math.max(0, this.shakeAmount - dt * 25);
    }

    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];
      p.life -= dt;
      p.x += p.vx * dt;
      p.y += p.vy * dt;
      if (p.life <= 0) {
        this.particles.splice(i, 1);
      }
    }

    if (this.state === 'INTRO_ZOOM' || this.state === 'MENU' || this.state === 'CLASSROOM_VIEW') {
      this.intro.update(dt);
      return;
    }

    this.desk.update(dt);

    this.physics.update(dt, this.pens, this.obstacles, this.desk, (type, data) => {
      this.handlePhysicsEvent(type, data);
    });

    if (this.state === 'SIMULATING') {
      this.simulationTimer = (this.simulationTimer || 0) + dt;
      let anyMoving = false;
      for (const pen of this.pens) {
        if (!pen.isOffDesk && (pen.isMoving || pen.isFalling)) {
          anyMoving = true;
          break;
        }
      }

      // Safety watchdog: max 4 seconds of physics simulation per flick
      if (this.simulationTimer > 4.0) {
        anyMoving = false;
      }

      if (!anyMoving) {
        this.simulationTimer = 0;
        this.evaluateRoundState();
      }
    } else if (this.state === 'AIMING') {
      const p1 = this.pens[0];
      const p2 = this.pens[1];

      // If either pen is off the desk while in AIMING state, immediately evaluate round
      if ((p1 && (p1.isOffDesk || p1.isFalling)) || (p2 && (p2.isOffDesk || p2.isFalling))) {
        this.evaluateRoundState();
        return;
      }

      if ((this.mode === 'BOT' || this.mode === 'CAMPAIGN') && this.currentTurn === 'p2') {
        this.botTimer = (this.botTimer || 0) + dt;
        if (this.botTimer >= 0.75) {
          this.botTimer = 0;
          this.executeBotTurn();
        }
      } else {
        this.botTimer = 0;
      }
    }
  }

  executeBotTurn() {
    if (this.state !== 'AIMING' || this.currentTurn !== 'p2') return;

    const botPen = this.pens[1];
    const playerPen = this.pens[0];

    // If either pen is off desk or missing, evaluate round immediately
    if (!botPen || !playerPen || botPen.isOffDesk || playerPen.isOffDesk || botPen.isFalling || playerPen.isFalling) {
      this.evaluateRoundState();
      return;
    }

    try {
      let shot = this.botAI.calculateShot(botPen, playerPen, this.desk, this.obstacles);
      if (!shot || !shot.force || shot.force.mag() < 20) {
        const toPlayer = Vector2D.sub(playerPen.pos, botPen.pos).normalize();
        shot = {
          force: Vector2D.mult(toPlayer, 360),
          touchPoint: botPen.capPos ? botPen.capPos.clone() : botPen.pos.clone(),
          powerRatio: 0.8
        };
      }

      botPen.applyFlick(shot.force, shot.touchPoint);
      this.sound.playFlick(shot.powerRatio || 0.8);
      this.createFlickBurst(botPen.pos, shot.force);

      if (this.ui && typeof this.ui.showDialogue === 'function') {
        const dialogue = this.botAI.getRandomDialogue(this.ui.lang);
        this.ui.showDialogue(this.botAI.personality.nameBN, dialogue, 2500);
      }
    } catch (err) {
      console.error("Bot turn error, executing emergency fallback flick:", err);
      const toPlayer = Vector2D.sub(playerPen.pos, botPen.pos).normalize();
      botPen.applyFlick(Vector2D.mult(toPlayer, 360), botPen.pos);
    } finally {
      this.state = 'SIMULATING';
      this.simulationTimer = 0;
    }
  }

  evaluateRoundState() {
    if (this.mode === 'TRICKSHOT') {
      this.evaluateTrickshotState();
      return;
    }

    const p1 = this.pens[0];
    const p2 = this.pens[1];

    const p1Out = p1 && (p1.isOffDesk || p1.isFalling);
    const p2Out = p2 && (p2.isOffDesk || p2.isFalling);

    if (p1Out && p2Out) {
      this.ui.showToast('দুইজনই একসাথে টেবিল পার! ড্র!', 2500);
      this.resetRoundAfterDelay();
    } else if (p2Out) {
      // Player 2 / Bot fell off: Player 1 scores 1 point!
      this.scores.p1++;
      const dainNames = ['১ম দাইন!', '২য় দাইন!', 'দাইন দাইন তিন দাইন!'];
      const dainText = dainNames[this.scores.p1 - 1] || `${this.scores.p1} পয়েন্ট`;

      this.ui.showToast(`প্লেয়ার ১ এর ${dainText} (${this.scores.p1}/3)`, 2800);

      if (this.scores.p1 >= 3) {
        // Player 1 wins with 3 points!
        this.handleMatchWin(true);
      } else {
        this.resetRoundAfterDelay();
      }
    } else if (p1Out) {
      // Player 1 fell off: Player 2 / Bot scores 1 point!
      this.scores.p2++;
      const dainNames = ['১ম দাইন!', '২য় দাইন!', 'দাইন দাইন তিন দাইন!'];
      const dainText = dainNames[this.scores.p2 - 1] || `${this.scores.p2} পয়েন্ট`;

      this.ui.showToast(`প্রতিপক্ষের ${dainText} (${this.scores.p2}/3)`, 2800);

      if (this.scores.p2 >= 3) {
        // Opponent wins with 3 points!
        this.handleMatchWin(false);
      } else {
        this.resetRoundAfterDelay();
      }
    } else {
      // Both still on table: switch turns
      this.currentTurn = this.currentTurn === 'p1' ? 'p2' : 'p1';
      this.state = 'AIMING';
      this.updateHUDText();
    }
  }

  evaluateTrickshotState() {
    const playerPen = this.pens[0];
    if (playerPen && (playerPen.isOffDesk || playerPen.isFalling)) {
      this.ui.showGameOverModal(false, 'আপনার কলম টেবিল থেকে পড়ে গেছে!', false);
      return;
    }

    let targetsRemaining = 0;
    for (let i = 1; i < this.pens.length; i++) {
      if (!this.pens[i].isOffDesk) targetsRemaining++;
    }

    for (const obs of this.obstacles) {
      if (obs.isTarget) {
        const bounds = this.desk.getPlayableBounds();
        const isOff = obs.pos.x < bounds.minX || obs.pos.x > bounds.maxX ||
                      obs.pos.y < bounds.minY || obs.pos.y > bounds.maxY;
        if (!isOff) targetsRemaining++;
      }
    }

    if (targetsRemaining === 0) {
      this.sound.playDainDainTinDain();
      this.createVictoryConfetti();
      this.ui.unlockPen('backbencher_monster');
      const hasNext = this.currentTrickshotId < TRICKSHOT_CHALLENGES.length;
      this.ui.showGameOverModal(true, 'পারফেক্ট ট্রিক শট! টার্গেট ক্লিয়ার!', hasNext, true);
    } else {
      this.trickshotsRemaining--;
      if (this.trickshotsRemaining <= 0) {
        this.ui.showGameOverModal(false, 'শট শেষ হয়ে গেছে! আবার চেষ্টা করুন।', false);
      } else {
        this.state = 'AIMING';
        this.updateHUDText();
      }
    }
  }

  handleMatchWin(isP1Winner) {
    this.state = 'GAME_OVER';

    // Iconic "দাইন দাইন তিন দাইন!" fanfare & confetti celebration
    this.sound.playDainDainTinDain();
    this.createVictoryConfetti();

    this.ui.showToast('দাইন দাইন তিন দাইন!', 4000);

    if (isP1Winner) {
      if (this.mode === 'CAMPAIGN') {
        const lvl = CAMPAIGN_LEVELS.find(l => l.id === this.currentCampaignLevel);
        if (lvl && lvl.rewardPenId) {
          this.ui.unlockPen(lvl.rewardPenId);
        }
        const hasNext = this.currentCampaignLevel < CAMPAIGN_LEVELS.length;
        this.ui.showGameOverModal(true, `চ্যাম্পিয়ন! ${lvl ? lvl.titleBN : ''} জিতেছেন!`, hasNext, true);
      } else {
        const winTitle = this.mode === 'TWO_PLAYER' ? 'প্লেয়ার ১ ৩ দাইন পেয়ে বিজয়ী!' : 'আপনি ৩ দাইন পেয়ে বিজয়ী!';
        this.ui.showGameOverModal(true, winTitle, false, true);
      }
    } else {
      const loseMsg = this.mode === 'TWO_PLAYER' ? 'প্লেয়ার ২ ৩ দাইন পেয়ে বিজয়ী!' : 'প্রতিপক্ষ ৩ দাইন পেয়ে বিজয়ী!';
      this.ui.showGameOverModal(false, loseMsg, false, true);
    }
  }

  resetRoundAfterDelay() {
    this.state = 'ROUND_OVER';
    this.botPlanning = false;
    setTimeout(() => {
      if (this.mode === 'CAMPAIGN') {
        const lvl = CAMPAIGN_LEVELS.find(l => l.id === this.currentCampaignLevel);
        this.resetRoundPens(lvl ? lvl.playerPenId : 'matador_allrounder', lvl ? lvl.opponentPenId : 'matador_hischool');
      } else {
        this.resetRoundPens(this.ui.selectedPlayer1Pen, this.ui.selectedPlayer2Pen);
      }
      this.currentTurn = 'p1';
      this.botPlanning = false;
      this.state = 'AIMING';
      this.updateHUDText();
    }, 1300);
  }

  render() {
    this.ctx.clearRect(0, 0, this.width, this.height);
    this.ctx.save();

    if (this.shakeAmount > 0) {
      const sx = (Math.random() - 0.5) * this.shakeAmount * 2;
      const sy = (Math.random() - 0.5) * this.shakeAmount * 2;
      this.ctx.translate(sx, sy);
    }

    if (this.state === 'CLASSROOM_VIEW') {
      // 1. Draw Full Bangladeshi Classroom with Interactive Hotspots
      this.intro.render(this.ctx, true);
    } else if (this.state === 'MENU' || this.state === 'INTRO_ZOOM') {
      // 2. Draw Full Bangladeshi Classroom Intro Scene
      this.intro.render(this.ctx, false);
    } else {
      // 3. Draw Wooden High-Bench Battle Arena (Matching reference penfight arena)
      this.desk.render(this.ctx, {
        scores: this.scores,
        currentTurn: this.currentTurn,
        mode: this.mode,
        targetScore: this.targetScore
      });

      for (const obs of this.obstacles) {
        obs.render(this.ctx);
      }

      const activePen = this.getActivePen();
      for (const pen of this.pens) {
        pen.render(this.ctx, pen === activePen && this.state === 'AIMING');
      }

      for (const p of this.particles) {
        this.ctx.save();
        this.ctx.fillStyle = p.color;
        this.ctx.globalAlpha = p.life / p.maxLife;
        this.ctx.beginPath();
        this.ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        this.ctx.fill();
        this.ctx.restore();
      }

      if (this.isDragging && this.selectedPen && this.state === 'AIMING') {
        this.renderAimingGuide(this.ctx);
      }
    }

    this.ctx.restore();
  }

  renderAimingGuide(ctx) {
    const pen = this.selectedPen;
    const pullVector = Vector2D.sub(this.dragStart, this.dragCurrent);
    const pullDist = pullVector.mag();

    if (pullDist < 10) return;

    ctx.save();
    const powerRatio = Math.min(1.0, pullDist / 180);
    const aimDir = pullVector.clone().normalize();
    const launchDist = powerRatio * 150;

    const startPoint = this.dragTouchPoint || pen.pos;

    ctx.strokeStyle = `hsl(${120 - powerRatio * 120}, 100%, 55%)`;
    ctx.lineWidth = 3;
    ctx.setLineDash([8, 6]);

    ctx.beginPath();
    ctx.moveTo(startPoint.x, startPoint.y);
    ctx.lineTo(startPoint.x + aimDir.x * launchDist, startPoint.y + aimDir.y * launchDist);
    ctx.stroke();

    const tipX = startPoint.x + aimDir.x * launchDist;
    const tipY = startPoint.y + aimDir.y * launchDist;
    const arrowAngle = aimDir.heading();

    ctx.fillStyle = `hsl(${120 - powerRatio * 120}, 100%, 55%)`;
    ctx.setLineDash([]);
    ctx.beginPath();
    ctx.moveTo(tipX, tipY);
    ctx.lineTo(tipX - Math.cos(arrowAngle - 0.4) * 14, tipY - Math.sin(arrowAngle - 0.4) * 14);
    ctx.lineTo(tipX - Math.cos(arrowAngle + 0.4) * 14, tipY - Math.sin(arrowAngle + 0.4) * 14);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 13px "Outfit", sans-serif';
    ctx.shadowColor = 'rgba(0,0,0,0.8)';
    ctx.shadowBlur = 4;
    ctx.fillText(`${Math.round(powerRatio * 100)}%`, tipX + 12, tipY + 4);

    ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(this.dragStart.x, this.dragStart.y);
    ctx.lineTo(this.dragCurrent.x, this.dragCurrent.y);
    ctx.stroke();

    ctx.restore();
  }

  drawPenStaticPreview(ctx, presetId) {
    const pen = new Pen(presetId, 0, 0, 0);
    pen.render(ctx, false);
  }

  startLoop() {
    const loop = (time) => {
      const dt = (time - this.lastTime) / 1000;
      this.lastTime = time;

      this.update(dt);
      this.render();

      requestAnimationFrame(loop);
    };
    requestAnimationFrame(loop);
  }
}

// Instantiate game
window.addEventListener('DOMContentLoaded', () => {
  window.game = new PenFightGame();
});
