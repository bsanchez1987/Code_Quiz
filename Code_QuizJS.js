var score = 0;
var currentQuestionIndex = 0;
var spanEl = document.querySelector(".timeLeft");
var timer = document.querySelector("#startTimer");
var quizbodyEl = document.querySelector(".quizbody");
var quizContainer = document.querySelector("#quizContainer");
var allScores = JSON.parse(localStorage.getItem("allScores")) || [];
var titleEl = document.createElement("h1");
var timeLeft = 60;
var holdInterval = 0;
var penalty = 10;

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

function render(currentQuestionIndex) {
  questionsSection.innerHTML = "";
  ulEl.innerHTML = "";

  for (var i = 0; i < questions.length; i++) {
    // Appends question title only
    var userQuestion = quizQuestions[currentQuestionIndex].question;
    var userChoices = quizQuestions[currentQuestionIndex].answers;
    quizQuestionsSection.textContent = userQuestion;
}

  userChoices.forEach(function (newItem) {
        var listItem = document.createElement("li");
        listItem.textContent = newItem;
        quizQuestionsSection.appendChild(ulEl);
        ulEl.appendChild(listItem);
        listItem.addEventListener("click", (compare));
    })
}

function compare(event) {
  var element = event.target;

  if (element.matches("li")) {

      var answerDiv = document.createElement("div");
      answerDiv.setAttribute("id", "answerDiv");
