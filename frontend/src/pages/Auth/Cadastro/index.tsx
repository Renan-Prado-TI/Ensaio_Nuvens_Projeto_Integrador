import CadastroForm from '../../../components/Form/Cadastro';
import AuthLayout from '../../../components/Layout/AuthLayout';

const Cadastro = () => {
  return (
    <AuthLayout
      title="Crie sua conta"
      subtitle="Preencha as informações abaixo para se cadastrar"
      footerText="Já tem uma conta?"
      footerLink={{
        text: 'Faça login',
        to: '/login'
      }}
    >
      <CadastroForm />
    </AuthLayout>
  );
};

export default Cadastro;
