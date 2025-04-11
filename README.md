# Esther's Birthday Celebration

A beautiful birthday countdown and celebration website for Esther.

## Features

- Countdown timer to Esther's birthday
- Theme toggle (light/dark mode)
- Photo carousel
- Birthday wishes section
- Background music player
- Confetti effects

## Setup

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Add a birthday song:
   - Download a royalty-free birthday song (from websites like Pixabay, Free Music Archive, etc.)
   - Save it as `happy-birthday.mp3` in the `public/audio` folder
4. Add birthday photos:
   - Add your birthday photos to the `public/images` folder
   - Name them `birthday-1.jpg`, `birthday-2.jpg`, `birthday-3.jpg`, etc.
5. Run the development server:
   ```
   npm run dev
   ```

## Customization

- Edit the birthday date in `src/components/BirthdayCountdown.vue`
- Change the theme colors in `src/assets/styles/global.css`
- Add more features as needed

## Technologies Used

- Vue.js
- Pinia for state management
- Bootstrap for styling
- Font Awesome for icons
