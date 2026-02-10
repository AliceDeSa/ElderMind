# 🧠 ElderMind Finance

> Gestão financeira inteligente e acessível para idosos

[![PWA](https://img.shields.io/badge/PWA-Enabled-purple)](https://web.dev/progressive-web-apps/)
[![i18n](https://img.shields.io/badge/i18n-pt--BR%20%7C%20en--US-blue)](https://www.i18next.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-Enabled-blue)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-7.3.0-646CFF)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/React-18-61DAFB)](https://react.dev/)

## 📱 Sobre o Projeto

ElderMind Finance é uma aplicação web progressiva (PWA) de gestão financeira desenvolvida especialmente para o público idoso, com foco em **simplicidade**, **acessibilidade** e **educação financeira**.

### ✨ Principais Funcionalidades

- 💰 **Gestão de Receitas e Despesas** - Controle completo de entradas e saídas
- 🎯 **Metas Financeiras** - Defina e acompanhe objetivos de economia
- 💳 **Cartões de Crédito** - Monitore limites e gastos
- 📊 **Dashboard Intuitivo** - Visualize sua situação financeira
- 🧮 **Calculadora Financeira** - Simule investimentos e empréstimos
- 📚 **Educação Financeira** - Aprenda com aulas e quizzes interativos
- 🌐 **Multi-idioma** - Português (pt-BR) e Inglês (en-US)
- 📱 **PWA Instalável** - Funciona offline como app nativo
- 🎨 **Design Acessível** - Interface clara e fácil de usar

## 🏗️ Arquitetura

### Stack Tecnológico

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite 7.3.0
- **Styling**: Tailwind CSS
- **Charts**: Recharts
- **Backend**: Supabase (BaaS)
- **i18n**: react-i18next
- **PWA**: vite-plugin-pwa + Workbox
- **Icons**: Lucide React

### Estrutura do Projeto

```
src/
├── core/               # Fundação arquitetural
│   ├── Logger.ts       # Sistema de logging
│   ├── EventBus.ts     # Pub/sub para comunicação
│   └── constants.ts    # Constantes centralizadas
├── components/         # Componentes reutilizáveis
│   ├── Button.tsx
│   ├── Input.tsx
│   ├── LanguageSelector.tsx
│   ├── PWAUpdatePrompt.tsx
│   └── PWAInstallPrompt.tsx
├── pages/              # Páginas da aplicação
│   ├── Dashboard/      # Dashboard modularizado
│   ├── Calculator/     # Calculadora modularizada
│   ├── Education/      # Educação modularizada
│   ├── Login.tsx
│   ├── Register.tsx
│   └── ...
├── context/            # Contexts do React
│   ├── AuthContext.jsx
│   └── FinanceProvider.jsx
├── hooks/              # Custom hooks
│   ├── useCalculator.ts
│   └── useDashboardData.ts
├── i18n/               # Internacionalização
│   ├── config.ts
│   └── locales/
│       ├── pt-BR/      # Traduções português
│       └── en-US/      # Traduções inglês
└── layouts/            # Layouts
    └── DashboardLayout.jsx
```

## 🚀 Começando

### Pré-requisitos

- Node.js 18+ 
- npm ou yarn

### Instalação

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/ElderMind.git

# Entre no diretório
cd ElderMind/finance-app

# Instale as dependências
npm install

# Configure as variáveis de ambiente
cp .env.example .env
# Edite .env com suas credenciais Supabase
```

### Desenvolvimento

```bash
# Inicie o servidor de desenvolvimento
npm run dev

# Acesse http://localhost:5173/ElderMind
```

### Build de Produção

```bash
# Gere o build otimizado
npm run build

# Preview do build
npm run preview
```

## 🌐 Internacionalização (i18n)

A aplicação suporta múltiplos idiomas através do react-i18next:

- 🇧🇷 **Português (pt-BR)** - Idioma padrão
- 🇺🇸 **Inglês (en-US)**

### Adicionar Novo Idioma

1. Crie pasta em `src/i18n/locales/[codigo-idioma]/`
2. Copie estrutura de `pt-BR/` ou `en-US/`
3. Traduza os arquivos JSON
4. Adicione idioma em `src/i18n/config.ts`

### Usar Traduções

```typescript
import { useTranslation } from 'react-i18next';

function MyComponent() {
  const { t } = useTranslation('namespace');
  return <p>{t('key')}</p>;
}
```

## 📱 Progressive Web App (PWA)

A aplicação é um PWA completo com:

- ✅ **Instalável** - Adicione à tela inicial
- ✅ **Offline** - Funciona sem internet (assets estáticos)
- ✅ **Cache Inteligente** - Performance otimizada
- ✅ **Auto-Update** - Atualizações automáticas
- ✅ **Manifest** - Configuração completa

### Instalar o App

1. Abra a aplicação no Chrome/Edge
2. Clique no ícone de instalação (+) na barra de endereços
3. Ou use o prompt de instalação que aparece na tela

### Service Worker

O service worker é gerado automaticamente pelo Workbox e inclui:

- **Precache**: HTML, CSS, JS, fontes, ícones
- **Runtime Cache**: 
  - Google Fonts (CacheFirst, 1 ano)
  - Supabase API (NetworkFirst, 5 min)

## 🎨 Design System

### Cores Principais

- **Primary**: `#8b5cf6` (Purple)
- **Background**: `#0f0a1f` (Dark)
- **Surface**: `#1e1b4b` (Card)
- **Text**: `#ffffff` (White)
- **Secondary**: `#94a3b8` (Gray)

### Componentes Base

- `Button` - Botões com variantes (primary, secondary, danger)
- `Input` - Inputs com labels e ícones
- `CarouselCard` - Cards com carousel
- `MonthSelector` - Seletor de mês

## 📊 Funcionalidades Detalhadas

### Dashboard
- Cards de resumo (receita, gastos, metas, cartões)
- Gráfico anual (gastos por cartão ou lucro mensal)
- Gastos por categoria
- Metas em foco

### Receitas e Despesas
- Adicionar/editar/excluir transações
- Categorização automática
- Filtros por data e categoria
- Drag & drop para reordenar

### Metas Financeiras
- Criar metas com valor alvo
- Acompanhar progresso
- Visualização em cards e gráficos

### Calculadora Financeira
- Simulação de investimentos
- Cálculo de empréstimos
- Juros compostos
- Slider interativo

### Educação Financeira
- Aulas sobre conceitos financeiros
- Quizzes interativos
- Estatísticas de progresso
- Gamificação

## 🔒 Autenticação

A aplicação usa Supabase Auth com suporte a:

- 📧 **Email/Senha** - Registro e login tradicional
- 🔐 **Google OAuth** - Login com Google
- 🔑 **Recuperação de Senha** - Reset via email

## 🧪 Testes

```bash
# Rodar testes (quando implementados)
npm test

# Verificar TypeScript
npx tsc --noEmit

# Lint
npm run lint
```

## 📈 Performance

- **Build Size**: ~1.06 MB (gzipped: ~313 KB)
- **Lighthouse Score**: 
  - Performance: 90+
  - Accessibility: 90+
  - Best Practices: 90+
  - PWA: 90+

## 🤝 Contribuindo

Contribuições são bem-vindas! Por favor:

1. Fork o projeto
2. Crie uma branch (`git checkout -b feature/NovaFuncionalidade`)
3. Commit suas mudanças (`git commit -m 'Add: Nova funcionalidade'`)
4. Push para a branch (`git push origin feature/NovaFuncionalidade`)
5. Abra um Pull Request

## 📝 Changelog

Veja [CHANGELOG.md](./CHANGELOG.md) para histórico de mudanças.

## 📄 Licença

Este projeto está sob a licença MIT. Veja [LICENSE](./LICENSE) para mais detalhes.

## 👥 Autores

- **Desenvolvimento** - Refatoração completa Fases 1-4
- **Design** - Interface acessível para idosos

## 🙏 Agradecimentos

- React team pela excelente biblioteca
- Vite pela ferramenta de build rápida
- Supabase pelo BaaS completo
- Comunidade open source

---

**Versão**: 2.0.0  
**Última Atualização**: 2026-02-08

Feito com ❤️ para facilitar a vida financeira dos idosos
