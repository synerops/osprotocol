# AGENTS.md

## Status of This Document

This document specifies the Agentic OS Protocol (OSP), a protocol specification for orchestrating, managing, and executing AI agents in distributed, scalable environments. This specification defines interfaces, behaviors, requirements, and integration patterns that implementations MUST follow.

This is a working specification and may be updated based on implementation experience and community feedback.

## 1. Introduction

### 1.1. Purpose

The Agentic OS Protocol (OSP) is a protocol specification that defines how AI agents SHOULD orchestrate, manage, and execute in distributed, scalable environments. This specification outlines interfaces, behaviors, requirements, and integration patterns that implementations MUST adhere to.

This document describes the specification itself, not any particular implementation. The spec defines the "contract" that all implementations MUST follow.

### 1.2. What is a Protocol Specification?

The Agentic OS Protocol is a **specification**, not an implementation. Like HTTP (RFC 7230-7235), JSON (RFC 8259), OpenAPI, or MCP, it defines:

- **Interfaces**: How components communicate and interact
- **Behaviors**: Expected behaviors and state transitions
- **Data Formats**: Structure, validation rules, and schemas
- **Requirements**: What implementations MUST support
- **Contracts**: Agreements between components and agents
- **Integration Patterns**: Standardized ways components work together

Implementations of this spec MAY be built in any language, using any technology stack, as long as they adhere to the defined interfaces and behaviors.

### 1.3. Scope

This specification covers:

- Core execution patterns (Agent Loop)
- Workflow definitions and patterns
- System management interfaces
- Context management specifications
- Quality assurance mechanisms
- Integration patterns

This specification does NOT prescribe:

- Specific implementation technologies
- Runtime environments
- Programming languages
- Deployment architectures

## 2. Core Execution Pattern: Agent Loop

### 2.1. Overview

The Agent Loop is the fundamental execution pattern that all agent implementations MUST support. It defines the iterative cycle through which agents gather context, take actions, verify their work, and iterate until completion.

```
┌─────────────────────────────────────────────────────────┐
│                    Agent Loop                            │
│                                                          │
│  ┌──────────────┐    ┌──────────────┐                  │
│  │   Gather     │───▶│  Take Action │                  │
│  │   Context    │    │              │                  │
│  └──────┬───────┘    └──────┬───────┘                  │
│         │                   │                           │
│         │                   │                           │
│  ┌──────▼───────────────────▼───────┐                  │
│  │      Verify Work                 │                  │
│  └──────┬───────────────────────────┘                  │
│         │                                               │
│         │ (if not complete)                            │
│         │                                               │
│         └─────────────────────────────────┐            │
│                                           │            │
│                                           ▼            │
│                                    ┌──────────────┐    │
│                                    │   Iterate    │    │
│                                    └──────────────┘    │
└─────────────────────────────────────────────────────────┘
```

### 2.2. Gather Context

#### 2.2.1. Specification

Implementations MUST provide interfaces for context gathering. The specification defines the following context gathering mechanisms:

#### 2.2.2. Agentic Search

Implementations MUST support agentic search capabilities that allow agents to:
- Search file systems using standard tools (grep, tail, find, etc.)
- Query structured data sources
- Filter and process large datasets incrementally

**Interface Requirements:**
- Agents MUST be able to specify search queries
- Search results MUST be streamable or chunkable
- Search operations MUST support filtering and transformation

#### 2.2.3. Semantic Search

Implementations MAY support semantic search through vector embeddings. When supported:
- Embeddings MUST be generated according to specified schemas
- Vector queries MUST follow defined interfaces
- Semantic search SHOULD be used for concept-based queries

#### 2.2.4. Subagent Context Isolation

Implementations MUST support subagent creation with isolated context windows:
- Subagents MUST have independent context from parent agents
- Subagents MUST return only relevant information to orchestrators
- Context isolation boundaries MUST be clearly defined

#### 2.2.5. Context Compaction

For long-running agents, implementations MUST support context compaction:
- When context limits approach, previous messages MUST be summarized
- Compaction MUST preserve critical information
- Compaction interfaces MUST be defined

### 2.3. Take Action

#### 2.3.1. Specification

Implementations MUST provide interfaces for action execution. The specification defines the following action mechanisms:

#### 2.3.2. Tools

Tools are the primary building blocks of execution. Implementations MUST:
- Define tool interfaces according to specified schemas
- Support tool discovery and registration
- Provide tool execution interfaces
- Support tool result validation

