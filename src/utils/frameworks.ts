// Registro central de frameworks suportados.
// Pra adicionar um novo framework: crie a pasta templates/<key> com um
// .agents/SKILL.md dentro, e adicione uma entrada aqui.

export interface FrameworkConfig {
  flag: string;
  label: string;
  templateDir: string;
}

export const FRAMEWORKS: Record<string, FrameworkConfig> = {
  next: {
    flag: "next",
    label: "Next.js",
    templateDir: "next",
  },
  laravel: {
    flag: "laravel",
    label: "Laravel",
    templateDir: "laravel",
  },
  nest: {
    flag: "nest",
    label: "NestJS",
    templateDir: "nest",
  },
  express: {
    flag: "express",
    label: "Express",
    templateDir: "express",
  },
  pandas: {
    flag: "pandas",
    label: "Pandas",
    templateDir: "pandas",
  },
  frontend: {
    flag: "frontend",
    label: "Frontend (Generic)",
    templateDir: "frontend",
  },
  backend: {
    flag: "backend",
    label: "Backend (Generic)",
    templateDir: "backend",
  },
};
