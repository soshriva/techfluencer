document.querySelectorAll(".article-header .brand-copy small").forEach((item) => {
  item.textContent = "Learning Loops & Blogs";
});

document.querySelectorAll(".article-meta span").forEach((item) => {
  if (item.textContent.trim().toLowerCase().startsWith("validated")) {
    item.remove();
  }
});

document.querySelectorAll(".article-content table").forEach((table) => {
  if (table.parentElement && table.parentElement.classList.contains("table-scroll")) return;

  const wrapper = document.createElement("div");
  wrapper.className = "table-scroll";
  table.parentNode.insertBefore(wrapper, table);
  wrapper.appendChild(table);

  const hint = document.createElement("div");
  hint.className = "table-scroll-hint";
  hint.textContent = "Swipe table sideways →";
  wrapper.parentNode.insertBefore(hint, wrapper);
});

const mobileArticleStyle = document.createElement("style");
mobileArticleStyle.textContent = `
  .table-scroll-hint {
    color: #6b7b91;
    display: none;
    font-size: .78rem;
    font-weight: 800;
    letter-spacing: .04em;
    margin: 10px 0 8px;
    text-transform: uppercase;
  }

  .table-scroll {
    max-width: 100%;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
  }

  .table-scroll table {
    margin-top: 0 !important;
  }

  @media (max-width: 700px) {
    .article-header .brand-copy small {
      font-size: .58rem !important;
      letter-spacing: .08em !important;
    }

    .article-hero {
      padding-top: 54px !important;
      padding-bottom: 58px !important;
    }

    .article-hero h1 {
      font-size: clamp(2.45rem, 10.2vw, 3.35rem) !important;
      line-height: 1.06 !important;
      margin-bottom: 24px !important;
    }

    .article-deck,
    .article-section p,
    .article-section li {
      font-size: 1rem;
      line-height: 1.72;
    }

    .article-meta {
      display: grid !important;
      gap: 10px !important;
      grid-template-columns: 1fr !important;
    }

    .table-scroll-hint {
      display: block;
    }

    .table-scroll {
      border: 1px solid var(--line);
      border-radius: 14px;
      margin: 14px 0 28px;
      overflow-x: auto;
      position: relative;
      width: 100%;
    }

    .table-scroll table {
      border-radius: 0 !important;
      margin: 0 !important;
      min-width: 720px;
    }

    .table-scroll th,
    .table-scroll td {
      opacity: 1 !important;
    }

    .visual-showcase,
    .hero-bridge-infographic,
    .article-image {
      border-radius: 18px !important;
      margin-left: auto !important;
      margin-right: auto !important;
    }
  }
`;
document.head.appendChild(mobileArticleStyle);

