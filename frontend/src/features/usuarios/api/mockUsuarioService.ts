// src/features/usuarios/api/mockUsuarioService.ts
export interface Usuario {
  id: string;
  nome: string;
  email: string;
  role: 'admin' | 'gestor' | 'musico';
  ativo: boolean;
  criadoEm: Date;
}

const usuariosMock: Usuario[] = [
  {
    id: '1',
    nome: 'João Silva',
    email: 'joao@ensaionuvens.com',
    role: 'admin',
    ativo: true,
    criadoEm: new Date('2024-01-15')
  },
  {
    id: '2',
    nome: 'Maria Santos',
    email: 'maria@bandaexemplo.com',
    role: 'gestor',
    ativo: true,
    criadoEm: new Date('2024-02-20')
  }
];

export const getUsuarios = async (): Promise<Usuario[]> => {
  return new Promise(resolve => setTimeout(() => resolve([...usuariosMock]), 300));
};

export const createUsuario = async (data: Omit<Usuario, 'id' | 'criadoEm'>): Promise<Usuario> => {
  const novoUsuario = {
    ...data,
    id: Date.now().toString(),
    criadoEm: new Date()
  };
  usuariosMock.push(novoUsuario);
  return novoUsuario;
};
