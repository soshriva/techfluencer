(() => {
  if (!location.pathname.endsWith("004-vsphere-namespaces-and-zones.html")) return;

  const mapping = document.querySelector("#mapping");
  if (mapping) {
    mapping.innerHTML = `
      <p class="section-number">08 · Map namespaces to zones</p>
      <h2>Map each namespace only to the infrastructure domains its workloads are allowed to use.</h2>
      <p class="section-lead">The namespace decision defines the governance boundary. Zone mapping then defines the eligible placement boundary for workloads created inside that namespace.</p>

      <div class="flow-strip">
        <div><span>1</span><strong>Choose the namespace</strong><small>Ownership, access, quota and policy</small></div>
        <div><span>2</span><strong>Choose eligible zones</strong><small>Placement and failure domains</small></div>
        <div><span>3</span><strong>Design workload resilience</strong><small>Topology, replicas, storage and network</small></div>
      </div>

      <div class="mapping-grid">
        <article class="mapping-card critical">
          <div class="mapping-card-head"><span>Production</span><strong>payments-prod</strong></div>
          <p>Critical customer-facing payment services with strict access, resilient storage and controlled change windows.</p>
          <dl><div><dt>Eligible zones</dt><dd>Three production zones</dd></div><div><dt>Why</dt><dd>Supports placement across independent failure domains</dd></div></dl>
        </article>
        <article class="mapping-card specialised">
          <div class="mapping-card-head"><span>Specialised compute</span><strong>risk-analytics</strong></div>
          <p>Analytics workloads requiring specialised accelerator-enabled VM Classes and tightly governed data access.</p>
          <dl><div><dt>Eligible zones</dt><dd>Dedicated analytics Workload Zone</dd></div><div><dt>Why</dt><dd>Keeps specialised hardware and capacity separate</dd></div></dl>
        </article>
        <article class="mapping-card standard">
          <div class="mapping-card-head"><span>Nonproduction</span><strong>payments-nonprod</strong></div>
          <p>Development and test workloads with smaller VM Classes, lower-cost storage and developer access.</p>
          <dl><div><dt>Eligible zones</dt><dd>One general-purpose zone</dd></div><div><dt>Why</dt><dd>Lower cost and simpler operations</dd></div></dl>
        </article>
        <article class="mapping-card standard">
          <div class="mapping-card-head"><span>General purpose</span><strong>reporting</strong></div>
          <p>Lower-criticality reporting services using standard compute and cost-optimised storage.</p>
          <dl><div><dt>Eligible zones</dt><dd>One zone initially</dd></div><div><dt>Why</dt><dd>Expand only when availability requirements justify it</dd></div></dl>
        </article>
      </div>

      <div class="plain-callout"><strong>Important:</strong> Zone mapping defines where workloads may run. It does not guarantee that VKS nodes, Pods or application replicas will be distributed correctly. Cluster topology, topology spread or anti-affinity, storage accessibility, load-balancer reachability and failure handling must still use the available zones correctly.</div>`;
  }

  const scenario = document.querySelector("#scenario");
  if (scenario) {
    scenario.innerHTML = `
      <p class="section-number">09 · Real design walkthrough</p>
      <h2>Start from differences in rules, then create the minimum number of clear boundaries.</h2>
      <p class="section-lead">Payments production, payments nonproduction, risk analytics and reporting should not share one namespace because their owners, access, capacity, storage and availability requirements are materially different.</p>

      <div class="scenario-summary">
        <div><strong>4</strong><span>vSphere Namespaces</span></div>
        <div><strong>3</strong><span>Placement patterns</span></div>
        <div><strong>1</strong><span>Shared design principle</span></div>
      </div>

      <div class="design-walkthrough">
        <article><span>01</span><div><h3>Separate production from nonproduction</h3><p>Use <strong>payments-prod</strong> and <strong>payments-nonprod</strong> so access, quota, storage and change control remain independent.</p></div></article>
        <article><span>02</span><div><h3>Isolate specialised infrastructure</h3><p>Use <strong>risk-analytics</strong> for accelerator-enabled VM Classes, sensitive-data controls and dedicated capacity.</p></div></article>
        <article><span>03</span><div><h3>Keep lower-criticality services simple</h3><p>Start <strong>reporting</strong> in one general-purpose zone and expand only when its recovery objective or availability target changes.</p></div></article>
        <article><span>04</span><div><h3>Validate the application design</h3><p>For payments production, confirm multi-zone VKS topology, replica placement, storage behaviour, network reachability and failure handling.</p></div></article>
      </div>

      <div class="decision-table-wrap">
        <table class="simple-table design-response-table">
          <thead><tr><th>Observed requirement</th><th>Design response</th><th>Reason</th></tr></thead>
          <tbody>
            <tr><td>Different access groups</td><td>Separate namespaces</td><td>Platform permissions remain independent.</td></tr>
            <tr><td>Different VM Classes or storage policies</td><td>Separate namespaces</td><td>Each namespace receives a clean entitlement set.</td></tr>
            <tr><td>Specialised accelerator hardware</td><td>Dedicated Workload Zone</td><td>Capacity and hardware lifecycle can be managed separately.</td></tr>
            <tr><td>Production zone-failure tolerance</td><td>Multi-zone placement plus workload design</td><td>Zone eligibility alone does not create application HA.</td></tr>
            <tr><td>Same owners and same operating rules</td><td>Shared namespace may be reasonable</td><td>Simplicity is useful when the risk boundary is genuinely shared.</td></tr>
          </tbody>
        </table>
      </div>`;
  }

  const responsibility = document.querySelector("#responsibility");
  if (responsibility) {
    responsibility.innerHTML = `
      <p class="section-number">10 · Responsibility boundary</p>
      <h2>The platform team defines the outer boundary. Application teams design resilience inside it.</h2>
      <p class="section-lead">A well-designed namespace and zone model creates safe choices. It does not replace the engineering decisions required inside each VKS cluster.</p>

      <div class="responsibility-grid-v2">
        <article>
          <span>Platform team</span>
          <h3>Defines what is available</h3>
          <ul>
            <li>Creates vSphere Namespaces</li>
            <li>Assigns users, groups and platform permissions</li>
            <li>Publishes VM Classes and storage policies</li>
            <li>Sets quotas and enabled services</li>
            <li>Designs Management and Workload Zones</li>
            <li>Maps namespaces to eligible zones</li>
            <li>Operates Supervisor and the underlying infrastructure</li>
          </ul>
        </article>
        <div class="responsibility-divider"><span>Shared design</span></div>
        <article>
          <span>Application and DevOps teams</span>
          <h3>Use the boundary correctly</h3>
          <ul>
            <li>Create and operate VKS clusters</li>
            <li>Design Kubernetes namespaces and RBAC</li>
            <li>Select approved VM Classes and storage</li>
            <li>Set requests, limits and scaling policies</li>
            <li>Spread control-plane nodes, workers and replicas</li>
            <li>Implement application recovery and data protection</li>
            <li>Validate behaviour during zone and dependency failures</li>
          </ul>
        </article>
      </div>

      <div class="shared-responsibility-callout"><strong>Decide together:</strong><span>availability targets</span><span>capacity growth</span><span>storage topology</span><span>network segmentation</span><span>upgrade windows</span><span>recovery objectives</span></div>`;
  }

  const vcf91 = document.querySelector("#vcf91");
  if (vcf91) {
    vcf91.innerHTML = `
      <p class="section-number">11 · VCF 9.1 context</p>
      <h2>VCF 9.1 adds stronger placement and governance APIs, but the architecture decisions remain the same.</h2>
      <p class="section-lead">The current platform exposes namespaces, zone associations and workload-placement controls as first-class objects. That improves automation and policy enforcement; it does not remove the need to design clear boundaries.</p>

      <div class="vcf91-grid">
        <article><span>Zone bindings</span><h3>Supervisor-to-zone relationships are explicit</h3><p>VCF 9.1 manages vSphere Zone bindings for placing Supervisor control-plane components and workloads.</p></article>
        <article><span>Namespace zones</span><h3>Zone associations are managed per namespace</h3><p>Namespace zone APIs define which vSphere Zones are eligible for workloads created within that namespace.</p></article>
        <article><span>Infrastructure policies</span><h3>Placement intent can be governed</h3><p>Infrastructure policies provide an additional mechanism for workload-placement control in vSphere Namespaces.</p></article>
        <article><span>Management services</span><h3>Access can be granted deliberately</h3><p>Management Service access grants allow selected namespace workloads to reach registered management endpoints through controlled access.</p></article>
        <article><span>Self-service</span><h3>Use VCF Automation for new self-service designs</h3><p>The older namespace self-service and namespace-template APIs are deprecated in vSphere API 9.1 in favour of VCF Automation.</p></article>
        <article><span>Design principle</span><h3>Technology changes; boundaries still matter</h3><p>Ownership, access, quota, storage, networking, lifecycle and risk remain the primary reasons to separate namespaces.</p></article>
      </div>

      <div class="vcf91-bottom-line"><strong>Bottom line</strong><p>VCF 9.1 gives the platform team more precise tools to express and automate placement. The design sequence remains: define the namespace boundary, publish its entitlements, map eligible zones, and then validate workload resilience.</p></div>`;
  }

  const style = document.createElement("style");
  style.textContent = `
    .flow-strip{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:14px;margin:28px 0}
    .flow-strip>div{background:#f5f8fe;border:1px solid #dce6f5;border-radius:16px;padding:18px;position:relative}
    .flow-strip span{align-items:center;background:#2a5be0;border-radius:50%;color:#fff;display:flex;font-weight:800;height:30px;justify-content:center;margin-bottom:12px;width:30px}
    .flow-strip strong,.flow-strip small{display:block}.flow-strip small{color:#607089;margin-top:6px}
    .mapping-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:18px;margin:30px 0}
    .mapping-card{background:#fff;border:1px solid #dce6f5;border-radius:18px;box-shadow:0 15px 34px rgba(16,38,74,.07);padding:22px}
    .mapping-card-head{display:flex;align-items:flex-start;justify-content:space-between;gap:16px;margin-bottom:14px}.mapping-card-head span{color:#2a5be0;font-size:.72rem;font-weight:800;letter-spacing:.08em;text-transform:uppercase}.mapping-card-head strong{font-family:Manrope,sans-serif;font-size:1.1rem}
    .mapping-card dl{display:grid;gap:10px;margin:18px 0 0}.mapping-card dl div{background:#f5f8fe;border-radius:12px;padding:12px}.mapping-card dt{color:#66758d;font-size:.72rem;font-weight:800;letter-spacing:.06em;text-transform:uppercase}.mapping-card dd{color:#172a45;font-weight:700;margin:4px 0 0}
    .mapping-card.critical{border-top:4px solid #9b7cff}.mapping-card.specialised{border-top:4px solid #42e3b4}.mapping-card.standard{border-top:4px solid #65a6ff}
    .scenario-summary{display:grid;grid-template-columns:repeat(3,1fr);gap:14px;margin:26px 0}.scenario-summary div{background:#071427;border:1px solid rgba(124,183,255,.28);border-radius:16px;padding:20px;text-align:center}.scenario-summary strong{color:#65e7ff;display:block;font-size:2rem}.scenario-summary span{color:#d8e6fb;font-weight:700}
    .design-walkthrough{display:grid;gap:14px;margin:26px 0}.design-walkthrough article{align-items:flex-start;background:#fff;border:1px solid #dce6f5;border-radius:16px;display:grid;gap:16px;grid-template-columns:48px 1fr;padding:18px}.design-walkthrough article>span{align-items:center;background:#eef4ff;border-radius:12px;color:#2a5be0;display:flex;font-weight:800;height:42px;justify-content:center}.design-walkthrough h3{margin:0 0 6px}.design-walkthrough p{margin:0}
    .decision-table-wrap{overflow-x:auto}.design-response-table{min-width:760px}
    .responsibility-grid-v2{align-items:stretch;display:grid;gap:18px;grid-template-columns:minmax(0,1fr) 90px minmax(0,1fr);margin:30px 0}.responsibility-grid-v2 article{background:#fff;border:1px solid #dce6f5;border-radius:20px;padding:24px}.responsibility-grid-v2 article>span{color:#2a5be0;font-size:.75rem;font-weight:800;letter-spacing:.08em;text-transform:uppercase}.responsibility-grid-v2 h3{margin:8px 0 16px}.responsibility-grid-v2 li{margin:9px 0}.responsibility-divider{align-items:center;display:flex;justify-content:center}.responsibility-divider span{background:#071427;border-radius:999px;color:#65e7ff;font-size:.72rem;font-weight:800;padding:10px 12px;text-align:center;text-transform:uppercase;writing-mode:vertical-rl}
    .shared-responsibility-callout{align-items:center;background:linear-gradient(135deg,#eef4ff,#f0fbf8);border:1px solid #d6e5f5;border-radius:16px;display:flex;flex-wrap:wrap;gap:10px;padding:18px}.shared-responsibility-callout strong{margin-right:6px}.shared-responsibility-callout span{background:#fff;border:1px solid #dce6f5;border-radius:999px;color:#31425c;font-size:.82rem;font-weight:700;padding:7px 10px}
    .vcf91-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:18px;margin:28px 0}.vcf91-grid article{background:#fff;border:1px solid #dce6f5;border-radius:18px;padding:22px}.vcf91-grid article>span{color:#2a5be0;font-size:.72rem;font-weight:800;letter-spacing:.08em;text-transform:uppercase}.vcf91-grid h3{margin:8px 0 10px}.vcf91-grid p{margin:0}.vcf91-bottom-line{background:#071427;border-radius:18px;color:#d8e6fb;padding:22px}.vcf91-bottom-line strong{color:#65e7ff;display:block;font-size:.78rem;letter-spacing:.08em;margin-bottom:8px;text-transform:uppercase}.vcf91-bottom-line p{color:#d8e6fb;margin:0}
    @media(max-width:820px){.flow-strip,.mapping-grid,.scenario-summary,.vcf91-grid{grid-template-columns:1fr}.responsibility-grid-v2{grid-template-columns:1fr}.responsibility-divider span{writing-mode:horizontal-tb}.mapping-card-head{display:block}.mapping-card-head strong{display:block;margin-top:6px}}
  `;
  document.head.appendChild(style);
})();
