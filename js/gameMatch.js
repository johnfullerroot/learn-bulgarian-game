// js/gameMatch.js
// Matching game with two columns

import { showFeedback } from "./events.js";

export function renderMatchGame(lesson) {
    const container = document.getElementById("game-container");
    const instructions = document.getElementById("instructions");
    container.innerHTML = "";
    instructions.textContent = "Click a Bulgarian word, then its English match.";

    const pairs = lesson.games.match.pairs;

    // Shuffle both sides independently
    const shuffledBG = [...pairs].sort(() => Math.random() - 0.5);
    const shuffledEN = [...pairs].sort(() => Math.random() - 0.5);

    // Create grid with two columns
    container.innerHTML = `
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; margin-top: 1rem;">
            <div id="bg-column"></div>
            <div id="en-column"></div>
        </div>
    `;

    const bgColumn = document.getElementById("bg-column");
    const enColumn = document.getElementById("en-column");

    let selectedBG = null;
    let matchedCount = 0;

    // Render Bulgarian words
    shuffledBG.forEach(pair => {
        const div = document.createElement("div");
        div.className = "choice";
        div.textContent = pair.bg;
        div.dataset.en = pair.en;  // store correct answer
        div.addEventListener("click", () => {
            // Clear previous selection highlight
            if (selectedBG) selectedBG.classList.remove("selected");
            selectedBG = div;
            div.classList.add("selected");
        });
        bgColumn.appendChild(div);
    });

    // Render English words
    shuffledEN.forEach(pair => {
        const div = document.createElement("div");
        div.className = "choice";
        div.textContent = pair.en;
        div.dataset.en = pair.en;
        div.addEventListener("click", () => {
            if (!selectedBG) {
                showFeedback("First select a Bulgarian word.", false);
                return;
            }

            const correct = selectedBG.dataset.en === pair.en;

            if (correct) {
                showFeedback("Correct!", true);
                // Fade out both
                selectedBG.style.opacity = "0.4";
                div.style.opacity = "0.4";
                selectedBG.style.pointerEvents = "none";
                div.style.pointerEvents = "none";
                selectedBG.classList.remove("selected");
                selectedBG = null;

                matchedCount++;
                    if (matchedCount === pairs.length) {
                        setTimeout(() => {
                            showFeedback("All matched! Great job!", true);
                            import("./progress.js").then(progress => {
                                progress.markGameCompleted("match");
                            });
                        }, 2500);
                }
            } else {
                showFeedback("Try again.", false);
                selectedBG.classList.remove("selected");
                selectedBG = null;
            }
        });
        enColumn.appendChild(div);
    });
}
