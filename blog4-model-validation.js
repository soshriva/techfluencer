(() => {
  if (!location.pathname.endsWith("004-vsphere-namespaces-and-zones.html")) return;

  const models = document.querySelector("#models");
  if (!models) return;

  models.innerHTML = `
    <p class="section-number">07 · The four zone design models</p>
    <h2>Four supported patterns come from two design decisions.</h2>
    <p class="section-lead">First choose whether Supervisor uses one or three Management Zones. Then decide whether workloads use those same zones or one or more additional isolated Workload Zones.</p>

    <div class="model-decision-strip">
      <article><strong>Decision 1</strong><span>How many Management Zones does Supervisor use?</span></article>
      <article><strong>Decision 2</strong><span>Do workloads share those zones or use isolated zones?</span></article>
    </div>

    <div class="validated-model-map" role="img" aria-label="Four supported vSphere Supervisor zone models arranged by one or three Management Zones and combined or isolated Workload Zones">
      <div class="map-corner"><strong>vSphere Supervisor Zone Models</strong><span>Two decisions create four patterns</span></div>
      <div class="map-column">Combined Workload Zones<small>Workloads use the same zones as Management</small></div>
      <div class="map-column">Isolated Workload Zones<small>Workloads use one or more additional zones</small></div>

      <div class="map-row">Single Management Zone<small>Supervisor management components reside in one zone</small></div>
      <article class="model-cell model-one">
        <span>Model 1</span>
        <h3>Single Management Zone with Combined Workload Zones</h3>
        <div class="role-diagram"><div class="zone-box combined"><b>M</b><b>W</b></div></div>
        <div class="model-copy"><strong>What it means</strong><p>Supervisor control-plane components and workloads use the same vSphere Zone.</p></div>
        <div class="model-copy tradeoff"><strong>Trade-off</strong><p>Lowest architectural separation and the simplest operating model.</p></div>
      </article>
      <article class="model-cell model-two">
        <span>Model 2</span>
        <h3>Single Management Zone with Isolated Workload Zones</h3>
        <div class="role-diagram"><div class="zone-box management"><b>M</b></div><i>+</i><div class="zone-box workload"><b>W</b><em>1+</em></div></div>
        <div class="model-copy"><strong>What it means</strong><p>Workloads run in one or more additional vSphere Zones isolated from the Management Zone.</p></div>
        <div class="model-copy tradeoff"><strong>Trade-off</strong><p>Better workload isolation and independent scaling, but more zones must be operated.</p></div>
      </article>

      <div class="map-row">Three Management Zones<small>Supervisor management components span three zones</small></div>
      <article class="model-cell model-three">
        <span>Model 3</span>
        <h3>Three Management Zones with Combined Workload Zones</h3>
        <div class="role-diagram"><div class="zone-box combined"><b>M</b><b>W</b></div><div class="zone-box combined"><b>M</b><b>W</b></div><div class="zone-box combined"><b>M</b><b>W</b></div></div>
        <div class="model-copy"><strong>What it means</strong><p>Supervisor control-plane components span three Management Zones; workloads use those same zones.</p></div>
        <div class="model-copy tradeoff"><strong>Trade-off</strong><p>Higher management-plane availability without introducing separate Workload Zones.</p></div>
      </article>
      <article class="model-cell model-four">
        <span>Model 4</span>
        <h3>Three Management Zones with Isolated Workload Zones</h3>
        <div class="role-diagram"><div class="zone-box management"><b>M</b></div><div class="zone-box management"><b>M</b></div><div class="zone-box management"><b>M</b></div><i>+</i><div class="zone-box workload"><b>W</b><em>1+</em></div></div>
        <div class="model-copy"><strong>What it means</strong><p>Supervisor control-plane components span three Management Zones; workloads use one or more additional isolated zones.</p></div>
        <div class="model-copy tradeoff"><strong>Trade-off</strong><p>Strongest separation and flexibility, usually with the highest infrastructure and operational complexity.</p></div>
      </article>
    </div>

    <div class="model-legend">
      <strong>Legend</strong>
      <span><b class="legend-management">M</b> Management role: Supervisor control-plane placement</span>
      <span><b class="legend-workload">W</b> Workload role: workload capacity</span>
      <span>Symbols indicate zone roles, not the number of control-plane or workload virtual machines.</span>
    </div>

    <div class="plain-callout"><strong>Availability reminder:</strong> Multi-zone eligibility enables placement across failure domains. It does not automatically make VKS clusters or applications highly available. Availability still depends on cluster topology, replica placement, storage accessibility, networking and tested failure handling.</div>`;

  const style = document.createElement("style");
  style.textContent = `
    .model-decision-strip{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:14px;margin:24px 0}
    .model-decision-strip article{background:#eef4ff;border:1px solid #d6e3f4;border-radius:14px;padding:16px}
    .model-decision-strip strong,.model-decision-strip span{display:block}.model-decision-strip strong{color:#2a5be0;font-size:.75rem;letter-spacing:.07em;margin-bottom:5px;text-transform:uppercase}.model-decision-strip span{color:#172a45;font-weight:700}
    .validated-model-map{display:grid;grid-template-columns:190px repeat(2,minmax(0,1fr));gap:12px;margin:28px 0;color:#dbe8ff}
    .map-corner,.map-column,.map-row,.model-cell{border:1px solid rgba(123,181,239,.28);border-radius:16px;background:#0b1b31}
    .map-corner,.map-column,.map-row{padding:16px}.map-corner strong,.map-corner span,.map-column small,.map-row small{display:block}.map-corner span,.map-column small,.map-row small{color:#aebed5;font-size:.8rem;margin-top:5px}.map-column{color:#fff;font-weight:800;text-align:center}.map-row{align-items:center;display:flex;flex-direction:column;font-weight:800;justify-content:center;text-align:center}
    .model-cell{padding:20px}.model-cell>span{color:#65e7ff;font-size:.72rem;font-weight:800;letter-spacing:.08em;text-transform:uppercase}.model-cell h3{color:#fff!important;font-size:1.02rem;line-height:1.35;margin:8px 0 14px}
    .role-diagram{align-items:center;display:flex;flex-wrap:wrap;gap:9px;min-height:72px;margin-bottom:14px}.role-diagram i{color:#65e7ff;font-style:normal;font-weight:900}.zone-box{align-items:center;border:2px solid #65e7ff;border-radius:13px;display:flex;gap:8px;justify-content:center;min-height:58px;min-width:64px;padding:10px;position:relative}.zone-box b{align-items:center;border-radius:50%;display:flex;height:30px;justify-content:center;width:30px}.zone-box b:first-child{background:#9b7cff;color:#081426}.zone-box b:nth-child(2),.zone-box.workload b{background:#42e3b4;color:#081426}.zone-box.management{border-color:#9b7cff}.zone-box.workload{border-color:#42e3b4}.zone-box em{bottom:2px;color:#aebed5;font-size:.65rem;font-style:normal;position:absolute;right:5px}
    .model-copy{border-top:1px solid rgba(123,181,239,.2);padding-top:12px;margin-top:10px}.model-copy strong{color:#fff!important;font-size:.78rem;letter-spacing:.04em;text-transform:uppercase}.model-copy p{color:#d8e6fb!important;margin:5px 0 0}.model-copy.tradeoff strong{color:#ffc96b!important}
    .model-legend{align-items:center;background:#eef4ff;border:1px solid #d6e3f4;border-radius:14px;color:#172a45;display:flex;flex-wrap:wrap;gap:14px;margin:18px 0;padding:15px}.model-legend span{font-size:.86rem}.model-legend b{align-items:center;border-radius:50%;display:inline-flex;height:25px;justify-content:center;margin-right:4px;width:25px}.legend-management{background:#9b7cff;color:#081426}.legend-workload{background:#42e3b4;color:#081426}
    @media(max-width:820px){.model-decision-strip{grid-template-columns:1fr}.validated-model-map{display:block}.map-corner,.map-column,.map-row,.model-cell{margin-bottom:12px}.map-column{display:none}.map-row{align-items:flex-start;justify-content:flex-start;text-align:left}.model-cell h3{font-size:.98rem}.role-diagram{min-height:0}.model-legend{align-items:flex-start;flex-direction:column}}
  `;
  document.head.appendChild(style);
})();