**Tool Interface Requirements:**
- Tools MUST have clear descriptions and parameter schemas
- Tools MUST return structured results
- Tool errors MUST be handled according to specified contracts

#### 2.3.3. Bash and Scripts

Implementations MUST support execution of bash commands and scripts:
- Script execution interfaces MUST be defined
- Script results MUST be captured and returned
- Script errors MUST be handled according to error handling specifications

#### 2.3.4. Code Generation

Implementations MUST support code generation and execution:
- Generated code MUST be validated before execution
- Code execution environments MUST be isolated
- Code execution results MUST be captured and returned

#### 2.3.5. MCP Integration

Implementations MUST support Model Context Protocol (MCP) integration:
- MCP client interfaces MUST be implemented
- MCP server discovery MUST be supported
- MCP tool invocation MUST follow MCP specifications

### 2.4. Verify Work

#### 2.4.1. Specification

Implementations MUST provide interfaces for work verification. The specification defines the following verification mechanisms:

#### 2.4.2. Rules-Based Validation

Implementations MUST support rules-based validation:
- Rules MUST be defined according to specified schemas
- Rule evaluation interfaces MUST be provided
- Rule violations MUST be reported with clear error messages

#### 2.4.3. Visual Feedback

Implementations MAY support visual feedback mechanisms:
- Screenshot interfaces MUST be defined when supported
- Visual validation contracts MUST be specified
- Visual feedback SHOULD be used for UI-related tasks

#### 2.4.4. LLM-as-Judge

Implementations MAY support LLM-based evaluation:
- Judge interfaces MUST be defined when supported
- Judge evaluation criteria MUST be specified
- Judge results MUST be structured according to schemas

### 2.5. Iterate

#### 2.5.1. Specification

The iteration mechanism MUST:
- Control loop repetition based on completion criteria
- Update context based on verification results
- Support termination conditions
- Handle iteration limits

## 3. Workflow Patterns

### 3.1. Overview

Workflows define structured processes that agents follow to accomplish complex tasks. The specification defines multiple workflow patterns that implementations MAY support.

```
┌─────────────────────────────────────────────────────────┐
│                  Workflow Categories                     │
│                                                          │
│  ┌──────────────────────────────────────────────┐     │
│  │  System/Control Workflows                     │     │
│  │  (Agent Lifecycle)                           │     │
│  └──────────────────────────────────────────────┘     │
│                                                          │
│  ┌──────────────────────────────────────────────┐     │
│  │  Task Workflows                              │     │
│  │  - Routing                                    │     │
│  │  - Prompt Chaining                            │     │
│  │  - Orchestrator-Workers                       │     │
│  │  - Parallelization                            │     │
│  │  - Evaluator-Optimizer                        │     │
│  └──────────────────────────────────────────────┘     │
│                                                          │
│  ┌──────────────────────────────────────────────┐     │
│  │  Quality Workflows                            │     │
│  │  - Rules Validation                           │     │
│  │  - Visual Checks                              │     │
│  │  - LLM-as-Judge                               │     │
│  └──────────────────────────────────────────────┘     │
│                                                          │
│  ┌──────────────────────────────────────────────┐     │
│  │  Recovery Workflows                           │     │
│  │  - Retries                                    │     │
│  │  - Fallback                                   │     │
│  │  - Timeouts                                   │     │
│  └──────────────────────────────────────────────┘     │
│                                                          │
│  ┌──────────────────────────────────────────────┐     │
│  │  Human-in-the-Loop Workflows                  │     │
│  │  - Approval Workflows                         │     │
│  │  - Manual Delegation                          │     │
│  └──────────────────────────────────────────────┘     │
│                                                          │
│  ┌──────────────────────────────────────────────┐     │
│  │  Multi-Agent Workflows                        │     │
│  │  - Agent Coordination                         │     │
│  │  - Distributed Execution                      │     │
│  └──────────────────────────────────────────────┘     │
└─────────────────────────────────────────────────────────┘
```

### 3.2. System/Control Workflows

#### 3.2.1. Agent Lifecycle Workflow

The Agent Lifecycle is a System/Control Workflow that defines how agents are managed within the system. This workflow consists of four phases:

```
┌─────────────┐    ┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│ Registration│───▶│  Discovery  │───▶│  Execution  │───▶│  Evaluation │
└─────────────┘    └─────────────┘    └─────────────┘    └─────────────┘
```

