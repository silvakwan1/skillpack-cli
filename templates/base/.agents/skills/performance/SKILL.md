---
name: performance
description: |
  Skill de otimização de performance. Contém boas práticas para profiling, bundle size,
  queries de banco de dados, caching, lazy loading e Core Web Vitals.
  Use para auditar e otimizar a performance do código antes de deploy.
---

# Skill Performance — Otimização de Performance

## 📊 Abordagem: Medir Antes de Otimizar

> **Regra de Ouro**: Nunca otimize sem medir primeiro. Otimização prematura é a raiz de todo mal.

### Workflow de Performance:
1. **Medir** — Identificar gargalos com profiling.
2. **Analisar** — Entender a causa raiz.
3. **Otimizar** — Aplicar correção cirúrgica.
4. **Validar** — Medir novamente para confirmar melhoria.

---

## 🌐 Web Performance (Core Web Vitals)

### Métricas Alvo:
| Métrica | Bom | Precisa Melhorar | Ruim |
|---------|-----|-------------------|------|
| **LCP** (Largest Contentful Paint) | ≤ 2.5s | ≤ 4.0s | > 4.0s |
| **INP** (Interaction to Next Paint) | ≤ 200ms | ≤ 500ms | > 500ms |
| **CLS** (Cumulative Layout Shift) | ≤ 0.1 | ≤ 0.25 | > 0.25 |

### Checklist de Web Performance:
- [ ] Imagens otimizadas (WebP/AVIF, lazy loading, `width`/`height` definidos).
- [ ] Fontes com `font-display: swap` e preload.
- [ ] CSS crítico inline, CSS não crítico assíncrono.
- [ ] JavaScript com code splitting (dynamic import).
- [ ] Sem third-party scripts bloqueantes.
- [ ] Compressão habilitada (gzip/brotli).

---

## 📦 Bundle Size

### Checklist:
- [ ] Sem dependências desnecessárias (`lodash` inteiro vs. `lodash-es` ou funções nativas).
- [ ] Tree shaking habilitado (imports nomeados, não default de pacotes grandes).
- [ ] Dynamic imports para componentes pesados (editores, gráficos, mapas).
- [ ] Sem imports circulares.
- [ ] Analisar com `webpack-bundle-analyzer` ou equivalente.

```ts
// ✅ Bom — Import específico
import { debounce } from "lodash-es";

// ❌ Ruim — Import inteiro
import _ from "lodash";
const debounced = _.debounce(fn, 300);

// ✅ Bom — Dynamic import
const HeavyEditor = dynamic(() => import("@/components/HeavyEditor"), {
  loading: () => <Skeleton />,
  ssr: false,
});
```

---

## 🗄️ Queries e Banco de Dados

### Checklist:
- [ ] **N+1 Queries**: Usar `include`/`join` em vez de queries em loop.
- [ ] **Índices**: Colunas usadas em WHERE, ORDER BY e JOIN devem ter índice.
- [ ] **SELECT específico**: Não usar `SELECT *`, selecionar apenas colunas necessárias.
- [ ] **Paginação**: Sempre paginar resultados de listagem (cursor ou offset).
- [ ] **Connection pooling**: Reutilizar conexões de banco.

```ts
// ✅ Bom — Include (evita N+1)
const posts = await db.post.findMany({
  include: { author: true, comments: { take: 5 } },
  take: 20,
});

// ❌ Ruim — N+1 Query
const posts = await db.post.findMany({ take: 20 });
for (const post of posts) {
  post.author = await db.user.findUnique({ where: { id: post.authorId } });
}
```

---

## ⚡ Caching

### Estratégias:
| Tipo | Uso | Exemplo |
|------|-----|---------|
| **HTTP Cache** | Assets estáticos | `Cache-Control: public, max-age=31536000` |
| **CDN Cache** | Páginas e APIs | Vercel Edge, Cloudflare |
| **In-Memory Cache** | Dados frequentes | Redis, Memcached, `Map()` |
| **Stale-While-Revalidate** | Dados semi-estáticos | Next.js ISR, SWR/React Query |

### Checklist:
- [ ] Assets estáticos com cache longo (1 ano) + hash no filename.
- [ ] APIs com `Cache-Control` e `stale-while-revalidate`.
- [ ] React Query/SWR para cache client-side de dados da API.
- [ ] Server-side: `cache()` do React para deduplicar requests.
- [ ] Invalidação de cache após mutações.

---

## ⚛️ Performance React

### Checklist:
- [ ] **Memoização**: `React.memo` para componentes com props estáveis.
- [ ] **useCallback**: Para funções passadas como props.
- [ ] **useMemo**: Para cálculos pesados.
- [ ] **Keys estáveis**: IDs do banco, nunca `index` em listas dinâmicas.
- [ ] **Sem estado redundante**: Derivar valores quando possível.
- [ ] **Virtualização**: Para listas grandes (> 100 itens), usar `react-window` ou equivalente.

```tsx
// ✅ Bom — Derivar valor
const fullName = `${user.firstName} ${user.lastName}`;

// ❌ Ruim — Estado redundante
const [fullName, setFullName] = useState("");
useEffect(() => {
  setFullName(`${user.firstName} ${user.lastName}`);
}, [user]);
```

---

## 🐍 Performance Python

### Checklist:
- [ ] **Vetorização**: Usar operações NumPy/Pandas vetorizadas em vez de loops `for`.
- [ ] **Generators**: Para processamento de grandes volumes de dados.
- [ ] **Profiling**: Usar `cProfile` ou `line_profiler` para identificar gargalos.
- [ ] **Multiprocessing**: Para tarefas CPU-bound, usar `multiprocessing` ou `concurrent.futures`.

---

## 🔧 Ferramentas de Profiling

| Ferramenta | Stack | Uso |
|------------|-------|-----|
| Chrome DevTools (Performance tab) | Web | Profiling de rendering e scripting |
| Lighthouse | Web | Core Web Vitals e métricas gerais |
| `webpack-bundle-analyzer` | Webpack/Next.js | Análise de bundle size |
| `React Profiler` | React | Identificar re-renders |
| `cProfile` | Python | Profiling de CPU |
| `EXPLAIN ANALYZE` | SQL | Análise de queries |

---

## ⚠️ Regras Invioláveis

1. **NUNCA** otimizar sem medir primeiro
2. **SEMPRE** verificar N+1 queries em operações de listagem
3. **NUNCA** usar `SELECT *` em queries de produção
4. **SEMPRE** paginar resultados de listagem
5. **SEMPRE** usar lazy loading para imagens e componentes pesados
6. **NUNCA** carregar bibliotecas inteiras quando um import específico resolve
