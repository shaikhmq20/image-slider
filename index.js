import Stack from "./stack.js";
import LinkedList from "./LinkedList.js";
import { images } from "./config.js";

var list = new LinkedList();
images.forEach((image) => {
  list.add(image);
});

// Getting the elements from the DOM
let imgSlider = document.getElementById("slider");
let next = document.getElementById("next");
let prev = document.getElementById("previous");

// Setting the current image in the slider
let current = list.head;
imgSlider.src = current.imgPath;

// Animating the image when it changes everytime
const onChange = () => {
  imgSlider.animate([{ opacity: 0 }, { opacity: 1 }], {
    duration: 1000,
  });
};
console.log(list);

// Image Change Logic
next.addEventListener("click", () => {
  current = current.next;
  imgSlider.src = current.imgPath;
  onChange();
});
prev.addEventListener("click", () => {
  current = current.prev;
  imgSlider.src = current.imgPath;
  onChange();
});

let deleteImageBtn = document.getElementById("delete-image");
let undoDeleteBtn = document.getElementById("undo-delete");

const stack = new Stack();

// Disabling undo button when there are no deleted files
function buttonDisabled(element, prop) {
  if (prop.isEmpty()) element.disabled = true;
  else element.disabled = false;
}

buttonDisabled(undoDeleteBtn, stack);

// Delete Logic
deleteImageBtn.addEventListener("click", () => {
  stack.push_back({ imgPath: current.imgPath, next: null });
  console.log(stack.top);
  console.log(list);
  current = list.delete(current);
  buttonDisabled(undoDeleteBtn, stack);
  if (list.size === 1) {
    deleteImageBtn.disabled = true;
  }
  onChange();
  imgSlider.src = current.imgPath;
});

// Undo Logic
undoDeleteBtn.addEventListener("click", () => {
  if (list.size >= 1) buttonDisabled(deleteImageBtn, list);
  if (!stack.isEmpty()) {
    console.log(stack.top);
    list.add(stack.top.imgPath);
    stack.pop_back();
    console.log(list);
  }
  buttonDisabled(undoDeleteBtn, stack);
});
