/**
 * Bangladeshi School Trick Shot Challenges (পেন ফাইট ট্রিক শট)
 */
export const TRICKSHOT_CHALLENGES = [
  {
    id: 1,
    titleBN: 'চ্যালেঞ্জ ১: অপ্সরা ইরেজার ড্রপ (Eraser Drop)',
    titleEN: 'Challenge 1: Eraser Drop',
    descBN: '১ শটের মধ্যে মুভেবল অপ্সরা ইরেজারকে টেবিল থেকে নিচে ফেলো! তোমার কলম যেন টেবিলে থাকে।',
    descEN: 'Knock the Apsara eraser off the desk in 1 shot! Keep your pen safe on the table.',
    playerPenId: 'matador_allrounder',
    playerPosRel: { x: 0.25, y: 0.5, angle: 0 },
    targets: [
      { type: 'eraser_target', xRel: 0.72, yRel: 0.5, width: 48, height: 26, angle: 0.1 }
    ],
    obstacles: [],
    maxShots: 2,
    par: 1
  },
  {
    id: 2,
    titleBN: 'চ্যালেঞ্জ ২: স্কেল রিবাউন্ড ব্যাংক শট (Bank Shot)',
    titleEN: 'Challenge 2: Scale Bank Shot',
    descBN: 'সামনে নটরাজ স্কেল বাধা হয়ে আছে! উপরের কাঠের কানায় রিবাউন্ড মেরে পেছনের পেনটি ফেলো।',
    descEN: 'Nataraj scale blocks direct path! Bank off the top bench edge to strike the hidden pen.',
    playerPenId: 'matador_pinpoint',
    playerPosRel: { x: 0.25, y: 0.72, angle: -0.6 },
    targets: [
      { type: 'pen_target', presetId: 'matador_hischool', xRel: 0.75, yRel: 0.72, angle: 0 }
    ],
    obstacles: [
      { type: 'ruler', xRel: 0.5, yRel: 0.68, width: 140, height: 16, angle: 1.57 }
    ],
    maxShots: 2,
    par: 1
  },
  {
    id: 3,
    titleBN: 'চ্যালেঞ্জ ৩: জ্যামিতি বক্স কার্ভ শট (Curve Shot)',
    titleEN: 'Challenge 3: Geometry Box Curve',
    descBN: 'পিনপয়েন্টের হাই-স্পিন কার্ভ ব্যবহার করে ভারী জ্যামিতি বক্সের পাশ কাটিয়ে টার্গেটে আঘাত করো!',
    descEN: 'Use high-spin curve torque to whip around the heavy geometry box and hit the target.',
    playerPenId: 'matador_pinpoint',
    playerPosRel: { x: 0.2, y: 0.35, angle: 0.4 },
    targets: [
      { type: 'pen_target', presetId: 'econo_dx', xRel: 0.8, yRel: 0.65, angle: 0 }
    ],
    obstacles: [
      { type: 'geometry_box', xRel: 0.48, yRel: 0.5, width: 105, height: 60, angle: 0 }
    ],
    maxShots: 2,
    par: 1
  },
  {
    id: 4,
    titleBN: 'চ্যালেঞ্জ ৪: ডাবল নকআউট (Double Knockout)',
    titleEN: 'Challenge 4: Double Knockout',
    descBN: 'ডাবল-ক্যাপ মনস্টার দিয়ে এক নিখুঁত শটে একই সাথে দুই প্রতিদ্বন্দ্বীর পেন টেবিল পার করো!',
    descEN: 'Use the heavy Double-Cap Monster to knock BOTH opponent pens off the desk!',
    playerPenId: 'backbencher_monster',
    playerPosRel: { x: 0.22, y: 0.5, angle: 0 },
    targets: [
      { type: 'pen_target', presetId: 'matador_allrounder', xRel: 0.75, yRel: 0.38, angle: 0.2 },
      { type: 'pen_target', presetId: 'matador_hischool', xRel: 0.75, yRel: 0.62, angle: -0.2 }
    ],
    obstacles: [],
    maxShots: 2,
    par: 1
  },
  {
    id: 5,
    titleBN: 'চ্যালেঞ্জ ৫: পিনবল করিডোর বাউন্স (Pinball Corridor)',
    titleEN: 'Challenge 5: Pinball Corridor',
    descBN: 'দুই স্কেলের মাঝের সরু করিডোর দিয়ে রিবাউন্ড মারো এবং কর্নারের টার্গেটকে টেবিল ছাড়া করো!',
    descEN: 'Bank through the narrow corridor between two rulers to blast the corner target pen!',
    playerPenId: 'gq_genius',
    playerPosRel: { x: 0.2, y: 0.25, angle: 0.5 },
    targets: [
      { type: 'pen_target', presetId: 'pilot_bp1_rt', xRel: 0.82, yRel: 0.75, angle: 0 }
    ],
    obstacles: [
      { type: 'ruler', xRel: 0.45, yRel: 0.35, width: 110, height: 16, angle: 0.4 },
      { type: 'ruler', xRel: 0.58, yRel: 0.65, width: 110, height: 16, angle: -0.4 }
    ],
    maxShots: 2,
    par: 1
  },
  {
    id: 6,
    titleBN: 'চ্যালেঞ্জ ৬: লাস্ট বেঞ্চের বস ক্লিয়ারেন্স (Last Bench Boss)',
    titleEN: 'Challenge 6: Last Bench Boss Clearance',
    descBN: 'টেবিলের তিন প্রান্তে পাহারা দেওয়া ৩টি পেনকেই ৩ শটের মধ্যে নিচে ফেলে দাও!',
    descEN: 'Clear all 3 guardian pens off the desk within 3 shots to achieve trickshot mastery!',
    playerPenId: 'backbencher_monster',
    playerPosRel: { x: 0.2, y: 0.5, angle: 0 },
    targets: [
      { type: 'pen_target', presetId: 'matador_alltime', xRel: 0.68, yRel: 0.28, angle: 0.1 },
      { type: 'pen_target', presetId: 'olympic_gel', xRel: 0.82, yRel: 0.5, angle: 0 },
      { type: 'pen_target', presetId: 'linc_ocean', xRel: 0.68, yRel: 0.72, angle: -0.1 }
    ],
    obstacles: [
      { type: 'pencil', xRel: 0.45, yRel: 0.5, width: 90, height: 10, angle: 1.57 }
    ],
    maxShots: 3,
    par: 2
  }
];
