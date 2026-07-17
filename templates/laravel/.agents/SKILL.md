# SKILL: Laravel

Skill aplicada quando o agente estiver trabalhando em código deste projeto
Laravel. Tem prioridade sobre as regras genéricas do AGENTS.md raiz.

## Convenções

- Lógica de negócio fica em Services/Actions, não em Controllers "gordos".
- Use Eloquent para queries simples; para queries complexas ou relatórios,
  prefira Query Builder ou métodos dedicados em Repository.
- Form Requests (`app/Http/Requests`) para validação, nunca validação
  inline dentro do Controller quando a regra passar de 2-3 campos.
- Migrations sempre reversíveis (implemente `down()` corretamente).
- Use Resource Classes (`JsonResource`) para formatar respostas de API,
  não retorne Models diretamente em endpoints públicos.

## Estilo

- Siga PSR-12.
- Nomeie Controllers no singular + sufixo `Controller`
  (ex: `InvoiceController`), rotas em kebab-case.
- Jobs, Events e Listeners com nomes descritivos de intenção
  (ex: `SendInvoiceEmail`, não `InvoiceJob`).

## Antes de finalizar uma tarefa

1. Rode `php artisan test` (ou `pest`, se o projeto usar Pest) antes de
   considerar a tarefa concluída.
2. Rode `./vendor/bin/pint` se o projeto tiver Laravel Pint configurado.
3. Verifique se novas rotas foram registradas no grupo de middleware
   correto (`auth`, `api`, etc.).

## Não fazer

- Não use `DB::raw` para SQL que pode ser expresso com Query Builder.
- Não coloque regras de autorização dentro do Controller — use Policies
  ou Gates.
