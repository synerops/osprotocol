# Documentation Inventory

How to assess the current state of documentation. Always run these steps fresh — never rely on cached knowledge.

## Source of Truth for "What Pages Exist"

`apps/web/content/docs/meta.json` is the canonical list of pages in the documentation site. It controls the sidebar navigation and defines the section structure. When in doubt about what exists, start here.

## Step 1: List all doc pages

```bash
find apps/web/content/docs -name '*.mdx' | sort
```

This gives you every doc page that exists on the website.

## Step 2: List all schema interfaces

```bash
find packages/schema -name '*.ts' ! -name 'index.ts' ! -name '*.d.ts' | sort
```

This gives you every interface file that the protocol defines.

## Step 3: Cross-reference for schema backing

For each doc page, check if a corresponding `.ts` file exists in `packages/schema/`:

- `system/env.mdx` → check `packages/schema/system/env.ts`
- `context/embeddings.mdx` → check `packages/schema/context/embeddings.ts`
- `runs/timeout.mdx` → check `packages/schema/runs/timeout.ts`

A doc page **has schema backing** if its corresponding `.ts` file exists and exports types.
A doc page **has no schema backing** if there is no corresponding `.ts` file — it's a candidate for elimination (see below).

Also check the reverse: schema files with no doc page are **missing documentation**.

## Step 4: Classify each doc page

Read the page content and classify:

| Status | Criteria |
|--------|----------|
| **Complete** | Has real TypeScript interfaces copied from schema, usage examples, diagrams or detailed explanation |
| **Placeholder** | Generic stub: bullet-point features, no types, no examples. Typically follows the pattern: Features (4 bullets) → Usage (1 sentence) → Integration (3 bullets) |
| **Stale** | Has real content but references types or import paths that no longer exist in the schema |

## Step 5: Verify import paths

For any page showing a TypeScript import, verify the path exists:

```bash
cat packages/schema/package.json | grep -A1 '"exports"'
```

Or check specific paths:

```bash
grep -r "exports" packages/schema/package.json
```

If a page shows `import type { X } from 'osprotocol/foo/bar'` but that export path doesn't exist in `package.json`, the page is **stale**.

## Step 6: Check for broken links

Within any doc page, internal links should point to pages that exist:

```bash
# Extract all internal doc links from a page
grep -oE '\(/docs/[^)]+\)' apps/web/content/docs/path/to/page.mdx
```

Then verify each linked path has a corresponding `.mdx` file.

## Classification Guide

When assessing a page, ask these questions in order:

1. **Does the corresponding schema file exist?** If no → page has no backing → eliminate (see below).
2. **Does the page contain real TypeScript types?** If no → it's a placeholder → needs rewrite.
3. **Do the import paths and type names match the current schema?** If no → it's stale → needs update.
4. **Are the examples and explanations accurate?** If no → needs review.
5. **All checks pass?** → Page is complete.

## When to Eliminate a Page

A doc page should be **deleted** (not rewritten, not left as placeholder) when:

1. **No schema backing and not a concept page.** If there is no `.ts` file in `packages/schema/` and the page is not a concept/overview page (like `concepts/agent-loop.mdx`), the page documents something that doesn't exist in the protocol. Delete it.

2. **The concept was removed from the protocol.** If a schema file was previously deleted because it was reclassified (platform concern, infrastructure concern, eliminated during drafting), the doc page must go too. Examples: agent definition, skill definition, caching, storage.

3. **The page duplicates another page.** If the content is covered by an existing page (e.g., "memory" is covered by embeddings + kv), delete the duplicate.

After deleting a page:
- Remove its entry from `meta.json`
- Remove the section separator from `meta.json` if the section becomes empty
- Delete empty directories
- Check other pages for internal links that pointed to the deleted page

**Do not rewrite a page that should be eliminated.** The instinct to "preserve content" leads to documenting things that aren't part of the protocol. If the schema doesn't back it, it doesn't belong.
