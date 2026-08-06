# vSphere Namespaces and Zones: Designing Resource, Access, and Availability Boundaries

## Article identity

- **Module:** 04
- **Series:** VKS Learning Loop
- **Unique learning outcome:** Explain how platform teams use vSphere Namespaces and vSphere Zones to govern who can consume infrastructure, how much they can consume, and where workloads are allowed to run.
- **Previous module dependency:** Module 03 introduced Supervisor, vSphere Namespaces, VKS clusters, Kubernetes namespaces, VKr, Cluster API, VM Classes, Storage Policies, Spherelet, CRX, and Supervisor Services.
- **In scope:** vSphere Namespace architecture, resource and access boundaries, vSphere Namespace versus Kubernetes namespace, tenancy patterns, zone models, namespace-to-zone mapping, responsibility boundaries, and design trade-offs.
- **Out of scope:** Detailed Supervisor activation, full networking-stack design, detailed storage topology design, and complete VKS cluster provisioning.

---

## 01 · Why Kubernetes namespaces are not enough for the platform team

Kubernetes namespaces solve an important problem inside a Kubernetes cluster. They provide a scope for namespaced objects such as Deployments and Services, and they can be combined with RBAC and ResourceQuota to divide cluster resources among teams.

But a platform team has a wider problem to solve.

Before an application team can create a Kubernetes namespace, someone must decide:

- Which infrastructure the team may consume
- How much CPU, memory, and storage it may use
- Which storage policies are available
- Which VM Classes may be selected
- Which networks and platform services are exposed
- Which users and groups have access
- Which failure domains the workloads may use

A standard Kubernetes namespace does not represent all of these vSphere infrastructure decisions.

This is where the **vSphere Namespace** becomes important.

> **Memory hook:** A Kubernetes namespace organises application resources inside one Kubernetes cluster. A vSphere Namespace governs access to infrastructure and platform capabilities delivered through Supervisor.

### Important boundary

A namespace, by itself, should not be treated as proof of strong tenant isolation. Effective isolation depends on the wider design, including identity, RBAC, resource controls, networking, storage, and operational policy.

---

## 02 · What is a vSphere Namespace?

A vSphere Namespace is a platform consumption boundary on Supervisor. It is the place where administrators assign infrastructure capacity, access, services, and placement options for workloads such as VKS clusters, VM Service virtual machines, vSphere Pods, and Supervisor Services.

A useful way to understand it is through four boundaries.

### Resource boundary

The namespace is associated with infrastructure capacity and resource controls. Administrators can determine how much CPU, memory, and storage the namespace is allowed to consume.

### Access boundary

Users and groups receive permissions that determine what they may do in the namespace. This is a platform-level access decision and is separate from the Kubernetes RBAC configured inside a VKS cluster.

### Service-consumption boundary

The namespace exposes approved platform capabilities, such as storage policies, VM Classes, content libraries, networking options, and Supervisor Services.

### Placement boundary

A namespace can be associated with one or more vSphere Zones, which defines the infrastructure locations available to workloads created through that namespace.

> **One-sentence definition:** A vSphere Namespace is the governed platform boundary through which teams consume Supervisor infrastructure and services.

---

## 03 · vSphere Namespace versus Kubernetes namespace

The names sound similar, but they operate at different layers.

| Area | vSphere Namespace | Kubernetes namespace |
|---|---|---|
| Primary scope | Supervisor and vSphere platform consumption | Resources inside one Kubernetes cluster |
| Typical owner | Platform or vSphere administrator | Kubernetes administrator or application team |
| Main purpose | Govern infrastructure, services, access, and placement | Organise namespaced Kubernetes objects |
| Typical workloads | VKS clusters, VM Service VMs, vSphere Pods, Supervisor Services | Pods, Deployments, StatefulSets, Services, ConfigMaps, Secrets |
| Capacity controls | vSphere resource controls and assigned storage policies | ResourceQuota and LimitRange |
| Storage exposure | Publishes approved storage policies | Applications consume StorageClasses and PVCs |
| Compute choices | Publishes VM Classes and platform capabilities | Pods request CPU and memory; the scheduler places them on nodes |
| Identity and access | Platform permissions and identity-provider integration | Kubernetes RBAC with Roles, ClusterRoles, RoleBindings, and ClusterRoleBindings |
| Placement | Can be mapped to vSphere Zones | Pod placement occurs within the Kubernetes cluster using scheduling controls |
| Lifetime | Platform boundary may outlive individual VKS clusters | Exists inside the lifecycle of one Kubernetes cluster |

