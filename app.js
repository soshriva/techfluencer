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

  // Versioned asset prevents a previously cached Blog 4 renderer from restoring
  // the obsolete zone-model markup.
  loadScript("app-base.js?v=blog4-zone-models-20260806", () =>
    loadScript("blog4-sections.js", () =>
      loadScript("blog4-knowledge.js", () =>
        loadScript("blog4-final-review.js", () =>
          loadScript("blog4-toc.js", () =>
            loadScript("blog4-design-clarity.js", () =>
              loadScript("blog4-challenge.js", () =>
                loadScript("blog4-mobile-polish.js", () =>
                  loadScript("blog4-contrast-fix.js", () => loadScript("blog4-model-validation.js"))
                )
              )
            )
          )
        )
      )
    )
  );
})();
