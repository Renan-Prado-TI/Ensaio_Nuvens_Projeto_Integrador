export interface DadosPessoais {
  nomeCompleto: string;
  cpf: string;
  dataNascimento: string;
  telefone: string;
}

export interface Endereco {
  cep: string;
  tipoLogradouro: string;
  logradouro: string;
  numero: string;
  complemento: string;
  bairro: string;
  cidade: string;
  estado: string;
}

export interface Credenciais {
  email: string;
  senha: string;
  confirmarSenha: string;
  tipoUsuario: ('musico' | 'gestor')[];
}

export interface Instrumento {
  id: number;
  nome: string;
  prioridade: number; // 1-5 estrelas
}

export interface DadosMusico {
  instrumentos: Instrumento[];
}

export interface DadosGestor {
  nomeBanda: string;
  telefone: string;
  descricao: string;
  cnpj?: string;
}

export interface CadastroFormData {
  dadosPessoais: DadosPessoais;
  endereco: Endereco;
  credenciais: Credenciais;
  dadosMusico?: DadosMusico;
  dadosGestor?: DadosGestor;
}
