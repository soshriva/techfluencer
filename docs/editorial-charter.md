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
```

## Required Topic Coverage

The VKS Learning Loop should progressively cover:

### Kubernetes Foundations for Infrastructure and Platform Practitioners

- Relevant Kubernetes foundations without assuming VMware knowledge
- Translation guides for upstream Kubernetes, OpenShift, EKS, AKS, GKE, and vSphere users

### What Is VKS?

- VKS positioning and use cases
- Differences from upstream and managed Kubernetes
- Shared-responsibility model

### VCF and VKS Core Concepts

- Supervisor
- VCF namespaces
- Workload clusters
- Kubernetes releases and VKr
- Mapping to equivalent concepts on other platforms

### VKS Architecture and Request Flow

- Management and workload components
- Cluster provisioning flow
- Control-plane and infrastructure responsibilities

### Networking

- VDS and NSX
- Pod, node, and service networking
- Load balancing and ingress
- Multi-network
- Comparisons with OpenShift SDN/OVN and cloud CNI models

### Storage and Persistent Workloads

- CSI and storage policies
- Persistent volumes
- Stateful applications
- Comparison with other Kubernetes storage models

### Cluster Lifecycle and Availability

- Provisioning, scaling, and deletion
- Upgrade strategies
- High availability
- VKr lifecycle and compatibility

### Identity and Security

- Authentication and authorization
- Kubernetes RBAC
- VCF namespace permissions
- Secrets, policies, and workload security
- Comparison with OpenShift and public-cloud IAM

### Observability and Troubleshooting

- Logs, metrics, and events
- Infrastructure-to-application troubleshooting
- Common failure scenarios
- Troubleshooting decision trees

### Registry, Packages, and Platform Services

- Harbor
- Package management
- Service mesh
- Application platform capabilities
- Comparison with Helm, Operators, and cloud add-ons

### Fleet and Multi-Cluster Management

- Cluster consistency
- Policy and governance
- Multi-cluster operations
- Comparison with ACM, Rancher, and cloud fleet tooling

### Enterprise Workloads

- AI and GPU workloads
- Databases and stateful applications
- Developer platforms
- Regulated and disconnected environments

### Architecture and Adoption

- Design patterns
- Sizing and availability
- Platform operating models
- Migration from OpenShift, upstream Kubernetes, and public cloud
- When VKS is and is not the right platform

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
- Sources
- Version-validation date
