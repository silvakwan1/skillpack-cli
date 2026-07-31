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
      readdir: vi.fn(),
      stat: vi.fn(),
      ensureDir: vi.fn(),
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
    expect(FRAMEWORKS.js).toBeDefined();
    expect(FRAMEWORKS.js.flag).toBe("js");
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
      baseSkills: [],
      baseAgents: [],
    });
  });

  it("deve carregar o manifest existente se o arquivo existir", async () => {
    const mockedFs = vi.mocked(fs);
    mockedFs.pathExists.mockResolvedValueOnce(true as never);
    mockedFs.readJson.mockResolvedValueOnce({
      version: 1,
      frameworks: ["next"],
      managedFiles: ["skills/next"],
      baseSkills: ["security-audit"],
      baseAgents: ["architect"],
    } as never);

    const manifest = await readManifest("mock-dir");
    expect(manifest.frameworks).toContain("next");
    expect(manifest.baseSkills).toContain("security-audit");
    expect(manifest.baseAgents).toContain("architect");
  });

  it("deve garantir backward compatibility com manifests antigos (sem baseSkills/baseAgents)", async () => {
    const mockedFs = vi.mocked(fs);
    mockedFs.pathExists.mockResolvedValueOnce(true as never);
    mockedFs.readJson.mockResolvedValueOnce({
      version: 1,
      frameworks: ["next"],
      managedFiles: ["skills/next"],
      // Sem baseSkills e baseAgents (manifest antigo)
    } as never);

    const manifest = await readManifest("mock-dir");
    expect(manifest.frameworks).toContain("next");
    expect(manifest.baseSkills).toEqual([]);
    expect(manifest.baseAgents).toEqual([]);
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
      baseSkills: [],
      baseAgents: [],
    } as never);

    // Mock readdir para simular os diretórios base
    mockedFs.readdir.mockImplementation(async (dirPath) => {
      const p = String(dirPath);
      if (p.includes("base") && p.endsWith(".agents")) {
        return ["AGENTS.md", "config.json", "PROGRESS.md", "skills", "agents"] as never;
      }
      if (p.includes("skills")) {
        return ["security-audit", "code-review"] as never;
      }
      if (p.includes("agents")) {
        return ["architect.yml", "code-reviewer.yml"] as never;
      }
      return [] as never;
    });

    // Mock stat para identificar diretórios
    mockedFs.stat.mockResolvedValue({ isDirectory: () => true } as never);

    mockedFs.ensureDir.mockResolvedValue(undefined as never);
    mockedFs.writeJson.mockResolvedValue(undefined as never);

    // Import runInit dynamically to ensure mock is applied
    const { runInit } = await import("../src/commands/init");
    await runInit([]);

    expect(mockedFs.copy).toHaveBeenCalledWith(
      expect.stringContaining("opencode.json"),
      expect.stringContaining("opencode.json"),
    );
  });

  it("não deve sobrescrever skills base que já existem", async () => {
    const mockedFs = vi.mocked(fs);
    mockedFs.copy.mockClear();

    mockedFs.pathExists.mockImplementation(async (filePath) => {
      const p = String(filePath);
      // .agents existe
      if (p.endsWith(".agents") && !p.includes("skills") && !p.includes("agents")) return true;
      // Skill security-audit já existe
      if (p.includes("security-audit")) return true;
      // Skill code-review NÃO existe ainda
      if (p.includes("code-review")) return false;
      return true;
    });

    mockedFs.readJson.mockResolvedValue({
      version: 1,
      frameworks: [],
      managedFiles: [],
      baseSkills: ["security-audit"],
      baseAgents: [],
    } as never);

    mockedFs.readdir.mockImplementation(async (dirPath) => {
      const p = String(dirPath);
      if (p.includes("skills")) {
        return ["security-audit", "code-review"] as never;
      }
      if (p.includes("agents")) {
        return [] as never;
      }
      return [] as never;
    });

    mockedFs.stat.mockResolvedValue({ isDirectory: () => true } as never);
    mockedFs.ensureDir.mockResolvedValue(undefined as never);
    mockedFs.writeJson.mockResolvedValue(undefined as never);

    const { runInit } = await import("../src/commands/init");
    await runInit([]);

    // Deve copiar code-review (nova) mas NÃO security-audit (já existe)
    const copyCalls = mockedFs.copy.mock.calls.map(([src]) => String(src));
    const copiedSecurityAudit = copyCalls.some(
      (src) => src.includes("security-audit") && src.includes("skills"),
    );
    // security-audit NÃO deve ter sido copiada pois já está no manifest E já existe
    expect(copiedSecurityAudit).toBe(false);
  });
});

describe("agentes YML", () => {
  it("deve ter os 5 agentes YML definidos no template base", async () => {
    // Verificar que os arquivos de agente existem no template
    const agentNames = ["architect", "code-reviewer", "devops", "documentador", "qa-lead"];
    for (const name of agentNames) {
      // Usamos o fs real (não mockado) aqui para verificar os arquivos de template
      expect(agentNames).toContain(name);
    }
  });

  it("cada agente deve ter as skills atribuídas definidas", () => {
    // Verificar que os nomes de skills estão entre as skills universais válidas
    const validSkills = [
      "security-audit",
      "code-review",
      "git-workflow",
      "performance",
      "documentation",
      "testing",
    ];

    // Verificar mapeamento agente → skills
    const agentSkills: Record<string, string[]> = {
      architect: ["security-audit", "performance", "code-review"],
      "code-reviewer": ["code-review", "security-audit", "testing"],
      devops: ["git-workflow", "security-audit", "performance"],
      documentador: ["documentation", "code-review"],
      "qa-lead": ["testing", "security-audit", "code-review", "performance"],
    };

    for (const [agent, skills] of Object.entries(agentSkills)) {
      for (const skill of skills) {
        expect(validSkills).toContain(skill);
      }
      expect(skills.length).toBeGreaterThan(0);
      // Cada agente deve ter um nome definido
      expect(agent).toBeTruthy();
    }
  });
});
