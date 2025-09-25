// src/features/musicas/api/mockMusicaService.ts
export interface Musica {
  id: string;
  nome: string;
  artista: string;
  duracao: string; // "3:45"
  bandaId: string;
  genero?: string;
  ano?: number;
}

const musicasMock: Musica[] = [
  {
    id: '1',
    nome: 'Vou Festejar',
    artista: 'Beth Carvalho',
    duracao: '3:12',
    bandaId: '1',
    genero: 'Samba',
    ano: 1978
  },
  {
    id: '2',
    nome: 'Mas Que Nada',
    artista: 'Jorge Ben Jor',
    duracao: '2:58',
    bandaId: '1',
    genero: 'MPB',
    ano: 1963
  }
];

export const getMusicas = async (): Promise<Musica[]> => {
  return new Promise(resolve => setTimeout(() => resolve([...musicasMock]), 300));
};

export const getMusicasPorBanda = async (bandaId: string): Promise<Musica[]> => {
  return new Promise(resolve =>
    setTimeout(() =>
      resolve(musicasMock.filter(m => m.bandaId === bandaId)), 300
    )
  );
};
