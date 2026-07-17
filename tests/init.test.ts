import { describe, expect, it, vi } from "vitest";
import { FRAMEWORKS } from "../src/utils/frameworks";
import { readManifest } from "../src/utils/manifest";
import fs from "fs-extra";

vi.mock("fs-extra", async () => {
  const actual = await vi.importActual<typeof fs>("fs-extra");
  return {
    default: {
      ...actual,
      pathExists: vi.fn(),
      readJson: vi.fn(),
      writeJson: vi.fn(),
      copy: vi.fn(),
    },
  };
});

describe("frameworks config", () => {
  it("deve conter as configurações dos frameworks Next.js e Laravel", () => {
    expect(FRAMEWORKS.next).toBeDefined();
    expect(FRAMEWORKS.next.flag).toBe("next");
    expect(FRAMEWORKS.laravel).toBeDefined();
    expect(FRAMEWORKS.laravel.flag).toBe("laravel");
  });
});

describe("manifest utils", () => {
  it("deve retornar o manifest padrão se o arquivo não existir", async () => {
    const mockedFs = vi.mocked(fs);
    mockedFs.pathExists.mockResolvedValueOnce(false as never);

    const manifest = await readManifest("mock-dir");
    expect(manifest).toEqual({
      version: 1,
      frameworks: [],
      managedFiles: [],
    });
  });

  it("deve carregar o manifest existente se o arquivo existir", async () => {
    const mockedFs = vi.mocked(fs);
    mockedFs.pathExists.mockResolvedValueOnce(true as never);
    mockedFs.readJson.mockResolvedValueOnce({
      version: 1,
      frameworks: ["next"],
      managedFiles: ["skills/next"],
    } as never);

    const manifest = await readManifest("mock-dir");
    expect(manifest.frameworks).toContain("next");
  });
});
