// js/lessonLoader.js
// Responsible ONLY for loading and validating lesson JSON

/*
LESSON JSON SCHEMA (ALL LESSONS MUST FOLLOW THIS EXACT STRUCTURE)

{
  "lessonId": "string",
  "title": "string",
  "vocabulary": [
    { "bg": "string", "en": "string" }
  ],
  "games": {
    "match": {
      "pairs": [
        { "bg": "string", "en": "string" }
      ]
    },
    "conversation": {
      "prompt": "Bulgarian string",
      "options": [
        { "text": "Bulgarian string", "correct": boolean }
      ]
    },
    "fillBlank": {
      "sentence": "Bulgarian sentence with ____",
      "choices": ["string"],
      "answer": "string"
    }
  }
}
*/

export async function loadLesson(path) {
    const response = await fetch(path);
    const lesson = await response.json();
    return lesson;
}

