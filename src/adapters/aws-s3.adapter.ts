import {
  CopyObjectCommand,
  DeleteObjectCommand,
  GetObjectCommand,
  GetObjectTaggingCommand,
  ListObjectsV2Command,
  ListObjectVersionsCommand,
  MetadataDirective,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
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
import qs from "node:querystring";

export class AWSS3Adapter implements IFileSystemCloud {
  protected client: S3Client;

  constructor(client: S3Client) {
    this.client = client;
  }

  async read(options: ReadOptions): Promise<FileObject> {
    let tags;
    const { directory, path, version, encoding } = options;

    const {
      Body,
      VersionId,
      TagCount,
      ContentType,
      ContentLength,
      LastModified,
    } = await this.client.send(
      new GetObjectCommand({
        Bucket: directory,
        Key: path,
        VersionId: version,
        ResponseContentEncoding: encoding,
      }),
    );

    if (TagCount && TagCount > 0) {
      const { TagSet } = await this.client.send(
        new GetObjectTaggingCommand({
          Bucket: directory,
          Key: path,
          VersionId: version,
        }),
      );

      if (TagSet && TagSet.length > 0) {
        tags = TagSet.reduce(
          (acc, cv) => ({ ...acc, [cv.Key as string]: cv.Value }),
          {},
        );
      }
    }

    return {
      data: Body?.transformToWebStream(),
      directory,
      path,
      tags,
      version: VersionId,
      type: ContentType,
      size: ContentLength,
      date: LastModified,
    };
  }

  async write(options: WriteOptions): Promise<FileObject> {
    const { data, directory, path, encoding, tags } = options;

    const {
      VersionId,
    } = await this.client.send(
      new PutObjectCommand({
        Bucket: directory,
        Key: path,
        Body: data,
        ContentEncoding: encoding,
        Tagging: tags && qs.stringify(tags),
      }),
    );
    return {
      data,
      directory,
      path,
      tags,
      version: VersionId,
    };
  }

  async copy(options: CopyOptions): Promise<FileObject> {
    const { directory, from, to, version } = options;

    const {
      VersionId,
      CopyObjectResult,
    } = await this.client.send(
      new CopyObjectCommand({
        Bucket: directory,
        CopySource: `${directory}/${from}${version && `?versionId=${version}`}`,
        Key: to,
        MetadataDirective: MetadataDirective.COPY,
      }),
    );

    return {
      directory,
      path: to,
      version: VersionId,
      date: CopyObjectResult?.LastModified,
    };
  }

  async delete(options: DeleteOptions): Promise<FileObject> {
    const { directory, path, version } = options;

    await this.client.send(
      new DeleteObjectCommand({
        Bucket: directory,
        Key: path,
        VersionId: version,
      }),
    );
    return {
      directory,
      path,
      version,
    };
  }

  async list(options: ListOptions): Promise<Paging<FileObject[]>> {
    let data: FileObject[] = [];
    const {
      directory,
      path,
      next,
    } = options;

    const {
      CommonPrefixes,
      Contents,
      NextContinuationToken,
    } = await this.client.send(
      new ListObjectsV2Command({
        Bucket: directory,
        Prefix: path,
        Delimiter: "/",
        ContinuationToken: next,
      }),
    );

    if (CommonPrefixes) {
      data = CommonPrefixes.map((cp) => ({
        directory,
        path: cp.Prefix,
      }));
    }

    if (Contents) {
      data = [
        ...data,
        ...Contents.map((c) => ({
          directory,
          path: c.Key,
          date: c.LastModified,
          size: c.Size,
        })),
      ];
    }

    return {
      data,
      next: NextContinuationToken,
    };
  }

  async versions(options: VersionOptions): Promise<Paging<VersionObject[]>> {
    const { directory, path } = options;

    const { Versions } = await this.client.send(
      new ListObjectVersionsCommand({
        Bucket: directory,
        KeyMarker: path,
      }),
    );

    return {
      data: Versions?.map((v) => ({
        directory,
        path,
        date: v.LastModified,
        latest: v.IsLatest,
        size: v.Size,
        version: v.VersionId,
      })),
      next: undefined,
    };
  }
}
