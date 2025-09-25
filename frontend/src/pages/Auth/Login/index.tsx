import React, { useState } from 'react';
import { 
  LoginForm, 
  SocialLogin, 
  ForgotPasswordModal, 
  DevModeAccess 
} from '@/components/Form/Login';
import AuthLayout from '@/components/Layout/AuthLayout';

const Login: React.FC = () => {
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  return (
    <>
      <AuthLayout
        title="Acesse sua conta"
        subtitle="Faça login para continuar"
        footerText="Não tem uma conta?"
        footerLink={{
          text: 'Cadastre-se',
          to: '/cadastro'
        }}
      >
        {/* Formulário de Login */}
        <LoginForm onForgotPassword={() => setShowForgotPassword(true)} />

        {/* Login Social */}
        <div className="my-6">
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
    </>
  );
};

export default Login;
