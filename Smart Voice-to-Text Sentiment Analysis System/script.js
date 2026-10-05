// Get HTML elements

const startBtn = document.getElementById("startBtn");
const textInput = document.getElementById("textInput");
const analyzeBtn = document.getElementById("analyzeBtn");
const clearBtn = document.getElementById("clearBtn");

const statusText = document.getElementById("status");
const sentimentText = document.getElementById("sentiment");
const scoreText = document.getElementById("score");
const emoji = document.getElementById("emoji");


// Speech Recognition

const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;

let recognition;

if (SpeechRecognition) {

    recognition = new SpeechRecognition();

    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = "en-US";


    // Start microphone

    startBtn.addEventListener("click", function () {

        recognition.start();

        startBtn.classList.add("listening");
        startBtn.innerHTML = "🔴 Listening...";

        statusText.innerHTML =
            "Listening... Please speak now.";

    });


    // Speech result

    recognition.onresult = function (event) {

        const speechText =
            event.results[0][0].transcript;

        textInput.value = speechText;

        statusText.innerHTML =
            "Speech converted successfully.";

    };


    // Speech recognition stopped

    recognition.onend = function () {

        startBtn.classList.remove("listening");

        startBtn.innerHTML =
            "🎤 Start Speaking";

    };


    // Error handling

    recognition.onerror = function () {

        statusText.innerHTML =
            "Unable to access microphone. Please try again.";

        startBtn.classList.remove("listening");

        startBtn.innerHTML =
            "🎤 Start Speaking";

    };

} else {

    statusText.innerHTML =
        "Speech recognition is not supported in this browser.";

}


// Sentiment analysis

analyzeBtn.addEventListener("click", function () {

    const text = textInput.value.toLowerCase().trim();

    if (text === "") {

        alert("Please enter or speak some text first.");

        return;
    }


    // Positive words

    const positiveWords = [
        "good",
        "great",
        "excellent",
        "happy",
        "love",
        "amazing",
        "wonderful",
        "fantastic",
        "best",
        "nice",
        "awesome",
        "success",
        "thank",
        "satisfied",
        "beautiful"
    ];


    // Negative words

    const negativeWords = [
        "bad",
        "poor",
        "sad",
        "hate",
        "terrible",
        "worst",
        "angry",
        "awful",
        "horrible",
        "problem",
        "fail",
        "failure",
        "disappointed",
        "boring",
        "difficult"
    ];


    let positiveScore = 0;
    let negativeScore = 0;


    // Check positive words

    positiveWords.forEach(function (word) {

        if (text.includes(word)) {
            positiveScore++;
        }

    });


    // Check negative words

    negativeWords.forEach(function (word) {

        if (text.includes(word)) {
            negativeScore++;
        }

    });


    // Calculate score

    const finalScore =
        positiveScore - negativeScore;


    // Display result

    if (finalScore > 0) {

        sentimentText.innerHTML = "Positive 😊";
        emoji.innerHTML = "😊";

        scoreText.innerHTML =
            "Sentiment score: +" + finalScore;

    } else if (finalScore < 0) {

        sentimentText.innerHTML = "Negative 😞";
        emoji.innerHTML = "😞";

        scoreText.innerHTML =
            "Sentiment score: " + finalScore;

    } else {

        sentimentText.innerHTML = "Neutral 😐";
        emoji.innerHTML = "😐";

        scoreText.innerHTML =
            "Sentiment score: 0";

    }

});


// Clear button

clearBtn.addEventListener("click", function () {

    textInput.value = "";

    sentimentText.innerHTML =
        "Waiting for analysis";

    scoreText.innerHTML =
        "Sentiment score: 0";

    emoji.innerHTML = "😐";

    statusText.innerHTML =
        "Microphone is ready";

});