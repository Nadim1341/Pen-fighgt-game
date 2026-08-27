import { PEN_PRESETS } from '../entities/pen.js';
import { BOT_PERSONALITIES } from '../ai/bot.js';
import { CAMPAIGN_LEVELS } from './campaign.js';
import { TRICKSHOT_CHALLENGES } from './trickshots.js';

export const TRANSLATIONS = {
  bn: {
    gameTitle: 'স্কুল লাইফ পেন ফাইট',
    subtitle: 'স্কুল জীবনের নস্টালজিয়া • হাই বেঞ্চের ক্লাসরুম যুদ্ধ',
    quickMatch: 'কুইক ম্যাচ (১ বনাম ১)',
    campaign: 'লাস্ট বেঞ্চার টুর্নামেন্ট (ক্যাম্পেইন)',
    trickshots: 'ট্রিক শট চ্যালেঞ্জ',
    garage: 'পেন ওয়ার্কশপ ও কালেকশন',
    passAndPlay: '২ প্লেয়ার (পাস অ্যান্ড প্লে)',
    vsBot: 'বনাম ক্লাসরুম বট (১ বনাম ১)',
    howToPlay: 'খেলার নিয়মাবলী ও কৌশল',
    soundOn: 'সাউন্ড চালু',
    soundOff: 'মিউট',
    volume: 'ভলিউম',
    volumeSettings: 'সাউন্ড ও ভলিউম নিয়ন্ত্রণ',
    volumeModalTitle: 'সাউন্ড ও ভলিউম নিয়ন্ত্রণ',
    volumeModalSubtitle: 'ক্লাসরুমের নস্টালজিক আওয়াজ ও গেমের শব্দ এডজাস্ট করুন',
    masterVol: 'মাস্টার ভলিউম (Master)',
    ambienceVol: 'ক্লাসরুমের কোলাহল (Classroom Noise)',
    sfxVol: 'পেনের টোকা ও সাউন্ড এফেক্টস (Game SFX)',
    muteToggle: 'মিউট / আনমিউট',
    close: 'বন্ধ করুন',
    yourTurn: 'আপনার চাল! (পেন টেনে টোকা মারুন)',
    p1Turn: 'প্লেয়ার ১ এর চাল!',
    p2Turn: 'প্লেয়ার ২ এর চাল!',
    botThinking: 'বট নিশানা করছে...',
    power: 'টোকার পাওয়ার:',
    spin: 'স্পিন:',
    round: 'রাউন্ড',
    score: 'স্কোর',
    youWin: 'আপনি জিতেছেন!',
    youLose: 'আপনি হেরে গেছেন!',
    penFell: 'কলম টেবিল থেকে পড়ে গেছে! (আউট)',
    unlockedNewPen: 'নতুন পেন আনলক হয়েছে:',
    nextMatch: 'পরবর্তী ম্যাচ ➔',
    retry: 'আবার খেলুন ↺',
    mainMenu: 'মূল মেনু',
    classroomTour: 'ক্লাসরুম দর্শন',
    classroomTourBtn: 'নস্টালজিক ক্লাসরুম দর্শন (ট্যুর)',
    classroomTourTitle: 'নস্টালজিক স্কুল ক্লাসরুম দর্শন',
    tourHint: 'চকবোর্ড, হাজিরা খাতা, জানালা, ফ্যান বা বেঞ্চে স্পর্শ করে ক্লাসের স্মৃতি আবিষ্কার করুন',
    ringBell: 'ঘণ্টা বাজান',
    toggleWeather: 'বৃষ্টি ও আবহাওয়া',
    toggleFan: 'ফ্যান নিয়ন্ত্রণ',
    launchPlane: 'কাগজের প্লেন',
    changeQuote: 'চকবোর্ড উক্তি',
    playBenchGame: 'পেন ফাইট শুরু করুন',
    rulesTitle: 'পেন ফাইটের স্কুল রুলস:',
    rule1: '১. পেনের ক্যাপ বা বডিতে আঙুল দিয়ে টেনে পাওয়ার সেট করুন এবং ছেড়ে দিয়ে টোকা মারুন।',
    rule2: '২. প্রতিপক্ষের পেনকে ধাক্কা দিয়ে হাই-বেঞ্চ (টেবিল) থেকে নিচে ফেলে দিলেই আউট!',
    rule3: '৩. নিজের পেন টেবিলের বাইরে চলে গেলে ফাউল / আপনি আউট হবেন।',
    rule4: '৪. পিনের ধার বা ক্যাপের পেছনে টোকা মেরে ঘুরিয়ে (Spin Shot) মারার চেষ্টা করুন!'
  },
  en: {
    gameTitle: 'School Days: Pen Fight',
    subtitle: 'Classroom Nostalgia • High-Bench Physics Battle',
    quickMatch: 'Quick Match (1v1)',
    campaign: 'Backbenchers League (Campaign)',
    trickshots: 'Trick Shot Challenges',
    garage: 'Pen Workshop & Collection',
    passAndPlay: '2-Player Pass & Play',
    vsBot: 'vs Classroom Bot (1v1)',
    howToPlay: 'How to Play & Rules',
    soundOn: 'Sound ON',
    soundOff: 'Muted',
    volume: 'Volume',
    volumeSettings: 'Sound & Volume Settings',
    volumeModalTitle: 'Sound & Volume Controls',
    volumeModalSubtitle: 'Adjust classroom background chatter and game SFX',
    masterVol: 'Master Volume',
    ambienceVol: 'Classroom Noise (Ambience)',
    sfxVol: 'Game SFX (Flicks & Hits)',
    muteToggle: 'Mute / Unmute',
    close: 'Close',
    yourTurn: 'Your Turn! Drag & release to flick.',
    p1Turn: "Player 1's Turn!",
    p2Turn: "Player 2's Turn!",
    botThinking: 'Opponent is aiming...',
    power: 'Flick Power:',
    spin: 'Spin:',
    round: 'Round',
    score: 'Score',
    youWin: 'Victory!',
    youLose: 'Defeated!',
    penFell: 'Pen fell off the desk! (OUT)',
    unlockedNewPen: 'Unlocked New Pen:',
    nextMatch: 'Next Match ➔',
    retry: 'Play Again ↺',
    mainMenu: 'Main Menu',
    classroomTour: 'Classroom Tour',
    classroomTourBtn: 'Nostalgic Classroom Tour',
    classroomTourTitle: 'Nostalgic School Classroom Tour',
    tourHint: 'Tap chalkboard, register, window, fan, or benches to explore school memories',
    ringBell: 'Ring Bell',
    toggleWeather: 'Rain & Weather',
    toggleFan: 'Fan Speed',
    launchPlane: 'Paper Plane',
    changeQuote: 'Chalk Quotes',
    playBenchGame: 'Start Pen Fight',
    rulesTitle: 'School Pen Fight Rules:',
    rule1: '1. Drag back from your pen to set flick power & angle, then release to launch!',
    rule2: '2. Knock your opponent off the wooden high-bench to score an OUT!',
    rule3: '3. If your own pen slides off the desk edge, you are OUT!',
    rule4: '4. Aim near the cap or tip to unleash devastating spin curve shots.'
  }
};

