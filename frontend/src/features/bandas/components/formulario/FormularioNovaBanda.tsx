import { useState, useCallback } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import type { SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Check, Loader2 } from 'lucide-react';
import Button from '@/components/ui/button';
import { Etapa1DadosBasicos } from './Etapa1DadosBasicos';
import { Etapa2Endereco } from './Etapa2Endereco';
import { Etapa3Instrumentos } from './Etapa3Instrumentos';
import { Etapa4Revisao } from './Etapa4Revisao';
import { criarBanda } from '../../api/mockBandaService';

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

// Esquema de validação para cada etapa
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
      if (!date) return true; // Campo opcional
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
      .transform(cep => cep.replace(/\D/g, '')), // Remove formatação para armazenar apenas números
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

const FormularioNovaBanda = () => {
  const navigate = useNavigate();
  const [etapaAtual, setEtapaAtual] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const totalEtapas = 4;

  // Inicializa o formulário com valores padrão
  const getResolverForStep = (step: number) => {
    switch (step) {
      case 1: return zodResolver(esquemaEtapa1 as any);
      case 2: return zodResolver(esquemaEtapa2 as any);
      case 3: return zodResolver(esquemaEtapa3 as any);
      default: return undefined;
    }
  };

  const methods = useForm<FormValues>({
    resolver: getResolverForStep(etapaAtual),
    defaultValues: {
      nome: '',
      telefone: '',
      cnpj: '',
      descricao: '',
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
      instrumentos: [],
      facebook: '',
      instagram: '',
      youtube: '',
      linkedin: '',
      tiktok: '',
      site: ''
    },
  });

  const { trigger, formState: { isValid } } = methods;

  // Função para avançar para a próxima etapa
  const proximaEtapa = useCallback(async () => {
    console.log('Avançando para a próxima etapa...');

    // Força a validação dos campos da etapa atual
    const isStepValid = await trigger(undefined, { shouldFocus: true });
    console.log('Validação da etapa atual:', isStepValid);

    if (isStepValid) {
      console.log('Etapa válida, avançando...');
      const nextEtapa = Math.min(etapaAtual + 1, totalEtapas);

      // Atualiza a etapa
      setEtapaAtual(nextEtapa);

      // Rola para o topo do formulário
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      console.log('Etapa inválida, exibindo erros...');

      // Rola para o primeiro erro, se houver
      const errorElement = document.querySelector('.text-red-500');
      if (errorElement) {
        errorElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  }, [trigger, etapaAtual, totalEtapas]);

  // Volta para a etapa anterior
  const etapaAnterior = () => {
    setEtapaAtual(prev => Math.max(prev - 1, 1));
  };

  // Função para formatar os dados para o formato esperado pela API
  const formatarDadosParaAPI = useCallback((data: FormValues): any => {
    console.log('=== INÍCIO DA FUNÇÃO formatarDadosParaAPI ===');
    console.log('Iniciando formatação dos dados para a API...');

    try {
      // Verificação detalhada de cada campo
      console.log('Verificando campos obrigatórios...');

      if (!data) {
        console.error('Erro: Nenhum dado foi fornecido para formatação');
        throw new Error('Nenhum dado foi fornecido para formatação');
      }

      console.log('Dados recebidos para formatação:', JSON.stringify(data, null, 2));

      // Verificação detalhada de cada campo obrigatório
      const camposObrigatorios = [
        { nome: 'nome', valor: data.nome },
        { nome: 'telefone', valor: data.telefone },
        { nome: 'descricao', valor: data.descricao },
        { nome: 'endereco', valor: data.endereco }
      ];

      for (const campo of camposObrigatorios) {
        if (!campo.valor || (Array.isArray(campo.valor) && campo.valor.length === 0)) {
          const mensagemErro = `Erro: O campo ${campo.nome} é obrigatório`;
          console.error(mensagemErro, 'Valor recebido:', campo.valor);
          throw new Error(mensagemErro);
        }
      }

      // Verificação adicional para o endereço
      if (data.endereco) {
        console.log('Verificando campos do endereço...');
        const camposEnderecoObrigatorios = [
          'cep', 'logradouro', 'numero', 'bairro', 'cidade', 'estado'
        ] as const;

        for (const campo of camposEnderecoObrigatorios) {
          if (!data.endereco[campo]) {
            const mensagemErro = `Erro: O campo de endereço '${campo}' é obrigatório`;
            console.error(mensagemErro, 'Valor recebido:', data.endereco[campo]);
            throw new Error(mensagemErro);
          }
        }
      }

      console.log('Todos os campos obrigatórios estão preenchidos corretamente');

      // Inicia a formatação dos dados
      const dadosFormatados: any = {
        nome: data.nome,
        nomeArtistico: data.nomeArtistico || data.nome,
        descricao: data.descricao,
        telefone: data.telefone,
        email: data.email,
        fundacao: data.fundacao || new Date().toISOString().split('T')[0],
        ativa: true,
        foto: data.logo ? URL.createObjectURL(data.logo) : undefined,
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
        musicos: [], // Inicializa o array de músicos vazio
        dataCriacao: new Date().toISOString(),
        dataAtualizacao: new Date().toISOString()
      };

      if (data.cnpj) {
        dadosFormatados.cnpj = data.cnpj;
      }

      console.log('Dados formatados com sucesso:', dadosFormatados);
      return dadosFormatados;
    } catch (error) {
      console.error('Erro ao formatar dados para a API:', error);
      throw error; // Propaga o erro para ser tratado no onSubmit
    } finally {
      console.log('=== FIM DA FUNÇÃO formatarDadosParaAPI ===');
    }
  }, []);

  // Envia o formulário
  const onSubmit: SubmitHandler<FormValues> = useCallback(async (data, event) => {
    console.log('Iniciando submissão do formulário com dados:', data);

    // Verifica se é uma submissão real (etapa de revisão) ou apenas validação
    const isRealSubmit = event?.type === 'submit';

    if (isSubmitting && isRealSubmit) {
      console.log('Submissão já em andamento, ignorando chamada duplicada');
      return;
    }

    try {
      if (isRealSubmit) {
        console.log('Iniciando processo de envio...');
        setIsSubmitting(true);
      }

      // Formata os dados para a API
      console.log('Formatando dados para a API...');
      const dadosParaEnviar = formatarDadosParaAPI(data);
      console.log('Dados formatados para envio:', dadosParaEnviar);

      // Apenas envia para a API se for uma submissão real
      if (isRealSubmit) {
        console.log('Enviando dados para a API...');
        const resultado = await criarBanda(dadosParaEnviar);
        console.log('Resposta da API ao criar banda:', resultado);

        console.log('Banda criada com sucesso, redirecionando...');

        // Redireciona para a lista de bandas com estado para mostrar notificação
        navigate('/gestor/bandas', {
          state: {
            showNotification: true,
            message: 'Banda cadastrada com sucesso!',
            type: 'success'
          }
        });
      }
    } catch (error) {
      console.error('Erro ao cadastrar banda:', error);
      if (isRealSubmit) {
        alert('Ocorreu um erro ao cadastrar a banda. Por favor, tente novamente.');
      }
      throw error; // Re-throw para ser tratado pelo handleSubmit
    } finally {
      if (isRealSubmit) {
        console.log('Finalizando processo de envio...');
        setIsSubmitting(false);
      }
    }
  }, [navigate, isSubmitting, formatarDadosParaAPI]);

  // Função para lidar com o envio do formulário na etapa de revisão
  const handleSubmitRevisao = useCallback(async () => {
    try {
      // Valida todos os campos do formulário
      const isValid = await methods.trigger(undefined, { shouldFocus: true });

      if (!isValid) {
        console.error('Formulário inválido, corrija os erros antes de enviar');
        return;
      }

      // Obtém os dados atuais do formulário
      const formData = methods.getValues();

      // Chama a função onSubmit com os dados do formulário
      await onSubmit(formData, new Event('submit') as any);
    } catch (error) {
      console.error('Erro ao enviar formulário:', error);
      // Aqui você pode adicionar uma notificação de erro para o usuário
    }
  }, [methods, onSubmit]);

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
        return <Etapa4Revisao onSubmit={handleSubmitRevisao} />;
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
            {etapaAtual < totalEtapas ? (
              <Button
                type="button"
                onClick={handleNextClick}
                disabled={!isValid || isSubmitting}
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
                ) : 'Finalizar Cadastro'}
              </Button>
            )}
          </div>
        </div>
      </form>
    </FormProvider>
  );
}

export { FormularioNovaBanda };
