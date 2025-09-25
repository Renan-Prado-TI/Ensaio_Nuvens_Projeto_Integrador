# Fluxograma do Site - Ensaio nas Nuvens

## 1. Páginas Principais


### 1.1 Home EchoTech
- Header com Nome da empresa e menu hambúrguer lateral esquerda
- Quem somos
- Sobre
- Missão
- Visão
- Valores
- Nosso time
- Contato


### 1.2 Home Ensaio nas Nuvens
- Header com logo e menu hambúrguer lateral esquerda
- Seção hero com chamada principal
- Sobre o projeto (resumo)
- Benefícios da plataforma
- Call-to-action para Login/Cadastro
- Footer com informações de contato

### 1.2 Login
- Formulário de login (email/senha)
- Link para recuperação de senha
- Botão de login com redes sociais
- Link para página de cadastro
- Botão de voltar para home

### 1.3 Cadastro
- Formulário de cadastro:
  - Nome completo
  - E-mail
  - Senha
  - Confirmação de senha
  - Tipo de usuário (Músico/Gestor)
- Termos de uso e política de privacidade
- Botão de cadastrar
- Link para página de login

## 2. Estrutura de Navegação

### 2.1 Menu Principal (Hambúrguer)
- Início
- Sobre
- Recursos
- Contato
- Login/Cadastro (antes do login)
- Perfil/Dashboard (após login)
- Sair

## 3. Elementos de UI/UX

### 3.1 Cores Principais
- Roxo Principal: #6A0DAD
- Preto: #000000
- Branco: #FFFFFF
- Prata: #C0C0C0

### 3.2 Tipografia
- Títulos: 'Montserrat', sans-serif
- Corpo do texto: 'Open Sans', sans-serif

### 3.3 Componentes
- Botões com efeito hover
- Cards com sombras suaves
- Formulários com validação em tempo real
- Menu lateral deslizante (hambúrguer)
- Loaders e feedbacks visuais

## 4. Fluxo de Navegação Inicial
1. Usuário acessa a Home Pública
2. Opção 1: Clica em Login → Página de Login
3. Opção 2: Clica em Cadastrar → Página de Cadastro
4. Após login bem-sucedido: Redireciona para Dashboard (a ser implementado)

## 5. Próximos Passos (Futuras Implementações)
- Dashboard do usuário
- Gerenciamento de perfil
- Funcionalidades específicas para Músicos
- Funcionalidades específicas para Gestores
- Upload e gerenciamento de partituras


###### CONTEUDO ORIGINAL QUE FOI CRIADO ######
# Home - Página Inicial da empresa EchoTech
- Quem somos
- Sobre
- Missão
- Visão
- Valores
- Nosso time
- Contato

# Home Projeto - Página Inicial do projeto Ensaio nas Nuvens
- Nosso Propósito
- Exemplos de ferramentas
- Contato

# Login
- Email
- Senha
- Esqueci minha senha
- Voltar para a Home
- Voltar para a Home Projeto
- Cadastro

# Cadastro
- Nome
- CPF
- Senha
- Telefone
- Email
- Endereço
- Gestor (Boolean)
- Músico (Boolean)

# Gestor
- Editar Perfil
- Gerenciamento de Musicos (Aceitar/rejeitar solicitações)
- Dashboard
- Cadastro de Bandas (CRUD)
- Cadastro de Músicas (CRUD)
- Listar bandas
- Listar músicas
- Cadastrar partituras nas músicas
- Vincular partituras aos músicos cadastrados
- Criar anotações
- Listar anotações

# Músico
- Editar Perfil
- Dashboard
- Listar Bandas
- Listar Músicas
- Listar Partituras
- Listar Anotações