(() => {
  if (!location.pathname.endsWith("004-vsphere-namespaces-and-zones.html")) return;

  const models = document.querySelector("#models");
  if (!models) return;

  models.innerHTML = `
    <p class="section-number">07 · The four zone design models</p>
    <h2>Four supported patterns come from two design decisions.</h2>
    <p class="section-lead">Choose one or three Management Zones for Supervisor control-plane placement, then decide whether workloads use those same zones or additional isolated Workload Zones.</p>

    <div class="validated-model-map" role="img" aria-label="Four Supervisor zone models arranged by one or three Management Zones and combined or isolated Workload Zones">
      <div class="map-corner"><strong>Supervisor zone models</strong><span>Two decisions create four patterns</span></div>
      <div class="map-column">Combined Workload Zones<small>Workloads use the Management Zones</small></div>
      <div class="map-column">Isolated Workload Zones<small>Workloads use additional vSphere Zones</small></div>

      <div class="map-row">Single Management Zone</div>
      <article class="model-cell model-one">
        <span>Model 1</span>
        <h3>Single Management Zone with Combined Workload Zones</h3>
        <div class="role-diagram"><div class="zone-box combined"><b>M</b><b>W</b></div></div>
        <p>Supervisor control-plane components and workloads use the same vSphere Zone.</p>
        <small>Lowest architectural separation.</small>
      </article>
      <article class="model-cell model-two">
        <span>Model 2</span>
        <h3>Single Management Zone with Isolated Workload Zones</h3>
        <div class="role-diagram"><div class="zone-box management"><b>M</b></div><i>+</i><div class="zone-box workload"><b>W</b><em>1+</em></div></div>
        <p>Workloads use one or more additional zones isolated from the Management Zone.</p>
        <small>Useful for separate scaling, capacity or specialised infrastructure.</small>
      </article>

      <div class="map-row">Three Management Zones</div>
      <article class="model-cell model-three">
        <span>Model 3</span>
        <h3>Three Management Zones with Combined Workload Zones</h3>
        <div class="role-diagram"><div class="zone-box combined"><b>M</b><b>W</b></div><div class="zone-box combined"><b>M</b><b>W</b></div><div class="zone-box combined"><b>M</b><b>W</b></div></div>
        <p>Control-plane components span three Management Zones; workloads use those same zones.</p>
        <small>Improved management availability without separate workload zones.</small>
      </article>
      <article class="model-cell model-four">
        <span>Model 4</span>
        <h3>Three Management Zones with Isolated Workload Zones</h3>
        <div class="role-diagram"><div class="zone-box management"><b>M</b></div><div class="zone-box management"><b>M</b></div><div class="zone-box management"><b>M</b></div><i>+</i><div class="zone-box workload"><b>W</b><em>1+</em></div></div>
        <p>Control-plane components span three Management Zones; workloads use one or more additional isolated zones.</p>
        <small>Typically requires more infrastructure and operational coordination.</small>
      </article>
    </div>

    <div class="model-legend"><strong>Legend:</strong><span><b>M</b> Management role</span><span><b>W</b> Workload role</span><span>Symbols indicate zone roles, not virtual-machine counts.</span></div>
    <div class="plain-callout"><strong>Availability reminder:</strong> Multi-zone eligibility enables placement across failure domains. Workload availability still depends on VKS topology, replicas, storage, networking and failure handling.</div>`;

  const style = document.createElement("style");
  style.textContent = `
    .validated-model-map{display:grid;grid-template-columns:170px repeat(2,minmax(0,1fr));gap:12px;margin:28px 0;color:#dbe8ff}
    .map-corner,.map-column,.map-row,.model-cell{border:1px solid rgba(123,181,239,.28);border-radius:16px;background:#0b1b31}
    .map-corner,.map-column,.map-row{padding:16px}.map-corner strong,.map-corner span,.map-column small{display:block}.map-corner span,.map-column small{color:#aebed5;font-size:.82rem;margin-top:5px}.map-column{color:#fff;font-weight:800;text-align:center}.map-row{align-items:center;display:flex;font-weight:800;justify-content:center;text-align:center}
    .model-cell{padding:20px}.model-cell>span{color:#65e7ff;font-size:.72rem;font-weight:800;letter-spacing:.08em;text-transform:uppercase}.model-cell h3{color:#fff!important;font-size:1.02rem;line-height:1.35;margin:8px 0 14px}.model-cell p{color:#d8e6fb!important;margin:14px 0 5px}.model-cell small{color:#aebed5}
    .role-diagram{align-items:center;display:flex;flex-wrap:wrap;gap:9px;min-height:72px}.role-diagram i{color:#65e7ff;font-style:normal;font-weight:900}.zone-box{align-items:center;border:2px solid #65e7ff;border-radius:13px;display:flex;gap:8px;justify-content:center;min-height:58px;min-width:64px;padding:10px;position:relative}.zone-box b{align-items:center;border-radius:50%;display:flex;height:30px;justify-content:center;width:30px}.zone-box b:first-child{background:#9b7cff;color:#081426}.zone-box b:nth-child(2),.zone-box.workload b{background:#42e3b4;color:#081426}.zone-box.management{border-color:#9b7cff}.zone-box.workload{border-color:#42e3b4}.zone-box em{bottom:2px;color:#aebed5;font-size:.65rem;font-style:normal;position:absolute;right:5px}
    .model-legend{align-items:center;background:#eef4ff;border:1px solid #d6e3f4;border-radius:14px;color:#172a45;display:flex;flex-wrap:wrap;gap:14px;margin:18px 0;padding:15px}.model-legend span{font-size:.86rem}.model-legend b{background:#dce7fb;border-radius:50%;display:inline-flex;height:25px;justify-content:center;align-items:center;width:25px}
    @media(max-width:820px){.validated-model-map{display:block}.map-corner,.map-column,.map-row,.model-cell{margin-bottom:12px}.map-column{display:none}.map-row{justify-content:flex-start}.model-cell h3{font-size:.98rem}.role-diagram{min-height:0}.model-legend{align-items:flex-start;flex-direction:column}}
  `;
  document.head.appendChild(style);
})();