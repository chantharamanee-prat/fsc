export interface FileObject {
  data?: string | Buffer | ReadableStream 
  path?: string
  directory?: string
  tags?: Record<string, string>
  version?: string
  type?: string // Mimetype
  size?: number // The actual size in bytes
  date?: Date
}