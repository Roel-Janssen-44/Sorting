import { bubbleSortStep } from "./algoritms/bubbleSort.js";

const title = document.getElementById("title");
const knop1 = document.getElementById("knop1");
const knop2 = document.getElementById("knop2");
const knop3 = document.getElementById("knop3");
const knop4 = document.getElementById("knop4");
const stepButton = document.getElementById("sortstep");
const stepCounter = document.getElementById("step");
const codeContainer = document.getElementById("code");

knop1.addEventListener("click", function () {
  title.innerHTML = "Bubble sort";
  const codeArray = [
    "",
    "function bubbleSort(inputArr) => {",
    "  let len = inputArr.length;",
    "  for (let i = 0; i < len; i++) {",
    "      for (let j = 0; j < len; j++) {",
    "          if (inputArr[j] > inputArr[j + 1]) {",
    "              let tmp = inputArr[j];",
    "              inputArr[j] = inputArr[j + 1];",
    "              inputArr[j + 1] = tmp;",
    "          }",
    "      }",
    "  }",
    "  return inputArr;",
    "};",
    "",
  ];

  title.innerHTML = "Bubble sort";

  // Initialize an empty string to hold the HTML for each line
  let codeHTML = "";

  // Loop through each line in the codeArray, adding a new line after each
  codeArray.forEach((line, index) => {
    codeHTML += `<span ${index == 4 ? 'class="active"' : ""} id="line${
      index + 1
    }">${line}</span>`;
  });

  // Set the innerHTML of the <code> element with id "code"
  document.getElementById("code").innerHTML = codeHTML;
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

export function generateList() {
  let list = [];
  for (let i = 0; i < listLength; i++) {
    const height = Math.round(Math.random() * 300);

    list.push({
      height: height,
      state: null,
    });
  }

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

const autoStepButton = document.querySelector("#autostep");

autoStepButton.addEventListener("click", function () {
  autoClickButton();
});
