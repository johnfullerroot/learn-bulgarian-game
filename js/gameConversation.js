// js/gameConversation.js
// Choose the correct conversational response

import { showFeedback } from "./events.js";

export function renderConversationGame(lesson) {
    const container = document.getElementById("game-container");
    const instructions = document.getElementById("instructions");

    container.innerHTML = "";
    instructions.textContent = "Choose the correct response.";

    const convo = lesson.games.conversation;

    const prompt = document.createElement("p");
    prompt.textContent = convo.prompt;
    container.appendChild(prompt);

    let hasAnsweredCorrectly = false;

    // Shuffle the options
    const shuffledOptions = [...convo.options].sort(() => Math.random() - 0.5);

    shuffledOptions.forEach(option => {
        const div = document.createElement("div");
        div.className = "choice";
        div.textContent = option.text;

        div.addEventListener("click", () => {
            // Prevent multiple submissions
            if (hasAnsweredCorrectly) return;

            const correct = option.correct;

            if (correct) {
                hasAnsweredCorrectly = true;

                // Disable all choices
                container.querySelectorAll(".choice").forEach(choice => {
                    choice.style.pointerEvents = "none";
                    if (choice !== div) {
                        choice.style.opacity = "0.4";
                    }
                });

                showFeedback("Correct!", true);

                // After delay, show congratulations and mark completed
                setTimeout(() => {
                    showFeedback("All done! Great job!", true);
                    import("./progress.js").then(progress => {
                        progress.markGameCompleted("conversation");
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
