const showModulesButton = document.querySelector(".show-modules");
const additionalModules = document.querySelector(".curriculum-drawer");

if (showModulesButton && additionalModules) {
  showModulesButton.addEventListener("click", () => {
    const isExpanded =
      showModulesButton.getAttribute("aria-expanded") === "true";

    showModulesButton.setAttribute("aria-expanded", String(!isExpanded));
    additionalModules.hidden = isExpanded;
    showModulesButton.textContent = isExpanded
      ? "View published module"
      : "Close module list";
  });
}

const quiz = document.querySelector("#sample-quiz");
const quizResult = document.querySelector("#quiz-result");

if (quiz && quizResult) {
  quiz.addEventListener("submit", (event) => {
    event.preventDefault();
    const answer = new FormData(quiz).get("answer");

    quizResult.hidden = false;
    quizResult.classList.remove("correct", "incorrect");

    if (!answer) {
      quizResult.classList.add("incorrect");
      quizResult.textContent =
        "Choose an answer before checking your reasoning.";
      return;
    }

    if (answer === "b") {
      quizResult.classList.add("correct");
      quizResult.innerHTML =
        "<strong>Correct.</strong> VKS preserves the Kubernetes API and workload model while integrating lifecycle, policy, networking, and infrastructure services with VCF.";
      localStorage.setItem("vks-field-guide-sample-quiz", "complete");
      return;
    }

    quizResult.classList.add("incorrect");
    quizResult.innerHTML =
      "<strong>Not quite.</strong> Start from what remains familiar: Kubernetes APIs and workloads. Then explain the lifecycle and infrastructure responsibilities integrated through VCF.";
  });

  if (localStorage.getItem("vks-field-guide-sample-quiz") === "complete") {
    quizResult.hidden = false;
    quizResult.classList.add("correct");
    quizResult.textContent =
      "You previously completed this knowledge check. Your progress is stored only in this browser.";
  }
}

if (location.pathname.endsWith("002-kubernetes-foundations-reviewed.html")) {
  document.title =
    "Kubernetes Foundations Through a Shopping Mall Mental Model | Sourabh Shrivastav";

  const backLink = document.querySelector(".article-hero .back-link");
  if (backLink) {
    backLink.href = "../index.html#loops";
    backLink.textContent = "← Learning Loops";
  }

  const moduleBadge = document.querySelector(
    ".article-hero .article-kicker span:nth-child(2)"
  );
  if (moduleBadge) {
    moduleBadge.textContent = "Module 02";
  }

  const tocLabel = document.querySelector(".article-toc > span");
  if (tocLabel) {
    tocLabel.textContent = "In this blog";
  }
}

if (location.pathname.endsWith("003-vcf-and-vks-core-concepts.html")) {
  const servicesParagraph = document.querySelector("#services > p:not(.section-number)");
  if (servicesParagraph) {
    servicesParagraph.textContent =
      "Supervisor Services are services made available through the Supervisor. Examples include VKS, Velero, Harbor, Contour and Argo CD. Not every environment will enable every service. A platform team should enable only what the operating model needs.";
  }
}
