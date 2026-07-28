const showModulesButton=document.querySelector(".show-modules");
const additionalModules=document.querySelector(".curriculum-drawer");
if(showModulesButton&&additionalModules){showModulesButton.addEventListener("click",()=>{const isExpanded=showModulesButton.getAttribute("aria-expanded")==="true";showModulesButton.setAttribute("aria-expanded",String(!isExpanded));additionalModules.hidden=isExpanded;showModulesButton.textContent=isExpanded?"View published module":"Close module list";});}
const quiz=document.querySelector("#sample-quiz");
const quizResult=document.querySelector("#quiz-result");
if(quiz&&quizResult){quiz.addEventListener("submit",event=>{event.preventDefault();const answer=new FormData(quiz).get("answer");quizResult.hidden=false;quizResult.classList.remove("correct","incorrect");if(!answer){quizResult.classList.add("incorrect");quizResult.textContent="Choose an answer before checking your reasoning.";return;}if(answer==="b"){quizResult.classList.add("correct");quizResult.innerHTML="<strong>Correct.</strong> VKS preserves the Kubernetes API and workload model while integrating lifecycle, policy, networking, and infrastructure services with VCF.";localStorage.setItem("vks-field-guide-sample-quiz","complete");return;}quizResult.classList.add("incorrect");quizResult.innerHTML="<strong>Not quite.</strong> Start from what remains familiar: Kubernetes APIs and workloads. Then explain the lifecycle and infrastructure responsibilities integrated through VCF.";});if(localStorage.getItem("vks-field-guide-sample-quiz")==="complete"){quizResult.hidden=false;quizResult.classList.add("correct");quizResult.textContent="You previously completed this knowledge check. Your progress is stored only in this browser.";}}
if(location.pathname.endsWith("002-kubernetes-foundations-reviewed.html")){document.title="Kubernetes Foundations Through a Shopping Mall Mental Model | Sourabh Shrivastav";const backLink=document.querySelector(".article-hero .back-link");if(backLink){backLink.href="../index.html#loops";backLink.textContent="← Learning Loops";}const moduleBadge=document.querySelector(".article-hero .article-kicker span:nth-child(2)");if(moduleBadge)moduleBadge.textContent="Module 02";const tocLabel=document.querySelector(".article-toc > span");if(tocLabel)tocLabel.textContent="In this blog";}
if(location.pathname.endsWith("003-vcf-and-vks-core-concepts.html")){
  const articleMeta=document.querySelector(".article-hero .article-meta");
  if(articleMeta)articleMeta.remove();
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
        <p><strong>This is not the only valid architecture.</strong> The objective is to answer each design question with a defensible production pattern and clear trade-offs.</p>
        <div class="solution-grid">
          <div class="solution-card"><strong>1. Namespace model</strong>Create separate vSphere Namespaces by team and environment: payments-prod, payments-nonprod, risk-prod, risk-nonprod, reporting-prod and reporting-nonprod. Add a separate regulatory boundary only when compliance, access or data-residency requirements materially differ.</div>
          <div class="solution-card"><strong>2. VKS cluster model</strong>Use one dedicated production VKS cluster for each team. Payments must remain isolated for availability, network control and independent upgrades. Risk Analytics should remain separate to avoid noisy-neighbour pressure. Customer Reporting can use a smaller dedicated production cluster. Non-production may be shared only when governance and blast-radius requirements align.</div>
          <div class="solution-card"><strong>3. VM Classes and Storage Policies</strong>Payments receives medium and large node classes plus resilient production storage. Risk receives large, extra-large or high-memory classes plus high-throughput storage. Reporting receives small and medium classes plus standard production storage and a VM-oriented storage policy only for an approved VM Service database.</div>
          <div class="solution-card"><strong>4. ClusterClass patterns</strong>Publish three approved patterns: Payments, Analytics and Reporting. Each pattern defines a three-node control plane, approved worker topology, VM Classes, storage, networking and required add-ons. Teams select an approved pattern and supply only permitted variables rather than authoring unrestricted ClusterClass definitions.</div>
          <div class="solution-card"><strong>5. Kubernetes release governance</strong>Maintain an approved release catalogue based on installed VKS support, ClusterClass compatibility, CNI, CSI and add-on validation, security approval and non-production testing. Production may use only the current approved release or the immediately previous approved release. Payments upgrades require an explicit maintenance and rollback plan.</div>
          <div class="solution-card"><strong>6. VM Service use</strong>Use VM Service only for a legacy reporting database when vendor support, guest-OS operations or technical constraints make Kubernetes unsuitable. Payments APIs, Risk jobs and reporting application services should remain on VKS.</div>
          <div class="solution-card"><strong>7. Zone-failure design</strong>Use a supported three-zone architecture where available. Distribute Supervisor and VKS control-plane placement, worker nodes and application replicas across failure domains. Apply topology spread or anti-affinity and use storage policies that meet the required availability model. Three zones do not create application HA unless the workload is also distributed.</div>
          <div class="solution-card"><strong>8. Backup and restore</strong>Use Velero for Kubernetes resources and supported persistent data, combined with storage snapshots, database-native backup for transactional databases, VM backup for VM Service workloads and off-platform retention. Every team must complete a restore test before production approval.</div>
          <div class="solution-card"><strong>9. Responsibility model</strong>The platform team owns Supervisor, VKS lifecycle, approved releases, ClusterClass, vSphere Namespaces, VM Classes, Storage Policies, infrastructure networking, load-balancer integration, platform observability and capacity. Application teams own workload manifests, Kubernetes namespaces, Services, ingress, probes, requests and limits, secrets, NetworkPolicies, scaling and application recovery validation.</div>
          <div class="solution-card"><strong>10. Production evidence</strong>Require an approved architecture diagram, boundary justification, ClusterClass and release selection, capacity model, storage mapping, zone-failure test, replica-distribution evidence, NetworkPolicy validation, security review, backup configuration, successful restore test, non-production upgrade test, monitoring coverage, documented RTO and RPO, named owners and rollback procedures.</div>
        </div>
        <div class="story-flow"><strong>Recommended production hierarchy</strong><ol><li><strong>VCF infrastructure</strong> provides compute, network and storage.</li><li><strong>Three-zone Supervisor</strong> provides the governed platform layer.</li><li><strong>Separate vSphere Namespaces</strong> isolate teams and environments.</li><li><strong>Dedicated production VKS clusters</strong> provide lifecycle and failure isolation.</li><li><strong>Approved ClusterClass and Kubernetes releases</strong> standardise cluster creation and upgrades.</li><li><strong>Team-specific VM Classes and Storage Policies</strong> expose only approved consumption choices.</li><li><strong>Kubernetes namespaces and workloads</strong> remain under application-team ownership.</li></ol></div>
        <p><strong>Customer Reporting exception:</strong> an approved legacy database may run through VM Service in the reporting vSphere Namespace, while its application services continue to run on VKS.</p>
        <p><strong>Design principle:</strong> use separate boundaries wherever security, lifecycle, failure isolation, capacity or compliance requirements differ.</p>
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
  window.addEventListener("DOMContentLoaded",()=>{
    const serviceCell=Array.from(document.querySelectorAll("#mapping .quick-map-table tbody tr")).find(row=>row.cells[0]?.textContent.trim()==="Supervisor Services")?.cells[2];
    if(serviceCell)serviceCell.textContent="VKS, Velero, Harbor, Contour, Argo CD and other enabled services.";

    const zones=document.querySelector("#zones");
    if(zones){
      const paragraphs=zones.querySelectorAll("p:not(.section-number)");
      if(paragraphs[0])paragraphs[0].textContent="A vSphere Zone represents an infrastructure failure domain. A Supervisor may use one zone or a supported three-zone topology to improve control-plane and workload resilience.";
      if(paragraphs[1])paragraphs[1].textContent="Think of vSphere Zones as separate office blocks or building sections: Block A, Block B and Block C. If one block has a problem, workloads designed across the remaining failure domains can continue, depending on application placement, storage policy and platform design.";
    }

    const constructs=document.querySelector("#constructs");
    if(constructs){
      const headings=Array.from(constructs.querySelectorAll("h3"));
      const releaseHeading=headings.find(item=>item.textContent.trim().startsWith("VKr:"));
      if(releaseHeading){
        releaseHeading.textContent="KubernetesRelease: the supported Kubernetes release";
        const releaseParagraph=releaseHeading.nextElementSibling;
        if(releaseParagraph)releaseParagraph.textContent="KubernetesRelease represents a Kubernetes release made available through the installed VKS service. The compatible ClusterClass and VKS service version determine which releases a cluster can consume. Older TKR or VKr terminology may still appear in legacy material, but KubernetesRelease is the clearer current term for VCF 9.1-aligned guidance.";
      }
    }

    document.querySelectorAll("#mapping .quick-map-table tbody tr").forEach(row=>{
      if(row.cells[0]?.textContent.trim()==="VKr"){
        row.cells[0].textContent="KubernetesRelease";
        row.cells[1].textContent="Approved operating standard";
        row.cells[2].textContent="Supported Kubernetes release made available through VKS.";
      }
    });

    const q3=document.querySelector('#knowledge .knowledge-card[data-question="q3"]');
    if(q3){
      const question=q3.querySelector("p");
      const options=q3.querySelectorAll(".knowledge-options button");
      const review=q3.querySelector(".answer-review");
      if(question)question.textContent="What is the purpose of a KubernetesRelease in VKS?";
      if(options[0])options[0].textContent="A. It represents a Kubernetes release made available by Kubernetes Service for compatible VKS clusters";
      if(options[1])options[1].textContent="B. It selects the vCenter inventory folder for cluster nodes";
      if(options[2])options[2].textContent="C. It chooses the load-balancer Service Engine";
      if(options[3])options[3].textContent="D. It configures the cluster DNS server";
      if(review)review.innerHTML='<strong>Correct answer: A.</strong><ul><li><strong>Why A is correct:</strong> KubernetesRelease represents a Kubernetes release made available through the installed VKS service. ClusterClass and VKS compatibility determine whether a cluster can consume it.</li><li><strong>Why B is wrong:</strong> Inventory placement is a vSphere organisation concern, not the role of KubernetesRelease.</li><li><strong>Why C is wrong:</strong> Load-balancer implementation is a networking concern, not Kubernetes release selection.</li><li><strong>Why D is wrong:</strong> DNS is cluster and network configuration; KubernetesRelease represents the supported Kubernetes software release.</li></ul>';
    }
  });
}