**3.2.1.1. Registration Phase**

Implementations MUST support agent registration:
- Registration interfaces MUST be defined
- Agents MUST declare capabilities and constraints
- Resource requirements MUST be specified
- Registration data MUST conform to specified schemas

**3.2.1.2. Discovery Phase**

Implementations MUST support agent discovery:
- Discovery interfaces MUST be provided
- Dynamic service discovery based on task requirements MUST be supported
- Load balancing and failover mechanisms MUST be defined
- Discovery protocols MUST be specified

**3.2.1.3. Execution Management Phase**

Implementations MUST support execution management:
- Task assignment interfaces MUST be defined
- Real-time monitoring interfaces MUST be provided
- Error handling contracts MUST be specified
- Execution state management MUST be supported

**3.2.1.4. Evaluation Phase**

Implementations MUST support agent evaluation:
- Performance monitoring interfaces MUST be defined
- Quality assessment contracts MUST be specified
- Adaptation mechanisms MAY be supported
- Evaluation results MUST conform to specified schemas

### 3.3. Task Workflows

#### 3.3.1. Routing Workflow

**Specification:** The routing workflow classifies inputs and directs them to specialized follow-up tasks.

```
Input ──▶ Classifier ──▶ Route A ──▶ Task A
                    │
                    └──▶ Route B ──▶ Task B
```

**Requirements:**
- Routing interfaces MUST be defined
- Classification mechanisms MUST be specified
- Route selection logic MUST be documented
- Routing contracts MUST be specified

#### 3.3.2. Prompt Chaining Workflow

**Specification:** Prompt chaining decomposes tasks into sequential steps where each step processes the output of the previous one.

```
Step 1 ──▶ Step 2 ──▶ Step 3 ──▶ ... ──▶ Final Output
   │          │          │
   └─Gate────┴─Gate─────┘
```

**Requirements:**
- Chaining interfaces MUST be defined
- Gate/validation mechanisms MUST be specified
- Step transition contracts MUST be defined

#### 3.3.3. Orchestrator-Workers Workflow

**Specification:** A central orchestrator dynamically breaks down tasks, delegates to worker agents, and synthesizes results.

```
         ┌──────────────┐
         │ Orchestrator  │
         └───────┬───────┘
                 │
    ┌────────────┼────────────┐
    │            │            │
┌───▼───┐   ┌───▼───┐   ┌───▼───┐
│Worker1│   │Worker2│   │Worker3│
└───┬───┘   └───┬───┘   └───┬───┘
    └────────────┼────────────┘
                 │
         ┌───────▼───────┐
         │  Synthesis    │
         └───────────────┘
```

**Requirements:**
- Orchestrator interfaces MUST be defined
- Worker delegation contracts MUST be specified
- Result synthesis interfaces MUST be provided
- Coordination protocols MUST be defined

#### 3.3.4. Parallelization Workflow

**Specification:** Parallelization enables simultaneous execution of independent tasks with result aggregation.

**Variations:**

**Sectioning:**
```
Task ──▶ [Subtask1] ──┐
      │ [Subtask2] ──┼──▶ Aggregate ──▶ Result
      └ [Subtask3] ──┘
```

**Voting:**
```
Input ──▶ [Judge1] ──┐
      │ [Judge2] ──┼──▶ Consensus ──▶ Decision
      └ [Judge3] ──┘
```

**Requirements:**
- Parallel execution interfaces MUST be defined
- Dependency management MUST be specified
- Aggregation mechanisms MUST be provided
- Concurrency control contracts MUST be defined

#### 3.3.5. Evaluator-Optimizer Workflow

**Specification:** One component generates responses while another provides evaluation and feedback in a loop.

```
Generator ──▶ Output ──▶ Evaluator ──▶ Feedback ──┐
                                                    │
                                                    └──▶ (iterate)
```

**Requirements:**
- Generator interfaces MUST be defined
- Evaluator contracts MUST be specified
- Feedback loop mechanisms MUST be provided
- Iteration control MUST be specified

### 3.4. Quality Workflows

#### 3.4.1. Rules Validation Workflow

**Specification:** Rules-based validation ensures outputs meet defined criteria.

**Requirements:**
- Rule definition schemas MUST be specified
- Rule evaluation interfaces MUST be defined
- Violation reporting contracts MUST be specified

#### 3.4.2. Visual Feedback Workflow

**Specification:** Visual validation through screenshots or renders.

