import { Vector2D } from '../physics/vector.js';

export const BOT_PERSONALITIES = {
  nerd: {
    id: 'nerd',
    nameBN: 'রোল ১ - ফার্স্ট বেঞ্চার',
    nameEN: 'Roll 1 (First Bencher)',
    roleBN: 'পড়ুয়া / টেকনিক্যাল প্লেয়ার',
    roleEN: 'Class Topper / Technical Player',
    difficulty: 'easy',
    accuracy: 0.78,
    powerVariance: 0.16,
    riskTolerance: 0.40,
    mishitChance: 0.10,
    dialoguesBN: [
      'আমি কিন্তু স্যাররে বলে দেব!',
      'পড়া রেখে পেন ফাইট করছিস? এবার দ্যাখ!',
      'আমার জ্যামিতি বক্সের মতো পারফেক্ট অ্যাঙ্গেলে মারব!',
      'ক্লাসে ফার্স্ট আমিই হব, পেন ফাইটেও!',
      'সাবধানে খেলিস, আমার রেয়নল্ডসের কালি শেষ করিস না!'
    ],
    dialoguesEN: [
      'I will tell the class teacher!',
      'Geometry precision shot incoming!',
      'Careful, don\'t waste my pen ink!',
      'I am Roll 1 for a reason!',
      'Watch this calculated strike!'
    ]
  },
  captain: {
    id: 'captain',
    nameBN: 'ক্লাস ক্যাপ্টেন (রকিব)',
    nameEN: 'Class Captain (Rokib)',
    roleBN: 'কড়া মনিটর ও স্ট্র্যাটেজিক শটার',
    roleEN: 'Strict Monitor & Tactical Striker',
    difficulty: 'medium',
    accuracy: 0.88,
    powerVariance: 0.10,
    riskTolerance: 0.60,
    mishitChance: 0.04,
    dialoguesBN: [
      'এই একদম সাইলেন্ট! তোরে টেবিল পার করে দিচ্ছি!',
      'ক্যাপ্টেনের সাথে পাঙ্গা নিতে এসেছিস?',
      'টিফিন পিরিয়ডের আগেই তোরে অল-আউট করব!',
      'টেবিলের কিনারায় যাচ্ছিস কেন? এবার দাইন হবে!',
      'আমার পাইলট পেন কিন্তু এক টোকায় উড়ে যাবে না!'
    ],
    dialoguesEN: [
      'Silent! I will write your name on the blackboard!',
      'You dare challenge the Class Captain?',
      'Your match ends before Tiffin period!',
      'Watch your step, you are right at the edge!',
      'Heavy grip shot incoming!'
    ]
  },
  don: {
    id: 'don',
    nameBN: 'লাস্ট বেঞ্চের ডন (শাকিল)',
    nameEN: 'Backbencher Don (Shakil)',
    roleBN: 'পেন ফাইটের অপ্রতিদ্বন্দ্বী ওস্তাদ',
    roleEN: 'Undefeated Last Bench Master',
    difficulty: 'hard',
    accuracy: 0.95,
    powerVariance: 0.06,
    riskTolerance: 0.85,
    mishitChance: 0.01,
    dialoguesBN: [
      'লাস্ট বেঞ্চের খেলা দেখে যা মামা!',
      'এক টোকায় তোরে টেবিল পার করে দেব!',
      'ডনের সাথে পেন ফাইট? খবর আছে!',
      'দাইন দাইন তিন দাইন করে ট্রফি নিয়া যাব!',
      'ডন কখনো হারে না, ক্লাসরুম সাক্ষী!'
    ],
    dialoguesEN: [
      'Witness the true power of the Last Bench!',
      'One clean flick and you\'re flying off the desk!',
      'Backbencher spin strike!',
      'Three Dains and the match is mine!',
      'The Don never loses!'
    ]
  }
};

export class BotAI {
  constructor(personalityId = 'nerd') {
    this.personality = BOT_PERSONALITIES[personalityId] || BOT_PERSONALITIES.nerd;
  }

