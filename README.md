# SignSpace - The MR Sign Language Tutor

Welcome to **SignSpace**, a cutting-edge Mixed Reality (MR) and AI-powered application designed to democratize communication for the deaf and hard-of-hearing community. Built on **React Native** and optimized for **Meta Horizon OS**, SignSpace leverages real-time hand tracking, AI-driven object recognition, and immersive 3D visualization to teach sign language in an engaging, intuitive, and interactive way.

---

## Table of Contents

1. [Project Overview](#project-overview)  
2. [Key Features](#key-features)  
3. [Technical Architecture](#technical-architecture)  
4. [Curriculum Structure](#curriculum-structure)  
5. [Installation & Setup](#installation--setup)  
6. [Usage Instructions](#usage-instructions)  
7. [Development Roadmap](#development-roadmap)  
8. [Assets & Media](#assets--media)  
9. [Performance Guidelines](#performance-guidelines)  
10. [Acknowledgments](#acknowledgments)

---

## Project Overview

SignSpace transforms any physical space into a dynamic learning environment for sign language. Unlike traditional video tutorials, it captures **real-time hand movements**, interprets gestures, and projects them as **interactive 3D holograms**. By combining **hand tracking**, **Passthrough Camera Access**, and **AI**, users receive instant feedback and can practice signs directly in their surroundings.

**Vision Statement:**  
*"The world is your classroom. Break barriers with your hands."*

**Target Audience:**  
- Deaf and hard-of-hearing individuals  
- Educators teaching sign language  
- Language learners interested in interactive experiences  

**Competition Alignment:**  
SignSpace is designed to compete in the **Meta Horizon Start Developer Competition** in the following categories:
- Best Lifestyle / Education  
- Best Implementation of Hand Interactions  
- Best Implementation of Passthrough Camera Access with AI  
- Best Experience Built with React Native  
- Social Good / Community Impact

---

## Key Features

### 1. Ghost Hand (Holographic Teacher)
- Procedural 3D hand model renders gestures in real-time.  
- Fully interactive: rotate, zoom, and slow down animations.  
- Provides instant visual guidance for learning signs.

### 2. Snap & Sign
- Uses Passthrough Camera and AI to recognize real-world objects.  
- Automatically displays the correct sign in 3D for the object.  
- Works seamlessly with the Ghost Hand engine for a smooth learning experience.

### 3. Digital Mirror
- Shows the user's hand skeleton alongside the instructor hand.  
- Colors indicate correctness:  
  - Blue: partial match  
  - Green: successful match (>85% similarity)  
- Enhances muscle memory and learning efficiency.

### 4. Silent Voice
- Converts user signs into spoken words using Text-to-Speech (TTS).  
- Enables real-time communication with people unfamiliar with sign language.

### 5. Gamified Learning
- Visual feedback and progress tracking integrated into a clean Glassmorphism UI.  
- Encourages users to practice through interactive challenges.

---

## Technical Architecture

- **Platform:** Meta Horizon OS (Android)  
- **Core Framework:** React Native (v0.73+)  
- **XR Template:** @metaspatial/react-native-template  
- **3D Engine:** React Three Fiber (R3F) for 3D hand rendering  
- **AI Vision:** Python Backend (FastAPI + YOLO/Gemini) or TensorFlow Lite for on-device ML  
- **Hand Tracking:** Google MediaPipe for gesture dataset generation  
- **Audio Feedback:** Expo Speech SDK or native TTS engine  
- **Scene Understanding:** Passthrough API + Spatial Anchors for real-world object mapping

---

## Curriculum Structure

SignSpace follows a **five-level structured learning path**:

1. **Universal (Seviye 1)** – Hello, Yes, No  
2. **Politeness (Seviye 2)** – Please, Thank You, Good  
3. **Needs (Seviye 3)** – Water, Help, Home  
4. **Alphabet (Seviye 4)** – Letters A, B, L  
5. **Emotions (Seviye 5)** – Love, Happy, Sad  

Each sign includes:
- JSON representation of hand joints  
- 3D Ghost Hand animation  
- Visual and auditory feedback

---

## Installation & Setup

### Prerequisites
- Meta Quest 3 or compatible MR device  
- Node.js v20+  
- Android Studio with device debugging enabled  
- Yarn or npm package manager

### Steps
1. Clone the repository:  
   ```bash
   git clone <repository-url>
   ```
   
Install dependencies:
```bash
yarn install
```

Build the application:
```bash
yarn android
```

Connect Meta Quest 3 and verify device recognition:
```bash
adb devices
```


## Quick Start
1. Launch the app and verify **"Hello World"** appears in the headset.

## Usage Instructions

### Start Learning
- Select a level and sign from the curriculum.
- Observe the **Ghost Hand** demonstrating the sign.

### Mirror Feedback
- Perform the sign yourself; **Digital Mirror** overlays your hand.
- Colors indicate accuracy:
  - **Blue → Partial**
  - **Green → Correct**

### Snap & Sign
- Scan objects in your room.
- Ghost Hand automatically performs the corresponding sign.

### Silent Voice
- Your gestures are converted to speech for real-time communication.

## Development Roadmap

### Core Phases
1. **Data Collection & JSON Generation** – MediaPipe integration for 15 core signs.
2. **3D Hand Rendering** – Ghost Hand engine with SkinnedMesh & animations.
3. **Hand Tracking Integration** – Live user hand input and debugging.
4. **Pose Comparison Engine** – Cosine similarity/Euclidean distance to calculate correctness.
5. **UI & Gamification** – Glassmorphism panels with accuracy display.
6. **AI Object Recognition** – Snap & Sign pipeline for object detection.
7. **Digital Mirror & TTS** – Real-time feedback and speech output.
8. **Final Testing & Optimization** – Reduce latency, optimize performance, polish visuals.

## Assets & Media
- **3D Hand Model:** `hand.glb` (Low Poly, Rigged)
- **Sound Effects:**
  - `success_chime.mp3` – soft zen chime
  - `hover_click.wav` – UI click feedback
  - `scan_sound.wav` – futuristic scan sound

## Performance Guidelines
- Minimize React Native Bridge traffic.
- Use Native Driver or Reanimated for smooth animations.
- Passthrough camera latency should be imperceptible.
- Optimize 3D hand and mesh rendering for real-time feedback.

## Acknowledgments
- Meta Horizon Start Developer Competition resources
- Google MediaPipe
- Sketchfab for 3D hand models
- OpenAI GPT-4o / Google Gemini for AI object recognition

SignSpace is not just a learning tool; it is an immersive, accessible, and socially impactful platform designed to redefine how people interact with sign language in Mixed Reality.
