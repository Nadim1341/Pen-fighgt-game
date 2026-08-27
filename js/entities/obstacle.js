import { Vector2D } from '../physics/vector.js';

/**
 * Bangladeshi Classroom Obstacles
 * - Nataraj / Camlin 15cm Ruler (স্কেল): Hard bank-shot wall
 * - Dux / Camel Geometry Box (জ্যামিতি বক্স): Heavy metal box
 * - Apsara / Koh-i-Noor Eraser (রাবার): Soft bounce obstacle
 * - Nataraj HB Pencil (পেন্সিল): Angled ramp / barrier
 */
export class Obstacle {
  constructor(type, x, y, width, height, angle = 0, isMovable = false) {
    this.type = type; // 'ruler', 'geometry_box', 'eraser', 'pencil', 'sharpener'
    this.pos = new Vector2D(x, y);
    this.width = width;
    this.height = height;
    this.angle = angle;
    this.isMovable = isMovable;
    this.vel = new Vector2D(0, 0);

    this.setupProperties();
    this.updateBounds();
  }

  setupProperties() {
    switch (this.type) {
      case 'ruler':
        this.restitution = 0.85; // High bounce for steel/plastic scale
        this.mass = 4.0;
        this.radius = 3;
        this.nameBN = 'নটরাজ ১৫ সেমি স্কেল';
        this.nameEN = '15cm Scale';
        break;
      case 'geometry_box':
        this.restitution = 0.5;
        this.mass = 8.0;
        this.radius = 4;
        this.nameBN = 'ক্যামেল জ্যামিতি বক্স';
        this.nameEN = 'Geometry Box';
        break;
      case 'eraser':
        this.restitution = 0.35; // Soft absorb
        this.mass = 0.8;
        this.radius = 3;
        this.nameBN = 'অপ্সরা রাবার / ইরেজার';
        this.nameEN = 'Eraser';
        break;
      case 'pencil':
        this.restitution = 0.7;
        this.mass = 0.9;
        this.radius = 4;
        this.nameBN = 'নটরাজ এইচবি পেন্সিল';
        this.nameEN = 'HB Pencil';
        break;
      default:
        this.restitution = 0.6;
        this.mass = 2.0;
        this.radius = 3;
    }
  }

  updateBounds() {
    const hw = this.width / 2;
    const hh = this.height / 2;
    const cos = Math.cos(this.angle);
    const sin = Math.sin(this.angle);

    // 4 Corner vertices of OBB
    const corners = [
      new Vector2D(this.pos.x + cos * -hw - sin * -hh, this.pos.y + sin * -hw + cos * -hh),
      new Vector2D(this.pos.x + cos * hw - sin * -hh,  this.pos.y + sin * hw + cos * -hh),
      new Vector2D(this.pos.x + cos * hw - sin * hh,   this.pos.y + sin * hw + cos * hh),
      new Vector2D(this.pos.x + cos * -hw - sin * hh,  this.pos.y + sin * -hw + cos * hh)
    ];

    // 4 Edges for continuous collision detection
    this.edges = [
      { a: corners[0], b: corners[1] },
      { a: corners[1], b: corners[2] },
      { a: corners[2], b: corners[3] },
      { a: corners[3], b: corners[0] }
    ];

    this.corners = corners;
  }

  getBounds() {
    return {
      corners: this.corners,
      edges: this.edges
    };
  }

  update(dt) {
    if (!this.isMovable) return;
    this.vel.mult(Math.pow(0.92, dt * 60));
    this.pos.add(Vector2D.mult(this.vel, dt));
    this.updateBounds();
  }

  render(ctx) {
    ctx.save();
    ctx.translate(this.pos.x, this.pos.y);
    ctx.rotate(this.angle);

    const hw = this.width / 2;
    const hh = this.height / 2;

    // Drop shadow
    ctx.shadowColor = 'rgba(0, 0, 0, 0.4)';
    ctx.shadowBlur = 8;
    ctx.shadowOffsetX = 3;
    ctx.shadowOffsetY = 4;

    if (this.type === 'ruler') {
      this.drawRuler(ctx, hw, hh);
    } else if (this.type === 'geometry_box') {
      this.drawGeometryBox(ctx, hw, hh);
    } else if (this.type === 'eraser') {
      this.drawEraser(ctx, hw, hh);
    } else if (this.type === 'pencil') {
      this.drawPencil(ctx, hw, hh);
    }

    if (this.isTarget) {
      ctx.shadowColor = 'transparent';
      const pulse = Math.sin(Date.now() * 0.007) * 3;
      ctx.strokeStyle = '#ff1744';
      ctx.lineWidth = 2.2;
      ctx.setLineDash([4, 4]);
      ctx.strokeRect(-hw - 5 - pulse, -hh - 5 - pulse, this.width + 10 + pulse * 2, this.height + 10 + pulse * 2);
      ctx.setLineDash([]);

      ctx.fillStyle = '#ff1744';
      ctx.font = 'bold 10px "Noto Serif Bengali", "Lora", serif';
      ctx.textAlign = 'center';
      ctx.fillText('TARGET', 0, -hh - 10 - pulse);
    }

    ctx.restore();
  }