**Requirements:**
- Screenshot interfaces MUST be defined when supported
- Visual comparison contracts MUST be specified
- Feedback mechanisms MUST be provided

#### 3.4.3. LLM-as-Judge Workflow

**Specification:** LLM-based evaluation of agent outputs.

**Requirements:**
- Judge interfaces MUST be defined when supported
- Evaluation criteria schemas MUST be specified
- Judge result formats MUST be defined

### 3.5. Recovery Workflows

#### 3.5.1. Retries Workflow

**Specification:** Automatic retry mechanisms for failed operations.

**Requirements:**
- Retry policy interfaces MUST be defined
- Retry strategies MUST be specified
- Retry limits MUST be configurable

#### 3.5.2. Fallback Workflow

**Specification:** Fallback mechanisms when primary operations fail.

**Requirements:**
- Fallback interfaces MUST be defined
- Fallback strategies MUST be specified
- Fallback chains MAY be supported

#### 3.5.3. Timeout Workflow

**Specification:** Timeout handling for long-running operations.

**Requirements:**
- Timeout interfaces MUST be defined
- Timeout policies MUST be specified
- Timeout handling contracts MUST be defined

### 3.6. Human-in-the-Loop Workflows

#### 3.6.1. Approval Workflows

**Specification:** Human approval required before proceeding.

**Requirements:**
- Approval interfaces MUST be defined
- Approval state management MUST be specified
- Approval timeout handling MUST be defined

#### 3.6.2. Manual Delegation

**Specification:** Manual task assignment and delegation.

**Requirements:**
- Delegation interfaces MUST be defined
- Delegation protocols MUST be specified

### 3.7. Multi-Agent Workflows

#### 3.7.1. Agent Coordination

**Specification:** Coordination patterns for multiple agents.

**Requirements:**
- Coordination interfaces MUST be defined
- Coordination protocols MUST be specified
- Conflict resolution mechanisms MUST be defined

#### 3.7.2. Distributed Execution

**Specification:** Distributed execution across multiple agents.

**Requirements:**
- Distribution interfaces MUST be defined
- Distribution strategies MUST be specified
- Result aggregation MUST be supported

## 4. Protocol Architecture

### 4.1. Overview

The protocol specification is organized into core areas that define different aspects of agent orchestration.

### 4.2. Core Specifications

#### 4.2.1. Skills Specification

Defines the core agent capabilities and their interfaces:

**Orchestrator:**
- Specifies interfaces and behaviors for coordinating multiple agents
- Defines contracts for task routing, load balancing, and conflict resolution
- Orchestrator interfaces MUST be implemented

**Planner:**
- Defines how complex objectives are broken down into actionable tasks
- Specifies interfaces for task decomposition, dependency analysis, and resource estimation
- Planner interfaces MUST be implemented

**Executor:**
- Specifies the contract for executing agent tasks
- Defines interfaces for tool usage, API interactions, and data processing
- Executor interfaces MUST be implemented

#### 4.2.2. System Intelligence Specification

Defines system-level components and their interfaces:

**Registry:**
- Specifies how agents register and are discovered
- Defines contracts for agent registration, capability declaration, and service discovery
- Registry interfaces MUST be implemented

**Environment:**
- Defines configuration and environment management interfaces
- Specifies how environment variables, settings, and configurations are handled
- Environment interfaces MUST be implemented

**Filesystem:**
- Specifies file system operation interfaces
- Defines contracts for file operations, directory management, and file system abstractions
- Filesystem interfaces MUST be implemented

**Settings:**
- Defines interfaces for managing agent preferences and configurations
- Specifies how settings are stored, retrieved, and validated
- Settings interfaces MUST be implemented

#### 4.2.3. Context Management Specification

Defines how context is managed and persisted:

**Apps:**
- Specifies interfaces for application-specific context and data
- Defines how context is isolated per application and shared between related applications
- Apps context interfaces MUST be implemented

**Documents:**
- Defines document processing and management interfaces
- Specifies how documents are ingested, processed, and retrieved
- Document interfaces MUST be implemented

**Memory:**
- Specifies interfaces for persistent memory and knowledge storage
- Defines contracts for storing and retrieving agent memories
- Memory interfaces MUST be implemented

**Vector:**
- Defines interfaces for vector database integration and semantic search
- Specifies how embeddings are stored, indexed, and queried
- Vector interfaces MAY be implemented

**Persistence:**
- Specifies data persistence and retrieval interfaces
- Defines contracts for saving and loading agent state
- Persistence interfaces MUST be implemented

