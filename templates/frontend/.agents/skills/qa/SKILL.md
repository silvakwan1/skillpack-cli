---
name: generic-frontend-qa
description: |
  Skill de Quality Assurance para Frontend. Checklist completo para auditoria visual, responsividade,
  acessibilidade, SEO, performance de renderização e linting de código.
---

# Skill Frontend QA — Checklist de Qualidade

## ♿ Checklist de Acessibilidade (a11y)
- [ ] Todas as imagens possuem atributo `alt` descritivo.
- [ ] Elementos de clique possuem contraste mínimo de cor de 4.5:1.
- [ ] Navegação por teclado é fluida e exibe indicador visual de foco (focus outline).
- [ ] Componentes interativos possuem estados ARIA corretos.

---

## 📱 Responsividade e UI
- [ ] Testar interface em 375px (mobile), 768px (tablet) e 1280px+ (desktop).
- [ ] Sem quebras de layout ou textos sobrepostos em nenhuma resolução.
- [ ] Imagens mantêm o aspect ratio correto (`object-fit: cover` ou `contain`).
- [ ] Formulários cabem perfeitamente na tela do celular sem overflow horizontal.

---

## 🔍 SEO e Qualidade do Código
- [ ] Apenas um `<h1>` por página.
- [ ] Meta tags (`title`, `description`, `og:image`) configuradas.
- [ ] Zero warnings ou errors no linter/formatter (`npm run lint`).
- [ ] Imagens otimizadas (tamanho, formato moderno como WebP/AVIF, lazy loading).
