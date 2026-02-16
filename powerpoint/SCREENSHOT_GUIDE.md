# Screenshot & Mockup Capture Guide

This guide explains how to capture high-quality screenshots from your running application and UI mockups to enhance the PowerPoint presentation.

## Directory Structure

```
powerpoint/assets/
├── screenshots/
│   ├── dashboard.png          # Student org dashboard (VL-006)
│   └── architecture.png       # Tech stack diagram (optional)
├── mockups/
│   ├── venue-browse.png       # Venue discovery page
│   ├── venue-detail.png       # Venue detail view
│   ├── booking-form.png       # Booking request form
│   └── venue-admin.png        # Venue admin dashboard
└── branding/
    └── venuelink-logo.png     # Logo (if created)
```

## 1. Capture UI Mockups from HTML

The UI mockups are already designed in `docs/ui-mockup.html`. Here's how to capture them:

### Step-by-Step:

1. **Open the mockup file:**
   ```bash
   open docs/ui-mockup.html
   ```
   Or navigate to it in your browser: `file:///path/to/rental-startup/docs/ui-mockup.html`

2. **Take screenshots of each mockup:**

   The HTML file contains 4 mockup screens in a grid. You'll need to screenshot each one individually.

   **On macOS:**
   - Press `Cmd + Shift + 4` for selection tool
   - Click and drag around each mockup screen
   - Screenshots will save to Desktop

   **Mockups to capture:**
   - Login/Signup screen (optional - not needed for pitch)
   - Student Org Dashboard
   - Venue Browse page
   - Venue Admin Dashboard

3. **Crop and save:**
   ```bash
   # Move screenshots to assets folder
   mv ~/Desktop/Screenshot*.png powerpoint/assets/mockups/

   # Rename appropriately
   cd powerpoint/assets/mockups
   mv Screenshot-1.png student-dashboard.png
   mv Screenshot-2.png venue-browse.png
   mv Screenshot-3.png venue-admin.png
   ```

### Alternative: Browser DevTools Method

For cleaner screenshots without browser chrome:

1. Open `docs/ui-mockup.html` in Chrome/Firefox
2. Right-click on a mockup screen → Inspect
3. In DevTools, find the `.screen` element
4. Right-click on the element in the inspector
5. Select "Capture node screenshot"
6. Screenshot will download automatically

## 2. Capture Built Dashboard (Optional)

If you want to show the **actual built dashboard** instead of just mockups:

### Prerequisites:
- Frontend development server running
- Backend API running (for live data)
- Authenticated test account

### Step-by-Step:

1. **Start the development servers:**
   ```bash
   # Terminal 1: Start backend
   cd backend
   source venv/bin/activate
   uvicorn app.main:app --reload

   # Terminal 2: Start frontend
   cd frontend
   npm run dev
   ```

2. **Navigate to the dashboard:**
   - Open http://localhost:5173 in browser
   - Log in with test account
   - Navigate to student org dashboard (VL-006)

3. **Prepare the view:**
   - Make sure dashboard is fully loaded
   - Zoom to 100% (Cmd+0)
   - Hide browser chrome if possible (F11 for fullscreen)

4. **Take screenshot:**
   - **macOS**: Cmd + Shift + 4, select the dashboard area
   - **Windows**: Win + Shift + S, select the dashboard area
   - Or use browser extension like "Full Page Screen Capture"

5. **Save and optimize:**
   ```bash
   # Move to screenshots folder
   mv ~/Desktop/Screenshot*.png powerpoint/assets/screenshots/dashboard.png

   # Optional: Optimize file size
   # Install ImageMagick: brew install imagemagick
   convert dashboard.png -resize 1920x1080 -quality 85 dashboard_optimized.png
   ```

## 3. Create Architecture Diagram (Optional)

For Slide 5, you can create a simple tech stack diagram.

### Option A: Use Draw.io or Excalidraw

