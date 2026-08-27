/**
 * Bangladeshi Classroom & Wooden High-Bench Battle Arena
 * Ultra-realistic 3D perspective layout matching authentic penfight.xyz arena:
 * - Vertical slender high-bench table with natural honey-oak grain, scratches & watermark ring
 * - Realistic checkered ceramic tile classroom floor
 * - Top green chalkboard with clean, non-overlapping chalk score layout & daily thought
 * - Floating torn paper turn note badge
 * - Black metal tubular desk legs & 3D floor drop shadow
 */
export class Desk {
  constructor(canvasWidth, canvasHeight) {
    this.width = canvasWidth;
    this.height = canvasHeight;

    this.calculateBounds();
    this.generateWoodScratches();

    this.floatingChatters = [];
    this.chatterTimer = 0;
    this.chatterPhrases = [
      'জোরে টোকা দে!',
      'পেন ঘুরায়া মার!',
      'দাইন হবে এবার!',
      'আউট কর আউট কর!',
      'স্যার দেখতেছে না তো?',
      'উফফ কী শট!',
      'টেবিলের কিনারায় ফেল!',
      'স্পিন কর স্পিন!'
    ];
  }

  resize(canvasWidth, canvasHeight) {
    this.width = canvasWidth;
    this.height = canvasHeight;
    this.calculateBounds();
    this.generateWoodScratches();
  }

  calculateBounds() {
    const isMobile = this.width < 700;

    // Classic wide horizontal school high-bench
    let deskW = isMobile
      ? Math.min(this.width * 0.92, 680)
      : Math.min(this.width * 0.84, 980);

    const minX = (this.width - deskW) / 2;
    const maxX = minX + deskW;

    // Height of high-bench table
    let deskH = isMobile
      ? Math.min(this.height * 0.60, 440)
      : Math.min(this.height * 0.64, 520);

    const topMargin = Math.max(92, (this.height - deskH) / 2 + 15);
    const minY = topMargin;
    const maxY = minY + deskH;

    this.bounds = { minX, maxX, minY, maxY };
  }

  generateWoodScratches() {
    this.scratches = [];
    const bounds = this.bounds;
    const w = bounds.maxX - bounds.minX;
    const h = bounds.maxY - bounds.minY;

    for (let i = 0; i < 30; i++) {
      const sx = bounds.minX + Math.random() * w;
      const sy = bounds.minY + Math.random() * h;
      const len = 18 + Math.random() * 48;
      const angle = 0.55 + (Math.random() - 0.5) * 0.45;
      this.scratches.push({
        x1: sx,
        y1: sy,
        x2: sx + Math.cos(angle) * len,
        y2: sy + Math.sin(angle) * len,
        alpha: 0.10 + Math.random() * 0.20,
        width: 0.6 + Math.random() * 0.7
      });
    }
  }

  getPlayableBounds() {
    return this.bounds;
  }

  update(dt) {
    this.chatterTimer += dt;
    if (this.chatterTimer > 3.6) {
      this.chatterTimer = 0;
      const phrase = this.chatterPhrases[Math.floor(Math.random() * this.chatterPhrases.length)];
      const bounds = this.getPlayableBounds();
      const isLeft = Math.random() > 0.5;
      const x = isLeft ? Math.max(25, bounds.minX - 40) : Math.min(this.width - 25, bounds.maxX + 40);
      const y = bounds.minY + Math.random() * (bounds.maxY - bounds.minY);

      this.floatingChatters.push({
        text: phrase,
        x: x,
        y: y,
        vy: -14,
        life: 2.2,
        maxLife: 2.2
      });
    }

    for (let i = this.floatingChatters.length - 1; i >= 0; i--) {
      const c = this.floatingChatters[i];
      c.life -= dt;
      c.y += c.vy * dt;
      if (c.life <= 0) {
        this.floatingChatters.splice(i, 1);
      }
    }
  }

