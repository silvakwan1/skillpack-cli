---
name: generic-frontend
description: |
  Skill de frontend geral. Contém diretrizes de estilização, padrões de UI, acessibilidade,
  responsividade mobile-first e estruturação semântica.
---

# Skill Frontend Geral — Melhores Práticas

## 💅 Estilização e CSS/Tailwind
- **Design Tokens**: Sempre use tokens de cores, fontes e espaçamentos do projeto. Evite estilizações hardcoded.
- **Mobile-first**: Defina estilos para telas pequenas primeiro e adicione media queries/breakpoints progressivamente para telas maiores.
- **Transições suaves**: Sempre inclua transições para efeitos de hovers e interações ativas em botões e links.

```html
<!-- Exemplo Mobile-first -->
<div class="p-4 md:p-8 lg:p-12 bg-theme-blue text-theme-white">
  Conteúdo responsivo
</div>
```

---

## ♿ Acessibilidade (a11y)
- **HTML Semântico**: Use `<main>`, `<header>`, `<footer>`, `<section>` para estruturar o documento de forma legível por leitores de tela.
- **Formulários**: Sempre vincule `<label>` ao `<input>` usando o atributo `for` ou `htmlFor`.
- **Aria Attributes**: Adicione `aria-label` ou `aria-expanded` para componentes dinâmicos (como modais ou menus hamburguer).

---

## ⚡ Next/React/Modern Frameworks Best Practices
- **Server vs Client**: Evite reatividade desnecessária no client-side. Renderize de forma estática no servidor tudo o que for possível.
- **Clean Imports**: Ordene suas importações para facilitar a leitura dos arquivos.
- **Zero any**: Em TypeScript, defina interfaces explícitas para todas as props e retornos de funções.
