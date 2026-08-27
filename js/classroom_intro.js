// Safe roundRect polyfill for canvas context across all browser versions
if (typeof CanvasRenderingContext2D !== 'undefined' && !CanvasRenderingContext2D.prototype.roundRect) {
  CanvasRenderingContext2D.prototype.roundRect = function (x, y, w, h, radii) {
    let r = typeof radii === 'number' ? radii : (Array.isArray(radii) ? radii[0] : 0) || 0;
    r = Math.min(r, Math.abs(w) / 2, Math.abs(h) / 2);
    this.beginPath();
    this.moveTo(x + r, y);
    this.lineTo(x + w - r, y);
    this.arcTo(x + w, y, x + w, y + r, r);
    this.lineTo(x + w, y + h - r);
    this.arcTo(x + w, y + h, x + w - r, y + h, r);
    this.lineTo(x + r, y + h);
    this.arcTo(x, y + h, x, y + h - r, r);
    this.lineTo(x, y + r);
    this.arcTo(x, y, x + r, y, r);
    this.closePath();
    return this;
  };
}

/**
 * Bangladeshi School Classroom Environment, 3D Perspective, Animated Students & Interactive Tour
 * Complete Implementation with all 3D environment components & animated student characters.
 */
export class ClassroomIntro {
  constructor(canvasWidth, canvasHeight) {
    this.width = canvasWidth;
    this.height = canvasHeight;

    this.animTime = 0;
    this.fanAngle = 0;
    this.fanSpeed = 3.5;

    this.zoomProgress = 0;
    this.isZooming = false;
    this.onZoomComplete = null;

    // 3D Parallax Tilt Offsets
    this.panX = 0;
    this.panY = 0;
    this.targetPanX = 0;
    this.targetPanY = 0;

    // Weather mode: 'sunny' or 'rainy'
    this.weather = 'sunny';
    this.raindrops = [];
    this.initRaindrops();

    // Chalk dust particles
    this.dustParticles = [];
    this.boardDustParticles = [];
    this.initDustParticles();

    // Active Flying Paper Airplanes
    this.flyingPlanes = [];
    this.planeTimer = 0;

    // Passing Paper Notes
    this.paperNotes = [];

    // Chalkboard Duster Animation State
    this.dusterAnim = {
      active: false,
      progress: 0
    };

    // Hotspots & Hover
    this.hoveredHotspot = null;
    this.activeStudentDialogue = null;
    this.studentDialogueTimer = 0;

    // Quotes for the blackboard
    this.chalkQuoteIndex = 0;
    this.chalkQuotes = [
      {
        titleBN: 'আজকের বিষয়: স্কুল পেন ফাইট',
        subBN: '"দাইন দাইন তিন দাইন - যে জিতবে সেই ফাইন!"',
        extraBN: 'তারিখ: ২৭/০৮ • ক্লাস: দশম শ্রেণী • সেকশন: এ (SSC batch 2020)'
      },
      {
        titleBN: 'সাইলেন্স প্লিজ! স্যার ক্লাসে আসছেন!',
        subBN: 'আজকের পড়া: বীজগণিত ও উপপাদ্য (পৃষ্ঠা ৮৪)',
        extraBN: 'হোমওয়ার্ক না করলে কান ধরে টেবিলের ওপর দাঁড়াতে হবে!'
      },
      {
        titleBN: 'টিফিনের পর আর কোনো পেন ফাইট নয়!',
        subBN: 'লাস্ট বেঞ্চের সবাইকে ডেকেছেন হেডস্যার!',
        extraBN: 'কাটাকুটি ও পেন ফাইট সম্পূর্ণ নিষিদ্ধ!'
      },
      {
        titleBN: 'পদার্থবিজ্ঞান: নিউটনের ৩য় সূত্র',
        subBN: '"প্রত্যেক ক্রিয়ারই একটি সমান ও বিপরীত প্রতিক্রিয়া আছে"',
        extraBN: '(ঠিক যেমন পেনের টোকা ও রিবাউন্ড!)'
      }
    ];

    // Floating student chatter bubbles
    this.floatingChatters = [];
    this.chatterTimer = 0;
    this.chatterPhrases = [
      'দোস্ত কলমটা দে!',
      'টিফিনে সিঙ্গাড়া খাব!',
      'স্যার আসতাছে, চুপ!',
      'কাটাকুটি খেলবি?',
      'লাস্ট বেঞ্চে পেন ফাইট!',
      'দাইন দাইন তিন দাইন!',
      'হোমওয়ার্ক খাতাটা দে একটু!',
      'আরেহ ওইটা ফাউল শট!',
      'রোল ১ ফার্স্ট বয়!',
      'পেন ড্রপ! আউট আউট!'
    ];
  }

  initRaindrops() {
    this.raindrops = [];
    for (let i = 0; i < 70; i++) {
      this.raindrops.push({
        x: Math.random() * this.width,
        y: Math.random() * this.height,
        len: Math.random() * 16 + 10,
        speed: Math.random() * 280 + 240
      });
    }
  }

  initDustParticles() {
    this.dustParticles = [];
    for (let i = 0; i < 45; i++) {
      this.dustParticles.push({
        x: Math.random() * this.width,
        y: Math.random() * this.height * 0.72,
        vx: (Math.random() - 0.5) * 14,
        vy: (Math.random() - 0.5) * 9,
        size: Math.random() * 2.4 + 0.8,
        alpha: Math.random() * 0.5 + 0.2
      });
    }
  }

  resize(w, h) {
    this.width = w;
    this.height = h;
    this.initRaindrops();
    this.initDustParticles();
  }

  startZoom(onComplete) {
    this.isZooming = true;
    this.zoomProgress = 0;
    this.onZoomComplete = onComplete;
  }

  cycleChalkQuote() {
    this.chalkQuoteIndex = (this.chalkQuoteIndex + 1) % this.chalkQuotes.length;
    this.triggerBoardCleanAnimation();
    return this.chalkQuotes[this.chalkQuoteIndex];
  }

  triggerBoardCleanAnimation() {
    this.dusterAnim.active = true;
    this.dusterAnim.progress = 0;
    const boardW = Math.min(this.width * 0.48, 580);
    const boardX = (this.width - boardW) / 2;
    const boardY = this.height * 0.06;
    for (let i = 0; i < 25; i++) {
      this.boardDustParticles.push({
        x: boardX + Math.random() * boardW,
        y: boardY + Math.random() * (this.height * 0.35),
        vx: (Math.random() - 0.5) * 30,
        vy: Math.random() * 40 + 20,
        size: Math.random() * 3 + 1,
        alpha: 0.9,
        life: 1.2,
        maxLife: 1.2
      });
    }
  }

  toggleWeather() {
    this.weather = this.weather === 'sunny' ? 'rainy' : 'sunny';
    return this.weather;
  }

  setFanSpeed(level) {
    if (level === 0) this.fanSpeed = 0;
    else if (level === 1) this.fanSpeed = 2.0;
    else this.fanSpeed = 5.5;
  }

  triggerStudentSpeech(text, x, y) {
    this.activeStudentDialogue = { text, x, y };
    this.studentDialogueTimer = 3.5;
  }