export class UIManager {
  constructor(game) {
    this.game = game;
    this.lang = 'bn'; // Default to authentic Bangla
    this.unlockedPens = ['matador_alltime', 'matador_hischool', 'pilot_bp1_rt', 'gq_genius', 'reynolds_045', 'matador_allrounder'];
    this.loadProgress();

    this.selectedPlayer1Pen = 'matador_alltime';
    this.selectedPlayer2Pen = 'pilot_bp1_rt';
    this.selectedBotPersonality = 'nerd';
    this.is2PlayerMode = false;

    this.initDOM();
  }

  loadProgress() {
    try {
      const saved = localStorage.getItem('penfight_unlocked');
      if (saved) {
        this.unlockedPens = JSON.parse(saved);
      }
    } catch (e) {}
  }

  saveProgress() {
    try {
      localStorage.setItem('penfight_unlocked', JSON.stringify(this.unlockedPens));
    } catch (e) {}
  }

  unlockPen(penId) {
    if (!this.unlockedPens.includes(penId)) {
      this.unlockedPens.push(penId);
      this.saveProgress();
      const preset = PEN_PRESETS[penId];
      const name = this.lang === 'bn' ? preset.nameBN : preset.nameEN;
      this.showToast(`[আনলক] ${this.t('unlockedNewPen')} ${name}!`, 3500);
    }
  }

