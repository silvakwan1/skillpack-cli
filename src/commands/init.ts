import path from "node:path";
import { fileURLToPath } from "node:url";
import fs from "fs-extra";
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

    // Copiar arquivos de configuração adicionais para a raiz
    const baseTemplatesDir = path.join(TEMPLATES_ROOT, "base");

    const claudepromptSrc = path.join(baseTemplatesDir, ".claudeprompt");
    const claudepromptDest = path.join(cwd, ".claudeprompt");
    if (await fs.pathExists(claudepromptSrc)) {
      await fs.copy(claudepromptSrc, claudepromptDest);
      console.log(pc.green("✔ .claudeprompt criado na raiz do projeto."));
    }

    const cursorrulesSrc = path.join(baseTemplatesDir, ".cursorrules");
    const cursorrulesDest = path.join(cwd, ".cursorrules");
    if (await fs.pathExists(cursorrulesSrc)) {
      await fs.copy(cursorrulesSrc, cursorrulesDest);
      console.log(pc.green("✔ .cursorrules criado na raiz do projeto."));
    }

    const vscodeSrc = path.join(baseTemplatesDir, ".vscode");
    const vscodeDest = path.join(cwd, ".vscode");
    if (await fs.pathExists(vscodeSrc)) {
      await fs.copy(vscodeSrc, vscodeDest);
      console.log(pc.green("✔ .vscode/settings.json criado."));
    }
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
    const agentTargetDir = path.join(agentsDir, "agents", key);
    const templateDir = path.join(TEMPLATES_ROOT, fw.templateDir, ".agents");

    if (alreadyApplied && (await fs.pathExists(skillTargetDir))) {
      console.log(pc.dim(`— skill "${key}" já estava configurada, mantendo como está.`));
      continue;
    }

    // Copiar subpasta skills
    const templateSkillsDir = path.join(templateDir, "skills");
    if (await fs.pathExists(templateSkillsDir)) {
      await fs.copy(templateSkillsDir, skillTargetDir);
    }

    // Copiar subpasta agents
    const templateAgentsDir = path.join(templateDir, "agents");
    if (await fs.pathExists(templateAgentsDir)) {
      await fs.copy(templateAgentsDir, agentTargetDir);
    }

    // Copiar outros arquivos (como ARCHITECTURE.md, AGENTS.md, PROGRESS.md, references) para a pasta da skill
    if (await fs.pathExists(templateDir)) {
      const items = await fs.readdir(templateDir);
      for (const item of items) {
        if (item === "skills" || item === "agents") continue;
        const itemPath = path.join(templateDir, item);
        const destPath = path.join(skillTargetDir, item);
        await fs.copy(itemPath, destPath);
      }
    }

    manifest.frameworks.push(key);
    manifest.managedFiles.push(`skills/${key}`);
    manifest.managedFiles.push(`agents/${key}`);
    console.log(pc.green(`✔ skill "${fw.label}" adicionada e organizada em .agents/`));
  }

  await writeManifest(agentsDir, manifest);
}
