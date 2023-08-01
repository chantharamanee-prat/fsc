import { ReadOptions, WriteOptions, DeleteOptions, CopyOptions, ListOptions, Paging, VersionOptions } from "./options.type";
import { FileObject } from "./file-object.type";
import { VersionObject } from "./version-object.type";

export enum Encoding {
  UTF8 = "utf8",
  ASCII = "ascii",
  UTF16 = "utf16",
}

export interface IFileSystemCloud {
  read(options: ReadOptions): Promise<FileObject>;
  write(options: WriteOptions): Promise<FileObject>;
  delete(options: DeleteOptions): Promise<FileObject>;
  copy(options: CopyOptions): Promise<FileObject>;
  list(options: ListOptions): Promise<Paging<FileObject[]>>;
  versions(options: VersionOptions): Promise<Paging<VersionObject[]>>
}


