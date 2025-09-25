export interface Musico {
  id: number;
  nome: string;
  instrumento: string;
  email: string;
  telefone?: string;
}

export interface EnderecoBanda {
  cep: string;
  logradouro: string;
  numero: string;
  complemento?: string;
  bairro: string;
  cidade: string;
  estado: string;
  referencia?: string;
}

export interface InstrumentoBanda {
  id: string;
  nome: string;
}

export interface MusicaBanda {
  id: string;
  nome: string;
  artista: string;
  duracao?: string;
}

export interface RedesSociais {
  facebook?: string;
  instagram?: string;
  youtube?: string;
  linkedin?: string;
  tiktok?: string;
  site?: string;
}

export interface Banda {
  id: string;
  nome: string;
  nomeArtistico?: string;
  fundacao: string; // Formato: YYYY-MM-DD
  descricao: string;
  telefone: string;
  email: string;
  cnpj?: string;
  foto?: string;
  ativa?: boolean;
  quantidadeMusicos: number;
  musicas: MusicaBanda[];
  instrumentos: InstrumentoBanda[];
  endereco: EnderecoBanda;
  redesSociais: RedesSociais;
  dataCriacao: string;
  dataAtualizacao: string;
}

// Tipos para criação/atualização
export type CriarBandaDTO = Omit<Banda, 'id' | 'musicos' | 'dataCriacao' | 'dataAtualizacao'>;
export type AtualizarBandaDTO = Partial<CriarBandaDTO>;
