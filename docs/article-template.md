# Article Template

Use this template for every TechFluencer learning-loop article. It is a drafting and publication standard, not a rigid requirement to force every optional section into every article.

---

## 1. Article Identity and Scope

Complete this section before drafting.

- **Module number:**
- **Working title:**
- **Unique learning outcome:**
- **Primary question answered:**
- **Previous article dependency:**
- **What has already been covered:**
- **In scope:**
- **Out of scope:**
- **Deferred to a later module:**
- **Assumed reader knowledge:**

### Scope rule

Before drafting, identify what is genuinely new in the article. Do not repeat full explanations from earlier modules. Briefly reconnect the reader to prior concepts, then link back to the earlier article where appropriate.

Preferred continuity statement:

> The previous module introduced the concept. This article focuses on the design, operational, governance, or implementation decisions that follow.

---

## 2. Mandatory Technical Validation

Technical accuracy is non-negotiable. These articles are published publicly and may be promoted through LinkedIn.

Before suggesting, drafting, approving, or publishing technical content:

- Validate upstream Kubernetes statements against current official Kubernetes documentation.
- Validate VMware Cloud Foundation, vSphere Supervisor, VKS, vSphere Namespace, vSphere Zone, networking, storage, VM Service, and related statements against current official Broadcom or VMware documentation.
- Check version-sensitive claims against release notes, compatibility guides, support matrices, product documentation, and lifecycle documentation.
- Use official Broadcom or VMware technical blogs, reference architectures, validated solutions, and product articles only as supplementary sources.
- Use training manuals to identify topics and design considerations, but do not treat them as the sole authority for a publishable claim.
- Do not rely on exam dumps, forum posts, third-party blogs, generated text, or community discussion as authoritative evidence.
- Do not publish a claim when official sources are ambiguous, contradictory, or version-dependent without clearly qualifying it.
- Revalidate material claims immediately before final HTML publication.
- Maintain a source list and note the date on which sources were checked.

### Evidence hierarchy

1. Official Kubernetes documentation
2. Official Broadcom or VMware product documentation
3. Official release notes, compatibility guides, lifecycle documents, and support matrices
4. Official Broadcom or VMware reference architectures, validated solutions, and technical blogs
5. Licensed training material as research support
6. Practical interpretation, clearly labelled as interpretation

### Classify every material statement

Distinguish between:

- **Documented product behaviour**
- **Supported configuration**
- **Recommended architecture**
- **Practical interpretation**
- **Personal or operational opinion**
- **Assumption requiring confirmation**

Never present a recommendation or interpretation as documented product behaviour.

### Source originality rule

- Do not reproduce proprietary course slides or diagrams.
- Do not copy vendor diagrams into the article unless reuse is explicitly permitted.
- Redraw concepts in the TechFluencer visual style.
- Write the article independently, even when the source material is used for factual validation.
- Prefer citing official public documentation in the published source list.

---

## 3. Writing Style Rules

Use natural, practical English.

- Write like an experienced practitioner explaining a concept to another practitioner.
- Use direct language and short, readable paragraphs.
- Use simple words where possible, while retaining necessary technical terminology.
- Define an acronym or specialist term before relying on it.
- Avoid marketing language, exaggerated claims, and documentation-style feature dumping.
- Avoid generic transitions and inflated phrasing that make the article sound generated.
- Do not overuse em dashes.
- Prefer commas, periods, or shorter sentences where they sound more natural.
- Use lists only when they improve scanning or clarify decisions.
- Keep terminology and capitalisation consistent throughout the article.

### Strong section headings

Section headings should teach a conclusion or make a claim, not merely label a topic.

Prefer:

> Requests help the scheduler place the Pod. Limits constrain runtime consumption.

Avoid:

> Resource Requests and Limits

### Repetition control

Do not repeat the same explanation in the introduction, visual caption, body, summary, and takeaways.

Each repetition must add a different layer:

- **Introduction:** why the topic matters
- **Visual:** how components or decisions connect
- **Body:** exact technical explanation
- **Takeaway:** the decision, boundary, or memory hook

---

## 4. Editorial Approach

### Start with the problem

The article should normally follow this sequence:

> Problem → mental model → technical explanation → implementation → decisions → validation

