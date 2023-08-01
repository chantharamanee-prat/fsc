import { BlobServiceClient } from "@azure/storage-blob";
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
} from "../types";

export class AzureBlobStorageAdapter implements IFileSystemCloud {
  protected client: BlobServiceClient;

  constructor(client: BlobServiceClient) {
    this.client = client;
  }

  async read(options: ReadOptions): Promise<FileObject> {
    const {
      directory,
      path,
      encoding,
      version,
    } = options;

    let tags = {};

    const containerClient = this.client.getContainerClient(
      directory,
    );
    const blobClient = containerClient.getBlockBlobClient(
      `${path}${version && `?versionid=${version}`}`,
    );
    const {
      readableStreamBody,
      date,
      contentLength,
      contentType,
      tagCount,
      versionId,
    } = await blobClient.download(0);

    if (tagCount && tagCount > 0) {
    }

    return {
      data: readableStreamBody,
      date: date,
      directory,
      path,
      type: contentType,
      size: contentLength,
      tags,
      version: versionId,
    };
  }

  async write(options: WriteOptions): Promise<FileObject> {
    return {};
  }

  async copy(options: CopyOptions): Promise<FileObject> {
    return {};
  }

  async delete(options: DeleteOptions): Promise<FileObject> {
    return {};
  }

  async list(options: ListOptions): Promise<Paging<FileObject[]>> {
    return {
      data: [],
      next: undefined,
    };
  }

  async versions(options: VersionOptions): Promise<Paging<VersionObject[]>> {
    return {
      data: [],
      next: undefined,
    };
  }
}
