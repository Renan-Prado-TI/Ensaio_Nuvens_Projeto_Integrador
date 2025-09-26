import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useBandaDetalhes } from '../hooks/useBandaDetalhes';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import Button from '@/components/ui/button';
import { Notification } from '@/components/ui/notification';
import { ConfirmationModal } from '@/components/ui/confirmation-modal';
import { deletarBanda } from '../api/mockBandaService';
import {
  MapPin,
  Phone,
  Mail,
  Calendar,
  Users,
  Music,
  Edit,
  Trash2,
  XCircle,
  User as UserX,
  Eye,
  User as UserIcon,
  Building2
} from 'lucide-react';

export function BandaDetalhesPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { banda, loading, error } = useBandaDetalhes(id);
  const [abaAtiva, setAbaAtiva] = useState<'musicos' | 'musicas'>('musicos');
  const [notification, setNotification] = useState<{
    show: boolean;
    message: string;
    type: 'success' | 'error' | 'info' | 'warning';
  } | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  // Estados e efeitos removidos - apenas o necessário para funcionamento
  console.log('=== BANDA DETALHES PAGE ===');
  console.log('ID da URL:', id);
  console.log('Estado do hook:', { banda: !!banda, loading, error: error?.message });

  const handleOpenDeleteModal = () => {
    setShowDeleteModal(true);
  };

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
  };

  const handleConfirmDelete = async () => {
    if (!id) return;

    try {
      setIsDeleting(true);
      const sucesso = await deletarBanda(parseInt(id));

      if (sucesso) {
        setNotification({
          show: true,
          message: `Banda "${banda?.nome}" excluída com sucesso!`,
          type: 'success',
        });

        // Redirecionar para a listagem após 2 segundos
        setTimeout(() => {
          navigate('/gestor/bandas', {
            state: {
              showNotification: true,
              message: `Banda "${banda?.nome}" excluída com sucesso!`,
              type: 'success'
            }
          });
        }, 2000);
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
      setIsDeleting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando informações da banda...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border-l-4 border-red-400 p-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <XCircle className="h-5 w-5 text-red-400" />
          </div>
          <div className="ml-3">
            <p className="text-sm text-red-700">
              Erro ao carregar os dados da banda: {error.message}
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (!banda) {
    return (
      <div className="text-center py-12">
        <UserX className="h-12 w-12 mx-auto text-gray-400" />
        <h3 className="mt-2 text-lg font-medium text-gray-900">Banda não encontrada</h3>
        <p className="mt-1 text-gray-500">A banda que você está procurando não existe ou foi removida.</p>
        <div className="mt-6">
          <Button onClick={() => navigate('/bandas')}>
            Voltar para a lista de bandas
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      {/* Botão Voltar */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center text-gray-600 hover:text-blue-600 mb-4 transition-colors"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
        </svg>
        Voltar
      </button>

      {/* Cabeçalho com imagem de capa e avatar */}
      <div className="relative mb-8 rounded-xl overflow-hidden bg-gradient-to-r from-blue-600 to-indigo-700 shadow-lg">
        {/* Imagem de capa */}
        <div className="h-48 bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center">
          <Music className="h-24 w-24 text-white opacity-20" />
        </div>
        
        {/* Conteúdo do cabeçalho */}
        <div className="relative px-6 pb-6 -mt-12">
          <div className="flex flex-col md:flex-row items-start md:items-end gap-6">
            {/* Avatar da banda */}
            <div className="relative">
              <div className="h-24 w-24 md:h-32 md:w-32 rounded-xl bg-white p-1 shadow-lg">
                <div className="h-full w-full rounded-lg bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center">
                  <span className="text-4xl font-bold text-blue-600">{banda?.nome?.charAt(0) || 'B'}</span>
                </div>
              </div>
              <div className="absolute -bottom-2 -right-2 bg-white rounded-full p-1 shadow-md">
                <div className="h-6 w-6 rounded-full bg-green-500 flex items-center justify-center">
                  <span className="text-xs text-white font-bold">✓</span>
                </div>
              </div>
            </div>

            {/* Informações da banda */}
            <div className="flex-1 text-white">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold">{banda?.nome}</h1>
                  {banda?.nomeArtistico && (
                    <p className="text-blue-100 text-lg">{banda.nomeArtistico}</p>
                  )}
                </div>
                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    size="sm"
                    className="bg-white/90 hover:bg-white text-blue-700 hover:text-blue-800 border-white/30 hover:border-white/50 transition-all duration-200 flex items-center gap-2 px-4 py-2 rounded-lg shadow-md"
                    onClick={() => navigate(`/gestor/bandas/${id}/editar`)}
                  >
                    <Edit className="h-4 w-4" />
                    <span>Editar</span>
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="bg-red-600 hover:bg-red-700 text-white hover:text-white border-red-600 hover:border-red-700 transition-all duration-200 flex items-center gap-2 px-4 py-2 rounded-lg shadow-md"
                    onClick={handleOpenDeleteModal}
                    disabled={isDeleting}
                  >
                    <Trash2 className="h-4 w-4" />
                    <span>{isDeleting ? 'Excluindo...' : 'Excluir'}</span>
                  </Button>
                </div>
              </div>

              {/* Metadados da banda */}
              <div className="mt-4 flex flex-wrap gap-4 text-sm text-blue-100">
                <div className="flex items-center gap-1.5">
                  <Calendar className="h-4 w-4" />
                  <span>Fundada em {new Date(banda?.fundacao || new Date()).toLocaleDateString('pt-BR')}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Users className="h-4 w-4" />
                  <span>Total de {banda?.quantidadeMusicos || 0} músicos cadastrados</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Music className="h-4 w-4" />
                  <span>{banda?.musicas?.length || 0} músicas no repertório</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Descrição da banda */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-3">Sobre a banda</h2>
        <p className="text-gray-700 leading-relaxed">{banda?.descricao || 'Nenhuma descrição fornecida.'}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Informações de Contato */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Phone className="h-5 w-5" />
              Informações de Contato
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3">
              <Phone className="h-4 w-4 text-gray-400" />
              <div>
                <p className="font-medium">{banda.telefone}</p>
                <p className="text-sm text-gray-500">Telefone</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Mail className="h-4 w-4 text-gray-400" />
              <div>
                <p className="font-medium">{banda.email}</p>
                <p className="text-sm text-gray-500">Email</p>
              </div>
            </div>

            {banda.cnpj && (
              <div className="flex items-center gap-3">
                <Building2 className="h-4 w-4 text-gray-400" />
                <div>
                  <p className="font-medium">{banda.cnpj}</p>
                  <p className="text-sm text-gray-500">CNPJ</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Endereço */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              Endereço
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <p className="font-medium">
              {banda.endereco.logradouro}, {banda.endereco.numero}
              {banda.endereco.complemento && `, ${banda.endereco.complemento}`}
            </p>
            <p className="text-gray-600">{banda.endereco.bairro}</p>
            <p className="text-gray-600">
              {banda.endereco.cidade} - {banda.endereco.estado}
            </p>
            <p className="text-gray-600">CEP: {banda.endereco.cep}</p>
            {banda.endereco.referencia && (
              <p className="text-sm text-gray-500 mt-2">
                <strong>Referência:</strong> {banda.endereco.referencia}
              </p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Instrumentos */}
      <Card>
        <CardHeader>
          <CardTitle>Instrumentos</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {banda.instrumentos.map((instrumento, index) => {
              return (
                <span
                  key={index}
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800 hover:bg-purple-200 shadow-sm transition-colors"
                >
                  {instrumento.nome}
                </span>
              );
            })}
            {banda.instrumentos.length === 0 && (
              <p className="text-gray-500 text-sm italic">Nenhum instrumento cadastrado</p>
            )}
          </div>
        </CardContent>
      </Card>


      {/* Sistema de Abas Customizado */}
      <div className="w-full">
        {/* Tab Navigation */}
        <div className="border-b border-gray-200 mb-6">
          <nav className="flex space-x-8">
            <button
              onClick={() => setAbaAtiva('musicos')}
              className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                abaAtiva === 'musicos'
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <UserIcon className="h-4 w-4" />
              <span>Músicos ({banda?.quantidadeMusicos || 0})</span>
            </button>
            <button
              onClick={() => setAbaAtiva('musicas')}
              className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                abaAtiva === 'musicas'
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <Music className="h-4 w-4" />
              <span>Músicas ({banda?.musicas?.length || 0})</span>
            </button>
          </nav>
        </div>

        {/* Aba de Músicos */}
        {abaAtiva === 'musicos' && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Músicos da Banda</span>
                <Button variant="outline" size="sm">
                  <Eye className="h-4 w-4 mr-2" />
                  Ver Detalhes
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {banda.quantidadeMusicos > 0 ? (
                <div className="space-y-3">
                  {/* Mock de músicos - em uma implementação real, isso viria da API */}
                  {Array.from({ length: banda.quantidadeMusicos }).map((_, index) => {
                    // Em uma implementação real, esses dados viriam da API
                    const musicosMock = [
                      { nome: "João Silva", instrumento: "Guitarra" },
                      { nome: "Maria Santos", instrumento: "Vocal" },
                      { nome: "Carlos Oliveira", instrumento: "Bateria" },
                      { nome: "Ana Costa", instrumento: "Baixo" }
                    ];
                    const musico = musicosMock[index % musicosMock.length];
                    return (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback className="text-xs">
                              {musico.nome.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{musico.nome}</p>
                            <p className="text-sm text-gray-500">{musico.instrumento}</p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <UserIcon className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                  <p>Nenhum músico cadastrado</p>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Aba de Músicas */}
        {abaAtiva === 'musicas' && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Repertório</span>
                <Button variant="outline" size="sm">
                  <Eye className="h-4 w-4 mr-2" />
                  Ver Detalhes
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {banda.musicas.length > 0 ? (
                <div className="space-y-3">
                  {banda.musicas.map((musica, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 bg-primary-100 rounded-full flex items-center justify-center">
                          <Music className="h-4 w-4 text-primary-600" />
                        </div>
                        <div>
                          <p className="font-medium">{musica.nome}</p>
                          {banda?.redesSociais?.instagram && (
                            <p className="text-sm text-gray-500">@{banda.redesSociais.instagram.replace('@', '')}</p>
                          )}
                        </div>
                      </div>
                      {musica.duracao && (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                          {musica.duracao}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <Music className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                  <p>Nenhuma música cadastrada no repertório</p>
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </div>

      {/* Notificação */}
      {notification && (
        <div className="fixed bottom-4 right-4 z-50">
          <Notification
            message={notification.message}
            type={notification.type}
            onClose={() => setNotification(null)}
            duration={5000}
          />
        </div>
      )}

      {/* Modal de confirmação de exclusão */}
      <ConfirmationModal
        isOpen={showDeleteModal}
        title="Confirmar exclusão"
        message={
          <span>
            Tem certeza que deseja excluir a banda <strong>"{banda?.nome}"</strong>?
            <br />
            <span className="text-sm text-gray-500">Esta ação não pode ser desfeita.</span>
          </span>
        }
        confirmText="Confirmar exclusão"
        cancelText="Cancelar"
        onConfirm={handleConfirmDelete}
        onCancel={handleCloseDeleteModal}
        variant="destructive"
        isLoading={isDeleting}
      />
    </div>
  );
}