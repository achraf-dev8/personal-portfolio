# Asset Optimization Report

Analysis of the current `./src/assets` folder shows several opportunities to reduce project size and improve loading speed.

## 📊 Current Status vs. Recommendations

| Asset Category | Max Display size (CSS) | Current File Size | Recommended Resolution |
| :--- | :--- | :--- | :--- |
| **Profile Picture** | **160px** | 1.8 MB | 400x400px (WebP) |
| **Skill Icons** | **~35px - 78px** | ~350 KB | 128x128px (WebP/SVG) |
| **Screenshots** | **~650px** (Carousel) | ~850 KB | 1280px Width (WebP) |
| **Logo** | **50px** | ~17 KB | 150x150px (WebP/SVG) |

---

## 🛠️ Step-by-Step Optimization Guide

### 1. Profile Picture (`pfp.png`)
*   **Current:** 1,856 KB
*   **Action:** Resize to **400x400px** and convert to **.webp**.
*   **Goal:** ~30 KB (98% reduction).

### 2. Skill Icons (`src/assets/skills/`)
*   **Culprits:** `react.png` (349KB), `html.png` (318KB), `kotlin.png` (199KB).
*   **Action:** Resize all to **128x128px** or **256x256px**. Convert to **.webp** with transparency.
*   **Pro Tip:** Use SVGs for icons where possible; they are usually < 5KB and infinitely scalable.

### 3. Project Screenshots (`src/assets/screenhsots/`)
*   **Culprits:** `answerit` folder (nearly 5MB total).
*   **Max Display Size:** The carousel shows them at **~650px**, but the "Zoom Modal" can show them full-screen.
*   **Action:** 
    *   Resize to **1280px width** (This is a "sweet spot" that looks sharp in the zoom modal but is much smaller than 4K/Full-res PNGs).
    *   Convert to **.webp** (80-85% quality).
*   **Goal:** Each image should be between **50KB and 150KB**.

### 4. Logos (`src/assets/logos/`)
*   **Status:** **PASSED**. These are already very small (4-17 KB). No action needed.

---

## 🚀 How to fix it quickly
You don't need fancy software. You can use:
1.  **[Squoosh.app](https://squoosh.app/)**: (Google's tool) Best for one-by-one optimization with instant preview.
2.  **[BulkResizePhotos](https://bulkresizephotos.com/)**: Great for doing all skill icons or screenshots at once.
3.  **Command Line:** If you have `ffmpeg` or `imagemagick`, you can batch convert entire folders in seconds.

> [!TIP]
> Switching from **PNG to WebP** is the single biggest "win" for folder size. WebP supports transparency just like PNG but is significantly smaller.