### The layered view

A typical consumption path looks like this:

> VCF or vCenter governance → Supervisor → vSphere Namespace → VKS cluster → Kubernetes namespace → application workloads

This layered model explains why both namespace types are needed.

The platform team governs the vSphere Namespace. The application team works primarily inside Kubernetes namespaces in the VKS cluster.

---

## 04 · What the platform team assigns to a vSphere Namespace

A vSphere Namespace is useful because it brings several platform controls together in one place.

### CPU and memory capacity

Administrators can define resource boundaries so that one team or project does not consume unlimited shared infrastructure.

These controls are not the same as Kubernetes container requests and limits.

- The vSphere Namespace controls the infrastructure capacity available to workloads created through the namespace.
- Kubernetes requests and limits control scheduling and runtime resource behaviour inside the VKS cluster.

Both layers matter.

### Storage policies

Storage policies determine which storage capabilities are available to workloads in the namespace. A storage policy can represent characteristics such as availability, performance, data placement, or datastore compatibility.

The application team later consumes the published storage capability through Kubernetes storage constructs.

> **Memory hook:** The platform team publishes the approved storage menu. The application team requests storage from that menu.

### VM Classes

VM Classes define approved virtual-machine shapes and capabilities. They can be used for VKS control-plane and worker nodes, as well as VM Service workloads where applicable.

A platform team might publish:

- Small general-purpose classes for development
- Larger classes for production application nodes
- Memory-optimised classes for data services
- GPU-enabled classes for specialised workloads

### Content and images

Where relevant, administrators can make approved content libraries and images available for VM-based services.

### Networking

The networking model determines how namespace workloads connect to infrastructure and how isolation is implemented. The exact behaviour depends on the Supervisor networking architecture, such as NSX VPC, NSX Segment, or VDS networking.

This article does not attempt to redesign the networking stack. The key point is that networking is part of the platform boundary exposed through the namespace.

### Users, groups, and permissions

Administrators assign access to users and groups. This determines who can inspect, deploy, or administer resources through the vSphere Namespace.

This is distinct from permissions inside a VKS cluster.

### Zone mappings

A namespace may be associated with one or more vSphere Zones. That mapping defines the available infrastructure placement domains for workloads created through the namespace.

---

## 05 · A vSphere Namespace is not just a folder

It is easy to mistake the namespace for a visual organisation object in the vSphere Client. That interpretation is too limited.

A folder helps organise inventory. A vSphere Namespace is an active platform boundary with resource, access, service, and placement implications.

A practical mental model is:

> **Folder = where administrators organise objects.**  
> **vSphere Namespace = what a team is entitled to consume.**

The namespace extends the familiar resource-governance model into Supervisor. It creates a dedicated governed context for modern workloads rather than merely grouping objects for display.

---

## 06 · Single-tenant and multi-tenant namespace designs

There is no universal rule that one namespace must map to one application, one team, or one environment. The correct boundary depends on ownership, policy, lifecycle, and risk.

### Pattern 1: One namespace per application

Use this when an application requires independent capacity, storage, access, and lifecycle controls.

**Suitable for:**

- Regulated applications
- Applications with dedicated owners
- Workloads with distinct storage or networking needs
- Applications that require separate change control

**Trade-off:** Stronger separation, but more namespaces to operate.

### Pattern 2: One namespace per team

A team receives a platform boundary and creates one or more VKS clusters or VM workloads within it.

**Suitable for:**

- Stable product teams
- Shared ownership across several related applications
- Common policies and lifecycle

**Trade-off:** Easier administration, but unrelated workloads may become coupled to the same quota and access model.

### Pattern 3: One namespace per environment

Development, test, and production receive separate namespaces.

**Suitable for:**

- Different access controls
- Different storage tiers
- Different VM Classes
- Independent quotas
- Stronger production governance

**Trade-off:** More platform objects, but clearer environment boundaries.

### Pattern 4: Shared namespace for several workloads

Several teams or services consume one namespace.

**Suitable for:**

- Small non-production platforms
- Closely related services with the same owners and controls
- Early-stage adoption

**Trade-off:** Lower operational overhead, but weaker separation and a larger shared blast radius.

### Recommended decision rule

Share a namespace only when the workloads genuinely have the same:

