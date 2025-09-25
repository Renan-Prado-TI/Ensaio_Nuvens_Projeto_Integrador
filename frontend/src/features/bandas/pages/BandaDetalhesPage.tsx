import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useBandaDetalhes } from '../hooks/useBandaDetalhes';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
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
  ExternalLink,
  Edit,
  Trash2,
  Facebook,
  Instagram,
  Youtube,
  Linkedin,
  Globe,
  Building2,
  Eye,
  User,
  Music as MusicIcon
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
      handleCloseDeleteModal();
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto p-6">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-6">
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          <p>Erro ao carregar os dados da banda: {error.message}</p>
          <p>ID: {id}</p>
        </div>
      </div>
    );
  }

  if (!banda) {
    return (
      <div className="container mx-auto p-6">
        <div className="bg-yellow-50 border border-yellow-200 text-yellow-700 px-4 py-3 rounded">
          <p>Banda não encontrada</p>
          <p>ID: {id}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 md:p-6 space-y-6">
      {/* Header da Banda */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Avatar/Foto da Banda */}
            <div className="flex-shrink-0">
              <Avatar className="h-24 w-24 md:h-32 md:w-32">
                <AvatarImage src={banda.foto} alt={banda.nome} />
                <AvatarFallback className="text-2xl font-bold bg-primary-100 text-primary-600">
                  {banda.nome.charAt(0)}
                </AvatarFallback>
              </Avatar>
            </div>

            {/* Informações Principais */}
            <div className="flex-1 space-y-4">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-3xl font-bold text-gray-900">{banda.nome}</h1>
                </div>
                {banda.nomeArtistico && (
                  <p className="text-xl text-gray-600 font-medium">{banda.nomeArtistico}</p>
                )}
              </div>

              <p className="text-gray-700 leading-relaxed">{banda.descricao}</p>

              <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>Fundada em {new Date(banda.fundacao).toLocaleDateString('pt-BR')}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  <span>{banda.quantidadeMusicos} músicos</span>
                </div>
                <div className="flex items-center gap-1">
                  <Music className="h-4 w-4" />
                  <span>{banda.musicas.length} músicas no repertório</span>
                </div>
              </div>
            </div>

            {/* Ações */}
            <div className="flex flex-col gap-2 md:items-end">
              <Button
                variant="outline"
                size="sm"
                className="w-full md:w-auto"
                onClick={() => navigate(`/gestor/bandas/${id}/editar`)}
              >
                <Edit className="h-4 w-4 mr-2" />
                Editar
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="w-full md:w-auto text-red-600 hover:text-red-700"
                onClick={handleOpenDeleteModal}
                disabled={isDeleting}
              >
                <Trash2 className="h-4 w-4 mr-2" />
                {isDeleting ? 'Excluindo...' : 'Excluir'}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

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

      {/* Redes Sociais */}
      <Card>
        <CardHeader>
          <CardTitle>Redes Sociais</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {banda.redesSociais.facebook && (
              <a
                href={banda.redesSociais.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
              >
                <Facebook className="h-5 w-5 text-blue-600" />
                <div>
                  <p className="font-medium">Facebook</p>
                  <p className="text-sm text-gray-500">Ver página</p>
                </div>
                <ExternalLink className="h-4 w-4 text-gray-400 ml-auto" />
              </a>
            )}

            {banda.redesSociais.instagram && (
              <a
                href={banda.redesSociais.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 bg-pink-50 hover:bg-pink-100 rounded-lg transition-colors"
              >
                <Instagram className="h-5 w-5 text-pink-600" />
                <div>
                  <p className="font-medium">Instagram</p>
                  <p className="text-sm text-gray-500">Ver perfil</p>
                </div>
                <ExternalLink className="h-4 w-4 text-gray-400 ml-auto" />
              </a>
            )}

            {banda.redesSociais.youtube && (
              <a
                href={banda.redesSociais.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 bg-red-50 hover:bg-red-100 rounded-lg transition-colors"
              >
                <Youtube className="h-5 w-5 text-red-600" />
                <div>
                  <p className="font-medium">YouTube</p>
                  <p className="text-sm text-gray-500">Ver canal</p>
                </div>
                <ExternalLink className="h-4 w-4 text-gray-400 ml-auto" />
              </a>
            )}

            {banda.redesSociais.linkedin && (
              <a
                href={banda.redesSociais.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
              >
                <Linkedin className="h-5 w-5 text-blue-600" />
                <div>
                  <p className="font-medium">LinkedIn</p>
                  <p className="text-sm text-gray-500">Ver perfil</p>
                </div>
                <ExternalLink className="h-4 w-4 text-gray-400 ml-auto" />
              </a>
            )}

            {banda.redesSociais.tiktok && (
              <a
                href={banda.redesSociais.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <div className="h-5 w-5 bg-black rounded-sm flex items-center justify-center">
                  <span className="text-white text-xs font-bold">♪</span>
                </div>
                <div>
                  <p className="font-medium">TikTok</p>
                  <p className="text-sm text-gray-500">Ver perfil</p>
                </div>
                <ExternalLink className="h-4 w-4 text-gray-400 ml-auto" />
              </a>
            )}

            {banda.redesSociais.site && (
              <a
                href={banda.redesSociais.site}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <Globe className="h-5 w-5 text-gray-600" />
                <div>
                  <p className="font-medium">Website</p>
                  <p className="text-sm text-gray-500">Visitar site</p>
                </div>
                <ExternalLink className="h-4 w-4 text-gray-400 ml-auto" />
              </a>
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
              <User className="h-4 w-4" />
              <span>Músicos ({banda.quantidadeMusicos})</span>
            </button>
            <button
              onClick={() => setAbaAtiva('musicas')}
              className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                abaAtiva === 'musicas'
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <MusicIcon className="h-4 w-4" />
              <span>Músicas ({banda.musicas.length})</span>
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
                  {[
                    { nome: "João Silva", instrumento: "Guitarra" },
                    { nome: "Maria Santos", instrumento: "Vocal" },
                    { nome: "Carlos Oliveira", instrumento: "Bateria" },
                    { nome: "Ana Costa", instrumento: "Baixo" }
                  ].slice(0, banda.quantidadeMusicos).map((musico, index) => (
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
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <User className="h-12 w-12 mx-auto mb-3 text-gray-300" />
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
                          <MusicIcon className="h-4 w-4 text-primary-600" />
                        </div>
                        <div>
                          <p className="font-medium">{musica.nome}</p>
                          <p className="text-sm text-gray-500">{musica.artista}</p>
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
                  <MusicIcon className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                  <p>Nenhuma música cadastrada no repertório</p>
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </div>

      {/* Notificação */}
      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
          duration={5000}
        />
      )}

      {/* Modal de Confirmação de Exclusão */}
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
