export interface FileObject {
  data?: string | Buffer | ReadableStream 
  path?: string
  directory?: string
  tags?: Record<string, string>
  versionId?: string
  type?: string // Mimetype
  size?: number // The actual size in bytes
}