  render(ctx, gameState = null) {
    const bounds = this.getPlayableBounds();
    const deskW = bounds.maxX - bounds.minX;
    const deskH = bounds.maxY - bounds.minY;
    const w = this.width;
    const h = this.height;

    // ============================================================
    // 1. CLASSROOM WALL & MOSAIC TERRAZZO FLOOR
    // ============================================================

    // A. Authentic Bangladeshi Two-Tone Classroom Wall
    const wallH = bounds.minY - 20;
    const wallGrad = ctx.createLinearGradient(0, 0, 0, wallH);
    wallGrad.addColorStop(0, '#dbe5d8'); // Pale green-tinted lime wash top
    wallGrad.addColorStop(0.35, '#c9d7c6');
    wallGrad.addColorStop(0.36, '#2f452d'); // Dark olive green wainscot line
    wallGrad.addColorStop(1, '#233621'); // Deep protective green oil paint
    ctx.fillStyle = wallGrad;
    ctx.fillRect(0, 0, w, wallH);

    // Dark baseboard skirting
    ctx.fillStyle = '#162215';
    ctx.fillRect(0, wallH - 6, w, 6);

    // B. Authentic Bangladeshi Mosaic Terrazzo Floor (মোজাইক মেঝে)
    this.drawMosaicTerrazzoFloor(ctx, wallH, w, h);

    // ============================================================
    // 2. TOP GREEN BLACKBOARD & CLEAN CHALK SCOREBOARD
    // ============================================================
    this.drawTopChalkboard(ctx, bounds, wallH, gameState);

    // Front Wooden Bench Seat behind the desk
    this.drawFrontBenchSeat(ctx, bounds);

    // ============================================================
    // 3. BLACK TUBULAR METAL DESK LEGS
    // ============================================================
    this.drawDeskMetalLegs(ctx, bounds);

    // ============================================================
    // 4. WOODEN HIGH-BENCH TABLE ARENA (Gamari / Teak Wood)
    // ============================================================

    // Soft 3D Drop Shadow on Floor
    ctx.save();
    ctx.shadowColor = 'rgba(0, 0, 0, 0.70)';
    ctx.shadowBlur = 26;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 16;

    // Outer Wooden Rim / Bevel
    ctx.fillStyle = '#4a2007';
    ctx.beginPath();
    ctx.roundRect(bounds.minX - 5, bounds.minY - 5, deskW + 10, deskH + 14, 4);
    ctx.fill();
    ctx.restore();

    // Tabletop Wood Surface
    ctx.save();
    ctx.beginPath();
    ctx.rect(bounds.minX, bounds.minY, deskW, deskH);
    ctx.clip();

    // Authentic Bangladeshi Teak / Gamari Wood Gradient
    const woodGrad = ctx.createLinearGradient(bounds.minX, bounds.minY, bounds.maxX, bounds.maxY);
    woodGrad.addColorStop(0, '#c67332'); // Warm teak honey-brown
    woodGrad.addColorStop(0.3, '#b05e24');
    woodGrad.addColorStop(0.7, '#964816');
    woodGrad.addColorStop(1, '#78330c'); // Deep varnished patina
    ctx.fillStyle = woodGrad;
    ctx.fillRect(bounds.minX, bounds.minY, deskW, deskH);

    // Longitudinal fine wood grain flow
    ctx.strokeStyle = 'rgba(90, 35, 8, 0.12)';
    ctx.lineWidth = 1.8;
    for (let i = 0; i < 28; i++) {
      const gy = bounds.minY + (i * deskH) / 28;
      ctx.beginPath();
      ctx.moveTo(bounds.minX, gy);
      ctx.bezierCurveTo(
        bounds.minX + deskW * 0.35, gy + Math.sin(i * 1.5) * 8,
        bounds.minX + deskW * 0.70, gy - Math.sin(i * 1.5) * 8,
        bounds.maxX, gy
      );
      ctx.stroke();
    }

    // Horizontal Plank Seam & Pencil Groove (Two wide horizontal wooden planks)
    const seamY = bounds.minY + deskH * 0.48;
    ctx.strokeStyle = 'rgba(50, 18, 5, 0.45)';
    ctx.lineWidth = 2.2;
    ctx.beginPath();
    ctx.moveTo(bounds.minX, seamY);
    ctx.lineTo(bounds.maxX, seamY);
    ctx.stroke();

    // Subtle highlighted lower edge on seam
    ctx.strokeStyle = 'rgba(255, 230, 195, 0.22)';
    ctx.lineWidth = 1.2;
    ctx.beginPath();
    ctx.moveTo(bounds.minX, seamY + 2);
    ctx.lineTo(bounds.maxX, seamY + 2);
    ctx.stroke();

    // White Chalk Dust Smudge along top edge
    const chalkDust = ctx.createLinearGradient(0, bounds.minY, 0, bounds.minY + 24);
    chalkDust.addColorStop(0, 'rgba(255, 255, 255, 0.14)');
    chalkDust.addColorStop(1, 'rgba(255, 255, 255, 0)');
    ctx.fillStyle = chalkDust;
    ctx.fillRect(bounds.minX, bounds.minY, deskW, 24);

    // ============================================================
    // 5. TEA / WATER MUG RING STAIN
    // ============================================================
    this.drawTeaMugRingStain(ctx, bounds.minX + deskW * 0.78, bounds.minY + deskH * 0.22, 22);

    // ============================================================
    // 6. SCRATCHES & COMPASS ETCHINGS
    // ============================================================
    this.drawTableScratchesAndCarvings(ctx, bounds, deskW, deskH);

    ctx.restore();

    // 3D Table Top & Left Edge Lighting Highlights
    ctx.strokeStyle = 'rgba(255, 235, 195, 0.40)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(bounds.minX, bounds.maxY);
    ctx.lineTo(bounds.minX, bounds.minY);
    ctx.lineTo(bounds.maxX, bounds.minY);
    ctx.stroke();

    // 3D Table Bottom & Right Edge Bevel Shade
    ctx.strokeStyle = '#3a1604';
    ctx.lineWidth = 3.5;
    ctx.beginPath();
    ctx.moveTo(bounds.minX, bounds.maxY);
    ctx.lineTo(bounds.maxX, bounds.maxY);
    ctx.lineTo(bounds.maxX, bounds.minY);
    ctx.stroke();

    // ============================================================
    // 7. FLOATING TORN PAPER TURN BADGE
    // ============================================================
    this.drawTornPaperTurnBadge(ctx, bounds, gameState);

    // Floating Classmate Banter
    this.renderFloatingClassmatesBanter(ctx);
  }

