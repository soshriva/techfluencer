const showModulesButton = document.querySelector(".show-modules");
const additionalModules = document.querySelector(".curriculum-drawer");

if (showModulesButton && additionalModules) {
  showModulesButton.addEventListener("click", () => {
    const isExpanded = showModulesButton.getAttribute("aria-expanded") === "true";
    showModulesButton.setAttribute("aria-expanded", String(!isExpanded));
    additionalModules.hidden = isExpanded;
    showModulesButton.textContent = isExpanded ? "View published module" : "Close module list";
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
      <div class="bridge"><strong>This article continues from that model.</strong> We now look more closely at the two concepts that determine how the platform is organised and where workloads may run: <strong>vSphere Namespaces</strong> and <strong>vSphere Zones</strong>.</div>
      <p>The design question is no longer only “What is a vSphere Namespace?” It is whether Payments, Fraud Analytics and Reporting should share one governed boundary, what each boundary should expose, and which infrastructure failure domains its workloads may use.</p>`;
  }

  const boundaryCards = document.querySelectorAll("#boundary .decision-card");
  const boundaryContent = [
    ["One namespace per application", "Useful when one application requires its own capacity, storage, access, network and change control boundary.", "Good fit: a regulated payments platform with dedicated production VKS clusters, separate quota, resilient storage policies and tightly controlled access."],
    ["One namespace per team", "Useful when several related applications have the same owners and can safely share platform entitlements and operational controls.", "Good fit: a data platform team running multiple analytics services that use the same VM Classes, storage policies, administrators and lifecycle process."],
    ["One namespace per environment", "Useful when development, test and production require different quotas, access, storage, networking or approval controls.", "Good fit: separate payments dev, payments test and payments prod namespaces, with smaller classes and lower cost storage outside production."],
    ["Shared namespace", "Useful when multiple low risk workloads genuinely share the same owners, quota, storage, network and lifecycle expectations.", "Good fit: a shared nonproduction sandbox for short lived internal services owned by one platform team and governed by the same policies."]
  ];

  boundaryCards.forEach((card, index) => {
    const content = boundaryContent[index];
    if (content) {
      card.innerHTML = `<h3>${content[0]}</h3><p>${content[1]}</p><div class="rule">${content[2]}</div>`;
    }
  });

  const boundarySection = document.querySelector("#boundary");
  const boundaryGrid = boundarySection?.querySelector(".decision-grid");
  if (boundarySection && boundaryGrid && !boundarySection.querySelector(".boundary-clarity-note")) {
    const note = document.createElement("div");
    note.className = "plain-callout boundary-clarity-note";
    note.innerHTML =
      "<strong>These are design patterns, not exclusive rules.</strong> A production design often combines them, for example one namespace per application per environment. Choose the boundary based on differences in ownership, access, quota, VM Classes, storage policies, networking, zone eligibility, lifecycle and risk.";
    boundaryGrid.insertAdjacentElement("afterend", note);
  }

  const boundaryFigure = boundarySection?.querySelector("figure.visual");
  if (boundaryFigure) {
    boundaryFigure.innerHTML = `
      <svg viewBox="0 0 920 500" role="img" aria-label="Decision guide for determining whether workloads should share a vSphere Namespace">
        <defs>
          <linearGradient id="boundary-bg" x1="0" x2="1" y1="0" y2="1"><stop offset="0" stop-color="#071427"/><stop offset="1" stop-color="#0a1730"/></linearGradient>
          <linearGradient id="boundary-question" x1="0" x2="1"><stop offset="0" stop-color="#123255"/><stop offset="1" stop-color="#18375e"/></linearGradient>
        </defs>
        <rect x="15" y="15" width="890" height="470" rx="28" fill="url(#boundary-bg)" stroke="#244b73" stroke-width="1.5"/>
        <text x="55" y="64" fill="#65e7ff" font-size="18" font-weight="800">SHOULD THESE WORKLOADS SHARE ONE WING?</text>
        <rect x="70" y="92" width="780" height="106" rx="20" fill="url(#boundary-question)" stroke="#65e7ff" stroke-width="2"/>
        <circle cx="112" cy="145" r="24" fill="#0b223d" stroke="#65e7ff" stroke-width="2"/>
        <text x="112" y="153" text-anchor="middle" fill="#65e7ff" font-size="24" font-weight="800">?</text>
        <text x="154" y="132" fill="#fff" font-size="21" font-weight="800"><tspan x="154">Same owners, access, quota, storage, network,</tspan><tspan x="154" dy="28">lifecycle expectations and risk boundary?</tspan></text>
        <text x="154" y="183" fill="#bed0e8" font-size="15">Evaluate the operating model, not only the organisation chart.</text>
        <path d="M460 198V238" stroke="#65e7ff" stroke-width="4"/>
        <path d="M460 238L272 285" stroke="#42e3b4" stroke-width="4"/>
        <path d="M460 238L648 285" stroke="#ffc96b" stroke-width="4"/>
        <rect x="70" y="284" width="365" height="148" rx="22" fill="#0f2c43" stroke="#42e3b4" stroke-width="2.5"/>
        <circle cx="118" cy="330" r="24" fill="#123b43" stroke="#42e3b4" stroke-width="2"/>
        <path d="M107 330l8 8 15-18" fill="none" stroke="#42e3b4" stroke-width="4"/>
        <text x="158" y="318" fill="#42e3b4" font-size="19" font-weight="800">YES</text>
        <text x="158" y="346" fill="#fff" font-size="16" font-weight="800">A shared namespace may work</text>
        <text x="104" y="382" fill="#c8d8e8" font-size="12.5"><tspan x="104">Keep common governance, then monitor quota,</tspan><tspan x="104" dy="20">capacity contention and operational blast radius.</tspan></text>
        <rect x="485" y="284" width="365" height="148" rx="22" fill="#2a2038" stroke="#ffc96b" stroke-width="2.5"/>
        <circle cx="533" cy="330" r="24" fill="#3a2d3f" stroke="#ffc96b" stroke-width="2"/>
        <path d="M523 320l20 20M543 320l-20 20" fill="none" stroke="#ffc96b" stroke-width="4"/>
        <text x="573" y="318" fill="#ffc96b" font-size="19" font-weight="800">NO</text>
        <text x="573" y="346" fill="#fff" font-size="16" font-weight="800">Create separate namespaces</text>
        <text x="519" y="382" fill="#d6cbe1" font-size="12.5"><tspan x="519">Separate boundaries make different quotas,</tspan><tspan x="519" dy="20">access, services and lifecycle easier to govern.</tspan></text>
        <rect x="70" y="449" width="780" height="1" fill="#244b73"/>
        <text x="70" y="474" fill="#b8c8df" font-size="15">The namespace boundary should follow meaningful differences in policy, ownership and operations.</text>
      </svg>
      <figcaption>A practical rule: share only when platform entitlements, ownership and operational risk are genuinely aligned.</figcaption>`;
  }

  const entitlement = document.querySelector("#entitlement");
  const entitlementTable = entitlement?.querySelector(".simple-table");
  if (entitlementTable) {
    entitlementTable.innerHTML = `
      <thead><tr><th>Design item</th><th>What it controls</th></tr></thead>
      <tbody>
        <tr><td>Capacity</td><td>CPU, memory and storage limits available through the vSphere Namespace.</td></tr>
        <tr><td>VM Classes</td><td>Standardised CPU and memory shapes for VKS nodes and supported VM workloads, similar to choosing T shirt sizes such as small, medium or large.</td></tr>
        <tr><td>Storage Policies</td><td>Approved storage capabilities, datastore placement and storage quotas exposed to workloads.</td></tr>
        <tr><td>Network choices</td><td>Namespace networking, reachable networks and available platform network services.</td></tr>
        <tr><td>Services</td><td>Approved Supervisor Services and platform capabilities available inside the namespace.</td></tr>
        <tr><td>Identity</td><td>Users, groups and platform level permissions assigned to the namespace.</td></tr>
        <tr><td>Zones</td><td>Eligible infrastructure placement and failure domains available to workloads in the namespace.</td></tr>
      </tbody>`;
  }

  const entitlementIntro = entitlement?.querySelector("p:not(.section-number)");
  if (entitlementIntro) {
    entitlementIntro.textContent =
      "A vSphere Namespace is a governed resource envelope where VKS clusters, vSphere Pods, VM Service virtual machines and enabled Supervisor Services can run. The platform team defines which capacity, VM Classes, storage policies, networks, services, identities and zones that namespace may consume.";
  }
  entitlement?.querySelector(".namespace-structure-intro")?.remove();
  entitlement?.querySelector(".namespace-inventory-visual")?.remove();

  const zones = document.querySelector("#zones");
  if (zones) {
    zones.innerHTML = `
      <p class="section-number">05 · Understand zones</p>
      <h2>A vSphere Zone is the infrastructure boundary; management and workload describe how Supervisor uses it.</h2>
      <p class="section-lead">A <strong>vSphere Zone</strong> represents a placement and failure domain backed by one or more compatible vSphere clusters. When that zone is bound to Supervisor, it receives a role.</p>

      <div class="zone-role-grid">
        <div class="zone-role-card"><span>Management Zone</span><h3>Runs Supervisor control plane components</h3><p>Supervisor can be deployed across one or three Management Zones. Using three Management Zones distributes the control plane across failure domains.</p></div>
        <div class="zone-role-card"><span>Workload Zone</span><h3>Provides capacity for workloads</h3><p>Additional zones can be attached for VKS nodes, VM Service VMs, vSphere Pods and other Supervisor workloads. A zone binding defaults to the workload role when no role is specified.</p></div>
      </div>

      <div class="plain-callout"><strong>Keep the terms separate:</strong> the vSphere Zone is the infrastructure object. <em>Management</em> and <em>Workload</em> describe the role that the zone plays for a particular Supervisor.</div>

      <div class="zone-flow-heading"><span>Step 1 · Conceptual view</span><h3>First picture one management building versus three management buildings.</h3><p>This comparison is about Supervisor control plane placement. The green dot represents the mapped vSphere cluster or eligible placement target inside each zone.</p></div>

      <figure class="visual zone-concept-visual">
        <svg viewBox="0 0 1000 650" role="img" aria-label="Conceptual comparison of one Management Zone and three Management Zones">
          <rect x="16" y="16" width="968" height="618" rx="28" fill="#071427" stroke="#2b557e" stroke-width="2"/>
          <text x="500" y="66" text-anchor="middle" fill="#65e7ff" font-size="26" font-weight="800">ONE MANAGEMENT ZONE VS THREE MANAGEMENT ZONES</text>

          <rect x="55" y="105" width="405" height="405" rx="24" fill="#0d203a" stroke="#ffc96b" stroke-width="2"/>
          <text x="257" y="150" text-anchor="middle" fill="#fff" font-size="25" font-weight="800">One Management Zone</text>
          <rect x="105" y="185" width="305" height="210" rx="18" fill="#17375d" stroke="#ffc96b" stroke-width="2"/>
          <text x="257" y="225" text-anchor="middle" fill="#fff" font-size="22" font-weight="700">Zone A</text>
          <rect x="145" y="252" width="225" height="96" rx="14" fill="#102848" stroke="#65e7ff"/>
          <text x="257" y="282" text-anchor="middle" fill="#fff" font-size="17" font-weight="700"><tspan x="257">Mapped vSphere</tspan><tspan x="257" dy="22">cluster</tspan></text>
          <circle cx="257" cy="325" r="13" fill="#42e3b4"/>
          <text x="257" y="438" text-anchor="middle" fill="#ffc96b" font-size="18" font-weight="800">One control plane placement domain</text>
          <text x="257" y="468" text-anchor="middle" fill="#c7d6e9" font-size="15"><tspan x="257">Simpler design, but a zone level failure</tspan><tspan x="257" dy="22">affects the control plane placed there.</tspan></text>

          <rect x="540" y="105" width="405" height="405" rx="24" fill="#0d203a" stroke="#42e3b4" stroke-width="2"/>
          <text x="742" y="150" text-anchor="middle" fill="#fff" font-size="25" font-weight="800">Three Management Zones</text>
          ${[0, 1, 2].map((i) => {
            const x = 575 + i * 112;
            const labels = ["A", "B", "C"];
            const strokes = ["#65e7ff", "#9b7cff", "#42e3b4"];
            return `<rect x="${x}" y="190" width="92" height="205" rx="16" fill="#17375d" stroke="${strokes[i]}" stroke-width="2"/>
              <text x="${x + 46}" y="230" text-anchor="middle" fill="${strokes[i]}" font-size="24" font-weight="800">${labels[i]}</text>
              <rect x="${x + 15}" y="260" width="62" height="78" rx="10" fill="#102848" stroke="${strokes[i]}"/>
              <circle cx="${x + 46}" cy="360" r="14" fill="#42e3b4"/>`;
          }).join("")}
          <text x="742" y="438" text-anchor="middle" fill="#42e3b4" font-size="18" font-weight="800">Three control plane placement domains</text>
          <text x="742" y="468" text-anchor="middle" fill="#c7d6e9" font-size="15"><tspan x="742">Supervisor control plane components can be</tspan><tspan x="742" dy="22">distributed across independent failure domains.</tspan></text>

          <rect x="170" y="545" width="660" height="52" rx="15" fill="#102848" stroke="#294f78"/>
          <circle cx="212" cy="571" r="13" fill="#42e3b4"/>
          <text x="242" y="578" fill="#d8e6fb" font-size="17">Green dot = mapped vSphere cluster or eligible placement target</text>
        </svg>
        <figcaption>This first view explains the control plane choice. It does not yet show separate Workload Zones.</figcaption>
      </figure>

      <div class="zone-flow-heading"><span>Step 2 · vCenter view</span><h3>Now translate the same one versus three zone idea into vCenter inventory.</h3><p>A vSphere Namespace does not contain physical ESXi hosts. In this architecture example, each Management Zone maps to one vSphere cluster. vCenter represents the namespace through a namespace resource pool on every mapped cluster; the ESXi hosts underneath provide the actual compute capacity.</p></div>

      <figure class="visual zone-vcenter-visual">
        <svg viewBox="0 0 1320 810" role="img" aria-label="vCenter comparison of one Management Zone and three Management Zones with namespace resource pools and ESXi hosts">
          <rect x="16" y="16" width="1288" height="778" rx="28" fill="#071427" stroke="#2b557e" stroke-width="2"/>
          <text x="660" y="62" text-anchor="middle" fill="#65e7ff" font-size="27" font-weight="800">ACTUAL vCENTER VIEW: ONE MANAGEMENT ZONE VS THREE</text>
          <text x="660" y="94" text-anchor="middle" fill="#b9c8df" font-size="16">How the same vSphere Namespace is represented across the mapped clusters.</text>

          <rect x="42" y="125" width="525" height="590" rx="24" fill="#0d203a" stroke="#65e7ff" stroke-width="2"/>
          <text x="304" y="165" text-anchor="middle" fill="#65e7ff" font-size="23" font-weight="800">ONE MANAGEMENT ZONE</text>
          <rect x="154" y="190" width="300" height="60" rx="13" fill="#15375b" stroke="#65e7ff"/>
          <text x="304" y="227" text-anchor="middle" fill="#fff" font-size="19" font-weight="800">Supervisor: prod supervisor</text>
          <path d="M304 250V285" stroke="#65e7ff" stroke-width="3"/>
          <rect x="105" y="285" width="398" height="355" rx="20" fill="#102848" stroke="#65e7ff"/>
          <text x="304" y="323" text-anchor="middle" fill="#65e7ff" font-size="20" font-weight="800">Management Zone A</text>
          <rect x="152" y="345" width="304" height="58" rx="12" fill="#17375d" stroke="#7da9d8"/>
          <text x="304" y="381" text-anchor="middle" fill="#fff" font-size="18" font-weight="800">Cluster A</text>
          <rect x="152" y="425" width="304" height="86" rx="14" fill="#5f5af5"/>
          <text x="304" y="457" text-anchor="middle" fill="#fff" font-size="18" font-weight="800">payments prod</text>
          <text x="304" y="484" text-anchor="middle" fill="#eef7ff" font-size="14">Namespace resource pool</text>
          ${[0, 1, 2].map((i) => {
            const x = 165 + i * 95;
            return `<rect x="${x}" y="535" width="74" height="58" rx="10" fill="#142a49" stroke="#4e739f"/>
              <rect x="${x + 13}" y="547" width="48" height="6" rx="3" fill="#65e7ff"/>
              <circle cx="${x + 24}" cy="572" r="4" fill="#42e3b4"/>
              <circle cx="${x + 38}" cy="572" r="4" fill="#42e3b4"/>
              <text x="${x + 37}" y="615" text-anchor="middle" fill="#d9e7f8" font-size="12">ESXi ${i + 1}</text>`;
          }).join("")}
          <text x="304" y="684" text-anchor="middle" fill="#c7d6e9" font-size="14">One mapped zone → one resource pool presence</text>

          <rect x="598" y="125" width="680" height="590" rx="24" fill="#0d203a" stroke="#42e3b4" stroke-width="2"/>
          <text x="938" y="165" text-anchor="middle" fill="#42e3b4" font-size="23" font-weight="800">THREE MANAGEMENT ZONES</text>
          <rect x="788" y="190" width="300" height="60" rx="13" fill="#15375b" stroke="#65e7ff"/>
          <text x="938" y="227" text-anchor="middle" fill="#fff" font-size="19" font-weight="800">Supervisor: prod supervisor</text>
          <path d="M938 250V275M938 275H705M938 275H1171M705 275V300M938 275V300M1171 275V300" fill="none" stroke="#65e7ff" stroke-width="3"/>

          ${[0, 1, 2].map((i) => {
            const x = 625 + i * 212;
            const labels = ["A", "B", "C"];
            const strokes = ["#65e7ff", "#9b7cff", "#42e3b4"];
            return `<rect x="${x}" y="300" width="190" height="340" rx="18" fill="#102848" stroke="${strokes[i]}" stroke-width="2"/>
              <text x="${x + 95}" y="336" text-anchor="middle" fill="${strokes[i]}" font-size="18" font-weight="800">Zone ${labels[i]}</text>
              <rect x="${x + 20}" y="355" width="150" height="50" rx="10" fill="#17375d" stroke="#7da9d8"/>
              <text x="${x + 95}" y="387" text-anchor="middle" fill="#fff" font-size="15" font-weight="800">Cluster ${labels[i]}</text>
              <rect x="${x + 20}" y="425" width="150" height="78" rx="12" fill="#5f5af5"/>
              <text x="${x + 95}" y="454" text-anchor="middle" fill="#fff" font-size="14" font-weight="800">payments prod</text>
              <text x="${x + 95}" y="478" text-anchor="middle" fill="#eef7ff" font-size="11.5">Namespace resource pool</text>
              ${[0, 1, 2].map((h) => {
                const hx = x + 22 + h * 50;
                return `<rect x="${hx}" y="526" width="42" height="48" rx="7" fill="#142a49" stroke="#4e739f"/>
                  <rect x="${hx + 8}" y="536" width="26" height="5" rx="2" fill="#65e7ff"/>
                  <circle cx="${hx + 14}" cy="557" r="3" fill="#42e3b4"/>
                  <circle cx="${hx + 24}" cy="557" r="3" fill="#42e3b4"/>
                  <text x="${hx + 21}" y="595" text-anchor="middle" fill="#d9e7f8" font-size="10.5">ESXi ${i * 3 + h + 1}</text>`;
              }).join("")}`;
          }).join("")}

          <text x="938" y="684" text-anchor="middle" fill="#c7d6e9" font-size="14">Three mapped zones → the namespace resource pool is represented on each mapped cluster</text>
          <rect x="215" y="742" width="890" height="34" rx="12" fill="#102848" stroke="#294f78"/>
          <text x="660" y="764" text-anchor="middle" fill="#d8e6fb" font-size="14">The namespace is the governed boundary; ESXi hosts supply capacity through their vSphere clusters.</text>
        </svg>
        <figcaption>Illustrative example using one cluster per Management Zone. VCF 9.1 can associate a vSphere Zone with one or more compatible clusters, but the principle remains the same: namespace capacity is represented on the mapped infrastructure.</figcaption>
      </figure>

      <div class="warning"><strong>Important:</strong> Three Management Zones improve Supervisor control plane resilience. They do not automatically make an application highly available. Application replicas, VKS cluster topology, topology spread or anti affinity rules, storage behaviour and networking must also align with the failure domain design.</div>`;
  }

  const models = document.querySelector("#models");
  if (models) {
    const legacyModelsFigure = models.querySelector("figure.visual");
    if (legacyModelsFigure && !models.querySelector(".zone-model-sequence")) {
      const sequence = document.createElement("div");
      sequence.className = "zone-model-sequence";
      sequence.innerHTML = `
        <figure class="zone-model-card"><img src="../assets/blogs/vsphere-namespaces-and-zones/model-1.svg" alt="Model 1: one Supervisor Management Zone with shared application capacity." /><figcaption>Model 1 — one Management Zone with shared application capacity.</figcaption></figure>
        <figure class="zone-model-card"><img src="../assets/blogs/vsphere-namespaces-and-zones/model-2.svg" alt="Model 2: one Supervisor Management Zone with dedicated vSphere Zones for application workloads." /><figcaption>Model 2 — one Management Zone with dedicated vSphere Zones for application workloads.</figcaption></figure>
        <figure class="zone-model-card"><img src="../assets/blogs/vsphere-namespaces-and-zones/model-3.svg" alt="Model 3: three Supervisor Management Zones with shared application capacity." /><figcaption>Model 3 — three Management Zones with shared application capacity.</figcaption></figure>
        <figure class="zone-model-card"><img src="../assets/blogs/vsphere-namespaces-and-zones/model-4.svg" alt="Model 4: three Supervisor Management Zones with dedicated vSphere Zones for application workloads." /><figcaption>Model 4 — three Management Zones with dedicated vSphere Zones for application workloads.</figcaption></figure>`;
      legacyModelsFigure.insertAdjacentElement("beforebegin", sequence);
      legacyModelsFigure.remove();
    }

    const modelTable = models.querySelector(".simple-table");
    if (modelTable) {
      const headers = modelTable.querySelectorAll("th");
      if (headers[0]) headers[0].textContent = "Validated zone model";
      if (headers[1]) headers[1].textContent = "Best fit";
      if (headers[2]) headers[2].textContent = "Main trade off";

      const labels = [
        "1 · One Management Zone, shared workload capacity",
        "2 · One Management Zone, dedicated vSphere Zones",
        "3 · Three Management Zones, shared workload capacity",
        "4 · Three Management Zones, dedicated vSphere Zones"
      ];
      modelTable.querySelectorAll("tbody tr").forEach((row, index) => {
        const first = row.querySelector("td");
        if (first && labels[index]) first.textContent = labels[index];
      });
    }

    const modelsFigure = models.querySelector("figure.visual");
    if (modelsFigure) {
      modelsFigure.innerHTML = `
        <svg viewBox="0 0 1180 900" role="img" aria-label="Two by two decision map showing four Management Zone and Workload Zone design models">
          <rect x="16" y="16" width="1148" height="868" rx="30" fill="#071427" stroke="#294f78" stroke-width="2"/>
          <text x="590" y="70" text-anchor="middle" fill="#65e7ff" font-size="34" font-weight="800">2 × 2 DECISION MAP</text>

          <text x="400" y="122" text-anchor="middle" fill="#fff" font-size="18" font-weight="800">Workloads share Management Zones</text>
          <text x="875" y="122" text-anchor="middle" fill="#fff" font-size="18" font-weight="800">Workloads use separate Workload Zones</text>

          <rect x="35" y="145" width="150" height="320" rx="18" fill="#0d203a" stroke="#294f78"/>
          <text x="110" y="245" text-anchor="middle" fill="#fff" font-size="17" font-weight="800"><tspan x="110">ONE</tspan><tspan x="110" dy="24">MANAGEMENT</tspan><tspan x="110" dy="24">ZONE</tspan></text>
          <circle cx="110" cy="365" r="13" fill="#9b7cff"/>

          <rect x="35" y="485" width="150" height="320" rx="18" fill="#0d203a" stroke="#294f78"/>
          <text x="110" y="585" text-anchor="middle" fill="#fff" font-size="17" font-weight="800"><tspan x="110">THREE</tspan><tspan x="110" dy="24">MANAGEMENT</tspan><tspan x="110" dy="24">ZONES</tspan></text>
          <circle cx="110" cy="700" r="11" fill="#9b7cff"/><circle cx="110" cy="730" r="11" fill="#42e3b4"/><circle cx="110" cy="760" r="11" fill="#42e3b4"/>

          <rect x="215" y="145" width="420" height="320" rx="22" fill="#0d203a" stroke="#ffc96b" stroke-width="2"/>
          <text x="425" y="190" text-anchor="middle" fill="#ffc96b" font-size="22" font-weight="800">MODEL 1 · SIMPLEST</text>
          <rect x="275" y="225" width="300" height="120" rx="18" fill="#102848" stroke="#65e7ff"/>
          <text x="425" y="265" text-anchor="middle" fill="#fff" font-size="19">Management + workloads</text>
          <circle cx="350" cy="310" r="17" fill="#9b7cff"/><circle cx="425" cy="310" r="17" fill="#42e3b4"/><circle cx="500" cy="310" r="17" fill="#42e3b4"/>
          <text x="425" y="410" text-anchor="middle" fill="#d7e5f8" font-size="17">Low overhead. Shared failure domain.</text>

          <rect x="665" y="145" width="470" height="320" rx="22" fill="#0d203a" stroke="#65e7ff" stroke-width="2"/>
          <text x="900" y="190" text-anchor="middle" fill="#65e7ff" font-size="22" font-weight="800">MODEL 2 · ISOLATED WORKLOADS</text>
          <rect x="720" y="225" width="150" height="120" rx="18" fill="#102848" stroke="#9b7cff"/>
          <text x="795" y="265" text-anchor="middle" fill="#fff" font-size="18">Management</text>
          <circle cx="795" cy="310" r="17" fill="#9b7cff"/>
          <rect x="900" y="225" width="180" height="120" rx="18" fill="#102848" stroke="#42e3b4"/>
          <text x="990" y="265" text-anchor="middle" fill="#fff" font-size="18">Workloads</text>
          <circle cx="960" cy="310" r="17" fill="#42e3b4"/><circle cx="1020" cy="310" r="17" fill="#42e3b4"/>
          <text x="900" y="410" text-anchor="middle" fill="#d7e5f8" font-size="17">Separate scaling and specialised hardware.</text>

          <rect x="215" y="485" width="420" height="320" rx="22" fill="#0d203a" stroke="#9b7cff" stroke-width="2"/>
          <text x="425" y="530" text-anchor="middle" fill="#9b7cff" font-size="21" font-weight="800">MODEL 3 · RESILIENT, SHARED</text>
          ${[0,1,2].map((i) => {
            const x = 270 + i * 105;
            return `<rect x="${x}" y="565" width="85" height="125" rx="15" fill="#102848" stroke="${["#65e7ff","#9b7cff","#42e3b4"][i]}"/>
              <circle cx="${x + 42}" cy="610" r="15" fill="#9b7cff"/>
              <circle cx="${x + 42}" cy="655" r="15" fill="#42e3b4"/>`;
          }).join("")}
          <text x="425" y="747" text-anchor="middle" fill="#d7e5f8" font-size="17"><tspan x="425">Higher control plane resilience,</tspan><tspan x="425" dy="22">shared workload capacity.</tspan></text>

          <rect x="665" y="485" width="470" height="320" rx="22" fill="#0d203a" stroke="#42e3b4" stroke-width="2"/>
          <text x="900" y="530" text-anchor="middle" fill="#42e3b4" font-size="21" font-weight="800">MODEL 4 · MAXIMUM SEPARATION</text>
          ${[0,1,2].map((i) => {
            const x = 710 + i * 95;
            return `<rect x="${x}" y="565" width="75" height="125" rx="15" fill="#102848" stroke="${["#65e7ff","#9b7cff","#42e3b4"][i]}"/>
              <circle cx="${x + 37}" cy="625" r="15" fill="#9b7cff"/>`;
          }).join("")}
          <rect x="1000" y="565" width="95" height="125" rx="15" fill="#102848" stroke="#ffc96b"/>
          <circle cx="1030" cy="625" r="15" fill="#42e3b4"/><circle cx="1065" cy="625" r="15" fill="#42e3b4"/>
          <text x="900" y="747" text-anchor="middle" fill="#d7e5f8" font-size="17"><tspan x="900">Strong separation, highest cost</tspan><tspan x="900" dy="22">and operational complexity.</tspan></text>

          <rect x="185" y="830" width="810" height="38" rx="12" fill="#102848" stroke="#294f78"/>
          <text x="590" y="855" text-anchor="middle" fill="#d8e6fb" font-size="15">The four patterns result from two design choices, not four unrelated architectures.</text>
        </svg>
        <figcaption>Combine the Management Zone choice with the workload capacity choice to identify the appropriate architecture pattern.</figcaption>`;
    }

    let note = models.querySelector(".models-validation-note");
    if (!note) {
      note = document.createElement("div");
      note.className = "plain-callout models-validation-note";
      modelsFigure?.insertAdjacentElement("afterend", note);
    }
    note.innerHTML =
      "<strong>Why there are four models:</strong> Combine the Supervisor control plane choice, one or three Management Zones, with the workload capacity choice: shared Management Zone capacity or dedicated vSphere Zones. These are the four design patterns described in the VKS advanced design guidance.";
  }

  const mappingParagraph = document.querySelector("#mapping > p:not(.section-number)");
  if (mappingParagraph) {
    mappingParagraph.textContent =
      "A vSphere Namespace can be mapped to as many as three eligible vSphere Zones. Mapping controls where namespace backed workloads may be placed; it does not by itself guarantee workload distribution or high availability.";
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
      "<strong>Important:</strong> The VKS cluster topology, application replicas, topology spread or anti affinity rules, storage policy and network design must still align with the selected failure domains. Zone mapping alone does not make an application highly available.";
    const figure = mappingSection.querySelector("figure");
    mappingSection.insertBefore(note, figure || null);
  }

  const style = document.createElement("style");
  style.textContent = `
    #bridge .bridge strong{display:inline;margin-right:.3rem}
    .bridge-analogy-visual{margin:30px auto;max-width:1040px}
    .bridge-analogy-visual img{border-radius:16px;display:block;height:auto;width:100%}
    .boundary-clarity-note{margin-top:24px}
    #boundary figure.visual{margin:32px auto;max-width:1080px}
    #entitlement .simple-table{background:#fff;border:1px solid #dce6f5;border-collapse:separate;border-radius:18px;box-shadow:0 16px 36px rgba(16,38,74,.07);overflow:hidden}
    #entitlement .simple-table th{background:#f4f7fc;padding:16px 18px}
    #entitlement .simple-table td{padding:18px}
    #entitlement .simple-table th:first-child,#entitlement .simple-table td:first-child{width:24%}
    #entitlement .simple-table th:last-child,#entitlement .simple-table td:last-child{width:76%}
    .zone-role-grid{display:grid;gap:18px;grid-template-columns:repeat(2,minmax(0,1fr));margin:28px 0}
    .zone-role-card{background:#fff;border:1px solid #dce6f5;border-radius:18px;box-shadow:0 16px 34px rgba(16,38,74,.07);padding:22px}
    .zone-role-card span,.zone-flow-heading span{color:#2a5be0;font-size:.76rem;font-weight:800;letter-spacing:.09em;text-transform:uppercase}
    .zone-role-card h3,.zone-flow-heading h3{margin:8px 0 10px}
    .zone-role-card p{margin:0}
    .zone-flow-heading{margin:42px 0 18px}
    .zone-flow-heading h3{font-size:clamp(1.5rem,2.4vw,2.15rem)}
    .zone-flow-heading p{max-width:920px}
    .zone-concept-visual,.zone-vcenter-visual{margin:24px auto 38px;max-width:1180px}
    .zone-concept-visual svg,.zone-vcenter-visual svg{display:block;height:auto;width:100%}
    .zone-validation-note,.models-validation-note{margin-top:22px}
    #models figure.visual{margin:28px auto;max-width:1180px}
    #models figure.visual svg{display:block;height:auto;width:100%}
    #models .zone-model-sequence{display:grid;gap:28px;margin:30px 0}
    #models .zone-model-card{background:#fff;border-radius:22px;box-shadow:0 20px 45px rgba(0,0,0,.18);margin:0;overflow:hidden;padding:0}
    #models .zone-model-card img{display:block;height:auto;width:100%}
    /* These captions sit on a white card footer, so they need ink—not the
       pale text colour used elsewhere in the dark Models section. */
    #models .zone-model-card figcaption{background:#fff;color:#263b57!important;font-size:.95rem;font-weight:600;line-height:1.55;padding:14px 18px 18px}
    #models.dark-section .simple-table{background:rgba(10,24,48,.78);border:1px solid rgba(119,174,242,.28);border-collapse:separate;border-radius:18px;overflow:hidden}
    #models.dark-section .simple-table th{background:rgba(31,57,92,.72);color:#65e7ff!important;font-size:.8rem;letter-spacing:.08em;padding:17px 18px}
    #models.dark-section .simple-table td{border-bottom:1px solid rgba(166,194,228,.26);color:#d7e5f8!important;font-size:1rem;line-height:1.55;padding:19px 18px}
    #models.dark-section .simple-table td:first-child{color:#fff!important;font-weight:800}
    #models.dark-section .simple-table tr:last-child td{border-bottom:0}
    #models.dark-section .table-scroll::after{display:none}
    #models .models-validation-note{background:#f4f7fc!important;border-left:4px solid #2a5be0!important;color:#10213a!important}
    #models .models-validation-note strong{color:#10213a!important}
    /* Light callout panels inside the dark challenge must not inherit its
       pale/white text colour. */
    #challenge .plain-callout{background:#eef4ff!important;border:1px solid #c9d8f4!important;border-left:5px solid #2a5be0!important;color:#172a45!important}
    #challenge .plain-callout strong{color:#10213a!important}
    #challenge .warning{color:#5d4219!important}
    #challenge .warning strong{color:#5d4219!important}
    @media(max-width:760px){
      .zone-role-grid{grid-template-columns:1fr}
      #entitlement .simple-table th:first-child,#entitlement .simple-table td:first-child{width:34%}
      #entitlement .simple-table th:last-child,#entitlement .simple-table td:last-child{width:66%}
      .zone-concept-visual,.zone-vcenter-visual,#models figure.visual{padding:8px}
    }`;
  document.head.appendChild(style);
}