Do not begin with a long product definition or feature list unless the article specifically requires it.

### Mental model

For abstract concepts, create one consistent analogy or mental model when it materially helps the reader.

- Use the same analogy consistently throughout the article.
- Treat the analogy as a memory aid, not a one-to-one technical definition.
- Pair the analogy with the exact technical interpretation.
- Explain where the analogy stops being accurate.

Suggested pattern:

- **Memory hook:**
- **Technical meaning:**
- **Important boundary:**

### Common misconception

Identify at least one misconception the article must correct.

Examples:

- A Namespace is not automatically a strong security boundary.
- A Kubernetes object is not always the underlying infrastructure asset itself.
- An Ingress object is not the same as the controller that implements it.

### Comparison table

Include a comparison table when two or more concepts are commonly confused.

Useful comparison dimensions include:

- Scope
- Purpose
- Owner
- Lifecycle
- Resource boundary
- Runtime behaviour
- Security or identity boundary
- Common misconception

---

## 5. Recommended Article Structure

The article structure is modular. Include the mandatory sections and add optional sections only when they improve understanding.

### Mandatory sections

1. Context and problem
2. Core concept
3. Technical architecture or operating model
4. Design or operational implications
5. Knowledge check
6. Key takeaways
7. Sources

### Optional sections

Include only when useful:

- Mental model
- Concept comparison
- VKS or VCF implementation detail
- Platform comparison
- YAML example
- CLI workflow
- UI workflow
- API object example
- Troubleshooting
- Responsibility matrix
- Decision table
- Architecture challenge
- Hands-on lab

### Suggested article skeleton

```markdown
# Article title

## 01 · Context and problem

## 02 · Core concept

## 03 · Architecture or operating model

## 04 · Commonly confused concepts

## 05 · VKS or VCF implementation

## 06 · Responsibility boundaries

## 07 · Design choices and trade-offs

## 08 · Practical example

## 09 · Knowledge check

## 10 · Architecture challenge

## 11 · Key takeaways

## Sources
```

Do not force this exact numbering when a different sequence improves the learning flow.

---

## 6. Responsibility Boundaries

For VKS, Supervisor, and VCF platform articles, explain who owns each decision or activity.

Consider:

- Platform team
- Infrastructure or virtualisation team
- Network team
- Storage team
- Security or identity team
- Kubernetes cluster administrator
- Application team

Suggested table:

| Area | Platform Team | Application Team | Other Team |
|---|---|---|---|
| Capacity |  |  |  |
| Networking |  |  |  |
| Storage |  |  |  |
| Identity and access |  |  |  |
| Cluster lifecycle |  |  |  |
| Application lifecycle |  |  |  |

Do not imply that one team owns an area when the product uses a shared-responsibility model.

---

## 7. Design Decisions and Trade-offs

Architecture-focused articles should answer:

- What decision must be made?
- What options exist?
- What are the trade-offs?
- What is the simplest viable starting point?
- When should a more complex design be used?
- What changes when scale, availability, regulation, or tenancy increases?

Preferred progression:

> Day 1 → Production → Regulated or Scale

Start with the simplest viable model, then show how it evolves deliberately.

---

## 8. Practical Examples

A practical example is required only when it reinforces the concept.

The example may use:

- YAML
- kubectl
- VCF Consumption CLI
- UI workflow
- API objects
- Architecture decision exercise
- Traffic or dependency flow
- Troubleshooting scenario

Do not force YAML into infrastructure topics where a UI, policy, topology, or design example is more appropriate.

### Code and command quality rules

When YAML, code, or CLI is included:

- Use realistic names.
- Use pinned versions where appropriate.
- State prerequisites.
- Explain important fields.
- Clearly mark partial or illustrative manifests.
- Do not present placeholder commands as production-ready.
- Validate commands before publication, or explicitly label them as illustrative.
- Avoid unsupported configurations.

---

## 9. Visual Design Standard

All primary article visuals should use a consistent **neon dark-mode enterprise technology infographic** style.

### Overall style

