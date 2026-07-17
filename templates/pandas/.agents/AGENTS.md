# Configuração de Agentes — Pandas (Python Data Analysis)

## 📋 Regras Gerais do Projeto

### Idioma e Convenções
- Código, nomes de colunas, variáveis e scripts em **inglês**.
- Comentários, documentação e commits em **português**.
- Commits semânticos: `feat:`, `fix:`, `docs:`, `style:`, `refactor:`, `test:`, `chore:`.

### Stack Tecnológica
- **Python 3.9+**
- **Pandas** & **NumPy**
- **Jupyter Notebooks / VS Code Interactive Mode**
- **Pytest** para testes e **Pandera** ou **Pydantic** para validação de dados

---

## 🏗️ Padrões de Projeto (Pandas Best Practices)
- **Vetorização**: Sempre prefira operações vetorizadas do Pandas/NumPy em vez de iterar com loops `for` ou `.iterrows()`.
- **Chain Method (Method Chaining)**: Use encadeamento de métodos com parênteses para manter transformações de DataFrame limpas e legíveis.
- **Evite SettingWithCopyWarning**: Nunca modifique fatias diretamente. Use `.loc` ou crie cópias explícitas (`.copy()`).
- **Validação de Schemas**: Valide os schemas de entrada e saída dos DataFrames usando Pandera.

---

## 🔧 Skills Disponíveis

| Skill | Path | Descrição |
|-------|------|-----------|
| `pandas` | `.agents/skills/pandas/skills/pandas/SKILL.md` | Otimização, limpeza, agrupamento de DataFrames e method chaining |
| `qa` | `.agents/skills/pandas/skills/qa/SKILL.md` | Testes de pipelines com Pytest, validação com Pandera, e qualidade de dados |

---

## 🤖 Agentes Disponíveis

### 1. Data Analyst / Scientist (`data-analyst`)
- **Path**: `.agents/skills/pandas/skills/data-analyst/SKILL.md` · **Skills**: `pandas`
- Cientista/Analista de Dados sênior. Especialista em processamento de grandes volumes de dados, limpeza, engenharia de features e visualização.

### 2. QA Engineer (`qa-engineer`)
- **Path**: `.agents/skills/pandas/skills/qa-engineer/SKILL.md` · **Skills**: `qa`
- QA focado em pipelines de dados. Valida consistência de estatísticas, tipos de colunas, valores nulos e executa testes com Pytest.