  drawRuler(ctx, hw, hh) {
    // Clear transparent plastic ruler with centimeter markings
    const grad = ctx.createLinearGradient(-hw, -hh, -hw, hh);
    grad.addColorStop(0, 'rgba(230, 245, 255, 0.7)');
    grad.addColorStop(0.5, 'rgba(200, 230, 255, 0.5)');
    grad.addColorStop(1, 'rgba(170, 210, 240, 0.65)');

    ctx.fillStyle = grad;
    ctx.strokeStyle = 'rgba(100, 150, 200, 0.8)';
    ctx.lineWidth = 1.2;

    ctx.beginPath();
    ctx.roundRect(-hw, -hh, this.width, this.height, 3);
    ctx.fill();
    ctx.stroke();

    // Scale markings (mm and cm lines)
    ctx.fillStyle = '#0a2540';
    ctx.strokeStyle = '#0a2540';
    ctx.lineWidth = 0.8;
    const numMarks = 15;
    const step = (this.width - 16) / numMarks;

    for (let i = 0; i <= numMarks; i++) {
      const mx = -hw + 8 + i * step;
      // Long cm tick
      ctx.beginPath();
      ctx.moveTo(mx, -hh);
      ctx.lineTo(mx, -hh + 7);
      ctx.stroke();

      // Number
      if (i % 2 === 0 || i === numMarks) {
        ctx.font = 'bold 6.5px monospace';
        ctx.fillText(`${i}`, mx - 2, -hh + 14);
      }

      // Half cm tick
      if (i < numMarks) {
        ctx.beginPath();
        ctx.moveTo(mx + step / 2, -hh);
        ctx.lineTo(mx + step / 2, -hh + 4.5);
        ctx.stroke();
      }
    }

    // "NATARAJ 15CM SCALE" Text
    ctx.font = 'bold 8px sans-serif';
    ctx.fillStyle = 'rgba(10, 40, 80, 0.7)';
    ctx.textAlign = 'center';
    ctx.fillText('NATARAJ  15 cm', 0, hh - 4);
  }

  drawGeometryBox(ctx, hw, hh) {
    // Camel / Dux Geometry Metal Tin Box
    const grad = ctx.createLinearGradient(-hw, -hh, hw, hh);
    grad.addColorStop(0, '#e53935');
    grad.addColorStop(0.5, '#d32f2f');
    grad.addColorStop(1, '#b71c1c');

    ctx.fillStyle = grad;
    ctx.strokeStyle = '#ffebee';
    ctx.lineWidth = 1.5;

    ctx.beginPath();
    ctx.roundRect(-hw, -hh, this.width, this.height, 6);
    ctx.fill();
    ctx.stroke();

    // Metal tin border ridge
    ctx.strokeStyle = 'rgba(255, 215, 0, 0.6)';
    ctx.lineWidth = 1;
    ctx.strokeRect(-hw + 4, -hh + 4, this.width - 8, this.height - 8);

    // Geometry box art & compass logo
    ctx.fillStyle = '#ffd700';
    ctx.font = 'bold 10px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('CAMEL GEOMETRY', 0, -2);
    ctx.font = '7.5px sans-serif';
    ctx.fillStyle = '#ffffff';
    ctx.fillText('MATHEMATICAL INSTRUMENTS', 0, 9);
  }

  drawEraser(ctx, hw, hh) {
    // Classic Apsara / Koh-i-noor Dual Color or White Eraser
    const grad = ctx.createLinearGradient(-hw, 0, hw, 0);
    grad.addColorStop(0, '#ffffff');
    grad.addColorStop(0.7, '#f0f0f0');
    grad.addColorStop(1, '#00acc1'); // Dark cyan cover wrap

    ctx.fillStyle = grad;
    ctx.strokeStyle = '#888';
    ctx.lineWidth = 1;

    ctx.beginPath();
    ctx.roundRect(-hw, -hh, this.width, this.height, 4);
    ctx.fill();
    ctx.stroke();

    // Eraser sleeve wrapper
    ctx.fillStyle = '#00838f';
    ctx.fillRect(-hw + 8, -hh, this.width - 8, this.height);

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 7px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('APSARA', 4, 2);
  }

  drawPencil(ctx, hw, hh) {
    // Nataraj Red-and-Black Striped Hexagonal Pencil
    const stripeW = 6;
    ctx.beginPath();
    ctx.roundRect(-hw, -hh, this.width, this.height, 2);
    ctx.clip();

    for (let x = -hw; x < hw; x += stripeW * 2) {
      ctx.fillStyle = '#d32f2f'; // Nataraj Red
      ctx.fillRect(x, -hh, stripeW, this.height);
      ctx.fillStyle = '#111111'; // Nataraj Black
      ctx.fillRect(x + stripeW, -hh, stripeW, this.height);
    }

    // Sharpened wood cone tip at one end
    ctx.fillStyle = '#f5deb3';
    ctx.beginPath();
    ctx.moveTo(hw, -hh);
    ctx.lineTo(hw + 14, 0);
    ctx.lineTo(hw, hh);
    ctx.closePath();
    ctx.fill();

    // Graphite Lead Point
    ctx.fillStyle = '#222';
    ctx.beginPath();
    ctx.moveTo(hw + 9, -hh * 0.4);
    ctx.lineTo(hw + 14, 0);
    ctx.lineTo(hw + 9, hh * 0.4);
    ctx.closePath();
    ctx.fill();
  }
}
