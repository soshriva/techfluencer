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

if (location.pathname.endsWith("004-vsphere-namespaces-and-zones.html")) {
  const bridge = document.querySelector("#bridge");
  if (bridge) {
    bridge.innerHTML = `
      <p class="section-number">01 · Bridge from Blog 3</p>
      <h2>From understanding the hierarchy to designing its boundaries.</h2>
      <p class="section-lead">In Blog 3, we used a corporate office building to explain the VCF and VKS hierarchy.</p>
      <p><strong>VCF</strong> was the building foundation, <strong>Supervisor</strong> was the enabled floor, and each <strong>vSphere Namespace</strong> was a governed wing with its own access, limits, approved resources and services. Inside a wing, a <strong>VKS cluster</strong> acted as the dedicated project area, while <strong>Kubernetes namespaces</strong> organised individual work zones within that cluster.</p>
      <figure class="visual bridge-analogy-visual">
        <img src="../assets/blogs/vcf-vks-core-concepts/corporate-office-analogy-map.png" alt="Corporate office analogy map showing VCF infrastructure as the office building, Supervisor as the enabled floor, vSphere Namespaces as department wings, a VKS cluster as the project area, and Kubernetes namespaces as work zones." loading="lazy" />
        <figcaption>A quick visual refresher from Blog 3: building → enabled floor → department wing → project area → work zones.</figcaption>
      </figure>
      <div class="bridge"><strong>This article continues from that model.</strong>We now look more closely at the two concepts that determine how the platform is organised and where workloads may run: <strong>vSphere Namespaces</strong> and <strong>vSphere Zones</strong>.</div>
      <p>The design question is no longer only “What is a vSphere Namespace?” It is whether Payments, Fraud Analytics and Reporting should share one governed boundary, what each boundary should expose, and which infrastructure failure domains its workloads may use.</p>`;
  }

  const boundaryCards = document.querySelectorAll("#boundary .decision-card");
  const boundaryContent = [
    {
      title: "One namespace per application",
      description:
        "Useful when one application requires its own capacity, storage, access, network and change-control boundary.",
      example:
        "Good fit: a regulated payments platform with dedicated production VKS clusters, separate quota, resilient storage policies and tightly controlled access."
    },
    {
      title: "One namespace per team",
      description:
        "Useful when several related applications have the same owners and can safely share platform entitlements and operational controls.",
      example:
        "Good fit: a data-platform team running multiple analytics services that use the same VM Classes, storage policies, administrators and lifecycle process."
    },
    {
      title: "One namespace per environment",
      description:
        "Useful when development, test and production require different quotas, access, storage, networking or approval controls.",
      example:
        "Good fit: separate payments-dev, payments-test and payments-prod namespaces, with smaller classes and lower-cost storage outside production."
    },
    {
      title: "Shared namespace",
      description:
        "Useful when multiple low-risk workloads genuinely share the same owners, quota, storage, network and lifecycle expectations.",
      example:
        "Good fit: a shared non-production sandbox for short-lived internal services owned by one platform team and governed by the same policies."
    }
  ];

  boundaryCards.forEach((card, index) => {
    const content = boundaryContent[index];
    if (!content) return;
    card.innerHTML = `<h3>${content.title}</h3><p>${content.description}</p><div class="rule">${content.example}</div>`;
  });

  const boundarySection = document.querySelector("#boundary");
  const boundaryGrid = boundarySection?.querySelector(".decision-grid");
  if (boundarySection && boundaryGrid && !boundarySection.querySelector(".boundary-clarity-note")) {
    const note = document.createElement("div");
    note.className = "plain-callout boundary-clarity-note";
    note.innerHTML =
      "<strong>These are design patterns, not exclusive rules.</strong> A production design often combines them—for example, one namespace per application per environment. Choose the boundary based on differences in ownership, access, quota, VM Classes, storage policies, networking, zone eligibility, lifecycle and risk.";
    boundaryGrid.insertAdjacentElement("afterend", note);
  }

  const zoneHeading = document.querySelector("#zones h2");
  if (zoneHeading) {
    zoneHeading.textContent =
      "A vSphere Zone represents an infrastructure placement and failure domain.";
  }

  const zoneTechnicalMeaning = document.querySelector("#zones .plain-callout");
  if (zoneTechnicalMeaning) {
    zoneTechnicalMeaning.innerHTML =
      "<strong>Technical meaning:</strong> A vSphere Zone is an infrastructure domain used by Supervisor for placement and failure-domain design. In VCF 9.1, a zone is associated with one or more vSphere clusters; do not assume that every zone is permanently limited to exactly one cluster.";
  }

  const mappingParagraphs = document.querySelectorAll(
    "#mapping > p:not(.section-number)"
  );
  if (mappingParagraphs[0]) {
    mappingParagraphs[0].textContent =
      "A vSphere Namespace can be mapped to as many as three vSphere Zones. A namespace mapped to one zone is restricted to that eligible infrastructure domain; mapping it to multiple zones makes those domains available for placement.";
  }

  const mappingHeading = document.querySelector("#mapping h2");
  if (mappingHeading) {
    mappingHeading.textContent =
      "Zone mapping defines eligible placement; workload design determines resilience.";
  }

  const mappingSection = document.querySelector("#mapping");
  if (mappingSection && !mappingSection.querySelector(".zone-validation-note")) {
    const note = document.createElement("div");
    note.className = "plain-callout zone-validation-note";
    note.innerHTML =
      "<strong>Important:</strong> In a three-zone Supervisor, namespace capacity is represented across the underlying zones. The VKS cluster topology, application replicas, topology-spread or anti-affinity rules, and storage policy must still be designed for failure-domain resilience. Zone mapping alone does not make an application highly available.";
    const figure = mappingSection.querySelector("figure");
    mappingSection.insertBefore(note, figure || null);
  }

  const entitlementIntro = document.querySelector("#entitlement > p:not(.section-number)");
  if (entitlementIntro) {
    entitlementIntro.textContent =
      "A vSphere Namespace is a governed resource boundary where VKS clusters, vSphere Pods, VM Service virtual machines and enabled Supervisor Services can run. When first created, it can consume Supervisor resources without explicit namespace limits until administrators configure quotas and approved capabilities.";
  }

  const validationStyle = document.createElement("style");
  validationStyle.textContent = `
    #bridge .bridge strong { display: inline; margin-right: .3rem; }
    .bridge-analogy-visual { margin: 30px auto; max-width: 1040px; }
    .bridge-analogy-visual img { border-radius: 16px; display: block; height: auto; width: 100%; }
    .boundary-clarity-note { margin-top: 24px; }
    .zone-validation-note { margin-top: 22px; }
  `;
  document.head.appendChild(validationStyle);
}
