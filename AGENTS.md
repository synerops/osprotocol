# Agentic OS Protocol: Knowledge Base

## Protocol Nature (1-10)
1. OSP is a specification, not a framework or library.
2. The protocol defines interfaces, behaviors, and data formats for orchestrating agents.
3. OSP is the contract you implement, not the code you run.
4. Like HTTP enables browsers to talk to servers, OSP enables agents to collaborate.
5. The protocol defines what must be supported, not how you must build it.
6. Different teams can implement OSP in different languages and maintain compatibility.
7. The protocol uses RFC 2119 terminology: MUST, SHOULD, MAY to define conformance.
8. OSP allows partial conformance: implement the modules you need.
9. The specification is modular: Skills, System, Context, Actions, Checks, Runs, Workflows.
10. The protocol is a "metaverse" where any agent can participate by following the rules.

## The Agentic OS Concept (11-20)
11. An Agentic OS is backend infrastructure for agents, not just a graphical interface for humans.
12. The LLM functions conceptually as the system's Kernel.
13. In an Agentic OS, the operating system user is the agent, not just the human.
14. Agents request resources from the OS: file reading, memory storage, tool execution.
15. The OS manages cognitive resources: inference, context window, vector stores, tools.
16. Context Window is the equivalent of RAM in traditional systems.
17. Vector stores and RAG are the equivalent of disk and filesystem.
18. Tools and MCP are the device drivers of the Agentic OS.
19. The filesystem is the default infrastructure; no database required to start.
20. An Agentic OS solves orchestration complexity, not just user experience.

## Plan: Structured Intent (21-30)
21. Plan is the first-class concept that represents user intent.
22. A Plan is a structured intent that generates Runs.
23. Plan defines the "what" (goal), Run defines the "how it executes".
24. A Plan can have multiple Runs (long-running executions that mutate).
25. Both Plan and Runs persist; this enables resuming work after interruptions.
26. Plan contains metadata: owner, goal, context, constraints.
27. The cycle is: user expresses intent → system generates Plan → Plan generates Runs.
28. A Plan can be paused, cancelled, or modified without losing history.
29. Persisted state of Plans and Runs enables auditing and post-mortem debugging.
30. The Plan is a primary entry point for significant work in the OS.

## Runs: Execution Unit (31-40)

```
Plan (intent)
 └── Run (controllable execution)
      └── Workflow (execution pattern)
           └── Agent Loop (gather → action → verify → iterate)
```

31. Run is the primary controllable unit of execution in the protocol.
32. A Run represents a long-running execution that can mutate its state.
33. Each Run has controls: pause, cancel, timeout, approval.
34. A Run can belong to a Plan, or exist independently for simple tasks.
35. Runs persist their state to enable recovery from failures.
36. Each Run uses a Workflow as its execution pattern.
37. Run Controls define how the system responds to external events.
38. Timeout defines how long a Run can last before automatic termination.
39. Approval enables human-in-the-loop before critical actions.
40. The hierarchy is clear: Plan → Runs → Workflows.

## Workflows: Execution Patterns (41-55)
41. Workflows are proven patterns for coordinating agent execution.
42. OSP adapts Anthropic's workflow patterns: Routing, Parallelization, Orchestrator-Workers, Evaluator-Optimizer.
43. Routing classifies inputs and directs them to specialized agents.
44. Parallelization executes independent tasks simultaneously.
45. Orchestrator-Workers delegates subtasks to specialized agents and synthesizes results.
46. Evaluator-Optimizer iterates on outputs until quality criteria are met.
47. Workflows are composable: you can combine them for complex tasks.
48. Each Run selects a Workflow based on the task's nature.
49. Workflows can span multiple systems and platforms.
50. Recovery Workflows handle Retries, Fallback, and Timeouts automatically.
51. Human-in-the-Loop workflows enable Approval and Manual Delegation.
52. Multi-Agent Workflows coordinate distributed agents across different environments.
53. The Agent Loop (Gather Context → Take Action → Verify Work → Iterate) operates within Workflows.
54. Quality Workflows include Rules Validation, Visual Feedback, and LLM-as-Judge.
55. Workflows are patterns first; implementations materialize them as code.

