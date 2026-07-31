import path from "node:path";
import fs from "fs-extra";

const MANIFEST_NAME = ".manifest.json";

export interface Manifest {
  version: number;
  frameworks: string[];
  managedFiles: string[];
  baseSkills: string[];
  baseAgents: string[];
}

/**
 * O manifest guarda quais arquivos foram escritos pela lib e quais
 * frameworks já foram aplicados. É o que evita sobrescrever
 * customizações manuais do usuário em rodadas futuras.
 *
 * Também rastreia skills universais (baseSkills) e agentes YML (baseAgents)
 * que foram instalados a partir do template base.
 */
export async function readManifest(agentsDir: string): Promise<Manifest> {
  const manifestPath = path.join(agentsDir, MANIFEST_NAME);
  if (await fs.pathExists(manifestPath)) {
    const data = await fs.readJson(manifestPath);
    // Backward compatibility: manifests antigos podem não ter baseSkills/baseAgents
    return {
      version: data.version ?? 1,
      frameworks: data.frameworks ?? [],
      managedFiles: data.managedFiles ?? [],
      baseSkills: data.baseSkills ?? [],
      baseAgents: data.baseAgents ?? [],
    };
  }
  return { version: 1, frameworks: [], managedFiles: [], baseSkills: [], baseAgents: [] };
}

export async function writeManifest(agentsDir: string, manifest: Manifest): Promise<void> {
  const manifestPath = path.join(agentsDir, MANIFEST_NAME);
  await fs.writeJson(manifestPath, manifest, { spaces: 2 });
}
