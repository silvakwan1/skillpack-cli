import fs from "fs-extra";
import { describe, expect, it, vi } from "vitest";
import { FRAMEWORKS } from "../src/utils/frameworks";
import { readManifest } from "../src/utils/manifest";

vi.mock("fs-extra", async () => {
  const actual = await vi.importActual<Record<string, unknown>>("fs-extra");
  const actualFs = (actual.default || actual) as Record<string, unknown>;
  return {
    default: {
      ...actualFs,
      pathExists: vi.fn(),
      readJson: vi.fn(),
      writeJson: vi.fn(),
      copy: vi.fn(),
      pathExistsSync: vi.fn().mockReturnValue(true),
    },
  };
});

describe("frameworks config", () => {
  it("deve conter as configurações de todos os frameworks suportados", () => {
    expect(FRAMEWORKS.next).toBeDefined();
    expect(FRAMEWORKS.next.flag).toBe("next");
    expect(FRAMEWORKS.laravel).toBeDefined();
    expect(FRAMEWORKS.laravel.flag).toBe("laravel");
    expect(FRAMEWORKS.nest).toBeDefined();
    expect(FRAMEWORKS.nest.flag).toBe("nest");
    expect(FRAMEWORKS.express).toBeDefined();
    expect(FRAMEWORKS.express.flag).toBe("express");
    expect(FRAMEWORKS.pandas).toBeDefined();
    expect(FRAMEWORKS.pandas.flag).toBe("pandas");
    expect(FRAMEWORKS.frontend).toBeDefined();
    expect(FRAMEWORKS.frontend.flag).toBe("frontend");
    expect(FRAMEWORKS.backend).toBeDefined();
    expect(FRAMEWORKS.backend.flag).toBe("backend");
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

describe("runInit", () => {
  it("deve copiar arquivos base incluindo opencode.json e AGENTS.md se .agents não existir", async () => {
    const mockedFs = vi.mocked(fs);
    mockedFs.copy.mockClear();

    // Mock pathExists to say .agents does not exist, but base configurations do
    mockedFs.pathExists.mockImplementation(async (filePath) => {
      const p = String(filePath);
      if (p.endsWith(".agents")) return false;
      return true;
    });

    mockedFs.readJson.mockResolvedValue({
      version: 1,
      frameworks: [],
      managedFiles: [],
    } as never);

    // Import runInit dynamically to ensure mock is applied
    const { runInit } = await import("../src/commands/init");
    await runInit([]);

    expect(mockedFs.copy).toHaveBeenCalledWith(
      expect.stringContaining("opencode.json"),
      expect.stringContaining("opencode.json"),
    );
  });
});
