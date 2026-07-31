# Arquitetura — Projeto JavaScript Genérico

## 📂 Estrutura Recomendada de Pastas

```
src/
├── controllers/     # Camada de controle e entrada/saída HTTP ou CLI
├── services/        # Regras de negócio e lógica da aplicação
├── models/          # Entidades de dados e esquemas
├── utils/           # Funções auxiliares puras e utilitários
├── config/          # Variáveis de ambiente e constantes globais
└── index.js         # Ponto de entrada da aplicação
```

## 📐 Princípios de Arquitetura
1. **Separação de Camadas**: I/O não deve conter lógica de negócio pesada.
2. **Imutabilidade e Funções Puras**: Mantenha funções previsíveis e fáceis de testar.
3. **Gerenciamento de Dependências**: Use importações explícitas e injete dependências quando necessário.
