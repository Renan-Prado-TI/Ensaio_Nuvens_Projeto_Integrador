import { useState, useCallback, useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import type { SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Check, Loader2, Save } from 'lucide-react';
import Button from '@/components/ui/button';
import { Etapa1DadosBasicos } from './Etapa1DadosBasicos';
import { Etapa2Endereco } from './Etapa2Endereco';
import { Etapa3Instrumentos } from './Etapa3Instrumentos';
import { Etapa4Revisao } from './Etapa4Revisao';
import { atualizarBanda } from '../../api/mockBandaService';
import { useBandaDetalhes } from '../../hooks/useBandaDetalhes';

// Tipos para o formulário
type FormValues = {
  logo?: File;
  nome: string;
  nomeArtistico?: string;
  fundacao?: string;
  cnpj?: string;
  telefone: string;
  email: string;
  descricao: string;
  facebook?: string;
  instagram?: string;
  youtube?: string;
  linkedin?: string;
  tiktok?: string;
  site?: string;
  endereco: {
    cep: string;
    logradouro: string;
    numero: string;
    complemento?: string;
    bairro: string;
    cidade: string;
    estado: string;
    referencia?: string;
  };
  instrumentos: Array<{
    id: string;
    nome: string;
    quantidade: number;
  }>;
};

// Esquema de validação para cada etapa (reutilizando do formulário de cadastro)
const esquemaEtapa1 = z.object({
  nome: z.string().min(2, 'O nome deve ter pelo menos 2 caracteres'),
  telefone: z.string()
    .min(1, 'Telefone é obrigatório')
    .regex(/^\(\d{2}\) \d{4,5}-\d{4}$/, 'Formato inválido. Use (00) 00000-0000'),
  email: z.string()
    .min(1, 'Email é obrigatório')
    .email('Por favor, insira um email válido'),
  descricao: z.string().min(10, 'A descrição deve ter pelo menos 10 caracteres'),
  fundacao: z.string().optional()
    .refine(date => {
      if (!date) return true;
      return !isNaN(Date.parse(date));
    }, { message: 'Data de fundação inválida' }),
  facebook: z.string().url('URL inválida').or(z.literal('')).optional(),
  instagram: z.string().url('URL inválida').or(z.literal('')).optional(),
  youtube: z.string().url('URL inválida').or(z.literal('')).optional(),
  linkedin: z.string().url('URL inválida').or(z.literal('')).optional(),
  tiktok: z.string().url('URL inválida').or(z.literal('')).optional(),
  site: z.string().url('URL inválida').or(z.literal('')).optional()
});

const esquemaEtapa2 = z.object({
  endereco: z.object({
    cep: z.string()
      .regex(/^\d{5}-\d{3}$/, 'Formato inválido. Use 00000-000')
      .transform(cep => cep.replace(/\D/g, '')),
    logradouro: z.string().min(3, 'Logradouro inválido'),
    numero: z.string().min(1, 'Número é obrigatório'),
    cidade: z.string().min(2, 'Cidade inválida'),
    estado: z.string().length(2, 'Selecione um estado'),
  })
});

const esquemaEtapa3 = z.object({
  instrumentos: z.array(z.object({
    id: z.string(),
    nome: z.string().min(1, 'Nome do instrumento é obrigatório'),
    quantidade: z.number().min(1, 'A quantidade deve ser pelo menos 1'),
  })).min(1, 'Adicione pelo menos um instrumento')
});

interface FormularioEditarBandaProps {
  onSuccess?: () => void;
  onCancel?: () => void;
}

const FormularioEditarBanda = ({ onSuccess, onCancel }: FormularioEditarBandaProps) => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { banda, loading: loadingBanda, error: errorBanda } = useBandaDetalhes(id);
  const [etapaAtual, setEtapaAtual] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const totalEtapas = 4;

  // Função para obter o resolver baseado na etapa
  const getResolverForStep = useCallback((step: number) => {
    switch (step) {
      case 1: return zodResolver(esquemaEtapa1 as any);
      case 2: return zodResolver(esquemaEtapa2 as any);
      case 3: return zodResolver(esquemaEtapa3 as any);
      default: return undefined;
    }
  }, []);

  // Função para converter dados da banda para o formato do formulário
  const converterBandaParaFormulario = useCallback((banda: any): FormValues => {
    return {
      nome: banda.nome || '',
      nomeArtistico: banda.nomeArtistico || '',
      fundacao: banda.fundacao || '',
      cnpj: banda.cnpj || '',
      telefone: banda.telefone || '',
      email: banda.email || '',
      descricao: banda.descricao || '',
      facebook: banda.redesSociais?.facebook || '',
      instagram: banda.redesSociais?.instagram || '',
      youtube: banda.redesSociais?.youtube || '',
      linkedin: banda.redesSociais?.linkedin || '',
      tiktok: banda.redesSociais?.tiktok || '',
      site: banda.redesSociais?.site || '',
      endereco: {
        cep: banda.endereco?.cep || '',
        logradouro: banda.endereco?.logradouro || '',
        numero: banda.endereco?.numero || '',
        complemento: banda.endereco?.complemento || '',
        bairro: banda.endereco?.bairro || '',
        cidade: banda.endereco?.cidade || '',
        estado: banda.endereco?.estado || '',
        referencia: banda.endereco?.referencia || ''
      },
      instrumentos: banda.instrumentos?.map((instr: any) => ({
        id: instr.id || String(Math.random()),
        nome: instr.nome || '',
        quantidade: 1  // Valor padrão já que o mock não tem quantidade
      })) || []
    };
  }, []);

  const methods = useForm<FormValues>({
    resolver: getResolverForStep(etapaAtual),
    // Removendo defaultValues para evitar conflitos
  });

  const { trigger } = methods;

  // Estado para controlar se a etapa atual é válida
  const [isCurrentStepValid, setIsCurrentStepValid] = useState(false);

  // Estado para rastrear quais etapas foram salvas
  const [etapasSalvas, setEtapasSalvas] = useState<Set<number>>(() => {
    // Tenta carregar etapas salvas do localStorage
    if (typeof window !== 'undefined' && id) {
      const savedData = localStorage.getItem(`banda_edit_${id}`);
      if (savedData) {
        try {
          const parsed = JSON.parse(savedData);
          return new Set(parsed.etapas || []);
        } catch (error) {
          console.error('Erro ao carregar etapas salvas do localStorage:', error);
        }
      }
    }
    return new Set();
  });
  const [dadosSalvos, setDadosSalvos] = useState<Partial<FormValues>>(() => {
    // Tenta carregar dados salvos do localStorage
    if (typeof window !== 'undefined' && id) {
      const savedData = localStorage.getItem(`banda_edit_${id}`);
      if (savedData) {
        try {
          return JSON.parse(savedData);
        } catch (error) {
          console.error('Erro ao carregar dados salvos do localStorage:', error);
        }
      }
    }
    return {};
  });

  // Função para salvar dados no localStorage
  const salvarDadosNoLocalStorage = useCallback((dados: Partial<FormValues>, etapas: Set<number>) => {
    if (typeof window !== 'undefined' && id) {
      try {
        const dataToSave = {
          dados,
          etapas: Array.from(etapas),
          timestamp: Date.now()
        };
        localStorage.setItem(`banda_edit_${id}`, JSON.stringify(dataToSave));
        console.log('Dados salvos no localStorage:', dataToSave);
      } catch (error) {
        console.error('Erro ao salvar dados no localStorage:', error);
      }
    }
  }, [id]);

  // Função para limpar dados do localStorage após edição bem-sucedida
  const limparDadosLocalStorage = useCallback(() => {
    if (typeof window !== 'undefined' && id) {
      try {
        localStorage.removeItem(`banda_edit_${id}`);
        console.log('Dados do localStorage removidos após edição bem-sucedida');
      } catch (error) {
        console.error('Erro ao remover dados do localStorage:', error);
      }
    }
  }, [id]);

  // Função auxiliar para obter os campos de cada etapa
  const getFieldsForStep = useCallback((step: number) => {
    switch (step) {
      case 1:
        return ['nome', 'telefone', 'email', 'descricao'] as const;
      case 2:
        return ['endereco.cep', 'endereco.logradouro', 'endereco.numero', 'endereco.bairro', 'endereco.cidade', 'endereco.estado'] as const;
      case 3:
        return ['instrumentos'] as const;
      case 4:
        // Etapa 4 (revisão) - validar apenas campos obrigatórios básicos
        return ['nome', 'telefone', 'email', 'descricao', 'instrumentos'] as const;
      default:
        return undefined;
    }
  }, []);

  // Atualizar o resolver quando a etapa mudar
  useEffect(() => {
    // Para atualizar o resolver, vamos usar uma abordagem diferente
    // O react-hook-form não permite alterar o resolver dinamicamente
    // Então vamos usar trigger com campos específicos para cada etapa
  }, [etapaAtual]);

  // Atualizar valores do formulário quando a banda carregar
  useEffect(() => {
    if (banda && !loadingBanda && !errorBanda) {
      console.log('=== FormularioEditarBanda ===');
      console.log('Banda carregada:', banda);
      console.log('Atualizando formulário com dados da banda...');

      const formData = converterBandaParaFormulario(banda);
      console.log('Dados convertidos para formulário:', formData);

      // Mesclar com dados salvos no localStorage se existirem
      const dadosMesclados = { ...formData, ...dadosSalvos };

      // Usar setValue para cada campo individualmente
      Object.entries(dadosMesclados).forEach(([key, value]) => {
        methods.setValue(key as keyof FormValues, value, {
          shouldValidate: false,
          shouldDirty: false,
          shouldTouch: false
        });
      });

      console.log('Formulário atualizado com dados da banda e dados salvos:', dadosMesclados);

      // Forçar revalidação após carregar os dados
      setTimeout(async () => {
        const fieldsForCurrentStep = getFieldsForStep(etapaAtual);
        if (fieldsForCurrentStep) {
          const isStepValid = await trigger(fieldsForCurrentStep, { shouldFocus: true });
          setIsCurrentStepValid(isStepValid);
          console.log(`Revalidação da etapa ${etapaAtual} após carregar dados:`, isStepValid);
        } else {
          setIsCurrentStepValid(true);
        }
      }, 100);
    }
  }, [banda, loadingBanda, errorBanda, methods, converterBandaParaFormulario, dadosSalvos]); // Adicionado dadosSalvos

  // Forçar revalidação quando a etapa mudar
  useEffect(() => {
    const validateCurrentStep = async () => {
      const fieldsForCurrentStep = getFieldsForStep(etapaAtual);
      if (fieldsForCurrentStep) {
        const isStepValid = await trigger(fieldsForCurrentStep, { shouldFocus: true });
        setIsCurrentStepValid(isStepValid);
        console.log(`Validação da etapa ${etapaAtual}:`, isStepValid);
      } else {
        setIsCurrentStepValid(true); // Etapa sem validação específica
      }
    };

    validateCurrentStep();
  }, [etapaAtual, methods, trigger, getFieldsForStep]);

  // Função para avançar para a próxima etapa
  const proximaEtapa = useCallback(async () => {
    // Valida apenas os campos da etapa atual
    const fieldsForCurrentStep = getFieldsForStep(etapaAtual);
    const isStepValid = await trigger(fieldsForCurrentStep, { shouldFocus: true });

    if (isStepValid) {
      // Salva os dados da etapa atual
      const currentData = methods.getValues();
      console.log(`=== Salvando dados da etapa ${etapaAtual} ===`);
      console.log('Dados atuais do formulário:', currentData);
      console.log('Dados salvos anteriormente:', dadosSalvos);

      setDadosSalvos((prev: Partial<FormValues>) => {
        const novosDados = { ...prev, ...currentData };
        console.log('Novos dados salvos:', novosDados);

        // Salvar no localStorage
        salvarDadosNoLocalStorage(novosDados, new Set([...Array.from(etapasSalvas), etapaAtual]));

        return novosDados;
      });
      setEtapasSalvas((prev: Set<number>) => new Set([...prev, etapaAtual]));

      console.log(`Dados da etapa ${etapaAtual} salvos:`, currentData);

      const nextEtapa = Math.min(etapaAtual + 1, totalEtapas);
      setEtapaAtual(nextEtapa);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      // Foca no primeiro campo com erro
      const errorElement = document.querySelector('.text-red-600');
      if (errorElement) {
        errorElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  }, [trigger, etapaAtual, totalEtapas, getFieldsForStep, methods]);

  // Volta para a etapa anterior
  const etapaAnterior = () => {
    const prevEtapa = Math.max(etapaAtual - 1, 1);

    // Carrega os dados salvos da etapa anterior apenas se não foram modificados
    if (etapasSalvas.has(prevEtapa)) {
      console.log(`Carregando dados salvos da etapa ${prevEtapa}:`, dadosSalvos);

      // Em vez de reset completo, vamos mesclar os dados salvos com os dados atuais
      // Isso preserva as modificações do usuário
      const currentFormData = methods.getValues();

      // Mescla os dados salvos com os dados atuais do formulário
      const dadosMesclados = { ...currentFormData, ...dadosSalvos };

      methods.reset(dadosMesclados as FormValues, {
        keepValues: false,
        keepDirty: false,
        keepErrors: false,
        keepTouched: false,
        keepIsValid: false,
        keepIsSubmitted: false,
        keepSubmitCount: false
      });
    }

    setEtapaAtual(prevEtapa);
  };

  // Função para formatar os dados para o formato esperado pela API
  const formatarDadosParaAPI = useCallback((data: FormValues): any => {
    console.log('=== formatarDadosParaAPI ===');
    console.log('Dados recebidos:', data);

    const dadosFormatados = {
      nome: data.nome,
      nomeArtistico: data.nomeArtistico || data.nome,
      descricao: data.descricao,
      telefone: data.telefone,
      email: data.email,
      fundacao: data.fundacao || new Date().toISOString().split('T')[0],
      ativa: true,
      ...(data.facebook && { facebook: data.facebook }),
      ...(data.instagram && { instagram: data.instagram }),
      ...(data.youtube && { youtube: data.youtube }),
      ...(data.linkedin && { linkedin: data.linkedin }),
      ...(data.tiktok && { tiktok: data.tiktok }),
      ...(data.site && { site: data.site }),
      endereco: {
        cep: data.endereco.cep,
        logradouro: data.endereco.logradouro,
        numero: data.endereco.numero,
        complemento: data.endereco.complemento || '',
        bairro: data.endereco.bairro,
        cidade: data.endereco.cidade,
        estado: data.endereco.estado,
        referencia: data.endereco.referencia || ''
      },
      instrumentos: data.instrumentos.map(instr => ({
        id: String(instr.id),
        nome: instr.nome,
        quantidade: instr.quantidade,
        descricao: ''
      })),
      dataAtualizacao: new Date().toISOString()
    };

    console.log('Dados formatados:', dadosFormatados);
    return dadosFormatados;
  }, []);

  // Envia o formulário
  const onSubmit: SubmitHandler<FormValues> = useCallback(async (data, event) => {
    const isRealSubmit = event?.type === 'submit';

    if (isSubmitting && isRealSubmit) {
      return;
    }

    try {
      if (isRealSubmit) {
        setIsSubmitting(true);
      }

      const dadosParaEnviar = formatarDadosParaAPI(data);

      if (isRealSubmit) {
        await atualizarBanda(Number(id), dadosParaEnviar);

        console.log('Banda atualizada com sucesso!');

        // Limpar dados do localStorage após edição bem-sucedida
        limparDadosLocalStorage();

        if (onSuccess) {
          console.log('Chamando onSuccess callback...');
          onSuccess();
        } else {
          console.log('Navegando para lista de bandas...');
          navigate('/gestor/bandas', {
            state: {
              showNotification: true,
              message: 'Banda atualizada com sucesso!',
              type: 'success'
            }
          });
        }
      }
    } catch (error) {
      console.error('Erro ao atualizar banda:', error);
      if (isRealSubmit) {
        alert('Ocorreu um erro ao atualizar a banda. Por favor, tente novamente.');
      }
      throw error;
    } finally {
      if (isRealSubmit) {
        setIsSubmitting(false);
      }
    }
  }, [navigate, isSubmitting, formatarDadosParaAPI, id, onSuccess]);

  // Função para lidar com o envio do formulário na etapa de revisão
  const handleSubmitRevisao = useCallback(async () => {
    try {
      console.log('=== handleSubmitRevisao ===');
      console.log('Iniciando validação final...');

      // Validação específica da etapa 4 (revisão)
      const fieldsForCurrentStep = getFieldsForStep(etapaAtual);
      const isStepValid = await trigger(fieldsForCurrentStep, { shouldFocus: true });

      console.log('Validação da etapa 4:', isStepValid);
      console.log('Campos validados:', fieldsForCurrentStep);

      if (!isStepValid) {
        console.log('Validação falhou, abortando...');
        return;
      }

      console.log('Validação passou, obtendo dados salvos...');
      console.log('Dados salvos:', dadosSalvos);
      console.log('Etapas salvas:', Array.from(etapasSalvas));

      // Usa os dados salvos em vez dos dados atuais do formulário
      const dadosParaSubmissao = dadosSalvos as FormValues;

      console.log('Chamando onSubmit com dados salvos...');
      await onSubmit(dadosParaSubmissao, new Event('submit') as any);

      console.log('onSubmit concluído com sucesso');
    } catch (error) {
      console.error('Erro ao enviar formulário:', error);
      alert('Ocorreu um erro ao atualizar a banda. Por favor, tente novamente.');
    }
  }, [methods, onSubmit, trigger, getFieldsForStep, etapaAtual, dadosSalvos]);

  // Renderiza a etapa atual
  const renderizarEtapa = () => {
    switch (etapaAtual) {
      case 1:
        return <Etapa1DadosBasicos />;
      case 2:
        return <Etapa2Endereco />;
      case 3:
        return <Etapa3Instrumentos />;
      case 4:
        return <Etapa4Revisao
          onSubmit={handleSubmitRevisao}
          dadosSalvos={dadosSalvos}
          etapasSalvas={etapasSalvas}
        />;
      default:
        return null;
    }
  };

  // Renderiza o indicador de progresso
  const renderizarProgresso = () => {
    return (
      <div className="w-full mb-8 max-w-3xl mx-auto">
        <div className="relative">
          {/* Linha de progresso */}
          <div className="absolute top-5 left-0 right-0 h-1.5 bg-muted z-0 mx-16">
            <div
              className="h-full bg-gradient-to-r from-primary to-primary/80 transition-all duration-300 rounded-full"
              style={{ width: `${((etapaAtual - 1) / (totalEtapas - 1)) * 100}%` }}
            />
          </div>

          {/* Passos */}
          <div className="relative z-10 flex justify-between">
            {[1, 2, 3, 4].map((etapa) => (
              <div key={etapa} className="flex flex-col items-center flex-1">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center border-2 relative transition-colors duration-300 ${
                    etapa <= etapaAtual
                      ? 'bg-gradient-to-br from-primary to-primary/90 text-white border-primary'
                      : 'bg-background text-muted-foreground border-muted'
                  }`}
                >
                  {etapa < etapaAtual ? (
                    <Check className="w-5 h-5" />
                  ) : (
                    <span className="font-medium">{etapa}</span>
                  )}
                </div>
                <span className={`text-xs mt-2 text-center font-medium transition-colors duration-300 ${
                  etapa <= etapaAtual ? 'text-foreground' : 'text-muted-foreground'
                }`}>
                  {etapa === 1 && 'Dados'}
                  {etapa === 2 && 'Endereço'}
                  {etapa === 3 && 'Instrumentos'}
                  {etapa === 4 && 'Revisão'}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  // Função para lidar com o clique no botão de próxima etapa
  const handleNextClick = async () => {
    if (etapaAtual >= totalEtapas) {
      return;
    }
    await proximaEtapa();
  };

  // Loading state
  if (loadingBanda) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  // Error state
  if (errorBanda) {
    return (
      <div className="text-center py-8">
        <p className="text-red-600 mb-4">Erro ao carregar dados da banda: {errorBanda.message}</p>
        <Button onClick={() => navigate(-1)} variant="outline">
          Voltar
        </Button>
      </div>
    );
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={(e) => e.preventDefault()} className="space-y-8">
        {renderizarProgresso()}

        <div className="space-y-6">
          {renderizarEtapa()}
        </div>

        <div className="flex justify-between pt-6 border-t">
          <div>
            {etapaAtual > 1 && (
              <Button
                type="button"
                variant="outline"
                onClick={etapaAnterior}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Voltar
              </Button>
            )}
          </div>

          <div className="flex gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={onCancel || (() => navigate(-1))}
            >
              Cancelar
            </Button>

            {etapaAtual < totalEtapas ? (
              <Button
                type="button"
                onClick={handleNextClick}
                disabled={!isCurrentStepValid || isSubmitting}
              >
                {isSubmitting ? 'Salvando...' : 'Próximo'}
                {!isSubmitting && <ArrowRight className="w-4 h-4 ml-2" />}
              </Button>
            ) : (
              <Button
                type="button"
                onClick={handleSubmitRevisao}
                disabled={isSubmitting}
                className="min-w-[180px]"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Salvando...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Salvar Alterações
                  </>
                )}
              </Button>
            )}
          </div>
        </div>
      </form>
    </FormProvider>
  );
};

export { FormularioEditarBanda };
