import { Vector2D } from './vector.js';

/**
 * Continuous Rigid-Body Physics Engine for Pen Fight
 * Handles capsule-to-capsule, capsule-to-box collisions, impulse resolution,
 * rotational torque, surface friction on wooden high-bench, and table-edge drop-off.
 */
export class PhysicsEngine {
  constructor() {
    this.gravity = 0; // Top-down view, gravity acts downward on desk drop
    this.subSteps = 6; // High precision continuous collision detection
  }

  update(dt, pens, obstacles, desk, onEvent) {
    if (dt > 0.1) dt = 0.1; // Cap delta time to prevent physics explosions
    const subDt = dt / this.subSteps;

    for (let step = 0; step < this.subSteps; step++) {
      // 1. Update entities motion & apply friction
      for (const pen of pens) {
        if (pen.isFalling || pen.isOffDesk) {
          pen.updateFalling(subDt);
          continue;
        }

        // Apply linear friction on wooden bench
        const currentFriction = pen.currentSurfaceFriction || pen.friction || 0.985;
        const subFriction = Math.pow(currentFriction, subDt * 60);
        pen.vel.mult(subFriction);

        // Apply angular damping
        const subAngDamping = Math.pow(pen.angularDamping || 0.96, subDt * 60);
        pen.angVel *= subAngDamping;

        // Stop tiny residual motion
        if (pen.vel.magSq() < 0.05 && Math.abs(pen.angVel) < 0.01) {
          pen.vel.set(0, 0);
          pen.angVel = 0;
          pen.isMoving = false;
        } else {
          pen.isMoving = true;
        }

        // Integrate position & angle
        pen.pos.x += pen.vel.x * subDt;
        pen.pos.y += pen.vel.y * subDt;
        pen.angle += pen.angVel * subDt;

        // Normalize angle to [-PI, PI]
        while (pen.angle > Math.PI) pen.angle -= Math.PI * 2;
        while (pen.angle < -Math.PI) pen.angle += Math.PI * 2;

        pen.updateGeometry();
      }

      // Update moving obstacles (if any, like movable erasers)
      for (const obs of obstacles) {
        if (obs.isMovable) {
          obs.update(subDt);
        }
      }

      // 2. Resolve Pen-to-Pen Collisions
      for (let i = 0; i < pens.length; i++) {
        for (let j = i + 1; j < pens.length; j++) {
          const p1 = pens[i];
          const p2 = pens[j];
          if (p1.isFalling || p2.isFalling || p1.isOffDesk || p2.isOffDesk) continue;

          this.checkPenPenCollision(p1, p2, onEvent);
        }
      }

      // 3. Resolve Pen-to-Obstacle Collisions
      for (const pen of pens) {
        if (pen.isFalling || pen.isOffDesk) continue;

        for (const obs of obstacles) {
          this.checkPenObstacleCollision(pen, obs, onEvent);
        }
      }

      // 4. Check Table-Edge Drop Off (High-bench borders)
      for (const pen of pens) {
        if (!pen.isFalling && !pen.isOffDesk) {
          this.checkDeskEdgeFall(pen, desk, onEvent);
        }
      }
    }
  }

