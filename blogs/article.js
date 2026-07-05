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

if (location.pathname.endsWith("001-what-is-vks.html")) {
  const style = document.createElement("style");
  style.textContent = `
    .article-hero .article-image {
      max-width: 620px !important;
      width: 100% !important;
      justify-self: center !important;
      align-self: center !important;
      margin: 0 auto !important;
    }

    .article-hero .article-image img {
      max-height: 430px !important;
      object-fit: contain !important;
    }

    @media (max-width: 900px) {
      .article-hero .article-image {
        max-width: 100% !important;
        margin-top: 24px !important;
      }

      .article-hero .article-image img {
        max-height: none !important;
      }
    }
  `;
  document.head.appendChild(style);
}
