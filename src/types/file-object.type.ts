import { Stream } from "node:stream";

export interface FileObject {
  data: string | Buffer | Stream
  path: string
  directory: string
  tags: Record<string, string>[] // Default is []
  versionId?: string
  type?: string // Mimetype
  size?: number // The actual size in bytes

}