- Owners
- Access model
- Capacity policy
- Storage requirements
- Network requirements
- Availability requirements
- Lifecycle expectations

When those factors differ materially, separate namespaces are usually easier to govern.

---

## 07 · What is a vSphere Zone?

A vSphere Zone is a logical grouping of vSphere infrastructure used to represent placement and failure-domain choices for Supervisor and workloads.

In common designs, a zone maps to a vSphere cluster. The zone model allows the platform architect to decide where Supervisor control-plane components and workloads may run.

Zones serve two main purposes:

1. **Availability:** Distribute control-plane components or workloads across independent infrastructure domains.
2. **Isolation:** Separate management resources from workload resources or dedicate specialised infrastructure to selected workloads.

A zone is not automatically equivalent to a full geographic disaster-recovery site. Its resilience depends on the physical design underneath it, including power, networking, storage, racks, rooms, or sites.

> **Memory hook:** A zone is an infrastructure placement and failure-domain choice, not a guarantee that every application is highly available.

---

## 08 · First choose Supervisor control-plane availability

Before choosing the zone layout, decide how much availability the Supervisor control plane needs. This is separate from the number of Management Zones.

- **One control-plane VM:** Suitable for evaluation, labs and lower-criticality environments where a control-plane outage can be tolerated.
- **Three control-plane VMs:** The production HA choice. The three VMs provide redundancy for the Supervisor control plane.

The placement choices are then:

- **One Management Zone:** Three control-plane VMs can run in the same zone and be distributed across hosts by DRS and anti-affinity. This protects against host-level failure, but not the loss of the entire zone or cluster.
- **Three Management Zones:** One control-plane VM runs in each zone. This protects the control plane from the loss of one complete Management Zone.

> **Key distinction:** One Management Zone does not automatically mean one control-plane VM. The availability decision and the zone-layout decision are related, but they are not the same decision.

---

## 09 · Management Zones and Workload Zones

VCF 9 introduces a useful separation between where Supervisor management components run and where tenant workloads run.

### Management Zone

A Management Zone provides infrastructure for the Supervisor control plane.

After selecting the control-plane availability mode, choose whether management capacity is provided by one zone or by three zones. Three Management Zones allow one control-plane VM to be placed in each zone.

### Workload Zone

A Workload Zone provides infrastructure where application-facing workloads can run, including workloads created through vSphere Namespaces.

Workload Zones can be:

- Combined with Management Zones
- Isolated from Management Zones

This creates four broad placement patterns. They show where management and workload capacity run; they do not, by themselves, state whether the Supervisor uses one or three control-plane VMs.

---

## 10 · Four zone design patterns

### Model 1: Single Management Zone with combined workloads

The Supervisor control plane and workloads use the same zone.

**Best fit:**

- Labs
- Development and test
- Smaller environments
- Production workloads that do not require zone-level separation

**Advantages:**

- Simplest architecture
- Lowest infrastructure overhead
- Easier initial operations

**Trade-offs:**

- Management and workloads share the same infrastructure domain
- A zone-level failure affects both control-plane placement and workloads in that zone

### Model 2: Single Management Zone with isolated Workload Zones

Management capacity runs in one Management Zone, while workloads run in separate Workload Zones. The Supervisor may still use three control-plane VMs within that one Management Zone.

**Best fit:**

- Environments that want management/workload isolation
- Specialised workload infrastructure
- Dedicated GPU or high-performance zones

**Advantages:**

- Workload infrastructure can scale independently
- Management resources remain separated from application workloads
- Different workload zones can be optimised for different purposes

**Trade-offs:**

- Management capacity still depends on one Management Zone
- More infrastructure and networking complexity

### Model 3: Three Management Zones with combined workloads

The three Management Zones also host workloads. When the Supervisor uses three control-plane VMs, one can run in each Management Zone.

**Best fit:**

- Production platforms requiring stronger Supervisor control-plane resilience
- Environments where shared management and workload infrastructure is acceptable

**Advantages:**

- Can protect the control plane from the loss of one Management Zone when one control-plane VM runs in each zone
- Workloads can consume multiple zones
- Fewer dedicated clusters than a fully isolated design

**Trade-offs:**

- Management and workloads still share infrastructure
- Capacity contention and operational coordination require careful design

### Model 4: Three Management Zones with isolated Workload Zones

