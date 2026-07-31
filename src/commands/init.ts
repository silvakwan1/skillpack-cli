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

/**
 * Copia skills universais do template base para .agents/skills/
 * sem sobrescrever skills que já existem (preserva edições manuais do usuário).
 */
async function copyBaseSkills(
  agentsDir: string,
  manifest: { baseSkills: string[]; managedFiles: string[] },
): Promise<void> {
  const baseSkillsDir = path.join(TEMPLATES_ROOT, "base", ".agents", "skills");
  if (!(await fs.pathExists(baseSkillsDir))) return;

  const skillDirs = await fs.readdir(baseSkillsDir);
  for (const skillName of skillDirs) {
    const srcDir = path.join(baseSkillsDir, skillName);
    const stat = await fs.stat(srcDir);
    if (!stat.isDirectory()) continue;

    const destDir = path.join(agentsDir, "skills", skillName);

    // Se a skill já está registrada no manifest E o diretório existe, não sobrescrever
    if (manifest.baseSkills.includes(skillName) && (await fs.pathExists(destDir))) {
      console.log(pc.dim(`— skill base "${skillName}" já configurada, mantendo como está.`));
      continue;
    }

    // Se o diretório já existe mas não está no manifest (edição manual), não sobrescrever
    if (await fs.pathExists(destDir)) {
      console.log(
        pc.dim(`— skill base "${skillName}" já existe (manual), registrando no manifest.`),
      );
      if (!manifest.baseSkills.includes(skillName)) {
        manifest.baseSkills.push(skillName);
        manifest.managedFiles.push(`skills/${skillName}`);
      }
      continue;
    }

    // Skill nova — copiar do template
    await fs.copy(srcDir, destDir);
    manifest.baseSkills.push(skillName);
    manifest.managedFiles.push(`skills/${skillName}`);
    console.log(pc.green(`✔ skill base "${skillName}" adicionada em .agents/skills/`));
  }
}

/**
 * Copia agentes YML do template base para .agents/agente/
 * sem sobrescrever agentes que já existem (preserva edições manuais do usuário).
 */
async function copyBaseAgents(
  agentsDir: string,
  manifest: { baseAgents: string[]; managedFiles: string[] },
): Promise<void> {
  const baseAgentsDir = path.join(TEMPLATES_ROOT, "base", ".agents", "agente");
  if (!(await fs.pathExists(baseAgentsDir))) return;

  const agentFiles = await fs.readdir(baseAgentsDir);
  for (const fileName of agentFiles) {
    if (!fileName.endsWith(".yml") && !fileName.endsWith(".yaml")) continue;

    const agentName = path.parse(fileName).name;
    const srcFile = path.join(baseAgentsDir, fileName);
    const destDir = path.join(agentsDir, "agente");
    const destFile = path.join(destDir, fileName);

    // Se o agente já está registrado no manifest E o arquivo existe, não sobrescrever
    if (manifest.baseAgents.includes(agentName) && (await fs.pathExists(destFile))) {
      console.log(pc.dim(`— agente "${agentName}" já configurado, mantendo como está.`));
      continue;
    }

    // Se o arquivo já existe mas não está no manifest (edição manual), não sobrescrever
    if (await fs.pathExists(destFile)) {
      console.log(pc.dim(`— agente "${agentName}" já existe (manual), registrando no manifest.`));
      if (!manifest.baseAgents.includes(agentName)) {
        manifest.baseAgents.push(agentName);
        manifest.managedFiles.push(`agente/${fileName}`);
      }
      continue;
    }

    // Agente novo — copiar do template
    await fs.ensureDir(destDir);
    await fs.copy(srcFile, destFile);
    manifest.baseAgents.push(agentName);
    manifest.managedFiles.push(`agente/${fileName}`);
    console.log(pc.green(`✔ agente "${agentName}" (${fileName}) adicionado em .agents/agente/`));
  }
}

export async function runInit(selectedFrameworks: string[]): Promise<void> {
  const cwd = process.cwd();
  const agentsDir = path.join(cwd, ".agents");
  const agentsExists = await fs.pathExists(agentsDir);

  if (!agentsExists) {
    // Primeira execução: cria a estrutura base (AGENTS.md raiz + config.json)
    // Copiar apenas os arquivos base, NÃO as subpastas skills/ e agente/ (são tratadas separadamente)
    const baseSrcDir = path.join(TEMPLATES_ROOT, "base", ".agents");
    const baseItems = await fs.readdir(baseSrcDir);
    await fs.ensureDir(agentsDir);
    for (const item of baseItems) {
      // Pular subpastas que são gerenciadas separadamente
      if (item === "skills" || item === "agente") continue;
      const itemSrc = path.join(baseSrcDir, item);
      const itemDest = path.join(agentsDir, item);
      await fs.copy(itemSrc, itemDest);
    }
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

    const opencodeSrc = path.join(baseTemplatesDir, "opencode.json");
    const opencodeDest = path.join(cwd, "opencode.json");
    if (await fs.pathExists(opencodeSrc)) {
      await fs.copy(opencodeSrc, opencodeDest);
      console.log(pc.green("✔ opencode.json criado na raiz do projeto."));
    }
  }

  const manifest = await readManifest(agentsDir);

  // Sempre garantir que skills universais e agentes YML do base estão instalados
  // (sem sobrescrever edições manuais do usuário)
  await copyBaseSkills(agentsDir, manifest);
  await copyBaseAgents(agentsDir, manifest);

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
    await writeManifest(agentsDir, manifest);
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