  /**
   * Launch a 3D flying paper airplane across the classroom
   */
  launchPaperAirplane(fromX, fromY) {
    const sx = fromX !== undefined ? fromX : this.width * 0.34;
    const sy = fromY !== undefined ? fromY : this.height * 0.46;
    const targetX = this.width * (0.6 + Math.random() * 0.3);
    const targetY = this.height * (0.7 + Math.random() * 0.15);

    this.flyingPlanes.push({
      x: sx,
      y: sy,
      startX: sx,
      startY: sy,
      targetX: targetX,
      targetY: targetY,
      progress: 0,
      speed: 0.42 + Math.random() * 0.15,
      arcHeight: -(80 + Math.random() * 60),
      rotZ: -0.3,
      trail: [],
      life: 1.0
    });
  }

  update(dt) {
    this.animTime += dt;
    this.fanAngle += dt * this.fanSpeed;

    // Update dust motes
    for (const d of this.dustParticles) {
      d.x += d.vx * dt;
      d.y += d.vy * dt;
      if (d.x < 0) d.x = this.width;
      if (d.x > this.width) d.x = 0;
      if (d.y < 0) d.y = this.height * 0.72;
      if (d.y > this.height * 0.72) d.y = 0;
    }

    // Update board dust particles
    for (let i = this.boardDustParticles.length - 1; i >= 0; i--) {
      const p = this.boardDustParticles[i];
      p.life -= dt;
      p.x += p.vx * dt;
      p.y += p.vy * dt;
      p.alpha = Math.max(0, p.life / p.maxLife);
      if (p.life <= 0) {
        this.boardDustParticles.splice(i, 1);
      }
    }

    // Update board duster animation
    if (this.dusterAnim.active) {
      this.dusterAnim.progress += dt * 1.8;
      if (this.dusterAnim.progress >= 1.0) {
        this.dusterAnim.active = false;
      }
    }

    // Update raindrops
    if (this.weather === 'rainy') {
      for (const r of this.raindrops) {
        r.y += r.speed * dt;
        r.x -= r.speed * dt * 0.28;
        if (r.y > this.height) {
          r.y = -10;
          r.x = Math.random() * (this.width + 120);
        }
      }
    }

    // Periodic automatic paper airplane launch
    if (!this.isZooming) {
      this.planeTimer += dt;
      if (this.planeTimer > 9.0) {
        this.planeTimer = 0;
        this.launchPaperAirplane();
      }
    }

    // Update flying paper airplanes
    for (let i = this.flyingPlanes.length - 1; i >= 0; i--) {
      const p = this.flyingPlanes[i];
      p.progress += dt * p.speed;

      const t = p.progress;
      const ctrlX = (p.startX + p.targetX) / 2 + 50;
      const ctrlY = Math.min(p.startY, p.targetY) + p.arcHeight;

      const prevX = p.x;
      const prevY = p.y;

      p.x = (1 - t) * (1 - t) * p.startX + 2 * (1 - t) * t * ctrlX + t * t * p.targetX;
      p.y = (1 - t) * (1 - t) * p.startY + 2 * (1 - t) * t * ctrlY + t * t * p.targetY;

      const dx = p.x - prevX;
      const dy = p.y - prevY;
      p.rotZ = Math.atan2(dy, dx);

      if (Math.random() < 0.7) {
        p.trail.push({ x: p.x, y: p.y, alpha: 0.8 });
      }

      for (let j = p.trail.length - 1; j >= 0; j--) {
        p.trail[j].alpha -= dt * 1.5;
        if (p.trail[j].alpha <= 0) p.trail.splice(j, 1);
      }

      if (p.progress >= 1.0) {
        p.life -= dt * 0.8;
        if (p.life <= 0) {
          this.flyingPlanes.splice(i, 1);
        }
      }
    }

    // Update floating student chatter bubbles
    if (!this.isZooming) {
      this.chatterTimer += dt;
      if (this.chatterTimer > 3.2) {
        this.chatterTimer = 0;
        const phrase = this.chatterPhrases[Math.floor(Math.random() * this.chatterPhrases.length)];
        const benchX = this.width * (0.2 + Math.random() * 0.6);
        const benchY = this.height * (0.6 + Math.random() * 0.22);
        this.floatingChatters.push({
          text: phrase,
          x: benchX,
          y: benchY,
          vy: -16,
          life: 2.4,
          maxLife: 2.4
        });
      }
    }

    for (let i = this.floatingChatters.length - 1; i >= 0; i--) {
      const c = this.floatingChatters[i];
      c.life -= dt;
      c.y += c.vy * dt;
      if (c.life <= 0) {
        this.floatingChatters.splice(i, 1);
      }
    }

    // Update active student speech dialogue
    if (this.activeStudentDialogue) {
      this.studentDialogueTimer -= dt;
      if (this.studentDialogueTimer <= 0) {
        this.activeStudentDialogue = null;
      }
    }

    // 3D Pan Smoothing
    this.panX += (this.targetPanX - this.panX) * Math.min(1, dt * 6);
    this.panY += (this.targetPanY - this.panY) * Math.min(1, dt * 6);

    // Zoom progression
    if (this.isZooming) {
      this.zoomProgress += dt * 0.95;
      if (this.zoomProgress >= 1.0) {
        this.zoomProgress = 1.0;
        this.isZooming = false;
        if (this.onZoomComplete) {
          this.onZoomComplete();
        }
      }
    }
  }

  getHotspots() {
    const w = this.width;
    const h = this.height;
    return [
      {
        id: 'chalkboard',
        titleBN: 'সবুজ চকবোর্ড ও ডাস্টার',
        titleEN: 'Green Chalkboard & Duster',
        x: w * 0.5,
        y: h * 0.24,
        radius: Math.min(w * 0.16, 110)
      },
      {
        id: 'teacher_desk',
        titleBN: 'শিক্ষকের টেবিল ও লাল হাজিরা খাতা',
        titleEN: "Teacher's Desk & Attendance Register",
        x: w * 0.14,
        y: h * 0.52,
        radius: 45
      },
      {
        id: 'window',
        titleBN: 'ক্লাসরুমের খোলা জানালা',
        titleEN: 'Classroom Window & Weather',
        x: w * 0.11,
        y: h * 0.26,
        radius: 48
      },
      {
        id: 'student_firstboy',
        titleBN: 'রোল ১ (ফার্স্ট বয়)',
        titleEN: 'Roll 1 (First Boy)',
        x: w * 0.28,
        y: h * 0.69,
        radius: 36
      },
      {
        id: 'student_backbenchers',
        titleBN: 'লাস্ট বেঞ্চের পেন ফাইটাররা',
        titleEN: 'Backbench Pen Fighters',
        x: w * 0.66,
        y: h * 0.61,
        radius: 42
      },
      {
        id: 'student_tiffin',
        titleBN: 'গোপনে টিফিন খাওয়া ছাত্র',
        titleEN: 'Secret Tiffin Muncher',
        x: w * 0.30,
        y: h * 0.58,
        radius: 36
      },
      {
        id: 'student_aviator',
        titleBN: 'কাগজের প্লেন ওড়ানো ছাত্র',
        titleEN: 'Paper Airplane Aviator',
        x: w * 0.34,
        y: h * 0.46,
        radius: 34
      },
      {
        id: 'student_penspinner',
        titleBN: 'পেন স্পিনার ওস্তাদ',
        titleEN: 'Pen Spinning Master',
        x: w * 0.67,
        y: h * 0.69,
        radius: 36
      },
      {
        id: 'student_sleeper',
        titleBN: 'ঘুমন্ত ছাত্র (ব্যাকবেঞ্চার)',
        titleEN: 'The Sleeping Backbencher',
        x: w * 0.62,
        y: h * 0.49,
        radius: 32
      },
      {
        id: 'bench_carvings',
        titleBN: 'হাই-বেঞ্চ ও ক্লাসরুম খোদাই',
        titleEN: 'High-Bench & Student Carvings',
        x: w * 0.5,
        y: h * 0.82,
        radius: 65
      },
      {
        id: 'bangladesh_map',
        titleBN: 'দেয়ালের বাংলাদেশ মানচিত্র',
        titleEN: 'Bangladesh Wall Map',
        x: w * 0.86,
        y: h * 0.22,
        radius: 40
      },
      {
        id: 'school_bell',
        titleBN: 'টিফিনের পিতলের ঘণ্টা',
        titleEN: 'School Brass Gong Bell',
        x: w * 0.88,
        y: h * 0.42,
        radius: 35
      },
      {
        id: 'ceiling_fan',
        titleBN: 'সিলিং ফ্যান (বাম)',
        titleEN: 'Left Ceiling Fan',
        x: w * 0.22,
        y: Math.max(50, h * 0.11),
        radius: 48
      },
      {
        id: 'ceiling_fan_right',
        titleBN: 'সিলিং ফ্যান (ডান)',
        titleEN: 'Right Ceiling Fan',
        x: w * 0.78,
        y: Math.max(50, h * 0.11),
        radius: 48
      }
    ];
  }

