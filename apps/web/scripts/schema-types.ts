/**
 * Concrete type aliases for JSON Schema generation.
 *
 * ts-json-schema-generator cannot resolve generic interfaces as root types.
 * This file instantiates them with their default type parameters so the
 * generator can produce JSON Schemas.
 */

import type { EnvEntry } from '../../../packages/schema/system/env'
import type { SettingsEntry } from '../../../packages/schema/system/settings'
import type { PreferenceEntry } from '../../../packages/schema/system/preferences'
import type { RegistryEntry } from '../../../packages/schema/system/registry'
import type { EmbeddingEntry } from '../../../packages/schema/context/embeddings'
import type { KvEntry } from '../../../packages/schema/context/kv'
import type { ToolResult } from '../../../packages/schema/actions/tools'

// Instantiate generics with their defaults for JSON Schema generation
export type EnvEntrySchema = EnvEntry<string>
export type SettingsEntrySchema = SettingsEntry<unknown>
export type PreferenceEntrySchema = PreferenceEntry<unknown>
export type RegistryEntrySchema = RegistryEntry<unknown>
export type EmbeddingEntrySchema = EmbeddingEntry<Record<string, unknown>>
export type KvEntrySchema = KvEntry<unknown>
export type ToolResultSchema = ToolResult<unknown>