if (location.pathname.endsWith("003-vcf-and-vks-core-concepts.html")) {
  const knowledge = document.querySelector("#knowledge");

  if (knowledge) {
    knowledge.innerHTML = `
      <p class="section-number">17 · Knowledge reinforcement</p>
      <h2>Check the concepts before moving on.</h2>
      <p>
        Select an answer to reveal the review. This is not graded. The goal is to understand why the correct option works and why the other options do not.
      </p>

      <div class="knowledge-card" data-question="q1">
        <h3>Question 1</h3>
        <p>A team wants to create a Kubernetes cluster on VCF using VKS. Where should the platform team first define resource boundaries, storage access and permissions?</p>
        <div class="knowledge-options">
          <button type="button" data-answer="a">A. Inside the application Deployment</button>
          <button type="button" data-answer="b">B. Inside a vSphere Namespace</button>
          <button type="button" data-answer="c">C. Inside a container image</button>
          <button type="button" data-answer="d">D. Inside a Kubernetes Service</button>
        </div>
        <div class="answer-review" hidden>
          <strong>Correct answer: B.</strong>
          <ul>
            <li><strong>Why B is correct:</strong> A vSphere Namespace is the platform-level boundary where permissions, quotas, storage policies, VM classes and services are made available.</li>
            <li><strong>Why A is wrong:</strong> A Deployment describes application workload state inside a Kubernetes cluster; it does not define the platform boundary around cluster creation.</li>
            <li><strong>Why C is wrong:</strong> A container image contains application packaging, not infrastructure governance.</li>
            <li><strong>Why D is wrong:</strong> A Service gives stable network access to Pods. It does not define cluster-level capacity, storage access or permissions.</li>
          </ul>
        </div>
      </div>

      <div class="knowledge-card" data-question="q2">
        <h3>Question 2</h3>
        <p>What is the best description of a VKS cluster?</p>
        <div class="knowledge-options">
          <button type="button" data-answer="a">A. A vCenter plug-in</button>
          <button type="button" data-answer="b">B. A Supervisor control plane VM</button>
          <button type="button" data-answer="c">C. A conformant Kubernetes cluster created through VKS for application workloads</button>
          <button type="button" data-answer="d">D. A storage policy</button>
        </div>
        <div class="answer-review" hidden>
          <strong>Correct answer: C.</strong>
          <ul>
            <li><strong>Why C is correct:</strong> A VKS cluster is the Kubernetes workload cluster where application teams deploy standard Kubernetes objects such as Pods, Deployments and Services.</li>
            <li><strong>Why A is wrong:</strong> VKS is not just a vCenter plug-in. It is a Kubernetes cluster service delivered through Supervisor and the VCF operating model.</li>
            <li><strong>Why B is wrong:</strong> Supervisor control plane VMs run the Supervisor platform control plane; they are not the same thing as a VKS workload cluster.</li>
            <li><strong>Why D is wrong:</strong> A storage policy defines storage capability. It may be consumed by workloads, but it is not the Kubernetes cluster itself.</li>
          </ul>
        </div>
      </div>

      <div class="knowledge-card" data-question="q3">
        <h3>Question 3</h3>
        <p>What does VKr control?</p>
        <div class="knowledge-options">
          <button type="button" data-answer="a">A. Which Kubernetes releases are available and supported for VKS clusters</button>
          <button type="button" data-answer="b">B. Which vCenter folder a VM appears in</button>
          <button type="button" data-answer="c">C. Which Service Engine is used by the load balancer</button>
          <button type="button" data-answer="d">D. Which DNS server the cluster uses</button>
        </div>
        <div class="answer-review" hidden>
          <strong>Correct answer: A.</strong>
          <ul>
            <li><strong>Why A is correct:</strong> VKr represents approved Kubernetes release packages available for VKS cluster lifecycle.</li>
            <li><strong>Why B is wrong:</strong> vCenter folder placement is an inventory and organization concern, not the role of VKr.</li>
            <li><strong>Why C is wrong:</strong> Load-balancer service engines relate to networking and load-balancing implementation, not Kubernetes release selection.</li>
            <li><strong>Why D is wrong:</strong> DNS is part of cluster and network configuration. VKr is about the supported Kubernetes release package.</li>
          </ul>
        </div>
      </div>

      <div class="knowledge-card" data-question="q4">
        <h3>Question 4</h3>
        <p>Why is Cluster API important in VKS?</p>
        <div class="knowledge-options">
          <button type="button" data-answer="a">A. It replaces vCenter</button>
          <button type="button" data-answer="b">B. It provides declarative lifecycle management for Kubernetes clusters</button>
          <button type="button" data-answer="c">C. It stores container images</button>
          <button type="button" data-answer="d">D. It is used only for backups</button>
        </div>
        <div class="answer-review" hidden>
          <strong>Correct answer: B.</strong>
          <ul>
            <li><strong>Why B is correct:</strong> Cluster API lets the platform represent clusters, machines and lifecycle operations as declarative resources.</li>
            <li><strong>Why A is wrong:</strong> VKS still relies on vSphere and vCenter as part of the infrastructure platform. Cluster API does not replace them.</li>
            <li><strong>Why C is wrong:</strong> Container images are stored in registries such as Harbor or other registry services.</li>
            <li><strong>Why D is wrong:</strong> Backup is a separate operational capability. Cluster API is about cluster lifecycle, not only backup.</li>
          </ul>
        </div>
      </div>

      <div class="knowledge-card" data-question="q5">
        <h3>Question 5</h3>
        <p>A vSphere Pod is running directly on Supervisor. An ESX host must enter maintenance mode. Which statement is most accurate?</p>
        <div class="knowledge-options">
          <button type="button" data-answer="a">A. The vSphere Pod live-migrates using vMotion</button>
          <button type="button" data-answer="b">B. vSphere Pods do not support vMotion, so they require different operational handling</button>
          <button type="button" data-answer="c">C. The vSphere Pod becomes a VKS worker node</button>
          <button type="button" data-answer="d">D. The vSphere Pod is converted into a VM Service VM</button>
        </div>
        <div class="answer-review" hidden>
          <strong>Correct answer: B.</strong>
          <ul>
            <li><strong>Why B is correct:</strong> vSphere Pods are not compatible with vMotion and should not be treated like normal vMotion-capable VMs.</li>
            <li><strong>Why A is wrong:</strong> vMotion applies to supported virtual-machine mobility scenarios, not to vSphere Pods in this context.</li>
            <li><strong>Why C is wrong:</strong> A vSphere Pod does not become a VKS worker node. VKS worker nodes are part of a VKS workload cluster.</li>
            <li><strong>Why D is wrong:</strong> VM Service VMs and vSphere Pods are different constructs. One is not automatically converted into the other.</li>
          </ul>
        </div>
      </div>
    `;
  }
}

