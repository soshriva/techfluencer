(() => {
  if (!location.pathname.endsWith("004-vsphere-namespaces-and-zones.html")) return;

  const scenario = document.querySelector("#scenario");
  if (!scenario) return;

  scenario.innerHTML = `
    <p class="section-number">09 · Real design walkthrough</p>
    <h2>Use the same three decisions for every workload profile.</h2>
    <p class="section-lead">For each workload, decide the <strong>namespace boundary</strong>, the <strong>entitlement</strong>, and the <strong>zone placement</strong>. These are related decisions, but they are not the same thing.</p>

    <div class="design-language-callout">
      <article><span>Decision 1</span><h3>Namespace boundary</h3><p>Should the workload have its own governance boundary for access, quota, policy and lifecycle?</p></article>
      <article><span>Decision 2</span><h3>Entitlement</h3><p>Which VM Classes, storage policies, services, networks and quotas should that namespace receive?</p></article>
      <article><span>Decision 3</span><h3>Zone placement</h3><p>Which Management or Workload Zones are eligible for workloads created inside that namespace?</p></article>
    </div>

    <div class="profile-design-grid">
      <article class="profile-design-card critical">
        <header><span>Payments production</span><strong>payments-prod</strong></header>
        <dl>
          <div><dt>Namespace boundary</dt><dd><strong>Separate vSphere Namespace.</strong> Production has restricted access, independent quota, stricter change control and higher availability requirements.</dd></div>
          <div><dt>Entitlement</dt><dd>Production VM Classes, resilient storage policies, production networks, restricted operators and production quotas.</dd></div>
          <div><dt>Zone placement</dt><dd>Map to three eligible production zones when zone-level failure tolerance is required.</dd></div>
        </dl>
      </article>

      <article class="profile-design-card standard">
        <header><span>Payments nonproduction</span><strong>payments-nonprod</strong></header>
        <dl>
          <div><dt>Namespace boundary</dt><dd><strong>Separate vSphere Namespace.</strong> Developer access, quotas, storage and change controls differ from production.</dd></div>
          <div><dt>Entitlement</dt><dd>Smaller VM Classes, lower-cost storage, developer access and lower nonproduction quotas.</dd></div>
          <div><dt>Zone placement</dt><dd>Map to one general-purpose zone unless a stronger nonproduction availability requirement justifies more zones.</dd></div>
        </dl>
      </article>

      <article class="profile-design-card specialised">
        <header><span>Risk Analytics</span><strong>risk-analytics</strong></header>
        <dl>
          <div><dt>Namespace boundary</dt><dd><strong>Separate vSphere Namespace.</strong> Sensitive-data controls, ownership and specialised compute requirements differ from other workloads.</dd></div>
          <div><dt>Entitlement</dt><dd>Accelerator-enabled VM Classes, approved sensitive-data storage, dedicated quotas and tightly controlled access.</dd></div>
          <div><dt>Zone placement</dt><dd><strong>Dedicated analytics Workload Zone.</strong> The infrastructure itself is specialised and should scale and lifecycle independently.</dd></div>
        </dl>
      </article>

      <article class="profile-design-card standard">
        <header><span>Reporting</span><strong>reporting</strong></header>
        <dl>
          <div><dt>Namespace boundary</dt><dd><strong>Separate vSphere Namespace.</strong> Reporting has its own ownership, quota and storage policy, even though it is lower criticality.</dd></div>
          <div><dt>Entitlement</dt><dd>Standard VM Classes, cost-optimised storage and reporting-team access.</dd></div>
          <div><dt>Zone placement</dt><dd>Map initially to one general-purpose zone. It may share that Workload Zone with other suitable workloads.</dd></div>
        </dl>
      </article>
    </div>

    <div class="plain-callout"><strong>Important distinction:</strong> Separate namespaces do not automatically require separate Workload Zones. Use separate namespaces when governance differs. Use a separate Workload Zone only when infrastructure placement, isolation, hardware, scale or lifecycle requirements differ.</div>

    <div class="design-summary-table-wrap">
      <table class="simple-table design-summary-table">
        <thead><tr><th>Workload</th><th>Separate namespace?</th><th>Separate Workload Zone?</th><th>Reason</th></tr></thead>
        <tbody>
          <tr><td>payments-prod</td><td>Yes</td><td>Not necessarily</td><td>Separate governance is required. It may use dedicated production zones depending on the infrastructure design.</td></tr>
          <tr><td>payments-nonprod</td><td>Yes</td><td>No, not by default</td><td>Governance differs from production, but general-purpose infrastructure may be shared.</td></tr>
          <tr><td>risk-analytics</td><td>Yes</td><td>Yes</td><td>Both governance and specialised infrastructure requirements differ.</td></tr>
          <tr><td>reporting</td><td>Yes</td><td>No, not by default</td><td>It needs its own entitlement boundary but can use shared general-purpose infrastructure.</td></tr>
        </tbody>
      </table>
    </div>`;

  const style = document.createElement("style");
  style.textContent = `
    .design-language-callout{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:16px;margin:28px 0}
    .design-language-callout article{background:#071427;border:1px solid rgba(124,183,255,.28);border-radius:17px;padding:20px}
    .design-language-callout span{color:#65e7ff;font-size:.72rem;font-weight:800;letter-spacing:.08em;text-transform:uppercase}
    .design-language-callout h3{color:#fff;margin:8px 0 9px}
    .design-language-callout p{color:#d4e1f3;margin:0}
    .profile-design-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:18px;margin:30px 0}
    .profile-design-card{background:#fff;border:1px solid #dce6f5;border-radius:19px;box-shadow:0 15px 34px rgba(16,38,74,.07);overflow:hidden}
    .profile-design-card header{background:#f5f8fe;border-bottom:1px solid #dce6f5;padding:18px 20px}
    .profile-design-card header span{color:#2a5be0;display:block;font-size:.72rem;font-weight:800;letter-spacing:.08em;text-transform:uppercase}
    .profile-design-card header strong{color:#10213a;display:block;font-family:Manrope,sans-serif;font-size:1.15rem;margin-top:5px}
    .profile-design-card dl{display:grid;gap:0;margin:0}
    .profile-design-card dl>div{border-bottom:1px solid #edf1f7;padding:17px 20px}
    .profile-design-card dl>div:last-child{border-bottom:0}
    .profile-design-card dt{color:#607089;font-size:.72rem;font-weight:800;letter-spacing:.07em;text-transform:uppercase}
    .profile-design-card dd{color:#31425c;line-height:1.55;margin:6px 0 0}
    .profile-design-card.critical{border-top:4px solid #9b7cff}
    .profile-design-card.specialised{border-top:4px solid #42e3b4}
    .profile-design-card.standard{border-top:4px solid #65a6ff}
    .design-summary-table-wrap{overflow-x:auto}.design-summary-table{min-width:820px}
    @media(max-width:820px){.design-language-callout,.profile-design-grid{grid-template-columns:1fr}}
  `;
  document.head.appendChild(style);
})();
