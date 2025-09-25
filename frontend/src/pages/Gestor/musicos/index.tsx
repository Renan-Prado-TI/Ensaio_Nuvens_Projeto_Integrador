import { useState } from 'react';
import { Link } from 'react-router-dom';

interface Musico {
  id: string;
  nome: string;
  email: string;
  instrumentos: string[];
  status: 'ativo' | 'pendente' | 'inativo';
  ultimoAcesso: string;
  banda: {
    id: string;
    nome: string;
  };
}

export const MusicosPage = () => {
  const [filtroStatus, setFiltroStatus] = useState<string>('todos');
  
  // Dados de exemplo - serão substituídos por dados reais posteriormente
  const musicos: Musico[] = [
    {
      id: '1',
      nome: 'João Silva',
      email: 'joao@example.com',
      instrumentos: ['Guitarra', 'Vocal'],
      status: 'ativo',
      ultimoAcesso: 'Hoje',
      banda: {
        id: '1',
        nome: 'Banda de Rock'
      }
    },
    {
      id: '2',
      nome: 'Maria Santos',
      email: 'maria@example.com',
      instrumentos: ['Bateria'],
      status: 'pendente',
      ultimoAcesso: 'Nunca',
      banda: {
        id: '1',
        nome: 'Banda de Rock'
      }
    },
    {
      id: '3',
      nome: 'Carlos Oliveira',
      email: 'carlos@example.com',
      instrumentos: ['Baixo', 'Violão'],
      status: 'ativo',
      ultimoAcesso: '2 dias atrás',
      banda: {
        id: '2',
        nome: 'Banda de Jazz'
      }
    }
  ];

  // Filtrar músicos por status
  const musicosFiltrados = filtroStatus === 'todos' 
    ? musicos 
    : musicos.filter(musico => musico.status === filtroStatus);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'ativo':
        return 'bg-green-100 text-green-800';
      case 'pendente':
        return 'bg-yellow-100 text-yellow-800';
      case 'inativo':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div>
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-xl font-semibold text-gray-900">Músicos</h1>
          <p className="mt-2 text-sm text-gray-700">
            Gerencie os músicos das suas bandas e solicitações de participação.
          </p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <Link
            to="/gestor/musicos/novo"
            className="inline-flex items-center justify-center rounded-md border border-transparent bg-primary-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 sm:w-auto"
          >
            Adicionar Músico
          </Link>
        </div>
      </div>

      {/* Filtros */}
      <div className="mt-6">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <div className="flex space-x-2">
              <select
                id="filtro-status"
                name="filtro-status"
                className="block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm"
                value={filtroStatus}
                onChange={(e) => setFiltroStatus(e.target.value)}
              >
                <option value="todos">Todos os status</option>
                <option value="ativo">Ativos</option>
                <option value="pendente">Pendentes</option>
                <option value="inativo">Inativos</option>
              </select>
              
              <input
                type="text"
                name="busca"
                id="busca"
                placeholder="Buscar músico..."
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Lista de Músicos */}
      <div className="mt-8 flex flex-col">
        <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                      Nome
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Instrumentos
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Banda
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Status
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Último Acesso
                    </th>
                    <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                      <span className="sr-only">Ações</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {musicosFiltrados.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="px-3 py-4 text-sm text-gray-500 text-center">
                        Nenhum músico encontrado com os filtros selecionados.
                      </td>
                    </tr>
                  ) : (
                    musicosFiltrados.map((musico) => (
                      <tr key={musico.id}>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                          <div className="flex items-center">
                            <div className="h-10 w-10 flex-shrink-0">
                              <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-600">
                                {musico.nome.charAt(0)}
                              </div>
                            </div>
                            <div className="ml-4">
                              <div className="font-medium text-gray-900">{musico.nome}</div>
                              <div className="text-gray-500">{musico.email}</div>
                            </div>
                          </div>
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          <div className="flex flex-wrap gap-1">
                            {musico.instrumentos.map((instrumento) => (
                              <span
                                key={instrumento}
                                className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800"
                              >
                                {instrumento}
                              </span>
                            ))}
                          </div>
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {musico.banda.nome}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm">
                          <span
                            className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${getStatusBadge(
                              musico.status
                            )}`}
                          >
                            {musico.status.charAt(0).toUpperCase() + musico.status.slice(1)}
                          </span>
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {musico.ultimoAcesso}
                        </td>
                        <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                          <div className="flex space-x-2">
                            <Link
                              to={`/gestor/musicos/${musico.id}`}
                              className="text-primary-600 hover:text-primary-900"
                            >
                              Ver
                            </Link>
                            {musico.status === 'pendente' && (
                              <>
                                <button className="text-green-600 hover:text-green-900">
                                  Aprovar
                                </button>
                                <button className="text-red-600 hover:text-red-900">
                                  Recusar
                                </button>
                              </>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
            
            {/* Paginação */}
            <div className="mt-4 flex items-center justify-between">
              <div className="text-sm text-gray-500">
                Mostrando <span className="font-medium">1</span> a <span className="font-medium">{musicosFiltrados.length}</span> de{' '}
                <span className="font-medium">{musicosFiltrados.length}</span> músicos
              </div>
              <nav className="flex space-x-2" aria-label="Pagination">
                <button
                  disabled
                  className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Anterior
                </button>
                <button
                  disabled
                  className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Próximo
                </button>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MusicosPage;
