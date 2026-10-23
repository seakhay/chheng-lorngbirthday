# A Little Magic for You — Birthday Website

A responsive birthday surprise website for your sister, using the photo you provided.

## Features
- Magical night-sky look, stars, gradients, and responsive layout
- Sister's photo in the hero and memories section
- Animated gift box that reveals a birthday note
- Interactive candles and a "Make a wish!" celebration
- Khmer and English birthday wishes
- Play/pause button for an original, synthesized birthday melody (no music file needed)
- Works on phones, tablets, and computers

## Run it in VS Code (beginner-friendly)
1. Download and extract `sister_birthday_website.zip`.
2. Open VS Code.
3. Choose **File → Open Folder...** and select the extracted `sister_birthday_website` folder.
4. In VS Code, open `index.html`.
5. Easiest option: install the **Live Server** extension (by Ritwick Dey), right-click `index.html`, and choose **Open with Live Server**.
6. Your browser will open the website. Click **Play birthday music** to start the melody. Browsers require a click before audio can play.

You can also double-click `index.html` to open it directly, but Live Server is recommended.

## Personalize it
- Replace `assets/sister.jpg` with another photo (keep the same filename).
- Edit the birthday text in `index.html`.
- Change colors in the `:root` section at the top of `style.css`.
- This project does not require npm, Node.js, a database, or an API key.
- Google Fonts load from the internet; if offline, the page uses fallback fonts.

## Folder structure
```
sister_birthday_website/
├── index.html
├── style.css
├── script.js
├── README.md
└── assets/
    └── sister.jpg
```

## Notes
The background melody is generated locally with the browser's Web Audio API. It is an original simple melody, not a recording of a commercial song. Music playback may be unavailable in some older browsers.
