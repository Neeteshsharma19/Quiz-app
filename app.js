const quiz = [
  {
    type: "single",
    question: "What is the capital of India?",
    options: ["Mumbai", "New Delhi", "Kolkata", "Bangalore"],
    answer: "New Delhi"
  },
  {
    type: "multi",
    question: "Which of the following are programming languages?",
    options: ["HTML", "Python", "CSS", "Java"],
    answer: ["Python", "Java"]
  },
  {
    type: "fill",
    question: "Fill in the blank: The square root of 81 is ____.",
    answer: "9"
  },
  {
    type: "single",
    question: "What is 12 + 8?",
    options: ["18", "20", "22", "24"],
    answer: "20"
  },
  {
    type: "fill",
    question: "What is the result of 7 x 6?",
    answer: "42"
  }
];

let currentIndex = 0;
let score = 0;
let userName = "";

const startBtn = document.getElementById("start-btn");
const quizSection = document.getElementById("quiz-section");
const resultScreen = document.getElementById("result-screen");
const startScreen = document.getElementById("start-screen");
const container = document.getElementById("question-container");
const nextBtn = document.getElementById("next-btn");
const retryBtn = document.getElementById("retry-btn");
const scoreDiv = document.getElementById("score-container");

startBtn.onclick = () => {
  const nameInput = document.getElementById("username");
  if (!nameInput.value.trim()) {
    alert("Please enter your name!");
    return;
  }
  userName = nameInput.value.trim();
  startScreen.style.display = "none";
  quizSection.style.display = "block";
  currentIndex = 0;
  score = 0;
  renderQuestion();
};

nextBtn.onclick = () => {
  if (checkAnswer()) score++;
  currentIndex++;
  if (currentIndex < quiz.length) {
    renderQuestion();
  } else {
    quizSection.style.display = "none";
    resultScreen.style.display = "block";
    scoreDiv.innerText = `🎉 Well done, ${userName}! You scored ${score} out of ${quiz.length}.`;
  }
};

retryBtn.onclick = () => {
  resultScreen.style.display = "none";
  startScreen.style.display = "block";
  document.getElementById("username").value = "";
};

function renderQuestion() {
  container.innerHTML = "";
  const q = quiz[currentIndex];
  const qEl = document.createElement("div");
  qEl.innerHTML = `<h3>Q${currentIndex + 1}. ${q.question}</h3>`;
  container.appendChild(qEl);

  if (q.type === "single" || q.type === "multi") {
    q.options.forEach(opt => {
      const label = document.createElement("label");
      const input = document.createElement("input");
      input.type = q.type === "single" ? "radio" : "checkbox";
      input.name = "answer";
      input.value = opt;
      label.appendChild(input);
      label.append(` ${opt}`);
      container.appendChild(label);
      container.appendChild(document.createElement("br"));
    });
  } else if (q.type === "fill") {
    const input = document.createElement("input");
    input.type = "text";
    input.id = "fill-answer";
    input.placeholder = "Type your answer...";
    container.appendChild(input);
  }

  nextBtn.textContent = currentIndex === quiz.length - 1 ? "Finish" : "Next";
}

function checkAnswer() {
  const q = quiz[currentIndex];
  if (q.type === "single") {
    const selected = container.querySelector('input[type="radio"]:checked');
    return selected && selected.value === q.answer;
  } else if (q.type === "multi") {
    const selected = Array.from(container.querySelectorAll('input[type="checkbox"]:checked'))
      .map(e => e.value).sort();
    const correct = q.answer.slice().sort();
    return JSON.stringify(selected) === JSON.stringify(correct);
  } else if (q.type === "fill") {
    const userInput = container.querySelector("#fill-answer").value.trim();
    return userInput.toLowerCase() === q.answer.toLowerCase();
  }
  return false;
}