  /**
   * Accurate Capsule-to-Capsule Collision (Segment vs Segment distance)
   */
  checkPenPenCollision(p1, p2, onEvent) {
    const s1 = p1.getSegment();
    const s2 = p2.getSegment();

    const { pA, pB, distSq } = this.closestPointsOnSegments(s1.a, s1.b, s2.a, s2.b);
    const minDist = p1.radius + p2.radius;

    if (distSq < minDist * minDist) {
      const dist = Math.sqrt(distSq);
      let normal;

      if (dist < 0.0001) {
        // Overlapping identical segments fallback
        normal = new Vector2D(p1.pos.x - p2.pos.x, p1.pos.y - p2.pos.y).normalize();
        if (normal.magSq() < 0.0001) normal = new Vector2D(0, 1);
      } else {
        normal = new Vector2D((pA.x - pB.x) / dist, (pA.y - pB.y) / dist);
      }

      const penetration = minDist - dist;

      // Positional separation (prevent sinking)
      const totalMass = p1.mass + p2.mass;
      const move1 = (p2.mass / totalMass) * penetration;
      const move2 = (p1.mass / totalMass) * penetration;

      p1.pos.x += normal.x * move1;
      p1.pos.y += normal.y * move1;
      p2.pos.x -= normal.x * move2;
      p2.pos.y -= normal.y * move2;

      p1.updateGeometry();
      p2.updateGeometry();

      // Contact points relative to center of mass
      const r1 = Vector2D.sub(pA, p1.pos);
      const r2 = Vector2D.sub(pB, p2.pos);

      // Velocities at contact points (linear + angular cross r)
      const v1AtContact = new Vector2D(p1.vel.x - p1.angVel * r1.y, p1.vel.y + p1.angVel * r1.x);
      const v2AtContact = new Vector2D(p2.vel.x - p2.angVel * r2.y, p2.vel.y + p2.angVel * r2.x);

      const relVel = Vector2D.sub(v1AtContact, v2AtContact);
      const velAlongNormal = relVel.dot(normal);

      // Only resolve if moving towards each other
      if (velAlongNormal < 0) {
        const restitution = Math.min(p1.restitution, p2.restitution);

        // Effective mass along normal
        const r1CrossN = r1.cross(normal);
        const r2CrossN = r2.cross(normal);

        const invMassSum = (1 / p1.mass) + (1 / p2.mass) +
          (r1CrossN * r1CrossN) / p1.inertia +
          (r2CrossN * r2CrossN) / p2.inertia;

        const impulseMag = -(1 + restitution) * velAlongNormal / invMassSum;
        const impulse = Vector2D.mult(normal, impulseMag);

        // Apply normal impulse to p1
        p1.vel.x += impulse.x / p1.mass;
        p1.vel.y += impulse.y / p1.mass;
        p1.angVel += r1.cross(impulse) / p1.inertia;

        // Apply negative normal impulse to p2
        p2.vel.x -= impulse.x / p2.mass;
        p2.vel.y -= impulse.y / p2.mass;
        p2.angVel -= r2.cross(impulse) / p2.inertia;

        // Friction impulse (tangent)
        const tangent = new Vector2D(-normal.y, normal.x);
        const velAlongTangent = relVel.dot(tangent);
        const frictionCoeff = 0.35; // Pen-on-pen plastic friction
        const maxFrictionImpulse = impulseMag * frictionCoeff;
        let frictionImpulseMag = -velAlongTangent / invMassSum;
        frictionImpulseMag = Math.max(-maxFrictionImpulse, Math.min(maxFrictionImpulse, frictionImpulseMag));
        const frictionImpulse = Vector2D.mult(tangent, frictionImpulseMag);

        p1.vel.x += frictionImpulse.x / p1.mass;
        p1.vel.y += frictionImpulse.y / p1.mass;
        p1.angVel += r1.cross(frictionImpulse) / p1.inertia;

        p2.vel.x -= frictionImpulse.x / p2.mass;
        p2.vel.y -= frictionImpulse.y / p2.mass;
        p2.angVel -= r2.cross(frictionImpulse) / p2.inertia;

        if (onEvent) {
          const hitSpeed = Math.abs(velAlongNormal);
          onEvent('hit', {
            p1,
            p2,
            point: new Vector2D((pA.x + pB.x) / 2, (pA.y + pB.y) / 2),
            speed: hitSpeed,
            heavy: hitSpeed > 280
          });
        }
      }
    }
  }