Three Management Zones provide management capacity, while separate Workload Zones host application workloads. When the Supervisor uses three control-plane VMs, one can run in each Management Zone.

**Best fit:**

- Large enterprise platforms
- Regulated environments
- Platforms requiring strong management/workload separation
- Environments with specialised or independently scaled workload domains

**Advantages:**

- Strongest separation between management and workloads
- Higher Supervisor control-plane resilience
- Workload zones can be tailored by function

**Trade-offs:**

- Highest infrastructure cost
- Highest design and operational complexity
- Requires disciplined networking, storage, and capacity planning

### Design summary

| Model | Control-plane resilience | Management/workload isolation | Complexity | Typical use |
|---|---:|---:|---:|---|
| Single zone, combined | Basic | Low | Low | Lab, development, small production |
| Single management, isolated workloads | Basic | High | Medium | Specialised workload separation |
| Three management, combined workloads | High | Medium | Medium–high | General enterprise production |
| Three management, isolated workloads | High | High | High | Regulated or large-scale enterprise platform |

---

## 10 · Mapping a vSphere Namespace to Zones

A vSphere Namespace can be associated with up to three vSphere Zones.

That mapping defines where workloads created through the namespace are eligible to run.

### Namespace mapped to one zone

This is the simplest placement model.

Use it when:

- The workload does not require zone-level resilience
- The infrastructure is specialised, such as GPU resources
- Data locality or licensing requires placement in one zone
- The environment is non-production

The limitation is straightforward: a failure affecting that zone can make the workload unavailable unless recovery is provided elsewhere.

### Namespace mapped to multiple zones

A multi-zone namespace exposes multiple placement domains.

This can support:

- VKS clusters designed across zones
- Workload distribution across failure domains
- Better tolerance of zone-level infrastructure failure

But the mapping alone does not make an application highly available.

The following must also be designed correctly:

- VKS control-plane and worker-node topology
- Pod replica distribution
- Topology spread or affinity rules
- Storage topology and data accessibility
- Load-balancer reachability
- Application failure handling

> **Critical point:** Multi-zone infrastructure provides placement options. Application availability still depends on how the cluster and application use those options.

---

## 11 · The two layers of access control

A production VKS platform has at least two important access-control layers.

### Layer 1: Access to the vSphere Namespace

This controls who can consume platform capabilities such as:

- Creating or managing VKS clusters
- Deploying VM Service workloads
- Viewing namespace resources
- Consuming assigned policies and services

This layer is managed through the vSphere and Supervisor identity and permission model.

### Layer 2: Access inside the VKS cluster

Once a VKS cluster exists, Kubernetes RBAC controls actions inside that cluster.

Kubernetes RBAC uses objects such as:

- Role
- ClusterRole
- RoleBinding
- ClusterRoleBinding

These permissions control access to Kubernetes API resources.

### Why the distinction matters

A user might be allowed to create a VKS cluster in a vSphere Namespace but not be authorised to administer every application namespace inside every cluster.

Similarly, an application developer may have broad permissions inside one Kubernetes namespace while having no permission to change the vSphere Namespace quota, storage policies, or zone mappings.

> **Memory hook:** Platform access gets you the building. Kubernetes RBAC determines which rooms you may use inside the application environment.

---

## 12 · Responsibility model

### Platform team

The platform team typically owns:

- Supervisor architecture
- vSphere Namespace creation and lifecycle
- Namespace naming and tenancy standards
- Capacity and quota policy
- Zone design and namespace-to-zone mapping
- Storage-policy publication
- VM Class publication
- Identity integration
- Platform-level permissions
- Approved Supervisor Services
- Platform observability and capacity management

### Infrastructure teams

Depending on the operating model, infrastructure specialists may own:

- ESX cluster and zone capacity
- Physical failure-domain design
- VDS or NSX networking
- Load-balancing infrastructure
- Storage systems and storage policies
- DNS, NTP, IP address management, and routing

### Application or DevOps team

The application team typically owns:

- Selecting approved platform capabilities
- Requesting or creating VKS clusters
- Kubernetes namespace design inside the VKS cluster
- Application RBAC
- Deployments, StatefulSets, Services, Ingress or Gateway resources
- Resource requests and limits
- Application availability architecture
- Backup requirements for application data
- Day-2 application operations

### Shared responsibilities

Some decisions require joint ownership:

- Production sizing
- Zone-level availability requirements
- Storage topology
- Recovery objectives
- Network segmentation
- Security policy
- Upgrade windows
- Capacity growth

