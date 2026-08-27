/**
 * Nostalgic Classroom Interactive Viewer & Tour Controller
 * Manages the immersive full classroom exploration, interactive hotspots,
 * attendance register inspection, chalkboard scribbles, weather toggle & school sounds!
 */
export class ClassroomViewer {
  constructor(game) {
    this.game = game;
    this.activeModal = null;
    this.fanSpeedLevel = 2; // 0, 1, 2
  }

  openTour() {
    this.game.state = 'CLASSROOM_VIEW';
    this.game.sound.init();

    // Hide gameplay HUD so it doesn't overlap
    const hud = document.getElementById('hud');
    if (hud) hud.style.display = 'none';

    // Show tour overlay HUD
    const overlay = document.getElementById('classroom-tour-overlay');
    if (overlay) overlay.classList.add('active');

    const isBn = this.game.ui.lang === 'bn';
    this.game.ui.showToast(
      isBn ? 'নস্টালজিক ক্লাসরুমে স্বাগতম! ছাত্র, চকবোর্ড ও জিনিসপত্র স্পর্শ করে দেখুন।' : 'Welcome to the Nostalgic Classroom! Tap students and objects to interact.',
      3500
    );
  }

  closeTour() {
    const overlay = document.getElementById('classroom-tour-overlay');
    if (overlay) overlay.classList.remove('active');
    this.hideInspectModals();
    this.game.sound.stopRainSound();

    const hud = document.getElementById('hud');
    if (hud && this.game.state !== 'MENU') hud.style.display = 'flex';
  }

  handlePointerClick(pos) {
    if (this.game.state !== 'CLASSROOM_VIEW') return false;

    const now = Date.now();
    if (this.lastClickTime && now - this.lastClickTime < 250) {
      return false; // Ignore duplicate events within 250ms
    }

    // Check if clicked any hotspot
    const hotspots = this.game.intro.getHotspots();
    for (const h of hotspots) {
      const dist = Math.hypot(pos.x - h.x, pos.y - h.y);
      if (dist <= h.radius) {
        this.lastClickTime = now;
        this.triggerHotspotAction(h.id);
        return true;
      }
    }
    return false;
  }

  handlePointerMove(pos) {
    if (this.game.state !== 'CLASSROOM_VIEW') return;
    const hotspots = this.game.intro.getHotspots();
    let found = null;
    for (const h of hotspots) {
      const dist = Math.hypot(pos.x - h.x, pos.y - h.y);
      if (dist <= h.radius) {
        found = h.id;
        break;
      }
    }
    this.game.intro.hoveredHotspot = found;
  }