function initKnowledgeCards() {
  document.querySelectorAll(".knowledge-card").forEach((card) => {
    const options = card.querySelectorAll(".knowledge-options button");
    const review = card.querySelector(".answer-review");

    options.forEach((option) => {
      option.addEventListener("click", () => {
        options.forEach((item) => item.classList.remove("selected"));
        option.classList.add("selected");
        if (review) review.hidden = false;
      });
    });
  });
}

initKnowledgeCards();

if (location.pathname.endsWith("001-what-is-vks.html")) {
  const fitImage = document.querySelector("#fit .article-image img");
  const fitCaption = document.querySelector("#fit .article-image figcaption");

  if (fitImage) {
    fitImage.src = "../assets/blogs/what-is-vks/vmware_cloud_foundation_and_services_infographic.png";
    fitImage.alt = "VMware Cloud Foundation as the operating foundation for VKS, VM services, Private AI, and modern applications";
  }

  if (fitCaption) {
    fitCaption.textContent = "VCF is the operating foundation. VKS is one strategic service delivered from that foundation, alongside VM services, Private AI, and modern application services.";
  }

  const style = document.createElement("style");
  style.textContent = `
    .article-hero {
      display: grid !important;
      grid-template-columns: minmax(0, 1.05fr) minmax(420px, 0.95fr) !important;
      gap: 44px !important;
      align-items: center !important;
      padding-top: 70px !important;
      padding-bottom: 70px !important;
    }

    .article-hero-copy {
      max-width: 780px !important;
    }

    .article-hero h1 {
      font-size: clamp(2.45rem, 4vw, 4.35rem) !important;
      line-height: 1.04 !important;
      margin-bottom: 24px !important;
    }

    .article-deck {
      max-width: 720px !important;
    }

    .article-hero .article-image {
      max-width: 760px !important;
      width: 100% !important;
      justify-self: stretch !important;
      align-self: center !important;
      margin: 0 !important;
    }

    .article-hero .article-image img {
      max-height: 620px !important;
      object-fit: contain !important;
    }

    .article-content .article-image {
      max-width: 980px !important;
      width: 100% !important;
      margin: 30px auto !important;
    }

    .article-content .article-image img {
      aspect-ratio: auto !important;
      display: block !important;
      height: auto !important;
      max-height: 720px !important;
      object-fit: contain !important;
      width: 100% !important;
    }

    @media (max-width: 1100px) {
      .article-hero {
        grid-template-columns: 1fr !important;
      }

      .article-hero .article-image {
        max-width: 860px !important;
        margin: 24px auto 0 !important;
      }

      .article-content .article-image img {
        max-height: 680px !important;
      }
    }
  `;
  document.head.appendChild(style);
}
