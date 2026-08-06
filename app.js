(() => {
  const loaderScript = document.currentScript;
  const baseUrl = new URL(".", loaderScript?.src || location.href);
  const version = "20260806-contrast-01";

  const loadScript = (file, onload) => {
    const script = document.createElement("script");
    const url = new URL(file, baseUrl);
    url.searchParams.set("v", version);
    script.src = url.href;
    script.defer = true;
    script.onload = onload;
    script.onerror = () => console.error(`Unable to load ${file}`);
    document.head.appendChild(script);
  };

  // Blog 4 is self-contained, like Blogs 1–3. Do not rebuild it after load.
  if (!location.pathname.endsWith("004-vsphere-namespaces-and-zones.html")) {
    loadScript("app-base.js");
  }
})();
