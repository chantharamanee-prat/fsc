import { mockClient } from "aws-sdk-client-mock";
import {
  GetObjectCommand,
  GetObjectTaggingCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import { AWSAdapter } from "src/adapters/aws.adapter";
import { Readable } from "stream";
import { faker } from "@faker-js/faker";
import { sdkStreamMixin } from "@aws-sdk/util-stream-node";
import { Encoding } from "src/types";
import { ReadableStream } from "stream/web";
describe("AWS Adapter", () => {
  let s3ClientMock: any;
  let awsAdapter: AWSAdapter;
  beforeEach(() => {
    s3ClientMock = mockClient(S3Client);
    awsAdapter = new AWSAdapter(s3ClientMock as any);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should call AWSAdapter.read method correctly", async () => {

    const mockAwsAdapterRead = {
      directory: faker.word.sample(),
      path: faker.word.sample(),
      versionId: faker.string.uuid(),
      encoding: Encoding.UTF8,
    };
    const mockTags = {
      Key: faker.word.sample(),
      Value: faker.word.sample(),
    };
    const stream = new Readable();
    stream.push(faker.word.sample());
    stream.push(null);
    const sdkStream = sdkStreamMixin(stream);


    s3ClientMock.on(
      GetObjectCommand,
    ).resolves({
      Body: sdkStream,
      TagCount: 1,
      VersionId: mockAwsAdapterRead.versionId
    }).on(
      GetObjectTaggingCommand,
    ).resolves({
      TagSet: [mockTags],
    });

    const result = await awsAdapter.read(mockAwsAdapterRead);

    expect(result).toStrictEqual({
      data: expect.any(ReadableStream),
      directory: mockAwsAdapterRead.directory,
      path: mockAwsAdapterRead.path,
      tags: {
        [mockTags.Key]:mockTags.Value 
      },
      versionId: mockAwsAdapterRead.versionId,
      type: undefined,
      size: undefined
    })
  });
});