  drawMosaicTerrazzoFloor(ctx, wallH, w, h) {
    ctx.save();
    // Warm buff-cream cement base
    const floorGrad = ctx.createLinearGradient(0, wallH, 0, h);
    floorGrad.addColorStop(0, '#cec7b6');
    floorGrad.addColorStop(0.5, '#c5bea9');
    floorGrad.addColorStop(1, '#b8b09b');
    ctx.fillStyle = floorGrad;
    ctx.fillRect(0, wallH, w, h - wallH);

    // Brass/Glass Mosaic Divider Grid (Large rectangular terrazzo sections)
    const gridW = 120;
    const gridH = 90;
    ctx.strokeStyle = 'rgba(110, 95, 75, 0.35)';
    ctx.lineWidth = 1.2;

    for (let x = 0; x < w; x += gridW) {
      ctx.beginPath();
      ctx.moveTo(x, wallH);
      ctx.lineTo(x, h);
      ctx.stroke();
    }
    for (let y = wallH; y < h; y += gridH) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(w, y);
      ctx.stroke();
    }

    // Embedded Multi-Colored Terrazzo Stone Chips (Black, Terracotta, White)
    const chips = [
      'rgba(40, 35, 30, 0.35)', // Black chip
      'rgba(180, 75, 50, 0.30)', // Terracotta red chip
      'rgba(255, 255, 255, 0.50)', // White quartz chip
      'rgba(90, 80, 70, 0.28)'  // Grey granite chip
    ];