The platform team provides the available boundaries. The application team must use them correctly.

---

## 13 · Design scenario: Payments, Fraud Analytics, and Reporting

A financial-services company wants to provide VKS as an internal platform.

It has three application groups.

### Payments

- Production-critical
- Requires stronger availability
- Must run across three zones
- Uses high-performance storage
- Access restricted to the Payments platform group

### Fraud Analytics

- Requires GPU-enabled worker nodes
- Uses a specialised workload zone
- Handles sensitive data
- Needs separate capacity and access controls

### Reporting

- Lower criticality
- Can run in one zone
- Uses cost-optimised storage
- Development and production must remain separate

### Proposed namespace design

| Namespace | Zone mapping | Published capabilities | Access model |
|---|---|---|---|
| `payments-prod` | Three workload zones | Production VM Classes, resilient storage policy | Payments production group |
| `fraud-analytics` | Dedicated GPU zone | GPU VM Classes, approved data storage | Fraud platform group |
| `reporting-dev` | One general-purpose zone | Small VM Classes, development storage | Reporting developers |
| `reporting-prod` | One or more production zones | Production VM Classes, production storage | Reporting operations group |

### Why separate namespaces?

The workloads have different:

- Availability requirements
- Compute profiles
- Storage policies
- Access groups
- Lifecycle expectations
- Risk levels

Combining them would make quota, access, and policy harder to govern.

### What remains inside each VKS cluster?

The application teams still decide how to organise Kubernetes namespaces for components such as:

- Frontend
- APIs
- Data processing
- Monitoring
- Platform add-ons

The vSphere Namespace does not replace Kubernetes namespace design. It creates the governed infrastructure boundary around the VKS cluster.

---

## 14 · Design decisions and trade-offs

Before creating a namespace and assigning zones, answer these questions.

### Ownership

- Is there one accountable team?
- Are several unrelated teams sharing the same boundary?
- Who approves quota changes?

### Policy

- Do all workloads need the same storage and networking policy?
- Do they share the same security classification?
- Are production and non-production controls different?

### Availability

- Is single-zone operation acceptable?
- Is zone-level failure part of the availability requirement?
- Can application replicas and storage use multiple zones correctly?

### Capacity

- Should teams compete for one shared quota?
- Are specialised resources such as GPUs required?
- Is independent scaling important?

### Operations

- Will one lifecycle or maintenance window affect all workloads?
- Does one team need independent troubleshooting access?
- Would a shared namespace increase the blast radius?

### Recommended progression

**Day 1:** Start with clear team or environment boundaries and a simple zone model.  
**Production:** Separate production from non-production and align namespaces with access and policy.  
**Regulated or scale:** Introduce multi-zone placement, specialised Workload Zones, and stronger management/workload separation.

Do not begin with the most complex model unless the requirements justify it.

---

## 15 · Common misconceptions

### “A vSphere Namespace is just a Kubernetes namespace shown in vCenter.”

Not accurate. The vSphere Namespace is a platform boundary that exposes infrastructure, services, permissions, and placement choices. Kubernetes namespaces inside a VKS cluster remain separate application-level constructs.

### “Mapping a namespace to three zones makes every application highly available.”

Not automatically. The VKS cluster, application replicas, networking, and storage must be designed to use the available zones.

### “A namespace is a complete security boundary.”

Not by itself. Security depends on identity, permissions, network policy, storage controls, workload security, and operations.

### “One namespace per team is always the right design.”

Not always. The correct boundary depends on policy, ownership, lifecycle, capacity, and risk.

### “Three Management Zones always require isolated Workload Zones.”

No. Management Zones may also be combined with workload placement. Isolation is a separate design choice.

---

## 16 · Knowledge reinforcement

### Question 1

**Which statement best describes a vSphere Namespace?**

- A. It is only a folder used to organise VMs in vCenter.
- B. It is the governed platform boundary through which teams consume Supervisor infrastructure and services.
- C. It replaces all Kubernetes namespaces inside VKS clusters.
- D. It is a physical ESX host group used only for storage.

**Answer review:**

- **Correct answer: B.** A vSphere Namespace brings together platform access, capacity, services, policies, and placement choices.
- **Why A is wrong:** A folder organises inventory, while a vSphere Namespace is an active platform-consumption boundary.
- **Why C is wrong:** Kubernetes namespaces still exist inside each VKS cluster.
- **Why D is wrong:** Zones and clusters represent infrastructure placement; a namespace is not a host group.