  t(key) {
    return TRANSLATIONS[this.lang][key] || key;
  }

  toggleLanguage() {
    this.lang = this.lang === 'bn' ? 'en' : 'bn';
    this.updateLanguageUI();
  }

  initDOM() {
    // Top HUD Elements
    this.hudElement = document.getElementById('hud');
    this.toastContainer = document.getElementById('toast-container');
    this.dialogueBubble = document.getElementById('dialogue-bubble');

    // Modals
    this.mainMenuModal = document.getElementById('main-menu-modal');
    this.garageModal = document.getElementById('garage-modal');
    this.campaignModal = document.getElementById('campaign-modal');
    this.trickshotsModal = document.getElementById('trickshots-modal');
    this.gameOverModal = document.getElementById('game-over-modal');
    this.rulesModal = document.getElementById('rules-modal');
    this.volumeModal = document.getElementById('volume-modal');

    // Controls & Sliders
    this.langToggleBtn = document.getElementById('lang-toggle-btn');
    this.soundToggleBtn = document.getElementById('sound-toggle-btn');
    this.sliderMaster = document.getElementById('slider-master-volume');
    this.sliderAmbience = document.getElementById('slider-ambience-volume');
    this.sliderSfx = document.getElementById('slider-sfx-volume');
    this.badgeMaster = document.getElementById('badge-master-vol');
    this.badgeAmbience = document.getElementById('badge-ambience-vol');
    this.badgeSfx = document.getElementById('badge-sfx-vol');

    this.bindEvents();
    this.updateLanguageUI();
    this.renderGarage();
  }