1. Go to https://excalidraw.com or https://app.diagrams.net
2. Create a simple flow diagram:
   ```
   [Frontend]          [Backend]         [Database]
   React             FastAPI           PostgreSQL
   TypeScript        SQLAlchemy
   Mantine UI
   Vite

        ↓                 ↓                 ↓
      HTTP            REST API         SQL Queries
   ```
3. Export as PNG (1920x1080 recommended)
4. Save to `powerpoint/assets/screenshots/architecture.png`

### Option B: Simple Text Diagram

Just use text in PowerPoint with arrows:
- Frontend → Backend → Database
- Add icons or emojis for visual appeal

## 4. Insert Images into PowerPoint

Once you have the screenshots:

1. **Open VenueLink_Pitch.pptx**

2. **Slide 5 (Current Progress):**
   - Delete or overlay the placeholder text on right side
   - Insert → Pictures → `assets/screenshots/dashboard.png`
   - Resize to fit nicely alongside the completed/next-up lists
   - Optional: Add border or drop shadow

3. **Slide 6 (Product Vision):**
   - You'll see 3 placeholder boxes with text like "[Venue Browse Page]"
   - Right-click each box → Format Shape → Fill → Picture
   - Select corresponding mockup image
   - Or: Delete boxes and insert images directly

4. **Resize and position:**
   - Make sure images are legible
   - Keep consistent sizing
   - Align properly

## 5. Screenshot Quality Tips

### Resolution
- **Minimum:** 1920x1080 (Full HD)
- **Recommended:** 2560x1440 or higher (then scale down)
- **Format:** PNG for UI screenshots (better quality)

### Browser Setup
- Use Chrome or Firefox (better rendering)
- Zoom level: 100% (Cmd/Ctrl + 0)
- Hide bookmarks bar
- Use Incognito/Private mode (clean, no extensions)

### Lighting & Contrast
- The mockups already have dark theme
- Ensure screenshots are sharp, not blurry
- Check that text is readable when scaled down

### Editing
After capturing, you may want to:
- Crop unnecessary whitespace
- Add subtle drop shadow for depth
- Adjust brightness/contrast if needed
- Compress file size (keep under 500KB each)

### Tools
- **macOS**: Preview (built-in) or Photoshop
- **Windows**: Paint.NET or GIMP
- **Cross-platform**: GIMP, Photoshop, Figma

## 6. Quick Capture Script

Save this as `capture_mockups.sh` in the powerpoint directory:

```bash
#!/bin/bash

echo "Opening UI mockup file..."
open ../docs/ui-mockup.html

echo ""
echo "Instructions:"
echo "1. Wait for the browser to open"
echo "2. Press Cmd+Shift+4 to start screenshot tool"
echo "3. Click and drag around each mockup screen"
echo "4. Screenshots will save to Desktop"
echo ""
echo "Mockups to capture:"
echo "  - Student Org Dashboard (2nd screen)"
echo "  - Venue Browse (3rd screen)"
echo "  - Venue Admin Dashboard (4th screen)"
echo ""
echo "After capturing, run: ./organize_screenshots.sh"
```

## 7. File Naming Convention

Use descriptive, consistent names:

```
✅ Good:
- student-org-dashboard.png
- venue-browse-page.png
- booking-request-form.png
- venue-admin-dashboard.png

❌ Bad:
- Screenshot 2024-02-15 at 3.45.12 PM.png
- IMG_0001.png
- mockup1.png
```

## 8. Verification Checklist

Before finalizing:

- [ ] All screenshots are high resolution (1920x1080+)
- [ ] Images are properly cropped (no unnecessary whitespace)
- [ ] Text in screenshots is readable
- [ ] File sizes are reasonable (< 1MB each)
- [ ] Images are saved in correct folders
- [ ] Naming convention followed
- [ ] Images inserted into PowerPoint
- [ ] Images properly sized and aligned in slides
- [ ] No pixelation when viewed in presentation mode

## Need Help?

If you encounter issues:
1. Check file paths are correct
2. Ensure images are PNG format
3. Try opening PowerPoint in "Slide Master" view for easier editing
4. Use PowerPoint's alignment guides (View → Guides)
