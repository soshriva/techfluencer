(() => {
  if (!location.pathname.endsWith("004-vsphere-namespaces-and-zones.html")) return;

  const knowledge = document.querySelector("#knowledge");
  if (!knowledge) return;

  knowledge.innerHTML = `
    <p class="section-number">12 · Knowledge check</p>
    <h2>Test the design decisions, then review every option.</h2>
    <p class="section-lead">Choose one answer for each question. The review explains why the correct option works and why the alternatives do not.</p>

    <div class="knowledge-card" data-correct="b">
      <h3>Question 1</h3>
      <p>Payments production and development use different access groups, storage policies and change windows. What is the cleaner platform design?</p>
      <div class="knowledge-options">
        <button type="button" data-answer="a">A. Put both environments in one vSphere Namespace</button>
        <button type="button" data-answer="b">B. Create separate production and nonproduction vSphere Namespaces</button>
        <button type="button" data-answer="c">C. Use one Kubernetes namespace inside a shared VKS cluster</button>
        <button type="button" data-answer="d">D. Keep one namespace and rely only on ESXi host permissions</button>
      </div>
      <div class="answer-review" hidden>
        <strong>Correct answer: B.</strong>
        <ul>
          <li><strong>Why B is correct:</strong> The platform rules are materially different, so separate vSphere Namespaces keep access, quota, storage and lifecycle controls independent.</li>
          <li><strong>Why A is wrong:</strong> A shared namespace would force both environments to share the same outer governance boundary and entitlement set.</li>
          <li><strong>Why C is wrong:</strong> A Kubernetes namespace is inside a VKS cluster. It does not replace the vSphere Namespace that governs cluster-level infrastructure access and capacity.</li>
          <li><strong>Why D is wrong:</strong> ESXi host permissions do not provide the namespace-level quotas, VM Classes, storage policies, services and zone eligibility required here.</li>
        </ul>
      </div>
    </div>

    <div class="knowledge-card" data-correct="b">
      <h3>Question 2</h3>
      <p>What does mapping a vSphere Namespace to three eligible zones provide?</p>
      <div class="knowledge-options">
        <button type="button" data-answer="a">A. Automatic application high availability</button>
        <button type="button" data-answer="b">B. Eligible infrastructure placement across three failure domains</button>
        <button type="button" data-answer="c">C. Three Kubernetes namespaces inside every VKS cluster</button>
        <button type="button" data-answer="d">D. Guaranteed disaster recovery across sites</button>
      </div>
      <div class="answer-review" hidden>
        <strong>Correct answer: B.</strong>
        <ul>
          <li><strong>Why B is correct:</strong> Zone mapping defines where namespace-backed workloads may be placed across the selected infrastructure domains.</li>
          <li><strong>Why A is wrong:</strong> Workload distribution still depends on VKS topology, replica placement, topology rules, storage and networking.</li>
          <li><strong>Why C is wrong:</strong> vSphere Zones are infrastructure domains. They do not create Kubernetes namespaces inside workload clusters.</li>
          <li><strong>Why D is wrong:</strong> Disaster recovery requires broader application, data, network and operational design. Zone mapping alone does not guarantee it.</li>
        </ul>
      </div>
    </div>

    <div class="knowledge-card" data-correct="a">
      <h3>Question 3</h3>
      <p>Which two questions produce the four supported zone design patterns discussed in this article?</p>
      <div class="knowledge-options">
        <button type="button" data-answer="a">A. One or three Management Zones, and shared Management Zones or separate Workload Zones</button>
        <button type="button" data-answer="b">B. One or three Kubernetes namespaces, and one or three StorageClasses</button>
        <button type="button" data-answer="c">C. One or three vCenter Servers, and one or three VKS clusters</button>
        <button type="button" data-answer="d">D. One or three ESXi hosts, and one or three virtual switches</button>
      </div>
      <div class="answer-review" hidden>
        <strong>Correct answer: A.</strong>
        <ul>
          <li><strong>Why A is correct:</strong> The four models combine the Supervisor control-plane choice with the workload-capacity placement choice.</li>
          <li><strong>Why B is wrong:</strong> Kubernetes namespaces and StorageClasses are workload-cluster constructs, not the basis of the Supervisor zone topology.</li>
          <li><strong>Why C is wrong:</strong> The model does not depend on the number of vCenter Servers or VKS clusters.</li>
          <li><strong>Why D is wrong:</strong> Host and virtual-switch counts are implementation details and do not define the four architecture patterns.</li>
        </ul>
      </div>
    </div>

    <div class="knowledge-card" data-correct="a">
      <h3>Question 4</h3>
      <p>Where should an application team's permission to create Deployments and Services be controlled?</p>
      <div class="knowledge-options">
        <button type="button" data-answer="a">A. Kubernetes RBAC inside the VKS cluster</button>
        <button type="button" data-answer="b">B. Only through vSphere Namespace permissions</button>
        <button type="button" data-answer="c">C. Through the VM Class assigned to the namespace</button>
        <button type="button" data-answer="d">D. Through the storage policy selected for the cluster</button>
      </div>
      <div class="answer-review" hidden>
        <strong>Correct answer: A.</strong>
        <ul>
          <li><strong>Why A is correct:</strong> Kubernetes RBAC governs API actions such as creating Deployments and Services inside the VKS cluster.</li>
          <li><strong>Why B is wrong:</strong> vSphere Namespace permissions govern the outer platform boundary, not every Kubernetes API action inside the cluster.</li>
          <li><strong>Why C is wrong:</strong> A VM Class defines a standardised compute shape. It does not grant Kubernetes API permissions.</li>
          <li><strong>Why D is wrong:</strong> A storage policy controls storage capabilities and placement, not access to Kubernetes workload objects.</li>
        </ul>
      </div>
    </div>

    <div class="knowledge-card" data-correct="c">
      <h3>Question 5</h3>
      <p>When is a shared vSphere Namespace a reasonable design?</p>
      <div class="knowledge-options">
        <button type="button" data-answer="a">A. Whenever reducing the object count is the main goal</button>
        <button type="button" data-answer="b">B. When workloads have different owners, risk levels and storage requirements</button>
        <button type="button" data-answer="c">C. When workloads genuinely share ownership, access, entitlements, lifecycle and risk</button>
        <button type="button" data-answer="d">D. Only when every workload runs in a single zone</button>
      </div>
      <div class="answer-review" hidden>
        <strong>Correct answer: C.</strong>
        <ul>
          <li><strong>Why C is correct:</strong> Sharing is appropriate when the workloads truly belong inside the same governance and operational boundary.</li>
          <li><strong>Why A is wrong:</strong> Fewer objects are not a sufficient reason to combine workloads with different policy or risk requirements.</li>
          <li><strong>Why B is wrong:</strong> Different owners, entitlements and risk levels are strong signals that separate namespaces are cleaner.</li>
          <li><strong>Why D is wrong:</strong> Zone count does not determine whether workloads should share a namespace. Governance alignment does.</li>
        </ul>
      </div>
    </div>`;

  knowledge.querySelectorAll(".knowledge-card").forEach((card) => {
    const correct = card.dataset.correct;
    const review = card.querySelector(".answer-review");
    const options = card.querySelectorAll(".knowledge-options button");

    options.forEach((button) => {
      button.addEventListener("click", () => {
        options.forEach((item) => item.classList.remove("selected", "correct-choice", "wrong-choice"));
        button.classList.add("selected");
        button.classList.add(button.dataset.answer === correct ? "correct-choice" : "wrong-choice");
        if (review) review.hidden = false;
      });
    });
  });

  const style = document.createElement("style");
  style.textContent = `
    #knowledge .knowledge-card{background:#fff;border:1px solid #dce6f5;border-radius:18px;box-shadow:0 16px 35px rgba(16,38,74,.07);margin:20px 0;padding:22px}
    #knowledge .knowledge-card h3{margin:0 0 10px}
    #knowledge .knowledge-card>p{color:#31425c;font-weight:600;margin:0}
    #knowledge .knowledge-options{display:grid;gap:10px;margin:18px 0}
    #knowledge .knowledge-options button{background:#f6f9ff;border:1px solid #d7e4fb;border-radius:13px;color:#20324d;cursor:pointer;font:inherit;padding:14px 15px;text-align:left;transition:border-color .2s,background .2s,transform .2s}
    #knowledge .knowledge-options button:hover{border-color:#2a5be0;transform:translateY(-1px)}
    #knowledge .knowledge-options button.correct-choice{background:#ecfbf6;border-color:#20ad83}
    #knowledge .knowledge-options button.wrong-choice{background:#fff4f2;border-color:#df7668}
    #knowledge .answer-review{background:#eef4ff;border-left:4px solid #2a5be0;border-radius:13px;color:#26364d;margin-top:16px;padding:18px}
    #knowledge .answer-review strong{color:#10213a}
    #knowledge .answer-review ul{margin:12px 0 0;padding-left:22px}
    #knowledge .answer-review li{margin:9px 0}
  `;
  document.head.appendChild(style);
})();
