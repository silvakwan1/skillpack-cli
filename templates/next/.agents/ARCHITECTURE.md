# Arquitetura do Projeto — Portal Anasps

## 📁 Visão Geral da Estrutura

```
portal-anasps/
├── .agents/                        # Configuração de agentes e skills de IA
│   ├── AGENTS.md                   # Regras gerais e definição de agentes
│   ├── ARCHITECTURE.md             # Este arquivo — documentação da arquitetura
│   ├── PROGRESS.md                 # Progresso de tarefas em andamento
│   └── skills/                     # Skills e agentes de IA
│       ├── frontend/               # Skill: design tokens e padrões de UI
│       ├── qa/                     # Skill: qualidade de código
│       ├── frontend-dev/           # Agente: dev frontend sênior
│       └── qa-engineer/            # Agente: QA engineer
│
├── src/                            # Código-fonte da aplicação
│   ├── app/                        # 🔵 Rotas e páginas (Next.js App Router)
│   ├── components/                 # 🟢 Componentes React
│   ├── services/                   # 🟡 Comunicação com APIs externas
│   ├── lib/                        # 🟣 Bibliotecas internas e configurações
│   ├── hooks/                      # 🔴 Custom Hooks React
│   ├── types/                      # 🟠 Definições TypeScript
│   ├── utils/                      # ⚪ Funções utilitárias puras
│   ├── constant/                   # 📌 Constantes da aplicação
│   ├── data/                       # 📦 Dados estáticos (JSON)
│   └── styles/                     # 🎨 Variáveis SCSS e animações globais
│
├── public/                         # Assets estáticos servidos diretamente
│   └── images/                     # Imagens (banners, ícones, logos)
│
├── backend/                        # Scripts/configs do backend (se aplicável)
├── scripts/                        # Scripts auxiliares de build/deploy
│
├── tailwind.config.js              # Design tokens do Tailwind
├── next.config.js                  # Configuração do Next.js
├── postcss.config.js               # Configuração do PostCSS
├── tsconfig.json                   # Configuração do TypeScript
├── package.json                    # Dependências e scripts
└── .env.local                      # Variáveis de ambiente (NÃO commitado)
```

---

## 🔵 `src/app/` — Rotas e Páginas

O diretório principal do **Next.js App Router**. Cada pasta = uma rota.

### O que vai aqui:
- **`page.tsx`** — Componente de página (obrigatório por rota)
- **`layout.tsx`** — Layout compartilhado entre rotas filhas
- **`loading.tsx`** — UI de loading (Suspense boundary)
- **`not-found.tsx`** — Página 404 customizada
- **`globals.css`** / **`globals.scss`** — Estilos globais (apenas no root)

### O que NÃO vai aqui:
- ❌ Lógica de negócio complexa (mover para `services/` ou `hooks/`)
- ❌ Componentes reutilizáveis (mover para `components/`)
- ❌ Funções utilitárias (mover para `utils/`)

### Estrutura de Rotas

