# Kavinprasanth km - Portfolio (React + 3D)

A modern, minimal portfolio with smooth 3D elements built with React, Three.js, and Framer Motion.

## Tech Stack

- **React 18** + Vite (fast dev & build)
- **React Three Fiber** + Drei (3D floating shapes)
- **Framer Motion** (smooth scroll animations & transitions)
- **Tailwind CSS** (minimal modern styling)
- **React Icons** (icon library)

## Quick Start

```bash
# 1. Navigate to the project
cd E:\projects\portfolio-react

# 2. Install dependencies
npm install

# 3. Start dev server
npm run dev
```

The app will open at `http://localhost:5173`

## Project Structure

```
portfolio-react/
|-- public/
|   |-- wall.jpeg          (your profile photo - copy from old portfolio)
|-- src/
|   |-- components/
|   |   |-- 3d/
|   |   |   |-- Scene3D.jsx      (Three.js floating shapes background)
|   |   |-- Card3D.jsx           (3D tilt hover effect card)
|   |   |-- Navbar.jsx           (Glass navbar with mobile menu)
|   |   |-- SectionWrapper.jsx   (Scroll reveal wrapper)
|   |   |-- Footer.jsx
|   |-- sections/
|   |   |-- Hero.jsx             (Hero with 3D bg + typing animation)
|   |   |-- About.jsx            (About + animated stats)
|   |   |-- Skills.jsx           (3D tilt skill cards)
|   |   |-- Projects.jsx         (3D project cards)
|   |   |-- Certificates.jsx
|   |   |-- Contact.jsx
|   |-- App.jsx
|   |-- main.jsx
|   |-- index.css               (Tailwind + custom glass styles)
|-- package.json
|-- vite.config.js
|-- tailwind.config.js
|-- postcss.config.js
```

## Features

- Floating 3D geometric shapes (icosahedrons + torus) with distort materials
- 3D perspective tilt on all cards (mouse-follow)
- Smooth scroll-reveal animations (Framer Motion)
- Gradient text animations
- Glass-morphism cards with subtle depth
- Typing animation for roles
- Responsive design (mobile-first)
- Minimal white aesthetic with indigo/purple accent

## Customization

- Colors: Edit `tailwind.config.js` -> `colors.primary` and `colors.accent`
- 3D Shapes: Edit `src/components/3d/Scene3D.jsx` (positions, colors, count)
- Content: Edit data arrays in each section file
- Profile photo: Replace `public/wall.jpeg`

## Build for Production

```bash
npm run build
# Output in /dist folder - deploy to Vercel, Netlify, etc.
```
