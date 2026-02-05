/**
 * Workflow Patterns
 *
 * Workflows define execution patterns for agent tasks.
 * Based on Anthropic's building blocks for agentic systems.
 *
 * @see https://www.anthropic.com/engineering/building-effective-agents
 */

// Base workflow interface
export type { Workflow, InferWorkflowOutput } from './workflow'

// Routing pattern - classify and delegate
export type {
  RoutingWorkflow,
  RoutingWorkflowConfig,
  RoutingWorkflowEntry,
  RouteConfig,
} from './routing'

// Orchestrator-Workers pattern - plan, delegate, synthesize
export type {
  OrchestratorWorkersWorkflow,
  Plan,
  PlanStep,
  WorkerResult,
  WorkerConfig,
} from './orchestrator-workers'

// Parallelization pattern - split, parallel execute, merge
export type {
  ParallelizationWorkflow,
  ParallelizationConfig,
  Subtask,
  SubtaskResult,
} from './parallelization'

// Evaluator-Optimizer pattern - generate, evaluate, refine
export type {
  EvaluatorOptimizerWorkflow,
  EvaluatorOptimizerConfig,
  Evaluation,
  EvaluationCriterion,
  CriterionResult,
} from './evaluator-optimizer'
