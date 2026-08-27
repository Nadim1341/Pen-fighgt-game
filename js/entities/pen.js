import { Vector2D } from '../physics/vector.js';

export const PEN_PRESETS = {
  matador_alltime: {
    id: 'matador_alltime',
    nameBN: 'ম্যাটাডোর অল-টাইম (All-Time)',
    nameEN: 'Matador All-Time 0.5',
    brand: 'Matador',
    taglineBN: 'ক্রিস্টাল ক্লিয়ার বডি ও ম্যাজেন্টা ক্যাপের চিরচেনা ম্যাটাডোর',
    taglineEN: 'Crystal Clear Barrel & Magenta Loop Cap',
    price: '৳৫',
    color: '#e91e63',
    capColor: '#e91e63',
    clipColor: '#e91e63',
    barrelStyle: 'matador_alltime_clear',
    mass: 0.98,
    length: 152,
    radius: 5.3,
    friction: 0.985,
    angularDamping: 0.965,
    restitution: 0.67,
    maxPower: 600,
    spinFactor: 1.30,
    knockback: 1.05,
    unlocked: true,
    perkBN: 'মাখন গ্লাইড ও হাই স্পিড ট্রিকশট',
    perkEN: 'Smooth Glide & High Speed Trickshot'
  },
  matador_hischool: {
    id: 'matador_hischool',
    nameBN: 'ম্যাটাডোর হাই-স্কুল (Hi-School)',
    nameEN: 'Matador Hi-School 0.5',
    brand: 'Matador',
    taglineBN: 'ম্যাট ফিনিশ বডি, ফ্রস্টেড ক্যাপ ও নিডেল টিপ',
    taglineEN: 'Matte Solid Body, Frosted Cap & Needle Tip',
    price: '৳৫',
    color: '#e53935',
    capColor: 'rgba(240, 245, 255, 0.75)',
    clipColor: 'rgba(240, 245, 255, 0.9)',
    barrelStyle: 'matador_hischool_matte',
    mass: 1.08,
    length: 150,
    radius: 5.5,
    friction: 0.980,
    angularDamping: 0.955,
    restitution: 0.64,
    maxPower: 575,
    spinFactor: 1.15,
    knockback: 1.20,
    unlocked: true,
    perkBN: 'পারফেক্ট ব্যালেন্স ও স্থিতিশীল ধাক্কা',
    perkEN: 'Rock Solid Balance & Steady Push'
  },
  pilot_bp1_rt: {
    id: 'pilot_bp1_rt',
    nameBN: 'পাইলট বিপি-১ আরটি (Pilot BP-1 RT)',
    nameEN: 'Pilot BP-1 RT Retractable',
    brand: 'Pilot',
    taglineBN: 'রিট্রেক্টেবল পুশ-ক্লিকার ও রাবার গ্রিপের হেভিওয়েট',
    taglineEN: 'Retractable Clicker & Comfort Rubber Grip',
    price: '৳১৫',
    color: '#1565c0',
    capColor: '#1565c0',
    clipColor: '#ffffff',
    barrelStyle: 'pilot_bp1_retractable',
    mass: 1.25,
    length: 150,
    radius: 5.8,
    friction: 0.976,
    angularDamping: 0.95,
    restitution: 0.64,
    maxPower: 620,
    spinFactor: 1.15,
    knockback: 1.40,
    unlocked: true,
    perkBN: 'রাবার গ্রিপ পাঞ্চ (হাই ইমপ্যাক্ট নকব্যাক)',
    perkEN: 'Rubber Grip Impact (High Knockback)'
  },
  gq_genius: {
    id: 'gq_genius',
    nameBN: 'জি কিউ জিনিয়াস (GQ Genius)',
    nameEN: 'GQ Genius Ball Pen',
    brand: 'GQ',
    taglineBN: '৫+২ হোয়াইট রিং ও পারফেক্ট গ্রিপের ক্লাসরুম কিং',
    taglineEN: '5+2 White Grip Rings & Precision Needle Tip',
    price: '৳৬',
    color: '#1976d2',
    capColor: '#1976d2',
    clipColor: '#ffffff',
    barrelStyle: 'gq_genius_rings',
    mass: 1.02,
    length: 153,
    radius: 5.4,
    friction: 0.983,
    angularDamping: 0.96,
    restitution: 0.66,
    maxPower: 590,
    spinFactor: 1.40,
    knockback: 1.12,
    unlocked: true,
    perkBN: '৫-রিং গ্রিপ কার্ভ স্পিন ও কন্ট্রোল',
    perkEN: '5-Ring Grip Curve Spin & Control'
  },
  reynolds_045: {
    id: 'reynolds_045',
    nameBN: 'রেয়নল্ডস ০৪৫ (Reynolds)',
    nameEN: 'Reynolds 045 Classic',
    brand: 'Reynolds',
    taglineBN: 'লেজেন্ডারি সাদা বডি, পিতলের নিব ও নীল ক্যাপ',
    taglineEN: 'Legendary White Body, Brass Tip & Blue Cap',
    price: '৳১০',
    color: '#ffffff',
    capColor: '#1565c0',
    clipColor: '#1565c0',
    barrelStyle: 'reynolds_white_blue',
    mass: 1.05,
    length: 154,
    radius: 5.4,
    friction: 0.984,
    angularDamping: 0.96,
    restitution: 0.68,
    maxPower: 590,
    spinFactor: 1.25,
    knockback: 1.10,
    unlocked: true,
    perkBN: 'লেজেন্ডারি অ্যারোডাইনামিকস ও প্রিসিশন',
    perkEN: 'Legendary Aerodynamics & Precision'
  },
  matador_allrounder: {
    id: 'matador_allrounder',
    nameBN: 'ম্যাটাডোর অল-রাউন্ডার (All-Rounder)',
    nameEN: 'Matador All-Rounder 0.5',
    brand: 'Matador',
    taglineBN: 'নীল হেক্সাগোনাল বডি ও গোল্ডেন স্ট্যাম্প',
    taglineEN: 'Blue Hexagonal Body & Golden Stamp',
    price: '৳৬',
    color: '#0055d4',
    capColor: '#0047b3',
    clipColor: '#ffffff',
    barrelStyle: 'hex_translucent',
    mass: 1.0,
    length: 152,
    radius: 5.5,
    friction: 0.982,
    angularDamping: 0.96,
    restitution: 0.65,
    maxPower: 580,
    spinFactor: 1.20,
    knockback: 1.05,
    unlocked: true,
    perkBN: 'মাখন গ্লাইড (স্মুথ স্পিড)',
    perkEN: 'Smooth Glide (High Speed)'
  },
  econo_dx: {
    id: 'econo_dx',
    nameBN: 'ইকোনো ডিএক্স (Econo DX)',
    nameEN: 'Econo DX Vintage 90s',
    brand: 'Econo',
    taglineBN: 'নব্বই দশকের ভিন্টেজ ট্যাংক - ভারী ধাক্কা',
    taglineEN: '90s Vintage School Tank - Heavy Push',
    price: '৳৪',
    color: '#d9822b',
    capColor: '#351c08',
    clipColor: '#d9822b',
    barrelStyle: 'amber_translucent',
    mass: 1.38,
    length: 146,
    radius: 5.8,
    friction: 0.971,
    angularDamping: 0.94,
    restitution: 0.58,
    maxPower: 520,
    spinFactor: 0.85,
    knockback: 1.45,
    unlocked: false,
    unlockCondition: 'score_500',
    perkBN: 'ভারী ধাক্কা (হাই নকব্যাক)',
    perkEN: 'Heavy Impact Push'
  },
  olympic_gel: {
    id: 'olympic_gel',
    nameBN: 'অলিম্পিক ফাইন জেল (Olympic Gel)',
    nameEN: 'Olympic Fine Gel',
    brand: 'Olympic',
    taglineBN: 'সুপার ফাস্ট ট্রিক শটার ও নরম রিবড গ্রিপ',
    taglineEN: 'Super Fast Trickshot Striker & Ribbed Grip',
    price: '৳১০',
    color: '#9c27b0',
    capColor: '#7b1fa2',
    clipColor: '#e1bee7',
    barrelStyle: 'clear_gel_grip',
    mass: 1.08,
    length: 154,
    radius: 5.4,
    friction: 0.988,
    angularDamping: 0.965,
    restitution: 0.72,
    maxPower: 600,
    spinFactor: 1.35,
    knockback: 1.15,
    unlocked: false,
    unlockCondition: 'beat_captain',
    perkBN: 'জেল ড্রিফট (রিবাউন্ড বাউন্স)',
    perkEN: 'Gel Drift (High Rebound)'
  },
  hero_329_fountain: {
    id: 'hero_329_fountain',
    nameBN: 'হিরো ৩২৯ ফাউন্টেন পেন (Hero 329)',
    nameEN: 'Hero 329 Vintage Fountain',
    brand: 'Hero / Wing Sung',
    taglineBN: 'ফার্স্ট বেঞ্চারের মেটালিক দুর্গ - লোহার বডি ও গোল্ডেন হুডেড নিব',
    taglineEN: "First Bencher's Metallic Fortress - Heavy Iron Body",
    price: '৳৭০',
    color: '#133e31',
    capColor: '#d4af37',
    clipColor: '#d4af37',
    barrelStyle: 'lacquered_gold_metal_cap',
    mass: 1.85,
    length: 158,
    radius: 6.2,
    friction: 0.964,
    angularDamping: 0.93,
    restitution: 0.55,
    maxPower: 490,
    spinFactor: 0.70,
    knockback: 1.80,
    unlocked: false,
    unlockCondition: 'win_campaign',
    perkBN: 'অপরাজেয় ওজন (নকডাউন ইমিউন)',
    perkEN: 'Iron Weight (Knockdown Immunity)'
  },
  backbencher_monster: {
    id: 'backbencher_monster',
    nameBN: 'লাস্ট বেঞ্চের মডিফাইড দানব',
    nameEN: 'Backbencher Modded Beast',
    brand: 'Custom School Mod',
    taglineBN: 'দুই মাথায় ক্যাপ ও ৩টা রাবার ব্যান্ড জড়ানো অস্ত্র',
    taglineEN: 'Dual-Capped Rubber-Banded Weapon',
    price: '৳০ (হাতে বানানো)',
    color: '#ff5722',
    capColor: '#00bcd4',
    clipColor: '#ffeb3b',
    barrelStyle: 'dual_cap_monster',
    mass: 1.60,
    length: 160,
    radius: 6.5,
    friction: 0.975,
    angularDamping: 0.94,
    restitution: 0.65,
    maxPower: 570,
    spinFactor: 1.50,
    knockback: 1.60,
    unlocked: false,
    unlockCondition: 'complete_all_trickshots',
    perkBN: 'ডাবল ক্যাপ স্ট্রাইক (স্পিন অ্যান্ড পাঞ্চ)',
    perkEN: 'Dual-Cap Strike (High Impact Spin)'
  }
};