  render(ctx, showHotspots = false) {
    ctx.save();

    const w = this.width;
    const h = this.height;

    try {
      ctx.globalAlpha = 1.0;

      if (this.zoomProgress > 0) {
        const ease = this.easeInOutCubic(this.zoomProgress);
        const scale = 1 + ease * 3.4;
        const targetX = w * 0.5;
        const targetY = h * 0.78;

        ctx.translate(targetX, targetY);
        ctx.scale(scale, scale);
        ctx.translate(-targetX, -targetY);
        ctx.globalAlpha = Math.max(0, 1 - ease * 1.15);
      } else {
        ctx.globalAlpha = 1.0;
        if (this.panX !== 0 || this.panY !== 0) {
          ctx.translate(this.panX, this.panY);
        }
      }

      // 1. Back Wall
      const wallHeight = h * 0.52;
      const wallGrad = ctx.createLinearGradient(0, 0, 0, wallHeight);
      wallGrad.addColorStop(0, '#f0e6d2');
      wallGrad.addColorStop(0.7, '#e4d6b6');
      wallGrad.addColorStop(1, '#cbbd9b');
      ctx.fillStyle = wallGrad;
      ctx.fillRect(0, 0, w, wallHeight);

      // Green bottom band
      ctx.fillStyle = '#174a36';
      ctx.fillRect(0, wallHeight - h * 0.065, w, h * 0.065);

      // 2. Floor
      const floorGrad = ctx.createLinearGradient(0, wallHeight, 0, h);
      floorGrad.addColorStop(0, '#5a2218');
      floorGrad.addColorStop(0.4, '#42160e');
      floorGrad.addColorStop(1, '#2a0c06');
      ctx.fillStyle = floorGrad;
      ctx.fillRect(0, wallHeight, w, h - wallHeight);

      // 3D Floor Perspective Lines
      const vpX = w * 0.5;
      ctx.strokeStyle = 'rgba(0, 0, 0, 0.25)';
      ctx.lineWidth = 1.6;

      for (let i = -w * 0.3; i <= w * 1.3; i += w * 0.12) {
        ctx.beginPath();
        ctx.moveTo(vpX + (i - vpX) * 0.2, wallHeight);
        ctx.lineTo(vpX + (i - vpX) * 2.5, h);
        ctx.stroke();
      }

      for (let f = 0; f < 5; f++) {
        const fy = wallHeight + (h - wallHeight) * Math.pow((f + 1) / 5, 1.8);
        ctx.strokeStyle = 'rgba(0, 0, 0, 0.15)';
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.moveTo(0, fy);
        ctx.lineTo(w, fy);
        ctx.stroke();
      }

      // 3. Windows
      const winW = Math.min(w * 0.17, 160);
      const winH = h * 0.34;
      this.drawClassroomWindow(ctx, w * 0.04, h * 0.10, winW, winH);
      this.drawClassroomWindow(ctx, w - winW - w * 0.04, h * 0.10, winW, winH);

      if (this.weather === 'sunny') {
        this.drawSunbeams(ctx, w * 0.04 + winW * 0.5, h * 0.12, w * 0.45, h * 0.65);
      }

      // 4. Blackboard
      const boardW = Math.min(w * 0.48, 580);
      const boardH = h * 0.38;
      const boardX = (w - boardW) / 2;
      const boardY = h * 0.06;
      this.drawChalkboard(ctx, boardX, boardY, boardW, boardH);

      // 5. Map & Bell
      if (w > 700) {
        this.drawBangladeshMap(ctx, w * 0.83, h * 0.12, Math.min(w * 0.10, 105), h * 0.22);
      }
      this.drawSchoolBell(ctx, w * 0.88, h * 0.42);

      // 6. Teacher Desk
      this.drawTeacherDesk(ctx, w * 0.12, h * 0.46, Math.min(w * 0.16, 170), h * 0.18);

      // 7. Benches & Students
      this.render3DBenchesAndStudents(ctx, w, h);

      // 8. Front Hero Bench
      this.drawFrontHeroBench(ctx, w * 0.18, h * 0.74, w * 0.64, h * 0.24);

      // 9. Airplanes
      this.drawActivePaperAirplanes(ctx);

      // 10. Vintage School Ceiling Fans (Hanging from ceiling, fully visible)
      const fanY = Math.max(50, h * 0.11);
      this.drawCeilingFan(ctx, w * 0.22, fanY);
      this.drawCeilingFan(ctx, w * 0.78, fanY);

      // 11. Dust
      this.drawDustMotes(ctx);
      this.drawBoardDust(ctx);

      // 12. Floating Chatters & Student Speech
      this.drawFloatingChatters(ctx);
      this.drawActiveStudentDialogue(ctx);

      // 13. Hotspots (Hover-only tooltips, zero overlap)
      if (showHotspots && this.zoomProgress === 0) {
        this.renderHotspots(ctx);
      }
    } catch (e) {
      console.error('Classroom render error:', e);
    } finally {
      ctx.restore();
    }
  }

  render3DBenchesAndStudents(ctx, w, h) {
    const t = this.animTime;

    // Row 1 (Back)
    const r1Y = h * 0.48;
    const r1H = h * 0.10;
    const r1W = w * 0.23;
    this.draw3DBench(ctx, w * 0.25, r1Y, r1W, r1H, 0.58);
    this.drawStudentAviator(ctx, w * 0.34, r1Y - 14, 0.58, t);
    this.draw3DBench(ctx, w * 0.52, r1Y, r1W, r1H, 0.58);
    this.drawStudentSleeper(ctx, w * 0.62, r1Y - 10, 0.58, t);

    // Row 2 (Mid)
    const r2Y = h * 0.57;
    const r2H = h * 0.12;
    const r2W = w * 0.26;
    this.draw3DBench(ctx, w * 0.21, r2Y, r2W, r2H, 0.74);
    this.drawStudentTiffinMuncher(ctx, w * 0.30, r2Y - 18, 0.74, t);
    this.draw3DBench(ctx, w * 0.53, r2Y, r2W, r2H, 0.74);
    this.drawStudentChattyDuo(ctx, w * 0.61, w * 0.71, r2Y - 18, 0.74, t);

    // Row 3 (Front-Mid)
    const r3Y = h * 0.66;
    const r3H = h * 0.14;
    const r3W = w * 0.29;
    this.draw3DBench(ctx, w * 0.17, r3Y, r3W, r3H, 0.88);
    this.drawStudentFirstBoy(ctx, w * 0.28, r3Y - 22, 0.88, t);
    this.draw3DBench(ctx, w * 0.54, r3Y, r3W, r3H, 0.88);
    this.drawStudentPenSpinner(ctx, w * 0.67, r3Y - 22, 0.88, t);
  }

