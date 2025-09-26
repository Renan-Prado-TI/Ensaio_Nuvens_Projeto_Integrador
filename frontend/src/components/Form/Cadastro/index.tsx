import React, { useState, useEffect } from 'react';
import type { ReactElement } from 'react';
import { useNavigate } from 'react-router-dom';

// Types
type DadosPessoais = {
  nomeCompleto: string;
  cpf: string;
  dataNascimento: string;
  telefone: string;
};

type Endereco = {
  cep: string;
  tipoLogradouro: string;
  logradouro: string;
  numero: string;
  complemento: string;
  bairro: string;
  cidade: string;
  estado: string;
};

type Credenciais = {
  email: string;
  senha: string;
  confirmarSenha: string;
  tipoUsuario: string[];
};

type DadosMusico = {
  instrumentos: string[];
};

type DadosGestor = {
  nomeBanda: string;
  telefone: string;
  descricao: string;
};

export interface CadastroFormData {
  dadosPessoais: DadosPessoais;
  endereco: Endereco;
  credenciais: Credenciais;
  dadosMusico?: DadosMusico;
  dadosGestor?: DadosGestor;
}
import {
  DadosPessoais as DadosPessoaisStep,
  Endereco as EnderecoStep,
  Credenciais as CredenciaisStep,
  Instrumentos as InstrumentosStep,
  DadosBanda as DadosBandaStep
} from './Steps';
import ProgressSteps from '@/components/Form/Cadastro/ProgressSteps';

