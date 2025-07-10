const dropdownButtons = document.querySelectorAll(".trigger");

dropdownButtons.forEach((dropdownButton) => {
  dropdownButton.addEventListener("click", () => {
    const dropdownContentContainer = document.querySelector(
      `.dropdown-content-container[data-id="${dropdownButton.dataset.id}"]`
    );
    uu
    dropdownButton.textContent === "⤴"
      ? (dropdownButton.textContent = "⤵")
      : (dropdownButton.textContent = "⤴");
    dropdownContentContainer.classList.toggle("invisible");
  });
});
