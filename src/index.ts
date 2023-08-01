import {
  CopyOptions,
  DeleteOptions,
  FileObject,
  IFileSystemCloud,
  ListOptions,
  Paging,
  ReadOptions,
  VersionObject,
  VersionOptions,
  WriteOptions,
} from "./types";

export class FSC implements IFileSystemCloud {
  private adapter: IFileSystemCloud;

  constructor(adapter: IFileSystemCloud) {
    this.adapter = adapter;
  }

  async read(options: ReadOptions): Promise<FileObject> {
    return this.adapter.read(options);
  }

  async write(options: WriteOptions): Promise<FileObject> {
    return this.adapter.write(options);
  }

  async delete(options: DeleteOptions): Promise<FileObject> {
    return this.adapter.delete(options);
  }

  async copy(options: CopyOptions): Promise<FileObject> {
    return this.adapter.copy(options);
  }

  async list(options: ListOptions): Promise<Paging<FileObject[]>> {
    return this.adapter.list(options);
  }

  async versions(options: VersionOptions): Promise<Paging<VersionObject[]>> {
    return this.adapter.versions(options);
  }
}
