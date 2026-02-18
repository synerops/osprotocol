/**
 * Embeddings
 *
 * @experimental No real implementation yet.
 *
 * Vector embeddings and similarity search.
 * The agent-facing interface for semantic search over
 * indexed knowledge. The vector database is a System
 * concern underneath (Pinecone, Upstash Vector,
 * Weaviate, OpenAI Embeddings).
 */

/**
 * A vector embedding entry
 *
 * @template T - The type of associated metadata
 */
export interface EmbeddingEntry<T = Record<string, unknown>> {
  /** Unique identifier */
  id: string
  /** Original content that was embedded */
  content: string
  /** Similarity score (0-1, present only in search results) */
  score?: number
  /** Extensible metadata for filtering and provider-specific data */
  metadata?: T
}

/**
 * Read-only embeddings context for the agent loop
 *
 * Provides semantic search and retrieval. Agents use
 * this to find relevant context by meaning, not just
 * keywords.
 */
export interface EmbeddingsContext {
  /**
   * Search for similar content
   *
   * @template T - The type of associated metadata
   * @param query - Text to search for
   * @param topK - Maximum number of results to return
   * @param filter - Metadata filter criteria
   * @returns Array of entries sorted by similarity (highest first)
   */
  search<T = Record<string, unknown>>(
    query: string,
    topK: number,
    filter?: Partial<T>
  ): Promise<EmbeddingEntry<T>[]>

  /**
   * Get an entry by ID
   *
   * @template T - The type of associated metadata
   * @param id - Entry identifier
   * @returns The entry, or null if not found
   */
  get<T = Record<string, unknown>>(id: string): Promise<EmbeddingEntry<T> | null>
}

/**
 * Embeddings write operations for the agent loop
 *
 * Provides indexing and removal of embedded content.
 */
export interface EmbeddingsActions {
  /**
   * Upsert content by generating and storing its embedding
   *
   * @template T - The type of associated metadata
   * @param id - Entry identifier
   * @param content - Text content to embed and store
   * @param metadata - Optional metadata for filtering
   * @returns The stored entry
   */
  upsert<T = Record<string, unknown>>(
    id: string,
    content: string,
    metadata?: T
  ): Promise<EmbeddingEntry<T>>

  /**
   * Remove an entry
   *
   * @param id - Entry identifier
   * @returns true if the entry existed
   */
  remove(id: string): Promise<boolean>
}

/**
 * Embeddings capability interface
 *
 * Provides semantic indexing and similarity search.
 * Implementations map to vector databases and
 * embedding model providers.
 */
export interface Embeddings {
  /**
   * Upsert content by generating and storing its embedding
   *
   * @template T - The type of associated metadata
   * @param id - Entry identifier
   * @param content - Text content to embed and store
   * @param metadata - Optional metadata for filtering
   * @returns The stored entry
   */
  upsert<T = Record<string, unknown>>(
    id: string,
    content: string,
    metadata?: T
  ): Promise<EmbeddingEntry<T>>

  /**
   * Search for similar content
   *
   * @template T - The type of associated metadata
   * @param query - Text to search for
   * @param topK - Maximum number of results to return
   * @param filter - Metadata filter criteria
   * @returns Array of entries sorted by similarity (highest first)
   */
  search<T = Record<string, unknown>>(
    query: string,
    topK: number,
    filter?: Partial<T>
  ): Promise<EmbeddingEntry<T>[]>

  /**
   * Get an entry by ID
   *
   * @template T - The type of associated metadata
   * @param id - Entry identifier
   * @returns The entry, or null if not found
   */
  get<T = Record<string, unknown>>(id: string): Promise<EmbeddingEntry<T> | null>

  /**
   * Remove an entry
   *
   * @param id - Entry identifier
   * @returns true if the entry existed
   */
  remove(id: string): Promise<boolean>
}