```
src/app/
├── layout.tsx                  # Layout raiz (Inter font, GA, GTM, FloatingButton)
├── page.tsx                    # Homepage (Hero, News, Benefits, Entertainment)
├── globals.css                 # Tailwind base + estilos globais
├── globals.scss                # SCSS global (import de variables e keyframes)
├── not-found.tsx               # Página 404
│
├── api/                        # 🔌 API Routes (Route Handlers)
│   ├── admin/                  # Endpoints administrativos
│   ├── consultar-hapvida/      # Consulta de plano Hapvida
│   ├── consultar-conexa/       # Consulta Conexa
│   ├── contact/                # Envio de e-mail de contato
│   ├── formulario-hapvida/     # Formulário Hapvida
│   ├── formulario-reconectar/  # Formulário Reconectar
│   ├── post-hapvida/           # Dados de post Hapvida
│   ├── conteudo/               # API de conteúdo
│   ├── radio-metadata/         # Metadados da rádio
│   ├── user-notificacao/       # Notificações de usuário
│   └── verificar-associado/    # Verificação de associado
│
├── admin/                      # 🔐 Painel administrativo (protegido)
│   ├── login/                  # Autenticação
│   ├── posts/                  # CRUD de posts
│   ├── pages/                  # Page Builder
│   └── banners/                # Gerenciar banners
│
├── saude/                      # 🏥 Páginas de saúde
│   ├── page.tsx                # Hub de benefícios de saúde
│   ├── dental-hapvida/         # Plano dental Hapvida
│   ├── med-senior/             # Med Senior
│   ├── nossa-saude/            # Nossa Saúde
│   ├── notredame/              # NotreDame
│   ├── nova-saude/             # Nova Saúde
│   └── unimed-bh/              # Unimed BH
│
├── institucional/              # 🏛️ Páginas institucionais
│   ├── diretorias-estaduais/   # Mapa de diretorias
│   ├── estatuto/               # Estatuto da associação
│   └── historico/              # Histórico da Anasps
│
├── noticias/                   # 📰 Sistema de notícias
│   ├── page.tsx                # Listagem de notícias
│   ├── [slug]/                 # Detalhe de notícia (dinâmico)
│   └── rascunho/               # Preview de rascunhos
│
├── contato/                    # 📞 Formulário de contato
├── associe-se/                 # 🤝 Página de associação
├── juridico/                   # ⚖️ Assessoria jurídica
├── anasps-tv/                  # 📺 TV Anasps (vídeos YouTube)
├── radio-anasps/               # 📻 Rádio Anasps
├── publicacoes/                # 📚 Publicações
├── conteudo/                   # 📄 Conteúdo diverso
├── notas-app/                  # 📝 Aplicativo de notas
├── simuladosinss/              # 📊 Simulados INSS
├── telemedicina/               # 🩺 Telemedicina
├── reconectar/                 # 🔄 Programa Reconectar
├── politica-de-privacidade/    # 🔒 Política de privacidade
├── act/                        # 📋 ACT (Acordo Coletivo)
└── [slug]/                     # 🌐 Páginas dinâmicas (Page Builder)
```

### Padrão de uma Page

Toda page pública segue este layout:

```tsx
"use client"; // apenas se usa hooks/estado

import Header from "@/components/Header";
import PageHeader from "@/components/PageHeader";
import Footer from "@/components/Footer";

export default function NomeDaPagina() {
  return (
    <main>
      <Header />
      <PageHeader
        title="Título da Página"
        subtitle="Subtítulo opcional"
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Seção", href: "/secao" },
          { label: "Página Atual" },
        ]}
      />

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          {/* Conteúdo da página */}
        </div>
      </section>

      <Footer />
    </main>
  );
}
```

---

## 🔌 `src/app/api/` — API Routes

Route Handlers do Next.js para comunicação servidor-a-servidor.

### O que vai aqui:
- Endpoints que fazem proxy para APIs externas (Hapvida, Conexa, etc.)
- Envio de e-mails
- Operações que precisam de secrets do servidor
- Validações server-side

### O que NÃO vai aqui:
- ❌ Queries diretas ao Supabase (usar client-side com RLS)
- ❌ Lógica de UI ou componentes
- ❌ Funções utilitárias genéricas

### Estrutura padrão de um Route Handler:

```tsx
// src/app/api/nome-da-rota/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    // ... lógica
    return NextResponse.json({ data }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "mensagem" }, { status: 500 });
  }
}
```

---

## 🟢 `src/components/` — Componentes React

### Organização

