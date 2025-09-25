# Backend - EnsaioNuvens

## 📋 Sobre

Backend da aplicação EnsaioNuvens - **ESTRUTURA PREPARATÓRIA** para implementação futura da API REST.

**⚠️ Status Atual:** Apenas estrutura de pastas criada. Sem implementação ativa.

## 🚀 Tecnologias Planejadas

- **Node.js** - Runtime JavaScript
- **Express.js** - Framework web
- **TypeScript** - Tipagem estática
- **MySQL** - Banco de dados relacional
- **JWT** - Autenticação e autorização
- **bcrypt** - Hash de senhas
- **Joi** - Validação de dados
- **Jest** - Testes automatizados

## 🔄 Status do Desenvolvimento

**ATUALMENTE NÃO IMPLEMENTADO** - Foco está no frontend com mocks.

### Quando implementar:
1. **Instale as dependências:**
```bash
npm install
```

2. **Configure as variáveis de ambiente:**
```bash
cp .env.example .env
# Edite o arquivo .env com suas configurações
```

3. **Execute o servidor de desenvolvimento:**
```bash
npm run dev
```

## 📁 Estrutura Criada

```
backend/
├── src/
│   ├── config/          # Configurações (vazio)
│   ├── controllers/     # Controladores (vazio)
│   ├── middlewares/     # Middlewares (vazio)
│   ├── models/          # Modelos do banco (vazio)
│   ├── routes/          # Rotas da API (vazio)
│   └── services/        # Lógica de negócios (vazio)
└── package.json         # Dependências básicas
```

## 🚨 Importante

- **NÃO está rodando** - Apenas estrutura preparada
- **NÃO interfere** no desenvolvimento do frontend
- **Pronto para implementação** quando necessário

---

**🔄 Esta é apenas uma estrutura preparatória. O desenvolvimento atual está focado no frontend com mocks.**
http://localhost:8000
```

## 📦 Scripts Disponíveis

```bash
npm run dev          # Servidor de desenvolvimento
npm run build        # Build de produção
npm run start        # Servidor de produção
npm run db:migrate   # Executa migrações
npm run db:seed      # Popula banco com dados iniciais
npm run db:reset     # Reseta banco e executa migrações
npm run test         # Testes automatizados
npm run test:watch   # Testes em modo watch
npm run lint         # Linting
```

## 📁 Estrutura

```
backend/
├── src/
│   ├── controllers/  # Controllers da API
│   ├── models/       # Modelos Prisma
│   ├── routes/       # Rotas da API
│   ├── middleware/   # Middlewares (auth, validation, etc.)
│   ├── services/     # Lógica de negócio
│   ├── utils/        # Utilitários
│   ├── config/       # Configurações (database, auth, etc.)
│   └── types/        # Tipos TypeScript
├── tests/            # Testes automatizados
├── prisma/           # Schema e migrações do Prisma
├── package.json      # Dependências
├── tsconfig.json     # Configuração TypeScript
└── README.md         # Esta documentação
```

## 🔧 Configuração

### Variáveis de Ambiente

Crie um arquivo `.env` na raiz:

```env
# Servidor
PORT=8000
NODE_ENV=development

# Banco de Dados
DATABASE_URL=postgresql://username:password@localhost:5432/ensaio_nuvens

# Autenticação
JWT_SECRET=your-super-secret-jwt-key-here
JWT_EXPIRES_IN=24h

# Redis (opcional)
REDIS_URL=redis://localhost:6379

# Email (para futuras funcionalidades)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
```

## 📊 Endpoints da API

### Autenticação
- `POST /api/auth/login` - Login de usuário
- `POST /api/auth/register` - Registro de usuário
- `POST /api/auth/refresh` - Refresh token

### Bandas
- `GET /api/bandas` - Listar bandas
- `GET /api/bandas/:id` - Detalhes da banda
- `POST /api/bandas` - Criar banda
- `PUT /api/bandas/:id` - Atualizar banda
- `DELETE /api/bandas/:id` - Excluir banda

### Músicos
- `GET /api/musicos` - Listar músicos
- `GET /api/musicos/:id` - Detalhes do músico
- `POST /api/musicos` - Criar músico
- `PUT /api/musicos/:id` - Atualizar músico
- `DELETE /api/musicos/:id` - Excluir músico

### Músicas
- `GET /api/musicas` - Listar músicas
- `GET /api/musicas/:id` - Detalhes da música
- `POST /api/musicas` - Criar música
- `PUT /api/musicas/:id` - Atualizar música
- `DELETE /api/musicas/:id` - Excluir música

## 🗄️ Banco de Dados

### Schema Principal

```sql
-- Usuários
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  name VARCHAR(255) NOT NULL,
  role VARCHAR(50) DEFAULT 'user',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Bandas
CREATE TABLE bandas (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(255) NOT NULL,
  nome_artistico VARCHAR(255),
  descricao TEXT,
  telefone VARCHAR(20),
  email VARCHAR(255),
  cnpj VARCHAR(20),
  ativa BOOLEAN DEFAULT true,
  fundacao DATE,
  user_id INTEGER REFERENCES users(id),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Músicos
CREATE TABLE musicos (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(255) NOT NULL,
  email VARCHAR(255),
  telefone VARCHAR(20),
  instrumento VARCHAR(100),
  banda_id INTEGER REFERENCES bandas(id),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Músicas
CREATE TABLE musicas (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(255) NOT NULL,
  artista VARCHAR(255),
  duracao INTERVAL,
  banda_id INTEGER REFERENCES bandas(id),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

## 🧪 Testes

### Executar Testes
```bash
npm run test
```

### Cobertura de Testes
```bash
npm run test:coverage
```

## 🚢 Deploy

### Build de Produção
```bash
npm run build
npm run start
```

### Docker
```bash
docker build -t ensaio-nuvens-backend .
docker run -p 8000:8000 ensaio-nuvens-backend
```

## 🔐 Segurança

- ✅ **JWT Authentication** - Tokens seguros
- ✅ **Password Hashing** - bcrypt para senhas
- ✅ **Rate Limiting** - Proteção contra ataques
- ✅ **CORS** - Configuração segura
- ✅ **Input Validation** - Joi schemas
- ✅ **SQL Injection Protection** - Prisma ORM
- ✅ **Environment Variables** - Configurações seguras

## 📚 Documentação da API

Acesse a documentação interativa da API em:
```
http://localhost:8000/api-docs
```

---

**API Backend para EnsaioNuvens**
