import { sortNumber1 } from "./algoritms/1.js";
// import { myFunction2 } from "./algoritms/2.js";

const title = document.getElementById("title");
const knop1 = document.getElementById("knop1");
const knop2 = document.getElementById("knop2");
const knop3 = document.getElementById("knop3");
const knop4 = document.getElementById("knop4");

knop1.addEventListener("click", function () {
  title.innerHTML = "Nummer 1";
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

const listLength = 25;
const pillarWidth = canvasWidth / listLength;
const generatedList = generateList();
draw(generatedList);

console.log(generatedList);

export function clearCanvas() {
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);
}

export function draw(list) {
  ctx.beginPath();
  list.forEach((item, index) => {
    ctx.fillStyle = "red";
    if (item.state === "selected") {
      ctx.fillStyle = "blue";
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

skip.addEventListener("click", function () {
  const newList = sortNumber1(generatedList);
  // clearCanvas();
  // draw(newList);
});
