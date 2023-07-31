import { Stream } from "node:stream";
import { FileObject } from "./file-object.type";
export enum Encoding {
  UTF8 = "utf8",
  ASCII = "ascii",
  UTF16 = "utf16",
}

export interface ReadOptions {
  path: string;
  directory: string;
  encoding?: string;
  versionId?: string;
}

export interface WriteOptions {
  data: string | Buffer | Stream;
  path: string;
  directory: string;
  tags?: Record<string, string>[];
}

export interface DeleteOptions {
  path: string;
  directory: string;
  versionId?: string;
}

export interface CopyOptions {
  from: string;
  to: string;
  directory: string;
  toDirectory: string;
  versionId?: string;
}

export interface ListOptions {
  directory: string;
}

export interface IFileSystemCloud {
  read(options: ReadOptions): Promise<FileObject>;
  write(options: WriteOptions): Promise<void>;
  delete(options: DeleteOptions): Promise<void>;
  copy(options: CopyOptions): Promise<void>;
  list(options: ListOptions): Promise<FileObject[]>;
}
