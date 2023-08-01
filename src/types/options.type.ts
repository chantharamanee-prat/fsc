import { WritableStream } from "stream/web";
import { Encoding } from "./file-system-cloud.type";

interface BaseOptions {
  directory: string
  path: string
}

export interface ReadOptions extends BaseOptions {
  encoding?: Encoding;
  version?: string;
}

export interface WriteOptions extends BaseOptions {
  data: string | Buffer | WritableStream;
  encoding?: Encoding;
  tags?: Record<string, string>;
}

export interface DeleteOptions extends BaseOptions {
  version?: string;
}

export interface CopyOptions  {
  directory: string
  from: string
  to: string;
  version?: string;
}

export interface ListOptions extends BaseOptions {
  next?: string
}

export interface VersionOptions extends BaseOptions {
  next?: string
}

export interface Paging<T> {
  data?: T;
  next?: string;
}
