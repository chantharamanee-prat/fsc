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
      delete: jest.fn().mockRejectedValue(undefined),
      list: jest.fn().mockResolvedValueOnce(undefined),
    };

    fsc = new FSC(mockAdapter);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should call read method correctly", async () => {

    const mockReadOptions = {
      directory: faker.word.noun(),
      path: faker.word.noun(),
    };
    const result = await fsc.read(mockReadOptions);

    expect(result).toBeDefined()
    expect(mockAdapter.read).toBeCalledTimes(1);
    expect(mockAdapter.read).toBeCalledWith(mockReadOptions)
  });
});
