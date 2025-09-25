# Frontend - EnsaioNuvens

## 📋 Sobre

Frontend da aplicação EnsaioNuvens, sistema de gestão de bandas desenvolvido com React, TypeScript e Vite.

**✅ Status Atual:** Funcionando perfeitamente com mocks (dados em memória)

## 🚀 Tecnologias

- **React 18** - Biblioteca para interfaces
- **Vite** - Build tool e dev server
- **Tailwind CSS** - Framework CSS utilitário
- **React Router** - Roteamento
- **React Hook Form** - Gerenciamento de formulários
- **Zod** - Validação de schemas

---

**Desenvolvimento focado em frontend com mocks funcionais**

### Pré-requisitos
- Node.js 18+
- npm ou yarn

### Instalação e Execução

1. **Instale as dependências:**
```bash
npm install
```

2. **Execute o servidor de desenvolvimento:**
```bash
npm run dev
```

3. **Acesse a aplicação:**
```
http://localhost:3000
```

## 📦 Scripts Disponíveis

```bash
npm run dev        # Servidor de desenvolvimento
npm run build      # Build de produção
npm run preview    # Preview do build
npm run lint       # Linting
npm run type-check # Verificação de tipos TypeScript
```

## 📁 Estrutura

```
frontend/
├── public/           # Arquivos estáticos
├── src/
│   ├── components/   # Componentes reutilizáveis
│   ├── features/     # Features por domínio (bandas, músicos, etc.)
│   ├── pages/        # Páginas da aplicação
│   ├── hooks/        # Custom hooks
│   ├── services/     # Serviços e APIs
│   ├── types/        # Tipos TypeScript
│   ├── utils/        # Utilitários
│   └── styles/       # Estilos globais
├── package.json      # Dependências
├── vite.config.ts    # Configuração do Vite
└── README.md         # Esta documentação
```

## 🔧 Configuração

### Variáveis de Ambiente

Crie um arquivo `.env` na raiz:

```env
VITE_API_URL=http://localhost:8000
```

## 🎯 Funcionalidades Implementadas

- ✅ **Gestão de Bandas** - CRUD completo
- ✅ **Interface Responsiva** - Design moderno
- ✅ **Formulários Validados** - Zod + React Hook Form
- ✅ **Roteamento** - React Router
- ✅ **Componentes Reutilizáveis** - Design System
- ✅ **TypeScript** - Tipagem completa
- ✅ **API Integration** - Mock services

## 🚢 Deploy

### Build de Produção
```bash
npm run build
```

### Preview do Build
```bash
npm run preview
```
