const showModulesButton=document.querySelector(".show-modules");
const additionalModules=document.querySelector(".curriculum-drawer");
if(showModulesButton&&additionalModules){showModulesButton.addEventListener("click",()=>{const isExpanded=showModulesButton.getAttribute("aria-expanded")==="true";showModulesButton.setAttribute("aria-expanded",String(!isExpanded));additionalModules.hidden=isExpanded;showModulesButton.textContent=isExpanded?"View published module":"Close module list";});}
const quiz=document.querySelector("#sample-quiz");
const quizResult=document.querySelector("#quiz-result");
if(quiz&&quizResult){quiz.addEventListener("submit",event=>{event.preventDefault();const answer=new FormData(quiz).get("answer");quizResult.hidden=false;quizResult.classList.remove("correct","incorrect");if(!answer){quizResult.classList.add("incorrect");quizResult.textContent="Choose an answer before checking your reasoning.";return;}if(answer==="b"){quizResult.classList.add("correct");quizResult.innerHTML="<strong>Correct.</strong> VKS preserves the Kubernetes API and workload model while integrating lifecycle, policy, networking, and infrastructure services with VCF.";localStorage.setItem("vks-field-guide-sample-quiz","complete");return;}quizResult.classList.add("incorrect");quizResult.innerHTML="<strong>Not quite.</strong> Start from what remains familiar: Kubernetes APIs and workloads. Then explain the lifecycle and infrastructure responsibilities integrated through VCF.";});if(localStorage.getItem("vks-field-guide-sample-quiz")==="complete"){quizResult.hidden=false;quizResult.classList.add("correct");quizResult.textContent="You previously completed this knowledge check. Your progress is stored only in this browser.";}}
if(location.pathname.endsWith("002-kubernetes-foundations-reviewed.html")){document.title="Kubernetes Foundations Through a Shopping Mall Mental Model | Sourabh Shrivastav";const backLink=document.querySelector(".article-hero .back-link");if(backLink){backLink.href="../index.html#loops";backLink.textContent="← Learning Loops";}const moduleBadge=document.querySelector(".article-hero .article-kicker span:nth-child(2)");if(moduleBadge)moduleBadge.textContent="Module 02";const tocLabel=document.querySelector(".article-toc > span");if(tocLabel)tocLabel.textContent="In this blog";}
if(location.pathname.endsWith("003-vcf-and-vks-core-concepts.html")){
  const servicesParagraph=document.querySelector("#services > p:not(.section-number)");
  if(servicesParagraph)servicesParagraph.textContent="Supervisor Services are services made available through the Supervisor. Examples include VKS, Velero, Harbor, Contour and Argo CD. Not every environment will enable every service. A platform team should enable only what the operating model needs.";
  const runtimeComparisonTable=document.querySelector("#runtime .quick-map-table");
  if(runtimeComparisonTable)runtimeComparisonTable.remove();
  const challenge=document.querySelector("#challenge");
  if(challenge){challenge.classList.add("dark-section");challenge.innerHTML=`
    <p class="section-number">18 · Architecture challenge</p>
    <h2>Design a VKS platform for financial services teams.</h2>
    <p>You are helping a financial services organisation design a governed private Kubernetes platform for three groups: Payments, Risk Analytics and Customer Reporting.</p>
    <div class="challenge-brief">
      <h3>The platform scope</h3>
      <ul>
        <li><strong>Payments</strong> runs customer-facing APIs that require strong availability and controlled network exposure.</li>
        <li><strong>Risk Analytics</strong> runs compute-intensive workloads with different scaling and storage requirements.</li>
        <li><strong>Customer Reporting</strong> runs internal reporting services and may require selected VM-based database workloads.</li>
      </ul>
      <h3>Requirements</h3>
      <ul>
        <li>Each group needs a clear resource, access and policy boundary.</li>
        <li>Only approved Kubernetes releases, VM Classes and Storage Policies may be consumed.</li>
        <li>Cluster designs must be repeatable rather than created differently by every team.</li>
        <li>Platform resilience must account for infrastructure failure domains.</li>
        <li>VM-based workloads may be used only where Kubernetes is not the appropriate runtime.</li>
        <li>Backup and restore responsibilities must be defined before production onboarding.</li>
        <li>Platform-team and application-team responsibilities must remain explicit.</li>
      </ul>
    </div>
    <div class="traffic-path">VCF infrastructure → Supervisor → vSphere Namespace → VKS cluster → Kubernetes namespaces → application workloads</div>
    <p><strong>Try it yourself first.</strong> Sketch the platform and answer these questions before opening the reference design.</p>
    <ol class="challenge-questions">
      <li>Would you create one vSphere Namespace per team, environment or regulatory boundary?</li>
      <li>How many VKS clusters would you deploy, and which workloads could safely share a cluster?</li>
      <li>Which VM Classes and Storage Policies should be exposed to each team?</li>
      <li>How would ClusterClass be used to standardise approved cluster patterns?</li>
      <li>How would supported Kubernetes releases be governed for creation and upgrades?</li>
      <li>Which workloads, if any, justify VM Service rather than VKS?</li>
      <li>How would you design for infrastructure-zone failure?</li>
      <li>What backup and restore scope should Velero cover?</li>
      <li>Which responsibilities belong to the platform team and which belong to application teams?</li>
      <li>What evidence would you require before approving the design for production?</li>
    </ol>
    <details class="solution-reveal">
      <summary>Reveal one reasonable design</summary>
      <div class="solution-content">
        <p><strong>This is not the only valid architecture.</strong> The objective is to make defensible choices and explain the operational trade-offs.</p>
        <div class="solution-grid">
          <div class="solution-card"><strong>Governance boundaries</strong>Create separate vSphere Namespaces for major team, environment or compliance boundaries where quotas, permissions and service access must differ.</div>
          <div class="solution-card"><strong>Cluster topology</strong>Use separate production VKS clusters where failure isolation, upgrade independence or regulatory separation is required. Share clusters only when ownership and risk profiles genuinely align.</div>
          <div class="solution-card"><strong>Approved consumption</strong>Expose only approved VM Classes, VM Storage Policies, content sources and network paths through each vSphere Namespace.</div>
          <div class="solution-card"><strong>Standardisation</strong>Use the supported VKS ClusterClass and its published variables to define repeatable control-plane, worker, networking, storage and add-on patterns.</div>
          <div class="solution-card"><strong>Release lifecycle</strong>Allow only Kubernetes releases supported by the installed VKS service and compatible ClusterClass. Test upgrades in non-production before promotion.</div>
          <div class="solution-card"><strong>VM workloads</strong>Use VM Service only for workloads that require a VM operating model or cannot yet run appropriately on Kubernetes.</div>
          <div class="solution-card"><strong>Availability</strong>Align Supervisor and workload placement with supported vSphere Zone and failure-domain design, while ensuring the application itself is distributed and resilient.</div>
          <div class="solution-card"><strong>Protection</strong>Define Velero scope for Kubernetes resources and persistent data, then align it with storage-level protection, retention, recovery objectives and restore testing.</div>
        </div>
        <ul>
          <li>The platform team owns Supervisor, service lifecycle, approved releases, Namespace governance, infrastructure policies and platform observability.</li>
          <li>Application teams own workload manifests, Kubernetes namespaces, application security, readiness, scaling and application-level recovery validation.</li>
          <li>Production approval should include architecture review, failure testing, upgrade validation, backup restore testing, capacity evidence and documented ownership.</li>
        </ul>
        <div class="story-flow"><strong>Corporate office memory hook</strong><ol><li><strong>vSphere Namespace</strong> = governed department wing.</li><li><strong>VKS cluster</strong> = approved project area.</li><li><strong>ClusterClass</strong> = standard project blueprint.</li><li><strong>VM Class</strong> = approved workstation size.</li><li><strong>VM Storage Policy</strong> = approved storage capability.</li><li><strong>Velero</strong> = workload backup and recovery service.</li></ol></div>
      </div>
    </details>`;}
  const style=document.createElement("style");
  style.textContent=`
    .dark-section p,.dark-section .dark-intro,.dark-section .learning-note,.dark-section .quick-map-table th,.dark-section .quick-map-table td{color:#b8c7df!important;opacity:1!important}
    .dark-section h3,.dark-section .learning-note strong,.dark-section .quick-map-table th:first-child,.dark-section .quick-map-table td:first-child,.dark-section .quick-map-table td:nth-child(2){color:#fff!important;opacity:1!important}
    .challenge-brief{background:#0c1a31;border:1px solid rgba(132,174,225,.3);border-radius:20px;margin:26px 0;padding:24px}
    .challenge-brief h3{color:#fff;margin:0 0 12px}.challenge-brief h3+ul{margin-top:0}.challenge-brief p,.challenge-brief li{color:#dbe8ff!important}
    .traffic-path{background:rgba(72,124,255,.12);border:1px solid rgba(112,157,255,.35);border-radius:14px;color:#fff;font-weight:700;line-height:1.7;margin:20px 0;padding:16px;text-align:center}
    .challenge-questions{counter-reset:challenge;margin:26px 0;padding:0}
    .challenge-questions li{background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.12);border-radius:14px;color:#dbe8ff!important;list-style:none;margin:10px 0;padding:14px 16px 14px 52px;position:relative}
    .challenge-questions li::before{align-items:center;background:#2f6fed;border-radius:50%;color:#fff;content:counter(challenge);counter-increment:challenge;display:flex;font-size:.8rem;font-weight:800;height:28px;justify-content:center;left:14px;position:absolute;top:13px;width:28px}
    .solution-reveal{background:#fff;border:1px solid #cddbf1;border-radius:18px;color:#25344b;margin-top:28px;overflow:hidden}
    .solution-reveal summary{align-items:center;background:#eef4ff;color:#10213a;cursor:pointer;display:flex;font-weight:800;justify-content:space-between;list-style:none;padding:18px 20px}
    .solution-reveal summary::-webkit-details-marker{display:none}.solution-reveal summary::after{content:"+";font-size:1.5rem;line-height:1}.solution-reveal[open] summary::after{content:"−"}
    .solution-content{padding:20px}.solution-content p,.solution-content li{color:#344256!important}.solution-grid{display:grid;gap:12px;grid-template-columns:repeat(2,minmax(0,1fr));margin:18px 0}
    .solution-card{background:#f7f9fd;border:1px solid #dce5f2;border-radius:14px;color:#344256;padding:16px}.solution-card strong{color:#10213a;display:block;margin-bottom:6px}
    .story-flow{background:#081225;border:1px solid rgba(132,174,225,.24);border-radius:20px;color:#dbe8ff;margin:30px 0;padding:24px}.story-flow li{color:#dbe8ff!important;margin:12px 0}.story-flow strong{color:#fff}
    @media(max-width:768px){.solution-grid{grid-template-columns:1fr}.challenge-brief{padding:18px}}
  `;
  document.head.appendChild(style);
}
