# Arquitetura Frontend

## 📁 Estrutura de Pastas Recomendada

```
src/
├── assets/                 # Imagens, fontes, SVGs e arquivos estáticos
├── components/             # Componentes reutilizáveis globais (botões, cards, etc.)
├── hooks/                  # Hooks customizados para React/Vue (se aplicável)
├── layouts/                # Componentes de layout estrutural (Header, Sidebar)
├── pages/                  # Componentes de página ou roteamento da aplicação
├── services/               # Camada de comunicação com APIs externas
├── styles/                 # Configurações de estilo global, temas e tokens
├── utils/                  # Funções utilitárias puras
└── types/                  # Definições de tipos TypeScript globais
```

## 🏗️ Padrões de Arquitetura

### 1. Componentes Focados (Single Responsibility)
Cada componente deve ser responsável por uma única peça visual ou comportamento. Extraia lógicas complexas para hooks ou funções utilitárias.

### 2. Estilização Baseada em Tokens
Evite usar cores ou espaçamentos inline não padronizados. Utilize o design system do projeto (via Tailwind ou variáveis CSS/SASS).

### 3. Acessibilidade (a11y) Nativa
Sempre dê preferência para elementos HTML semânticos nativos (`<button>`, `<a>`, `<nav>`, `<aside>`) em vez de divs genéricas com eventos de clique para navegação ou ações.