    for (let i = 0; i < 90; i++) {
      const cx = (Math.sin(i * 123.4) * 0.5 + 0.5) * w;
      const cy = wallH + (Math.cos(i * 78.9) * 0.5 + 0.5) * (h - wallH);
      const size = 1.5 + (i % 3);
      ctx.fillStyle = chips[i % chips.length];
      ctx.beginPath();
      ctx.arc(cx, cy, size, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.restore();
  }

  drawTopChalkboard(ctx, bounds, wallH, gameState) {
    ctx.save();
    const w = this.width;
    const boardW = Math.min(w * 0.72, 600);
    const boardH = Math.max(65, wallH * 0.82);
    const boardX = (w - boardW) / 2;
    const boardY = Math.max(8, (wallH - boardH) / 2);

    // Wooden Blackboard Frame
    ctx.fillStyle = '#3e230e';
    ctx.shadowColor = 'rgba(0, 0, 0, 0.65)';
    ctx.shadowBlur = 10;
    ctx.shadowOffsetY = 4;
    ctx.fillRect(boardX - 5, boardY - 5, boardW + 10, boardH + 10);

    // Deep Green Blackboard Surface
    const boardGrad = ctx.createLinearGradient(boardX, boardY, boardX, boardY + boardH);
    boardGrad.addColorStop(0, '#173021');
    boardGrad.addColorStop(0.5, '#132a1c');
    boardGrad.addColorStop(1, '#0f2216');
    ctx.fillStyle = boardGrad;
    ctx.fillRect(boardX, boardY, boardW, boardH);

    // Chalk tray
    ctx.shadowColor = 'transparent';
    ctx.fillStyle = '#2a1606';
    ctx.fillRect(boardX - 3, boardY + boardH, boardW + 6, 4);

    // White & colored chalk sticks on tray
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(boardX + 22, boardY + boardH + 1, 12, 2.5);
    ctx.fillStyle = '#ffee58';
    ctx.fillRect(boardX + 38, boardY + boardH + 1, 10, 2.5);
    ctx.fillStyle = '#f48fb1';
    ctx.fillRect(boardX + 52, boardY + boardH + 1, 9, 2.5);

    // Felt Duster
    ctx.fillStyle = '#8d5427';
    ctx.fillRect(boardX + 68, boardY + boardH - 2, 22, 6);
    ctx.fillStyle = '#211208';
    ctx.fillRect(boardX + 68, boardY + boardH + 4, 22, 2);

    // ===== CLEAN LIVE CHALK SCOREBOARD =====
    const p1Score = gameState ? (gameState.scores?.p1 || 0) : 0;
    const p2Score = gameState ? (gameState.scores?.p2 || 0) : 0;
    const isTwoPlayer = gameState && gameState.mode === 'TWO_PLAYER';
    const targetScore = (gameState && gameState.targetScore) || 3;

    // Column 1: Live Scoreboard (Clean live chalk points)
    ctx.fillStyle = 'rgba(184, 242, 210, 0.95)';
    ctx.font = 'bold 11.5px "Lora", "Noto Serif Bengali", serif';
    ctx.textAlign = 'left';
    ctx.fillText('PEN FIGHT SCORE', boardX + 16, boardY + 18);

    // Player 1 Row with Live Score Number
    ctx.fillStyle = 'rgba(245, 238, 220, 0.95)';
    ctx.font = 'bold 11.5px "Noto Serif Bengali", "Lora", serif';
    ctx.fillText(`প্লেয়ার ১ : ${p1Score}`, boardX + 16, boardY + 38);

    // Player 1 Tally Score Boxes
    for (let i = 0; i < targetScore; i++) {
      const boxX = boardX + 86 + i * 13;
      const boxY = boardY + 28;
      ctx.strokeStyle = 'rgba(245, 238, 220, 0.45)';
      ctx.lineWidth = 1.2;
      ctx.strokeRect(boxX, boxY, 9, 9);
      if (i < p1Score) {
        ctx.fillStyle = '#7ecba1';
        ctx.fillRect(boxX + 1.5, boxY + 1.5, 6, 6);
      }
    }

    // Player 2 / Opponent Row with Live Score Number
    const p2Label = isTwoPlayer ? 'প্লেয়ার ২' : 'প্রতিপক্ষ';
    ctx.fillStyle = 'rgba(245, 238, 220, 0.95)';
    ctx.fillText(`${p2Label} : ${p2Score}`, boardX + 16, boardY + 56);

    // Player 2 Tally Score Boxes
    for (let i = 0; i < targetScore; i++) {
      const boxX = boardX + 86 + i * 13;
      const boxY = boardY + 46;
      ctx.strokeStyle = 'rgba(245, 238, 220, 0.45)';
      ctx.lineWidth = 1.2;
      ctx.strokeRect(boxX, boxY, 9, 9);
      if (i < p2Score) {
        ctx.fillStyle = '#7ecba1';
        ctx.fillRect(boxX + 1.5, boxY + 1.5, 6, 6);
      }
    }

    // Column 2: Thought for the Day (Center)
    ctx.fillStyle = 'rgba(184, 242, 210, 0.95)';
    ctx.font = 'bold 10.5px "Lora", serif';
    ctx.textAlign = 'center';
    ctx.fillText('Thought for the Day :', boardX + boardW * 0.54, boardY + 20);

    ctx.fillStyle = 'rgba(245, 238, 220, 0.85)';
    ctx.font = 'italic 10px "Lora", serif';
    ctx.fillText('"Practice makes a man perfect"', boardX + boardW * 0.54, boardY + 36);

    // Column 3: Geometry Triangle & Match Status (Right)
    ctx.strokeStyle = 'rgba(245, 238, 220, 0.35)';
    ctx.lineWidth = 1.1;
    ctx.beginPath();
    ctx.moveTo(boardX + boardW - 48, boardY + 48);
    ctx.lineTo(boardX + boardW - 28, boardY + 16);
    ctx.lineTo(boardX + boardW - 10, boardY + 48);
    ctx.closePath();
    ctx.stroke();

    ctx.fillStyle = 'rgba(245, 238, 220, 0.6)';
    ctx.font = '9px "Lora", serif';
    ctx.textAlign = 'right';
    ctx.fillText('Match: 1v1', boardX + boardW - 55, boardY + 56);

    ctx.restore();
  }

  drawFrontBenchSeat(ctx, bounds) {
    ctx.save();
    const w = bounds.maxX - bounds.minX;
    const benchY = bounds.minY - 26;
    const benchH = 16;

    ctx.fillStyle = '#653514';
    ctx.shadowColor = 'rgba(0, 0, 0, 0.35)';
    ctx.shadowBlur = 5;
    ctx.shadowOffsetY = 3;
    ctx.fillRect(bounds.minX + w * 0.12, benchY, w * 0.76, benchH);

    ctx.fillStyle = '#7a421a';
    ctx.fillRect(bounds.minX + w * 0.12, benchY, w * 0.76, 2.5);
    ctx.restore();
  }

  drawDeskMetalLegs(ctx, bounds) {
    ctx.save();
    const deskW = bounds.maxX - bounds.minX;
    const legW = 12;
    const legY1 = bounds.maxY;
    const legY2 = bounds.maxY + Math.min(this.height * 0.08, 60);

    ctx.fillStyle = '#1c1c1c';
    ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
    ctx.shadowBlur = 8;

    // Left Leg
    ctx.fillRect(bounds.minX + 14, legY1, legW, legY2 - legY1);
    // Right Leg
    ctx.fillRect(bounds.maxX - 14 - legW, legY1, legW, legY2 - legY1);

    // Crossbar
    ctx.fillRect(bounds.minX + 14, legY1 + (legY2 - legY1) * 0.5, deskW - 28, 6);

    // Feet
    ctx.fillStyle = '#0a0a0a';
    ctx.fillRect(bounds.minX + 10, legY2 - 3, legW + 8, 5);
    ctx.fillRect(bounds.maxX - 18 - legW, legY2 - 3, legW + 8, 5);

    ctx.restore();
  }

  drawTeaMugRingStain(ctx, cx, cy, radius) {
    ctx.save();
    ctx.strokeStyle = 'rgba(105, 55, 18, 0.35)';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(cx, cy, radius, 0, Math.PI * 2);
    ctx.stroke();

    ctx.strokeStyle = 'rgba(85, 40, 12, 0.22)';
    ctx.lineWidth = 1.2;
    ctx.beginPath();
    ctx.arc(cx + 1, cy + 1, radius - 2, 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();
  }

  drawTableScratchesAndCarvings(ctx, bounds, deskW, deskH) {
    ctx.save();

    // Natural wood scratches
    for (const s of this.scratches) {
      ctx.strokeStyle = `rgba(255, 235, 205, ${s.alpha})`;
      ctx.lineWidth = s.width;
      ctx.beginPath();
      ctx.moveTo(s.x1, s.y1);
      ctx.lineTo(s.x2, s.y2);
      ctx.stroke();
    }

    ctx.strokeStyle = 'rgba(65, 28, 10, 0.45)';
    ctx.lineWidth = 1.1;

    // ============================================================
    // 1. TOP-LEFT: TIC-TAC-TOE (#) with X & O
    // ============================================================
    const tX = bounds.minX + deskW * 0.12;
    const tY = bounds.minY + deskH * 0.18;
    ctx.beginPath();
    ctx.moveTo(tX - 12, tY - 4); ctx.lineTo(tX + 12, tY - 4);
    ctx.moveTo(tX - 12, tY + 4); ctx.lineTo(tX + 12, tY + 4);
    ctx.moveTo(tX - 4, tY - 12); ctx.lineTo(tX - 4, tY + 12);
    ctx.moveTo(tX + 4, tY - 12); ctx.lineTo(tX + 4, tY + 12);
    ctx.stroke();

    ctx.font = 'bold 8px sans-serif';
    ctx.fillStyle = 'rgba(70, 30, 10, 0.40)';
    ctx.fillText('X', tX - 9, tY - 6);
    ctx.fillText('O', tX + 1, tY - 6);
    ctx.fillText('X', tX + 1, tY + 3);

    // ============================================================
    // 2. TOP-LEFT COMPASS CIRCLES WITH CENTER HOLES
    // ============================================================
    ctx.beginPath();
    ctx.arc(bounds.minX + deskW * 0.08, bounds.minY + deskH * 0.35, 14, 0, Math.PI * 2);
    ctx.arc(bounds.minX + deskW * 0.08, bounds.minY + deskH * 0.35, 20, 0, Math.PI * 2);
    ctx.stroke();
    ctx.fillStyle = 'rgba(40, 15, 5, 0.6)';
    ctx.fillRect(bounds.minX + deskW * 0.08 - 1, bounds.minY + deskH * 0.35 - 1, 2, 2);

    // ============================================================
    // 3. "Nadim + Ruhi (1998)" PROMINENT COMPASS LOVE ENGRAVING
    // ============================================================
    ctx.save();
    ctx.translate(bounds.minX + deskW * 0.23, bounds.minY + deskH * 0.24);
    ctx.rotate(-0.06);

    // Deep wood groove shadow
    ctx.font = 'bold 13px "Noto Serif Bengali", "Lora", serif';
    ctx.fillStyle = 'rgba(45, 18, 6, 0.70)';
    ctx.fillText('Nadim + Ruhi (1998)', 1, 1);

    // Engraved chisel text
    ctx.fillStyle = 'rgba(80, 26, 8, 0.85)';
    ctx.fillText('Nadim + Ruhi (1998)', 0, 0);

    // Subtle wood edge highlight
    ctx.fillStyle = 'rgba(255, 235, 205, 0.28)';
    ctx.fillText('Nadim + Ruhi (1998)', -0.5, -0.5);

    // Compass arrow pierced through the wood
    ctx.strokeStyle = 'rgba(65, 22, 8, 0.55)';
    ctx.lineWidth = 1.2;
    ctx.beginPath();
    ctx.moveTo(-10, 4);
    ctx.lineTo(135, -7);
    ctx.lineTo(127, -12);
    ctx.moveTo(135, -7);
    ctx.lineTo(129, -1);
    ctx.stroke();

    ctx.restore();

    // ============================================================
    // 4. EXAM CHEATING FORMULAS CARVED ON WOOD
    // ============================================================
    ctx.save();
    ctx.translate(bounds.minX + deskW * 0.14, bounds.minY + deskH * 0.78);
    ctx.rotate(0.04);
    ctx.font = '8.5px monospace';
    ctx.fillStyle = 'rgba(60, 25, 8, 0.42)';
    ctx.fillText('(a+b)² = a² + 2ab + b²', 0, 0);
    ctx.fillText('F = ma | v = u + at', 0, 11);
    ctx.restore();

    // ============================================================
    // 5. MID-BENCH: "SSC batch 2020 • ১০০% পাস"
    // ============================================================
    ctx.save();
    ctx.translate(bounds.minX + deskW * 0.42, bounds.minY + deskH * 0.84);
    ctx.font = 'bold 11.5px "Noto Serif Bengali", "Lora", serif';
    ctx.fillStyle = 'rgba(65, 25, 10, 0.50)';
    ctx.fillText('SSC batch 2020 • ১০০% পাস', 0, 0);
    ctx.restore();

    // ============================================================
    // 6. NOSTALGIC CLASSROOM BANTER: "বড় হয়ে কি হবি? - বেকার"
    // ============================================================
    ctx.save();
    ctx.translate(bounds.minX + deskW * 0.40, bounds.minY + deskH * 0.16);
    ctx.rotate(-0.03);
    ctx.font = 'italic 10.5px "Noto Serif Bengali", "Lora", serif';
    ctx.fillStyle = 'rgba(70, 30, 10, 0.42)';
    ctx.fillText('বড় হয়ে কি হবি? - বেকার', 0, 0);
    ctx.restore();

    // ============================================================
    // 7. CENTER-RIGHT: "ক্যাপ চুরি করিস না কেউ!"
    // ============================================================
    ctx.save();
    ctx.translate(bounds.minX + deskW * 0.60, bounds.minY + deskH * 0.28);
    ctx.rotate(0.05);
    ctx.font = 'bold 10px "Noto Serif Bengali", "Lora", serif';
    ctx.fillStyle = 'rgba(85, 25, 10, 0.45)';
    ctx.fillText('ক্যাপ চুরি করিস না কেউ!', 0, 0);
    ctx.restore();

    // ============================================================
    // 8. RIGHT: "Raju (Roll 42) - লাস্ট বেঞ্চের ডন"
    // ============================================================
    ctx.save();
    ctx.translate(bounds.minX + deskW * 0.68, bounds.minY + deskH * 0.68);
    ctx.rotate(-0.04);
    ctx.font = 'bold 11px "Noto Serif Bengali", "Lora", serif';
    ctx.fillStyle = 'rgba(65, 25, 10, 0.46)';
    ctx.fillText('Raju (Roll 42) - লাস্ট বেঞ্চের ডন', 0, 0);

    ctx.font = 'italic 9.5px "Noto Serif Bengali", "Lora", serif';
    ctx.fillStyle = 'rgba(60, 25, 8, 0.38)';
    ctx.fillText('স্যার দেখতেছে! চুপ থাক!', 0, 13);
    ctx.restore();

    // ============================================================
    // 9. RIGHT CORNER: "LAST BENCHERS RULE" & INITIALS
    // ============================================================
    ctx.save();
    ctx.translate(bounds.minX + deskW * 0.85, bounds.minY + deskH * 0.25);
    ctx.rotate(Math.PI / 2);
    ctx.font = 'bold 8.5px monospace';
    ctx.fillStyle = 'rgba(60, 25, 8, 0.38)';
    ctx.fillText('LAST BENCHERS RULE', 0, 0);
    ctx.restore();

    // Engraved initials "AJ", "SH", "RN"
    ctx.save();
    ctx.translate(bounds.minX + deskW * 0.88, bounds.minY + deskH * 0.78);
    ctx.rotate(0.15);
    ctx.font = 'bold 15px "Noto Serif Bengali", "Lora", serif';
    ctx.fillStyle = 'rgba(70, 30, 10, 0.42)';
    ctx.fillText('AJ', 0, 0);

    ctx.font = 'bold 12px "Noto Serif Bengali", "Lora", serif';
    ctx.fillText('SH + RN', -12, 14);
    ctx.restore();

    // ============================================================
    // 10. SCRATCHED RULER SCALE MARKINGS ON WOOD
    // ============================================================
    const rulerX = bounds.minX + deskW * 0.32;
    const rulerY = bounds.minY + deskH * 0.52;
    ctx.beginPath();
    ctx.moveTo(rulerX, rulerY);
    ctx.lineTo(rulerX + 110, rulerY);
    ctx.stroke();

    for (let i = 0; i <= 10; i++) {
      const markX = rulerX + i * 11;
      const markH = (i % 5 === 0) ? 6 : 3.5;
      ctx.beginPath();
      ctx.moveTo(markX, rulerY - markH);
      ctx.lineTo(markX, rulerY + markH);
      ctx.stroke();
    }

    ctx.font = '7px monospace';
    ctx.fillStyle = 'rgba(60, 25, 8, 0.32)';
    ctx.fillText('0', rulerX - 2, rulerY - 8);
    ctx.fillText('5cm', rulerX + 48, rulerY - 8);
    ctx.fillText('10cm', rulerX + 98, rulerY - 8);

    ctx.restore();
  }

  drawTornPaperTurnBadge(ctx, bounds, gameState) {
    ctx.save();
    const w = bounds.maxX - bounds.minX;
    const badgeX = bounds.minX + w * 0.5;
    const badgeY = bounds.minY - 18;

    const turnText = gameState && gameState.currentTurn === 'p2'
      ? (gameState.mode === 'TWO_PLAYER' ? 'প্লেয়ার ২ এর চাল' : 'বট নিশানা করছে...')
      : 'আপনার চাল (Your Turn)';

    ctx.font = 'bold 12px "Noto Serif Bengali", "Lora", serif';
    const textMetrics = ctx.measureText(turnText);
    const badgeW = textMetrics.width + 26;
    const badgeH = 24;

    ctx.translate(badgeX, badgeY);

    const bob = Math.sin(Date.now() / 300) * 1.2;
    ctx.translate(0, bob);

    // Shadow
    ctx.fillStyle = 'rgba(0, 0, 0, 0.32)';
    ctx.beginPath();
    ctx.roundRect(-badgeW / 2 + 1.5, -badgeH / 2 + 2.5, badgeW, badgeH, 3);
    ctx.fill();

    // Paper chit
    ctx.fillStyle = '#f8f4e8';
    ctx.strokeStyle = '#d6cca8';
    ctx.lineWidth = 0.9;

    ctx.beginPath();
    const hw = badgeW / 2;
    const hh = badgeH / 2;

    ctx.moveTo(-hw, -hh);
    ctx.lineTo(-hw * 0.5, -hh - 1.2);
    ctx.lineTo(0, -hh);
    ctx.lineTo(hw * 0.5, -hh - 1.2);
    ctx.lineTo(hw, -hh);
    ctx.lineTo(hw + 1.2, 0);
    ctx.lineTo(hw, hh);
    ctx.lineTo(hw * 0.5, hh + 1.2);
    ctx.lineTo(0, hh);
    ctx.lineTo(-hw * 0.5, hh + 1.2);
    ctx.lineTo(-hw, hh);
    ctx.lineTo(-hw - 1.2, 0);
    ctx.closePath();

    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = '#1e3a8a';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(turnText, 0, 0);

    ctx.restore();
  }

  renderFloatingClassmatesBanter(ctx) {
    ctx.save();
    for (const c of this.floatingChatters) {
      const alpha = Math.min(1, (c.life / c.maxLife) * 1.6);
      ctx.save();
      ctx.translate(c.x, c.y);
      ctx.globalAlpha = Math.max(0, alpha);

      ctx.font = 'bold 11px "Hind Siliguri", sans-serif';
      const textMetrics = ctx.measureText(c.text);
      const bubbleW = textMetrics.width + 16;
      const bubbleH = 22;

      ctx.fillStyle = 'rgba(255, 255, 255, 0.95)';
      ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
      ctx.shadowBlur = 6;
      ctx.beginPath();
      ctx.roundRect(-bubbleW / 2, -bubbleH, bubbleW, bubbleH, 5);
      ctx.fill();

      ctx.beginPath();
      ctx.moveTo(-3, 0);
      ctx.lineTo(3, 0);
      ctx.lineTo(0, 4);
      ctx.closePath();
      ctx.fill();

      ctx.shadowColor = 'transparent';
      ctx.fillStyle = '#0d47a1';
      ctx.textAlign = 'center';
      ctx.fillText(c.text, 0, -6);

      ctx.restore();
    }
    ctx.restore();
  }
}
