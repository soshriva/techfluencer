(() => {
  if (!location.pathname.endsWith("004-vsphere-namespaces-and-zones.html")) return;

  // `app-base.js` owns Section 07.  Do not replace it here: an earlier
  // validation script restored a retired single-grid SVG after the four
  // approved diagrams had been inserted.
  const models = document.querySelector("#models");
  const cards = models?.querySelectorAll(".zone-model-sequence .zone-model-card");
  if (!cards || cards.length !== 4) {
    console.error("Blog 4 zone model sequence did not render as expected.");
  }
})();
