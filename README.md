### Operating System Protocol

<p align="center">
  <picture>
    <source srcset="./apps/web/public/trademark-dark.png" media="(prefers-color-scheme: dark)">
    <img src="./apps/web/public/trademark-light.png" alt="osp Logo" width="512" style="background-color: transparent; padding: 10px;"/>
  </picture>
</p>

<p align="center">
  <strong>The standard for multi-agent systems. Define agents, coordinate workflows, and build systems where agents work together.</strong>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/status-experimental-orange" alt="Experimental" />
</p>

> **⚠️ Experimental:** This project is still in active development. Interfaces and APIs may change without notice.

<p align="center">
  <a href="https://osprotocol.dev/docs">Documentation</a> |
  <a href="https://osprotocol.dev/docs/architecture">Architecture</a> |
  <a href="https://www.npmjs.com/package/osprotocol">npm</a>
</p>

#### About

The OS Protocol is an open-source specification for orchestrating, managing, and executing AI agents in distributed environments. It defines standardized interfaces across six domains:

- **System** — registry, environment, filesystem, sandbox, settings, preferences, installer, MCP client
- **Context** — read-only facades (system context, embeddings, key-value)
- **Actions** — write facades (system actions, tools, MCP servers)
- **Checks** — quality assurance (rules, judge, audit, screenshot)
- **Workflows** — execution patterns (routing, parallelization, orchestrator-workers, evaluator-optimizer)
- **Runs** — lifecycle control (timeout, retry, cancel, approval)

#### Skills (Claude Code)

This project includes skills for local development with [Claude Code](https://docs.anthropic.com/en/docs/agents-and-tools/claude-code/overview):

| Skill | Description |
|-------|-------------|
| `/ask` | Answer questions about the protocol — architecture, concepts, rationale, interfaces, domains, and design principles. |
| `/docs` | Write, edit, review, and triage documentation pages for the website. |

Skills are defined in `.claude/skills/` and provide domain-specific context so the agent can work accurately with the protocol.

#### LLM-Friendly Endpoints

The documentation site exposes machine-readable endpoints for LLM tools and agents:

| Endpoint | Description |
|----------|-------------|
| [`/llms.txt`](https://osprotocol.dev/llms.txt) | Documentation index — page titles, descriptions, and links grouped by section. |
| [`/llms-full.txt`](https://osprotocol.dev/llms-full.txt) | Full documentation content — complete markdown text of every page. |

#### About

Maintained by [@synerops](https://github.com/synerops) and open to contributions from the community.
