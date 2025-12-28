// js/progress.js

import { state } from "./init.js";
import { updateNavCompletionHighlights } from "./events.js";

let onAllGamesCompleted = null;

export function setCompletionCallback(callback) {
    onAllGamesCompleted = callback;
}

export function markGameCompleted(gameType) {
    if (state.completedGames.has(gameType)) return;

    state.completedGames.add(gameType);

    // Update visuals immediately
    updateNavCompletionHighlights();

    if (state.completedGames.size === 3) {
        if (onAllGamesCompleted) {
            onAllGamesCompleted();
        }
    }
}

// Called on lesson load/restart to reset visuals
export function resetNavCompletionStates(currentGameType) {
    updateNavCompletionHighlights();
}