  draw3DBench(ctx, x, y, w, h, scale) {
    ctx.save();
    ctx.fillStyle = 'rgba(0, 0, 0, 0.45)';
    ctx.beginPath();
    ctx.ellipse(x + w * 0.5, y + h * 0.95, w * 0.52, h * 0.25, 0, 0, Math.PI * 2);
    ctx.fill();

    const woodGrad = ctx.createLinearGradient(x, y, x, y + h * 0.45);
    woodGrad.addColorStop(0, '#a26233');
    woodGrad.addColorStop(0.5, '#8c4e23');
    woodGrad.addColorStop(1, '#723a16');
    ctx.fillStyle = woodGrad;

    ctx.beginPath();
    ctx.roundRect(x, y, w, h * 0.42, 4 * scale);
    ctx.fill();

    ctx.fillStyle = '#b77443';
    ctx.fillRect(x, y, w, 2.5 * scale);

    ctx.fillStyle = '#211208';
    ctx.fillRect(x + 10 * scale, y + h * 0.42, 6 * scale, h * 0.58);
    ctx.fillRect(x + w - 16 * scale, y + h * 0.42, 6 * scale, h * 0.58);

    ctx.fillStyle = '#653514';
    ctx.fillRect(x + 12 * scale, y + h * 0.45, w - 24 * scale, h * 0.28);

    ctx.fillStyle = (x < this.width * 0.5) ? '#0d47a1' : '#c2185b';
    ctx.beginPath();
    ctx.roundRect(x - 8 * scale, y + 4 * scale, 10 * scale, 22 * scale, 3 * scale);
    ctx.fill();

    ctx.restore();
  }

