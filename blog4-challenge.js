(() => {
  if (!location.pathname.endsWith("004-vsphere-namespaces-and-zones.html")) return;

  const challenge = document.querySelector("#challenge");
  if (!challenge) return;

  challenge.innerHTML = `
    <p class="section-number">13 · Architecture challenge</p>
    <h2>Apply the same design method to a different platform scenario.</h2>
    <p class="section-lead">This challenge is intentionally different from the worked example in Section 9. Decide each workload's <strong>namespace boundary</strong>, <strong>entitlement</strong> and <strong>zone placement</strong>.</p>

    <div class="challenge challenge-v3">
      <h3>Scenario</h3>
      <p>A financial-services organisation wants to onboard four workload profiles to VKS:</p>

      <div class="challenge-requirements challenge-requirements-v3">
        <article>
          <strong>Online trading production</strong>
          <p>Business-critical, tightly controlled, low-latency and expected to continue operating during a single infrastructure-zone failure.</p>
        </article>
        <article>
          <strong>Quantitative research</strong>
          <p>Requires accelerator-enabled VM Classes, burst capacity and access to sensitive market datasets.</p>
        </article>
        <article>
          <strong>Internal developer platform</strong>
          <p>Used by several engineering teams for short-lived test clusters, standard VM Classes and lower-cost storage.</p>
        </article>
        <article>
          <strong>Compliance archive</strong>
          <p>Lower compute demand, strict retention controls and storage policies designed for long-term record keeping.</p>
        </article>
      </div>

      <div class="challenge-task challenge-task-v3">
        <strong>Your task</strong>
        <ol>
          <li>Decide which workloads require separate vSphere Namespaces.</li>
          <li>Define the main entitlement for each namespace.</li>
          <li>Decide whether each workload needs a dedicated Workload Zone, multiple eligible zones or shared general-purpose infrastructure.</li>
          <li>State what the application teams must still design inside their VKS clusters.</li>
        </ol>
      </div>

      <div class="plain-callout"><strong>Key question:</strong> Does a separate namespace also require a separate Workload Zone? Explain why or why not for each workload.</div>
    </div>

    <details class="solution solution-v3">
      <summary>Reveal one reasonable design</summary>
      <div class="inside">
        <div class="challenge-solution-grid">
          <article>
            <span>Online trading production</span>
            <dl>
              <div><dt>Namespace boundary</dt><dd>Separate namespace: <code>trading-prod</code></dd></div>
              <div><dt>Entitlement</dt><dd>Restricted operators, production VM Classes, low-latency networking, resilient storage and production quota</dd></div>
              <div><dt>Zone placement</dt><dd>Eligible across three production zones; a dedicated Workload Zone is optional unless infrastructure isolation is also required</dd></div>
            </dl>
          </article>

          <article>
            <span>Quantitative research</span>
            <dl>
              <div><dt>Namespace boundary</dt><dd>Separate namespace: <code>quant-research</code></dd></div>
              <div><dt>Entitlement</dt><dd>Accelerator-enabled VM Classes, sensitive-data access, burst quota and approved high-performance storage</dd></div>
              <div><dt>Zone placement</dt><dd>Dedicated accelerator Workload Zone because the infrastructure capability itself is specialised</dd></div>
            </dl>
          </article>

          <article>
            <span>Internal developer platform</span>
            <dl>
              <div><dt>Namespace boundary</dt><dd>Separate namespace: <code>developer-platform</code></dd></div>
              <div><dt>Entitlement</dt><dd>Developer access, standard VM Classes, lower-cost storage and controlled sandbox quota</dd></div>
              <div><dt>Zone placement</dt><dd>Shared general-purpose Workload Zone; no dedicated zone is required by default</dd></div>
            </dl>
          </article>

          <article>
            <span>Compliance archive</span>
            <dl>
              <div><dt>Namespace boundary</dt><dd>Separate namespace: <code>compliance-archive</code></dd></div>
              <div><dt>Entitlement</dt><dd>Restricted access, archival storage policies, modest compute and retention-aligned quota</dd></div>
              <div><dt>Zone placement</dt><dd>May share a general-purpose Workload Zone if storage and retention requirements are met; a dedicated zone is not automatically justified</dd></div>
            </dl>
          </article>
        </div>

        <div class="plain-callout"><strong>Design lesson:</strong> All four workloads use separate namespaces because their governance and entitlement requirements differ. Only Quantitative Research clearly requires a dedicated Workload Zone. Trading production needs multi-zone eligibility, but that is not the same as requiring a physically separate Workload Zone.</div>

        <div class="warning"><strong>Still required inside VKS:</strong> The application teams must design cluster topology, worker placement, replicas, topology spread or anti-affinity, storage behaviour, load-balancer reachability, backup, recovery and failure testing.</div>
      </div>
    </details>`;

  const style = document.createElement("style");
  style.textContent = `
    .challenge-requirements-v3{grid-template-columns:repeat(2,minmax(0,1fr))}
    .challenge-task-v3{margin-top:18px}
    .challenge-solution-grid{display:grid;gap:18px;grid-template-columns:repeat(2,minmax(0,1fr));margin:8px 0 24px}
    .challenge-solution-grid article{background:#fff;border:1px solid #dce6f5;border-radius:18px;padding:20px}
    .challenge-solution-grid article>span{color:#2a5be0;display:block;font-size:.76rem;font-weight:800;letter-spacing:.07em;margin-bottom:12px;text-transform:uppercase}
    .challenge-solution-grid dl{display:grid;gap:10px;margin:0}
    .challenge-solution-grid dl div{background:#f5f8fe;border-radius:12px;padding:12px}
    .challenge-solution-grid dt{color:#66758d;font-size:.7rem;font-weight:800;letter-spacing:.06em;text-transform:uppercase}
    .challenge-solution-grid dd{color:#172a45;font-weight:600;line-height:1.5;margin:4px 0 0}
    .challenge-solution-grid code{background:#eaf1ff;border-radius:6px;color:#1d46a8;padding:2px 5px}
    @media(max-width:820px){.challenge-requirements-v3,.challenge-solution-grid{grid-template-columns:1fr}}
  `;
  document.head.appendChild(style);
})();
