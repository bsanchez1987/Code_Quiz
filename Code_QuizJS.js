var titleEl = document.createElement("h1");
var spanEl = document.querySelector(".timeLeft");
var timer = document.querySelector("#startTimer");
var quizbodyEl = document.querySelector(".quizbody");
var timeLeft = 60;
var holdInterval = 0;
var penalty = 10;
var currentQuestionIndex = 0;
var quizQuestions = [
  {
    question: "Who is Bruce Wayne?",
    answers: [
      "Batman",
      "Superman",
      "Flash",
      "Green Lantern",
    ],
    correct: "Batman",
  },
  {
    question: "Who is Hal Jordan?",
    answers: ["Batman", "Green Lantern", "Flash", "Aquaman"],
    correct: "Green Lantern",
  },
  {
    question: "Who is Barry Batson?",
    answers: ["Sinestro", "Flash", "Shazam", "Nightwing"],
    correct: "Shazam",
  },
  {
    question: "Who is Oliver Queen?",
    answers: ["Nightwing", "Green Lantern", "Flash", "Green Arrow"],
    correct: "Green Arrow",
  },

  {
    question: "Who is John Jones?",
    answers: ["Nightwing", "Green Lantern", "Martian Manhunter", "Green Arrow"],
    correct: "Martian Manhunter",
  },
];

console.log(quizQuestions);

var ulEl = document.createElement("ul");
console.log(ulEl);
console.log(timer);
if (timer !== null) {
    timer.addEventListener("click", function () {
        if (holdInterval === 0) {
            holdInterval = setInterval(function () {
                secondsLeft--;
                spanEl.textContent = secondsLeft + " seconds";

                if (secondsLeft <= 0) {
                    clearInterval(holdInterval);
                    quizComplete();
                    spanEl.textContent = "OOOPS! OUT OF TIME!";
                }
            }, 1000);
        }
        render(currentQuestionIndex);
    });
}
console.log(currentQuestionIndex);

function render(currentquestionIndex) {
  questionsSection.innerHTML = "";
  ulEl.innerHTML = "";

  for (var i = 0; i < questions.length; i++) {
    // Appends question title only
    var userQuestion = quizQuestions[currentquestionIndex].question;
    var userChoices = quizQuestions[currentquestionIndex].answers;
    quizQuestionsSection.textContent = userQuestion;
}



function correct() {
  alert("YOU GOT IT!");
}

function incorrect() {
  alert("WRONG!");
}

showQuestion();