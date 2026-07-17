# Guia de Contribuição (Contributing Guide)

Obrigado pelo seu interesse em contribuir para o **skillpack-cli**! Este documento orienta você sobre o processo de desenvolvimento e como enviar suas contribuições.

---

## Como Contribuir

### 1. Pré-requisitos

Certifique-se de ter o [Node.js](https://nodejs.org/) (versão >= 18) instalado em sua máquina.

### 2. Configurando o Ambiente Local

1. Faça o fork do repositório.
2. Clone o repositório em sua máquina local:
   ```bash
   git clone https://github.com/silvakwan1/skillpack-cli.git
   cd skillpack-cli
   ```
3. Instale as dependências:
   ```bash
   npm install
   ```

### 3. Scripts Disponíveis

Durante o desenvolvimento, você pode utilizar os seguintes comandos:

- **Desenvolvimento (Watch mode)**: Compila o projeto em tempo real conforme você faz alterações.
  ```bash
  npm run dev
  ```
- **Build**: Compila o projeto para a pasta `dist`.
  ```bash
  npm run build
  ```
- **Testes**: Executa a suíte de testes com o Vitest.
  ```bash
  npm run test
  ```
- **Lint & Formatação**: Verifica o código com o Biome.
  ```bash
  npm run lint
  # Para corrigir e formatar automaticamente:
  npm run lint:fix
  ```
- **Type Checking**: Verifica os tipos TypeScript.
  ```bash
  npx tsc --noEmit
  ```

### 4. Estrutura do Projeto

- `src/`: Código fonte do CLI.
- `templates/`: Modelos de `.agents` e `SKILL.md` específicos de cada framework.
- `tests/`: Suíte de testes do CLI.

### 5. Adicionando um Novo Framework/Skill

Para adicionar suporte a um novo framework:
1. Crie a estrutura de template em `templates/<nome-do-framework>/.agents/SKILL.md`.
2. Adicione quaisquer arquivos de configuração extras necessários na pasta do framework.
3. Registre o novo framework no arquivo `src/utils/frameworks.ts`:
   ```typescript
   novoFramework: {
     flag: 'novo-framework',
     label: 'Nome do Framework',
     templateDir: 'novo-framework',
   }
   ```
4. Adicione um teste em `tests/` para garantir que o template é criado corretamente.

### 6. Processo de Envio e Versionamento (Changesets)

Este repositório utiliza o **Changesets** para gerenciar o versionamento e o registro de alterações (changelog).

Quando você fizer uma alteração que deve ser incluída no próximo lançamento:
1. Execute o comando para criar um changeset:
   ```bash
   npm run changeset:add
   ```
2. Siga as instruções no terminal para:
   - Selecionar o tipo de alteração (patch, minor, major).
   - Escrever uma descrição explicativa em português (ou inglês) sobre o que mudou.
3. Adicione o arquivo gerado pelo changeset ao seu commit:
   ```bash
   npm run changeset:commit
   ```
4. Crie um Pull Request descrevendo suas alterações.

---

## Código de Conduta

Ao participar deste projeto, você concorda em manter um ambiente respeitoso, colaborativo e construtivo.
