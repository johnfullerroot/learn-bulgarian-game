// script.js
// This file ONLY coordinates modules. No game logic here.

import { initApp, state } from "./js/init.js";
import { setupEventListeners, setActiveGameButton } from "./js/events.js";
import { loadLesson } from "./js/lessonLoader.js";

import { renderMatchGame } from "./js/gameMatch.js";
import { renderConversationGame } from "./js/gameConversation.js";
import { renderFillBlankGame } from "./js/gameFillBlank.js";
import { setCompletionCallback, resetNavCompletionStates } from "./js/progress.js";

const gameRenderers = {
    match: renderMatchGame,
    conversation: renderConversationGame,
    fillBlank: renderFillBlankGame
};

async function start() {
    initApp();
    setupEventListeners(onGameSelected);

    document.getElementById("restart-lesson-btn").addEventListener("click", () => {
        restartCurrentLesson();
    });

    // Set up auto-advance when all games completed
    setCompletionCallback(async () => {

    // Show a lesson-complete message
    const feedback = document.getElementById("feedback");
    feedback.textContent = "Lesson complete! Amazing work!";
    feedback.className = "correct";

    // Disable navigation buttons to prevent clicking during transition
    document.querySelectorAll("#game-nav button").forEach(btn => btn.disabled = true);

    // Wait before advancing (gives user time to read)
    await new Promise(resolve => setTimeout(resolve, 4000));

    const nextLessonId = getNextLessonId(state.currentLesson.lessonId);
    if (nextLessonId) {
        try {
            // Attempt to load the next lesson
            const response = await fetch(`./lessons/${nextLessonId}.json`);
            if (!response.ok) {
                throw new Error(`Failed to load ${nextLessonId}.json: ${response.status}`);
            }
            const nextLesson = await response.json();
            await loadNewLesson(nextLesson);
        } catch (error) {
            // If fetch fails (e.g., 404 for non-existent file), treat as end of lessons
            console.warn(`No more lessons available: ${error.message}`);
            feedback.textContent = "You've completed all lessons! Congratulations!";
            feedback.className = "correct";
        }
    } else {
        // Fallback if ID parsing fails
        feedback.textContent = "You've completed all lessons! Congratulations!";
        feedback.className = "correct";
    }
});

    const lesson = await loadLesson("./lessons/lesson1.json");
    await loadNewLesson(lesson);
}

async function loadNewLesson(lesson) {
    state.currentLesson = lesson;
    state.completedGames.clear();  // Reset progress for new lesson

    // Clear ALL UI elements for a fresh start
    document.getElementById("lesson-title").textContent = lesson.title;
    document.getElementById("instructions").textContent = "";
    document.getElementById("game-container").innerHTML = "";
    document.getElementById("feedback").textContent = "";
    document.getElementById("feedback").className = "";

    // Re-enable navigation
    document.querySelectorAll("#game-nav button")
        .forEach(btn => btn.disabled = false);
    setActiveGameButton("match");
    renderGame("match");  // Start with match game
    resetNavCompletionStates("match");
}

async function restartCurrentLesson() {
    if (!state.currentLesson) return;

    // Clear progress
    state.completedGames.clear();

    // Re-enable nav buttons
    document.querySelectorAll("#game-nav button")
        .forEach(btn => btn.disabled = false);

    // Clear UI
    document.getElementById("instructions").textContent = "";
    document.getElementById("game-container").innerHTML = "";
    document.getElementById("feedback").textContent = "";
    document.getElementById("feedback").className = "";

    setActiveGameButton("match");
    // Reload the current lesson (fresh start)
    renderGame("match");
    resetNavCompletionStates("match");
}

function getNextLessonId(currentId) {
    const match = currentId.match(/lesson(\d+)/);
    if (!match) return null;
    const num = parseInt(match[1]);
    const nextNum = num + 1;
    return `lesson${nextNum}`;  // No limit—always return next ID
}

function renderGame(gameType) {
    if (!state.currentLesson) {
        console.warn("Lesson not loaded yet");
        return;
    }

    const renderer = gameRenderers[gameType];
    if (!renderer) return;

    renderer(state.currentLesson);
    setActiveGameButton(gameType);
}

function onGameSelected(gameType) {
    renderGame(gameType);
}

export { renderGame, loadNewLesson };

start();