  bindEvents() {
    if (this.langToggleBtn) {
      this.langToggleBtn.addEventListener('click', () => this.toggleLanguage());
    }

    if (this.soundToggleBtn) {
      this.soundToggleBtn.addEventListener('click', () => {
        const isMuted = this.game.sound.toggleMute();
        this.soundToggleBtn.innerHTML = `<span data-i18n="${isMuted ? 'soundOff' : 'soundOn'}">${isMuted ? this.t('soundOff') : this.t('soundOn')}</span>`;
      });
    }

    // Main Menu Buttons
    document.getElementById('btn-play-bot')?.addEventListener('click', () => {
      this.is2PlayerMode = false;
      this.hideAllModals();
      this.game.startQuickMatch(this.selectedPlayer1Pen, 'matador_hischool', false, this.selectedBotPersonality);
    });

    document.getElementById('btn-play-2p')?.addEventListener('click', () => {
      this.is2PlayerMode = true;
      this.hideAllModals();
      this.game.startQuickMatch(this.selectedPlayer1Pen, this.selectedPlayer2Pen, true);
    });

    document.getElementById('btn-campaign')?.addEventListener('click', () => {
      this.showCampaignModal();
    });

    document.getElementById('btn-trickshots')?.addEventListener('click', () => {
      this.showTrickshotsModal();
    });

    document.getElementById('btn-classroom-view')?.addEventListener('click', () => {
      this.hideAllModals();
      this.game.openClassroomTour();
    });

    document.getElementById('btn-garage')?.addEventListener('click', () => {
      this.showGarageModal();
    });

    document.getElementById('btn-volume-menu')?.addEventListener('click', () => {
      this.showVolumeModal();
    });

    document.getElementById('btn-rules')?.addEventListener('click', () => {
      this.showRulesModal();
    });

    // In-game top buttons
    document.getElementById('btn-hud-menu')?.addEventListener('click', () => {
      this.showMainMenu();
    });

    document.getElementById('btn-hud-volume')?.addEventListener('click', () => {
      this.showVolumeModal();
    });

    document.getElementById('btn-hud-classroom')?.addEventListener('click', () => {
      this.hideAllModals();
      this.game.openClassroomTour();
    });

    document.getElementById('btn-hud-restart')?.addEventListener('click', () => {
      this.game.restartCurrentMode();
    });

    // Tour Action Bar Buttons
    document.getElementById('btn-tour-bell')?.addEventListener('click', () => {
      this.game.viewer.ringSchoolBell();
    });

    document.getElementById('btn-tour-weather')?.addEventListener('click', () => {
      this.game.viewer.triggerHotspotAction('window');
    });

    document.getElementById('btn-tour-fan')?.addEventListener('click', () => {
      this.game.viewer.cycleFanSpeed();
    });

    document.getElementById('btn-tour-plane')?.addEventListener('click', () => {
      this.game.viewer.triggerHotspotAction('student_aviator');
    });

    document.getElementById('btn-tour-quote')?.addEventListener('click', () => {
      this.game.viewer.triggerHotspotAction('chalkboard');
    });

    document.getElementById('btn-tour-volume')?.addEventListener('click', () => {
      this.showVolumeModal();
    });

    document.getElementById('btn-tour-play')?.addEventListener('click', () => {
      this.game.viewer.closeTour();
      this.game.startQuickMatch(this.selectedPlayer1Pen, 'matador_hischool', false, this.selectedBotPersonality);
    });

    document.getElementById('btn-tour-menu')?.addEventListener('click', () => {
      this.game.viewer.closeTour();
      this.showMainMenu();
    });

    // Volume Sliders Bindings
    if (this.sliderMaster) {
      this.sliderMaster.addEventListener('input', (e) => {
        const val = parseFloat(e.target.value);
        this.game.sound.setMasterVolume(val / 100);
        if (this.badgeMaster) this.badgeMaster.textContent = `${val}%`;
      });
    }

    if (this.sliderAmbience) {
      this.sliderAmbience.addEventListener('input', (e) => {
        const val = parseFloat(e.target.value);
        this.game.sound.setAmbienceVolume(val / 100);
        if (this.badgeAmbience) this.badgeAmbience.textContent = `${val}%`;
      });
    }

    if (this.sliderSfx) {
      this.sliderSfx.addEventListener('input', (e) => {
        const val = parseFloat(e.target.value);
        this.game.sound.setSfxVolume(val / 100);
        if (this.badgeSfx) this.badgeSfx.textContent = `${val}%`;
      });
      this.sliderSfx.addEventListener('change', () => {
        this.game.sound.playFlick(0.7);
      });
    }

    document.getElementById('btn-modal-mute-toggle')?.addEventListener('click', () => {
      const isMuted = this.game.sound.toggleMute();
      if (this.soundToggleBtn) {
        this.soundToggleBtn.innerHTML = `<span data-i18n="${isMuted ? 'soundOff' : 'soundOn'}">${isMuted ? this.t('soundOff') : this.t('soundOn')}</span>`;
      }
    });

    // Modal Close / Back Buttons
    document.querySelectorAll('.btn-close-modal').forEach(btn => {
      btn.addEventListener('click', () => {
        this.hideAllModals();
        if (this.game.state === 'CLASSROOM_VIEW') {
          // Stay in classroom tour if just closing an inspect modal
          return;
        }
        if (this.game.state === 'MENU') {
          this.showMainMenu();
        }
      });
    });

    // Game Over Buttons
    document.getElementById('btn-gameover-restart')?.addEventListener('click', () => {
      this.hideAllModals();
      this.game.restartCurrentMode();
    });

    document.getElementById('btn-gameover-menu')?.addEventListener('click', () => {
      this.hideAllModals();
      this.showMainMenu();
    });

    document.getElementById('btn-gameover-next')?.addEventListener('click', () => {
      this.hideAllModals();
      this.game.nextCampaignLevel();
    });
  }

