(function () {
  const divAndDiv = document.querySelectorAll("[data-id='1']");
  console.log(1);
  divAndDiv[0].classList.add("current");
  divAndDiv[1].classList.add("current");
})();

const nextSlideButton = document.getElementById("next-slide");
const previousSlideButton = document.getElementById("previous-slide");
const navDots = document.querySelectorAll("nav button");

function changeToNextSlide() {
  const currentDivAndDot = document.querySelectorAll(".current");

  currentDivAndDot[0].classList.toggle("current");
  currentDivAndDot[1].classList.toggle("current");

  const dataID = Number(currentDivAndDot[0].dataset.id);
  const newDataID = (dataID % 4) + 1;

  const newDivAndDot = document.querySelectorAll(`[data-id="${newDataID}"]`);
  newDivAndDot[0].classList.toggle("current");
  newDivAndDot[1].classList.toggle("current");
}

function changeToPreviousSlide() {
  const currentDivAndDot = document.querySelectorAll(".current");

  currentDivAndDot[0].classList.toggle("current");
  currentDivAndDot[1].classList.toggle("current");

  const dataID = Number(currentDivAndDot[0].dataset.id);
  const newDataID = dataID - 1 === 0 ? 4 : dataID - 1;

  const newDivAndDot = document.querySelectorAll(`[data-id="${newDataID}"]`);
  newDivAndDot[0].classList.toggle("current");
  newDivAndDot[1].classList.toggle("current");
}

function jumpToSlide(n) {
  const currentDivAndDot = document.querySelectorAll(".current");

  currentDivAndDot[0].classList.toggle("current");
  currentDivAndDot[1].classList.toggle("current");

  const newDivAndDot = document.querySelectorAll(`[data-id="${n}"]`);
  newDivAndDot[0].classList.toggle("current");
  newDivAndDot[1].classList.toggle("current");
}

function getCurrentSlideID() {
  const currentSlideID = document.querySelector(".current").dataset.id;
  return Number(currentSlideID);
}

setInterval(changeToNextSlide, 5000);

navDots.forEach((ele) => {
  ele.addEventListener("click", () => {
    const dataID = Number(ele.dataset.id);
    jumpToSlide(dataID);
  });
});

nextSlideButton.addEventListener("click", () => {
  changeToNextSlide();
  getCurrentSlideID();
});

previousSlideButton.addEventListener("click", () => {
  changeToPreviousSlide();
});