  triggerHotspotAction(hotspotId) {
    const isBn = this.game.ui.lang === 'bn';

    if (hotspotId === 'chalkboard') {
      const quote = this.game.intro.cycleChalkQuote();
      this.game.sound.playChalkWrite();
      this.game.ui.showToast(`[চকবোর্ড] ${quote.titleBN}`, 2800);
    } else if (hotspotId === 'teacher_desk') {
      this.openAttendanceRegisterModal();
    } else if (hotspotId === 'window') {
      const newWeather = this.game.intro.toggleWeather();
      if (newWeather === 'rainy') {
        this.game.sound.startRainSound();
        this.game.ui.showToast(
          isBn ? 'বাইরে আষাঢ়ের মুষলধারে বৃষ্টি শুরু হলো! টিনের চালে বৃষ্টির শব্দ...' : 'Monsoon rain started pouring outside the window with tin-roof sounds!',
          3200
        );
      } else {
        this.game.sound.stopRainSound();
        this.game.ui.showToast(
          isBn ? 'বৃষ্টি থেমে জানালার বাইরে সোনালী রোদ উঁকি দিচ্ছে।' : 'The rain stopped and warm sunshine beams into the room.',
          3200
        );
      }
    } else if (hotspotId === 'bench_carvings') {
      this.openBenchCarvingsModal();
    } else if (hotspotId === 'bangladesh_map') {
      this.openMapModal();
    } else if (hotspotId === 'school_bell') {
      this.ringSchoolBell();
    } else if (hotspotId === 'ceiling_fan' || hotspotId === 'ceiling_fan_right') {
      this.cycleFanSpeed();
    } else if (hotspotId === 'student_firstboy') {
      const line = isBn ? 'রোল ১: "স্যাররে কিন্তু সব বলে দেব! পড়া শেষ না করে পেন ফাইট খেলছিস কেন?"' : 'Roll 1: "I will tell Sir! Why are you playing pen fight instead of studying?"';
      this.game.intro.triggerStudentSpeech(isBn ? 'স্যাররে সব বলে দেব!' : 'I will tell Sir!', this.game.intro.width * 0.28, this.game.intro.height * 0.63);
      this.game.ui.showToast(`[ফার্স্ট বয়] ${line}`, 3400);
      this.game.sound.playFlick(0.3);
    } else if (hotspotId === 'student_backbenchers') {
      const line = isBn ? 'লাস্ট বেঞ্চার: "দোস্ত এই শটে তোর পেন একদম ফ্লোরে ফেলে দাইন তিন দাইন করব!"' : 'Backbencher: "Bro, this flick is gonna knock your pen straight to the floor!"';
      this.game.intro.triggerStudentSpeech(isBn ? 'এই শটে পেন আউট!' : 'Knockout shot!', this.game.intro.width * 0.66, this.game.intro.height * 0.55);
      this.game.ui.showToast(`[লাস্ট বেঞ্চার] ${line}`, 3400);
      this.game.sound.playHit(180);
    } else if (hotspotId === 'student_tiffin' || hotspotId === 'student_daydreamer') {
      const line = isBn ? 'টিফিন চোর: "দোস্ত দেখিস না স্যার দেখতেছে! এই নে গরম সিঙ্গাড়ার অর্ধেকটা।"' : 'Tiffin Muncher: "Quiet, Sir might look! Here, take half of this hot Singara."';
      this.game.intro.triggerStudentSpeech(isBn ? 'গরম সিঙ্গাড়া খা!' : 'Have some Singara!', this.game.intro.width * 0.30, this.game.intro.height * 0.53);
      this.game.ui.showToast(`[টিফিন] ${line}`, 3400);
      this.game.sound.playTiffinMunch();
    } else if (hotspotId === 'student_aviator') {
      const line = isBn ? 'এভিয়েটর: "৩ডি প্লেন উড়াল দিল! সোজা ফার্স্ট বেঞ্চের রোল ১ এর মাথায়!"' : 'Aviator: "3D paper plane launched! Straight to Roll 1\'s desk!"';
      this.game.intro.launchPaperAirplane(this.game.intro.width * 0.34, this.game.intro.height * 0.46);
      this.game.intro.triggerStudentSpeech(isBn ? 'প্লেন উড়াল দিল!' : 'Plane Launched!', this.game.intro.width * 0.34, this.game.intro.height * 0.42);
      this.game.ui.showToast(`[প্লেন] ${line}`, 3400);
      this.game.sound.playPlaneWhoosh();
    } else if (hotspotId === 'student_penspinner') {
      const line = isBn ? 'পেন স্পিনার: "আঙুলে কলম ঘোরানোর ট্রিক দেখ! একটানা ৫০ বার ঘুরাইছি!"' : 'Pen Spinner: "Check out this thumb-around spin trick! 50 rotations non-stop!"';
      this.game.intro.triggerStudentSpeech(isBn ? 'স্পিনিং ট্রিক দেখ!' : 'Spin Trick!', this.game.intro.width * 0.67, this.game.intro.height * 0.62);
      this.game.ui.showToast(`[স্পিন] ${line}`, 3400);
      this.game.sound.playPenSpinClick();
    } else if (hotspotId === 'student_sleeper') {
      const line = isBn ? 'ঘুমন্ত ছাত্র: "হাজিরা ডাকার সময় একটু ডেকে দিস ভাই... আর মাত্র ৫ মিনিট ঘুমাই।"' : 'Sleeping student: "Wake me up during roll call, let me sleep 5 more minutes."';
      this.game.intro.triggerStudentSpeech(isBn ? 'হাজিরার সময় ডাকিস...' : 'Wake me at roll call...', this.game.intro.width * 0.62, this.game.intro.height * 0.45);
      this.game.ui.showToast(`[ঘুমন্ত ছাত্র] ${line}`, 3400);
    }
  }

  ringSchoolBell() {
    const isBn = this.game.ui.lang === 'bn';
    this.game.sound.playBellSingle();
    setTimeout(() => this.game.sound.playBellSingle(), 300);
    setTimeout(() => this.game.sound.playBellSingle(), 600);
    this.game.ui.showToast(isBn ? 'ঢং! ঢং! ঢং! টিফিনের ঘণ্টা বেজে উঠেছে!' : 'Dong! Dong! Dong! Tiffin Period Bell rang!', 3000);
  }

  cycleFanSpeed() {
    const isBn = this.game.ui.lang === 'bn';
    this.fanSpeedLevel = (this.fanSpeedLevel + 1) % 3;
    this.game.intro.setFanSpeed(this.fanSpeedLevel);

    const labels = [
      isBn ? 'বন্ধ (Off)' : 'Off',
      isBn ? 'ধীর গতি (Low Speed)' : 'Low Speed',
      isBn ? 'দ্রুত গতি (High Speed)' : 'High Speed'
    ];
    this.game.ui.showToast(`${isBn ? 'সিলিং ফ্যান' : 'Fan'}: ${labels[this.fanSpeedLevel]}`, 2200);
  }

  openAttendanceRegisterModal() {
    this.game.sound.playPageTurn();
    const modal = document.getElementById('attendance-modal');
    if (modal) modal.classList.add('active');
  }

  openBenchCarvingsModal() {
    this.game.sound.playPageTurn();
    const modal = document.getElementById('bench-carvings-modal');
    if (modal) modal.classList.add('active');
  }

  openMapModal() {
    this.game.sound.playPageTurn();
    const modal = document.getElementById('map-modal');
    if (modal) modal.classList.add('active');
  }

  hideInspectModals() {
    document.querySelectorAll('.classroom-inspect-modal').forEach(m => m.classList.remove('active'));
  }
}
