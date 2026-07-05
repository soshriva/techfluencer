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

document.querySelectorAll(".article-meta span").forEach((item) => {
  if (item.textContent.trim().toLowerCase().startsWith("validated")) {
    item.remove();
  }
});

if (location.pathname.endsWith("001-what-is-vks.html")) {
  const fitImage = document.querySelector("#fit .article-image img");
  const fitCaption = document.querySelector("#fit .article-image figcaption");

  if (fitImage) {
    fitImage.src = "../assets/blogs/what-is-vks/vmware_cloud_foundation_and_services_infographic.png";
    fitImage.alt = "VMware Cloud Foundation as the operating foundation for VKS, VM services, Private AI, and modern applications";
  }

  if (fitCaption) {
    fitCaption.textContent = "VCF is the operating foundation. VKS is one strategic service delivered from that foundation, alongside VM services, Private AI, and modern application services.";
  }

  const style = document.createElement("style");
  style.textContent = `
    .article-hero {
      display: grid !important;
      grid-template-columns: minmax(0, 1.05fr) minmax(420px, 0.95fr) !important;
      gap: 44px !important;
      align-items: center !important;
      padding-top: 70px !important;
      padding-bottom: 70px !important;
    }

    .article-hero-copy {
      max-width: 780px !important;
    }

    .article-hero h1 {
      font-size: clamp(2.45rem, 4vw, 4.35rem) !important;
      line-height: 1.04 !important;
      margin-bottom: 24px !important;
    }

    .article-deck {
      max-width: 720px !important;
    }

    .article-hero .article-image {
      max-width: 760px !important;
      width: 100% !important;
      justify-self: stretch !important;
      align-self: center !important;
      margin: 0 !important;
    }

    .article-hero .article-image img {
      max-height: 620px !important;
      object-fit: contain !important;
    }

    @media (max-width: 1100px) {
      .article-hero {
        grid-template-columns: 1fr !important;
      }

      .article-hero .article-image {
        max-width: 860px !important;
        margin: 24px auto 0 !important;
      }

      .article-hero .article-image img {
        max-height: none !important;
      }
    }
  `;
  document.head.appendChild(style);
}
