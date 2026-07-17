#!/usr/bin/env node
import * as p from "@clack/prompts";
import { Command } from "commander";
import pc from "picocolors";
import { runInit } from "./commands/init";
import { FRAMEWORKS } from "./utils/frameworks";

const program = new Command();

program
  .name("skills")
  .description(
    "Inicializa ou atualiza a pasta .agents do projeto com skills prontas por framework.",
  )
  .version("1.0.0");

// Registra uma flag booleana pra cada framework suportado dinamicamente.
// Ex: --next, --laravel, --express...
for (const fw of Object.values(FRAMEWORKS)) {
  program.option(`--${fw.flag}`, `Adiciona/atualiza a skill de ${fw.label}`);
}

program
  .option("--all", "Adiciona todas as skills de framework disponíveis")
  .option("--list", "Lista os frameworks suportados e sai")
  .action(async (opts) => {
    if (opts.list) {
      console.log("Frameworks suportados:\n");
      for (const fw of Object.values(FRAMEWORKS)) {
        console.log(`  --${fw.flag.padEnd(10)} ${fw.label}`);
      }
      return;
    }

    let selected = opts.all
      ? Object.keys(FRAMEWORKS)
      : Object.keys(FRAMEWORKS).filter((key) => opts[FRAMEWORKS[key].flag]);

    if (selected.length === 0) {
      p.intro(pc.cyan("Skillpack CLI"));

      const promptResult = await p.select({
        message: "Selecione o framework/skill para configurar:",
        options: [
          ...Object.entries(FRAMEWORKS).map(([key, fw]) => ({
            value: key,
            label: fw.label,
            hint: `--${fw.flag}`,
          })),
          {
            value: "all",
            label: "Todos os frameworks",
            hint: "--all",
          },
        ],
      });

      if (p.isCancel(promptResult)) {
        p.cancel("Operação cancelada.");
        process.exit(0);
      }

      if (promptResult === "all") {
        selected = Object.keys(FRAMEWORKS);
      } else {
        selected = [promptResult as string];
      }

      await runInit(selected);
      p.outro(pc.green("Configuração concluída com sucesso!"));
      return;
    }

    await runInit(selected);
  });

program.parse();
