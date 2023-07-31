import {
  CopyOptions,
  DeleteOptions,
  FileObject,
  IFileSystemCloud,
  ListOptions,
  ReadOptions,
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

  async write(options: WriteOptions): Promise<void> {
    return this.adapter.write(options);
  }

  async delete(options: DeleteOptions): Promise<void> {
    return this.adapter.delete(options);
  }

  async copy(options: CopyOptions): Promise<void> {
    return this.adapter.copy(options);
  }

  async list(options: ListOptions): Promise<FileObject[]> {
    return this.adapter.list(options);
  }
}
