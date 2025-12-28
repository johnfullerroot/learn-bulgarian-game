# Learn Bulgarian Game

A simple interactive web-based application designed to help beginners learn Bulgarian vocabulary and basic phrases through basic game modes. Built with vanilla JavaScript, HTML, and CSS, this app provides a structured learning experience with progressive lessons and tools for customisation.

## Overview

This project is a self-contained language learning tool focused on Bulgarian, a South Slavic language spoken by over 7 million people. The app loads lessons from JSON files, each containing vocabulary and three types of games: matching words, conversational responses, and fill-in-the-blank exercises. Users progress through lessons automatically upon completion, with visual feedback and a restart option for reinforcement.

Key components include:
- **Core App**: The main interface for playing lessons (via `index.html`).
- **Cheat Sheet**: A printable vocabulary reference covering lessons 1–20 (via `cheat-sheet.html`).
- **Lesson Generator**: A user-friendly tool to create new lesson JSON files (via `lesson-generator.html`).
- **Modular JavaScript**: Separated into modules for game logic, events, progress tracking, and more.
- **Lesson Files**: Stored in the `./lessons/` directory as JSON (e.g., `lesson1.json` to `lesson20.json`).

The app emphasises simplicity, offline usability, and extensibility, making it ideal for self-learners or educators.

## Features

- **Progressive Lessons**: 20 pre-built lessons covering basics like greetings, numbers, colours, family, food, and advanced topics like professions and transportation.
- **Interactive Games**:
  - **Match the Word**: Pair Bulgarian words with their English translations from shuffled columns.
  - **Conversation**: Select correct responses to conversational prompts, with multiple valid options.
  - **Fill in the Blank**: Choose the right word to complete a sentence, with shuffled choices.
- **Auto-Progression**: Automatically advances to the next lesson after completing all games, with a completion message.
- **Feedback System**: Real-time correct/incorrect feedback with styled notifications.
- **Restart Functionality**: Reset the current lesson without losing overall progress.
- **Vocabulary Cheat Sheet**: A styled, printable HTML page summarising all key terms and examples from lessons 1–20.
- **Lesson Generator Tool**: An intuitive interface to create custom lesson JSON files, auto-downloading them for easy addition to the app.
- **Responsive Design**: Ultra-3D styled buttons and elements for an engaging UI.
- **Offline Support**: Runs entirely in the browser once served locally (no internet required after setup).

## Usage

### Getting Started

1. Clone or download the repository:

`git clone https://github.com/johnfullerroot/learn-bulgarian-game.git`

2. Navigate to the project directory:

`cd learn-bulgarian-game`

3. Start a local server (required for local execution because the app uses ES6 modules):
- If you have Node.js installed, the easiest way is:

`npx serve`

(This uses the lightweight `serve` package automatically — no global install needed.)
- Alternatively, if you have Python 3:

`python -m http.server 8000`

4. Open your browser and go to the address shown (usually http://localhost:3000 for `npx serve` or http://localhost:8000 for Python).
The first lesson will load automatically.

### Playing the Game

- Select a game type from the navigation buttons (Match, Conversation, Fill Blank).
- Complete each game to unlock progression.
- Upon finishing all three games in a lesson, the app auto-advances to the next.
- Use the “Restart Lesson” button to replay the current lesson.

### Using the Cheat Sheet

- Open `cheat-sheet.html` in your browser (via the same local server or directly — it has no modules).
- Print it for a handy reference (optimised for print with clean layouts).

### Generating New Lessons

- Open `lesson-generator.html` in your browser.
- Fill in the lesson ID, title, match pairs, conversation prompt/options, and fill-blank details.
- Click “Generate Lesson” to download a JSON file.
- Place the generated file in the `./lessons/` folder (e.g., `lesson21.json`) to make it available in the app.

No installation or dependencies are required—everything runs client-side.

## Why This Is Unique

While many language apps exist for popular languages, this project stands out by:
- **Focusing on Bulgarian**: An underrepresented language in digital learning tools, with authentic vocabulary and phrases tailored for beginners.
- **Customisable and Open-Source**: Includes a built-in lesson generator, allowing users to expand content easily without coding.
- **Simple gamification**: Combines matching, dialogue simulation, and sentence completion in a single lesson flow, promoting retention through repetition and context.
- **Minimalist and Offline-First**: No adverts, accounts, or internet required—perfect for travellers, students, or low-resource environments.
- **Educational Transparency**: Modular code structure makes it easy for developers to modify or learn from, while the cheat sheet provides a comprehensive, printable overview not commonly found in apps.

Contributions are welcome! Feel free to submit pull requests for new lessons, bug fixes, or enhancements. For issues, open a GitHub ticket.

##Demo

Check out the live demo on GitHub Pages:
https://johnfullerroot.github.io/learn-bulgarian-game/

## License

GPL-3.0-only
