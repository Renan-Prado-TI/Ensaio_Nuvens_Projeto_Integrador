// Tipos para os formulários de banda
export interface DadosBandaFormulario {
  logo?: File;
  nome: string;
  nomeArtistico?: string;
  fundacao?: string;
  cnpj?: string;
  telefone: string;
  email: string;
  descricao: string;
  facebook?: string;
  instagram?: string;
  youtube?: string;
  linkedin?: string;
  tiktok?: string;
  site?: string;
  endereco: {
    cep: string;
    logradouro: string;
    numero: string;
    complemento?: string;
    bairro: string;
    cidade: string;
    estado: string;
    referencia?: string;
  };
  instrumentos?: Array<{
    id?: string;
    nome: string;
    quantidade?: number;
  }>;
}
