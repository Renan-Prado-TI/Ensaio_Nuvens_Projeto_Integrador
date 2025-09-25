import { useState } from 'react';
import type { ChangeEvent } from 'react';
import { Mail, CheckCircle } from 'lucide-react';
import Modal from '@/components/ui/modal';
import Button from '@/components/ui/button';
import Input from '@/components/ui/input';

interface ForgotPasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ForgotPasswordModal: React.FC<ForgotPasswordModalProps> = ({ 
  isOpen, 
  onClose 
}) => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) return;
    
    try {
      setIsLoading(true);
      // Simulação de requisição
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Password reset requested for:', email);
      setIsSubmitted(true);
    } catch (error) {
      console.error('Error requesting password reset:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setEmail('');
    setIsSubmitted(false);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title={isSubmitted ? 'Verifique seu e-mail' : 'Esqueceu sua senha?'}
      size="md"
      closeOnOverlayClick={!isLoading}
      className="bg-gradient-to-br from-white/90 to-gray-50/90 dark:from-gray-800/95 dark:to-gray-900/95 backdrop-blur-sm"
      overlayClassName="bg-black/50 backdrop-blur-sm"
      headerClassName="border-b border-gray-200 dark:border-gray-700 pb-4"
      bodyClassName="px-6 py-4"
      footerClassName="border-t border-gray-200 dark:border-gray-700 px-6 py-4"
    >
      {isSubmitted ? (
        <div className="text-center py-2">
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-50 dark:bg-green-900/30 mb-4">
            <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-400" />
          </div>
          <p className="text-gray-700 dark:text-gray-300 mb-6">
            Enviamos um link de redefinição de senha para <span className="font-semibold text-gray-900 dark:text-white">{email}</span>.
            Verifique sua caixa de entrada e siga as instruções.
          </p>
          <div className="mt-6">
            <Button
              onClick={handleClose}
              variant="primary"
              size="lg"
              fullWidth
              className="justify-center py-2.5 text-base font-medium shadow-sm hover:shadow-md transition-all duration-200"
            >
              Voltar para o login
            </Button>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            Digite seu endereço de e-mail e enviaremos um link para redefinir sua senha.
          </p>
          
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <Input
                label="E-mail"
                type="email"
                required
                value={email}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                placeholder="seu@email.com"
                leftIcon={<Mail className="h-4 w-4 text-gray-500 dark:text-gray-400" />}
                disabled={isLoading}
                className="bg-white/50 dark:bg-gray-800/50 border-gray-300 dark:border-gray-600 focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
                labelClassName="text-gray-700 dark:text-gray-200 font-medium"
              />
            </div>
            
            <div className="pt-1">
              <Button
                type="submit"
                variant="primary"
                size="lg"
                fullWidth
                isLoading={isLoading}
                disabled={!email || isLoading}
                className="justify-center py-2.5 text-base font-medium shadow-sm hover:shadow-md transition-all duration-200"
              >
                {isLoading ? 'Enviando...' : 'Enviar link de redefinição'}
              </Button>
            </div>
          </form>
          
          <div className="text-center mt-4">
            <Button
              type="button"
              onClick={handleClose}
              variant="ghost"
              size="sm"
              className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
            >
              Voltar para o login
            </Button>
          </div>
        </div>
      )}
    </Modal>
  );
};

export default ForgotPasswordModal;
