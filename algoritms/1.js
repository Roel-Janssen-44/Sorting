import { clearCanvas, draw } from "../main.js";

export function sortNumber1(list) {
  let newList = [...list];

  // list.forEach((index) => {
  //   list.forEach((item) => {
  //     if (index) {
  //       newList.push({ height: item.height, state: "selected" });
  //     } else {
  //       newList.push({ height: item.height, state: null });
  //     }
  //   });
  //   setTimeout(function () {
  //     clearCanvas();
  //     draw(newList);
  //   }, 300);
  // });

  // clearCanvas();
  // draw(newList);

  // Loop over whole list
  list.forEach((item, index) => {
    setTimeout(function () {
      // Loop over list to highlight selected items
      newList = newList.map((element, i) => {
        if (i === index || i === index + 1) {
          // Check if next item exists
          if (newList[index + 1].height) {
            // Check if next item is smaller
            if (newList[i].height > newList[i + 1].height) {
              return {
                height: newList[i].height,
                state: "selected",
              };
            } else {
              return {
                height: newList[i].height,
                state: "selected",
              };
            }
          }
          return {
            height: element.height,
            state: "selected",
          };
        } else {
          return {
            height: element.height,
            state: null,
          };
        }
      });

      clearCanvas();
      draw(newList);
    }, 800 * index);
  });
}
