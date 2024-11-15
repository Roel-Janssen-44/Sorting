import { bubbleSortStep } from "./algoritms/bubbleSort.js";

const title = document.getElementById("title");
const knop1 = document.getElementById("knop1");
const knop2 = document.getElementById("knop2");
const knop3 = document.getElementById("knop3");
const knop4 = document.getElementById("knop4");
const stepButton = document.getElementById("sortstep");
const stepCounter = document.getElementById("step");
let codeContainer = document.getElementById("code");
const autoStepButton = document.querySelector("#autostep");

knop1.addEventListener("click", function () {
  title.innerHTML = "Bubble sort";
  const codeArray = [
    "",
    "1    function bubbleSort(inputArr) => {",
    "2      let len = inputArr.length;",
    "3      for (let i = 0; i < len; i++) {",
    "4          for (let j = 0; j < len; j++) {",
    "5              if (inputArr[j] > inputArr[j + 1]) {",
    "6                  let tmp = inputArr[j];",
    "7                  inputArr[j] = inputArr[j + 1];",
    "8                  inputArr[j + 1] = tmp;",
    "9              }",
    "10         }",
    "11     }",
    "12     return inputArr;",
    "13   };",
    "",
  ];

  title.innerHTML = "Bubble sort";
  let codeHTML = "";
  codeArray.forEach((line, index) => {
    codeHTML += `<span id="line${index}" ${
      index == 2 ? 'class="active"' : ""
    }>${line}</span>`;
  });
  codeContainer.innerHTML = codeHTML;
});

knop2.addEventListener("click", function () {
  title.innerHTML = "Nummer 2";
});
knop3.addEventListener("click", function () {
  title.innerHTML = "Nummer 3";
});
knop4.addEventListener("click", function () {
  title.innerHTML = "Nummer 4";
});

const canvasHeight = 400;
const canvasWidth = 400;

const c = document.getElementById("canvas");
c.width = canvasWidth;
c.height = canvasHeight;
const ctx = c.getContext("2d");

const listLength = 15;
const pillarWidth = canvasWidth / listLength;
const generatedList = generateList();
draw(generatedList);

let currentList = generatedList;
let step = 0;

export function clearCanvas() {
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);
}

export function draw(list) {
  ctx.beginPath();
  list.forEach((item, index) => {
    if (item.state === "selected") {
      ctx.fillStyle = "blue";
    } else if (item.state === "correct") {
      ctx.fillStyle = "green";
    } else {
      ctx.fillStyle = "red";
    }
    ctx.fillRect(
      index * pillarWidth,
      canvasHeight - item.height,
      pillarWidth,
      item.height
    );
  });
  ctx.stroke();
}

export function setActiveLines(lines) {
  codeContainer.querySelectorAll("span").forEach((line) => {
    line.classList.remove("active");
  });
  lines.forEach((line) => {
    const currentLine = codeContainer.querySelector(`#line${line}`);
    currentLine.classList.add("active");
  });
}

export function generateList() {
  let list = [];
  const heightAvailable = canvasHeight - 100;
  const pillarHeightDifference = heightAvailable / listLength;
  for (let i = 0; i < listLength; i++) {
    const height = i * pillarHeightDifference + 50;
    list.push({
      height: height,
      state: null,
    });
  }
  list.sort(() => Math.random() - 0.5);

  return list;
}

function inCreaseStep() {
  step++;
  stepCounter.innerHTML = "Counter: " + step;
}

let autoClickInterval;

function autoClickButton() {
  autoClickInterval = setInterval(() => {
    stepButton.click();
  }, 30);
}

stepButton.addEventListener("click", function () {
  inCreaseStep();
  const { newList, status } = bubbleSortStep(generatedList, step);
  currentList = newList;
  if (status == "done") {
    clearInterval(autoClickInterval);
  }
});

autoStepButton.addEventListener("click", function () {
  autoClickButton();
});
