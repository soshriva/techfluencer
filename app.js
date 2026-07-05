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
