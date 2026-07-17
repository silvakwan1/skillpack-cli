import fs from "fs-extra";
import path from "path";
import { fileURLToPath } from "url";
import pc from "picocolors";
import { FRAMEWORKS } from "../utils/frameworks";
import { readManifest, writeManifest } from "../utils/manifest";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Resolve templates root dynamically depending on whether we are running from src/ or dist/
let TEMPLATES_ROOT = path.join(__dirname, "../templates");
if (!fs.pathExistsSync(TEMPLATES_ROOT)) {
  TEMPLATES_ROOT = path.join(__dirname, "../../templates");
}

export async function runInit(selectedFrameworks: string[]): Promise<void> {
  const cwd = process.cwd();
  const agentsDir = path.join(cwd, ".agents");
  const agentsExists = await fs.pathExists(agentsDir);

  if (!agentsExists) {
    // Primeira execução: cria a estrutura base (AGENTS.md raiz + config.json)
    await fs.copy(path.join(TEMPLATES_ROOT, "base", ".agents"), agentsDir);
    console.log(pc.green("✔ .agents criado com a configuração base."));
  }

  const manifest = await readManifest(agentsDir);

  if (selectedFrameworks.length === 0) {
    if (!agentsExists) {
      console.log(
        pc.yellow(
          "Nenhum framework informado. Rode com --next, --laravel ou --list para ver as opções.",
        ),
      );
    } else {
      console.log(pc.yellow("Nada a fazer: nenhuma flag de framework foi passada."));
    }
    return;
  }

  for (const key of selectedFrameworks) {
    const fw = FRAMEWORKS[key];
    if (!fw) continue;

    const alreadyApplied = manifest.frameworks.includes(key);
    const skillTargetDir = path.join(agentsDir, "skills", key);
    const templateDir = path.join(TEMPLATES_ROOT, fw.templateDir, ".agents");

    if (alreadyApplied && (await fs.pathExists(skillTargetDir))) {
      console.log(pc.dim(`— skill "${key}" já estava configurada, mantendo como está.`));
      continue;
    }

    await fs.copy(templateDir, skillTargetDir);
    manifest.frameworks.push(key);
    manifest.managedFiles.push(`skills/${key}`);
    console.log(pc.green(`✔ skill "${fw.label}" adicionada em .agents/skills/${key}/`));
  }

  await writeManifest(agentsDir, manifest);
}
