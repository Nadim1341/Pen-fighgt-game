/**
 * Bangladeshi School Campaign: Backbenchers League (লাস্ট বেঞ্চের টুর্নামেন্ট)
 */
export const CAMPAIGN_LEVELS = [
  {
    id: 1,
    titleBN: 'লেভেল ১: অংক ক্লাস (Math Period)',
    titleEN: 'Level 1: Math Period',
    periodBN: '১ম পিরিয়ড - গণিত স্যারের ক্লাস',
    periodEN: '1st Period - Math Class',
    opponentId: 'nerd',
    opponentPenId: 'matador_hischool',
    playerPenId: 'matador_allrounder',
    storyBN: 'অংক স্যার বোর্ডে উপপাদ্য লিখছেন। রোল ১ চ্যালেঞ্জ জানিয়েছে: "পেন ফাইটে পারলে আমাকে হারিয়ে দেখা!"',
    storyEN: 'Math Sir is writing formulas on the blackboard. Roll 1 dares you: "Beat me in pen fight if you can!"',
    obstacles: [],
    rewardPenId: 'matador_pinpoint',
    winScore: 3
  },
  {
    id: 2,
    titleBN: 'লেভেল ২: টিফিন ব্রেক (Tiffin Break)',
    titleEN: 'Level 2: Tiffin Break',
    periodBN: 'টিফিন টাইম - ক্লাসরুম যুদ্ধ',
    periodEN: 'Tiffin Time - Classroom Mayhem',
    opponentId: 'captain',
    opponentPenId: 'olympic_gel',
    playerPenId: 'matador_alltime',
    storyBN: 'সবাই সিঙ্গাড়া আর সমুচা খাচ্ছে। ক্লাস ক্যাপ্টেন এসে বলল: "টেবিলে স্কেল আর রাবার দিয়ে বাউন্ডারি দিয়েছি, পারবি বের হতে?"',
    storyEN: 'Everyone is eating Singara and Samusa. Class Captain placed scale & eraser barriers on the high-bench!',
    obstacles: [
      { type: 'ruler', xRel: 0.5, yRel: 0.35, width: 140, height: 16, angle: 0.1 },
      { type: 'eraser', xRel: 0.35, yRel: 0.65, width: 44, height: 22, angle: -0.2 }
    ],
    rewardPenId: 'econo_dx',
    winScore: 3
  },
  {
    id: 3,
    titleBN: 'লেভেল ৩: ফ্রি পিরিয়ড (Free Period)',
    titleEN: 'Level 3: Free Period',
    periodBN: '৫ম পিরিয়ড - ড্রয়িং স্যার আসেননি',
    periodEN: '5th Period - Free Class',
    opponentId: 'captain',
    opponentPenId: 'pilot_bp1_rt',
    playerPenId: 'econo_dx',
    storyBN: 'স্যার আসেননি, পুরো ক্লাস ফাঁকা! সেকশন বি এর চ্যাম্পিয়ন জ্যামিতি বক্স নিয়ে মাঠে নেমেছে!',
    storyEN: 'Teacher is absent, chaos in class! Section B Champ placed a heavy geometry box in the center!',
    obstacles: [
      { type: 'geometry_box', xRel: 0.5, yRel: 0.5, width: 110, height: 60, angle: 0.05 },
      { type: 'pencil', xRel: 0.72, yRel: 0.35, width: 130, height: 12, angle: -0.35 }
    ],
    rewardPenId: 'olympic_gel',
    winScore: 3
  },
  {
    id: 4,
    titleBN: 'লেভেল ৪: লাস্ট বেঞ্চের ফাইনাল যুদ্ধ (Detention Boss)',
    titleEN: 'Level 4: Last Bench Boss Battle',
    periodBN: 'স্কুল ছুটির পর - লাস্ট বেঞ্চের ডনের মুখোমুখি',
    periodEN: 'After School - Face the Backbencher Boss',
    opponentId: 'don',
    opponentPenId: 'hero_329_fountain',
    playerPenId: 'olympic_gel',
    storyBN: 'স্কুলের ছুটি হয়ে গেছে। লাস্ট বেঞ্চের শাকিল তার ভারী হিরো ৩২৯ ফাউন্টেন পেন নিয়ে হাসছে: "আজকে বুঝবি আসল পেন ফাইট কাকে বলে!"',
    storyEN: 'School bell has rung. Shakil from the last bench unsheathes his heavy Hero 329 Fountain Pen: "Today you meet the True Don!"',
    obstacles: [
      { type: 'ruler', xRel: 0.25, yRel: 0.5, width: 130, height: 16, angle: 1.57 },
      { type: 'ruler', xRel: 0.75, yRel: 0.5, width: 130, height: 16, angle: 1.57 },
      { type: 'eraser', xRel: 0.5, yRel: 0.28, width: 44, height: 22, angle: 0 },
      { type: 'eraser', xRel: 0.5, yRel: 0.72, width: 44, height: 22, angle: 0 }
    ],
    rewardPenId: 'backbencher_modded',
    winScore: 4
  }
];
