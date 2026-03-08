
# Personal Portfolio Website – Thomas Sabu

## Overview

The website is structured into several pages:

- **Home** – Landing page with a brief introduction and navigation.
- **About** – Background, interests, and a short bio.
- **Projects** – Detailed project cards and case studies, including:
  - **Handwritten Digit Recognition with CNN** (MNIST, TensorFlow/Keras)
  - **Career‑Skill Recommender System** (TF‑IDF, cosine similarity, scikit‑learn)
  - **Smart Recipe Finder** (Flask + Vue.js + JS frontend)
  - **Car Price Prediction** (regression models including XGBoost)
  - **Hydroponic System** (team engineering project)
  - **Creative Coding Viewer** embedding interactive projects hosted via GitHub Pages (e.g., Doge Game, Perlin Flow Field, Spinning Squares, etc.)
- **Contact** – Contact information and links to my professional profiles.

Key front‑end features:

- **Dark mode toggle** with dynamic favicon switching.
- **Animated particle background** via `particles.js`.
- **Responsive layout** designed for both desktop and mobile.
- **Filterable project grid** (Web / ML / Creative / Other).
- **Embedded viewer** for creative‑coding projects hosted on GitHub Pages.
- **Font Awesome icons** for GitHub and LinkedIn integration.

This repository is one of the featured software projects in my senior portfolio, demonstrating front‑end engineering, UI design, and integration with external ML and creative‑coding projects.

---

## Installation Instructions

This is a static website built with **HTML**, **CSS**, and **JavaScript**. There is no backend server or database required.

### 1. Prerequisites

- A modern web browser (Chrome, Firefox, Edge, Safari, etc.)
- Optional (for local hosting):
  - Python 3 (for a simple HTTP server), or
  - Any other basic static file server.

### 2. Clone or Download the Repository

Using Git:

```bash
git clone <REPO_URL>
cd <REPO_NAME>
```

Or download the repository as a ZIP from GitHub/GitLab, extract it, and open the extracted folder.

### 3. File / Folder Structure (key files)

Depending on how you have deployed the site, the structure will look roughly like:

- `index.html` – Landing / home page.
- `about.html` – “About Me” page.
- `projects.html` – Projects and case studies.
- `contact.html` – Contact page.
- `style.css` or `css/style.css` – Styles for layout, color, and typography.
- `script.js` or `js/script.js` – Main client‑side behavior (dark mode, navigation, filters, etc.).
- `particles.min.js` or `vendor/particles/particles.min.js` – Library for particle background.
- `all.min.css` or `vendor/Awesome Fonts/css/all.min.css` – Font Awesome icons.
- `fa-brands-400.woff2`, `fa-regular-400.woff2`, `fa-solid-900.woff2`, `fa-v4compatibility.woff2` – Font Awesome font files.
- `photos/` – Images for project cards and favicons (e.g., project background images, light/dark favicons).

Make sure the folders and paths for CSS, JS, fonts, and images match the references inside the HTML files (for example, `projects.html` expects assets under `photos/`, `vendor/`, `js/`, and `css/`).

### 4. Running Locally

#### Option A: Open Directly

1. Navigate to the project folder.
2. Open `index.html` in a web browser (double‑click or drag into browser).

This is the quickest way to view the site, but a local HTTP server is preferable for consistent behavior across browsers.

#### Option B: Run a Simple Local Server (Recommended)

If you have Python 3 installed:

```bash
# From the project root directory
python -m http.server 8000
```

Then open your browser and go to:

```text
http://localhost:8000
```

You can navigate via the top navigation bar to the **About**, **Projects**, and **Contact** pages.

---

## Usage Instructions

### Navigating the Portfolio

- **Navigation Bar**
  - Links to `Home`, `About`, `Projects`, and `Contact`.
  - A hamburger menu appears on smaller screens for responsive navigation.
  - The current page is highlighted (e.g., `Projects` is active on `projects.html`).

- **Dark Mode Toggle**
  - The moon button (`🌙`) toggles between light and dark modes.
  - Favicons and icons update to match the active theme.

- **Particle Background**
  - `particles.min.js` drives an animated particle layer (`#particles-js`) behind the main content for visual interest.

### Projects Page

The `projects.html` page is the core of this portfolio:

- **Filter Buttons**
  - `All`, `Web Development`, `Machine Learning`, `Creative Coding`, and `Other`.
  - Clicking a filter shows only projects from that category using JavaScript.

- **Project Cards**
  Each project card shows:
  - Project **title** and short **description**.
  - Relevant **technology tags** (e.g., Python, TensorFlow, Flask, Vue.js, scikit‑learn).
  - **Background image** representing the project (via CSS `background-image`).
  - **Links**:
    - GitHub repositories (e.g., the CNN digit recognizer and Career‑Skill Recommender).
    - A demo/notebook link for certain projects (e.g., Colab notebook for the recommender).
    - Placeholder links for live demos or reports where applicable.

Highlighted examples include:

- **Handwritten Digit Recognition with CNN**
  - Trains a CNN on the MNIST dataset to classify digits (0–9).
  - Uses data normalization, dropout regularization, and evaluation metrics such as accuracy and confusion matrix.

- **Career‑Skill Recommender System**
  - Uses TF‑IDF and cosine similarity on skills extracted from job postings.
  - Helps users map their skills to job roles and identify missing skills for target positions.
  - Includes a Colab notebook for interactive experimentation.

- **Smart Recipe Finder**
  - A web app that recommends recipes based on the ingredients a user provides.
  - Backend in Python/Flask; frontend built with HTML, CSS, JS, and Vue.js.

- **Car Price Prediction**
  - Predicts used car prices from features like year, mileage, brand, fuel type, and transmission.
  - Compares multiple regression models (Linear Regression, Random Forest, XGBoost, Ridge Regression).

- **Hydroponic System**
  - Team engineering project designing and building a hydroponic system for indoor plant growth.
  - Focus on teamwork, design, and implementation rather than software.

### Creative Coding Viewer

At the bottom of the projects page, a **Creative Coding Viewer** allows users to load interactive sketches and games hosted on GitHub Pages:

- A dropdown selector lists projects such as:
  - Doge Game
  - Perlin Flow Field
  - Spinning Squares
  - Problem Set Four
  - Ball Game
  - Animated Roller
- When a project is selected:
  - An embedded `<iframe>` previews the project inline.
  - A button provides a direct link to open the project in a new tab.

These projects showcase experimentation with **p5.js**, animations, and interactive graphics.

### Contact and Social Links

- The footer contains icons linking to:
  - **GitHub:** `https://github.com/thomas-sabu-cs`
  - **LinkedIn:** `https://www.linkedin.com/in/thomas-sabu`
- The `contact.html` page (and/or contact section) provides ways to reach me for questions, collaboration, or opportunities.

---

## Acknowledgements

- **Font Awesome** (`all.min.css` and associated `.woff2` fonts) for icons used throughout the site.
- **particles.js** for the animated background effect.
- All stock images and icons used for project visuals and backgrounds.
- Course: **CISC 480 – Senior Capstone**, University of St. Thomas (Fall 2025), as part of the “Writing in the Discipline” and “Signature Work” requirements.
