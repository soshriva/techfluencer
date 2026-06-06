# TechFluencer Editorial Charter

This charter governs the VKS Learning Loop blog series and related Kubernetes, VCF, platform engineering, and infrastructure content.

## Primary Audience

- Infrastructure engineers
- Platform engineers
- Kubernetes administrators
- Cloud architects
- VMware and VCF practitioners moving into Kubernetes
- OpenShift, EKS, AKS, GKE, upstream Kubernetes, and vSphere users evaluating VKS

## Core Principle

Every article must be vendor-neutral first and VKS-specific second.

The reader should understand the Kubernetes/platform concept before seeing how VKS implements it.

## Content Philosophy

Every article should:

1. Explain the core Kubernetes or platform concept without assuming VMware knowledge.
2. Translate the concept for readers from upstream Kubernetes, OpenShift, EKS, AKS, GKE, and vSphere backgrounds.
3. Explain how VKS implements or extends the concept.
4. Make responsibility boundaries explicit.
5. Include architecture-oriented explanations, not only operational procedures.
6. Compare VKS with relevant alternatives fairly and technically.
7. Include hands-on examples where possible.
8. Include sources and a version-validation date.
9. Clearly separate stable concepts from version-sensitive implementation details.
10. Help practitioners design, operate, troubleshoot, and explain the platform.

## Standard Lesson Format

Every article should consistently include these sections:

### 1. Concept

Vendor-neutral explanation of the Kubernetes or platform concept.

Cover:

- What problem this concept solves
- Why Kubernetes or platform teams need it
- How it works at a high level
- Common terminology

### 2. VKS Implementation

Explain how VKS handles the concept.

Cover:

- Relevant VKS and VCF components
- Supervisor, VCF namespaces, workload clusters, VKr, networking, storage, identity, or lifecycle components where applicable
- Platform administrator responsibilities
- Developer or application team responsibilities

### 3. Platform Comparison

Compare VKS with relevant platforms such as:

- Upstream Kubernetes
- OpenShift
- EKS
- AKS
- GKE
- vSphere-based Kubernetes or infrastructure models

Comparison dimensions may include:

- Architecture
- Operations
- Security
- Lifecycle management
- Networking
- Storage
- Governance
- User experience

### 4. Architecture Diagram

Include an architecture diagram or ASCII diagram showing:

- Components
- Request flow
- Control-plane responsibilities
- Infrastructure responsibilities
- Platform/application team boundaries

### 5. Hands-On Example

Include a practical example where appropriate:

- YAML
- kubectl commands
- Configuration snippets
- Guided lab
- Troubleshooting commands
- Design walkthrough

The example should reinforce the article concept.

### 6. Knowledge Check

Include five questions with answers and explanations.

Questions should increase in difficulty and test understanding, not memorization only.

### 7. Architecture Challenge

Include a realistic customer scenario requiring design decisions.

The challenge should focus on:

- Trade-offs
- Responsibility model
- Security
- Availability
- Scalability
- Operational risk
- Migration or adoption considerations

### 8. Key Takeaways

Include five to ten concise takeaways that practitioners should remember.

### 9. Sources and Version Validation

Include official sources where possible and a version-validation date.

Use this format:

```text
Sources reviewed:
- <source 1>
- <source 2>

Version-validation date: <date>
Last-reviewed date: <date>
```

## VKS Learning Loop Curriculum

The VKS Learning Loop is a progressive curriculum, not a collection of independent articles. Each module should build on previous concepts while keeping explanations accessible to infrastructure and platform practitioners.

### Module 1 — What Is VKS?

Learning objectives:

- VKS positioning and use cases
- Differences from upstream Kubernetes
- Differences from managed Kubernetes
- Shared-responsibility model

Outcome:

Readers understand where VKS fits in the Kubernetes landscape.

### Module 2 — Kubernetes Foundations for Infrastructure and Platform Practitioners

Learning objectives:

- Relevant foundations without assuming VMware knowledge
- Translation guides for upstream Kubernetes users
- Translation guides for OpenShift users
- Translation guides for EKS users
- Translation guides for AKS users
- Translation guides for GKE users
- Translation guides for vSphere users

Outcome:

Readers build the Kubernetes foundation required for VKS.

### Module 3 — VCF and VKS Core Concepts

Learning objectives:

- Supervisor
- VCF namespaces
- Workload clusters
- Kubernetes releases and VKr
- Mapping to equivalent concepts on other platforms

Outcome:

Readers understand the core VKS building blocks.

