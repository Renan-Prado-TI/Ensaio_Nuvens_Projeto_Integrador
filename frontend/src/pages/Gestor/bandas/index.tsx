import React, { useCallback, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { buscarBandas, deletarBanda } from '@/features/bandas/api/mockBandaService';
import type { Banda } from '@/features/bandas/types/banda';
import { Notification } from '@/components/ui/notification';
import { ConfirmationModal } from '@/components/ui/confirmation-modal';


interface NotificationState {
  showNotification?: boolean;
  message?: string;
  type?: 'success' | 'error' | 'info' | 'warning';
}

export const BandasPage: React.FC = () => {
  const [bandas, setBandas] = useState<Banda[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [notification, setNotification] = useState<{
    show: boolean;
    message: string;
    type: 'success' | 'error' | 'info' | 'warning';
  } | null>(null);
  
  // Estado para controle do modal de confirmação
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [bandaToDelete, setBandaToDelete] = useState<{ id: number; nome: string } | null>(null);
  
  const location = useLocation();
  
  // Verifica se há notificação no state da rota
  useEffect(() => {
    const state = location.state as NotificationState;
    if (state?.showNotification && state.message) {
      setNotification({
        show: true,
        message: state.message,
        type: state.type || 'success'
      });
      
      // Limpa o state da rota para não mostrar a notificação novamente ao recarregar
      window.history.replaceState({}, '');
      
      // Remove a notificação após 5 segundos
      const timer = setTimeout(() => {
        setNotification(null);
      }, 5000);
      
      return () => clearTimeout(timer);
    }
  }, [location.state]);

  const carregarBandas = useCallback(async () => {
    try {
      setIsLoading(true);
      const dados = await buscarBandas();
      
      if (!Array.isArray(dados)) {
        throw new Error('Dados inválidos retornados');
      }
      
      setBandas(dados);
    } catch (error) {
      console.error('Erro ao carregar bandas:', error);
      alert('Ocorreu um erro ao carregar as bandas. Por favor, tente novamente.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    carregarBandas();
  }, [carregarBandas]);

  const handleOpenDeleteModal = (id: string, nome: string) => {
    setBandaToDelete({ id: parseInt(id), nome });
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
      const sucesso = await deletarBanda(bandaToDelete.id);
      
      if (sucesso) {
        setNotification({
          show: true,
          message: `Banda "${bandaToDelete.nome}" excluída com sucesso!`,
          type: 'success',
        });
        await carregarBandas();
      } else {
        setNotification({
          show: true,
          message: 'Não foi possível excluir a banda. Tente novamente.',
          type: 'error',
        });
      }
    } catch (error) {
      console.error('Erro ao excluir banda:', error);
      setNotification({
        show: true,
        message: 'Ocorreu um erro ao excluir a banda. Tente novamente.',
        type: 'error',
      });
    } finally {
      setDeletingId(null);
      handleCloseDeleteModal();
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-semibold text-gray-900">Minhas Bandas</h1>
          <p className="mt-1 text-sm text-gray-500">
            Gerencie suas bandas e visualize seus detalhes
          </p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <Link
            to="/gestor/bandas/nova"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            <svg
              className="-ml-1 mr-2 h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                clipRule="evenodd"
              />
            </svg>
            Nova Banda
          </Link>
        </div>
      </div>
      
      <div className="mt-8">
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          {bandas.length === 0 ? (
            <div className="px-4 py-12 text-center">
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1"
                  d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900">Nenhuma banda cadastrada</h3>
              <p className="mt-1 text-sm text-gray-500">Comece criando uma nova banda.</p>
              <div className="mt-6">
                <Link
                  to="/gestor/bandas/nova"
                  className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                >
                  <svg
                    className="-ml-1 mr-2 h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Nova Banda
                </Link>
              </div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Banda
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Instrumentos
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Contato
                    </th>
                    <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Localização
                    </th>
                    <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Músicos
                    </th>
                    <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Músicas
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Ações
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {bandas.map((banda) => (
                    <tr key={banda.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                            {banda.foto ? (
                              <img className="h-10 w-10 rounded-full" src={banda.foto} alt={banda.nome} />
                            ) : (
                              <span className="text-gray-400">
                                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                                  <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                                </svg>
                              </span>
                            )}
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              <Link to={`/gestor/bandas/${banda.id}`} className="text-primary-600 hover:text-primary-900">
                                {banda.nome}
                              </Link>
                            </div>
                            {banda.nomeArtistico && (
                              <div className="text-sm text-gray-500">{banda.nomeArtistico}</div>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-wrap gap-1">
                          {banda.instrumentos && banda.instrumentos.length > 0 ? (
                            banda.instrumentos.map((instrumento, idx) => (
                              <span 
                                key={idx}
                                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800"
                              >
                                {instrumento.nome}
                              </span>
                            ))
                          ) : (
                            <span className="text-sm text-gray-500">Nenhum</span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{banda.telefone || 'N/A'}</div>
                        {banda.email && (
                          <div className="text-sm text-gray-500">{banda.email}</div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <div className="text-sm text-gray-900">{banda.endereco?.cidade && banda.endereco?.estado 
                          ? `${banda.endereco.cidade}/${banda.endereco.estado}`
                          : 'N/A'}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <div className="text-sm text-gray-900">{banda.quantidadeMusicos}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <div className="text-sm text-gray-900">{banda.musicas?.length || 0}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex justify-end space-x-2">
                          <Link
                            to={`/gestor/bandas/${banda.id}/editar`}
                            className="text-indigo-600 hover:text-indigo-900"
                            title="Editar"
                          >
                            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                          </Link>
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              handleOpenDeleteModal(banda.id, banda.nome);
                            }}
                            className="text-red-600 hover:text-red-900"
                            title="Excluir"
                            disabled={deletingId === parseInt(banda.id)}
                          >
                            {deletingId === parseInt(banda.id) ? (
                              <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                              </svg>
                            ) : (
                              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
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
        </div>
      </div>
      
      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
          duration={5000}
        />
      )}
      
      {bandaToDelete && (
        <ConfirmationModal
          isOpen={showDeleteModal}
          title="Confirmar exclusão"
          message={
            <span>
              Tem certeza que deseja excluir a banda <strong>"{bandaToDelete.nome}"</strong>?
              <br />
              <span className="text-sm text-gray-500">Esta ação não pode ser desfeita.</span>
            </span>
          }
          confirmText="Confirmar exclusão"
          cancelText="Cancelar"
          onConfirm={handleConfirmDelete}
          onCancel={handleCloseDeleteModal}
          variant="destructive"
          isLoading={deletingId === bandaToDelete?.id}
        />
      )}
    </div>
  );
};

export default BandasPage;
