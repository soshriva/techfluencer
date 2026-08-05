(() => {
  if (!location.pathname.endsWith("004-vsphere-namespaces-and-zones.html")) return;

  const toc = document.querySelector(".article-toc");
  if (!toc) return;

  toc.innerHTML = `
    <span>In this blog</span>
    <a href="#bridge">Bridge from Blog 3</a>
    <a href="#boundary">Choose the namespace boundary</a>
    <a href="#entitlement">Design the entitlement</a>
    <a href="#access">Separate the access layers</a>
    <a href="#zones">Understand vSphere Zones</a>
    <a href="#two-decisions">Make the two zone decisions</a>
    <a href="#models">Compare the four models</a>
    <a href="#mapping">Map namespaces to zones</a>
    <a href="#scenario">Walk through a design</a>
    <a href="#responsibility">Assign responsibilities</a>
    <a href="#vcf91">Understand the VCF 9.1 context</a>
    <a href="#knowledge">Knowledge check</a>
    <a href="#challenge">Architecture challenge</a>
    <a href="#takeaways">Key takeaways</a>
    <a href="#sources">Sources and validation</a>`;

  const style = document.createElement("style");
  style.textContent = `
    .article-toc a{
      display:block;
      padding:7px 8px;
      text-decoration:none;
    }
    .article-toc a small{display:none!important}
    .article-toc .toc-source-link{
      border-top:0;
      margin-top:0;
      padding-top:7px;
    }
  `;
  document.head.appendChild(style);
})();