  /**
   * Capsule vs Obstacle (OBB / Box / Scale / Eraser / Geometry Box)
   */
  checkPenObstacleCollision(pen, obs, onEvent) {
    // If obstacle is a box (scale, eraser, geometry box)
    const bounds = obs.getBounds();
    const seg = pen.getSegment();

    // Check collision against all 4 edges of the obstacle
    for (let i = 0; i < bounds.edges.length; i++) {
      const edge = bounds.edges[i];
      const { pA, pB, distSq } = this.closestPointsOnSegments(seg.a, seg.b, edge.a, edge.b);
      const minDist = pen.radius + (obs.radius || 2);

      if (distSq < minDist * minDist) {
        const dist = Math.max(0.001, Math.sqrt(distSq));
        const normal = new Vector2D((pA.x - pB.x) / dist, (pA.y - pB.y) / dist);
        const penetration = minDist - dist;

        // Push pen out
        pen.pos.x += normal.x * penetration;
        pen.pos.y += normal.y * penetration;
        pen.updateGeometry();

        const r = Vector2D.sub(pA, pen.pos);
        const vContact = new Vector2D(pen.vel.x - pen.angVel * r.y, pen.vel.y + pen.angVel * r.x);
        const velAlongNormal = vContact.dot(normal);

        if (velAlongNormal < 0) {
          const restitution = obs.restitution || 0.6;
          const rCrossN = r.cross(normal);
          const invMassSum = (1 / pen.mass) + (rCrossN * rCrossN) / pen.inertia;

          const impulseMag = -(1 + restitution) * velAlongNormal / invMassSum;
          const impulse = Vector2D.mult(normal, impulseMag);

          pen.vel.x += impulse.x / pen.mass;
          pen.vel.y += impulse.y / pen.mass;
          pen.angVel += r.cross(impulse) / pen.inertia;

          if (obs.isMovable) {
            obs.vel.x -= impulse.x / obs.mass;
            obs.vel.y -= impulse.y / obs.mass;
          }

          if (onEvent) {
            onEvent('obstacle_hit', {
              pen,
              obstacle: obs,
              speed: Math.abs(velAlongNormal)
            });
          }
        }
      }
    }
  }

  /**
   * High-Bench Edge Drop Detection
   * If pen center or majority of length is outside the desk rectangle, it falls off!
   */
  checkDeskEdgeFall(pen, desk, onEvent) {
    const { minX, maxX, minY, maxY } = desk.getPlayableBounds();
    const seg = pen.getSegment();

    // Check tip, cap, and center
    const tipOut = seg.a.x < minX || seg.a.x > maxX || seg.a.y < minY || seg.a.y > maxY;
    const capOut = seg.b.x < minX || seg.b.x > maxX || seg.b.y < minY || seg.b.y > maxY;
    const centerOut = pen.pos.x < minX || pen.pos.x > maxX || pen.pos.y < minY || pen.pos.y > maxY;

    // Trigger fall when center of gravity leaves desk OR both ends are off
    if (centerOut || (tipOut && capOut)) {
      pen.triggerFall();
      if (onEvent) {
        onEvent('fall', { pen });
      }
    }
  }

  /**
   * Helper: Closest points between two line segments (3D/2D analytical)
   */
  closestPointsOnSegments(p1, q1, p2, q2) {
    const d1 = Vector2D.sub(q1, p1); // Direction of segment S1
    const d2 = Vector2D.sub(q2, p2); // Direction of segment S2
    const r = Vector2D.sub(p1, p2);

    const a = d1.dot(d1); // Squared length of S1
    const e = d2.dot(d2); // Squared length of S2
    const f = d2.dot(r);

    let s = 0;
    let t = 0;

    // Check if either or both segments degenerate into points
    if (a <= 0.00001 && e <= 0.00001) {
      return { pA: p1.clone(), pB: p2.clone(), distSq: r.dot(r) };
    }

    if (a <= 0.00001) {
      s = 0;
      t = Math.max(0, Math.min(1, f / e));
    } else {
      const c = d1.dot(r);
      if (e <= 0.00001) {
        t = 0;
        s = Math.max(0, Math.min(1, -c / a));
      } else {
        const b = d1.dot(d2);
        const denom = a * e - b * b;

        if (denom !== 0) {
          s = Math.max(0, Math.min(1, (b * f - c * e) / denom));
        } else {
          s = 0;
        }

        t = (b * s + f) / e;

        if (t < 0) {
          t = 0;
          s = Math.max(0, Math.min(1, -c / a));
        } else if (t > 1) {
          t = 1;
          s = Math.max(0, Math.min(1, (b - c) / a));
        }
      }
    }

    const c1 = new Vector2D(p1.x + d1.x * s, p1.y + d1.y * s);
    const c2 = new Vector2D(p2.x + d2.x * t, p2.y + d2.y * t);
    const diff = Vector2D.sub(c1, c2);

    return { pA: c1, pB: c2, distSq: diff.dot(diff) };
  }
}
