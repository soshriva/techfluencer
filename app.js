(() => {
  const loaderScript = document.currentScript;
  const baseUrl = new URL(".", loaderScript?.src || location.href);

  const loadScript = (file, onload) => {
    const script = document.createElement("script");
    script.src = new URL(file, baseUrl).href;
    script.defer = true;
    script.onload = onload;
    script.onerror = () => console.error(`Unable to load ${file}`);
    document.head.appendChild(script);
  };

  loadScript("app-base.js", () =>
    loadScript("blog4-sections.js", () =>
      loadScript("blog4-knowledge.js", () => loadScript("blog4-final-review.js"))
    )
  );
})();