- Use a deep navy or near-black background.
- Use bright neon accents, primarily electric blue, cyan, violet, magenta, teal, and selective green or amber.
- Use soft glows around important components, arrows, and boundaries.
- Use subtle gradients instead of flat colour blocks.
- Use clean, modern, premium-looking enterprise infrastructure illustrations.
- Use polished cloud, networking, storage, security, virtualisation, and Kubernetes symbols.
- Maintain strong contrast so labels remain readable.
- Prefer a premium enterprise-technology aesthetic over cartoon artwork.
- Keep the visual language consistent across the learning series.
- Prefer wide 16:9 layouts, normally 1600 × 900 pixels or higher.
- Export final website visuals as high-resolution PNG files.

### Composition

- Use one clear dominant idea per visual.
- Organise components in logical layers or an obvious left-to-right flow.
- Use generous spacing and avoid crowded diagrams.
- Use arrows only where they communicate a real dependency, relationship, lifecycle step, or traffic flow.
- Use glowing borders or clearly separated zones to represent clusters, namespaces, zones, control planes, workload domains, or tenancy boundaries.
- Use consistent shapes for repeated concepts across articles.
- Make the visual understandable without requiring verbal explanation.

### Text inside images

- Keep text minimal.
- Use short labels rather than explanatory paragraphs.
- Ensure every label is technically accurate.
- Avoid tiny text, particularly in wide diagrams.
- Avoid decorative titles that simply repeat the article heading.
- Do not place the TechFluencer logo or name inside generated images unless specifically requested.
- Check spelling, capitalisation, and official product naming before accepting an image.
- Reject or correct generated images containing inaccurate, duplicated, malformed, or unreadable text.

### Hero image

- Use a 16:9 landscape layout.
- Keep it simpler than the technical architecture diagrams.
- Communicate the article's central concept immediately.
- Use one focal visual and normally no more than five or six major labels.
- Ensure it works at desktop and mobile sizes.
- Do not use a dense architecture diagram as the hero.
- Do not include the full article title inside the image unless explicitly required.
- Do not reuse the detailed architecture diagram as the hero image.

### Technical architecture diagram

- May be more detailed than the hero.
- Must accurately represent documented architecture.
- Clearly distinguish management plane, control plane, workload plane, infrastructure, and consumers where relevant.
- Use arrows and boundaries consistently.
- Redraw vendor concepts in the TechFluencer style rather than copying vendor diagrams.
- The diagram must pass the anti-storytelling test.

### Concept infographic

- Use the same dark neon visual language.
- Translate an abstract concept into a memorable operating model.
- Pair the analogy with exact Kubernetes, VCF, Supervisor, or VKS terminology.
- A top analogy row and a bottom technical row can be used when appropriate.
- Use numbered stages for workflows such as request, provisioning, assignment, and consumption.

### Image captions

Use a caption only when it adds technical context, qualification, or interpretation.

Do not use a caption that merely:

- repeats the image title
- describes what is already visually obvious
- repeats the sentence immediately above or below the image

### Standard generation brief

> Create a premium enterprise-technology infographic with a dark navy background, luminous neon blue, cyan, violet, magenta, teal, and selective green accents, subtle gradients, glowing boundaries, clean modern icons, strong visual hierarchy, generous spacing, and minimal technically accurate labels. Use a polished architectural style suitable for a professional technical blog promoted through LinkedIn. Avoid cartoon styling, clutter, tiny text, watermarks, embedded branding, and unverified technical relationships.

### Avoid

- Flat or generic corporate clip art
- Cartoonish illustrations
- Dense architecture used as the hero
- Excessive decorative effects that reduce readability
- Paragraphs inside images
- Low-contrast labels
- Unverified technical labels
- Misleading arrows or one-to-one mappings
- Copied vendor diagrams
- Unwanted logos, watermarks, or branding
- Visually impressive images that teach the wrong concept

---

## 10. Anti-Storytelling Test

Every section heading, diagram, table, callout, and flow should be understandable without the author verbally presenting it.

For each visual or major section, verify:

- What am I looking at?
- Why does it matter?
- What flows where?
- What boundary is being shown?
- Who owns each layer?
- What decision should the reader make?
- What assumption or limitation must be understood?

---

## 11. Knowledge Check

Use five questions as the preferred default. Use fewer only when the article is short or the concept is narrow.

Knowledge checks must be interactive and follow the standard used in Blog 001 and Blog 002.

For every question:

