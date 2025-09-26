import { useState, useCallback, useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import type { SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useNavigate } from 'react-router-dom';
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
  id: string;
  onSuccess?: () => void;
  onCancel?: () => void;
}

const FormularioEditarBanda = ({ id, onSuccess, onCancel }: FormularioEditarBandaProps) => {
  console.log('=== FormularioEditarBanda ===');
  console.log('ID recebido:', id, 'Tipo:', typeof id);
  
  const navigate = useNavigate();
  const { 
    banda, 
    loading: loadingBanda, 
    error: errorBanda,
    recarregar: recarregarBanda
  } = useBandaDetalhes(id);
  
  console.log('Estado do hook useBandaDetalhes:', { 
    banda: banda ? 'Encontrada' : 'Não encontrada', 
    loading: loadingBanda, 
    error: errorBanda,
    hasId: !!id
  });
  
  // Efeito para depuração
  useEffect(() => {
    console.log('FormularioEditarBanda - Efeito com ID:', id);
    
    if (!id) {
      console.error('Nenhum ID fornecido para o FormularioEditarBanda');
      return;
    }
    
    console.log(`Carregando dados da banda com ID: ${id} (tipo: ${typeof id})`);
    
    // Força o recarregamento dos dados quando o ID mudar
    recarregarBanda();
  }, [id, recarregarBanda]);
  
  if (banda) {
    console.log('Dados da banda:', JSON.stringify(banda, null, 2));
  }
  
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
    if (!banda) {
      throw new Error('Dados da banda não disponíveis');
    }

    console.log('Convertendo banda para formulário:', banda);
    
    // Função auxiliar para garantir que strings vazias não sejam convertidas para null/undefined
    const safeString = (value: any): string => {
      return value != null ? String(value) : '';
    };
    
    // Verifica se as redes sociais estão no formato correto
    let redesSociais: {
      facebook?: string;
      instagram?: string;
      youtube?: string;
      linkedin?: string;
      tiktok?: string;
      site?: string;
    } = {};
    
    if (banda.redesSociais && typeof banda.redesSociais === 'object') {
      // Se as redes sociais estiverem em um objeto redesSociais
      const rs = banda.redesSociais;
      redesSociais = {
        facebook: safeString(rs.facebook),
        instagram: safeString(rs.instagram),
        youtube: safeString(rs.youtube),
        linkedin: safeString(rs.linkedin),
        tiktok: safeString(rs.tiktok),
        site: safeString(rs.site)
      };
    } else if (banda.facebook || banda.instagram || banda.youtube || banda.linkedin || banda.tiktok || banda.site) {
      // Se as redes sociais estiverem no nível superior
      redesSociais = {
        facebook: safeString(banda.facebook),
        instagram: safeString(banda.instagram),
        youtube: safeString(banda.youtube),
        linkedin: safeString(banda.linkedin),
        tiktok: safeString(banda.tiktok),
        site: safeString(banda.site)
      };
    }

    // Garante que o endereço existe e tem os campos necessários
    const endereco = banda.endereco || {};
    
    // Garante que os instrumentos existem e estão no formato correto
    let instrumentos = [];
    if (Array.isArray(banda.instrumentos) && banda.instrumentos.length > 0) {
      instrumentos = banda.instrumentos.map((instr: any) => ({
        id: instr.id || crypto.randomUUID(),
        nome: instr.nome ? String(instr.nome) : 'Novo Instrumento',
        quantidade: typeof instr.quantidade === 'number' ? Math.max(1, parseInt(instr.quantidade, 10)) : 1
      }));
    } else {
      // Se não houver instrumentos, adiciona um padrão
      instrumentos = [{
        id: crypto.randomUUID(),
        nome: 'Vocal',
        quantidade: 1
      }];
    }

    // Formata a data de fundação se existir
    let dataFundacao = '';
    if (banda.fundacao) {
      // Se for uma string de data ISO, converte para o formato YYYY-MM-DD
      if (typeof banda.fundacao === 'string' && banda.fundacao.includes('T')) {
        const date = new Date(banda.fundacao);
        if (!isNaN(date.getTime())) {
          dataFundacao = date.toISOString().split('T')[0];
        }
      } else {
        dataFundacao = safeString(banda.fundacao);
      }
    }

    const dadosFormatados: FormValues = {
      nome: safeString(banda.nome),
      nomeArtistico: safeString(banda.nomeArtistico),
      fundacao: dataFundacao,
      cnpj: safeString(banda.cnpj),
      telefone: safeString(banda.telefone),
      email: safeString(banda.email),
      descricao: safeString(banda.descricao),
      // Redes sociais
      facebook: redesSociais.facebook || '',
      instagram: redesSociais.instagram || '',
      youtube: redesSociais.youtube || '',
      linkedin: redesSociais.linkedin || '',
      tiktok: redesSociais.tiktok || '',
      site: redesSociais.site || '',
      // Endereço
      endereco: {
        cep: safeString(endereco.cep),
        logradouro: safeString(endereco.logradouro),
        numero: safeString(endereco.numero),
        complemento: safeString(endereco.complemento),
        bairro: safeString(endereco.bairro),
        cidade: safeString(endereco.cidade),
        estado: safeString(endereco.estado),
        referencia: safeString(endereco.referencia)
      },
      // Instrumentos
      instrumentos
    };
    
    console.log('Dados formatados para o formulário:', dadosFormatados);

    console.log('Dados formatados para o formulário:', dadosFormatados);
    return dadosFormatados;
  }, []);

  // Valores padrão para o formulário
  const defaultValues: FormValues = {
    nome: '',
    nomeArtistico: '',
    fundacao: '',
    cnpj: '',
    telefone: '',
    email: '',
    descricao: '',
    facebook: '',
    instagram: '',
    youtube: '',
    linkedin: '',
    tiktok: '',
    site: '',
    endereco: {
      cep: '',
      logradouro: '',
      numero: '',
      complemento: '',
      bairro: '',
      cidade: '',
      estado: '',
      referencia: ''
    },
    instrumentos: [{
      id: crypto.randomUUID(),
      nome: 'Vocal',
      quantidade: 1
    }]
  };

  const methods = useForm<FormValues>({
    resolver: getResolverForStep(etapaAtual),
    defaultValues: defaultValues,
    mode: 'onChange'
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
  
  const [dadosSalvos, setDadosSalvos] = useState<Partial<FormValues>>({});
  
  // Efeito para carregar os dados da banda quando ela for carregada
  useEffect(() => {
    if (banda && !loadingBanda && !errorBanda) {
      console.log('Banda carregada, convertendo para formulário...');
      
      // Verifica se já temos os dados da banda
      if (Object.keys(banda).length === 0) {
        console.warn('A banda foi carregada, mas está vazia. Verifique os dados da API.');
        return;
      }
      
      try {
        console.log('Dados brutos da banda recebidos:', banda);
        
        // Converte os dados da banda para o formato do formulário
        const dadosFormatados = converterBandaParaFormulario(banda);
        console.log('Dados formatados para o formulário:', dadosFormatados);
        
        // Atualiza o formulário com os dados da banda
        methods.reset(dadosFormatados, {
          keepDefaultValues: false, // Sobrescreve os valores padrão
          keepDirty: false, // Marca todos os campos como não alterados
          keepErrors: false, // Limpa os erros
          keepIsValid: false, // Revalida o formulário
          keepTouched: false, // Marca todos os campos como não tocados
          keepIsSubmitted: false, // Reseta o estado de submissão
          keepSubmitCount: false // Reseta o contador de submissões
        });
        
        // Atualiza os dados salvos
        setDadosSalvos(dadosFormatados);
        console.log('Dados da banda carregados no formulário com sucesso!');
        
        // Marca a primeira etapa como salva
        setEtapasSalvas(prev => {
          const novasEtapas = new Set(prev);
          novasEtapas.add(1);
          return novasEtapas;
        });
        
        console.log('Formulário preenchido com os dados da banda');
      } catch (error) {
        console.error('Erro ao carregar dados da banda no formulário:', error);
      }
    } else if (errorBanda) {
      console.error('Erro ao carregar banda:', errorBanda);
    }
  }, [banda, loadingBanda, errorBanda, converterBandaParaFormulario, methods]);

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
      console.log('=== FormularioEditarBanda - Atualizando formulário ===');
      
      try {
        // Verifica se já temos os dados da banda
        if (Object.keys(banda).length === 0) {
          console.warn('A banda foi carregada, mas está vazia. Verifique os dados da API.');
          return;
        }

        console.log('Dados brutos da banda recebidos:', banda);
        
        // Converte os dados da banda para o formato do formulário
        const formData = converterBandaParaFormulario(banda);
        console.log('Dados formatados para o formulário:', formData);

        // Mesclar com dados salvos no localStorage se existirem
        const dadosMesclados = { ...formData, ...dadosSalvos };
        console.log('Dados mesclados (banda + salvos):', dadosMesclados);

        // Usar reset para atualizar todos os valores de uma vez
        // Isso é mais eficiente do que chamar setValue para cada campo
        methods.reset(dadosMesclados, {
          keepDefaultValues: false,
          keepDirty: false,
          keepErrors: false,
          keepIsValid: false,
          keepTouched: false,
          keepIsSubmitted: false,
          keepSubmitCount: false
        });

        console.log('Formulário atualizado com sucesso!');

        // Forçar revalidação após carregar os dados
        const revalidarEtapa = async () => {
          const fieldsForCurrentStep = getFieldsForStep(etapaAtual);
          if (fieldsForCurrentStep && fieldsForCurrentStep.length > 0) {
            console.log(`Revalidando campos da etapa ${etapaAtual}:`, fieldsForCurrentStep);
            const isStepValid = await trigger(fieldsForCurrentStep, { 
              shouldFocus: true 
            });
            setIsCurrentStepValid(isStepValid);
            console.log(`Revalidação da etapa ${etapaAtual} após carregar dados:`, isStepValid);
          } else {
            console.log(`Nenhum campo para validar na etapa ${etapaAtual}, marcando como válida`);
            setIsCurrentStepValid(true);
          }
        };

        // Usar um pequeno atraso para garantir que o DOM foi atualizado
        const timer = setTimeout(() => {
          revalidarEtapa().catch(console.error);
        }, 50);

        return () => clearTimeout(timer);
      } catch (error) {
        console.error('Erro ao atualizar formulário com dados da banda:', error);
      }
    }
  }, [banda, loadingBanda, errorBanda, methods, converterBandaParaFormulario, dadosSalvos, etapaAtual, trigger, getFieldsForStep]);

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
    console.log('Dados recebidos para formatação:', data);
    
    // Função auxiliar para limpar strings (remover espaços em branco e verificar se está vazia)
    const cleanString = (value: any): string | undefined => {
      if (value === null || value === undefined) return undefined;
      const str = String(value).trim();
      return str.length > 0 ? str : undefined;
    };
    
    // Função para limpar objeto de redes sociais
    const cleanRedesSociais = (redes: any) => {
      const result: Record<string, string> = {};
      
      if (!redes) return result;
      
      const camposRedesSociais = ['facebook', 'instagram', 'youtube', 'linkedin', 'tiktok', 'site'];
      
      camposRedesSociais.forEach(campo => {
        const valor = cleanString(redes[campo]);
        if (valor) {
          result[campo] = valor;
        }
      });
      
      return result;
    };

    // Prepara o objeto de redes sociais usando a função cleanRedesSociais
    const redesSociais = cleanRedesSociais({
      facebook: data.facebook,
      instagram: data.instagram,
      youtube: data.youtube,
      linkedin: data.linkedin,
      tiktok: data.tiktok,
      site: data.site
    });
    
    console.log('Redes sociais formatadas:', redesSociais);

    const dadosFormatados = {
      nome: data.nome,
      nomeArtistico: data.nomeArtistico || data.nome,
      descricao: data.descricao,
      telefone: data.telefone,
      email: data.email,
      fundacao: data.fundacao || new Date().toISOString().split('T')[0],
      ativa: true,
      ...(Object.keys(redesSociais).length > 0 && { redesSociais }), // Inclui redesSociais apenas se houver alguma
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

    // Se já estiver enviando e for uma submissão real, não faz nada
    if (isSubmitting && isRealSubmit) {
      console.log('Submissão já em andamento, ignorando chamada duplicada.');
      return;
    }

    try {
      console.log('=== Iniciando submissão do formulário ===');
      
      // Se for uma submissão real, atualiza o estado de carregamento
      if (isRealSubmit) {
        console.log('Submissão real, ativando estado de carregamento...');
        setIsSubmitting(true);
      }

      // Formata os dados para o formato esperado pela API
      console.log('Formatando dados para envio...');
      const dadosParaEnviar = formatarDadosParaAPI(data);
      console.log('Dados formatados para envio:', dadosParaEnviar);

      // Se for uma submissão real, envia os dados para a API
      if (isRealSubmit) {
        try {
          console.log('Enviando dados para a API...');
          const bandaAtualizada = await atualizarBanda(Number(id), dadosParaEnviar);
          
          if (!bandaAtualizada) {
            throw new Error('A API não retornou os dados da banda atualizada');
          }
          
          console.log('Banda atualizada com sucesso!', bandaAtualizada);

          // Limpar dados do localStorage após edição bem-sucedida
          console.log('Limpando dados salvos do localStorage...');
          limparDadosLocalStorage();

          // Executa o callback de sucesso se fornecido
          if (onSuccess) {
            console.log('Chamando onSuccess callback...');
            onSuccess();
          } else {
            // Redireciona para a lista de bandas com mensagem de sucesso
            console.log('Navegando para lista de bandas...');
            navigate('/gestor/bandas', {
              state: {
                showNotification: true,
                message: 'Banda atualizada com sucesso!',
                type: 'success',
                timestamp: Date.now() // Garante que a mensagem seja exibida
              },
              replace: true // Substitui a entrada atual no histórico de navegação
            });
          }
          
          return bandaAtualizada;
        } catch (apiError) {
          console.error('Erro ao chamar a API de atualização:', apiError);
          throw apiError; // Re-lança o erro para ser tratado no bloco catch externo
        }
      }
      
      return dadosParaEnviar; // Retorna os dados formatados mesmo em preview
    } catch (error) {
      console.error('Erro ao processar o formulário:', error);
      
      // Se for uma submissão real, exibe mensagem de erro para o usuário
      if (isRealSubmit) {
        // Aqui você pode adicionar lógica para exibir uma notificação mais sofisticada
        alert('Ocorreu um erro ao atualizar a banda. Por favor, verifique os dados e tente novamente.');
      }
      
      // Re-lança o erro para que possa ser tratado por quem chamou a função
      throw error;
    } finally {
      // Se for uma submissão real, desativa o estado de carregamento
      if (isRealSubmit) {
        console.log('Finalizando submissão, desativando estado de carregamento...');
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
        console.log('Validação falhou, exibindo erros...');
        // Rola até o primeiro erro
        const errorElement = document.querySelector('.text-red-600');
        if (errorElement) {
          errorElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
        return;
      }

      console.log('Validação passou, obtendo dados atuais do formulário...');
      
      // Obtém os dados atuais do formulário em vez de usar os dados salvos
      // Isso garante que quaisquer alterações feitas na etapa de revisão sejam incluídas
      const dadosAtuais = methods.getValues();
      console.log('Dados atuais do formulário:', dadosAtuais);

      console.log('Chamando onSubmit com dados atuais...');
      await onSubmit(dadosAtuais, new Event('submit') as any);

      console.log('onSubmit concluído com sucesso');
    } catch (error) {
      console.error('Erro ao enviar formulário:', error);
      // Define a mensagem de erro global
      setErroGlobal('Ocorreu um erro ao salvar as alterações. Verifique os dados e tente novamente.');
      
      // Rola para o topo para mostrar a mensagem de erro
      window.scrollTo({ top: 0, behavior: 'smooth' });
      
      // Re-lança o erro para que possa ser tratado por quem chamou a função
      throw error;
    }
  }, [methods, onSubmit, trigger, getFieldsForStep, etapaAtual]);

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
          <div className="absolute top-5 left-0 right-0 h-1.5 bg-gray-200 z-0 mx-16 rounded-full">
            <div
              className="h-full bg-gradient-to-r from-primary-500 to-primary-600 transition-all duration-300 rounded-full"
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
                      ? 'bg-gradient-to-br from-primary-600 to-primary-700 text-white border-primary-600'
                      : 'bg-white text-gray-400 border-gray-200'
                  }`}
                >
                  {etapa < etapaAtual ? (
                    <Check className="w-5 h-5" />
                  ) : (
                    <span className="font-medium">{etapa}</span>
                  )}
                </div>
                <span className={`text-xs mt-2 text-center font-medium transition-colors duration-300 ${
                  etapa <= etapaAtual ? 'text-primary-800 font-semibold' : 'text-gray-500'
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

  // Estado para controlar mensagens de erro globais
  const [erroGlobal, setErroGlobal] = useState<string | null>(null);

  // Limpa a mensagem de erro global após 5 segundos
  useEffect(() => {
    if (erroGlobal) {
      const timer = setTimeout(() => {
        setErroGlobal(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [erroGlobal]);
  
  // Limpa os dados do localStorage quando o componente for desmontado
  useEffect(() => {
    return () => {
      console.log('Componente FormularioEditarBanda desmontado, limpando dados do localStorage...');
      if (id) {
        localStorage.removeItem(`banda_edit_${id}`);
      }
    };
  }, [id]);

  // Loading state - com feedback mais rico
  if (loadingBanda) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] space-y-4">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-primary-100 border-t-primary-500 rounded-full animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <svg className="w-8 h-8 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
        </div>
        <h3 className="text-lg font-medium text-gray-900">Carregando dados da banda...</h3>
        <p className="text-sm text-gray-500">Isso pode levar alguns instantes.</p>
      </div>
    );
  }

  // Error state - com mais detalhes e opções de recuperação
  if (errorBanda) {
    return (
      <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-sm border border-red-100">
        <div className="flex flex-col items-center text-center space-y-4">
          <div className="p-3 bg-red-50 rounded-full">
            <svg className="w-8 h-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          
          <h2 className="text-xl font-bold text-gray-900">Erro ao carregar os dados da banda</h2>
          
          <div className="text-left w-full bg-red-50 p-4 rounded-md">
            <p className="text-red-700 font-medium">Detalhes do erro:</p>
            <p className="text-red-600 text-sm mt-1">{errorBanda.message || 'Erro desconhecido'}</p>
            <p className="text-xs text-red-500 mt-2">Se o problema persistir, entre em contato com o suporte.</p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3 w-full mt-4">
            <Button 
              onClick={() => window.location.reload()} 
              variant="outline" 
              className="flex-1 border-red-200 text-red-700 hover:bg-red-50 hover:border-red-300"
            >
              Tentar novamente
            </Button>
            <Button 
              onClick={() => navigate(-1)} 
              variant="outline" 
              className="flex-1"
            >
              Voltar para a lista
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Componente de notificação de erro global
  const NotificacaoErro = () => {
    if (!erroGlobal) return null;
    
    return (
      <div className="fixed top-4 right-4 z-50 max-w-sm w-full">
        <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-md shadow-lg">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-red-800">
                {erroGlobal}
              </p>
            </div>
            <div className="ml-auto pl-3">
              <div className="-mx-1.5 -my-1.5">
                <button
                  type="button"
                  onClick={() => setErroGlobal(null)}
                  className="inline-flex rounded-md p-1.5 text-red-500 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-red-50 focus:ring-red-600"
                >
                  <span className="sr-only">Fechar</span>
                  <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Se não houver banda e não estiver carregando, exibe mensagem de erro
  if (!banda && !loadingBanda) {
    console.log('Banda não encontrada, exibindo mensagem de erro');
    return (
      <div className="text-center py-12">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
          <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </div>
        <h3 className="mt-2 text-lg font-medium text-gray-900">Banda não encontrada</h3>
        <p className="mt-1 text-gray-500">A banda que você está tentando editar não existe ou foi removida.</p>
        <div className="mt-6">
          <Button onClick={() => navigate('/gestor/bandas')}>
            Voltar para a lista de bandas
          </Button>
        </div>
      </div>
    );
  }

  return (
    <FormProvider {...methods}>
      {/* Notificação de erro global */}
      <NotificacaoErro />
      
      <form onSubmit={(e) => e.preventDefault()} className="max-w-4xl mx-auto bg-primary-50 p-8 rounded-xl shadow-lg border border-primary-100">
        {renderizarProgresso()}

        {/* Conteúdo da etapa atual */}
        <div className="space-y-6 mt-6 bg-white/90 p-8 rounded-xl border border-primary-100 shadow-sm">
          {banda && renderizarEtapa()}
        </div>

        {/* Navegação */}
        <div className="flex justify-between items-center pt-8 mt-8 border-t border-primary-100">
          <div>
            {etapaAtual > 1 ? (
              <Button
                type="button"
                variant="outline"
                onClick={etapaAnterior}
                className="flex items-center gap-2 text-primary-700 hover:bg-primary-50 px-6 py-2.5 rounded-lg border border-primary-200 transition-colors hover:border-primary-300"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Voltar
              </Button>
            ) : (
              <Button
                type="button"
                variant="outline"
                onClick={onCancel || (() => navigate(-1))}
                className="flex items-center gap-2 text-gray-700 hover:bg-gray-50 px-6 py-2.5 rounded-lg border border-gray-200 transition-colors hover:border-gray-300"
              >
                Cancelar
              </Button>
            )}
          </div>

          <div className="flex gap-3">
            {etapaAtual < totalEtapas ? (
              <Button
                type="button"
                onClick={handleNextClick}
                disabled={!isCurrentStepValid || isSubmitting}
                className="flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white px-6 py-2.5 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
              >
                {isSubmitting ? 'Salvando...' : 'Próximo'}
                {!isSubmitting && <ArrowRight className="w-4 h-4 ml-2" />}
              </Button>
            ) : (
              <Button
                type="button"
                onClick={handleSubmitRevisao}
                disabled={isSubmitting}
                className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-2.5 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg min-w-[180px]"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Salvando...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4 mr-2" />
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