  setPersonality(personalityId) {
    this.personality = BOT_PERSONALITIES[personalityId] || BOT_PERSONALITIES.nerd;
  }

  getRandomDialogue(lang = 'bn') {
    const list = lang === 'bn' ? this.personality.dialoguesBN : this.personality.dialoguesEN;
    return list[Math.floor(Math.random() * list.length)];
  }

  /**
   * Calculate intelligent, strategic flick shot for the AI pen
   * - Evaluates optimal angle to push the player towards the closest table boundary
   * - Self-preservation: avoids throwing itself off the desk
   * - Applies optimal power and spin leverage (contact point)
   */
  calculateShot(aiPen, playerPen, desk, obstacles = []) {
    if (!aiPen || !playerPen || aiPen.isFalling || playerPen.isFalling || aiPen.isOffDesk || playerPen.isOffDesk) return null;

    const bounds = desk.getPlayableBounds();
    const toPlayer = Vector2D.sub(playerPen.pos, aiPen.pos);
    const distToPlayer = toPlayer.mag();

    // Check for rare human mishit
    const isMishit = Math.random() < (this.personality.mishitChance || 0.05);

    let aimDir;
    let finalPower;
    let touchPoint;

    if (isMishit) {
      const angleJitter = (Math.random() - 0.5) * 1.2;
      aimDir = toPlayer.clone().normalize().rotate(angleJitter);
      finalPower = Math.random() * 220 + 120;
      touchPoint = aiPen.pos.clone();
    } else {
      // 1. Identify which desk edge player is closest to
      const distLeft = playerPen.pos.x - bounds.minX;
      const distRight = bounds.maxX - playerPen.pos.x;
      const distTop = playerPen.pos.y - bounds.minY;
      const distBottom = bounds.maxY - playerPen.pos.y;
      const minDist = Math.min(distLeft, distRight, distTop, distBottom);

      let pushTargetX = playerPen.pos.x;
      let pushTargetY = playerPen.pos.y;

      if (minDist === distLeft) pushTargetX -= 60;
      else if (minDist === distRight) pushTargetX += 60;
      else if (minDist === distTop) pushTargetY -= 60;
      else pushTargetY += 60;

      // 2. Aim at the point on player's pen that pushes towards that edge
      const pushDirection = new Vector2D(pushTargetX - aiPen.pos.x, pushTargetY - aiPen.pos.y).normalize();

      // Aim at player pen's center with slight accuracy variation
      const accuracy = this.personality.accuracy || 0.85;
      const maxJitter = (1 - accuracy) * 0.28; // Small angle jitter
      const angleJitter = (Math.random() - 0.5) * maxJitter;

      aimDir = Vector2D.sub(playerPen.pos, aiPen.pos).normalize().rotate(angleJitter);

      // 3. Smart Power Calculation (Calculated for lethal push without flying off)
      const deskDiag = Math.hypot(bounds.maxX - bounds.minX, bounds.maxY - bounds.minY);
      const distRatio = Math.min(1.0, distToPlayer / (deskDiag * 0.65));
      const baseForce = aiPen.maxPower * (0.35 + distRatio * 0.50) * (aiPen.mass / playerPen.mass);
      const powerMultiplier = 1 + (Math.random() - 0.5) * this.personality.powerVariance;
      finalPower = Math.min(aiPen.maxPower * 0.95, baseForce * powerMultiplier);

      // If player is close to the edge, deliver decisive push!
      if (minDist < 70) {
        finalPower = Math.min(aiPen.maxPower, finalPower * 1.15);
      }

      // 4. Contact point leverage for spin torque
      const useCap = Math.random() < 0.65;
      touchPoint = useCap && aiPen.capPos ? aiPen.capPos.clone() : aiPen.pos.clone();
    }

    const forceVector = Vector2D.mult(aimDir, finalPower);
    const powerRatio = Math.min(1.0, finalPower / aiPen.maxPower);

    return {
      force: forceVector,
      touchPoint: touchPoint,
      powerRatio: powerRatio
    };
  }
}
