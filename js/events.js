// js/events.js
// Centralized event handling

let currentGameType = null;

export function setupEventListeners(onGameSelected) {
    const nav = document.getElementById("game-nav");

    nav.addEventListener("click", (event) => {
        const button = event.target.closest("button");
        if (!button) return;
        if (button.disabled) return; // Ignore clicks on disabled buttons

        const gameType = button.dataset.game;
        if (gameType) {
            // Update active button
            nav.querySelectorAll("button").forEach(btn => {
                btn.classList.remove("active");
            });
            button.classList.add("active");

            currentGameType = gameType;

            clearFeedback();
            onGameSelected(gameType);

            updateNavCompletionHighlights();
        }
    });
}

export function showFeedback(message, isCorrect) {
    const feedback = document.getElementById("feedback");
    feedback.textContent = message;
    feedback.className = isCorrect ? "correct" : "incorrect";
}

function clearFeedback() {
    const feedback = document.getElementById("feedback");
    feedback.textContent = "";
    feedback.className = "";
}

export function setActiveGameButton(gameType) {
    const nav = document.getElementById("game-nav");
    nav.querySelectorAll("button").forEach(btn => {
        btn.classList.toggle("active", btn.dataset.game === gameType);
    });
    currentGameType = gameType;

    updateNavCompletionHighlights();
}

// Disable completed games and add visual completed state
export function updateNavCompletionHighlights() {
    const nav = document.getElementById("game-nav");
    if (!nav) return;

    import("./init.js").then(({ state }) => {
        nav.querySelectorAll("button").forEach(btn => {
            const gameType = btn.dataset.game;
            const isCompleted = state.completedGames.has(gameType);
            const isActive = btn.classList.contains("active");

            // Disable button if completed
            btn.disabled = isCompleted;

            // Add .completed class for green styling (even if active)
            btn.classList.toggle("completed", isCompleted);

            if (isCompleted) {
                btn.style.cursor = "default";
            }
        });
    });
}
