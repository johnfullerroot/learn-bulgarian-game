// js/gameFillBlank.js
// Fill in the missing Bulgarian word

import { showFeedback } from "./events.js";

export function renderFillBlankGame(lesson) {
    const container = document.getElementById("game-container");
    const instructions = document.getElementById("instructions");

    container.innerHTML = "";
    instructions.textContent = "Choose the correct word to complete the sentence.";

    const game = lesson.games.fillBlank;

    const sentence = document.createElement("p");
    sentence.textContent = game.sentence;
    container.appendChild(sentence);

    let hasAnsweredCorrectly = false;

    // Shuffle the choices
    const shuffledChoices = [...game.choices].sort(() => Math.random() - 0.5);

    shuffledChoices.forEach(choice => {
        const div = document.createElement("div");
        div.className = "choice";
        div.textContent = choice;

        div.addEventListener("click", () => {
            // Prevent multiple attempts after correct answer
            if (hasAnsweredCorrectly) return;

            const correct = choice === game.answer;

            if (correct) {
                hasAnsweredCorrectly = true;

                // Disable all choices
                container.querySelectorAll(".choice").forEach(c => {
                    c.style.pointerEvents = "none";
                    if (c !== div) {
                        c.style.opacity = "0.4";
                    }
                });

                showFeedback("Correct!", true);

                // After delay, show congratulations and mark completed
                setTimeout(() => {
                    showFeedback("All done! Great job!", true);
                    import("./progress.js").then(progress => {
                        progress.markGameCompleted("fillBlank");
                    });
                }, 2500);
            } else {
                showFeedback("Incorrect.", false);
                div.style.opacity = "0.6";
            }
        });

        container.appendChild(div);
    });
}
