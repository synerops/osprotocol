# Documentation Templates

## Interface Page

For documenting a protocol interface backed by a `.ts` file in `packages/schema/`.

```mdx
---
title: [Interface Name]
description: [One sentence: what it does and where it fits]
---

## Overview

[2-3 sentences. What this interface is, what role it plays in the protocol, what platforms/providers it maps to. No fluff.]

[Optional: Mermaid diagram if it clarifies behavior]

## TypeScript API

\`\`\`ts
import type { [Types] } from '@osprotocol/schema/[domain]/[file]'
\`\`\`

### [TypeName]

[One line: what this type represents.]

\`\`\`ts
[Exact type definition from schema source]
\`\`\`

[Repeat for each exported type/interface]

## Usage Examples

### [Scenario Name]

\`\`\`ts
[Concrete example with descriptive variable names]
\`\`\`

### [Another Scenario]

\`\`\`ts
[Another example showing a different aspect]
\`\`\`

## Integration

[Interface Name] integrates with:

- **[Related Interface]**: [How they connect]
- **[Related Interface]**: [How they connect]
```

### Notes

- Copy types exactly from the `.ts` source. Do not paraphrase.
- Import path must match a real entry in `packages/schema/package.json` exports.
- For `@experimental` interfaces, add a `<Callout type="warn">` after Overview.
- Usage examples should cover 2-3 distinct scenarios.
- Integration section: only list real, meaningful connections.

## Domain Index Page

For domain landing pages (e.g., `system/index.mdx`, `context/index.mdx`).

```mdx
---
title: [Domain Name]
description: [One sentence: what this domain covers]
---
import { [Icons] } from 'lucide-react';

## Overview

[2-3 sentences. What this domain is, its role in the protocol architecture, what it provides to agents.]

## [Domain] Interfaces

<Cards>
  <Card icon={<IconName />} href="/docs/[domain]/[interface]" title="[Interface]">
    [One sentence description.]
  </Card>
  [Repeat for each interface in the domain]
</Cards>

## Integration

[Domain name] integrates with:

- **[Related Domain/Interface]**: [How they connect]
```

### Notes

- Icons come from `lucide-react`. Choose icons that match the interface concept.
- Only link to pages that exist. If a page is pending creation, don't include its Card yet.
- Overview should mention the domain's position in the protocol architecture (Agent Loop, System, Execution, Apps).
- Keep descriptions in Cards to one sentence.
