const questions = [
  {
    question: "What does HTML stand for?",
    options: ["Hyper Text Markup Language", "High Text Machine Language", "Hyperlinks Text Mark Language", "None"],
    answer: 0
  },
  {
    question: "Which language is used for styling?",
    options: ["HTML", "Python", "CSS", "Java"],
    answer: 2
  },
  {
    question: "JavaScript is used for?",
    options: ["Styling", "Logic", "Database", "None"],
    answer: 1
  }
];

let currentQuestion = 0;
let score = 0;
let time = 15;
let timer;

const questionEl = document.getElementById("question");
const optionsEl = document.querySelectorAll(".option");
const scoreEl = document.getElementById("score");
const timeEl = document.getElementById("time");
const nextBtn = document.getElementById("nextBtn");

function loadQuestion() {
  clearInterval(timer);
  time = 15;
  timeEl.textContent = time;
  startTimer();

  const q = questions[currentQuestion];
  questionEl.textContent = q.question;

  optionsEl.forEach((btn, index) => {
    btn.textContent = q.options[index];
    btn.className = "option";
    btn.disabled = false;
  });

  nextBtn.style.display = "none";
}

function startTimer() {
  timer = setInterval(() => {
    time--;
    timeEl.textContent = time;
    if (time === 0) {
      nextQuestion();
    }
  }, 1000);
}

function selectAnswer(btn) {
  const correctIndex = questions[currentQuestion].answer;
  optionsEl.forEach(b => b.disabled = true);

  if (btn.textContent === questions[currentQuestion].options[correctIndex]) {
    btn.classList.add("correct");
    score++;
    scoreEl.textContent = score;
  } else {
    btn.classList.add("wrong");
    optionsEl[correctIndex].classList.add("correct");
  }

  clearInterval(timer);
  nextBtn.style.display = "block";
}

function nextQuestion() {
  currentQuestion++;
  if (currentQuestion < questions.length) {
    loadQuestion();
  } else {
    showResult();
  }
}

function showResult() {
  document.querySelector(".quiz-container").innerHTML = `
    <h2>Quiz Finished</h2>
    <p>Your Score: ${score}/${questions.length}</p>
    <button onclick="location.reload()">Restart</button>
  `;
}

loadQuestion();