### Question 2

**What is the most important difference between a vSphere Namespace and a Kubernetes namespace?**

- A. A vSphere Namespace governs platform consumption, while a Kubernetes namespace scopes namespaced objects inside one Kubernetes cluster.
- B. A Kubernetes namespace can contain ESX hosts.
- C. A vSphere Namespace is used only for DNS.
- D. There is no meaningful difference.

**Answer review:**

- **Correct answer: A.** The two namespace types operate at different layers.
- **Why B is wrong:** Kubernetes namespaces contain namespaced API resources, not ESX hosts.
- **Why C is wrong:** DNS is only one service-related concern and does not define the namespace.
- **Why D is wrong:** Treating them as identical leads to incorrect responsibility and governance assumptions.

### Question 3

**What does mapping a vSphere Namespace to multiple zones provide?**

- A. Automatic application-level high availability without any further design.
- B. Additional eligible placement domains for workloads created through the namespace.
- C. Automatic creation of three Kubernetes namespaces.
- D. Guaranteed cross-site disaster recovery.

**Answer review:**

- **Correct answer: B.** Multi-zone mapping exposes additional infrastructure placement domains.
- **Why A is wrong:** The VKS cluster, application replicas, storage, and networking must also use the zones correctly.
- **Why C is wrong:** Zone mapping does not create Kubernetes namespaces.
- **Why D is wrong:** A zone is not automatically a complete disaster-recovery site.

### Question 4

**Which design provides the strongest separation between Supervisor management resources and workload resources?**

- A. Single Management Zone with combined workloads
- B. Three Management Zones with isolated Workload Zones
- C. One shared Kubernetes namespace
- D. One ESX host with several resource pools

**Answer review:**

- **Correct answer: B.** This model separates a resilient three-zone management plane from dedicated workload infrastructure.
- **Why A is wrong:** Management and workloads share the same zone.
- **Why C is wrong:** Kubernetes namespace design does not create management/workload infrastructure separation.
- **Why D is wrong:** One host does not provide zone-level separation or resilience.

### Question 5

**Where should application-team RBAC for Deployments and Services normally be implemented?**

- A. Only in the physical network
- B. Inside the VKS cluster using Kubernetes RBAC
- C. By changing the ESX host root password
- D. By assigning another storage policy

**Answer review:**

- **Correct answer: B.** Kubernetes RBAC controls access to Kubernetes API resources inside the VKS cluster.
- **Why A is wrong:** Network controls do not replace API authorisation.
- **Why C is wrong:** ESX host credentials are unrelated to application-level Kubernetes permissions.
- **Why D is wrong:** Storage policies expose storage capabilities and do not grant Kubernetes API permissions.

---

## 17 · Architecture challenge

### Design a regulated internal application platform

A company has three infrastructure zones and wants to support four workload groups:

- Customer Payments production
- Customer Payments non-production
- Fraud Analytics with GPUs
- Shared Reporting

Requirements:

- Production and non-production must have different access groups.
- Payments production must tolerate a zone-level infrastructure failure.
- Fraud Analytics must use GPU-enabled infrastructure.
- Reporting is lower criticality and can begin in one zone.
- Each workload group needs independent quota and storage policy.
- Platform administrators own namespace policy.
- Application teams own Kubernetes namespaces and workloads inside their VKS clusters.

### Your design task

Decide:

1. How many vSphere Namespaces are required?
2. Which namespaces should map to one zone and which to three zones?
3. Which VM Classes should be published to each namespace?
4. Which storage policies should be exposed?
5. Which identity groups need access?
6. Which responsibilities remain with the application teams?
7. What additional application design is required for multi-zone availability?

<details>
<summary><strong>Reveal one reasonable design</strong></summary>

This is not the only valid design. The objective is to align boundaries with ownership, risk, capacity, and availability.

| Namespace | Zone mapping | Capabilities | Access |
|---|---|---|---|
| `payments-prod` | Three production zones | Production VM Classes and resilient storage | Payments production operators |
| `payments-nonprod` | One general-purpose zone | Smaller VM Classes and non-production storage | Payments developers |
| `fraud-gpu` | Dedicated GPU Workload Zone | GPU-enabled VM Classes and approved data storage | Fraud analytics group |
| `reporting-shared` | One zone initially | General-purpose VM Classes and cost-optimised storage | Reporting group |

