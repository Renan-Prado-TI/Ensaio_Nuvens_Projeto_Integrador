import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Button from '@/components/ui/button';
import { FormularioEditarBanda } from '../components/formulario/FormularioEditarBanda';
import { useEffect } from 'react';

const EditarBandaPage = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const params = useParams();

  console.log('=== EditarBandaPage ===');
  console.log('ID da banda:', id);
  console.log('Pathname:', location.pathname);
  console.log('Search:', location.search);
  console.log('State:', location.state);
  console.log('Params:', useParams());

  // Efeito para depuração
  useEffect(() => {
    console.log('EditarBandaPage - Efeito com ID:', id);
    console.log('Pathname completo:', window.location.pathname);
    
    if (id) {
      console.log(`Carregando dados da banda com ID: ${id}`);
      console.log('Params completos:', params);
    } else {
      console.error('Nenhum ID de banda fornecido na URL');
      console.log('Params disponíveis:', params);
    }
  }, [id, params]);

  const handleSuccess = () => {
    console.log('Edição concluída com sucesso, redirecionando...');
    navigate('/gestor/bandas', {
      state: {
        showNotification: true,
        message: 'Banda atualizada com sucesso!',
        type: 'success',
        timestamp: Date.now() // Garante que a notificação seja exibida
      },
      replace: true // Substitui a entrada atual no histórico de navegação
    });
  };

  const handleCancel = () => {
    console.log('Cancelando edição...');
    navigate(-1);
  };

  // Renderiza mensagem de erro quando não há ID
  const renderErroSemId = () => {
    console.error('Erro: Nenhum ID de banda fornecido');
    console.log('Estado atual:', { id, params, pathname: window.location.pathname });
    
    return (
      <div className="container mx-auto p-4 md:p-6 space-y-6">
        <div className="bg-red-50 border-l-4 border-red-400 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">ID da banda não encontrado</h3>
              <p className="text-sm text-red-700 mt-1">
                Não foi possível identificar qual banda deve ser editada.
              </p>
              <div className="mt-3 space-y-2">
                <p className="text-xs text-red-600">URL atual: {window.location.pathname}</p>
                <p className="text-xs text-red-600">ID: {id || 'não definido'}</p>
              </div>
              <div className="mt-4 space-x-3">
                <Button 
                  onClick={() => navigate(-1)} 
                  variant="outline" 
                  className="border-red-200 text-red-700 hover:bg-red-50"
                >
                  Voltar
                </Button>
                <Button 
                  onClick={() => navigate('/gestor/bandas')}
                  className="bg-red-600 hover:bg-red-700"
                >
                  Ir para a lista de bandas
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Se não tiver ID, mostra mensagem de erro
  if (!id) {
    return renderErroSemId();
  }

  return (
    <div className="container mx-auto p-4 md:p-6 space-y-6">
      {/* Cabeçalho */}
      <div className="flex items-center gap-4 mb-6">
        <Button
          variant="ghost"
          size="sm"
          onClick={handleCancel}
          className="p-2"
          aria-label="Voltar"
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Editar Banda</h1>
          <p className="text-gray-600 mt-1">
            Atualize as informações da banda
          </p>
        </div>
      </div>

      {/* Formulário de Edição */}
      <FormularioEditarBanda
        id={id}
        onSuccess={handleSuccess}
        onCancel={handleCancel}
      />
    </div>
  );
};

export default EditarBandaPage;
