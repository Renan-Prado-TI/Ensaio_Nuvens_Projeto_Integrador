export interface Usuario {
  id: string;
  nome: string;
  email: string;
  role: 'admin' | 'gestor' | 'musico';
  ativo: boolean;
  criadoEm: Date;
}
