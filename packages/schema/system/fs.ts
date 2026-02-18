/**
 * File System
 *
 * @experimental No real implementation yet.
 *
 * Platform-level file system operations.
 * The kernel interface for reading, writing, and navigating
 * files in the host execution environment (local disk, S3,
 * Vercel Blob, Cloudflare R2). Sandbox environments
 * manage their own internal filesystem independently.
 */

/**
 * A file system entry (file or directory)
 */
export interface FsEntry {
  /** File or directory name */
  name: string
  /** Full path relative to the filesystem root */
  path: string
  /** Entry type */
  type: 'file' | 'directory'
  /** Size in bytes (files only) */
  size?: number
  /** Last modified timestamp (Unix ms) */
  updatedAt?: number
  /** Extensible metadata for provider-specific data */
  metadata?: Record<string, unknown>
}

/**
 * Read-only filesystem context for the agent loop
 */
export interface FsContext {
  /** Read a file's contents */
  read(path: string): Promise<string | null>
  /** List entries in a directory */
  list(path: string): Promise<FsEntry[]>
  /** Check if a path exists */
  exists(path: string): Promise<boolean>
}

/**
 * Filesystem write operations for the agent loop
 */
export interface FsActions {
  /** Write contents to a file (create or overwrite) */
  write(path: string, content: string): Promise<FsEntry>
  /** Delete a file or directory */
  remove(path: string): Promise<boolean>
}

/**
 * File system capability interface
 *
 * Provides CRUD operations for files and directories
 * on the host platform. Implementations map to
 * platform-specific filesystems (local disk, S3,
 * Vercel Blob, Cloudflare R2).
 */
export interface Fs {
  /**
   * Read a file's contents
   *
   * @param path - File path
   * @returns File contents as string, or null if not found
   */
  read(path: string): Promise<string | null>

  /**
   * Write contents to a file (create or overwrite)
   *
   * @param path - File path
   * @param content - File contents
   * @returns The created or updated entry
   */
  write(path: string, content: string): Promise<FsEntry>

  /**
   * Delete a file or directory
   *
   * @param path - File or directory path
   * @returns true if the entry existed
   */
  remove(path: string): Promise<boolean>

  /**
   * List entries in a directory
   *
   * @param path - Directory path
   * @returns Array of entries in the directory
   */
  list(path: string): Promise<FsEntry[]>

  /**
   * Check if a path exists
   *
   * @param path - File or directory path
   */
  exists(path: string): Promise<boolean>
}