Additional decisions:

- Payments production requires a VKS topology and application replica design that uses the three zones.
- Storage must remain accessible or resilient according to the selected zone and data-protection design.
- Application teams define Kubernetes namespaces, RBAC, workloads, Services, and application availability inside each VKS cluster.
- The platform team monitors namespace capacity and controls published infrastructure capabilities.

</details>

---

## 18 · Key takeaways

1. A vSphere Namespace is a platform resource, access, service-consumption, and placement boundary.
2. A Kubernetes namespace scopes namespaced resources inside one Kubernetes cluster; it does not replace the vSphere Namespace.
3. Namespace design should follow ownership, policy, lifecycle, capacity, and risk rather than a universal one-namespace-per-team rule.
4. vSphere Zones provide infrastructure placement and failure-domain options for Supervisor and workloads.
5. Management Zones and Workload Zones may be combined or isolated depending on resilience and separation requirements.
6. Mapping a namespace to multiple zones does not automatically make applications highly available.
7. Platform RBAC and Kubernetes RBAC operate at different layers and must both be designed.
8. Start with the simplest model that meets the requirement, then add isolation and zone complexity deliberately.

---

## Visual plan

### Hero visual

**Concept:** Governed platform boundary.

Create a simple 16:9 neon dark-mode illustration showing:

- Supervisor as the platform foundation
- One glowing vSphere Namespace boundary
- Inside the boundary: quota, storage policy, VM Class, identity, and zone placement icons
- A VKS cluster consuming those capabilities

Maximum six major labels. Do not include the article title inside the image.

### Detailed architecture diagram

**Concept:** Layered namespace model.

Show:

> VCF/vCenter governance → Supervisor → vSphere Namespace → VKS cluster → Kubernetes namespaces → application workloads

Clearly distinguish platform-team and application-team ownership.

### Zone-model infographic

Show the four models in a 2 × 2 grid:

1. Single Management Zone, combined workloads
2. Single Management Zone, isolated Workload Zones
3. Three Management Zones, combined workloads
4. Three Management Zones, isolated Workload Zones

Use neon boundaries and consistent icons for Management Zones, Workload Zones, Supervisor control-plane VMs, and application workloads.

### Namespace-to-zone diagram

Compare:

- One namespace mapped to one zone
- One namespace mapped to three zones

Add the qualifier:

> Zone mapping provides placement choices. Workload availability still requires correct cluster, application, network, and storage design.

---

## Source-validation notes

The following source categories must be rechecked before HTML publication:

### Official Kubernetes documentation

- Kubernetes Namespaces
- Resource Quotas
- Kubernetes RBAC

### Official Broadcom/VMware documentation and articles

- vSphere Supervisor and vSphere Namespace documentation for the target VCF/vSphere version
- vSphere Zone and Supervisor availability-model documentation
- VCF 9 workload-zone documentation
- Official VMware Cloud Foundation articles on namespace hierarchy and zone architecture
- Product release notes and compatibility documentation for version-sensitive details

### Research references used for this draft

- Kubernetes documentation: Namespaces
- Kubernetes documentation: Resource Quotas
- VMware Cloud Foundation Blog: The Hierarchy of Modern Infrastructure: Mastering Namespaces in VMware Cloud Foundation, vSphere Kubernetes Service, and VCF Automation
- VMware Cloud Foundation Blog: Kubernetes on VMware Cloud Foundation 9.0: A Single Platform to Run Workloads Securely with Simplified Operations
- VMware Cloud Foundation Blog: Webinar Recap: Design and Architecture Considerations for VMware vSphere Kubernetes Service on VMware Cloud Foundation
- Broadcom vSphere Kubernetes Service: Advanced Design [V9.0] lecture manual, used only as a research aid and not as publishable source text

---

## Final publication checks

- Confirm the current supported number of zones that can be mapped to a vSphere Namespace.
- Confirm current terminology for Management Zones, Workload Zones, and Supervisor availability modes.
- Confirm whether every zone model described remains supported in the target release.
- Confirm current RBAC role names and identity workflow before adding procedural instructions.
- Confirm storage and networking statements against the exact target architecture.
- Redraw every diagram independently; do not copy training-manual or vendor diagrams.
- Convert the knowledge check to the same interactive HTML pattern used in Blogs 001 and 002.
- Keep the architecture answer collapsed by default.
