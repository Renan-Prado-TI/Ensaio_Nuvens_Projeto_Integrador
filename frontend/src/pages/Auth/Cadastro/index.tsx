import { Link } from 'react-router-dom';
import CadastroForm from '../../../components/Form/Cadastro';
import AuthLayout from '../../../components/Layout/AuthLayout';

const Cadastro = () => {
  return (
    <AuthLayout
      title="Crie sua conta"
      subtitle="Preencha as informações abaixo para se cadastrar"
    >
      <div className="w-full max-w-2xl mx-auto">
        <CadastroForm />
        <div className="mt-8 text-center bg-white/80 backdrop-blur-sm p-4 rounded-lg border border-gray-100 shadow-sm">
          <p className="text-sm text-gray-700">
            Já tem uma conta?{' '}
            <Link 
              to="/login" 
              className="font-medium text-purple-700 hover:text-purple-800 hover:underline transition-colors"
            >
              Faça login
            </Link>
          </p>
        </div>
      </div>
    </AuthLayout>
  );
};

export default Cadastro;