const CadastroForm: React.FC = () => {
  const [step, setStep] = useState<number>(1);
  const [formData, setFormData] = useState<CadastroFormData>({
    dadosPessoais: {
      nomeCompleto: '',
      cpf: '',
      dataNascimento: '',
      telefone: ''
    },
    endereco: {
      cep: '',
      tipoLogradouro: 'Rua',
      logradouro: '',
      numero: '',
      complemento: '',
      bairro: '',
      cidade: '',
      estado: 'SP'
    },
    credenciais: {
      email: '',
      senha: '',
      confirmarSenha: '',
      tipoUsuario: []
    },
    dadosMusico: {
      instrumentos: []
    },
    dadosGestor: {
      nomeBanda: '',
      telefone: '',
      descricao: ''
    }
  });

  const navigate = useNavigate();
  
  // Função para voltar para a etapa anterior
  const prevStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };
  
  // Calcular o total de etapas com base no tipo de usuário
  const calculateTotalSteps = () => {
    const isMusico = formData.credenciais.tipoUsuario.includes('musico');
    const isGestor = formData.credenciais.tipoUsuario.includes('gestor');
    
    // Etapas fixas: Dados Pessoais, Endereço, Credenciais
    let total = 3;
    
    // Adiciona 1 se for músico (Instrumentos)
    if (isMusico) total++;
    
    // Adiciona 1 se for gestor (Dados da Banda)
    if (isGestor) total++;
    
    console.log('Calculando total de etapas:', { isMusico, isGestor, total });
    return total;
  };
  
  // Estado para armazenar o total de etapas
  const [totalSteps, setTotalSteps] = useState(calculateTotalSteps());
  
  // Recalcular totalSteps sempre que o tipo de usuário mudar
  useEffect(() => {
    const newTotalSteps = calculateTotalSteps();
    setTotalSteps(newTotalSteps);
    
    // Se o passo atual for maior que o novo total de etapas, ajustar para o último passo disponível
    if (step > newTotalSteps) {
      setStep(newTotalSteps);
    }
  }, [formData.credenciais.tipoUsuario]);
  
  // Ajustar o step se ele for maior que o total de etapas disponíveis
  useEffect(() => {
    if (step > totalSteps) {
      setStep(totalSteps);
    }
  }, [totalSteps, step]);

  // Função para avançar para a próxima etapa
  const nextStep = () => {
    // Verificar se está na etapa de credenciais e se pelo menos um tipo foi selecionado
    if (step === 3 && formData.credenciais.tipoUsuario.length === 0) {
      alert('Selecione pelo menos um tipo de conta (Músico e/ou Gestor)');
      return;
    }
    
    if (validateStep(step) && step < totalSteps) {
      setStep(step + 1);
    }
  };
  
  // Validate current step
  const validateStep = (currentStep: number): boolean => {
    // Add validation logic for each step
    switch (currentStep) {
      case 1: // Dados Pessoais
        if (!formData.dadosPessoais.nomeCompleto.trim()) {
          alert('Por favor, preencha o nome completo');
          return false;
        }
        // Add more validations as needed
        break;
      // Add validation for other steps
    }
    return true;
  };
  
  // Verificar se o botão de próxima etapa deve estar desabilitado
  const isNextButtonDisabled = (): boolean => {
    // Desabilitar se estiver na etapa de credenciais e nenhum tipo for selecionado
    if (step === 3 && formData.credenciais.tipoUsuario.length === 0) {
      return true;
    }
    return false;
  };

  // Função para envio do formulário
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validação final antes do envio
    if (formData.credenciais.tipoUsuario.length === 0) {
      alert('Selecione pelo menos um tipo de conta (Músico e/ou Gestor)');
      return;
    }
    
    if (formData.credenciais.senha !== formData.credenciais.confirmarSenha) {
      alert('As senhas não coincidem');
      return;
    }
    
    // Validação de campos obrigatórios
    if (!formData.dadosPessoais.nomeCompleto.trim()) {
      alert('Por favor, preencha o nome completo');
      return;
    }
    
    // Validação de e-mail
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.credenciais.email)) {
      alert('Por favor, insira um e-mail válido');
      return;
    }
    
    // Validação de senha (mínimo de 6 caracteres)
    if (formData.credenciais.senha.length < 6) {
      alert('A senha deve ter pelo menos 6 caracteres');
      return;
    }
    
    console.log('Dados do formulário para envio:', formData);
    
    // Aqui você pode adicionar a lógica de envio para a API
    // Exemplo:
    // try {
    //   const response = await api.post('/usuarios', formData);
    //   console.log('Resposta da API:', response.data);
    //   
    //   // Mostra alerta de sucesso
    //   alert('Cadastro realizado com sucesso! Você será redirecionado para a página de login.');
    //   
    //   // Redireciona para a página de login
    //   navigate('/login');
    // } catch (error) {
    //   console.error('Erro ao cadastrar:', error);
    //   alert('Ocorreu um erro ao realizar o cadastro. Por favor, tente novamente.');
    // }
    
    // Simulação de sucesso (remover quando implementar a API)
    alert('Cadastro realizado com sucesso! Você será redirecionado para a página de login.');
    navigate('/login');
  };

  const updateFormData = <K extends keyof CadastroFormData>(
    field: K,
    value: CadastroFormData[K]
  ) => {
    setFormData({
      ...formData,
      [field]: value
    });
  };

  const renderStep = (): ReactElement => {
    // Determinar o tipo de usuário
    const isMusico = formData.credenciais.tipoUsuario.includes('musico');
    const isGestor = formData.credenciais.tipoUsuario.includes('gestor');
    
    // Mapear as etapas baseado no tipo de usuário
    const steps = [
      // Etapa 1: Dados Pessoais
      {
        component: (
          <DadosPessoaisStep
            key="dados-pessoais"
            data={formData.dadosPessoais}
            updateData={(data: DadosPessoais) => updateFormData('dadosPessoais', data)}
          />
        ),
        show: true
      },
      // Etapa 2: Endereço
      {
        component: (
          <EnderecoStep
            key="endereco"
            data={formData.endereco}
            updateData={(data: Endereco) => updateFormData('endereco', data)}
          />
        ),
        show: true
      },
      // Etapa 3: Credenciais
      {
        component: (
          <CredenciaisStep
            key="credenciais"
            data={formData.credenciais}
            updateData={(data: Credenciais) => updateFormData('credenciais', data)}
          />
        ),
        show: true
      },
      // Etapa 4: Instrumentos (apenas para músicos)
      {
        component: (
          <InstrumentosStep
            key="instrumentos"
            data={formData.dadosMusico || { instrumentos: [] }}
            updateData={(data: DadosMusico) => updateFormData('dadosMusico', data)}
          />
        ),
        show: isMusico
      },
      // Etapa 5: Dados da Banda (apenas para gestores)
      {
        component: (
          <DadosBandaStep
            key="dados-banda"
            data={formData.dadosGestor || { nomeBanda: '', telefone: '', descricao: '' }}
            updateData={(data: DadosGestor) => updateFormData('dadosGestor', data)}
          />
        ),
        show: isGestor
      }
    ];
    
    // Filtrar etapas visíveis
    const visibleSteps = steps.filter(step => step.show);
    
    // Verificar se o passo atual é válido
    if (step < 1 || step > visibleSteps.length) {
      return <div className="p-4 text-red-600">Etapa inválida. Por favor, recarregue a página.</div>;
    }
    
    // Retornar o componente da etapa atual
    return visibleSteps[step - 1].component;
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-8">
      {/* Barra de progresso */}
      <div className="mb-4">
        <ProgressSteps 
          currentStep={step} 
          totalSteps={totalSteps} 
          isMusico={formData.credenciais.tipoUsuario.includes('musico')}
          isGestor={formData.credenciais.tipoUsuario.includes('gestor')}
        />
      </div>
      
      {/* Conteúdo do formulário */}
      <div className="w-full bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        {renderStep()}
      </div>
      
      {/* Botões de navegação */}
      <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-100">
        {/* Botão Voltar */}
        <div className="w-full sm:w-1/3">
          <button
            type="button"
            onClick={prevStep}
            disabled={step === 1}
            className={`px-6 py-3 rounded-lg font-medium transition-all w-full text-sm ${
              step === 1
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow-sm'
            }`}
          >
            Voltar
          </button>
        </div>
        
        {/* Botão Próximo/Finalizar */}
        <div className="w-full sm:w-2/3">
          {step < totalSteps ? (
            <button
              type="button"
              onClick={nextStep}
              disabled={isNextButtonDisabled()}
              className={`px-6 py-3 rounded-lg font-medium transition-all w-full text-sm ${
                isNextButtonDisabled()
                  ? 'bg-purple-300 text-white cursor-not-allowed shadow-sm'
                  : 'bg-gradient-to-r from-purple-600 to-purple-700 text-white hover:from-purple-700 hover:to-purple-800 shadow-sm hover:shadow-md'
              }`}
            >
              Próximo
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSubmit}
              className="px-6 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg font-medium hover:from-green-700 hover:to-green-800 transition-all w-full text-sm shadow-sm hover:shadow-md"
            >
              Finalizar Cadastro
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CadastroForm;