export class Pen {
  constructor(arg1 = 'matador_alltime', arg2 = 0, arg3 = 0, arg4 = 0, arg5 = 'player1') {
    let presetKey, x, y, angle, owner;
    if (typeof arg1 === 'string') {
      presetKey = arg1;
      x = typeof arg2 === 'number' ? arg2 : 0;
      y = typeof arg3 === 'number' ? arg3 : 0;
      angle = typeof arg4 === 'number' ? arg4 : 0;
      owner = typeof arg5 === 'string' ? arg5 : 'player1';
    } else {
      x = arg1;
      y = arg2;
      angle = arg3;
      presetKey = typeof arg4 === 'string' ? arg4 : 'matador_alltime';
      owner = typeof arg5 === 'string' ? arg5 : 'player1';
    }

    this.presetKey = presetKey;
    this.preset = PEN_PRESETS[presetKey] || PEN_PRESETS.matador_alltime;
    this.owner = owner;

    this.pos = new Vector2D(x, y);
    this.vel = new Vector2D(0, 0);
    this.angle = angle;
    this.angVel = 0;

    const screenScale = typeof window !== 'undefined' ? Math.min(1.0, Math.max(0.68, window.innerWidth / 700)) : 1.0;
    this.scale = screenScale;

    this.length = this.preset.length * this.scale;
    this.radius = this.preset.radius * this.scale;
    this.mass = this.preset.mass;
    this.inertia = (this.mass * (this.length * this.length + 4 * this.radius * this.radius)) / 12;

    this.friction = this.preset.friction;
    this.angularDamping = this.preset.angularDamping;
    this.restitution = this.preset.restitution;
    this.maxPower = this.preset.maxPower * (this.scale < 1 ? (0.75 + 0.25 * this.scale) : 1.0);
    this.spinFactor = this.preset.spinFactor;
    this.knockback = this.preset.knockback;

    this.isFalling = false;
    this.isOffDesk = false;
    this.fallProgress = 0;
    this.fallRotation = 0;
    this.fallScale = 1.0;
    this.fallAlpha = 1.0;

    this.isMoving = false;
    this.trail = [];
    this.tipPos = new Vector2D(0, 0);
    this.capPos = new Vector2D(0, 0);

    this.updateEndpoints();
  }

