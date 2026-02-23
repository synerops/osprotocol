# Gold Standard: runs/timeout.mdx

`runs/timeout.mdx` is the benchmark for interface documentation pages. Every element in it serves a purpose.

## What Makes It Work

### 1. Overview is specific, not generic

```
The timeout system manages time limits for workflow execution.
It ensures operations complete within specified durations and
provides configurable actions for timeout scenarios.
```

Two sentences. Says exactly what it does. No "powerful", "comprehensive", or "flexible". Compare to a placeholder:

```
The environment module handles configuration and environment
management for the protocol. It manages environment variables,
configuration files, and runtime settings.
```

The placeholder repeats the same idea three ways and says nothing specific.

### 2. Mermaid diagram shows behavior, not structure

The flowchart shows the actual decision path: start → timer → running → timeout → which action? Each branch leads to a concrete outcome (failed, cancel flow, log & continue). A reader understands the runtime behavior from the diagram alone.

### 3. TypeScript API section is verifiable

```ts
import type { Timeout, TimeoutAction } from '@osprotocol/schema/runs/timeout'
```

Real import path. The types that follow are exact copies from the schema source — not summaries, not paraphrases. A developer can copy-paste this into their code.

### 4. Each type gets its own heading and description

```
### TimeoutAction

Action to take when a timeout occurs.
```

One line. Then the type definition. No over-explanation. The type speaks for itself.

### 5. Usage examples show distinct scenarios

Three examples, each demonstrating a different `onTimeout` action:
- Simple timeout (fail, the default)
- Graceful cancellation
- Warning without failure

Each example is 3-6 lines of code with a brief comment. Real variable names, real values. Not `const x = { ... }`.

### 6. Integration section is minimal and accurate

Four bullet points. Each names a specific interface and says how timeout connects to it. No generic "integrates with the broader system" language.

## The Anti-Pattern: Placeholder Pages

Every placeholder page follows the same broken template:

```
## Features
- **Feature A**: Manage A
- **Feature B**: Handle B
- **Feature C**: Support C

## Usage
[One generic sentence restating the title]

## Integration
[Generic connections to other modules]
```

This template is the enemy. It says nothing that couldn't be generated from the page title alone. When rewriting placeholders, the goal is to replace this pattern entirely with the structure from the gold standard.

## Checklist for a Complete Interface Page

- [ ] Frontmatter with specific title and description
- [ ] Overview: 2-3 sentences, specific to this interface
- [ ] Diagram (if behavior warrants it): flowchart, state diagram, or sequence
- [ ] Import statement: real, verifiable path
- [ ] Each exported type: own heading, one-line description, exact definition
- [ ] 2-3 usage examples: distinct scenarios, real variable names
- [ ] Integration: specific connections to named interfaces
- [ ] No "Coming soon", no generic bullets, no marketing language
- [ ] @experimental callout if the interface is experimental
