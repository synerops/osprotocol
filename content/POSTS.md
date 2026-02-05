# Documentation Templates by Interface

Each OSP interface requires 3 complementary documentation types following the [Diataxis Framework](https://diataxis.fr/):

| Taxonomy | Question | URL Pattern | Purpose |
|----------|----------|-------------|---------|
| **Reference** | What | `/reference/{domain}/{interface}` | Exact specification |
| **Blog** | Why | `/blog/{domain}/{interface}` | Design rationale (SEO friendly) |
| **How-to** | How | `/how-to/{domain}/{interface}` | Practical usage |

## Sources

- [Diataxis Framework](https://diataxis.fr/) - Documentation system by Daniele Procida
- [The Good Docs Project](https://www.thegooddocsproject.dev/template/api-reference) - API reference templates
- [freeCodeCamp Technical Blog Guide](https://www.freecodecamp.org/news/how-to-write-a-great-technical-blog-post-414c414b67f6/) - Technical writing best practices

---

## Template: Reference (What)

```markdown
# [Interface] Reference

## Definition

[One sentence: what it is and what it does]

## Properties

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| ... | ... | ... | ... |

## Constraints

- [Rule or limit]
- [Invariant]

## Example

[Code or YAML example]

## Related

- [Links to related interfaces]
```

---

## Template: Blog (Why)

```markdown
# Why [Interface] Exists

## The Problem

[What problem existed before, what pain it solves]

## The Design Decision

[Why it was designed this way, what alternatives were discarded]

## How It Fits

[Relationship with other protocol elements]

## Key Takeaways

- [Memorable point 1]
- [Memorable point 2]
```

---

## Template: How-to (How)

```markdown
# How to [Verb] [Interface]

## Prerequisites

- [What you need before starting]

## Steps

1. [Concrete action]
2. [Concrete action]
3. ...

## Example

[Complete copy-paste ready code]

## Troubleshooting

| Problem | Solution |
|---------|----------|
| ... | ... |
```

---

## Usage Guidelines

1. **Reference first**: Always start with the reference doc - it's the source of truth
2. **Blog for discovery**: Write the blog post to explain design decisions and improve SEO
3. **How-to for adoption**: Create how-to guides for common use cases

Each template is applicable to any OSP interface (skills, workflows, runs, etc.).
