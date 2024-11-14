import { clearCanvas, draw } from "../main.js";

let currentIndex = 0;
let loopCounter = 0;
let needsFlip = false;

export function bubbleSortStep(list, step) {
  let newList = [...list];

  if (loopCounter >= list.length - 1) {
    newList[0].state = "correct";
    clearCanvas();
    draw(newList);

    return { newList, status: "done" };
  }

  const previousItem = newList[currentIndex - 1];
  const currentItem = newList[currentIndex];
  const nextItem = newList[currentIndex + 1];

  // Set backgrond of previous item to null
  if (previousItem) {
    previousItem.state = null;
  }

  if (currentItem && nextItem) {
    currentItem.state = "selected";
    nextItem.state = "selected";

    // Flip items if needed
    if (needsFlip) {
      newList = flipItems(newList, currentIndex);
      needsFlip = false;
    }

    // Check if a swap is needed otherwise move to next item
    if (currentItem.height > nextItem.height) {
      needsFlip = true;
    } else {
      currentIndex++;
    }
    clearCanvas();
    draw(newList);

    // Check if end is reached
    if (currentIndex >= list.length - loopCounter - 1) {
      newList[currentIndex - 1].state = null;
      newList[currentIndex].state = "correct";
      currentIndex = 0;
      loopCounter++;
      clearCanvas();
      draw(newList);
      return { newList, status: "inProgress" };
    }
  }

  return { newList, status: "inProgress" };
}

function flipItems(list, currentIndex) {
  let newList = [...list];
  const temp = newList[currentIndex].height;
  newList[currentIndex].height = newList[currentIndex + 1].height;
  newList[currentIndex + 1].height = temp;
  return newList;
}
