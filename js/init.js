// js/init.js

export const state = {
    currentLesson: null,
    completedGames: new Set()  // Will store: "match", "conversation", "fillBlank"
};

export function initApp() {
    document.getElementById("instructions").textContent = "";
    document.getElementById("game-container").innerHTML = "";
    document.getElementById("feedback").textContent = "";
    state.completedGames.clear();  // Reset when app starts or lesson changes
}

