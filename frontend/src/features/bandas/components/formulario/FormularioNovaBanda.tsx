import { useState, useCallback, useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import type { SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Check, Loader2 } from 'lucide-react';
import { buscarBandaPorId, criarBanda, atualizarBanda } from '../../api/mockBandaService';
import Button from '@/components/ui/button';
import { Etapa1DadosBasicos } from './Etapa1DadosBasicos';
import { Etapa2Endereco } from './Etapa2Endereco';
import { Etapa3Instrumentos } from './Etapa3Instrumentos';
import { Etapa4Revisao } from './Etapa4Revisao';

import { DadosBandaFormulario } from './types';

// Tipo para o formulário que estende DadosBandaFormulario
interface FormValues extends Omit<DadosBandaFormulario, 'instrumentos'> {
  instrumentos?: Array<{
    id?: string;
    nome: string;
    quantidade?: number;
  }>;
}

// Esquema de validação do formulário
const schemaValidacao = z.object({
  // Dados básicos
  nome: z.string().min(2, 'O nome deve ter pelo menos 2 caracteres'),
  telefone: z.string()
    .min(1, 'Telefone é obrigatório')
    .regex(/\(\d{2}\) \d{4,5}-\d{4}/, 'Formato inválido. Use (00) 00000-0000'),
  email: z.string()
    .min(1, 'Email é obrigatório')
    .email('Por favor, insira um email válido'),
  descricao: z.string().min(10, 'A descrição deve ter pelo menos 10 caracteres'),
  fundacao: z.string().optional(),
  facebook: z.string().url('URL inválida').or(z.literal('')).optional(),
  instagram: z.string().url('URL inválida').or(z.literal('')).optional(),
  youtube: z.string().url('URL inválida').or(z.literal('')).optional(),
  linkedin: z.string().url('URL inválida').or(z.literal('')).optional(),
  tiktok: z.string().url('URL inválida').or(z.literal('')).optional(),
  site: z.string().url('URL inválida').or(z.literal('')).optional(),
  
  // Endereço
  endereco: z.object({
    cep: z.string()
      .regex(/^\d{5}-\d{3}$/, 'Formato inválido. Use 00000-000'),
    logradouro: z.string().min(3, 'Logradouro inválido'),
    numero: z.string().min(1, 'Número é obrigatório'),
    complemento: z.string().optional(),
    bairro: z.string().min(2, 'Bairro inválido'),
    cidade: z.string().min(2, 'Cidade inválida'),
    estado: z.string().length(2, 'Selecione um estado'),
    referencia: z.string().optional()
  }),
  
  // Instrumentos (validação mais tolerante para evitar loops)
  instrumentos: z.array(z.object({
    id: z.string().optional(),
    nome: z.string().min(1, 'Nome do instrumento é obrigatório'),
    quantidade: z.number().min(1, 'A quantidade deve ser pelo menos 1').default(1)
  })).min(1, 'Adicione pelo menos um instrumento').default([])
});

const FormularioNovaBanda = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [etapaAtual, setEtapaAtual] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [bandaId, setBandaId] = useState<string | null>(null);
  const totalEtapas = 4;


  const methods = useForm<FormValues>({
    resolver: zodResolver(schemaValidacao),
    defaultValues: {
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
    }
  });

  // Efeito para verificar se estamos no modo de edição
  useEffect(() => {
    const editarId = searchParams.get('editar');
    if (editarId) {
      setIsEditMode(true);
      setBandaId(editarId);
      carregarBanda(editarId);
    }
  }, [searchParams]);

  // Função para carregar os dados da banda para edição
  const carregarBanda = async (id: string) => {
    try {
      setIsLoading(true);
      console.log(`Carregando banda com ID: ${id} para edição...`);
      
      const banda = await buscarBandaPorId(parseInt(id));
      
      if (banda) {
        console.log('Dados da banda carregados:', banda);
        
        // Formata os dados para o formulário
        const dadosFormatados: FormValues = {
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
          instrumentos: Array.isArray(banda.instrumentos) && banda.instrumentos.length > 0
            ? banda.instrumentos.map(instr => ({
                id: instr.id || crypto.randomUUID(),
                nome: instr.nome || 'Novo Instrumento',
                quantidade: typeof instr.quantidade === 'number' ? instr.quantidade : 1
              }))
            : [{
                id: crypto.randomUUID(),
                nome: 'Vocal',
                quantidade: 1
              }]
        };
        
        // Preenche o formulário com os dados da banda
        methods.reset(dadosFormatados);
        console.log('Formulário preenchido com os dados da banda');
      }
    } catch (error) {
      console.error('Erro ao carregar banda para edição:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  const { getValues } = methods;

  // Função para voltar para a etapa anterior
  const etapaAnterior = useCallback(() => {
    setEtapaAtual(prev => Math.max(prev - 1, 1));
  }, []);

  // Função para formatar os dados para a API
  const formatarDadosParaAPI = useCallback((data: FormValues) => {
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
        instrumentos: (data.instrumentos || []).map(instr => ({
          id: String(instr.id || crypto.randomUUID()),
          nome: instr.nome,
          quantidade: instr.quantidade || 1,
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

  // Função para validar os campos da etapa atual
  const validarEtapaAtual = useCallback(async () => {
    try {
      // Campos a serem validados em cada etapa
      const camposPorEtapa = {
        1: ['nome', 'telefone', 'email', 'descricao'],
        2: ['endereco.cep', 'endereco.logradouro', 'endereco.numero', 'endereco.bairro', 'endereco.cidade', 'endereco.estado'],
        3: ['instrumentos']
      };

      const camposParaValidar = camposPorEtapa[etapaAtual as keyof typeof camposPorEtapa] || [];
      
      // Se não há campos específicos para validar, considera como válido
      if (camposParaValidar.length === 0) return true;
      
      // Valida apenas os campos da etapa atual
      const isEtapaValida = await methods.trigger(camposParaValidar as any, { shouldFocus: true });
      
      if (!isEtapaValida) {
        // Rola até o primeiro erro
        const primeiroErro = document.querySelector('.text-red-600');
        if (primeiroErro) {
          primeiroErro.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }
      
      return isEtapaValida;
    } catch (error) {
      console.error('Erro ao validar etapa:', error);
      return false;
    }
  }, [etapaAtual, methods]);

  // Função para avançar para a próxima etapa
  const handleNextClick = useCallback(async () => {
    try {
      const isEtapaValida = await validarEtapaAtual();
      
      if (isEtapaValida) {
        const nextEtapa = Math.min(etapaAtual + 1, totalEtapas);
        setEtapaAtual(nextEtapa);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        console.log('Etapa inválida, corrija os erros antes de continuar');
      }
    } catch (error) {
      console.error('Erro ao avançar etapa:', error);
    }
  }, [etapaAtual, totalEtapas, validarEtapaAtual]);

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
          dadosSalvos={getValues()}
          etapasSalvas={new Set([1, 2, 3, 4])}
        />;
      default:
        return null;
    }
  };
  // Renderiza o componente principal do formulário
  return (
    <FormProvider {...methods}>
      <form onSubmit={(e) => e.preventDefault()} className="max-w-4xl mx-auto bg-primary-50 p-8 rounded-xl shadow-lg border border-primary-100">
        {/* Indicador de progresso */}
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

        {/* Conteúdo da etapa atual */}
        <div className="space-y-6 mt-6 bg-white/90 p-8 rounded-xl border border-primary-100 shadow-sm">
          {renderizarEtapa()}
        </div>

        {/* Navegação */}
        <div className="flex justify-between items-center pt-8 mt-8 border-t border-primary-100">
          <div>
            {etapaAtual > 1 && (
              <Button
                type="button"
                variant="outline"
                onClick={etapaAnterior}
                className="flex items-center gap-2 text-primary-700 hover:bg-primary-50 px-6 py-2.5 rounded-lg border border-primary-200 transition-colors hover:border-primary-300"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Voltar
              </Button>
            )}
          </div>

          <div className="flex gap-3">
            {etapaAtual < totalEtapas ? (
              <Button
                type="button"
                onClick={handleNextClick}
                disabled={isSubmitting}
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
