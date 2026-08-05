(() => {
  if (!location.pathname.endsWith("004-vsphere-namespaces-and-zones.html")) return;

  const replacements = [
    ["Fraud Analytics", "Risk Analytics"],
    ["Fraud wing", "Risk analytics wing"],
    ["fraud-gpu", "risk-analytics"],
    ["Fraud team", "Risk Analytics team"]
  ];

  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  const textNodes = [];
  while (walker.nextNode()) textNodes.push(walker.currentNode);
  textNodes.forEach((node) => {
    let value = node.nodeValue;
    replacements.forEach(([from, to]) => {
      value = value.replaceAll(from, to);
    });
    node.nodeValue = value;
  });

  const toc = document.querySelector(".article-toc");
  if (toc) {
    toc.innerHTML = `
      <span>In this blog</span>
      <a href="#bridge"><small>01</small> Bridge from Blog 3</a>
      <a href="#boundary"><small>02</small> Choose the namespace boundary</a>
      <a href="#entitlement"><small>03</small> Design the entitlement</a>
      <a href="#access"><small>04</small> Separate the access layers</a>
      <a href="#zones"><small>05</small> Understand vSphere Zones</a>
      <a href="#two-decisions"><small>06</small> Make the two zone decisions</a>
      <a href="#models"><small>07</small> Compare the four models</a>
      <a href="#mapping"><small>08</small> Map namespaces to zones</a>
      <a href="#scenario"><small>09</small> Walk through a design</a>
      <a href="#responsibility"><small>10</small> Assign responsibilities</a>
      <a href="#vcf91"><small>11</small> Understand the VCF 9.1 context</a>
      <a href="#knowledge"><small>12</small> Knowledge check</a>
      <a href="#challenge"><small>13</small> Architecture challenge</a>
      <a href="#takeaways"><small>14</small> Key takeaways</a>
      <a class="toc-source-link" href="#sources"><small>REF</small> Sources and validation</a>`;
  }

  const vcf91 = document.querySelector("#vcf91");
  if (vcf91) {
    vcf91.innerHTML = `
      <p class="section-number">11 · VCF 9.1 context</p>
      <h2>VCF 9.1 gives administrators more precise controls without changing the design sequence.</h2>
      <p class="section-lead">The APIs are useful implementation details. For the reader, four practical points matter.</p>

      <div class="vcf91-grid vcf91-grid-simple">
        <article><span>Supervisor placement</span><h3>Zone bindings are explicit</h3><p>Management and Workload Zone relationships are configured as Supervisor-to-zone bindings.</p></article>
        <article><span>Namespace placement</span><h3>Eligible zones are assigned per namespace</h3><p>A namespace receives only the infrastructure domains that its workloads are permitted to use.</p></article>
        <article><span>Policy</span><h3>Placement intent can be governed</h3><p>Infrastructure policies add more precise workload-placement control when the design requires it.</p></article>
        <article><span>Self-service</span><h3>New designs should use VCF Automation</h3><p>The older namespace self-service and namespace-template APIs are deprecated in vSphere API 9.1.</p></article>
      </div>

      <div class="vcf91-bottom-line"><strong>What does not change</strong><p>Define the namespace boundary, publish its entitlements, assign eligible zones, and then verify that the VKS cluster and applications use those failure domains correctly.</p></div>`;
  }

  const challenge = document.querySelector("#challenge");
  if (challenge) {
    challenge.innerHTML = `
      <p class="section-number">13 · Architecture challenge</p>
      <h2>Design a governed namespace and zone model for four different workload profiles.</h2>
      <p class="section-lead">Apply the same decision sequence used throughout the article: boundary → entitlement → eligible zones → workload responsibility.</p>

      <div class="challenge challenge-v2">
        <h3>Customer requirements</h3>
        <div class="challenge-requirements">
          <article><strong>Payments production</strong><p>Must tolerate a zone-level infrastructure failure and has restricted operator access.</p></article>
          <article><strong>Payments nonproduction</strong><p>Needs developer access, smaller VM Classes and lower-cost storage.</p></article>
          <article><strong>Risk Analytics</strong><p>Needs accelerator-enabled VM Classes, sensitive-data controls and dedicated capacity.</p></article>
          <article><strong>Reporting</strong><p>Has lower criticality and may begin in one general-purpose zone.</p></article>
        </div>
        <div class="challenge-task"><strong>Your task</strong><ol><li>Choose the vSphere Namespace boundaries.</li><li>Assign access, VM Classes, storage policies and quotas.</li><li>Map each namespace to appropriate eligible zones.</li><li>State what the application teams must still design inside their VKS clusters.</li></ol></div>
      </div>

      <details class="solution solution-v2">
        <summary>Reveal one reasonable design</summary>
        <div class="inside">
          <table class="simple-table">
            <thead><tr><th>Namespace</th><th>Eligible zones</th><th>Key entitlement</th></tr></thead>
            <tbody>
              <tr><td>payments-prod</td><td>Three production zones</td><td>Production VM Classes, resilient storage, restricted operators</td></tr>
              <tr><td>payments-nonprod</td><td>One general-purpose zone</td><td>Smaller VM Classes, nonproduction storage, developer access</td></tr>
              <tr><td>risk-analytics</td><td>Dedicated analytics Workload Zone</td><td>Accelerator-enabled VM Classes, approved sensitive-data storage</td></tr>
              <tr><td>reporting</td><td>One general-purpose zone initially</td><td>Standard VM Classes and cost-optimised storage</td></tr>
            </tbody>
          </table>
          <div class="plain-callout"><strong>Still required inside VKS:</strong> cluster topology, control-plane and worker placement, application replicas, topology spread or anti-affinity, storage behaviour, load-balancer reachability, backup and failure handling.</div>
        </div>
      </details>`;
  }

  const takeaways = document.querySelector("#takeaways");
  if (takeaways) {
    takeaways.innerHTML = `
      <p class="section-number">14 · Key takeaways</p>
      <h2>Design the governance boundary first, then add placement and resilience deliberately.</h2>
      <ol>
        <li>A vSphere Namespace is a governed infrastructure and entitlement boundary, not merely an inventory folder.</li>
        <li>Create separate namespaces when ownership, access, quota, VM Classes, storage, networking, lifecycle or risk differ.</li>
        <li>Keep vSphere Namespace permissions separate from Kubernetes RBAC inside a VKS cluster.</li>
        <li>A vSphere Zone is an infrastructure placement and failure domain; Management and Workload describe its role for Supervisor.</li>
        <li>The four zone models result from two choices: one or three Management Zones, and shared Management Zones or separate Workload Zones.</li>
        <li>Zone mapping defines eligible placement. It does not guarantee workload distribution, application HA or disaster recovery.</li>
        <li>The platform team creates safe choices; application teams must use those choices correctly inside VKS.</li>
        <li>Start with the simplest design that satisfies the real availability, isolation and governance requirements.</li>
      </ol>`;
  }

  const sourceSection = [...document.querySelectorAll(".article-section")].find((section) =>
    section.querySelector(".section-number")?.textContent.includes("Sources and validation")
  );
  if (sourceSection) {
    sourceSection.id = "sources";
    const heading = sourceSection.querySelector("h2");
    if (heading) heading.textContent = "Official references and validation basis";
    const list = sourceSection.querySelector(".sources");
    if (list) {
      list.innerHTML = `
        <li><a href="https://developer.broadcom.com/xapis/vsphere-automation-api/latest/vcenter-namespace-management/">Broadcom vSphere Automation API: Namespace Management</a></li>
        <li><a href="https://developer.broadcom.com/xapis/vsphere-automation-api/latest/vcenter-namespaces/">Broadcom vSphere Automation API: Namespaces</a></li>
        <li><a href="https://developer.broadcom.com/xapis/vsphere-automation-api/latest/api/vcenter/namespace-management/supervisors/supervisor/zones/bindings/get/">Broadcom API: Supervisor zone bindings</a></li>
        <li><a href="https://developer.broadcom.com/xapis/vsphere-automation-api/latest/data-structures/Vcenter%20NamespaceManagement%20Supervisors%20Zones%20Bindings%20ZoneSpec/">Broadcom API: Management and Workload Zone binding type</a></li>
        <li><a href="https://kubernetes.io/docs/concepts/overview/working-with-objects/namespaces/">Kubernetes documentation: Namespaces</a></li>
        <li><a href="https://kubernetes.io/docs/reference/access-authn-authz/rbac/">Kubernetes documentation: RBAC</a></li>`;
    }
    const micro = sourceSection.querySelector(".micro");
    if (micro) {
      micro.textContent = "Validated in August 2026 against the official vSphere Automation API for vSphere 9.1 and the uploaded VMware vSphere Kubernetes Service: Advanced Design V9.0 course manual. The V9.0 manual was used for the four zone architecture models; VCF 9.1 APIs were used for current terminology and platform behaviour.";
    }
  }

  const style = document.createElement("style");
  style.textContent = `
    .article-toc{max-height:calc(100vh - 130px);overflow-y:auto;padding-right:10px;scrollbar-width:thin}
    .article-toc>span{display:block;margin-bottom:18px}
    .article-toc a{align-items:baseline;border-left:2px solid transparent;display:grid;gap:9px;grid-template-columns:28px minmax(0,1fr);padding:7px 8px;text-decoration:none}
    .article-toc a small{color:#8b98ad;font-size:.67rem;font-weight:800;letter-spacing:.06em}
    .article-toc a:hover{background:#f4f7fc;border-left-color:#2a5be0;border-radius:0 8px 8px 0;color:#2a5be0}
    .article-toc .toc-source-link{border-top:1px solid #e2e9f3;margin-top:8px;padding-top:14px}
    .vcf91-grid-simple{grid-template-columns:repeat(2,minmax(0,1fr))}
    .challenge-requirements{display:grid;gap:14px;grid-template-columns:repeat(2,minmax(0,1fr));margin:20px 0}
    .challenge-requirements article{background:rgba(18,42,76,.88);border:1px solid rgba(125,169,216,.28);border-radius:15px;padding:17px}
    .challenge-requirements strong{display:block;margin-bottom:6px}
    .challenge-requirements p{margin:0}
    .challenge-task{background:rgba(101,231,255,.08);border:1px solid rgba(101,231,255,.24);border-radius:15px;padding:18px}
    .challenge-task>strong{color:#65e7ff!important;display:block;margin-bottom:8px}
    .challenge-task ol{margin:0;padding-left:22px}
    .solution-v2 .inside{overflow-x:auto}
    .solution-v2 table{min-width:760px}
    #takeaways ol{display:grid;gap:10px;padding-left:24px}
    #sources{border-top:1px solid #dce6f5;margin-top:56px;padding-top:42px}
    @media(max-width:820px){.vcf91-grid-simple,.challenge-requirements{grid-template-columns:1fr}.article-toc{max-height:none;overflow:visible}}
  `;
  document.head.appendChild(style);
})();