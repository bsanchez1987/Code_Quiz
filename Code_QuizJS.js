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
//create a count function
function count() {
  timeLeft--;
  spanEl.textContent = timeLeft;
  //build additional logic here to handle if time runs out
}

//create the timer function

var timer = setInterval(count, 1000);

//function to put the current question and choices on the page
function showQuestion() {
  quizbodyEl.innerHTML = "";
  var q = quizQuestions[currentQuestionIndex];
  var qTitleEl = document.createElement("h1");
  qTitleEl.textContent = q.question; //q.question
  quizbodyEl.append(qTitleEl);

  //loop through the answers array and put them on the page
  var answers = q.answers;
  for (var i = 0; i < answers.length; i++) {
    var answer = answers[i];
    var button = document.createElement("button");
    button.textContent = answer;
    button.addEventListener("click", function (event) {
      var selectedAnswer = event.target.textContent;
      alert("YOU CLICKED ON  " + selectedAnswer);
      if (selectedAnswer === q.correct)  {
        score++;
        answerDiv.textContent = "Correct! " + quizQuestions[currentQuestionIndex].correct;
    }
       else {
        secondsLeft = secondsLeft - penalty;
            answerDiv.textContent = "Wrong! " + quizQuestions[currentQuestionIndex].answers;
        incorrect();
      }

      //go to next q here
      currentQuestionIndex++;
      showQuestion();
    });
    quizbodyEl.append(button);
    //after a button is created, add a event listener to it to handle clicking
  }
}

function correct() {
  alert("YOU GOT IT!");
}

function incorrect() {
  alert("WRONG!");
}

showQuestion();