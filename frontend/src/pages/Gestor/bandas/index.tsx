import React, { useState, useEffect, useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Plus, 
  Trash2, 
  MapPin, 
  Users, 
  Music, 
  Eye, 
  Edit,
  ChevronDown,
  List,
  Grid,
  Search,
  Phone,
  Mail
} from 'lucide-react';
import { Notification } from '@/components/ui/notification';
import { buscarBandas, deletarBanda } from '@/features/bandas/api/mockBandaService';
import { ConfirmationModal } from '@/components/ui/confirmation-modal';

// Import types
import type { Banda } from '@/features/bandas/types/banda';

interface NotificationState {
  show: boolean;
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
}

interface LocationState {
  state?: {
    message?: string;
    type?: 'success' | 'error' | 'info' | 'warning';
    showNotification?: boolean;
  };
}

export const BandasPage: React.FC = () => {
  // States
  const [bandas, setBandas] = useState<Banda[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [notification, setNotification] = useState<NotificationState | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [bandaToDelete, setBandaToDelete] = useState<{ id: string; nome: string } | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');
  const [filtroBusca, setFiltroBusca] = useState('');
  const [filtroCidade, setFiltroCidade] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const location = useLocation() as unknown as LocationState;
  
  // Memoized values
  const bandasFiltradas = useMemo(() => {
    return bandas.filter(banda => {
      const buscaMatch = !filtroBusca || 
        banda.nome.toLowerCase().includes(filtroBusca.toLowerCase()) ||
        (banda.endereco?.cidade && banda.endereco.cidade.toLowerCase().includes(filtroBusca.toLowerCase())) ||
        (banda.endereco?.estado && banda.endereco.estado.toLowerCase().includes(filtroBusca.toLowerCase()));
      
      const cidadeMatch = !filtroCidade || 
        (banda.endereco?.cidade && banda.endereco.cidade.toLowerCase() === filtroCidade.toLowerCase());
      
      return buscaMatch && cidadeMatch;
    });
  }, [bandas, filtroBusca, filtroCidade]);
  
  const totalPages = Math.ceil(bandasFiltradas.length / itemsPerPage);
  
  const paginatedBandas = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return bandasFiltradas.slice(startIndex, startIndex + itemsPerPage);
  }, [bandasFiltradas, currentPage, itemsPerPage]);
  
  const cidades = useMemo(() => {
    const cidadesUnicas = new Set<string>();
    bandas.forEach(banda => {
      if (banda.endereco?.cidade) {
        cidadesUnicas.add(banda.endereco.cidade);
      }
    });
    return Array.from(cidadesUnicas).sort();
  }, [bandas]);
  
  const dadosDashboard = useMemo(() => ({
    totalBandas: bandas.length,
    totalMusicos: bandas.reduce((sum, b) => sum + (b.quantidadeMusicos || 0), 0),
    totalMusicas: bandas.reduce((sum, b) => sum + (b.musicas?.length || 0), 0)
  }), [bandas]);

  // Load initial data
  useEffect(() => {
    const carregarBandas = async () => {
      try {
        setIsLoading(true);
        const dados = await buscarBandas();
        setBandas(dados);
      } catch (error) {
        console.error('Erro ao carregar bandas:', error);
        setNotification({
          show: true,
          message: 'Erro ao carregar as bandas. Tente novamente mais tarde.',
          type: 'error'
        });
      } finally {
        setIsLoading(false);
      }
    };

    carregarBandas();
  }, []);

  // Handle navigation notifications
  useEffect(() => {
    if (location.state?.showNotification && location.state.message) {
      setNotification({
        show: true,
        message: location.state.message,
        type: location.state.type || 'success'
      });
      
      // Clear the state to avoid showing the notification again
      window.history.replaceState({}, '');
    }
  }, [location.state]);


  // Handlers
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenDeleteModal = (id: string, nome: string) => {
    setBandaToDelete({ id, nome });
    setShowDeleteModal(true);
  };

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
    setBandaToDelete(null);
  };

  const handleConfirmDelete = async () => {
    if (!bandaToDelete) return;
    
    try {
      setDeletingId(bandaToDelete.id);
      const bandaId = parseInt(bandaToDelete.id, 10);
      const sucesso = await deletarBanda(bandaId);
      
      if (sucesso) {
        setBandas(prev => prev.filter(b => b.id !== bandaToDelete.id));
        setNotification({
          show: true,
          message: `Banda "${bandaToDelete.nome}" excluída com sucesso!`,
          type: 'success'
        });
      } else {
        throw new Error('Falha ao excluir a banda');
      }
    } catch (error) {
      console.error('Erro ao excluir banda:', error);
      setNotification({
        show: true,
        message: 'Erro ao excluir a banda. Tente novamente.',
        type: 'error'
      });
    } finally {
      setDeletingId(null);
      handleCloseDeleteModal();
    }
  };

  const limparFiltros = () => {
    setFiltroBusca('');
    setFiltroCidade('');
    setCurrentPage(1);
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Bandas</h1>
        <Link
          to="/gestor/bandas/nova"
          className="flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg transition-colors"
        >
          <Plus size={20} />
          Nova Banda
        </Link>
      </div>

      {/* Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <DashboardCard 
          title="Total de Bandas" 
          value={dadosDashboard.totalBandas.toString()} 
          icon={<Music className="text-primary-500" size={24} />}
          color="bg-blue-50"
        />
        <DashboardCard 
          title="Total de Músicos" 
          value={dadosDashboard.totalMusicos.toString()} 
          icon={<Users className="text-purple-500" size={24} />}
          color="bg-purple-50"
        />
        <DashboardCard 
          title="Total de Músicas" 
          value={dadosDashboard.totalMusicas.toString()} 
          icon={<Music className="text-green-500" size={24} />}
          color="bg-green-50"
        />
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-lg font-semibold mb-4">Filtros</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Buscar por nome, cidade..."
              className="pl-10 w-full rounded-md border border-gray-300 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              value={filtroBusca}
              onChange={(e) => setFiltroBusca(e.target.value)}
            />
          </div>
          
          <select
            className="rounded-md border border-gray-300 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            value={filtroCidade}
            onChange={(e) => setFiltroCidade(e.target.value)}
          >
            <option value="">Todas as cidades</option>
            {cidades.map((cidade) => (
              <option key={cidade} value={cidade}>
                {cidade}
              </option>
            ))}
          </select>
          
          <button
            onClick={limparFiltros}
            className="bg-gray-100 hover:bg-gray-200 text-gray-800 py-2 px-4 rounded-md transition-colors"
          >
            Limpar filtros
          </button>
        </div>
      </div>

      {/* Bands List */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-lg font-semibold">
            {bandasFiltradas.length} {bandasFiltradas.length === 1 ? 'banda encontrada' : 'bandas encontradas'}
          </h2>
          <div className="flex space-x-2">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-md ${viewMode === 'grid' ? 'bg-primary-100 text-primary-600' : 'text-gray-500 hover:bg-gray-100'}`}
              aria-label="Visualização em grade"
            >
              <Grid size={20} />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-md ${viewMode === 'list' ? 'bg-primary-100 text-primary-600' : 'text-gray-500 hover:bg-gray-100'}`}
              aria-label="Visualização em lista"
            >
              <List size={20} />
            </button>
          </div>
        </div>

        {bandasFiltradas.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            <p>Nenhuma banda encontrada com os filtros atuais.</p>
            <button
              onClick={limparFiltros}
              className="mt-2 text-primary-600 hover:underline"
            >
              Limpar filtros
            </button>
          </div>
        ) : viewMode === 'grid' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-6">
            {paginatedBandas.map((banda) => (
              <BandaCard
                key={banda.id}
                banda={banda}
                onDelete={handleOpenDeleteModal}
              />
            ))}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Nome Artístico / Nome
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Instrumentos
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Contato
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Localização
                  </th>
                  <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Músicos / Músicas
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {paginatedBandas.map((banda) => (
                  <tr key={banda.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        {banda.foto ? (
                          <img 
                            src={banda.foto} 
                            alt={`Logo da banda ${banda.nome}`}
                            className="h-10 w-10 rounded-full object-cover mr-3 flex-shrink-0"
                          />
                        ) : (
                          <div className="h-10 w-10 rounded-full bg-purple-50 flex items-center justify-center mr-3 flex-shrink-0">
                            <Music className="h-5 w-5 text-purple-400" />
                          </div>
                        )}
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {banda.nomeArtistico || banda.nome}
                          </div>
                          {banda.nomeArtistico && (
                            <div className="text-xs text-purple-600">{banda.nome}</div>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-1">
                        {banda.instrumentos?.slice(0, 3).map((instrumento) => (
                          <span 
                            key={instrumento.id} 
                            className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800"
                          >
                            {instrumento.nome}
                          </span>
                        ))}
                        {banda.instrumentos?.length > 3 && (
                          <span className="text-xs text-gray-500">+{banda.instrumentos.length - 3}</span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-1">
                        <div className="flex items-center text-sm text-gray-900">
                          <Mail className="h-3.5 w-3.5 mr-1 text-gray-400 flex-shrink-0" />
                          <span>{banda.email}</span>
                        </div>
                        {banda.telefone && (
                          <div className="flex items-center text-sm text-gray-600">
                            <Phone className="h-3.5 w-3.5 mr-1 text-gray-400 flex-shrink-0" />
                            <span>{banda.telefone}</span>
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-1 text-gray-400 flex-shrink-0" />
                        <div>
                          <div className="text-sm text-gray-900">
                            {banda.endereco?.cidade}, {banda.endereco?.estado}
                          </div>
                          {banda.endereco?.bairro && (
                            <div className="text-xs text-gray-500">{banda.endereco.bairro}</div>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex items-center justify-center space-x-4">
                        <div className="flex flex-col items-center">
                          <div className="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center">
                            <Users className="h-4 w-4 text-purple-600" />
                          </div>
                          <span className="text-xs text-gray-700">{banda.quantidadeMusicos || 0}</span>
                        </div>
                        <div className="flex flex-col items-center">
                          <div className="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center">
                            <Music className="h-4 w-4 text-purple-600" />
                          </div>
                          <span className="text-xs text-gray-700">{banda.musicas?.length || 0}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-2">
                        <Link
                          to={`${banda.id}`}
                          className="text-blue-600 hover:text-blue-900"
                          title="Visualizar"
                        >
                          <Eye size={18} />
                        </Link>
                        <Link
                          to={`${banda.id}/editar`}
                          className="text-yellow-600 hover:text-yellow-900"
                          title="Editar"
                        >
                          <Edit size={18} />
                        </Link>
                        <button
                          onClick={() => handleOpenDeleteModal(banda.id, banda.nome)}
                          className="text-red-600 hover:text-red-900"
                          title="Excluir"
                          disabled={deletingId === banda.id.toString()}
                        >
                          {deletingId === banda.id.toString() ? (
                            <div className="animate-spin h-4 w-4 border-2 border-red-600 border-t-transparent rounded-full"></div>
                          ) : (
                            <Trash2 size={18} />
                          )}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination */}
        {bandasFiltradas.length > 0 && (
          <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
            <div className="flex-1 flex justify-between sm:hidden">
              <button
                onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md ${
                  currentPage === 1 ? 'bg-gray-100 text-gray-400' : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                Anterior
              </button>
              <button
                onClick={() => currentPage < totalPages && handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md ${
                  currentPage === totalPages ? 'bg-gray-100 text-gray-400' : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                Próximo
              </button>
            </div>
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-gray-700">
                  Mostrando <span className="font-medium">{(currentPage - 1) * itemsPerPage + 1}</span> a{' '}
                  <span className="font-medium">
                    {Math.min(currentPage * itemsPerPage, bandasFiltradas.length)}
                  </span>{' '}
                  de <span className="font-medium">{bandasFiltradas.length}</span> resultados
                </p>
              </div>
              <div>
                <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className={`relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium ${
                      currentPage === 1 ? 'text-gray-300' : 'text-gray-500 hover:bg-gray-50'
                    }`}
                  >
                    <span className="sr-only">Anterior</span>
                    <ChevronDown className="h-5 w-5 transform rotate-90" aria-hidden="true" />
                  </button>
                  
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    let pageNum;
                    if (totalPages <= 5) {
                      pageNum = i + 1;
                    } else if (currentPage <= 3) {
                      pageNum = i + 1;
                    } else if (currentPage >= totalPages - 2) {
                      pageNum = totalPages - 4 + i;
                    } else {
                      pageNum = currentPage - 2 + i;
                    }
                    
                    return (
                      <button
                        key={pageNum}
                        onClick={() => handlePageChange(pageNum)}
                        className={`relative inline-flex items-center px-4 py-2 border ${
                          currentPage === pageNum
                            ? 'z-10 bg-primary-50 border-primary-500 text-primary-600'
                            : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                        } text-sm font-medium`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                  
                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className={`relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium ${
                      currentPage === totalPages ? 'text-gray-300' : 'text-gray-500 hover:bg-gray-50'
                    }`}
                  >
                    <span className="sr-only">Próximo</span>
                    <ChevronDown className="h-5 w-5 transform -rotate-90" aria-hidden="true" />
                  </button>
                </nav>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      <ConfirmationModal
        isOpen={showDeleteModal}
        onCancel={handleCloseDeleteModal}
        onConfirm={handleConfirmDelete}
        title="Confirmar Exclusão"
        message={`Tem certeza que deseja excluir a banda "${bandaToDelete?.nome}"? Esta ação não pode ser desfeita.`}
        confirmText={deletingId ? 'Excluindo...' : 'Confirmar Exclusão'}
        cancelText="Cancelar"
        variant="destructive"
        isLoading={!!deletingId}
      />

      {/* Notification */}
      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
          duration={5000}
        />
      )}
    </div>
  );
};
interface DashboardCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  color?: string;
}

const DashboardCard: React.FC<DashboardCardProps> = ({ title, value, icon, color = 'bg-white' }) => {
  return (
    <div className={`${color} p-6 rounded-lg shadow-sm border border-gray-100`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <p className="text-2xl font-semibold text-gray-900">{value}</p>
        </div>
        <div className="p-3 rounded-full bg-white shadow-sm">
          {icon}
        </div>
      </div>
    </div>
  );
};

// Banda Card Component for Grid View
interface BandaCardProps {
  banda: Banda;
  onDelete: (id: string, nome: string) => void;
}

const BandaCard: React.FC<BandaCardProps> = ({ banda, onDelete }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-200 flex flex-col h-full">
      {/* Logo da Banda */}
      <div className="flex justify-center p-4 bg-gray-50">
        {banda.foto ? (
          <img 
            src={banda.foto} 
            alt={`Logo da banda ${banda.nome}`}
            className="h-20 w-20 rounded-full object-cover border-2 border-purple-100"
          />
        ) : (
          <div className="h-20 w-20 rounded-full bg-purple-50 flex items-center justify-center border-2 border-purple-100">
            <Music className="h-8 w-8 text-purple-400" />
          </div>
        )}
      </div>
      
      <div className="p-5 flex-1">
        {/* Nome Artístico como Título */}
        <h3 className="text-xl font-semibold text-gray-900 mb-1 text-center">
          {banda.nomeArtistico || banda.nome}
        </h3>
        
        {/* Nome como Subtítulo */}
        {banda.nomeArtistico && (
          <p className="text-sm text-purple-600 mb-4 text-center">{banda.nome}</p>
        )}
        
        {/* Instrumentos como Tags */}
        {banda.instrumentos && banda.instrumentos.length > 0 && (
          <div className="mb-4">
            <div className="flex flex-wrap gap-2">
              {banda.instrumentos.map((instrumento) => (
                <span 
                  key={instrumento.id} 
                  className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800"
                >
                  {instrumento.nome}
                </span>
              ))}
            </div>
          </div>
        )}
        
        {/* Contato com Email e Telefone */}
        <div className="mb-4">
          <h4 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">Contato</h4>
          <div className="space-y-1">
            <div className="flex items-center text-sm text-gray-700">
              <Mail className="h-4 w-4 mr-1 text-gray-400 flex-shrink-0" />
              <span className="truncate">{banda.email}</span>
            </div>
            {banda.telefone && (
              <div className="flex items-center text-sm text-gray-700">
                <Phone className="h-4 w-4 mr-1 text-gray-400 flex-shrink-0" />
                <span>{banda.telefone}</span>
              </div>
            )}
          </div>
        </div>
        
        {/* Localização */}
        <div className="mb-4">
          <h4 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">Localização</h4>
          <div className="flex items-center text-sm text-gray-700">
            <MapPin className="h-4 w-4 mr-1 flex-shrink-0 text-gray-400" />
            <span>{banda.endereco?.cidade}, {banda.endereco?.estado}</span>
          </div>
        </div>
        
        {/* Contadores - Movido para a parte inferior do card */}
        <div className="mt-auto pt-4 border-t border-gray-100">
          <div className="flex justify-between">
            {/* Músicos */}
            <div className="flex flex-col items-center flex-1">
              <div className="flex items-center justify-center h-10 w-10 rounded-full bg-purple-100 mb-1">
                <Users className="h-5 w-5 text-purple-600" />
              </div>
              <span className="text-xs font-medium text-gray-900">{banda.quantidadeMusicos || 0}</span>
              <span className="text-xs text-gray-500">Músicos</span>
            </div>
            
            {/* Músicas */}
            <div className="flex flex-col items-center flex-1">
              <div className="flex items-center justify-center h-10 w-10 rounded-full bg-purple-100 mb-1">
                <Music className="h-5 w-5 text-purple-600" />
              </div>
              <span className="text-xs font-medium text-gray-900">{banda.musicas?.length || 0}</span>
              <span className="text-xs text-gray-500">Músicas</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Ações */}
      <div className="bg-gray-50 px-4 py-3 flex justify-end items-center border-t border-gray-100">
        <div className="flex space-x-3">
          <Link
            to={`/gestor/bandas/${banda.id}`}
            className="text-gray-400 hover:text-blue-600 transition-colors"
            title="Visualizar"
          >
            <Eye size={18} />
          </Link>
          <Link
            to={`/gestor/bandas/${banda.id}/editar`}
            className="text-gray-400 hover:text-yellow-600 transition-colors"
            title="Editar"
          >
            <Edit size={18} />
          </Link>
          <button
            onClick={() => onDelete(banda.id, banda.nome)}
            className="text-gray-400 hover:text-red-600 transition-colors"
            title="Excluir"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default BandasPage;
