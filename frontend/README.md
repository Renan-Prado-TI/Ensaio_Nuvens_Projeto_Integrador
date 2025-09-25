# 🎵 EnsaioNuvens - Plataforma de Gestão Musical

## 📋 Sobre

O EnsaioNuvens é uma plataforma completa para gerenciamento de bandas, orquestras e grupos musicais. Desenvolvida com tecnologias modernas, oferece uma solução intuitiva para organização de partituras, ensaios e comunicação entre músicos.

**🚀 Status Atual:** Em desenvolvimento ativo - Versão Beta

## ✨ Destaques

- 🎼 Gerenciamento completo de partituras
- 👥 Controle de membros e permissões
- 📅 Agenda de ensaios e eventos
- 🎧 Áudio player integrado
- 📱 Design responsivo para todos os dispositivos

## 🛠️ Tecnologias

- **Frontend**
  - React 18 + TypeScript
  - Vite 4+ (Build tool ultra-rápido)
  - Tailwind CSS 3+ (Estilização)
  - React Router 6 (Navegação)
  - React Hook Form + Zod (Formulários)
  - Headless UI (Componentes acessíveis)
  - Hero Icons (Biblioteca de ícones)

- **Ferramentas**
  - ESLint + Prettier (Padronização de código)
  - Husky (Git hooks)
  - Vitest (Testes unitários)

## 🚀 Começando

### Pré-requisitos

- Node.js 18+ (Recomendado: LTS mais recente)
- npm 9+ ou yarn 1.22+
- Git

### Instalação

1. **Clone o repositório**
```bash
git clone https://github.com/seu-usuario/EnsaioNuvens.git
cd EnsaioNuvens/frontend
```

2. **Instale as dependências**
```bash
npm install
# ou
yarn
```

3. **Configure as variáveis de ambiente**
Crie um arquivo `.env` na raiz do frontend:
```env
VITE_API_URL=http://localhost:8000
VITE_APP_NAME=EnsaioNuvens
```

4. **Inicie o servidor de desenvolvimento**
```bash
npm run dev
# ou
yarn dev
```

5. **Acesse a aplicação**
Abrir [http://localhost:3000](http://localhost:3000) no seu navegador.

## 📦 Scripts Úteis

```bash
# Desenvolvimento
npm run dev       # Inicia o servidor de desenvolvimento

# Build
npm run build     # Cria a build de produção
npm run preview   # Previa a build de produção localmente

# Qualidade de Código
npm run lint      # Executa o linter
npm run format    # Formata o código com Prettier
npm run type-check # Verifica tipos TypeScript

# Testes
npm test         # Executa os testes
```

## 🏗️ Estrutura do Projeto

```
frontend/
├── public/               # Arquivos estáticos
├── src/
│   ├── assets/           # Imagens, fontes, etc.
│   ├── components/       # Componentes reutilizáveis
│   │   ├── ui/          # Componentes de UI básicos
│   │   └── shared/      # Componentes compartilhados
│   │
│   ├── features/         # Funcionalidades organizadas por domínio
│   │   ├── auth/        # Autenticação
│   │   ├── scores/      # Partituras
│   │   ├── members/     # Membros
│   │   └── events/      # Eventos e ensaios
│   │
│   ├── pages/           # Páginas da aplicação
│   ├── hooks/           # Custom hooks
│   ├── services/        # Serviços e APIs
│   ├── store/           # Gerenciamento de estado
│   ├── types/           # Tipos TypeScript
│   ├── utils/           # Utilitários
│   └── styles/          # Estilos globais
│
├── .env.example         # Exemplo de variáveis de ambiente
├── index.html           # Ponto de entrada HTML
├── package.json         # Dependências e scripts
├── tsconfig.json        # Configuração TypeScript
├── vite.config.ts       # Configuração Vite
└── README.md            # Esta documentação
```

## 🎨 Design System

### Cores Principais
- **Roxo Principal**: `#6A0DAD`
- **Preto**: `#000000`
- **Branco**: `#FFFFFF`
- **Prata**: `#C0C0C0`

### Tipografia
- **Família Principal**: 'Inter', sans-serif
- **Tamanhos**: Sistema de escala modular

## 🤝 Contribuindo

1. Faça um Fork do projeto
2. Crie uma Branch para sua Feature (`git checkout -b feature/AmazingFeature`)
3. Adicione suas mudanças (`git add .`)
4. Comite suas mudanças (`git commit -m 'Add some AmazingFeature'`)
5. Faça o Push da Branch (`git push origin feature/AmazingFeature`)
6. Abra um Pull Request

## 📄 Licença

Distribuído sob a licença MIT. Veja `LICENSE` para mais informações.

## 📞 Contato

Equipe de Desenvolvimento - [contato@ensalionuvens.com](mailto:contato@ensalionuvens.com)

---

<div align="center">
  Desenvolvido com ❤️ pela equipe EnsaioNuvens
</div>
npm run preview
```