## Semantic Filesystem (56-72)

```
.agents/
├── system/          # OS intelligence (env, fs, preferences, registry)
├── context/         # Read data (memory, documents, vectors)
├── actions/         # Executable operations
├── checks/          # Verification (rules, audit)
├── skills/          # Meta-agents (orchestrator, planner, executor)
├── workflows/       # Execution pattern definitions
└── runs/            # Execution state
```

56. `.agents/` is the semantic OS root in any project.
57. The filesystem is the universal interface; every agent understands files.
58. The `.agents/` structure reflects the protocol domains.
59. `system/` contains OS intelligence: env, fs, preferences, registry.
60. `context/` stores read data: memory, documents, vectors.
61. `actions/` defines operations that agents can execute.
62. `checks/` contains verification: rules, audit logs.
63. `skills/` defines meta-agents: orchestrator, planner, executor.
64. `workflows/` stores execution pattern definitions.
65. `runs/` persists active and completed execution state.
66. Any agent can read `.agents/` to understand the environment.
67. File conventions enable discovery without central coordination.
68. `AGENT.md` defines an agent; `SKILL.md` defines a capability.
69. YAML frontmatter in `.md` files enables structured metadata.
70. The filesystem eliminates the need for databases in simple cases.
71. Agents can add context by writing to appropriate folders.
72. The semantic filesystem is a deliberately simple API.

## Skills Framework (73-82)
73. Skills Framework defines specialized roles: Orchestrator, Planner, Executor.
74. Orchestrators coordinate multiple agents and distribute tasks.
75. Planners decompose complex goals into tasks with dependency analysis.
76. Executors handle actual execution using tools, APIs, and scripts.
77. Skills belong to protocol domains: system, context, actions, checks, skills, workflows, runs.
78. A Skill can expose tools that other agents invoke.
79. Skills are discoverable through the system Registry.
80. Skill composition enables building complex agents from simple blocks.
81. Skills define contracts: what they receive, what they produce, what they guarantee.
82. Skill design prioritizes reusability over excessive specialization.

## Agent Lifecycle (83-92)

```
Registration → Discovery → Execution → Evaluation
                              ↓
                    ┌─────────────────┐
                    │   Agent Loop    │
                    │ gather context  │
                    │ take action     │
                    │ verify work     │
                    │ iterate         │
                    └─────────────────┘
```

83. The Agent Lifecycle has four phases: Registration, Discovery, Execution, Evaluation.
84. In Registration, agents declare capabilities to the Registry.
85. In Discovery, the OS matches agents to tasks based on capabilities.
86. In Execution, the Agent Loop runs within Workflows.
87. In Evaluation, performance, quality, and compliance are assessed.
88. The Agent Loop is micro-level (cognitive), the Lifecycle is macro-level (system).
89. Gather Context uses semantic search and agentic search to obtain information.
90. Take Action executes tools, bash scripts, and generates code.
91. Verify Work validates results through rules, visual feedback, or LLM-as-Judge.
92. The OS manages the Lifecycle; Workflows manage task coordination.

## Integration and Ecosystem (93-102)
93. OSP includes native support for Model Context Protocol (MCP).
94. MCP enables agents to access standardized external tools and resources.
95. OSP allows agents from different implementations to work together.
96. Interoperability between implementations is a core goal.
97. The ecosystem becomes composable: combine agents from different sources.
98. Workflows can span different organizations and platforms.
99. Context Hygiene prevents contamination and manages finite context windows.
100. Process Isolation ensures agents operate without interfering with each other.
101. The architecture favors horizontal scalability over vertical scalability.
102. OSP creates the foundation for agent collaboration at scale.
