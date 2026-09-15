# AHthree.tech — final static website

This package is designed for GitHub Pages at `https://ahthree.github.io/AbuHani.Tech/`.

## Media
The HTML expects these existing repository files:
- `assets/images/*.webp` (6 service images)
- `assets/videos/*.mp4` (6 service videos)

Do not rename them. The final site uses responsive image framing (`object-fit: cover`) and video `preload="metadata"` with no forced autoplay.

## Publishing
GitHub Pages → Deploy from a branch → `main` → `/ (root)`.

## Performance philosophy
The homepage loads one hero image and lazy-loads service images. Videos are placed on the individual service pages and do not autoplay or preload the full file. CSS animations pause automatically for users who request reduced motion.
