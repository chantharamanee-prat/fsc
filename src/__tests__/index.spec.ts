import { IFileSystemCloud } from "src/types";
import { FSC } from "src/index";
import { faker } from "@faker-js/faker";
describe("Test index apps", () => {
  let fsc: FSC;
  let mockAdapter: IFileSystemCloud;

  beforeEach(() => {
    mockAdapter = {
      read: jest.fn().mockResolvedValueOnce(1),
      write: jest.fn().mockResolvedValueOnce(undefined),
      copy: jest.fn().mockResolvedValueOnce(undefined),
      delete: jest.fn().mockResolvedValueOnce(undefined),
      list: jest.fn().mockResolvedValueOnce([1]),
    };

    fsc = new FSC(mockAdapter);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should call fsc.read method correctly", async () => {
    const mockReadOptions = {
      directory: faker.word.sample(),
      path: faker.word.sample(),
    };
    const result = await fsc.read(mockReadOptions);

    expect(result).toBeDefined();
    expect(mockAdapter.read).toBeCalledTimes(1);
    expect(mockAdapter.read).toBeCalledWith(mockReadOptions);
  });

  it("should call fsc.write method correctly", async () => {

    const mockWriteOptions = {
      data: faker.word.sample({ strategy: "longest" }),
      directory: faker.word.sample(),
      path: faker.word.sample(),
      tags: {
        [`${faker.word.sample()}`]: faker.word.sample(),
      },
    };
    const result = await fsc.write(mockWriteOptions);

    expect(result).toBeUndefined();
    expect(mockAdapter.write).toBeCalledTimes(1);
    expect(mockAdapter.write).toBeCalledWith(mockWriteOptions);
  });

  it("should call fsc.copy method correctly", async () => {

    const mockCopyOptions = {
      from: faker.word.sample(), to: faker.word.sample(), directory: faker.word.sample(), toDirectory: faker.word.sample(),
      versionId: faker.string.uuid()
    };
    const result = await fsc.copy(mockCopyOptions);

    expect(result).toBeUndefined();
    expect(mockAdapter.copy).toBeCalledTimes(1);
    expect(mockAdapter.copy).toBeCalledWith(mockCopyOptions);
  });

  it("should call fsc.delete method correctly", async () => {

    const mockDeleteOptions = {
      directory: faker.word.sample(),
      path: faker.word.sample(),
      versionId: faker.string.uuid()
    };
    const result = await fsc.delete(mockDeleteOptions);

    expect(result).toBeUndefined();
    expect(mockAdapter.delete).toBeCalledTimes(1);
    expect(mockAdapter.delete).toBeCalledWith(mockDeleteOptions);
  });

  it("should call fsc.list method correctly", async () => {

    const mockListOptions = {
      directory: faker.word.sample(),
      
    };
    const result = await fsc.list(mockListOptions);

    expect(result).toBeDefined();
    expect(mockAdapter.list).toBeCalledTimes(1);
    expect(mockAdapter.list).toBeCalledWith(mockListOptions);
  });
});