  update(dt) {
    if (this.isFalling) {
      this.updateFalling(dt);
      return;
    }

    if (this.isOffDesk) return;

    const speed = this.vel.mag();
    const rotSpeed = Math.abs(this.angVel);

    if (speed > 0.05 || rotSpeed > 0.01) {
      this.isMoving = true;
      this.pos.add(Vector2D.mult(this.vel, dt));
      this.angle += this.angVel * dt;

      const frictionFactor = Math.pow(this.friction, dt * 60);
      const angDampingFactor = Math.pow(this.angularDamping, dt * 60);

      this.vel.mult(frictionFactor);
      this.angVel *= angDampingFactor;

      if (speed > 120) {
        this.trail.unshift({
          x: this.pos.x,
          y: this.pos.y,
          angle: this.angle,
          time: Date.now()
        });
        if (this.trail.length > 5) this.trail.pop();
      }
    } else {
      this.vel.set(0, 0);
      this.angVel = 0;
      this.isMoving = false;
      this.trail = [];
    }

    this.updateEndpoints();
  }

  updateEndpoints() {
    const halfLen = this.length / 2;
    const cos = Math.cos(this.angle);
    const sin = Math.sin(this.angle);

    this.tipPos.set(this.pos.x + cos * halfLen, this.pos.y + sin * halfLen);
    this.capPos.set(this.pos.x - cos * halfLen, this.pos.y - sin * halfLen);
  }

  updateGeometry() {
    this.updateEndpoints();
  }

  getVertices() {
    const halfLen = this.length / 2;
    const r = this.radius;
    const cos = Math.cos(this.angle);
    const sin = Math.sin(this.angle);
    const px = this.pos.x;
    const py = this.pos.y;

    const dirX = cos * halfLen;
    const dirY = sin * halfLen;
    const normX = -sin * r;
    const normY = cos * r;

    return [
      new Vector2D(px + dirX + normX, py + dirY + normY),
      new Vector2D(px + dirX - normX, py + dirY - normY),
      new Vector2D(px - dirX - normX, py - dirY - normY),
      new Vector2D(px - dirX + normX, py - dirY + normY)
    ];
  }

  getSegment() {
    return { a: this.tipPos, b: this.capPos };
  }

  applyFlick(forceVector, touchPoint = null) {
    if (this.isFalling || this.isOffDesk) return;

    const powerMultiplier = this.owner === 'player1' ? 1.15 : 1.0;
    const limitedForce = forceVector.clone().mult(powerMultiplier).limit(this.maxPower * powerMultiplier);
    const contact = touchPoint || this.capPos.clone();
    const r = Vector2D.sub(contact, this.pos);

    this.vel.x += limitedForce.x / this.mass;
    this.vel.y += limitedForce.y / this.mass;

    const torque = r.cross(limitedForce) * this.spinFactor;
    this.angVel += torque / this.inertia;

    this.isMoving = true;
  }

  triggerFall() {
    if (this.isFalling || this.isOffDesk) return;
    this.isFalling = true;
    this.isMoving = false;
    this.fallProgress = 0;
    this.fallScale = 1.0;
    this.fallAlpha = 1.0;
  }

  updateFalling(dt) {
    this.fallProgress += dt * 2.2;
    this.fallRotation += this.angVel * dt * 1.5;
    this.angle += this.angVel * dt * 0.5;

    this.pos.x += this.vel.x * dt * 0.8;
    this.pos.y += this.vel.y * dt * 0.8 + 400 * dt * this.fallProgress;

    this.fallScale = Math.max(0.2, 1.0 - this.fallProgress * 0.7);
    this.fallAlpha = Math.max(0, 1.0 - this.fallProgress * 1.1);

    if (this.fallProgress >= 1.0) {
      this.isFalling = false;
      this.isOffDesk = true;
      this.isMoving = false;
      this.vel.set(0, 0);
      this.angVel = 0;
    }
  }