  showVolumeModal() {
    this.hideAllModals();
    if (this.volumeModal) {
      if (this.sliderMaster) {
        this.sliderMaster.value = Math.round(this.game.sound.masterVolume * 100);
        if (this.badgeMaster) this.badgeMaster.textContent = `${this.sliderMaster.value}%`;
      }
      if (this.sliderAmbience) {
        this.sliderAmbience.value = Math.round(this.game.sound.ambienceVolume * 100);
        if (this.badgeAmbience) this.badgeAmbience.textContent = `${this.sliderAmbience.value}%`;
      }
      if (this.sliderSfx) {
        this.sliderSfx.value = Math.round(this.game.sound.sfxVolume * 100);
        if (this.badgeSfx) this.badgeSfx.textContent = `${this.sliderSfx.value}%`;
      }
      this.volumeModal.classList.add('active');
    }
  }

  updateLanguageUI() {
    const isBn = this.lang === 'bn';
    if (this.langToggleBtn) {
      this.langToggleBtn.textContent = isBn ? 'English' : 'বাংলা';
    }
    if (this.soundToggleBtn) {
      this.soundToggleBtn.textContent = this.game.sound.muted ? this.t('soundOff') : this.t('soundOn');
    }

    // Update text in elements with data-i18n
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (key && TRANSLATIONS[this.lang][key]) {
        el.textContent = TRANSLATIONS[this.lang][key];
      }
    });

    this.renderGarage();
    this.renderCampaignList();
    this.renderTrickshotsList();
  }

  hideAllModals() {
    document.querySelectorAll('.game-modal').forEach(m => m.classList.remove('active'));
  }

  showMainMenu() {
    this.hideAllModals();
    if (this.game.viewer) {
      this.game.viewer.closeTour();
    }
    const hud = document.getElementById('hud');
    if (hud) hud.style.display = 'none';
    this.mainMenuModal.classList.add('active');
    this.game.state = 'MENU';
  }

  showGarageModal() {
    this.hideAllModals();
    this.renderGarage();
    this.garageModal.classList.add('active');
  }

  showCampaignModal() {
    this.hideAllModals();
    this.renderCampaignList();
    this.campaignModal.classList.add('active');
  }

  showTrickshotsModal() {
    this.hideAllModals();
    this.renderTrickshotsList();
    this.trickshotsModal.classList.add('active');
  }

  showRulesModal() {
    this.hideAllModals();
    this.rulesModal.classList.add('active');
  }

  showGameOverModal(isWin, message, showNext = false, isMatchWin = false) {
    this.hideAllModals();
    const titleEl = document.getElementById('gameover-title');
    const msgEl = document.getElementById('gameover-msg');
    const dainBanner = document.getElementById('gameover-dain-banner');
    const nextBtn = document.getElementById('btn-gameover-next');
    const isBn = this.lang === 'bn';

    if (titleEl) {
      titleEl.textContent = isWin ? (isBn ? 'আপনি ৩ দাইন পেয়ে বিজয়ী!' : 'Victory (3 Dains)!') : (isBn ? 'প্রতিপক্ষ ৩ দাইন পেয়ে বিজয়ী!' : 'Match Over!');
      titleEl.className = isWin ? 'victory-title' : 'defeat-title';
    }
    if (dainBanner) {
      if (isMatchWin || isWin) {
        dainBanner.style.display = 'block';
        dainBanner.textContent = 'দাইন দাইন তিন দাইন!';
      } else {
        dainBanner.style.display = 'none';
      }
    }
    if (msgEl) {
      msgEl.textContent = message || (isWin ? (isBn ? 'চমৎকার ৩টি দাইন অর্জন করে ম্যাচ জিতেছেন!' : 'Scored 3 Dains to win the match!') : this.t('penFell'));
    }
    if (nextBtn) {
      nextBtn.style.display = showNext ? 'inline-block' : 'none';
      nextBtn.textContent = isBn ? 'পরবর্তী রাউন্ড / পিরিয়ড ➔' : 'Next Period ➔';
    }

    this.gameOverModal.classList.add('active');
  }

  renderGarage() {
    const container = document.getElementById('garage-pen-list');
    if (!container) return;
    container.innerHTML = '';

    const isBn = this.lang === 'bn';

    Object.keys(PEN_PRESETS).forEach(penId => {
      const p = PEN_PRESETS[penId];
      const isUnlocked = this.unlockedPens.includes(penId);
      const isSelectedP1 = this.selectedPlayer1Pen === penId;
      const isSelectedP2 = this.selectedPlayer2Pen === penId;

      const card = document.createElement('div');
      card.className = `pen-card ${isUnlocked ? 'unlocked' : 'locked'} ${isSelectedP1 ? 'selected-p1' : ''}`;

      card.innerHTML = `
        <div class="pen-card-header">
          <div class="pen-brand-tag">${p.brand} (${p.price})</div>
          <h4>${isBn ? p.nameBN : p.nameEN}</h4>
          <p class="pen-tagline">"${isBn ? p.taglineBN : p.taglineEN}"</p>
        </div>

        <div class="pen-preview-canvas-box">
          <canvas width="160" height="40" id="pen-prev-${penId}"></canvas>
        </div>

        <div class="pen-stats-grid">
          <div class="stat-row"><span>গতি (Speed):</span> <div class="bar-bg"><div class="bar-fill" style="width: ${(p.maxPower / 650) * 100}%"></div></div></div>
          <div class="stat-row"><span>ওজন (Weight):</span> <div class="bar-bg"><div class="bar-fill weight" style="width: ${(p.mass / 2.0) * 100}%"></div></div></div>
          <div class="stat-row"><span>স্পিন (Spin):</span> <div class="bar-bg"><div class="bar-fill spin" style="width: ${(p.spinFactor / 1.7) * 100}%"></div></div></div>
          <div class="stat-row"><span>নকব্যাক (Push):</span> <div class="bar-bg"><div class="bar-fill knockback" style="width: ${(p.knockback / 1.9) * 100}%"></div></div></div>
        </div>

        <div class="pen-perk">
          বিশেষত্ব: ${isBn ? p.perkBN : p.perkEN}
        </div>

        <div class="pen-card-actions">
          ${isUnlocked ? `
            <button class="btn-select-p1 ${isSelectedP1 ? 'active' : ''}">${isBn ? 'প্লেয়ার ১ হিসেবে নিন' : 'Select for P1'}</button>
            <button class="btn-select-p2 ${isSelectedP2 ? 'active' : ''}">${isBn ? 'প্লেয়ার ২ হিসেবে নিন' : 'Select for P2'}</button>
          ` : `
            <div class="lock-notice">[লকড] ${isBn ? 'আনলক করতে ক্যাম্পেইনে জিতুন' : 'Win in Campaign to Unlock'}</div>
          `}
        </div>
      `;

      if (isUnlocked) {
        card.querySelector('.btn-select-p1')?.addEventListener('click', () => {
          this.selectedPlayer1Pen = penId;
          this.renderGarage();
        });
        card.querySelector('.btn-select-p2')?.addEventListener('click', () => {
          this.selectedPlayer2Pen = penId;
          this.renderGarage();
        });
      }

      container.appendChild(card);

      // Render micro preview of pen
      setTimeout(() => {
        const prevCanvas = document.getElementById(`pen-prev-${penId}`);
        if (prevCanvas) {
          const ctx = prevCanvas.getContext('2d');
          ctx.clearRect(0, 0, 160, 40);
          ctx.save();
          ctx.translate(80, 20);
          ctx.scale(0.8, 0.8);
          // Draw pen horizontally
          this.game.drawPenStaticPreview(ctx, penId);
          ctx.restore();
        }
      }, 0);
    });
  }

  renderCampaignList() {
    const list = document.getElementById('campaign-level-list');
    if (!list) return;
    list.innerHTML = '';
    const isBn = this.lang === 'bn';

    CAMPAIGN_LEVELS.forEach(lvl => {
      const item = document.createElement('div');
      item.className = 'campaign-level-item';
      item.innerHTML = `
        <div class="level-info">
          <h4>${isBn ? lvl.titleBN : lvl.titleEN}</h4>
          <span class="level-period">${isBn ? lvl.periodBN : lvl.periodEN}</span>
          <p class="level-story">${isBn ? lvl.storyBN : lvl.storyEN}</p>
        </div>
        <button class="btn-play-level">▶ ${isBn ? 'খেলুন' : 'Fight'}</button>
      `;

      item.addEventListener('click', () => {
        this.hideAllModals();
        this.game.startCampaignLevel(lvl.id);
      });

      list.appendChild(item);
    });
  }

  renderTrickshotsList() {
    const list = document.getElementById('trickshot-level-list');
    if (!list) return;
    list.innerHTML = '';
    const isBn = this.lang === 'bn';

    TRICKSHOT_CHALLENGES.forEach(ch => {
      const item = document.createElement('div');
      item.className = 'trickshot-item';
      item.innerHTML = `
        <div class="trick-info">
          <h4>${isBn ? ch.titleBN : ch.titleEN}</h4>
          <p>${isBn ? ch.descBN : ch.descEN}</p>
          <span class="trick-badge">[টার্গেট] ${isBn ? `ম্যাক্স শট: ${ch.maxShots}` : `Max Shots: ${ch.maxShots}`}</span>
        </div>
        <button class="btn-play-trick">${isBn ? 'শুরু করুন' : 'Start'}</button>
      `;

      item.addEventListener('click', () => {
        this.hideAllModals();
        this.game.startTrickshot(ch.id);
      });

      list.appendChild(item);
    });
  }

  updateHUD(turnText, scoreText) {
    if (this.turnIndicator) this.turnIndicator.textContent = turnText;
    if (this.scoreDisplay) this.scoreDisplay.textContent = scoreText;

    const p1 = this.game.pens && this.game.pens[0];
    const penTag = document.getElementById('active-pen-tag');
    if (penTag && p1) {
      penTag.textContent = this.lang === 'bn' ? p1.preset.nameBN : p1.preset.nameEN;
    }
  }

  showDialogue(name, text, duration = 3000) {
    if (!this.dialogueBubble) return;
    this.dialogueBubble.innerHTML = `<strong>${name}:</strong> "${text}"`;
    this.dialogueBubble.classList.add('visible');

    if (this.dialogueTimeout) clearTimeout(this.dialogueTimeout);
    this.dialogueTimeout = setTimeout(() => {
      this.dialogueBubble.classList.remove('visible');
    }, duration);
  }

  showToast(msg, duration = 2500) {
    if (!this.toastContainer) return;

    // Clear any previous toasts immediately so only one single toast is displayed
    if (this.toastTimeout) {
      clearTimeout(this.toastTimeout);
      this.toastTimeout = null;
    }
    this.toastContainer.innerHTML = '';

    const toast = document.createElement('div');
    toast.className = 'school-toast';
    toast.textContent = msg;
    this.toastContainer.appendChild(toast);

    this.toastTimeout = setTimeout(() => {
      toast.classList.add('fade-out');
      setTimeout(() => {
        if (toast.parentNode) toast.remove();
      }, 400);
    }, duration);
  }
}
