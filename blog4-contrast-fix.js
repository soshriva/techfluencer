(() => {
  if (!location.pathname.endsWith("004-vsphere-namespaces-and-zones.html")) return;

  const challenge = document.querySelector("#challenge");
  if (!challenge) return;

  const keyQuestion = [...challenge.querySelectorAll(".plain-callout")].find((item) =>
    item.textContent.includes("Does a separate namespace") ||
    item.textContent.includes("Should every separate vSphere Namespace")
  );

  if (keyQuestion) {
    keyQuestion.classList.add("challenge-key-question");
    keyQuestion.innerHTML =
      "<strong>Key question:</strong> Should every separate vSphere Namespace also have its own Workload Zone? Explain why or why not for each workload.";
  }

  const style = document.createElement("style");
  style.textContent = `
    #challenge .challenge-key-question{
      background:#eef4ff!important;
      border:1px solid #c9d8f4!important;
      border-left:5px solid #2a5be0!important;
      border-radius:16px!important;
      color:#172a45!important;
      font-size:clamp(1rem,1.5vw,1.12rem)!important;
      line-height:1.65!important;
      margin:26px 0!important;
      padding:20px 22px!important;
    }
    #challenge .challenge-key-question strong{
      color:#10213a!important;
      font-weight:800!important;
    }
    #challenge .challenge-key-question,
    #challenge .challenge-key-question *{
      opacity:1!important;
      text-shadow:none!important;
    }
    @media(max-width:760px){
      #challenge .challenge-key-question{
        border-radius:13px!important;
        font-size:1rem!important;
        line-height:1.55!important;
        margin:20px 0!important;
        padding:16px 17px!important;
      }
    }
  `;
  document.head.appendChild(style);
})();
