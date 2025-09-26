# 🎵 EnsaioNuvens - Sistema de Gestão de Bandas

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js CI](https://github.com/seu-usuario/ensaio-nuvens/actions/workflows/node.js.yml/badge.svg)](https://github.com/seu-usuario/ensaio-nuvens/actions)

Sistema completo para gestão de bandas e orquestras, facilitando o gerenciamento de músicos, partituras, ensaios e apresentações.

## ✨ Funcionalidades Implementadas

### 🎸 CRUD de Bandas

#### Visão Geral
Implementação completa do CRUD (Create, Read, Update, Delete) para o gerenciamento de bandas no painel do gestor, com interface intuitiva e responsiva.

#### Funcionalidades

- **Listagem de Bandas**
  - Visualização em grid e lista
  - Ordenação por nome e data de criação
  - Pesquisa por nome
  - Paginação de resultados

- **Cadastro de Nova Banda**
  - Formulário multi-etapas
  - Validação de campos obrigatórios
  - Upload de foto de perfil
  - Cadastro de endereço com busca por CEP
  - Gerenciamento de redes sociais

- **Edição de Banda**
  - Carregamento dos dados existentes
  - Atualização parcial dos campos
  - Visualização em tempo real das alterações
  - Feedback visual das alterações salvas

- **Visualização de Detalhes**
  - Informações completas da banda
  - Lista de músicos e instrumentos
  - Histórico de eventos
  - Galeria de fotos

- **Exclusão de Banda**
  - Confirmação em múltiplas etapas
  - Feedback visual durante o processo
  - Tratamento de erros

#### Melhorias Recentes
- Inicialização correta da quantidade de músicos como 0 para novas bandas
- Ajuste no alinhamento dos ícones de contadores nos cards
- Melhor tratamento de valores nulos/indefinidos
- Consistência visual entre os modos de visualização

## 🚀 Começando

### Pré-requisitos

- Node.js 18+
- npm 9+
- MySQL 8.0+ (para desenvolvimento local)

### 📦 Instalação

1. **Clone o repositório**
   ```bash
   git clone https://github.com/seu-usuario/ensaio-nuvens.git
   cd ensaio-nuvens
   ```

2. **Instale as dependências**
   ```bash
   # Instala dependências do frontend e backend
   npm install
   
   # Ou instale individualmente
   cd frontend && npm install
   cd ../backend && npm install
   ```

## 🏗️ Estrutura do Projeto

```
ensaio-nuvens/
├── frontend/          # Aplicação React/TypeScript (Vite)
│   ├── src/
│   │   ├── components/  # Componentes reutilizáveis
│   │   ├── features/    # Funcionalidades organizadas
│   │   ├── layouts/     # Layouts da aplicação
│   │   └── styles/      # Estilos globais
│   └── package.json
│
├── backend/           # API Node.js/Express
│   ├── src/
│   │   ├── controllers/
│   │   ├── models/
│   │   └── routes/
│   └── package.json
│
├── database/          # Scripts e migrações do banco de dados
├── docs/              # Documentação do projeto
└── package.json       # Configuração do workspace
```

## 🚦 Executando o Projeto

### Desenvolvimento

```bash
# Iniciar frontend e backend em modo de desenvolvimento
npm run dev

# Ou inicie individualmente
npm run dev:frontend
npm run dev:backend
```

### Produção

```bash
# Construir para produção
npm run build

# Iniciar em produção
npm start
```

## 🛠️ Tecnologias Utilizadas

### Frontend
- React 18
- TypeScript
- Vite
- Tailwind CSS
- React Router
- Framer Motion (animações)
- Axios (requisições HTTP)

### Backend
- Node.js
- Express
- TypeScript
- MySQL
- JWT (autenticação)

## 📄 Licença

Este projeto está licenciado sob a licença MIT - veja o arquivo [LICENSE](LICENSE) para detalhes.

---

Desenvolvido por [Sua Equipe] - [seu-email@exemplo.com]
**Status atual:** 🔄 Estrutura preparada

### Banco de Dados

O banco de dados é o MySQL, que armazena os dados do sistema.

**Status atual:** 🔄 Schema definido

### Documentação

A documentação do sistema inclui especificações da API, esquemas do banco e guias de desenvolvimento.

**Status atual:** ✅ Documentação inicial criada
