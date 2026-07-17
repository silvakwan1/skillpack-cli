#!/usr/bin/env node
import { Command } from "commander";
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

    const selected = opts.all
      ? Object.keys(FRAMEWORKS)
      : Object.keys(FRAMEWORKS).filter((key) => opts[FRAMEWORKS[key].flag]);

    await runInit(selected);
  });

program.parse();
