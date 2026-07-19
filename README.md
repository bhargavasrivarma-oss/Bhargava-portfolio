# CHEKURI SYSTEMS // 2060 PORTFOLIO.

A complete, production-ready, ultra-futuristic developer portfolio website built for **C.H.E.K.U.R.I Bhargava Sri Varma**. It is designed with visual styling mimicking neural operating systems and advanced HUD panels of the year 2060.

---

## 🌌 Core Features

1. **System Boot Preloader (`Loader.jsx`)**:
   - Simulates a futuristic core OS boot sequence (checking neural link stability, verified status).
   - Utilizes custom, self-contained Web Audio API oscillators to generate retro-futuristic sound blips and final welcome chords procedurally.

2. **3D WebGL Neural Sphere (`NeuralSphere.jsx`)**:
   - Concentric outer/inner wireframe spheres (cyan and purple matrices) with rotating green orbits rendering live on the GPU using `@react-three/fiber` and `@react-three/drei`.
   - Reacts to mouse coordinates and is interactive on mouse drag.

3. **Elastic Custom Pointer (`CustomCursor.jsx`)**:
   - Magnetic button capture capabilities, click ripples, and spring-damper cursor trails.

4. **Floating HUD Navbar (`Navbar.jsx`)**:
   - Translucent glassmorphism pill that shrinks on scroll and monitors the active section dynamically.
   - Includes a synchronized Live UTC HUD Clock with coordinate offsets for Hyderabad, TS, India.

5. **Analytical Skill Orbit (`Skills.jsx`)**:
   - Trig-positioned concentric orbiting skills (HTML5, CSS3, React, Tailwind, Prompt Engineering, UI/UX).
   - Incorporates opposite rotation offsets so text remains upright and readable as they orbit.

6. **Interactive Neural Proxy Chatbot (`AIAssistant.jsx`)**:
   - Floating companion dialog widget simulating a terminal inquiry chatbot. Can trigger queries about the host's stack, studies, career status, and automations.

7. **Keyboard Command Palette (`CommandPalette.jsx`)**:
   - Modal triggered via `Ctrl + K` or navbar icon. Includes navigation links, diagnostic suites, and triggers for Easter Eggs.

8. **Matrix Rain Stream (`MatrixRain.jsx`)**:
   - Background falling binary rain Easter Egg toggled via the Command Palette or `Ctrl + M`.

---

## 🛠️ Technology Stack

- **Framework**: React 19 + Vite (built in less than 900ms)
- **Styling**: Tailwind CSS v4 (configured natively via `@theme` in `src/index.css`)
- **WebGL Core**: Three.js + React Three Fiber + Drei
- **Animations**: Framer Motion + GSAP
- **Icons**: Lucide Icons + custom inline SVGs (for brand logo compatibility)
- **Smooth Scroll**: Lenis Scroll Engine
- **Audio Engine**: Web Audio API (procedural synthesizers)

---

## 📁 Directory Structure

```
├── public/                 # Static assets
├── src/
│   ├── canvas/             # 3D R3F Canvas components
│   │   ├── SpaceParticles.jsx   # GPU-accelerated background stars
│   │   └── NeuralSphere.jsx     # concentric wireframe spheres
│   ├── components/         # Floating UI Utilities
│   │   ├── AIAssistant.jsx      # floating chatbot proxy
│   │   ├── CommandPalette.jsx   # Ctrl+K searching prompt
│   │   ├── CustomCursor.jsx     # spring cursor trail
│   │   ├── Loader.jsx           # boot preloader with audio
│   │   ├── MatrixRain.jsx       # easter egg canvas
│   │   ├── Navbar.jsx           # floating capsule navigation
│   │   └── SoundController.jsx  # procedural ambient synthesizer
│   ├── sections/           # Main landing page modules
│   │   ├── About.jsx            # biography and metrics HUD
│   │   ├── Skills.jsx           # orbital coordinate rings
│   │   ├── AIEcosystem.jsx      # 8 AI tool cards
│   │   ├── Projects.jsx         # 3D mouse tilt project cards
│   │   ├── Education.jsx        # vertical timeline nodes
│   │   ├── Stats.jsx            # counters & custom socials SVGs
│   │   └── Contact.jsx          # glass contact dispatcher
│   ├── App.jsx             # Main router & layout coordinator
│   ├── index.css           # Tailwind v4 theme configurations
│   └── main.jsx            # StrictMode renderer
├── index.html              # SEO optimized metadata container
├── package.json            # Node dependency registry
└── vite.config.js          # Tailwind v4 Vite compilation plugin
```

---

## 🚀 Installation & Local Development

1. **Clone the repository**:
   ```bash
   git clone <repository_url>
   cd portfolio
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```

4. **Verify the production build**:
   ```bash
   npm run build
   ```

---

## 🌐 Production Deployment Guide

### Deploying to Vercel

The fastest way to deploy your portfolio is via Vercel:
1. Install the Vercel CLI globally or use the dashboard:
   ```bash
   npm install -g vercel
   vercel
   ```
2. Link your repository. Vercel will automatically discover the Vite configuration.
3. Configure the build settings (usually pre-filled):
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
4. Deploy!

### Deploying to Netlify

To deploy on Netlify:
1. Log in to the [Netlify Dashboard](https://app.netlify.com/).
2. Select **Add new site** -> **Import an existing project**.
3. Link your GitHub repository.
4. Set the build parameters:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
5. Click **Deploy site**.

### Deploying to GitHub Pages

To host on GitHub Pages:
1. Install the `gh-pages` package:
   ```bash
   npm install gh-pages --save-dev
   ```
2. Update `vite.config.js` to include the `base` configuration:
   ```javascript
   export default defineConfig({
     base: '/<repository-name>/', // Replace with your repository name
     plugins: [react(), tailwindcss()],
   })
   ```
3. Add deploy scripts to `package.json`:
   ```json
   "scripts": {
     "predeploy": "npm run build",
     "deploy": "gh-pages -d dist"
   }
   ```
4. Deploy via terminal:
   ```bash
   npm run deploy
   ```