#### 4.2.4. Quality Assurance Specification

Defines quality assurance mechanisms and their interfaces:

**Audit:**
- Specifies interfaces for monitoring agent behavior and compliance
- Defines what MUST be logged and how audit trails are maintained
- Audit interfaces MUST be implemented

**Judge:**
- Defines interfaces for evaluating agent performance and output quality
- Specifies contracts for quality assessment and scoring
- Judge interfaces MAY be implemented

**Rules:**
- Specifies how behavioral constraints and guidelines are defined and enforced
- Defines rule evaluation interfaces
- Rules interfaces MUST be implemented

**Screenshot:**
- Defines interfaces for visual validation and monitoring
- Specifies how visual state is captured and validated
- Screenshot interfaces MAY be implemented

**Fallback:**
- Specifies error handling and recovery mechanisms
- Defines contracts for fallback behaviors when errors occur
- Fallback interfaces MUST be implemented

## 5. Agent Types

### 5.1. Overview

The specification defines several agent types and their required behaviors.

### 5.2. Orchestrator Agents

**Purpose:** Coordinate multiple agents and manage complex workflows

**Required Behaviors:**
- Task distribution MUST be supported
- Load balancing MUST be implemented
- Conflict resolution mechanisms MUST be provided

**Integration Contract:**
- MUST work with planner and executor agents according to defined interfaces
- MUST implement orchestrator interfaces as specified

### 5.3. Planner Agents

**Purpose:** Break down high-level objectives into actionable tasks

**Required Behaviors:**
- Task decomposition MUST be supported
- Dependency analysis MUST be implemented
- Resource estimation MUST be provided

**Integration Contract:**
- MUST receive objectives from orchestrators via specified interfaces
- MUST provide plans to executors via specified interfaces

### 5.4. Executor Agents

**Purpose:** Execute specific tasks and operations

**Required Behaviors:**
- Tool usage MUST be supported
- API interactions MUST be implemented
- Data processing capabilities MUST be provided

**Integration Contract:**
- MUST receive tasks from planners via specified interfaces
- MUST report back to orchestrators via specified interfaces

### 5.5. Specialized Agents

**Context Agents:**
- MUST manage and provide contextual information according to context management interfaces

**Quality Agents:**
- MUST monitor and ensure output quality according to quality assurance interfaces

**Workflow Agents:**
- MUST handle specific workflow patterns and parallelization according to workflow interfaces

## 6. Integration Patterns

### 6.1. MCP (Model Context Protocol) Integration

**Specification:** Defines how agents communicate using MCP.

**Requirements:**
- Standardized communication interfaces MUST be implemented
- Tool and resource sharing contracts MUST be specified
- Context propagation and synchronization protocols MUST be defined
- MCP client interfaces MUST be implemented

### 6.2. Workflow Orchestration

**Specification:** Defines patterns for workflow execution.

**Requirements:**
- Parallel task execution interfaces MUST be defined
- Dependency management contracts MUST be specified
- Resource optimization behaviors MUST be defined

### 6.3. Human-in-the-Loop

**Specification:** Defines human interaction patterns.

**Requirements:**
- Human oversight interfaces MUST be defined
- Approval workflow contracts MUST be specified
- Manual task delegation behaviors MUST be defined

## 7. Conformance

### 7.1. Implementation Conformance

An implementation conforms to this specification if it:
- Implements all MUST-level requirements
- Follows all specified interfaces and contracts
- Adheres to defined data formats and schemas
- Supports required workflow patterns

### 7.2. Partial Conformance

Implementations MAY implement subsets of this specification, but MUST clearly document:
- Which components are implemented
- Which components are not implemented
- Any deviations from the specification

## 8. Security Considerations

This specification does not define security mechanisms, but implementations SHOULD:
- Implement authentication and authorization
- Secure communication channels
- Validate all inputs
- Implement audit logging
- Handle sensitive data appropriately

## 9. References

- [RFC 2119](https://tools.ietf.org/html/rfc2119): Key words for use in RFCs to Indicate Requirement Levels
- [Model Context Protocol](https://modelcontextprotocol.io/): MCP Specification
- [Anthropic: Building Effective Agents](https://www.anthropic.com/engineering/building-effective-agents)
- [Anthropic: Building Agents with Claude Agent SDK](https://www.anthropic.com/engineering/building-agents-with-the-claude-agent-sdk)
