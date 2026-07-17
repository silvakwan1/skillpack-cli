---
name: laravel-qa
description: |
  Skill de Quality Assurance para Laravel. Checklist de testes automotivos, PHPUnit/Pest,
  Pint, Larastan e validações de segurança.
---

# Skill Laravel QA — Qualidade de Código

## 🧪 Testes Automatizados
- **PHPUnit ou Pest**: Sempre escreva testes para novas features e correções.
- **Testes de Integração (Feature Tests)**: Teste fluxos completos de requisições HTTP, autenticação, banco de dados e respostas.
- **Database Migrations nos Testes**: Use `RefreshDatabase` trait para garantir que o banco de dados seja resetado para cada caso de teste.

```php
// Exemplo com Pest
it('permite que usuários autenticados vejam a página de posts', function () {
    $user = User::factory()->create();

    $this->actingAs($user)
        ->get(route('posts.index'))
        ->assertStatus(200);
});
```

---

## 🔍 Ferramentas de Linting e Análise Estática
1. **Laravel Pint**: Execute o formatador do código antes de submeter commits.
   ```bash
   ./vendor/bin/pint
   ```
2. **Larastan (PHPStan)**: Execute para validação estática de tipos no Laravel.
   ```bash
   ./vendor/bin/phpstan analyse
   ```

---

## 🔒 Checklist de Segurança (QA)
- [ ] Rota web com CSRF habilitado.
- [ ] Injeção de dependências tipadas nos controllers e services.
- [ ] Permissões de endpoints validadas via Gates/Policies.
- [ ] Parâmetros e inputs validados via Form Request.
- [ ] Erros em produção configurados com `APP_DEBUG=false` no `.env`.
- [ ] Sem credenciais ou secrets no código-fonte.
