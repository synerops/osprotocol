/**
 * Routing Workflow Pattern
 *
 * Classifies input and delegates to specialized workflows based on the classification.
 * This is the simplest multi-agent pattern - it routes but doesn't aggregate.
 *
 * Pattern:
 *   Input → Classify → Delegate to single workflow → Output
 */

import type { Workflow } from './workflow'

/**
 * Configuration for a single route in a routing workflow
 */
export interface RouteConfig {
  /** Human-readable description of this route */
  description: string
  /** Conditions under which this route should be selected */
  whenToUse: string[]
  /** Optional example inputs that match this route */
  examples?: string[]
}

/**
 * Routing workflow that classifies input and delegates to specialized workflows
 *
 * @template Output - The type of result produced by the delegated workflow
 */
export interface RoutingWorkflow<Output> extends Workflow<Output> {
  /**
   * Classify the input prompt to determine which route to use
   *
   * @param prompt - The input prompt to classify
   * @returns Promise resolving to the route key (workflow identifier)
   */
  classify(prompt: string): Promise<string>
}

/**
 * Configuration for creating a routing workflow
 *
 * @template Output - The type of result produced by the delegated workflows
 */
export interface RoutingWorkflowConfig<Output> {
  /** Model identifier for the classifier (e.g., 'anthropic/claude-haiku') */
  model?: string
  /** Map of route keys to their workflow implementations */
  workflows: Record<string, RoutingWorkflowEntry<Output>>
}

/**
 * Entry in the workflows map
 */
export interface RoutingWorkflowEntry<Output> {
  /** The workflow to delegate to */
  workflow: Workflow<Output>
  /** Route metadata for classification */
  route: RouteConfig
  /** Mark this as the default route when classification fails */
  markAsDefault?: boolean
}