### Module 4 — VKS Architecture and Request Flow

Learning objectives:

- Management and workload components
- Cluster provisioning flow
- Control-plane responsibilities
- Infrastructure responsibilities

Outcome:

Readers understand how VKS works internally.

### Module 5 — Networking

Learning objectives:

- VDS and NSX
- Pod networking
- Node networking
- Service networking
- Load balancing
- Ingress
- Multi-network
- OpenShift SDN/OVN comparison
- Cloud CNI comparison

Outcome:

Readers understand end-to-end networking architecture.

### Module 6 — Storage and Persistent Workloads

Learning objectives:

- CSI
- Storage policies
- Persistent volumes
- Stateful applications
- Comparison with alternative Kubernetes storage models

Outcome:

Readers understand stateful workload design.

### Module 7 — Cluster Lifecycle and Availability

Learning objectives:

- Provisioning
- Scaling
- Deletion
- Upgrade strategies
- High availability
- VKr lifecycle
- Compatibility

Outcome:

Readers understand lifecycle operations.

### Module 8 — Identity and Security

Learning objectives:

- Authentication
- Authorization
- Kubernetes RBAC
- VCF namespace permissions
- Secrets
- Policies
- Workload security
- OpenShift IAM comparison
- Public-cloud IAM comparison

Outcome:

Readers understand platform security architecture.

### Module 9 — Observability and Troubleshooting

Learning objectives:

- Logs
- Metrics
- Events
- Infrastructure-to-application troubleshooting
- Common failure scenarios
- Troubleshooting decision trees

Outcome:

Readers can systematically troubleshoot VKS.

### Module 10 — Registry, Packages and Platform Services

Learning objectives:

- Harbor
- Package management
- Service mesh
- Application platform capabilities
- Helm comparison
- Operator comparison
- Cloud add-on comparison

Outcome:

Readers understand platform services beyond Kubernetes.

### Module 11 — Fleet and Multi-Cluster Management

Learning objectives:

- Cluster consistency
- Governance
- Policy management
- Multi-cluster operations
- ACM comparison
- Rancher comparison
- Cloud fleet tooling comparison

Outcome:

Readers understand operations at scale.

### Module 12 — Enterprise Workloads

Learning objectives:

- AI workloads
- GPU workloads
- Databases
- Stateful applications
- Developer platforms
- Regulated environments
- Disconnected environments

Outcome:

Readers understand enterprise production use cases.

### Module 13 — Architecture and Adoption

Learning objectives:

- Design patterns
- Sizing
- Availability
- Platform operating models
- Migration from OpenShift
- Migration from upstream Kubernetes
- Migration from public cloud
- When VKS is the right platform
- When VKS is not the right platform

Outcome:

Readers can design adoption strategies and make platform decisions.

## Curriculum Rule

Every advanced module must reference prerequisite modules and concepts.

Examples:

Networking references:

- Kubernetes Services
- Pods
- Workload Clusters

Storage references:

- CSI foundations
- Persistent Volumes
- Workload Clusters

Fleet Management references:

- Supervisor
- VCF Namespaces
- Workload Clusters

The VKS Learning Loop should guide readers from initial positioning to production architecture and adoption decisions.

## Content Lifecycle Rule

Every article must contain:

- Sources reviewed
- Version-validation date
- Last-reviewed date

Articles older than six months should be revalidated against current VKS, VCF, Kubernetes, and VKr releases.

## Comparison Framework

When comparing platforms, use this structure where useful:

| Area | VKS | OpenShift | EKS/AKS/GKE | Upstream Kubernetes |
|---|---|---|---|---|
| Cluster lifecycle |  |  |  |  |
| Networking |  |  |  |  |
| Storage |  |  |  |  |
| Security |  |  |  |  |
| Governance |  |  |  |  |
| Multi-cluster |  |  |  |  |
| Operations |  |  |  |  |

## Learning Loop Model

Every article should follow:

```text
Learn -> Compare -> Implement -> Validate -> Challenge
```

Reader outcome:

1. Understand the concept.
2. Understand the VKS implementation.
3. Compare VKS with relevant alternatives.
4. Validate understanding through a quiz.
5. Apply knowledge through an architecture challenge.

## Quality Gate Before Publishing

Before publishing, verify that the article includes:

- Vendor-neutral concept explanation
- VKS implementation
- Platform comparison
- Architecture diagram
- Hands-on example
- Five-question knowledge check with explanations
- Architecture challenge
- Key takeaways
- Sources reviewed
- Version-validation date
- Last-reviewed date
