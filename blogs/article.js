document.querySelectorAll(".knowledge-card").forEach((card) => {
  const options = card.querySelectorAll(".knowledge-options button");
  const review = card.querySelector(".answer-review");

  options.forEach((option) => {
    option.addEventListener("click", () => {
      options.forEach((item) => item.classList.remove("selected"));
      option.classList.add("selected");
      review.hidden = false;
    });
  });
});
