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

      if (element.textContent == quizQuestions[currentQuestionIndex].answers) {
        score++;
        answerDiv.textContent = "Correct! The answer is:  " + quizQuestions[currentQuestionIndex].correct;
    }
    else {

        // Will deduct 10 seconds off secondsLeft for wrong answers

        timeLeft = timeLeft - penalty;
        answerDiv.textContent = "Wrong! The correct answer is:  " + quizQuestions[currentQuestionIndex].answers;
    }

    questionIndex++;

    if (currentQuestionIndex >= quizQuestions.length) {
        quizComplete();
        answerDiv.textContent = "Finished!" + " " + "You got  " + score + "/" + questions.length + " Correct!";
    }
    else {
        render(questionIndex);
    }
    questionsSection.appendChild(answerDiv);

}

questionIndex++;

if (currentQuestionIndex >= questions.length) {
    quizComplete();
    answerDiv.textContent = "Finished!" + " " + "You got  " + score + "/" + questions.length + " Correct!";
}
else {
    render(currentQuestionIndex);
}
questionsSection.appendChild(answerDiv);

}
// Quiz complete clear questionsSection

function quizComplete() {
questionsSection.innerHTML = "";
currentTime.innerHTML = "";

// Create h1, p elements

var h1El = document.createElement("h1");
h1El.setAttribute("id", "h1El");
h1El.textContent = "Quiz Complete!"

questionsSection.appendChild(h1El);

var pEl = document.createElement("p");
pEl.setAttribute("id", "pEl");

questionsSection.appendChild(pEl);

// Calculates time remaining and creates score

if (timeLeft >= 0) {
    var timeRemaining = timeLeft;
    var pEl2 = document.createElement("p");
    clearInterval(holdInterval);
    pEl.textContent = "Your final score is: " + timeRemaining;

    questionsSection.appendChild(pEl2);
}

// User prompted to enter intials

var enterInitials = document.createElement("initials");
enterInitials.setAttribute("id", "enterInitials");
enterInitials.textContent = "Enter your initials: ";

questionsSection.appendChild(enterInitials);

// Enter initials

var userInput = document.createElement("input");
userInput.setAttribute("type", "text");
userInput.setAttribute("id", "initials");
userInput.textContent = "";

questionsSection.appendChild(userInput);

// Submit user information

var initialsSubmit = document.createElement("button");
initialsSubmit.setAttribute("class", "btn btn-light");
initialsSubmit.setAttribute("type", "submit");
initialsSubmit.setAttribute("id", "submit");
initialsSubmit.textContent = "Submit";

questionsSection.appendChild(initialsSubmit);

// Event listener to capture initials and score in local storage 

initialsSubmit.addEventListener("click", function (event) {
    event.preventDefault();
    var initials = userInput.value;
    console.log(initials);
    if (!initials) {
        document.querySelector("#submit").textContent = "Enter a valid value!";
        console.log(initialsSubmit);
    }
    else {
        var finalScore = {
            initials: initials,
            score: timeRemaining
        }

        // Clearing HTML at #questionSection 

        document.querySelector("#questionsSection").innerHTML = "";

        // Create High Scores page heading

        var h2El = document.createElement("h2");
        h2El.setAttribute("id", "h2El");
        h2El.textContent = "High Scores!"

        // Append element to page

        questionsSection.appendChild(h2El);

        allScores.push(finalScore);
        var newScore = JSON.stringify(allScores);
        localStorage.setItem("allScores", newScore);

        // Adds score to final page

        for (let i = 0; i < allScores.length; i++) {
            const el = allScores[i].initials + " " + allScores[i].score;
            var li2 = document.createElement("li");
            li2.textContent = el;
            var ul = document.querySelector("#highScoresUl");
            ul.appendChild(li2);

        }

    }

});
}
