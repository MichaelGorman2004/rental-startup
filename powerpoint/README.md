# VenueLink Pitch Deck

This directory contains the PowerPoint presentation for VenueLink's 2-minute video pitch.

## Files

- **VenueLink_Pitch.pptx** - Main PowerPoint presentation (8 slides)
- **create_pitch_deck.py** - Python script used to generate the presentation
- **SCRIPT.md** - Full speaking script with timing guidelines
- **assets/** - Directory for screenshots and mockup images

## Presentation Overview

**Total Slides:** 6 (Intro + 4 content slides + Conclusion)
**Target Duration:** 2 minutes (~20 seconds per slide)
**Format:** 16:9 widescreen
**Design:** Dark theme matching VenueLink brand aesthetic

### Slide Breakdown

1. **Title/Intro** - VenueLink introduction and team
2. **The Problem** - What problem you're solving and for whom (two-sided market)
3. **The Solution** - Your solution (the product/service) with screenshots
4. **Current Progress** - What you've built, validation plan
5. **Why We're Building This** - Personal connection and market insight
6. **Conclusion** - Next steps and call to action

**Aligns perfectly with assignment requirements:**
✅ Problem + for whom (Slide 2)
✅ Solution (Slide 3)
✅ Current progress (Slide 4)
✅ Why building this (Slide 5)

## Recording Instructions

### Setup

1. Open `VenueLink_Pitch.pptx` in PowerPoint
2. Review the speaker notes for each slide (View → Notes)
3. Practice the script (see `SCRIPT.md`) to ensure ~2 minute timing
4. Set up recording environment:
   - Good lighting
   - Clean background
   - Quality microphone
   - Screen recording software

### Recording Tips

- **Timing**: Aim for 18-22 seconds per slide (total ~2 minutes)
- **Pace**: Speak clearly and confidently, but naturally
- **Energy**: Start strong, maintain enthusiasm throughout
- **Transitions**: Keep transitions smooth between slides
- **Eye Contact**: Look at camera, not at slides (if doing talking head)
- **Screenshots**: Make sure to reference the built features shown in Slide 3

### Delivery Style

- **Confident but conversational** - You're explaining to peers, not giving a formal presentation
- **Show passion** - This is a problem you've personally experienced
- **Be concise** - Every word counts in 2 minutes
- **End strong** - Clear call to action

## Regenerating the PowerPoint

If you need to make changes:

1. Edit `create_pitch_deck.py`
2. Run: `python3 create_pitch_deck.py`
3. The file will be overwritten with your changes

### Customization Options

You can modify:
- **Colors**: Edit RGB values in the script (e.g., `DARK_BG`, `WHITE_TEXT`)
- **Fonts**: Adjust `Pt()` values for font sizes
- **Content**: Edit text in each slide creation function
- **Layout**: Modify `Inches()` values for positioning

## Adding Screenshots

To enhance the presentation with actual screenshots:

1. **Student Org Dashboard** (Slide 5):
   - Run the frontend: `cd ../frontend && npm run dev`
   - Navigate to dashboard
   - Take fullscreen screenshot
   - Save to `assets/screenshots/dashboard.png`

2. **UI Mockups** (Slide 6):
   - Open `docs/ui-mockup.html` in browser
   - Take screenshots of each mockup screen
   - Save to `assets/mockups/`

3. **Insert into PowerPoint**:
   - Open `VenueLink_Pitch.pptx`
   - Insert → Pictures
   - Replace placeholder boxes on slides 5-6

## Tech Stack (For Reference)

**Frontend:**
- React + TypeScript + Vite
- Mantine UI component library
- Clerk authentication

**Backend:**
- FastAPI (Python)
- PostgreSQL database
- SQLAlchemy ORM

**Infrastructure:**
- Railway (deployment)
- GitHub Actions (CI/CD)

## Next Steps After Recording

1. **Review & Edit**: Watch the recording, make cuts/edits as needed
2. **Add Captions**: Consider adding subtitles for accessibility
3. **Export**: Export as MP4 (1080p recommended)
4. **Upload**: Upload to required platform
5. **Share**: Send link to instructors/judges

## Questions?

Contact:
- Michael Gorman (gorman.270@osu.edu)
- Larry Stelzer (stelzer.69@osu.edu)
