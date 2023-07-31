import { Stream } from "node:stream";

export enum Encoding {
  UTF8 = "utf8",
  ASCII = "ascii",
  UTF16 = "utf16",
}

export type ReadOptions = {
  path: string;
  directory: string;
  encoding?: string;
};

export type WriteOptions = {
  data: string | Buffer | Stream;
  path: string;
  directory: string;
};

export type DeleteOptions = {
  path: string;
  directory: string;
};

export type CopyOptions = {
  from: string;
  to: string;
  directory: string;
  toDirectory: string;
};

export type ListOptions = {
  directory: string;
};

export interface IFileSystemCloud {
  read(options: ReadOptions): Promise<Buffer | string>;
  write(options: WriteOptions): Promise<void>;
  delete(options: DeleteOptions): Promise<void>;
  copy(options: CopyOptions): Promise<void>;
  list(options: ListOptions): Promise<string[]>;
}
