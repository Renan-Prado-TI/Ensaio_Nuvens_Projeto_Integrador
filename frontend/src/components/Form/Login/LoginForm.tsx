import React, { useState } from 'react';
import { Mail, Lock } from 'lucide-react';
import { twMerge } from 'tailwind-merge';
import Button from '@/components/ui/button';
import Input from '@/components/ui/input';
import Checkbox from '@/components/ui/checkbox';

interface LoginFormProps {
  onForgotPassword: () => void;
  className?: string;
}

export const LoginForm: React.FC<LoginFormProps> = ({ 
  onForgotPassword,
  className = ''
}) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    // Validação básica
    if (!formData.email || !formData.password) {
      setError('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    try {
      setIsLoading(true);
      // Simulação de requisição de login
      await new Promise(resolve => setTimeout(resolve, 1500));
      console.log('Login attempt with:', formData);
      
      // Redirecionamento simulado (será tratado pelo roteador)
      // navigate('/dashboard');
    } catch (err) {
      setError('Ocorreu um erro ao tentar fazer login. Tente novamente.');
      console.error('Login error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={twMerge('w-full', className)}>
      {error && (
        <div 
          className="mb-6 p-4 bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-200 rounded-lg text-sm border border-red-200 dark:border-red-800"
          role="alert"
        >
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-5">
          <div>
            <Input
              label="E-mail"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={formData.email}
              onChange={handleChange}
              placeholder="seu@email.com"
              leftIcon={<Mail className="h-4 w-4 text-gray-500" />}
              className="bg-white border border-gray-300 focus:border-primary-600 focus:ring-2 focus:ring-primary-100 rounded-lg transition-colors"
              labelClassName="text-gray-700 font-medium"
            />
          </div>
          
          <div>
            <Input
              label="Senha"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              leftIcon={<Lock className="h-4 w-4 text-gray-500" />}
              className="bg-white border border-gray-300 focus:border-primary-600 focus:ring-2 focus:ring-primary-100 rounded-lg transition-colors"
              labelClassName="text-gray-700 font-medium"
            />
          </div>
        </div>

        <div className="flex items-center justify-between">
          <Checkbox
            id="remember-me"
            name="rememberMe"
            checked={formData.rememberMe}
            onChange={handleChange}
            label="Lembrar de mim"
            className="h-4 w-4 text-primary-600 focus:ring-2 focus:ring-primary-100 border-gray-300 rounded"
            labelClassName="text-gray-700 text-sm"
          />

          <Button
            type="button"
            onClick={onForgotPassword}
            variant="ghost"
            size="sm"
            className="text-sm font-medium text-primary-600 hover:text-primary-700 transition-colors"
          >
            Esqueceu sua senha?
          </Button>
        </div>

        <div className="pt-1">
          <Button
            type="submit"
            variant="primary"
            size="lg"
            fullWidth
            isLoading={isLoading}
            className="justify-center py-2.5 text-base font-medium bg-gradient-to-r from-primary-600 to-primary-700 text-white shadow-sm hover:shadow-md hover:from-primary-700 hover:to-primary-800 transition-all duration-200"
          >
            {isLoading ? 'Entrando...' : 'Entrar'}
          </Button>
        </div>
      </form>

    </div>
  );
};

export default LoginForm;
