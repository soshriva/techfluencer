(() => {
  if (!location.pathname.endsWith("004-vsphere-namespaces-and-zones.html")) return;

  const sources = document.querySelector("#sources");
  if (sources) sources.remove();

  const sourceLink = document.querySelector('.article-toc a[href="#sources"]');
  if (sourceLink) sourceLink.remove();

  const challengeLead = document.querySelector("#challenge .section-lead");
  if (challengeLead) {
    challengeLead.innerHTML =
      "Use the same three-part architecture method for every workload: define the <strong>namespace boundary</strong>, publish the required <strong>entitlement</strong>, and choose the appropriate <strong>zone placement</strong>.";
  }

  const style = document.createElement("style");
  style.textContent = `
    .article-content figure.visual{
      box-sizing:border-box;
      margin-left:auto;
      margin-right:auto;
      max-width:1040px;
      width:100%;
    }
    .article-content figure.visual svg,
    .article-hero figure.visual svg{
      display:block;
      height:auto;
      max-width:100%;
      width:100%;
    }
    .article-content figure.visual img,
    .article-hero figure.visual img{
      display:block;
      height:auto;
      max-width:100%;
      object-fit:contain;
      width:100%;
    }
    .article-hero figure.visual{
      box-sizing:border-box;
      max-width:920px;
      width:100%;
    }

    @media(max-width:760px){
      .article-hero{
        gap:28px;
      }
      .article-hero figure.visual,
      .article-content figure.visual{
        border-radius:16px;
        max-width:100%;
        padding:10px;
      }
      .article-content figure.visual figcaption,
      .article-hero figure.visual figcaption{
        font-size:.82rem;
        line-height:1.5;
        padding:10px 3px 2px;
      }
      .zone-vcenter-visual,
      #models figure.visual{
        overflow-x:auto;
        -webkit-overflow-scrolling:touch;
      }
      .zone-vcenter-visual svg,
      #models figure.visual svg{
        min-width:720px;
      }
      .zone-concept-visual svg{
        min-width:620px;
      }
      .zone-concept-visual{
        overflow-x:auto;
        -webkit-overflow-scrolling:touch;
      }
      .bridge-analogy-visual img{
        min-width:0;
      }
    }

    @media(max-width:480px){
      .article-hero figure.visual,
      .article-content figure.visual{
        padding:8px;
      }
      .zone-vcenter-visual svg,
      #models figure.visual svg{
        min-width:680px;
      }
      .zone-concept-visual svg{
        min-width:580px;
      }
    }
  `;
  document.head.appendChild(style);
})();
