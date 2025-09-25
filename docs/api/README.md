# API EnsaioNuvens

## Endpoints Planejados

### Autenticação
- `POST /api/auth/register` - Registrar novo usuário
- `POST /api/auth/login` - Fazer login
- `POST /api/auth/logout` - Fazer logout

### Bandas
- `GET /api/bandas` - Listar todas as bandas
- `GET /api/bandas/:id` - Obter detalhes de uma banda
- `POST /api/bandas` - Criar nova banda
- `PUT /api/bandas/:id` - Atualizar banda
- `DELETE /api/bandas/:id` - Excluir banda

### Músicos
- `GET /api/musicos` - Listar todos os músicos
- `GET /api/musicos/:id` - Obter detalhes de um músico
- `POST /api/musicos` - Criar novo músico
- `PUT /api/musicos/:id` - Atualizar músico
- `DELETE /api/musicos/:id` - Excluir músico

### Músicas
- `GET /api/musicas` - Listar todas as músicas
- `GET /api/musicas/:id` - Obter detalhes de uma música
- `POST /api/musicas` - Criar nova música
- `PUT /api/musicas/:id` - Atualizar música
- `DELETE /api/musicas/:id` - Excluir música

## Tecnologias
- Node.js
- Express.js
- MySQL
- JWT para autenticação
- bcrypt para hash de senhas
