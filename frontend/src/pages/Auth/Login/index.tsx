import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  LoginForm, 
  SocialLogin, 
  ForgotPasswordModal, 
  DevModeAccess 
} from '@/components/Form/Login';
import AuthLayout from '@/components/Layout/AuthLayout';

const Login: React.FC = () => {
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  const signupText = "Não tem uma conta?";
  const signupLink = {
    text: 'Cadastre-se',
    to: '/cadastro'
  };

  return (
    <div className="min-h-screen flex flex-col">
        <AuthLayout
          title={
            <>
              <span className="block text-2xl sm:text-3xl font-bold text-white drop-shadow-md">
                Acesse sua conta
              </span>
              <span className="block mt-2 text-base font-normal text-white opacity-90">
                Faça login para continuar
              </span>
            </>
          }
          hideSubtitle={true}
        >
          {/* Formulário de Login */}
          <LoginForm onForgotPassword={() => setShowForgotPassword(true)} />

          {/* Mensagem de cadastro */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              {signupText}{' '}
              <Link 
                to={signupLink.to} 
                className="font-medium text-purple-700 hover:text-purple-800 hover:underline"
              >
                {signupLink.text}
              </Link>
            </p>
          </div>

          {/* Login Social */}
          <div className="mt-8">
            <SocialLogin />
          </div>

          {/* Acesso Rápido para Desenvolvimento */}
          <DevModeAccess />
        </AuthLayout>

        {/* Modal de Esqueci a Senha */}
        <ForgotPasswordModal 
          isOpen={showForgotPassword} 
          onClose={() => setShowForgotPassword(false)} 
        />
      
      {/* Rodapé Simples */}
      <footer className="bg-white border-t border-gray-200 py-4 w-full mt-auto">
        <div className="w-full px-4 sm:px-6">
          <p className="text-sm text-gray-500 text-center">
            © 2024 EnsaioNuvens. Todos os direitos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Login;