- Show four visible answer options.
- Let the reader select one option.
- Hide the answer review before selection.
- Reveal the review after selection.
- Clearly identify the correct answer.
- Explain why the correct answer is correct.
- Explain why every incorrect answer is wrong.
- Treat the knowledge check as learning reinforcement, not grading.

### Recommended progression

1. Definition or recall
2. Concept distinction
3. Component relationship
4. Operational behaviour
5. Architecture or design decision

### Question template

```markdown
### Question 1

Question text:

- A.
- B.
- C.
- D.

Answer review after selection:

- Correct answer:
- Why the correct answer is correct:
- Why A is wrong:
- Why B is wrong:
- Why C is wrong:
- Why D is wrong:
```

---

## 12. Architecture Challenge

Include an architecture challenge when the article teaches design, operational, networking, storage, availability, tenancy, security, or platform decisions.

### Challenge standard

- Use a small, realistic scenario.
- State explicit business and technical requirements.
- Show the expected traffic, dependency, placement, or responsibility flow where useful.
- Ask guided design questions.
- Encourage the reader to sketch or decide before revealing the answer.
- Hide the answer by default.
- Reveal **one reasonable design**, not the only valid design.
- Explain the rationale and trade-offs.
- State where alternative designs may also be valid.

Suggested structure:

```markdown
## Architecture challenge

### Scenario

### Requirements

### Expected flow

### Questions

<details>
<summary>Reveal one reasonable design</summary>

### Reference design

### Why this design works

### Trade-offs and alternatives

</details>
```

---

## 13. Metadata and Hero Rules

Do not display the following in the article hero by default:

- Author
- Audience
- Validation date
- Last-reviewed date

The website already establishes authorship and series context. The intended audience should shape the writing rather than occupy visual space.

Track product version and validation information in:

- repository notes
- source notes
- front matter
- article footer
- changelog

Display version information only when it materially helps the reader understand product behaviour.

---

## 14. Key Takeaways

Use only the number of takeaways needed to reinforce the article.

- Focus on decisions, boundaries, and durable concepts.
- Do not restate every section heading.
- Avoid arbitrary minimum or maximum counts.
- Include links or continuity to the next module when useful.

---

## 15. Sources

For every article, maintain a source list containing:

- Source title
- Publisher
- Product or Kubernetes version, where relevant
- URL
- Date checked
- Claim or section supported

Suggested format:

| Source | Publisher | Version | Date checked | Used for |
|---|---|---|---|---|
|  |  |  |  |  |

Do not publish raw proprietary training-manual content or internal-only URLs.

---

## 16. Publication Accuracy Gate

An article is not ready for publication until all relevant checks pass.

### Technical accuracy

- Every material technical claim has an official source.
- Version-sensitive statements have been checked against current documentation.
- Product terminology matches current Broadcom or Kubernetes naming.
- No unsupported configuration is presented as supported.
- No recommendation or opinion is written as product fact.
- Assumptions and limitations are clearly stated.
- Diagrams accurately reflect documented architecture.
- Code, YAML, and commands are validated or explicitly marked illustrative.

### Editorial quality

- The unique learning outcome is clear.
- The article does not unnecessarily repeat earlier modules.
- The content is problem-led rather than feature-led.
- Responsibility boundaries are explicit.
- Design trade-offs are explained.
- Analogies include technical boundaries.
- Comparison tables are used where they clarify confusion.
- Section headings teach conclusions.
- The article avoids documentation-style feature dumping.

### Visual quality

- The hero is simple and visually strong.
- Detailed diagrams appear in the relevant sections.
- All labels and arrows are technically correct.
- No vendor diagram has been copied.
- No unwanted logo, watermark, or branding appears.
- Captions add value rather than restating the image.
- Images are readable at normal browser width.
- Mobile presentation has been checked.
- The anti-storytelling test passes.

### Learning experience

- Knowledge-check answers are hidden initially.
- Every answer explanation covers the correct and incorrect options.
- The architecture challenge uses a realistic scenario where appropriate.
- The reference design is collapsed by default.
- The reference design is presented as one defensible answer, not the only answer.

### Final validation

- Official sources were rechecked immediately before HTML publication.
- The final HTML matches the approved article content.
- The article was reviewed for contradictions with earlier modules.
- The source list is complete.
