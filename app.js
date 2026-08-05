const showModulesButton = document.querySelector(".show-modules");
const additionalModules = document.querySelector(".curriculum-drawer");

if (showModulesButton && additionalModules) {
  showModulesButton.addEventListener("click", () => {
    const isExpanded = showModulesButton.getAttribute("aria-expanded") === "true";
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
      quizResult.textContent = "Choose an answer before checking your reasoning.";
      return;
    }

    if (answer === "b") {
      quizResult.classList.add("correct");
      quizResult.innerHTML = "<strong>Correct.</strong> VKS preserves the Kubernetes API and workload model while integrating lifecycle, policy, networking, and infrastructure services with VCF.";
      localStorage.setItem("vks-field-guide-sample-quiz", "complete");
      return;
    }

    quizResult.classList.add("incorrect");
    quizResult.innerHTML = "<strong>Not quite.</strong> Start from what remains familiar: Kubernetes APIs and workloads. Then explain the lifecycle and infrastructure responsibilities integrated through VCF.";
  });

  if (localStorage.getItem("vks-field-guide-sample-quiz") === "complete") {
    quizResult.hidden = false;
    quizResult.classList.add("correct");
    quizResult.textContent = "You previously completed this knowledge check. Your progress is stored only in this browser.";
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
      <div class="bridge"><strong>This article continues from that model.</strong> We now look more closely at the two concepts that determine how the platform is organised and where workloads may run: <strong>vSphere Namespaces</strong> and <strong>vSphere Zones</strong>.</div>
      <p>The design question is no longer only “What is a vSphere Namespace?” It is whether Payments, Fraud Analytics and Reporting should share one governed boundary, what each boundary should expose, and which infrastructure failure domains its workloads may use.</p>`;
  }

  const boundaryCards = document.querySelectorAll("#boundary .decision-card");
  const boundaryContent = [
    {
      title: "One namespace per application",
      description: "Useful when one application requires its own capacity, storage, access, network and change-control boundary.",
      example: "Good fit: a regulated payments platform with dedicated production VKS clusters, separate quota, resilient storage policies and tightly controlled access."
    },
    {
      title: "One namespace per team",
      description: "Useful when several related applications have the same owners and can safely share platform entitlements and operational controls.",
      example: "Good fit: a data-platform team running multiple analytics services that use the same VM Classes, storage policies, administrators and lifecycle process."
    },
    {
      title: "One namespace per environment",
      description: "Useful when development, test and production require different quotas, access, storage, networking or approval controls.",
      example: "Good fit: separate payments-dev, payments-test and payments-prod namespaces, with smaller classes and lower-cost storage outside production."
    },
    {
      title: "Shared namespace",
      description: "Useful when multiple low-risk workloads genuinely share the same owners, quota, storage, network and lifecycle expectations.",
      example: "Good fit: a shared non-production sandbox for short-lived internal services owned by one platform team and governed by the same policies."
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
    note.innerHTML = "<strong>These are design patterns, not exclusive rules.</strong> A production design often combines them—for example, one namespace per application per environment. Choose the boundary based on differences in ownership, access, quota, VM Classes, storage policies, networking, zone eligibility, lifecycle and risk.";
    boundaryGrid.insertAdjacentElement("afterend", note);
  }

  const boundaryFigure = boundarySection?.querySelector("figure.visual");
  if (boundaryFigure) {
    boundaryFigure.innerHTML = `
      <svg viewBox="0 0 920 500" role="img" aria-label="Decision guide for determining whether workloads should share a vSphere Namespace">
        <defs>
          <linearGradient id="boundary-bg" x1="0" x2="1" y1="0" y2="1"><stop offset="0" stop-color="#071427"/><stop offset="1" stop-color="#0a1730"/></linearGradient>
          <linearGradient id="boundary-question" x1="0" x2="1"><stop offset="0" stop-color="#123255"/><stop offset="1" stop-color="#18375e"/></linearGradient>
          <filter id="boundary-glow"><feGaussianBlur stdDeviation="4" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
        </defs>
        <rect x="15" y="15" width="890" height="470" rx="28" fill="url(#boundary-bg)" stroke="#244b73" stroke-width="1.5"/>
        <text x="55" y="64" fill="#65e7ff" font-size="18" font-weight="800" letter-spacing="1.2">SHOULD THESE WORKLOADS SHARE ONE WING?</text>
        <rect x="70" y="92" width="780" height="106" rx="20" fill="url(#boundary-question)" stroke="#65e7ff" stroke-width="2"/>
        <circle cx="112" cy="145" r="24" fill="#0b223d" stroke="#65e7ff" stroke-width="2"/>
        <text x="112" y="153" text-anchor="middle" fill="#65e7ff" font-size="24" font-weight="800">?</text>
        <text x="154" y="132" fill="#fff" font-size="21" font-weight="800"><tspan x="154">Same owners, access, quota, storage, network,</tspan><tspan x="154" dy="28">lifecycle expectations and risk boundary?</tspan></text>
        <text x="154" y="183" fill="#bed0e8" font-size="15">Evaluate the operating model—not only the organisation chart.</text>
        <path d="M460 198V238" stroke="#65e7ff" stroke-width="4" stroke-linecap="round"/><circle cx="460" cy="238" r="6" fill="#65e7ff" filter="url(#boundary-glow)"/><path d="M460 238L272 285" stroke="#42e3b4" stroke-width="4" stroke-linecap="round"/><path d="M460 238L648 285" stroke="#ffc96b" stroke-width="4" stroke-linecap="round"/>
        <rect x="70" y="284" width="365" height="148" rx="22" fill="#0f2c43" stroke="#42e3b4" stroke-width="2.5"/>
        <circle cx="118" cy="330" r="24" fill="#123b43" stroke="#42e3b4" stroke-width="2"/><path d="M107 330l8 8 15-18" fill="none" stroke="#42e3b4" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
        <text x="158" y="318" fill="#42e3b4" font-size="21" font-weight="800">YES</text><text x="158" y="350" fill="#fff" font-size="20" font-weight="800">A shared namespace may work</text>
        <text x="104" y="386" fill="#c8d8e8" font-size="15"><tspan x="104">Keep common governance, then monitor quota,</tspan><tspan x="104" dy="22">capacity contention and operational blast radius.</tspan></text>
        <rect x="485" y="284" width="365" height="148" rx="22" fill="#2a2038" stroke="#ffc96b" stroke-width="2.5"/>
        <circle cx="533" cy="330" r="24" fill="#3a2d3f" stroke="#ffc96b" stroke-width="2"/><path d="M523 320l20 20M543 320l-20 20" fill="none" stroke="#ffc96b" stroke-width="4" stroke-linecap="round"/>
        <text x="573" y="318" fill="#ffc96b" font-size="21" font-weight="800">NO</text><text x="573" y="350" fill="#fff" font-size="20" font-weight="800">Create separate namespaces</text>
        <text x="519" y="386" fill="#d6cbe1" font-size="15"><tspan x="519">Separate boundaries make different quotas,</tspan><tspan x="519" dy="22">access, services and lifecycle easier to govern.</tspan></text>
        <rect x="70" y="449" width="780" height="1" fill="#244b73"/><text x="70" y="474" fill="#b8c8df" font-size="15">The namespace boundary should follow meaningful differences in policy, ownership and operations.</text>
      </svg>
      <figcaption>A practical rule: share only when the platform entitlements, ownership model and operational risk are genuinely aligned.</figcaption>`;
  }

  const entitlement = document.querySelector("#entitlement");
  const entitlementTable = entitlement?.querySelector(".simple-table");
  if (entitlementTable) {
    entitlementTable.innerHTML = `
      <thead><tr><th>Design item</th><th>What it controls</th></tr></thead>
      <tbody>
        <tr><td>Capacity</td><td>CPU, memory and storage limits available through the vSphere Namespace.</td></tr>
        <tr><td>VM Classes</td><td>Standardised CPU and memory shapes for VKS nodes and supported VM workloads—similar to choosing T-shirt sizes such as small, medium or large.</td></tr>
        <tr><td>Storage Policies</td><td>Approved storage capabilities, datastore placement and storage quotas exposed to workloads.</td></tr>
        <tr><td>Network choices</td><td>Namespace networking, reachable networks and available platform network services.</td></tr>
        <tr><td>Services</td><td>Approved Supervisor Services and platform capabilities available inside the namespace.</td></tr>
        <tr><td>Identity</td><td>Users, groups and platform-level permissions assigned to the namespace.</td></tr>
        <tr><td>Zones</td><td>Eligible infrastructure placement and failure domains available to workloads in the namespace.</td></tr>
      </tbody>`;
  }

  const entitlementIntro = entitlement?.querySelector("#entitlement > p:not(.section-number)") || entitlement?.querySelector("p:not(.section-number)");
  if (entitlementIntro) {
    entitlementIntro.textContent = "A vSphere Namespace is a governed resource envelope where VKS clusters, vSphere Pods, VM Service virtual machines and enabled Supervisor Services can run. The platform team defines which capacity, VM Classes, storage policies, networks, services, identities and zones that namespace may consume.";
  }

  if (entitlement && entitlementTable && !entitlement.querySelector(".namespace-inventory-visual")) {
    const explainer = document.createElement("div");
    explainer.className = "namespace-structure-intro";
    explainer.innerHTML = `
      <p class="micro-label">How it appears in vCenter</p>
      <h3>The namespace is a governed resource pool across its mapped infrastructure.</h3>
      <p>A vSphere Namespace does not contain physical ESXi hosts. Instead, vCenter creates a namespace resource pool on every vSphere cluster mapped through the selected zone or zones. The ESXi hosts underneath those clusters provide the actual compute capacity.</p>`;

    const figure = document.createElement("figure");
    figure.className = "visual namespace-inventory-visual";
    figure.innerHTML = `
      <svg viewBox="0 0 1100 760" role="img" aria-label="vCenter inventory diagram showing a Supervisor, three vSphere Zones, three vSphere clusters with ESXi hosts, and a namespace resource pool created on each mapped cluster">
        <defs>
          <linearGradient id="inventory-bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#06101f"/><stop offset="1" stop-color="#0b1931"/></linearGradient>
          <linearGradient id="inventory-ns" x1="0" x2="1"><stop offset="0" stop-color="#6d5dfc"/><stop offset="1" stop-color="#23c7e6"/></linearGradient>
        </defs>
        <rect x="18" y="18" width="1064" height="724" rx="30" fill="url(#inventory-bg)" stroke="#294f78" stroke-width="2"/>
        <text x="58" y="70" fill="#65e7ff" font-size="20" font-weight="800" letter-spacing="1.2">ACTUAL vCENTER INVENTORY VIEW</text>
        <text x="58" y="102" fill="#b9c8df" font-size="16">One namespace mapped to three zones creates a resource-pool presence on each underlying cluster.</text>

        <rect x="360" y="128" width="380" height="70" rx="18" fill="#102d50" stroke="#65e7ff" stroke-width="2"/>
        <text x="550" y="158" text-anchor="middle" fill="#65e7ff" font-size="17" font-weight="700">vCENTER SERVER</text>
        <text x="550" y="184" text-anchor="middle" fill="#fff" font-size="21" font-weight="800">Supervisor: prod-supervisor</text>

        <path d="M550 198V232M550 232H190M550 232H910M190 232V260M550 232V260M910 232V260" fill="none" stroke="#65e7ff" stroke-width="3"/>

        ${[0,1,2].map((i)=>{
          const x=[60,410,760][i];
          const zone=["ZONE A","ZONE B","ZONE C"][i];
          const cluster=["Cluster-A","Cluster-B","Cluster-C"][i];
          return `
            <rect x="${x}" y="260" width="280" height="410" rx="22" fill="#0d203a" stroke="${["#65e7ff","#9b7cff","#42e3b4"][i]}" stroke-width="2"/>
            <text x="${x+140}" y="296" text-anchor="middle" fill="${["#65e7ff","#b69cff","#42e3b4"][i]}" font-size="18" font-weight="800">${zone}</text>
            <rect x="${x+24}" y="320" width="232" height="72" rx="15" fill="#15375b" stroke="#7da9d8"/>
            <text x="${x+140}" y="348" text-anchor="middle" fill="#fff" font-size="18" font-weight="800">${cluster}</text>
            <text x="${x+140}" y="374" text-anchor="middle" fill="#bed0e8" font-size="14">vSphere cluster</text>
            <rect x="${x+24}" y="414" width="232" height="92" rx="15" fill="url(#inventory-ns)" opacity=".92"/>
            <text x="${x+140}" y="444" text-anchor="middle" fill="#fff" font-size="16" font-weight="800">payments-prod</text>
            <text x="${x+140}" y="468" text-anchor="middle" fill="#eef7ff" font-size="14">Namespace resource pool</text>
            <text x="${x+140}" y="491" text-anchor="middle" fill="#dcecff" font-size="13">Quota + workload consumption</text>
            <text x="${x+28}" y="548" fill="#b9c8df" font-size="14" font-weight="700">ESXi hosts</text>
            ${[0,1,2].map((h)=>`<rect x="${x+28+h*76}" y="566" width="64" height="66" rx="10" fill="#142a49" stroke="#4e739f"/><rect x="${x+39+h*76}" y="578" width="42" height="7" rx="3" fill="#65e7ff"/><circle cx="${x+44+h*76}" cy="608" r="4" fill="#42e3b4"/><circle cx="${x+56+h*76}" cy="608" r="4" fill="#42e3b4"/><text x="${x+60+h*76}" y="625" text-anchor="middle" fill="#c9d8ea" font-size="11">ESXi ${h+1}</text></rect>`).join("")}
          `;
        }).join("")}

        <path d="M550 198V218" stroke="#ffc96b" stroke-width="3"/>
        <rect x="250" y="690" width="600" height="34" rx="12" fill="#102848" stroke="#294f78"/>
        <text x="550" y="713" text-anchor="middle" fill="#d8e6fb" font-size="14">Namespace quotas are represented across mapped clusters; physical capacity comes from their ESXi hosts.</text>
      </svg>
      <figcaption>Three-zone example: the namespace spans the mapped zones, and vCenter creates a namespace resource pool on each underlying cluster. In a one-zone design, the same relationship exists on only one mapped cluster.</figcaption>`;

    entitlementTable.insertAdjacentElement("afterend", explainer);
    explainer.insertAdjacentElement("afterend", figure);
  }

  const zoneHeading = document.querySelector("#zones h2");
  if (zoneHeading) zoneHeading.textContent = "A vSphere Zone represents an infrastructure placement and failure domain.";

  const zoneTechnicalMeaning = document.querySelector("#zones .plain-callout");
  if (zoneTechnicalMeaning) {
    zoneTechnicalMeaning.innerHTML = "<strong>Technical meaning:</strong> A vSphere Zone is an infrastructure domain used by Supervisor for placement and failure-domain design. In VCF 9.1, a zone is associated with one or more vSphere clusters; do not assume that every zone is permanently limited to exactly one cluster.";
  }

  const mappingParagraphs = document.querySelectorAll("#mapping > p:not(.section-number)");
  if (mappingParagraphs[0]) {
    mappingParagraphs[0].textContent = "A vSphere Namespace can be mapped to as many as three vSphere Zones. A namespace mapped to one zone is restricted to that eligible infrastructure domain; mapping it to multiple zones makes those domains available for placement.";
  }

  const mappingHeading = document.querySelector("#mapping h2");
  if (mappingHeading) mappingHeading.textContent = "Zone mapping defines eligible placement; workload design determines resilience.";

  const mappingSection = document.querySelector("#mapping");
  if (mappingSection && !mappingSection.querySelector(".zone-validation-note")) {
    const note = document.createElement("div");
    note.className = "plain-callout zone-validation-note";
    note.innerHTML = "<strong>Important:</strong> In a three-zone Supervisor, namespace capacity is represented across the underlying zones. The VKS cluster topology, application replicas, topology-spread or anti-affinity rules, and storage policy must still be designed for failure-domain resilience. Zone mapping alone does not make an application highly available.";
    const figure = mappingSection.querySelector("figure");
    mappingSection.insertBefore(note, figure || null);
  }

  const validationStyle = document.createElement("style");
  validationStyle.textContent = `
    #bridge .bridge strong { display: inline; margin-right: .3rem; }
    .bridge-analogy-visual { margin: 30px auto; max-width: 1040px; }
    .bridge-analogy-visual img { border-radius: 16px; display: block; height: auto; width: 100%; }
    .boundary-clarity-note { margin-top: 24px; }
    #boundary figure.visual { margin: 32px auto; max-width: 1080px; }
    #entitlement .simple-table { background:#fff; border:1px solid #dce6f5; border-collapse:separate; border-radius:18px; box-shadow:0 16px 36px rgba(16,38,74,.07); overflow:hidden; }
    #entitlement .simple-table th { background:#f4f7fc; padding:16px 18px; }
    #entitlement .simple-table td { padding:18px; }
    #entitlement .simple-table th:first-child,
    #entitlement .simple-table td:first-child { width:24%; }
    #entitlement .simple-table th:last-child,
    #entitlement .simple-table td:last-child { width:76%; }
    .namespace-structure-intro { margin:42px 0 18px; }
    .namespace-structure-intro h3 { font-size:clamp(1.45rem,2.2vw,2rem); margin:8px 0 12px; }
    .namespace-structure-intro p:last-child { max-width:900px; }
    .micro-label { color:#2a5be0!important; font-size:.78rem!important; font-weight:800; letter-spacing:.1em; margin:0; text-transform:uppercase; }
    .namespace-inventory-visual { margin:24px auto 34px; max-width:1120px; }
    .namespace-inventory-visual svg { display:block; height:auto; width:100%; }
    .zone-validation-note { margin-top:22px; }
    @media(max-width:760px){
      #entitlement .simple-table th:first-child,
      #entitlement .simple-table td:first-child { width:34%; }
      #entitlement .simple-table th:last-child,
      #entitlement .simple-table td:last-child { width:66%; }
      .namespace-inventory-visual { padding:10px; }
    }
  `;
  document.head.appendChild(validationStyle);
}
