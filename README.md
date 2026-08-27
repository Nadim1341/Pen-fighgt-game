# Pen Fight - Bangladeshi Nostalgic School Classroom Game

A physics-driven web simulation of the classic childhood classroom game "Pen Fight" (কলম যুদ্ধ / পেন ফাইট), deeply rooted in nostalgic Bangladeshi school culture. Built with vanilla HTML5 Canvas, modern JavaScript, custom physics, procedural audio synthesis, and authentic vintage scholastic aesthetics.

---

## Overview

In classrooms across Bangladesh, students turned wooden high-benches into battle arenas using their everyday ballpoint and gel pens (Matador, Econo, Olympic, Pilot, Reynolds). This game captures the exact physics, nostalgia, strategies, and classroom atmosphere of those memorable school days.

---

## Key Features

### 1. Physics Engine & Ballistics
- **Rigid Body Dynamics**: Realistic mass distribution, center of gravity, friction, spin torque, and elastic collisions.
- **Contact Point Leverage**: Striking pen caps, clips, or grip barrels applies realistic angular momentum and spin.
- **Table Edge Falloff**: Custom boundary collision detection with authentic gravity drop physics when pens leave the desk.
- **Don Mod & Weight Distribution**: Custom pen modifications including spring weights, melted wax, and double-cap configurations.

### 2. Game Modes
- **Quick Play (VS AI)**: Challenge diverse AI personalities including Roll 1 (Technical First Bencher), Class Captain (Tactical Monitor), and Last Bench Don (Spin Strike Master).
- **2-Player Mode (Pass & Play)**: Local turn-based multiplayer on a single device with live scoreboard tallying.
- **Campaign Mode (Backbenchers League)**: Multi-level classroom campaign with period progression (Math Period, Tiffin Break, Free Period, and Detention Boss Battle). Includes the iconic "দাইন দাইন তিন দাইন" celebration upon victory.
- **Trickshot Challenges**: Skill-based puzzle scenarios featuring ruler bank shots, geometry box curve torque, double knockouts, and eraser drop challenges.

### 3. Nostalgic Classroom Tour Mode
- **Interactive 3D Perspective Classroom**: Explore a 90s-2000s Bangladeshi school classroom with dynamic lighting and procedural weather (Sunny / Rainy).
- **Interactive Hotspots**:
  - **Green Chalkboard**: Authentic chalk formulas, Bengali quotes, and interactive duster cleaning.
  - **Teacher's Attendance Register (লাল হাজিরা খাতা)**: View nostalgic roll call records and student remarks.
  - **High-Bench Carvings (কাঠের টেবিলে খোদাই ডায়েরি)**: Wood graffiti, FLAMES, and compass carvings.
  - **Ceiling Fans**: Vintage metal-canopy hanging fans with real-time speed control.
  - **Brass School Bell (টিফিনের ঘণ্টা)**: Interactive gong bell sound effects.
  - **Bangladesh Wall Map**: Educational map modal celebrating national geography.
  - **Interactive Classmates**: Dialogue banter with First Bencher, Last Bencher, and Tiffin Muncher.

### 4. Pen Workshop (Garage)
Collect and play with iconic Bangladeshi and South Asian school pens:
- Matador All-Rounder (The balanced standard)
- Matador Hi-School 0.5 (Precision strike)
- Matador Pinpoint (Maximum spin torque)
- Econo DX (Heavy baseline striker)
- Olympic Gel (Low friction speed)
- Pilot BP-1 RT (Smooth tactical control)
- Reynolds 045 (Nostalgic long-barrel classic)
- Backbencher Double-Cap Monster (Heavy modified knockout pen)

### 5. Audio & Sound Design
- **Web Audio API Procedural Synthesizer**: Pure synthesized chalk writes, pen flicks, clatters, table drops, and the iconic "দাইন দাইন তিন দাইন" victory fanfare.
- **Ambient Classroom Atmosphere**: Rain on windowpanes, authentic school bell recordings, and distant classroom murmurs.
- **Multi-Channel Volume Mixer**: Independent sliders for Master, Ambient, SFX, and Chatter audio.

### 6. Design & Typography
- **Classic Typography**: Google Fonts integration using Noto Serif Bengali, Lora, Cinzel, and Special Elite.
- **Soothing Vintage Palette**: Muted teakwood tones, soft parchment cream, chalkboard sage, fountain ink blue, and soothing mint text highlights.
- **Bilingual Interface**: Full support for both Bengali (বাংলা) and English (EN).

---

## Project Structure

```
PEN FIGHT/
├── audio/
│   ├── classroom_ambience.webm
│   ├── classroom_rain.mp3
│   └── school_bell_real.webm
├── css/
│   └── style.css
├── js/
│   ├── ai/
│   │   └── bot.js
│   ├── audio/
│   │   └── sound.js
│   ├── entities/
│   │   ├── desk.js
│   │   ├── obstacle.js
│   │   └── pen.js
│   ├── game/
│   │   ├── campaign.js
│   │   ├── classroom_viewer.js
│   │   ├── trickshots.js
│   │   └── ui.js
│   ├── physics/
│   │   ├── engine.js
│   │   └── vector.js
│   ├── classroom_intro.js
│   └── main.js
├── index.html
├── README.md
└── .gitignore
```

---

## Getting Started

### Local Execution

1. Clone or download the repository:
   ```bash
   git clone https://github.com/Nadim1341/Pen-fighgt-game.git
   ```
2. Navigate to the project directory:
   ```bash
   cd Pen-fighgt-game
   ```
3. Start any standard local HTTP server:
   ```bash
   # Using Python 3
   python -m http.server 8080

### Netlify Deployment

This repository is pre-configured for instant 1-click deployment on Netlify via `netlify.toml`:

1. Sign in to [Netlify](https://app.netlify.com/).
2. Click **"Add new site" > "Import an existing project"**.
3. Connect your GitHub account and select the repository **`Nadim1341/Pen-fighgt-game`**.
4. Leave build settings at default (Publish directory: `.`).
5. Click **"Deploy Pen-fighgt-game"**. Your game will be instantly live on a secure HTTPS custom subdomain (e.g., `https://pen-fight-game.netlify.app`).

## Controls & How to Play

- **Aim & Flick**: Click / touch near your active pen, drag backward to set power and trajectory angle, then release to flick.
- **Spin Torque**: Drag from the pen cap or clip to apply rotational spin.
- **Objective**: Knock your opponent's pen off the wooden high-bench while ensuring your pen remains on the table.
- **Scoring**: First player to score 3 knockouts wins the match ("দাইন দাইন তিন দাইন - যে জিতবে সেই ফাইন!").

---

## Technical Specifications

- **Language**: Vanilla JavaScript (ES6+ Modules)
- **Rendering**: HTML5 Canvas 2D Context (No external graphic frameworks)
- **Styling**: Vanilla CSS3 (Custom design system, glassmorphism, responsive grid)
- **Audio**: Web Audio API (Synthesized Oscillators, GainNodes, Dynamic Audio Buffers)
- **Compatibility**: Desktop and Mobile Touchscreens

---

## License

This project is open-source and available for educational and nostalgic community enjoyment.