```
src/components/
├── admin/                  # Componentes exclusivos do painel admin
├── common/                 # Componentes reutilizáveis genéricos
│   ├── HtmlEditor.tsx      # Editor HTML
│   └── ImageInput.tsx      # Input de imagem (upload/URL)
├── ui/                     # Componentes primitivos de UI
│   ├── Loading.tsx         # Spinner de loading
│   ├── LoadingPage.tsx     # Página inteira de loading
│   └── PostNotFound.tsx    # Estado de post não encontrado
├── page-builder/           # Editor visual drag-and-drop
├── tiptap-*/               # Extensões do editor de texto TipTap
│
├── Header.tsx              # Cabeçalho principal com mega menu
├── Footer.tsx              # Rodapé institucional
├── PageHeader.tsx          # Banner de título + breadcrumb
├── Hero.tsx                # Banner hero da homepage
├── NewsSection.tsx         # Seção de notícias
├── BenefitsSection.tsx     # Seção de benefícios
├── BeneficiosSaude.tsx     # Grid de benefícios de saúde
├── FormHapvida.tsx         # Formulário grande Hapvida
├── FormVerifyHapvida.tsx   # Verificação rápida Hapvida
├── FormReconectar.tsx      # Formulário Reconectar
├── Modalconsult.tsx        # Modal de resultado de consulta
├── SearchModal.tsx         # Modal de busca global
├── Popup.tsx               # Popup genérico
├── HomePopup.tsx           # Popup da homepage
├── Pagination.tsx          # Controle de paginação
├── SocialShare.tsx         # Botões de compartilhamento
├── RadioPlayer.tsx         # Player da rádio
├── BannerCarousel.tsx      # Carrossel de banners
├── OptimizedImage.tsx      # Imagem otimizada com lazy loading
└── ...                     # Outros componentes de seção
```

### Regras de Criação de Componentes

| Tipo | Onde colocar | Quando criar |
|------|-------------|--------------|
| **Primitivo de UI** | `components/ui/` | Botão, Input, Loading, Badge — zero lógica de negócio |
| **Componente de seção** | `components/` (raiz) | Seções da página: Hero, NewsSection, BenefitsSection |
| **Componente admin** | `components/admin/` | Formulários e tabelas do painel admin |
| **Componente comum** | `components/common/` | Reutilizáveis que combinam UI + lógica (Editor, ImageInput) |
| **Componente de página** | Inline na `page.tsx` | Lógica específica de uma única página |

### Quando reutilizar vs. criar novo:
- **Reutilizar** se o componente é usado em **2+ páginas**
- **Criar novo** se a customização exige mais de **3 props condicionais**
- **Extrair** quando uma `page.tsx` passa de **100 linhas**

---

## 🟡 `src/services/` — Comunicação com APIs

### O que vai aqui:
- Funções que chamam APIs externas (Hapvida, WordPress, Via API)
- Funções de CRUD que encapsulam chamadas ao Supabase
- Abstração de fonte de dados

### Estrutura:

```
src/services/
├── posts.ts                # CRUD de posts (Supabase)
├── wordpress.ts            # Integração com WordPress antigo
├── getConvenioAnasps.ts    # Consulta de convênios
└── getViaApiCpf.ts         # Consulta via API de CPF
```

### Regras:
- Cada service = **uma entidade ou API**
- Retornar dados tipados (nunca `any`)
- Tratar erros internamente com try/catch
- Nunca acessar `window`, `document` ou hooks React

---

## 🟣 `src/lib/` — Bibliotecas Internas

### O que vai aqui:
- Configurações de clientes (Supabase, etc.)
- Funções de infraestrutura
- Templates e schemas

### Estrutura:

```
src/lib/
├── supabase/                 # Cliente e configuração Supabase
├── api/                      # Utilitários de API internos
│   └── notaAppApi.ts         # API do aplicativo de notas
├── database.ts               # Configuração de banco
├── supabase-storage.ts       # Upload/delete no Storage
├── page-builder-templates.ts # Templates do Page Builder
└── tiptap-*.ts               # Utilitários do editor TipTap
```

### Diferença entre `lib/` e `services/`:
- **`lib/`** = infraestrutura, configs, clientes → "como conectar"
- **`services/`** = lógica de negócio, CRUD → "o que fazer com a conexão"

---

## 🔴 `src/hooks/` — Custom Hooks

### O que vai aqui:
- Hooks que encapsulam lógica de estado + efeitos
- Hooks de UI (mobile detection, click outside, etc.)
- Hooks de dados (fetch + cache de entidades)

### Estrutura:

```
src/hooks/
├── usePagination.ts                  # Lógica de paginação
├── useConteudoDiversoCategories.ts   # Categorias de conteúdo
├── useQueryConteudoDiversos.ts       # Query de conteúdo diverso
├── use-mobile.ts                     # Detecção de mobile
├── use-on-click-outside.ts           # Click fora do elemento
├── use-tiptap-editor.ts             # Hook do editor TipTap
├── use-floating-element.ts           # Elementos flutuantes
├── use-menu-navigation.ts            # Navegação de menu (keyboard)
├── use-composed-ref.ts               # Composição de refs
└── use-is-breakpoint.ts              # Detecção de breakpoint
```

