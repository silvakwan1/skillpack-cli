import path from "node:path";
import fs from "fs-extra";

const MANIFEST_NAME = ".manifest.json";

export interface Manifest {
  version: number;
  frameworks: string[];
  managedFiles: string[];
}

/**
 * O manifest guarda quais arquivos foram escritos pela lib e quais
 * frameworks já foram aplicados. É o que evita sobrescrever
 * customizações manuais do usuário em rodadas futuras.
 */
export async function readManifest(agentsDir: string): Promise<Manifest> {
  const manifestPath = path.join(agentsDir, MANIFEST_NAME);
  if (await fs.pathExists(manifestPath)) {
    return fs.readJson(manifestPath) as Promise<Manifest>;
  }
  return { version: 1, frameworks: [], managedFiles: [] };
}

export async function writeManifest(agentsDir: string, manifest: Manifest): Promise<void> {
  const manifestPath = path.join(agentsDir, MANIFEST_NAME);
  await fs.writeJson(manifestPath, manifest, { spaces: 2 });
}