  render(ctx, isSelected = false) {
    if (this.isOffDesk) return;

    ctx.save();

    // 1. Motion Trail
    if (this.trail.length > 1 && !this.isFalling) {
      for (let i = 0; i < this.trail.length; i++) {
        const t = this.trail[i];
        ctx.save();
        ctx.translate(t.x, t.y);
        ctx.rotate(t.angle);
        ctx.globalAlpha = (1 - i / this.trail.length) * 0.16;
        ctx.fillStyle = this.preset.color;
        ctx.fillRect(-this.length / 2, -this.radius * 0.7, this.length, this.radius * 1.4);
        ctx.restore();
      }
    }

    ctx.translate(this.pos.x, this.pos.y);
    ctx.rotate(this.angle);

    if (this.isFalling) {
      ctx.scale(this.fallScale, this.fallScale);
      ctx.globalAlpha = this.fallAlpha;
      ctx.rotate(this.fallRotation);
    }

    const halfLen = this.length / 2;
    const r = this.radius;

    // 2. Realistic Directional Cast Shadow on Wood
    if (!this.isFalling) {
      ctx.save();
      ctx.shadowColor = 'rgba(20, 10, 4, 0.45)';
      ctx.shadowBlur = 8;
      ctx.shadowOffsetX = 5;
      ctx.shadowOffsetY = 6;
      ctx.fillStyle = 'rgba(0, 0, 0, 0.22)';
      this.drawPenOutline(ctx, halfLen, r);
      ctx.fill();
      ctx.restore();
    }

    // 3. Subtle Luminous Selection Underglow
    if (isSelected && !this.isFalling) {
      ctx.save();
      const auraPulse = (Math.sin(Date.now() / 180) + 1) * 0.5;
      ctx.shadowColor = 'rgba(255, 215, 0, 0.75)';
      ctx.shadowBlur = 10 + auraPulse * 6;
      ctx.fillStyle = `rgba(255, 235, 120, ${0.14 + auraPulse * 0.14})`;
      this.drawPenOutline(ctx, halfLen + 2, r + 2);
      ctx.fill();
      ctx.restore();
    }

    // 3.5 Target Indicator for Trickshot Targets
    if (this.owner === 'target' && !this.isFalling) {
      ctx.save();
      const pulse = Math.sin(Date.now() * 0.007) * 3;
      ctx.strokeStyle = '#ff1744';
      ctx.lineWidth = 1.8;
      ctx.setLineDash([4, 4]);
      this.drawPenOutline(ctx, halfLen + 5 + pulse, r + 4 + pulse);
      ctx.stroke();

      ctx.fillStyle = '#ff1744';
      ctx.font = 'bold 9.5px "Noto Serif Bengali", "Lora", serif';
      ctx.textAlign = 'center';
      ctx.fillText('TARGET', 0, -r - 10 - pulse);
      ctx.restore();
    }

    // 4. Render Hyper-Realistic Pen Models
    this.drawAccuratePenModel(ctx, halfLen, r);

    ctx.restore();
  }

  drawPenOutline(ctx, halfLen, r) {
    ctx.beginPath();
    ctx.moveTo(halfLen, 0);
    ctx.lineTo(halfLen - 10, r * 0.55);
    ctx.lineTo(-halfLen + 4, r);
    ctx.arc(-halfLen + 4, 0, r, Math.PI / 2, -Math.PI / 2);
    ctx.lineTo(halfLen - 10, -r * 0.55);
    ctx.closePath();
  }

  drawAccuratePenModel(ctx, halfLen, r) {
    const style = this.preset.barrelStyle;

    if (style === 'matador_alltime_clear') {
      // ============================================================
      // 1. MATADOR ALL-TIME 0.5 (CRYSTAL CLEAR + MAGENTA LOOP CAP)
      // ============================================================
      // A. Internal Thin Black/Blue Ink Refill Tube
      ctx.fillStyle = 'rgba(220, 220, 220, 0.8)';
      ctx.fillRect(-halfLen + 10, -r * 0.30, this.length - 24, r * 0.60);
      ctx.fillStyle = '#111111'; // Black/Blue ink core
      ctx.fillRect(-halfLen + 14, -r * 0.20, this.length - 34, r * 0.40);

      // B. Crystal Clear Transparent Polycarbonate Barrel
      const clearGrad = ctx.createLinearGradient(0, -r, 0, r);
      clearGrad.addColorStop(0, 'rgba(255, 255, 255, 0.95)');
      clearGrad.addColorStop(0.25, 'rgba(240, 245, 255, 0.35)');
      clearGrad.addColorStop(0.5, 'rgba(220, 235, 255, 0.15)');
      clearGrad.addColorStop(0.75, 'rgba(200, 220, 245, 0.35)');
      clearGrad.addColorStop(1, 'rgba(160, 180, 210, 0.65)');

      ctx.fillStyle = clearGrad;
      ctx.strokeStyle = 'rgba(140, 160, 190, 0.6)';
      ctx.lineWidth = 0.7;
      this.drawPenOutline(ctx, halfLen, r);
      ctx.fill();
      ctx.stroke();

      // Top Glass Specular Highlight Streak
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.95)';
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.moveTo(-halfLen + 20, -r * 0.45);
      ctx.lineTo(halfLen - 14, -r * 0.35);
      ctx.stroke();

      // Cross-hatched textured grip ring near top
      ctx.strokeStyle = 'rgba(180, 200, 225, 0.7)';
      ctx.lineWidth = 0.6;
      for (let i = 0; i < 6; i++) {
        const gx = halfLen - 24 + i * 2.2;
        ctx.beginPath();
        ctx.moveTo(gx, -r * 0.85);
        ctx.lineTo(gx, r * 0.85);
        ctx.stroke();
      }

      // Vertical "Matador ALL-TIME 0.5" Branding Stamp
      ctx.save();
      ctx.fillStyle = '#111111';
      ctx.font = 'bold 6.2px "Outfit", sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('Matador ALL-TIME 0.5', 0, 0);
      ctx.restore();

      // Stainless Steel Needle Tip & Brass Collar
      ctx.fillStyle = '#b0bec5';
      ctx.beginPath();
      ctx.moveTo(halfLen, 0);
      ctx.lineTo(halfLen - 8, r * 0.45);
      ctx.lineTo(halfLen - 8, -r * 0.45);
      ctx.closePath();
      ctx.fill();

      ctx.fillStyle = '#111111';
      ctx.fillRect(halfLen - 0.8, -0.7, 1.4, 1.4);

      // Magenta Arched Loop Cap
      this.drawMatadorAllTimeCap(ctx, -halfLen, r, this.preset.capColor);

      // Magenta Rear Plug
      ctx.fillStyle = this.preset.capColor;
      ctx.beginPath();
      ctx.roundRect(-halfLen - 2, -r * 0.85, 4, r * 1.7, 1.5);
      ctx.fill();

    } else if (style === 'matador_hischool_matte') {
      // ============================================================
      // 2. MATADOR HI-SCHOOL 0.5 (SOLID MATTE + FROSTED ARCHED CAP)
      // ============================================================
      // Solid Vibrant Matte Colored Barrel
      const matteGrad = ctx.createLinearGradient(0, -r, 0, r);
      matteGrad.addColorStop(0, '#ffffff');
      matteGrad.addColorStop(0.15, this.preset.color);
      matteGrad.addColorStop(0.65, this.preset.color);
      matteGrad.addColorStop(1, '#000000');

      ctx.fillStyle = matteGrad;
      ctx.strokeStyle = 'rgba(0, 0, 0, 0.25)';
      ctx.lineWidth = 0.7;
      this.drawPenOutline(ctx, halfLen, r);
      ctx.fill();
      ctx.stroke();

      // Matte Cylindrical Highlight Line
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.45)';
      ctx.lineWidth = 1.0;
      ctx.beginPath();
      ctx.moveTo(-halfLen + 20, -r * 0.4);
      ctx.lineTo(halfLen - 16, -r * 0.35);
      ctx.stroke();