### Convenção de nomes:
- `use-kebab-case.ts` — hooks genéricos de UI
- `useCamelCase.ts` — hooks de negócio/dados

---

## 🟠 `src/types/` — Definições TypeScript

### O que vai aqui:
- Interfaces e types globais
- Tipos de entidades do domínio
- Type declarations para módulos sem tipagem

### Estrutura:

```
src/types/
├── index.ts              # Types principais (Post, Banner, Category, etc.)
├── page-builder.ts       # Types do Page Builder
├── postsType.ts          # Types específicos de posts
├── utility-types.ts      # Types utilitários
├── viaApi.ts             # Types da Via API
└── style-modules.d.ts    # Declaration para SCSS modules
```

### Regras:
- Types de uma **entidade** → `types/`
- Types de **props de componente** → no próprio arquivo do componente
- Types de **resposta de API** → no arquivo do service correspondente

---

## ⚪ `src/utils/` — Funções Utilitárias

### O que vai aqui:
- Funções **puras** (sem side effects)
- Formatação, validação, transformação de dados
- Helpers que não dependem de React

### Estrutura:

```
src/utils/
├── validCPF.ts             # Validação e formatação de CPF
├── validCEP.ts             # Validação de CEP
├── validPhone.ts           # Validação de telefone
├── validData.ts            # Validação de data
├── formatDate.ts           # Formatação de datas
├── date-utils.ts           # Utilitários de data
├── url-utils.ts            # Utilitários de URL
├── array-utils.ts          # Utilitários de arrays
├── youtube.ts              # Parser de URLs do YouTube
└── translationStatus.ts    # Tradução de status
```

### Regras:
- **Sem imports** de React, hooks ou componentes
- **Sem efeitos colaterais** (sem fetch, sem localStorage)
- **Testáveis isoladamente** (input → output)
- Um arquivo = um domínio de utilidade

---

## 📌 `src/constant/` — Constantes

### O que vai aqui:
- Constantes de configuração
- Enums e mapas estáticos
- URLs de APIs externas

```
src/constant/
├── apiHapvida.ts    # URL base da API Hapvida
└── states.ts        # Lista de estados brasileiros (UF)
```

---

## 📦 `src/data/` — Dados Estáticos

### O que vai aqui:
- Dados em JSON que não mudam com frequência
- Dados mockados ou de fallback

```
src/data/
├── banners.json    # Banners padrão
├── posts.json      # Posts de fallback
└── media.json      # Links de mídia
```

---

## 🎨 `src/styles/` — Estilos Globais

### O que vai aqui:
- Variáveis CSS/SCSS globais
- Keyframes de animação
- **NÃO** componentes CSS (usar Tailwind classes)

```
src/styles/
├── _variables.scss              # Variáveis CSS (cores, radius, transitions)
└── _keyframe-animations.scss    # Animações CSS globais
```

---

## 📐 Nomenclatura de Arquivos

| Tipo | Padrão | Exemplo |
|------|--------|---------|
| Componente React | `PascalCase.tsx` | `BenefitsSection.tsx` |
| Page | `page.tsx` (fixo pelo Next.js) | `src/app/saude/page.tsx` |
| Layout | `layout.tsx` (fixo pelo Next.js) | `src/app/layout.tsx` |
| API Route | `route.ts` (fixo pelo Next.js) | `src/app/api/contact/route.ts` |
| Hook | `useCamelCase.ts` ou `use-kebab-case.ts` | `usePagination.ts` |
| Service | `camelCase.ts` | `posts.ts` |
| Util | `camelCase.ts` | `validCPF.ts` |
| Type | `camelCase.ts` | `index.ts` |
| Constante | `camelCase.ts` | `states.ts` |
| Estilo SCSS | `_kebab-case.scss` | `_variables.scss` |
| Dados JSON | `kebab-case.json` | `banners.json` |
