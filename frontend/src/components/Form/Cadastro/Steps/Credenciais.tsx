import React, { useState, useEffect } from 'react';
import type { Credenciais } from '../../../../types/cadastro';

interface CredenciaisStepProps {
  data: Credenciais;
  updateData: (data: Credenciais) => void;
}

const CredenciaisStep: React.FC<CredenciaisStepProps> = ({ data, updateData }) => {
  const [formData, setFormData] = useState<Credenciais>(data);
  const [passwordStrength, setPasswordStrength] = useState<number>(0);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const [showTypeError, setShowTypeError] = useState(false);

  useEffect(() => {
    // Validar se pelo menos um tipo foi selecionado
    if (formData.tipoUsuario.length > 0) {
      setShowTypeError(false);
      updateData(formData);
    } else {
      setShowTypeError(true);
    }
  }, [formData]);

  useEffect(() => {
    // Validar força da senha
    if (formData.senha) {
      let strength = 0;
      if (formData.senha.length >= 8) strength += 1;
      if (formData.senha.match(/[a-z]+/)) strength += 1;
      if (formData.senha.match(/[A-Z]+/)) strength += 1;
      if (formData.senha.match(/[0-9]+/)) strength += 1;
      if (formData.senha.match(/[!@#$%^&*(),.?":{}|<>]+/)) strength += 1;
      setPasswordStrength(strength);

      // Validar confirmação de senha
      if (formData.confirmarSenha && formData.senha !== formData.confirmarSenha) {
        setPasswordError('As senhas não coincidem');
      } else {
        setPasswordError('');
      }
    } else {
      setPasswordStrength(0);
    }
  }, [formData.senha, formData.confirmarSenha]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    
    if (type === 'checkbox') {
      const newTipos = [...formData.tipoUsuario];
      if (checked) {
        newTipos.push(value as 'musico' | 'gestor');
      } else {
        const index = newTipos.indexOf(value as 'musico' | 'gestor');
        if (index > -1) {
          newTipos.splice(index, 1);
        }
      }
      setFormData(prev => ({
        ...prev,
        tipoUsuario: newTipos
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const getPasswordStrengthColor = (strength: number) => {
    if (strength <= 1) return 'bg-red-500';
    if (strength <= 3) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const getPasswordStrengthText = (strength: number) => {
    if (strength <= 1) return 'Fraca';
    if (strength <= 3) return 'Média';
    return 'Forte';
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Credenciais de Acesso</h2>
      
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          E-mail
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm p-2 border"
        />
      </div>
      
      <div>
        <label htmlFor="senha" className="block text-sm font-medium text-gray-700">
          Senha
        </label>
        <div className="mt-1 relative rounded-md shadow-sm">
          <input
            type={showPassword ? "text" : "password"}
            id="senha"
            name="senha"
            value={formData.senha}
            onChange={handleChange}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm p-2 border pr-10"
            />
          <button
            type="button"
            className="absolute inset-y-0 right-0 pr-3 flex items-center"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
              </svg>
            ) : (
              <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            )}
          </button>
        </div>
        {formData.senha && (
          <div className="mt-2">
            <div className="flex items-center">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full ${getPasswordStrengthColor(passwordStrength)}`}
                  style={{ width: `${(passwordStrength / 5) * 100}%` }}
                ></div>
              </div>
              <span className="ml-2 text-xs text-gray-500">
                {getPasswordStrengthText(passwordStrength)}
              </span>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Use pelo menos 8 caracteres, incluindo letras maiúsculas, minúsculas, números e símbolos.
            </p>
          </div>
        )}
      </div>
      
      <div>
        <label htmlFor="confirmarSenha" className="block text-sm font-medium text-gray-700">
          Confirmar Senha
        </label>
        <div className="mt-1 relative rounded-md shadow-sm">
          <input
            type={showConfirmPassword ? "text" : "password"}
            id="confirmarSenha"
            name="confirmarSenha"
            value={formData.confirmarSenha}
            onChange={handleChange}
            className={`block w-full rounded-md border-gray-300 shadow-sm focus:ring-purple-500 sm:text-sm p-2 border pr-10 ${
              passwordError ? 'border-red-500 focus:border-red-500' : 'focus:border-purple-500'
            }`}
            />
          <button
            type="button"
            className="absolute inset-y-0 right-0 pr-3 flex items-center"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            {showConfirmPassword ? (
              <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
              </svg>
            ) : (
              <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            )}
          </button>
        </div>
        {passwordError && (
          <p className="mt-1 text-sm text-red-600">{passwordError}</p>
        )}
      </div>
      
      <div className="pt-4 border-t border-gray-200">
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Eu sou:
        </label>
        <div className="space-y-3">
          <div className="space-y-2">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="musico"
                name="tipoUsuario"
                value="musico"
                checked={formData.tipoUsuario.includes('musico')}
                onChange={handleChange}
                className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
              />
              <label htmlFor="musico" className="ml-2 block text-sm text-gray-700">
                Músico
              </label>
            </div>
            
            <div className="flex items-center">
              <input
                type="checkbox"
                id="gestor"
                name="tipoUsuario"
                value="gestor"
                checked={formData.tipoUsuario.includes('gestor')}
                onChange={handleChange}
                className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
              />
              <label htmlFor="gestor" className="ml-2 block text-sm text-gray-700">
                Gestor de Banda/Orquestra
              </label>
            </div>
            
            {showTypeError && (
              <p className="mt-1 text-sm text-red-600">Selecione pelo menos um tipo de conta</p>
            )}
            
            <p className="mt-1 text-xs text-gray-500">
              Você pode selecionar mais de uma opção se for tanto músico quanto gestor.
              {formData.tipoUsuario.includes('musico') && ' A etapa de Instrumentos será exibida.'}
              {formData.tipoUsuario.includes('gestor') && ' A etapa de Dados da Banda será exibida.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CredenciaisStep;
