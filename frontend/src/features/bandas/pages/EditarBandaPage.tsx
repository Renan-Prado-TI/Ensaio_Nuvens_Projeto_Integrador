import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Button from '@/components/ui/button';
import { FormularioEditarBanda } from '../components/formulario/FormularioEditarBanda';

const EditarBandaPage = () => {
  const navigate = useNavigate();

  const handleSuccess = () => {
    navigate('/gestor/bandas', {
      state: {
        showNotification: true,
        message: 'Banda atualizada com sucesso!',
        type: 'success'
      }
    });
  };

  const handleCancel = () => {
    navigate(-1 as any);
  };

  return (
    <div className="container mx-auto p-4 md:p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <Button
          variant="ghost"
          size="sm"
          onClick={handleCancel}
          className="p-2"
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
        onSuccess={handleSuccess}
        onCancel={handleCancel}
      />
    </div>
  );
};

export default EditarBandaPage;