      // Iconic "MATADOR Hi-SCHOOL" Black Stamp
      ctx.save();
      ctx.fillStyle = '#111111';
      ctx.font = 'bold 6.8px "Outfit", sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('MATADOR Hi-SCHOOL', 4, 0);
      ctx.restore();

      // Semi-transparent colored collar + White Tip Cone
      ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
      ctx.beginPath();
      ctx.moveTo(halfLen, 0);
      ctx.lineTo(halfLen - 10, r * 0.5);
      ctx.lineTo(halfLen - 10, -r * 0.5);
      ctx.closePath();
      ctx.fill();

      // Black Needle Nib
      ctx.fillStyle = '#111111';
      ctx.fillRect(halfLen - 4, -0.7, 4, 1.4);

      // Frosted Arched Cap
      this.drawMatadorHiSchoolFrostedCap(ctx, -halfLen, r, this.preset.color);

      // Bottom Plug Ring
      ctx.fillStyle = '#cccccc';
      ctx.fillRect(-halfLen - 1.5, -r * 0.8, 2.5, r * 1.6);

    } else if (style === 'pilot_bp1_retractable') {
      // ============================================================
      // 3. PILOT BP-1 RT (RETRACTABLE CLICKER + COMFORT RUBBER GRIP)
      // ============================================================
      // A. Upper Glossy Barrel
      const pilotGrad = ctx.createLinearGradient(0, -r, 0, r);
      pilotGrad.addColorStop(0, '#ffffff');
      pilotGrad.addColorStop(0.18, this.preset.color);
      pilotGrad.addColorStop(0.7, this.preset.color);
      pilotGrad.addColorStop(1, '#0a192f');

      ctx.fillStyle = pilotGrad;
      ctx.strokeStyle = 'rgba(0, 0, 0, 0.3)';
      ctx.lineWidth = 0.8;
      this.drawPenOutline(ctx, halfLen, r);
      ctx.fill();
      ctx.stroke();

      // Glossy Reflection Highlight
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.85)';
      ctx.lineWidth = 1.3;
      ctx.beginPath();
      ctx.moveTo(-halfLen + 26, -r * 0.45);
      ctx.lineTo(-halfLen + 75, -r * 0.45);
      ctx.stroke();

      // B. Matte Rubber Comfort Grip Section (Lower 35%)
      const gripStartX = halfLen - 52;
      const gripW = 42;
      const gripGrad = ctx.createLinearGradient(0, -r * 1.05, 0, r * 1.05);
      gripGrad.addColorStop(0, this.preset.color);
      gripGrad.addColorStop(0.6, '#0f172a');
      gripGrad.addColorStop(1, '#020617');

      ctx.fillStyle = gripGrad;
      ctx.beginPath();
      ctx.roundRect(gripStartX, -r * 1.05, gripW, r * 2.1, 2);
      ctx.fill();

      // Subtle Rubber Grip Textures
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
      ctx.lineWidth = 0.7;
      for (let i = 0; i < 7; i++) {
        const rx = gripStartX + 4 + i * 5;
        ctx.beginPath();
        ctx.moveTo(rx, -r * 0.95);
        ctx.lineTo(rx, r * 0.95);
        ctx.stroke();
      }

      // C. Translucent Faceted Nose Cone
      ctx.fillStyle = this.preset.color;
      ctx.beginPath();
      ctx.moveTo(halfLen, 0);
      ctx.lineTo(halfLen - 10, r * 0.65);
      ctx.lineTo(halfLen - 10, -r * 0.65);
      ctx.closePath();
      ctx.fill();

      // Stainless Ballpoint
      ctx.fillStyle = '#e2e8f0';
      ctx.fillRect(halfLen - 2, -0.8, 3, 1.6);

      // D. Integrated Pocket Clip with "PILOT BP-1 RT" & "(F)" Stamp
      this.drawPilotClip(ctx, -halfLen, r, this.preset.color);

      // E. Translucent Top Clicker Button
      ctx.fillStyle = this.preset.color;
      ctx.beginPath();
      ctx.roundRect(-halfLen - 6, -r * 0.65, 6, r * 1.3, [3, 1, 1, 3]);
      ctx.fill();

    } else if (style === 'gq_genius_rings') {
      // ============================================================
      // 4. GQ GENIUS (5 FRONT + 2 REAR WHITE RINGS)
      // ============================================================
      const gqGrad = ctx.createLinearGradient(0, -r, 0, r);
      gqGrad.addColorStop(0, '#ffffff');
      gqGrad.addColorStop(0.18, this.preset.color);
      gqGrad.addColorStop(0.7, this.preset.color);
      gqGrad.addColorStop(1, '#0f172a');

      ctx.fillStyle = gqGrad;
      ctx.strokeStyle = 'rgba(0, 0, 0, 0.3)';
      ctx.lineWidth = 0.8;
      this.drawPenOutline(ctx, halfLen, r);
      ctx.fill();
      ctx.stroke();

      // 5 White Grip Rings (Front)
      ctx.fillStyle = '#ffffff';
      for (let i = 0; i < 5; i++) {
        const ringX = halfLen - 44 + i * 5.5;
        ctx.fillRect(ringX, -r * 0.95, 1.8, r * 1.9);
      }

      // 2 White Accent Rings (Rear)
      ctx.fillRect(-halfLen + 22, -r * 0.95, 1.8, r * 1.9);
      ctx.fillRect(-halfLen + 28, -r * 0.95, 1.8, r * 1.9);

      // Centered "GQ Genius" Branding
      ctx.save();
      ctx.fillStyle = (this.preset.color === '#ffffff' || this.preset.color === '#9e9e9e' || this.preset.color === '#fbc02d') ? '#111111' : '#ffffff';
      ctx.font = 'bold 7px "Outfit", sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('GQ Genius', 4, 0);
      ctx.restore();

      // White Stepped Conical Collar & Black Nose Piece
      ctx.fillStyle = '#f8fafc';
      ctx.beginPath();
      ctx.moveTo(halfLen, 0);
      ctx.lineTo(halfLen - 10, r * 0.6);
      ctx.lineTo(halfLen - 10, -r * 0.6);
      ctx.closePath();
      ctx.fill();

      ctx.fillStyle = '#111111';
      ctx.fillRect(halfLen - 5, -0.9, 4, 1.8);

      // Frosted Cap with colored sleeve
      this.drawGQGeniusCap(ctx, -halfLen, r, this.preset.color);

    } else if (style === 'reynolds_white_blue') {
      // ============================================================
      // 5. REYNOLDS 045 CLASSIC
      // ============================================================
      const whiteCylinder = ctx.createLinearGradient(0, -r, 0, r);
      whiteCylinder.addColorStop(0, '#ffffff');
      whiteCylinder.addColorStop(0.2, '#fbfbfd');
      whiteCylinder.addColorStop(0.55, '#efeff4');
      whiteCylinder.addColorStop(0.85, '#dcdce2');
      whiteCylinder.addColorStop(1, '#b8b8c2');

      ctx.fillStyle = whiteCylinder;
      ctx.strokeStyle = '#85858d';
      ctx.lineWidth = 0.7;
      this.drawPenOutline(ctx, halfLen, r);
      ctx.fill();
      ctx.stroke();

      // Specular highlight
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.95)';
      ctx.lineWidth = 1.3;
      ctx.beginPath();
      ctx.moveTo(-halfLen + 24, -r * 0.45);
      ctx.lineTo(halfLen - 14, -r * 0.35);
      ctx.stroke();

      // Logo
      ctx.save();
      ctx.fillStyle = '#1565c0';
      ctx.font = 'bold 6.5px "Outfit", sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('Reynolds 045', 2, 0);
      ctx.restore();

      // Translucent Blue Neck & Brass Tip
      ctx.fillStyle = '#1565c0';
      ctx.fillRect(halfLen - 16, -r * 0.65, 7, r * 1.3);

      const brassTip = ctx.createLinearGradient(halfLen - 9, 0, halfLen, 0);
      brassTip.addColorStop(0, '#cca01d');
      brassTip.addColorStop(0.4, '#fff176');
      brassTip.addColorStop(1, '#8c6b00');
      ctx.fillStyle = brassTip;
      ctx.beginPath();
      ctx.moveTo(halfLen, 0);
      ctx.lineTo(halfLen - 9, r * 0.52);
      ctx.lineTo(halfLen - 9, -r * 0.52);
      ctx.closePath();
      ctx.fill();

      ctx.fillStyle = '#111111';
      ctx.fillRect(halfLen - 0.8, -0.8, 1.6, 1.6);

      this.drawReynoldsCap(ctx, -halfLen, r, this.preset.capColor);

    } else if (style === 'hex_translucent') {
      // ============================================================
      // 6. MATADOR ALL-ROUNDER (BLUE HEX GEL)
      // ============================================================
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(-halfLen + 10, -r * 0.35, this.length - 26, r * 0.7);
      ctx.fillStyle = this.preset.color;
      ctx.fillRect(-halfLen + 14, -r * 0.25, this.length - 36, r * 0.5);

      const hexGrad = ctx.createLinearGradient(0, -r, 0, r);
      hexGrad.addColorStop(0, 'rgba(255,255,255,0.92)');
      hexGrad.addColorStop(0.25, 'rgba(200, 230, 255, 0.55)');
      hexGrad.addColorStop(0.5, 'rgba(120, 185, 255, 0.35)');
      hexGrad.addColorStop(0.75, 'rgba(60, 140, 240, 0.55)');
      hexGrad.addColorStop(1, 'rgba(20, 80, 200, 0.75)');

      ctx.fillStyle = hexGrad;
      ctx.strokeStyle = 'rgba(0, 60, 180, 0.55)';
      ctx.lineWidth = 0.8;
      this.drawPenOutline(ctx, halfLen, r);
      ctx.fill();
      ctx.stroke();

      ctx.strokeStyle = 'rgba(255, 255, 255, 0.75)';
      ctx.lineWidth = 0.7;
      ctx.beginPath();
      ctx.moveTo(-halfLen + 12, -r * 0.45);
      ctx.lineTo(halfLen - 12, -r * 0.3);
      ctx.moveTo(-halfLen + 12, r * 0.45);
      ctx.lineTo(halfLen - 12, r * 0.3);
      ctx.stroke();

      ctx.save();
      ctx.fillStyle = '#cca01d';
      ctx.font = 'bold 6px "Outfit", sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('Matador ALL-ROUNDER 0.5', 2, 0);
      ctx.restore();

      const tipGrad = ctx.createLinearGradient(halfLen - 12, 0, halfLen, 0);
      tipGrad.addColorStop(0, '#cca01d');
      tipGrad.addColorStop(0.4, '#ffe082');
      tipGrad.addColorStop(1, '#8c6b00');
      ctx.fillStyle = tipGrad;
      ctx.beginPath();
      ctx.moveTo(halfLen, 0);
      ctx.lineTo(halfLen - 11, r * 0.55);
      ctx.lineTo(halfLen - 11, -r * 0.55);
      ctx.closePath();
      ctx.fill();

      this.drawMatadorCap(ctx, -halfLen, r, this.preset.capColor);

    } else if (style === 'amber_translucent') {
      // ============================================================
      // 7. ECONO DX (90S VINTAGE)
      // ============================================================
      const amberGrad = ctx.createLinearGradient(0, -r, 0, r);
      amberGrad.addColorStop(0, '#f9c669');
      amberGrad.addColorStop(0.3, '#f59e0b');
      amberGrad.addColorStop(0.7, '#d97706');
      amberGrad.addColorStop(1, '#92400e');

      ctx.fillStyle = amberGrad;
      ctx.strokeStyle = '#78350f';
      ctx.lineWidth = 0.8;
      this.drawPenOutline(ctx, halfLen, r);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = '#1c1917';
      ctx.fillRect(-halfLen + 14, -r * 0.3, this.length - 28, r * 0.6);

      ctx.save();
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 7px "Outfit", sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('ECONO  DX', 2, 0);
      ctx.restore();

      ctx.fillStyle = '#b45309';
      ctx.beginPath();
      ctx.moveTo(halfLen, 0);
      ctx.lineTo(halfLen - 10, r * 0.58);
      ctx.lineTo(halfLen - 10, -r * 0.58);
      ctx.closePath();
      ctx.fill();

      this.drawRetroEconoCap(ctx, -halfLen, r + 0.4, this.preset.capColor);

    } else if (style === 'clear_gel_grip') {
      // ============================================================
      // 8. OLYMPIC FINE GEL
      // ============================================================
      ctx.fillStyle = this.preset.color;
      ctx.fillRect(-halfLen + 12, -r * 0.3, this.length - 26, r * 0.6);

      ctx.fillStyle = 'rgba(240, 245, 255, 0.45)';
      ctx.strokeStyle = 'rgba(123, 31, 162, 0.5)';
      ctx.lineWidth = 0.8;
      this.drawPenOutline(ctx, halfLen, r);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = 'rgba(123, 31, 162, 0.85)';
      for (let i = 0; i < 4; i++) {
        ctx.fillRect(halfLen - 24 + i * 4.5, -r * 0.95, 3, r * 1.9);
      }

      ctx.fillStyle = '#d0d0d0';
      ctx.beginPath();
      ctx.moveTo(halfLen, 0);
      ctx.lineTo(halfLen - 9, r * 0.45);
      ctx.lineTo(halfLen - 9, -r * 0.45);
      ctx.closePath();
      ctx.fill();

      this.drawMatadorCap(ctx, -halfLen, r, this.preset.capColor);

    } else if (style === 'lacquered_gold_metal_cap') {
      // ============================================================
      // 9. HERO 329 FOUNTAIN PEN
      // ============================================================
      const bodyGrad = ctx.createLinearGradient(0, -r, 0, r);
      bodyGrad.addColorStop(0, '#1e5a47');
      bodyGrad.addColorStop(0.5, '#133e31');
      bodyGrad.addColorStop(1, '#0b241c');

      ctx.fillStyle = bodyGrad;
      ctx.strokeStyle = '#05140e';
      ctx.lineWidth = 0.8;
      this.drawPenOutline(ctx, halfLen, r);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = '#d4af37';
      ctx.beginPath();
      ctx.moveTo(halfLen, 0);
      ctx.lineTo(halfLen - 12, r * 0.42);
      ctx.lineTo(halfLen - 12, -r * 0.42);
      ctx.closePath();
      ctx.fill();

      ctx.fillStyle = '#ffd700';
      ctx.fillRect(halfLen - 14, -r * 0.75, 2, r * 1.5);

      ctx.save();
      ctx.fillStyle = '#ffd700';
      ctx.font = 'bold 6.5px serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('HERO 329 英雄', -5, 0);
      ctx.restore();

      this.drawHeroMetallicCap(ctx, -halfLen, r + 0.8);

    } else if (style === 'dual_cap_monster') {
      // ============================================================
      // 10. BACKBENCHER MODDED MONSTER
      // ============================================================
      const modGrad = ctx.createLinearGradient(0, -r, 0, r);
      modGrad.addColorStop(0, '#ff7043');
      modGrad.addColorStop(0.5, '#d84315');
      modGrad.addColorStop(1, '#bf360c');

      ctx.fillStyle = modGrad;
      ctx.lineWidth = 0.8;
      this.drawPenOutline(ctx, halfLen, r);
      ctx.fill();

      ctx.fillStyle = '#ffd600';
      ctx.fillRect(-12, -r * 1.1, 5, r * 2.2);
      ctx.fillRect(-4, -r * 1.1, 5, r * 2.2);
      ctx.fillRect(4, -r * 1.1, 5, r * 2.2);

      ctx.save();
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 6.5px "Lora", serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('DON MOD', 0, 0);
      ctx.restore();

      this.drawMatadorCap(ctx, -halfLen, r + 0.6, '#00bcd4');
      this.drawMatadorCap(ctx, halfLen - 10, r + 0.6, '#e91e63', false);
    }
  }

  drawMatadorAllTimeCap(ctx, x, r, color) {
    ctx.save();
    // Magenta translucent cap body
    const capGrad = ctx.createLinearGradient(0, -r * 1.15, 0, r * 1.15);
    capGrad.addColorStop(0, '#f06292');
    capGrad.addColorStop(0.3, color);
    capGrad.addColorStop(0.8, '#ad1457');
    capGrad.addColorStop(1, '#880e4f');

    ctx.fillStyle = capGrad;
    ctx.beginPath();
    ctx.roundRect(x - 2, -r * 1.1, 30, r * 2.2, [2, 6, 6, 2]);
    ctx.fill();

    // Distinct arched loop clip
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(x + 2, -r * 1.1);
    ctx.quadraticCurveTo(x + 14, -r * 2.4, x + 28, -r * 1.3);
    ctx.lineTo(x + 26, -r * 1.0);
    ctx.quadraticCurveTo(x + 14, -r * 1.8, x + 4, -r * 1.0);
    ctx.closePath();
    ctx.fill();

    // Side micro-ridges on cap
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
    ctx.lineWidth = 0.6;
    for (let i = 0; i < 5; i++) {
      const rx = x + 8 + i * 3;
      ctx.beginPath();
      ctx.moveTo(rx, -r * 0.7);
      ctx.lineTo(rx, r * 0.7);
      ctx.stroke();
    }

    ctx.restore();
  }

  drawMatadorHiSchoolFrostedCap(ctx, x, r, bodyColor) {
    ctx.save();
    // Frosted clear cap with subtle inner tint
    ctx.fillStyle = 'rgba(245, 248, 255, 0.78)';
    ctx.strokeStyle = 'rgba(200, 210, 225, 0.7)';
    ctx.lineWidth = 0.8;

    ctx.beginPath();
    ctx.roundRect(x - 2, -r * 1.12, 32, r * 2.24, [3, 7, 7, 3]);
    ctx.fill();
    ctx.stroke();

    // Matching inner colored sleeve visible inside frosted cap
    ctx.fillStyle = bodyColor;
    ctx.fillRect(x + 3, -r * 0.7, 12, r * 1.4);

    // Arched sweeping clip
    ctx.fillStyle = 'rgba(235, 240, 250, 0.9)';
    ctx.beginPath();
    ctx.moveTo(x + 2, -r * 1.15);
    ctx.quadraticCurveTo(x + 16, -r * 2.5, x + 30, -r * 1.35);
    ctx.lineTo(x + 28, -r * 1.05);
    ctx.quadraticCurveTo(x + 16, -r * 1.9, x + 5, -r * 1.05);
    ctx.closePath();
    ctx.fill();

    ctx.restore();
  }

  drawPilotClip(ctx, x, r, color) {
    ctx.save();
    // Sleek white straight pocket clip
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.roundRect(x + 6, -r * 1.45, 34, 3, 1.5);
    ctx.fill();

    // White circle with "(F)" mark
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(x + 38, -r * 1.45 + 1.5, 2.6, 0, Math.PI * 2);
    ctx.fill();

    // Tiny "(F)" text
    ctx.fillStyle = color;
    ctx.font = 'bold 3.5px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('F', x + 38, -r * 1.45 + 1.5);

    // "PILOT BP-1 RT" on clip
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 4.5px "Outfit", sans-serif';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'middle';
    ctx.fillText('PILOT BP-1 RT', x + 8, -r * 1.45 + 1.5);

    ctx.restore();
  }

  drawGQGeniusCap(ctx, x, r, bodyColor) {
    ctx.save();
    // Frosted cap
    ctx.fillStyle = 'rgba(240, 245, 255, 0.75)';
    ctx.strokeStyle = 'rgba(180, 195, 215, 0.6)';
    ctx.lineWidth = 0.8;

    ctx.beginPath();
    ctx.roundRect(x - 2, -r * 1.12, 32, r * 2.24, [2, 6, 6, 2]);
    ctx.fill();
    ctx.stroke();

    // Colored inner plug
    ctx.fillStyle = bodyColor;
    ctx.fillRect(x + 4, -r * 0.75, 14, r * 1.5);

    // Frosted Clip
    ctx.fillStyle = 'rgba(235, 242, 255, 0.88)';
    ctx.beginPath();
    ctx.roundRect(x + 2, -r * 1.4, 28, 2.5, 1.2);
    ctx.fill();

    ctx.restore();
  }

  drawReynoldsCap(ctx, x, r, color) {
    ctx.save();
    const capGrad = ctx.createLinearGradient(0, -r * 1.05, 0, r * 1.05);
    capGrad.addColorStop(0, '#42a5f5');
    capGrad.addColorStop(0.3, color);
    capGrad.addColorStop(0.8, '#0d47a1');
    capGrad.addColorStop(1, '#082a63');

    ctx.fillStyle = capGrad;
    ctx.beginPath();
    ctx.roundRect(x - 1, -r * 1.05, 28, r * 2.1, [2, 5, 5, 2]);
    ctx.fill();

    ctx.fillStyle = color;
    ctx.fillRect(x + 2, -r * 1.25, 20, 2);

    ctx.fillStyle = '#0d47a1';
    ctx.beginPath();
    ctx.roundRect(x + 2, -r * 1.35, 28, 2.4, 1.2);
    ctx.fill();

    ctx.fillStyle = '#0a1d37';
    ctx.fillRect(x - 2.5, -r * 0.35, 2.5, r * 0.7);

    ctx.restore();
  }

  drawMatadorCap(ctx, xPos, r, capColor, pointingLeft = true) {
    ctx.save();
    ctx.fillStyle = capColor;
    ctx.strokeStyle = 'rgba(0,0,0,0.35)';
    ctx.lineWidth = 0.8;

    const capLen = 30;
    const width = pointingLeft ? capLen : -capLen;

    ctx.beginPath();
    ctx.roundRect(xPos, -r * 1.1, width, r * 2.2, 3);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = this.preset.clipColor || '#ffffff';
    const clipX = pointingLeft ? xPos + 3 : xPos - 3;
    const clipW = pointingLeft ? capLen - 5 : -(capLen - 5);
    ctx.fillRect(clipX, -r * 1.35, clipW, 2);

    ctx.beginPath();
    ctx.arc(clipX + clipW, -r * 1.35 + 1, 2, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
  }

  drawRetroEconoCap(ctx, xPos, r, capColor) {
    ctx.save();
    ctx.fillStyle = capColor;
    ctx.strokeStyle = '#1e0e04';
    ctx.lineWidth = 0.9;

    const capLen = 28;
    ctx.beginPath();
    ctx.roundRect(xPos, -r * 1.12, capLen, r * 2.24, 2.5);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = '#d97706';
    ctx.fillRect(xPos + 4, -r * 1.35, capLen - 8, 2.2);
    ctx.restore();
  }

  drawHeroMetallicCap(ctx, xPos, r) {
    ctx.save();
    const capLen = 34;
    const capGrad = ctx.createLinearGradient(0, -r * 1.2, 0, r * 1.2);
    capGrad.addColorStop(0, '#fff4a3');
    capGrad.addColorStop(0.4, '#d4af37');
    capGrad.addColorStop(0.8, '#997a15');
    capGrad.addColorStop(1, '#fff4a3');

    ctx.fillStyle = capGrad;
    ctx.strokeStyle = '#5a4505';
    ctx.lineWidth = 0.8;

    ctx.beginPath();
    ctx.roundRect(xPos, -r * 1.2, capLen, r * 2.4, 3);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = '#b71c1c';
    ctx.beginPath();
    ctx.arc(xPos + 2.5, 0, 2, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#ffe57f';
    ctx.fillRect(xPos + 6, -r * 1.4, capLen - 12, 2.4);
    ctx.beginPath();
    ctx.moveTo(xPos + capLen - 6, -r * 1.4 + 1.2);
    ctx.lineTo(xPos + capLen - 9, -r * 1.4 - 1.5);
    ctx.lineTo(xPos + capLen - 9, -r * 1.4 + 4);
    ctx.closePath();
    ctx.fill();

    ctx.restore();
  }
}