  drawStudentFirstBoy(ctx, x, y, scale, t) {
    ctx.save();
    ctx.translate(x, y);
    ctx.scale(scale, scale);

    const breathe = Math.sin(t * 3.0) * 1.5;
    const writeStroke = Math.sin(t * 12.0) * 3;
    const headNod = Math.sin(t * 1.5) * 1.8;
    const isBlinking = Math.sin(t * 1.8) > 0.96;

    ctx.fillStyle = '#ffffff';
    ctx.shadowColor = 'rgba(0, 0, 0, 0.4)';
    ctx.shadowBlur = 6;
    ctx.beginPath();
    ctx.roundRect(-20, -10 + breathe, 40, 36, [10, 10, 4, 4]);
    ctx.fill();

    ctx.shadowColor = 'transparent';
    ctx.fillStyle = '#0d47a1';
    ctx.beginPath();
    ctx.moveTo(-10, -10 + breathe);
    ctx.lineTo(0, -2 + breathe);
    ctx.lineTo(10, -10 + breathe);
    ctx.fill();

    ctx.fillStyle = '#b71c1c';
    ctx.fillRect(-2.5, -2 + breathe, 5, 14);

    ctx.save();
    ctx.translate(0, -22 + headNod);

    ctx.fillStyle = '#1a1008';
    ctx.beginPath();
    ctx.arc(0, 0, 14, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#f5cba7';
    ctx.beginPath();
    ctx.arc(0, 3, 11, 0, Math.PI * 2);
    ctx.fill();

    ctx.strokeStyle = '#212121';
    ctx.lineWidth = 1.4;
    ctx.strokeRect(-9, 0, 7, 6);
    ctx.strokeRect(2, 0, 7, 6);
    ctx.beginPath();
    ctx.moveTo(-2, 3);
    ctx.lineTo(2, 3);
    ctx.stroke();

    if (!isBlinking) {
      ctx.fillStyle = '#1a0d00';
      ctx.beginPath();
      ctx.arc(-5.5, 3, 1.3, 0, Math.PI * 2);
      ctx.arc(5.5, 3, 1.3, 0, Math.PI * 2);
      ctx.fill();
    } else {
      ctx.strokeStyle = '#1a0d00';
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.moveTo(-7, 3); ctx.lineTo(-4, 3);
      ctx.moveTo(4, 3); ctx.lineTo(7, 3);
      ctx.stroke();
    }

    ctx.restore();

    ctx.fillStyle = '#f5cba7';
    ctx.beginPath();
    ctx.ellipse(14 + writeStroke * 0.3, 12, 5, 12, 0.4, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#0288d1';
    ctx.save();
    ctx.translate(16 + writeStroke * 0.4, 16);
    ctx.rotate(0.6);
    ctx.fillRect(-1.5, -10, 3, 16);
    ctx.restore();

    ctx.fillStyle = '#f8f9fa';
    ctx.strokeStyle = '#c62828';
    ctx.lineWidth = 1;
    ctx.fillRect(-8, 16, 26, 12);
    ctx.strokeRect(-8, 16, 26, 12);

    ctx.restore();
  }

  drawStudentTiffinMuncher(ctx, x, y, scale, t) {
    ctx.save();
    ctx.translate(x, y);
    ctx.scale(scale, scale);

    const breathe = Math.sin(t * 2.4) * 1.2;
    const headLook = Math.sin(t * 1.8) * 0.25;
    const munchAction = Math.abs(Math.sin(t * 7)) * 2;

    ctx.fillStyle = '#f5f5f5';
    ctx.beginPath();
    ctx.roundRect(-18, -8 + breathe, 36, 32, [8, 8, 4, 4]);
    ctx.fill();

    ctx.save();
    ctx.translate(0, -18);
    ctx.rotate(headLook);

    ctx.fillStyle = '#1c130d';
    ctx.beginPath();
    ctx.arc(0, 0, 12, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#e0ac69';
    ctx.beginPath();
    ctx.arc(0, 2, 9.5, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#8d4b20';
    ctx.beginPath();
    ctx.ellipse(0, 5 + munchAction * 0.3, 2.5, 1.5 + munchAction * 0.4, 0, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#111111';
    ctx.beginPath();
    ctx.arc(-4 + headLook * 6, 1, 1.2, 0, Math.PI * 2);
    ctx.arc(4 + headLook * 6, 1, 1.2, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();

    ctx.fillStyle = '#e0ac69';
    ctx.beginPath();
    ctx.ellipse(-8, 8 - munchAction * 0.5, 4, 8, -0.4, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#d97706';
    ctx.beginPath();
    ctx.moveTo(-12, 10);
    ctx.lineTo(-4, 10);
    ctx.lineTo(-8, 3);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = '#a67c52';
    ctx.fillRect(-14, 10, 12, 10);

    ctx.restore();
  }

  drawStudentChattyDuo(ctx, x1, x2, y, scale, t) {
    ctx.save();
    ctx.translate(x1, y);
    ctx.scale(scale, scale);

    const s3Breathe = Math.sin(t * 3.2) * 1.2;
    const s3Laugh = Math.abs(Math.sin(t * 4.5)) * 2.5;

    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.roundRect(-16, -8 + s3Breathe, 32, 30, [8, 8, 4, 4]);
    ctx.fill();

    ctx.save();
    ctx.translate(2, -18 - s3Laugh);
    ctx.fillStyle = '#22150c';
    ctx.beginPath();
    ctx.arc(0, 0, 11, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#e0ac69';
    ctx.beginPath();
    ctx.arc(2, 2, 9, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#1a0d00';
    ctx.fillRect(4, 1, 3, 1.5);
    ctx.restore();

    ctx.fillStyle = '#e0ac69';
    ctx.beginPath();
    ctx.ellipse(12, 6 + Math.sin(t * 6) * 3, 4, 10, 0.7, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();

    ctx.save();
    ctx.translate(x2, y);
    ctx.scale(scale, scale);

    const s4Breathe = Math.sin(t * 2.8 + 1) * 1.2;

    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.roundRect(-16, -8 + s4Breathe, 32, 30, [8, 8, 4, 4]);
    ctx.fill();

    ctx.save();
    ctx.translate(-2, -17);
    ctx.fillStyle = '#1a110a';
    ctx.beginPath();
    ctx.arc(0, 0, 11, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#f5cba7';
    ctx.beginPath();
    ctx.arc(0, 3, 9, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    const penShift = Math.sin(t * 2.5) * 8;
    ctx.fillStyle = '#e53935';
    ctx.fillRect(-22 + penShift, 14, 16, 2.5);
    ctx.fillStyle = '#1e88e5';
    ctx.fillRect(-10 - penShift * 0.7, 17, 16, 2.5);

    ctx.restore();
  }

  drawStudentSleeper(ctx, x, y, scale, t) {
    ctx.save();
    ctx.translate(x, y);
    ctx.scale(scale, scale);

    const breathe = Math.sin(t * 1.8) * 1.8;

    ctx.fillStyle = '#e8e8e8';
    ctx.beginPath();
    ctx.ellipse(0, 4 + breathe, 18, 12, 0, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#f5cba7';
    ctx.beginPath();
    ctx.roundRect(-16, 10, 32, 8, 4);
    ctx.fill();

    ctx.fillStyle = '#1c130d';
    ctx.beginPath();
    ctx.arc(0, 4 + breathe * 0.8, 10, 0, Math.PI * 2);
    ctx.fill();

    const zAlpha = (Math.sin(t * 2) + 1) * 0.45;
    ctx.fillStyle = `rgba(255, 255, 255, ${zAlpha})`;
    ctx.font = 'bold 9px sans-serif';
    ctx.fillText('Zzz', 10, -4 - ((t * 5) % 12));

    ctx.restore();
  }

  drawStudentAviator(ctx, x, y, scale, t) {
    ctx.save();
    ctx.translate(x, y);
    ctx.scale(scale, scale);

    const breathe = Math.sin(t * 2.6) * 1.2;
    const planeAngle = Math.sin(t * 2.5) * 0.25;

    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.roundRect(-15, -6 + breathe, 30, 28, [6, 6, 3, 3]);
    ctx.fill();

    ctx.fillStyle = '#211409';
    ctx.beginPath();
    ctx.arc(0, -16, 10, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#e0ac69';
    ctx.beginPath();
    ctx.arc(0, -14, 8, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#e0ac69';
    ctx.beginPath();
    ctx.ellipse(14, -8, 3.5, 9, 0.4, 0, Math.PI * 2);
    ctx.fill();

    ctx.save();
    ctx.translate(16, -16);
    ctx.rotate(-0.4 + planeAngle);
    ctx.fillStyle = '#ffffff';
    ctx.strokeStyle = '#90a4ae';
    ctx.lineWidth = 0.8;
    ctx.beginPath();
    ctx.moveTo(-6, 4);
    ctx.lineTo(10, 0);
    ctx.lineTo(-6, -4);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.restore();

    ctx.restore();
  }

  drawStudentPenSpinner(ctx, x, y, scale, t) {
    ctx.save();
    ctx.translate(x, y);
    ctx.scale(scale, scale);

    const bounce = Math.sin(t * 4.5) * 1.8;
    const spinAngle = t * 14;

    ctx.fillStyle = '#f8f9fa';
    ctx.beginPath();
    ctx.roundRect(-16, -10 + bounce * 0.5, 32, 32, [8, 8, 4, 4]);
    ctx.fill();

    ctx.fillStyle = '#1c130d';
    ctx.beginPath();
    ctx.arc(0, -20 + bounce * 0.8, 11, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#f5cba7';
    ctx.beginPath();
    ctx.arc(0, -17 + bounce * 0.8, 9, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#000000';
    ctx.beginPath();
    ctx.arc(-2, -15 + bounce * 0.8, 1.3, 0, Math.PI * 2);
    ctx.arc(4, -15 + bounce * 0.8, 1.3, 0, Math.PI * 2);
    ctx.fill();

    ctx.save();
    ctx.translate(14, 12);
    ctx.rotate(spinAngle);

    ctx.strokeStyle = 'rgba(0, 229, 255, 0.35)';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(0, 0, 16, 0, Math.PI);
    ctx.stroke();

    ctx.fillStyle = '#00e5ff';
    ctx.fillRect(-16, -2, 32, 4);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(8, -2, 8, 4);
    ctx.restore();

    ctx.restore();
  }

  drawActivePaperAirplanes(ctx) {
    for (const p of this.flyingPlanes) {
      ctx.save();

      ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
      ctx.lineWidth = 1.5;
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      if (p.trail.length > 0) {
        ctx.moveTo(p.trail[0].x, p.trail[0].y);
        for (let i = 1; i < p.trail.length; i++) {
          ctx.lineTo(p.trail[i].x, p.trail[i].y);
        }
        ctx.stroke();
      }
      ctx.setLineDash([]);

      ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
      ctx.beginPath();
      ctx.ellipse(p.x, p.y + 45, 12, 5, 0, 0, Math.PI * 2);
      ctx.fill();

      ctx.translate(p.x, p.y);
      ctx.rotate(p.rotZ);
      ctx.globalAlpha = Math.max(0, p.life);

      ctx.fillStyle = '#ffffff';
      ctx.strokeStyle = '#90a4ae';
      ctx.lineWidth = 1.2;
      ctx.shadowColor = 'rgba(0,0,0,0.3)';
      ctx.shadowBlur = 6;

      ctx.beginPath();
      ctx.moveTo(-14, 8);
      ctx.lineTo(18, 0);
      ctx.lineTo(-14, -8);
      ctx.lineTo(-6, 0);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      ctx.strokeStyle = '#b0bec5';
      ctx.beginPath();
      ctx.moveTo(-6, 0);
      ctx.lineTo(18, 0);
      ctx.stroke();

      ctx.restore();
    }
  }

  drawChalkboard(ctx, x, y, w, h) {
    ctx.save();
    ctx.fillStyle = '#542f13';
    ctx.shadowColor = 'rgba(0, 0, 0, 0.65)';
    ctx.shadowBlur = 16;
    ctx.shadowOffsetY = 8;
    ctx.fillRect(x - 8, y - 8, w + 16, h + 16);

    const boardGrad = ctx.createLinearGradient(x, y, x, y + h);
    boardGrad.addColorStop(0, '#173625');
    boardGrad.addColorStop(0.5, '#132f1f');
    boardGrad.addColorStop(1, '#0e2417');
    ctx.fillStyle = boardGrad;
    ctx.fillRect(x, y, w, h);

    ctx.shadowColor = 'transparent';
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(x + 22, y + h + 2, 14, 4);
    ctx.fillRect(x + 42, y + h + 2, 10, 4);
    ctx.fillStyle = '#ffee58';
    ctx.fillRect(x + 58, y + h + 2, 12, 4);
    ctx.fillStyle = '#f48fb1';
    ctx.fillRect(x + 75, y + h + 2, 11, 4);

    ctx.fillStyle = '#a66838';
    ctx.fillRect(x + 98, y + h - 2, 30, 9);
    ctx.fillStyle = '#3e2723';
    ctx.fillRect(x + 98, y + h + 6, 30, 3);

    if (this.dusterAnim.active) {
      const sweepX = x + w * this.dusterAnim.progress;
      ctx.fillStyle = '#a66838';
      ctx.shadowColor = 'rgba(0,0,0,0.5)';
      ctx.shadowBlur = 6;
      ctx.fillRect(sweepX - 20, y + h * 0.3, 35, 16);
      ctx.fillStyle = '#3e2723';
      ctx.fillRect(sweepX - 20, y + h * 0.3 + 12, 35, 4);
      ctx.shadowColor = 'transparent';
    }

    const quote = this.chalkQuotes[this.chalkQuoteIndex] || this.chalkQuotes[0];

    ctx.fillStyle = 'rgba(255, 255, 255, 0.95)';
    ctx.font = `bold ${Math.max(13, w * 0.040)}px "Noto Serif Bengali", "Lora", serif`;
    ctx.textAlign = 'center';
    ctx.fillText(quote.titleBN, x + w / 2, y + h * 0.20);

    ctx.fillStyle = 'rgba(184, 242, 210, 0.95)';
    ctx.font = `bold ${Math.max(11, w * 0.032)}px "Noto Serif Bengali", "Lora", serif`;
    ctx.fillText(quote.subBN, x + w / 2, y + h * 0.40);

    ctx.fillStyle = 'rgba(240, 235, 220, 0.75)';
    ctx.font = `${Math.max(10, w * 0.025)}px "Noto Serif Bengali", "Lora", serif`;
    ctx.fillText(quote.extraBN, x + w / 2, y + h * 0.58);

    ctx.fillStyle = 'rgba(255, 255, 255, 0.55)';
    ctx.font = `${Math.max(9, w * 0.022)}px monospace`;
    ctx.fillText('(a+b)² = a² + 2ab + b²', x + w * 0.26, y + h * 0.78);
    ctx.fillText('sin²θ + cos²θ = 1', x + w * 0.74, y + h * 0.78);

    ctx.fillStyle = 'rgba(133, 220, 176, 0.90)';
    ctx.font = `bold ${Math.max(8.5, w * 0.020)}px "Noto Serif Bengali", "Lora", serif`;
    ctx.fillText('(ক্লিক করে ডাস্টার দিয়ে বোর্ড মুছুন ও নতুন উক্তি আনুন)', x + w / 2, y + h * 0.92);

    ctx.restore();
  }

  drawBoardDust(ctx) {
    ctx.save();
    for (const p of this.boardDustParticles) {
      ctx.fillStyle = `rgba(255, 255, 255, ${p.alpha})`;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();
  }

  drawClassroomWindow(ctx, x, y, w, h) {
    ctx.save();

    if (this.weather === 'sunny') {
      const skyGrad = ctx.createLinearGradient(x, y, x, y + h);
      skyGrad.addColorStop(0, '#52b5db');
      skyGrad.addColorStop(0.55, '#a4dff0');
      skyGrad.addColorStop(1, '#2e7d32');
      ctx.fillStyle = skyGrad;
      ctx.fillRect(x, y, w, h);
    } else {
      const rainSkyGrad = ctx.createLinearGradient(x, y, x, y + h);
      rainSkyGrad.addColorStop(0, '#455a64');
      rainSkyGrad.addColorStop(0.6, '#78909c');
      rainSkyGrad.addColorStop(1, '#1b5e20');
      ctx.fillStyle = rainSkyGrad;
      ctx.fillRect(x, y, w, h);
    }

    ctx.fillStyle = this.weather === 'sunny' ? '#2e7d32' : '#1b5e20';
    ctx.beginPath();
    ctx.arc(x + w * 0.3, y + h * 0.78, w * 0.42, 0, Math.PI * 2);
    ctx.arc(x + w * 0.72, y + h * 0.72, w * 0.48, 0, Math.PI * 2);
    ctx.fill();

    if (this.weather === 'rainy') {
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.6)';
      ctx.lineWidth = 1.2;
      for (let i = 0; i < 8; i++) {
        const rx = x + (i * 19) % w;
        const ry = y + ((Date.now() / 4 + i * 25) % h);
        ctx.beginPath();
        ctx.moveTo(rx, ry);
        ctx.lineTo(rx - 4, ry + 12);
        ctx.stroke();
      }
    }

    ctx.strokeStyle = '#4a2c11';
    ctx.lineWidth = 6;
    ctx.strokeRect(x, y, w, h);

    ctx.strokeStyle = 'rgba(40, 30, 20, 0.85)';
    ctx.lineWidth = 2.5;
    const numBars = 4;
    for (let i = 1; i < numBars; i++) {
      ctx.beginPath();
      ctx.moveTo(x + (w / numBars) * i, y);
      ctx.lineTo(x + (w / numBars) * i, y + h);
      ctx.stroke();
    }

    ctx.fillStyle = '#6b401b';
    ctx.fillRect(x - 12, y - 4, 12, h + 8);
    ctx.fillRect(x + w, y - 4, 12, h + 8);

    ctx.restore();
  }

  drawSunbeams(ctx, x, y, reachW, reachH) {
    ctx.save();
    const beamGrad = ctx.createRadialGradient(x, y, 10, x + reachW * 0.5, y + reachH * 0.5, reachW);
    beamGrad.addColorStop(0, 'rgba(255, 245, 200, 0.18)');
    beamGrad.addColorStop(0.6, 'rgba(255, 240, 180, 0.08)');
    beamGrad.addColorStop(1, 'rgba(255, 240, 180, 0)');

    ctx.fillStyle = beamGrad;
    ctx.beginPath();
    ctx.moveTo(x - 30, y);
    ctx.lineTo(x + 30, y);
    ctx.lineTo(x + reachW, y + reachH);
    ctx.lineTo(x + reachW * 0.3, y + reachH);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }

  drawBangladeshMap(ctx, x, y, w, h) {
    ctx.save();
    ctx.fillStyle = '#ffffff';
    ctx.strokeStyle = '#795548';
    ctx.lineWidth = 3;
    ctx.shadowColor = 'rgba(0, 0, 0, 0.3)';
    ctx.shadowBlur = 6;
    ctx.fillRect(x, y, w, h);
    ctx.strokeRect(x, y, w, h);

    ctx.fillStyle = '#006a4e';
    ctx.beginPath();
    ctx.arc(x + w * 0.5, y + h * 0.48, w * 0.34, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#f42a41';
    ctx.beginPath();
    ctx.arc(x + w * 0.46, y + h * 0.48, w * 0.15, 0, Math.PI * 2);
    ctx.fill();

    ctx.shadowColor = 'transparent';
    ctx.fillStyle = '#1b5e20';
    ctx.font = 'bold 8px "Hind Siliguri", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('গণপ্রজাতন্ত্রী বাংলাদেশ', x + w / 2, y + h * 0.9);

    ctx.restore();
  }

  drawSchoolBell(ctx, x, y) {
    ctx.save();
    ctx.translate(x, y);

    ctx.fillStyle = '#212121';
    ctx.fillRect(-4, -18, 8, 18);

    ctx.fillStyle = '#f5b041';
    ctx.strokeStyle = '#b7791f';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.arc(0, 0, 16, Math.PI, Math.PI * 2);
    ctx.lineTo(16, 12);
    ctx.lineTo(-16, 12);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = '#78350f';
    ctx.fillRect(-2, 12, 4, 18);
    ctx.fillStyle = '#d97706';
    ctx.beginPath();
    ctx.arc(0, 30, 4, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
  }

  drawTeacherDesk(ctx, x, y, w, h) {
    ctx.save();
    ctx.fillStyle = '#4a250a';
    ctx.fillRect(x + w * 0.3, y - 22, w * 0.4, 22);

    ctx.fillStyle = '#6d3c16';
    ctx.fillRect(x, y, w, h * 0.6);
    ctx.fillStyle = '#542d0e';
    ctx.fillRect(x - 4, y, w + 8, 8);

    ctx.fillStyle = '#3a1a05';
    ctx.fillRect(x + 6, y + h * 0.6, 8, h * 0.4);
    ctx.fillRect(x + w - 14, y + h * 0.6, 8, h * 0.4);

    ctx.fillStyle = '#c62828';
    ctx.shadowColor = 'rgba(0,0,0,0.4)';
    ctx.shadowBlur = 4;
    ctx.fillRect(x + 14, y - 6, 32, 8);

    ctx.shadowColor = 'transparent';
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 5.5px sans-serif';
    ctx.fillText('হাজিরা খাতা', x + 16, y - 1);

    ctx.fillStyle = '#ef5350';
    ctx.fillRect(x + 36, y - 7, 10, 2);

    ctx.fillStyle = '#d7ccc8';
    ctx.strokeStyle = '#8d6e63';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(x + 8, y + 4);
    ctx.lineTo(x + w - 10, y + 2);
    ctx.stroke();

    ctx.restore();
  }

  drawFrontHeroBench(ctx, x, y, w, h) {
    ctx.save();
    ctx.fillStyle = '#9c6032';
    ctx.shadowColor = 'rgba(0, 0, 0, 0.75)';
    ctx.shadowBlur = 24;
    ctx.shadowOffsetY = 12;
    ctx.fillRect(x, y, w, h * 0.55);

    ctx.shadowColor = 'transparent';
    ctx.fillStyle = '#b37442';
    ctx.fillRect(x, y, w, 5);

    ctx.strokeStyle = '#4a250c';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(x, y + h * 0.28);
    ctx.lineTo(x + w, y + h * 0.28);
    ctx.stroke();

    ctx.fillStyle = '#422008';
    ctx.beginPath();
    ctx.roundRect(x + w * 0.25, y + 8, w * 0.5, 5, 2.5);
    ctx.fill();

    this.drawHeroBenchPen(ctx, x + w * 0.30, y + h * 0.22, '#e53935', 0.2);
    this.drawHeroBenchPen(ctx, x + w * 0.70, y + h * 0.20, '#1e88e5', -0.3);

    ctx.fillStyle = '#26170d';
    ctx.fillRect(x + 16, y + h * 0.55, 12, h * 0.45);
    ctx.fillRect(x + w - 28, y + h * 0.55, 12, h * 0.45);

    ctx.fillStyle = '#6e3c1a';
    ctx.fillRect(x + 25, y + h * 0.58, w - 50, h * 0.35);

    ctx.fillStyle = '#0288d1';
    ctx.beginPath();
    ctx.roundRect(x - 16, y + 8, 18, 38, 4);
    ctx.fill();

    ctx.fillStyle = '#d81b60';
    ctx.beginPath();
    ctx.roundRect(x + w - 2, y + 10, 18, 38, 4);
    ctx.fill();

    ctx.restore();
  }

  drawHeroBenchPen(ctx, x, y, bodyColor, angle) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(angle);

    ctx.fillStyle = bodyColor;
    ctx.beginPath();
    ctx.roundRect(-24, -3.5, 48, 7, 2);
    ctx.fill();

    ctx.fillStyle = '#ffffff';
    ctx.fillRect(10, -4, 15, 8);
    ctx.fillStyle = '#bdbdbd';
    ctx.fillRect(12, -6, 12, 2);

    ctx.restore();
  }

  drawCeilingFan(ctx, x, y) {
    ctx.save();

    // 1. Ceiling Canopy Mount (at top of ceiling y=0)
    ctx.fillStyle = '#212121';
    ctx.beginPath();
    ctx.moveTo(x - 14, 0);
    ctx.lineTo(x + 14, 0);
    ctx.lineTo(x + 8, 12);
    ctx.lineTo(x - 8, 12);
    ctx.closePath();
    ctx.fill();

    // 2. Vertical Metal Downrod Pipe (Hanging down from ceiling to motor)
    const rodGrad = ctx.createLinearGradient(x - 3, 0, x + 3, 0);
    rodGrad.addColorStop(0, '#263238');
    rodGrad.addColorStop(0.5, '#546e7a');
    rodGrad.addColorStop(1, '#263238');
    ctx.fillStyle = rodGrad;
    ctx.fillRect(x - 3, 10, 6, Math.max(0, y - 22));

    // 3. Lower Canopy Cup (above motor)
    ctx.fillStyle = '#263238';
    ctx.beginPath();
    ctx.moveTo(x - 9, y - 18);
    ctx.lineTo(x + 9, y - 18);
    ctx.lineTo(x + 13, y - 7);
    ctx.lineTo(x - 13, y - 7);
    ctx.closePath();
    ctx.fill();

    // 4. Subtle Drop Shadow on Wall from Blades
    ctx.save();
    ctx.translate(x + 6, y + 8);
    ctx.rotate(this.fanAngle);
    ctx.fillStyle = 'rgba(0, 0, 0, 0.12)';
    for (let i = 0; i < 3; i++) {
      ctx.rotate((Math.PI * 2) / 3);
      ctx.beginPath();
      ctx.roundRect(-7, 8, 14, 52, 5);
      ctx.fill();
    }
    ctx.restore();

    // 5. Rotating Blades & Motor
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(this.fanAngle);

    // Motion Blur Arcs when spinning
    if (this.fanSpeed > 1) {
      ctx.strokeStyle = 'rgba(55, 71, 79, 0.18)';
      ctx.lineWidth = 16;
      ctx.beginPath();
      ctx.arc(0, 0, 42, 0, Math.PI * 2);
      ctx.stroke();
    }

    // 3 Aerodynamic Vintage Blades
    for (let i = 0; i < 3; i++) {
      ctx.rotate((Math.PI * 2) / 3);

      // Metal Blade Shank / Bracket Mount
      ctx.fillStyle = '#d4af37'; // Brass accent bracket
      ctx.fillRect(-4.5, 4, 9, 10);

      // Rivet screws
      ctx.fillStyle = '#1a1a1a';
      ctx.fillRect(-2.5, 6, 2, 2);
      ctx.fillRect(0.5, 6, 2, 2);

      // Blade Body (Vintage dark emerald / charcoal with edge taper)
      const bladeGrad = ctx.createLinearGradient(-7, 10, 7, 10);
      bladeGrad.addColorStop(0, '#263238');
      bladeGrad.addColorStop(0.3, '#37474f');
      bladeGrad.addColorStop(0.7, '#455a64');
      bladeGrad.addColorStop(1, '#263238');

      ctx.fillStyle = bladeGrad;
      ctx.beginPath();
      ctx.moveTo(-6, 12);
      ctx.lineTo(-8, 54);
      ctx.quadraticCurveTo(-8, 62, 0, 64);
      ctx.quadraticCurveTo(8, 62, 8, 54);
      ctx.lineTo(6, 12);
      ctx.closePath();
      ctx.fill();

      // Blade Center Ridge Line
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, 14);
      ctx.lineTo(0, 56);
      ctx.stroke();
    }

    // Central Motor Housing (Classic double-deck motor with brass ring)
    ctx.restore(); // Undo blade rotation so motor casing stays static with 3D depth

    ctx.save();
    ctx.translate(x, y);

    // Outer Motor Ring
    ctx.fillStyle = '#1e282d';
    ctx.beginPath();
    ctx.arc(0, 0, 15, 0, Math.PI * 2);
    ctx.fill();

    // Brass Gold Trim Accent Ring
    ctx.strokeStyle = '#d4af37';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(0, 0, 12, 0, Math.PI * 2);
    ctx.stroke();

    // Center Dome
    const domeGrad = ctx.createRadialGradient(-3, -3, 2, 0, 0, 10);
    domeGrad.addColorStop(0, '#78909c');
    domeGrad.addColorStop(0.6, '#37474f');
    domeGrad.addColorStop(1, '#212121');
    ctx.fillStyle = domeGrad;
    ctx.beginPath();
    ctx.arc(0, 0, 10, 0, Math.PI * 2);
    ctx.fill();

    // Center Cap Screw
    ctx.fillStyle = '#d4af37';
    ctx.beginPath();
    ctx.arc(0, 0, 3, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
    ctx.restore();
  }

  drawDustMotes(ctx) {
    ctx.save();
    for (const d of this.dustParticles) {
      ctx.fillStyle = `rgba(255, 245, 220, ${d.alpha})`;
      ctx.beginPath();
      ctx.arc(d.x, d.y, d.size, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();
  }

  drawFloatingChatters(ctx) {
    if (this.zoomProgress > 0) return;
    ctx.save();
    for (const c of this.floatingChatters) {
      const alpha = Math.min(1, (c.life / c.maxLife) * 1.6);
      ctx.save();
      ctx.translate(c.x, c.y);
      ctx.globalAlpha = Math.max(0, alpha);

      ctx.font = 'bold 11px "Hind Siliguri", sans-serif';
      const textMetrics = ctx.measureText(c.text);
      const bubbleW = textMetrics.width + 18;
      const bubbleH = 22;

      ctx.fillStyle = 'rgba(255, 255, 255, 0.95)';
      ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
      ctx.shadowBlur = 6;
      ctx.beginPath();
      ctx.roundRect(-bubbleW / 2, -bubbleH, bubbleW, bubbleH, 6);
      ctx.fill();

      ctx.beginPath();
      ctx.moveTo(-4, 0);
      ctx.lineTo(4, 0);
      ctx.lineTo(0, 4);
      ctx.closePath();
      ctx.fill();

      ctx.shadowColor = 'transparent';
      ctx.fillStyle = '#1a1a1a';
      ctx.textAlign = 'center';
      ctx.fillText(c.text, 0, -6);

      ctx.restore();
    }
    ctx.restore();
  }

  drawActiveStudentDialogue(ctx) {
    if (!this.activeStudentDialogue || this.zoomProgress > 0) return;
    const d = this.activeStudentDialogue;
    ctx.save();
    ctx.translate(d.x, d.y - 25);

    ctx.font = 'bold 13px "Hind Siliguri", sans-serif';
    const textMetrics = ctx.measureText(d.text);
    const bubbleW = textMetrics.width + 26;
    const bubbleH = 30;

    // Crisp white speech card with red accent border
    ctx.fillStyle = '#ffffff';
    ctx.strokeStyle = '#c62828';
    ctx.lineWidth = 1.5;
    ctx.shadowColor = 'rgba(0, 0, 0, 0.65)';
    ctx.shadowBlur = 10;
    ctx.beginPath();
    ctx.roundRect(-bubbleW / 2, -bubbleH - 8, bubbleW, bubbleH, 8);
    ctx.fill();
    ctx.stroke();

    // Pointer tail
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.moveTo(-5, -8);
    ctx.lineTo(5, -8);
    ctx.lineTo(0, 0);
    ctx.closePath();
    ctx.fill();

    ctx.shadowColor = 'transparent';
    ctx.fillStyle = '#b71c1c';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(d.text, 0, -bubbleH / 2 - 8);

    ctx.restore();
  }

  renderHotspots(ctx) {
    const hotspots = this.getHotspots();
    const pulse = 1 + Math.sin(Date.now() / 250) * 0.18;

    for (const h of hotspots) {
      // If student is actively speaking, hide the pin to prevent any overlap
      if (this.activeStudentDialogue && Math.hypot(h.x - this.activeStudentDialogue.x, h.y - this.activeStudentDialogue.y) < 40) {
        continue;
      }

      const isHovered = this.hoveredHotspot === h.id;

      ctx.save();
      ctx.translate(h.x, h.y);

      // Subtle pulsating glow circle
      ctx.fillStyle = isHovered ? 'rgba(255, 215, 0, 0.4)' : 'rgba(0, 229, 255, 0.2)';
      ctx.beginPath();
      ctx.arc(0, 0, (h.radius * 0.35) * pulse, 0, Math.PI * 2);
      ctx.fill();

      // Pin badge button
      ctx.fillStyle = isHovered ? '#ffd700' : 'rgba(0, 229, 255, 0.9)';
      ctx.shadowColor = 'rgba(0, 0, 0, 0.8)';
      ctx.shadowBlur = 6;
      ctx.beginPath();
      ctx.arc(0, 0, isHovered ? 10 : 7.5, 0, Math.PI * 2);
      ctx.fill();

      // Center dot
      ctx.fillStyle = '#0a0a0a';
      ctx.beginPath();
      ctx.arc(0, 0, isHovered ? 3.5 : 2.5, 0, Math.PI * 2);
      ctx.fill();

      // ONLY render text badge tooltip when the hotspot is actively hovered!
      if (isHovered) {
        ctx.font = 'bold 12px "Hind Siliguri", sans-serif';
        const textMetrics = ctx.measureText(h.titleBN);
        const badgeW = textMetrics.width + 20;
        const badgeH = 26;
        const tooltipY = -24;

        ctx.fillStyle = 'rgba(15, 23, 42, 0.94)';
        ctx.strokeStyle = '#ffd700';
        ctx.lineWidth = 1.5;
        ctx.shadowColor = 'rgba(0, 0, 0, 0.75)';
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.roundRect(-badgeW / 2, tooltipY - badgeH / 2, badgeW, badgeH, 6);
        ctx.fill();
        ctx.stroke();

        ctx.shadowColor = 'transparent';
        ctx.fillStyle = '#ffd700';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(h.titleBN, 0, tooltipY);
      }

      ctx.restore();
    }
  }

  easeInOutCubic(t) {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  }
}
