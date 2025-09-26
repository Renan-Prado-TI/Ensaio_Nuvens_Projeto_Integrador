import type { Banda, CriarBandaDTO, AtualizarBandaDTO } from '../types/banda';

// Dados iniciais das bandas
const dadosIniciais: Banda[] = [
  {
    id: '1',
    nome: "Banda 1",
    nomeArtistico: "Os Fantásticos",
    fundacao: "2010-05-15",
    descricao: "A melhor banda de rock da cidade!",
    telefone: "(11) 98765-4321",
    email: "contato@osfantasticos.com.br",
    quantidadeMusicos: 4,
    musicas: [
      { id: '1', nome: 'Música 1', artista: 'Banda 1', duracao: '3:45' },
      { id: '2', nome: 'Música 2', artista: 'Banda 1', duracao: '4:20' },
    ],
    instrumentos: [
      { id: '1', nome: 'Guitarra', quantidade: 2 },
      { id: '2', nome: 'Bateria', quantidade: 1 },
      { id: '3', nome: 'Baixo', quantidade: 1 },
    ],
    endereco: {
      cep: "01234-567",
      logradouro: "Rua das Flores",
      numero: "123",
      complemento: "Sala 42",
      bairro: "Centro",
      cidade: "São Paulo",
      estado: "SP",
      referencia: "Próximo ao metrô"
    },
    redesSociais: {
      facebook: "osfantasticos",
      instagram: "osfantasticosoficial",
      youtube: "osfantasticos",
    },
    dataCriacao: new Date().toISOString(),
    dataAtualizacao: new Date().toISOString()
  },
  {
    id: '2',
    nome: "Banda 2",
    nomeArtistico: "Jazz & Cia",
    fundacao: "2015-08-22",
    telefone: "(11) 91234-5678",
    email: "contato@jazzcia.com.br",
    descricao: "Trio de jazz especializado em clássicos do gênero.",
    quantidadeMusicos: 3,
    musicas: [
      { id: '3', nome: 'Jazz Standard 1', artista: 'Banda 2', duracao: '5:30' },
    ],
    instrumentos: [
      { id: '4', nome: 'Saxofone', quantidade: 1 },
      { id: '5', nome: 'Piano', quantidade: 1 },
      { id: '6', nome: 'Contrabaixo', quantidade: 1 },
    ],
    endereco: {
      cep: "04567-890",
      logradouro: "Avenida Paulista",
      numero: "1000",
      bairro: "Bela Vista",
      cidade: "São Paulo",
      estado: "SP",
      referencia: "Próximo ao metrô"
    },
    redesSociais: {
      facebook: "jazzeciaoficial",
      instagram: "jazzecia",
      youtube: "jazzecia"
    },
    dataCriacao: new Date().toISOString(),
    dataAtualizacao: new Date().toISOString()
  },
  {
    id: '3',
    nome: "Banda 3",
    nomeArtistico: "Sertanejo Raiz",
    fundacao: "2018-03-10",
    telefone: "(11) 99876-5432",
    email: "contato@sertanejoraiz.com.br",
    descricao: "Dupla sertaneja que valoriza as raízes da música caipira brasileira.",
    quantidadeMusicos: 2,
    musicas: [
      { id: '4', nome: 'Raízes do Sertão', artista: 'Banda 3', duracao: '3:20' },
      { id: '5', nome: 'Viola e Coração', artista: 'Banda 3', duracao: '4:10' },
    ],
    instrumentos: [
      { id: '7', nome: 'Viola Caipira', quantidade: 1 },
      { id: '8', nome: 'Violão', quantidade: 1 },
    ],
    endereco: {
      cep: "06789-012",
      logradouro: "Estrada do Sertão",
      numero: "456",
      complemento: "Chácara 7",
      bairro: "Zona Rural",
      cidade: "São Roque",
      estado: "SP",
      referencia: "Próximo ao posto de gasolina"
    },
    redesSociais: {
      facebook: "sertanejoraizoficial",
      instagram: "sertanejoraiz",
      youtube: "sertanejoraiz",
    },
    dataCriacao: new Date().toISOString(),
  dataAtualizacao: new Date().toISOString()
  }
];

// Inicializa o array de bandas
let bandas: Banda[] = [];

// Função para inicializar os dados
const inicializarDados = () => {
  // Verifica se já existem dados no localStorage
  const dadosSalvos = localStorage.getItem('bandas');
  
  if (dadosSalvos) {
    try {
      const dados = JSON.parse(dadosSalvos);
      console.log('Dados carregados do localStorage:', dados.length, 'bandas');
      return dados;
    } catch (error) {
      console.error('Erro ao carregar dados do localStorage:', error);
      // Se houver erro, usa os dados iniciais
      console.log('Usando dados iniciais:', dadosIniciais.length, 'bandas');
      return [...dadosIniciais];
    }
  } else {
    // Se não houver dados salvos, usa os dados iniciais
    console.log('Usando dados iniciais:', dadosIniciais.length, 'bandas');
    return [...dadosIniciais];
  }
};

// Inicializa os dados ao carregar o módulo
bandas = inicializarDados();

// Função para salvar os dados no localStorage
export const salvarDados = () => {
  try {
    localStorage.setItem('bandas', JSON.stringify(bandas));
    console.log('Dados salvos no localStorage');
    return true;
  } catch (error) {
    console.error('Erro ao salvar dados no localStorage:', error);
    return false;
  }
};

// Simulando atraso de rede
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Buscar todas as bandas
export async function buscarBandas(): Promise<Banda[]> {
  console.log('Iniciando busca de bandas...');
  console.log('Variável bandas antes do delay:', bandas);
  console.log('Tipo de bandas:', typeof bandas);
  console.log('É array?', Array.isArray(bandas));
  
  await delay(500);
  
  console.log('Busca de bandas concluída.');
  console.log('Total de bandas encontradas:', bandas.length);
  console.log('Bandas encontradas:', JSON.stringify(bandas, null, 2));
  
  // Retorna uma cópia do array para evitar mutação acidental
  const resultado = [...bandas];
  console.log('Cópia do array de bandas a ser retornada:', resultado.length);
  
  return resultado;
}

// Buscar banda por ID
export async function buscarBandaPorId(id: number | string): Promise<Banda | undefined> {
  console.log('=== INÍCIO DA BUSCA POR ID ===');
  console.log('ID solicitado:', id, '(tipo:', typeof id, ')');
  
  // Verifica se o ID é válido
  if (id === undefined || id === null || id === '') {
    console.error('ID inválido fornecido:', id);
    return undefined;
  }

  await delay(300);

  console.log('Total de bandas cadastradas:', bandas.length);
  
  // Log detalhado de todas as bandas para depuração
  console.log('Detalhes das bandas disponíveis:');
  bandas.forEach((b, i) => {
    console.log(`[${i}] ID: ${b.id} (tipo: ${typeof b.id}), Nome: ${b.nome}`);
  });

  // Converte o ID para string para garantir a comparação correta
  const idString = String(id);
  console.log('Buscando banda com ID convertido para string:', idString);
  
  // Busca a banda com o ID correspondente
  const banda = bandas.find(banda => String(banda.id) === idString);

  console.log('Banda encontrada:', banda ? 'Sim' : 'Não');
  
  if (banda) {
    console.log('Detalhes da banda encontrada:', {
      id: banda.id,
      nome: banda.nome,
      tipoId: typeof banda.id
    });
  } else {
    console.warn(`Nenhuma banda encontrada com o ID: ${idString}`);
    console.log('IDs disponíveis:', bandas.map(b => ({
      id: b.id, 
      tipo: typeof b.id,
      nome: b.nome
    })));
  }

  console.log('=== FIM DA BUSCA POR ID ===');

  // Retorna uma cópia do objeto para evitar mutação acidental
  return banda ? { ...banda } : undefined;
}

// Criar nova banda
export async function criarBanda(dados: CriarBandaDTO): Promise<Banda> {
  console.log('=== INÍCIO DA CRIAÇÃO DE BANDA ===');
  console.log('Dados recebidos para criação:', dados);
  console.log('Array de bandas antes da criação:', bandas.length);

  await delay(700);

  try {
    // Gera um ID único para a nova banda
    const maxId = bandas.length > 0 ? Math.max(...bandas.map(b => {
      const parsedId = parseInt(b.id, 10);
      return isNaN(parsedId) ? 0 : parsedId;
    })) : 0;
    const novoId = (maxId + 1).toString();

    console.log('IDs existentes:', bandas.map(b => b.id));
    console.log('ID máximo encontrado:', maxId);
    console.log('Novo ID gerado:', novoId);

    // Garante que os campos obrigatórios estejam presentes
    const novaBanda: Banda = {
      ...dados,
      id: novoId,
      musicas: [],
      quantidadeMusicos: 0, // Garante que a quantidade de músicos seja inicializada como 0
      dataCriacao: new Date().toISOString(),
      dataAtualizacao: new Date().toISOString(),
      ativa: dados.ativa ?? true,
      // Garante que os campos opcionais tenham valores padrão
      nomeArtistico: dados.nomeArtistico || dados.nome,
      fundacao: dados.fundacao || new Date().toISOString().split('T')[0],
      endereco: dados.endereco || {
        cep: '',
        logradouro: '',
        numero: '',
        bairro: '',
        cidade: '',
        estado: ''
      },
    };

    console.log('Nova banda criada com ID:', novaBanda.id);
    console.log('Nova banda a ser adicionada:', novaBanda);

    bandas.push(novaBanda);
    console.log('Total de bandas após adição:', bandas.length);
    console.log('IDs das bandas após adição:', bandas.map(b => b.id));

    // Retorna uma cópia da banda adicionada
    const resultado = { ...novaBanda };
    console.log('Banda retornada da criação:', resultado);

    console.log('=== FIM DA CRIAÇÃO DE BANDA ===');
    return resultado;
  } catch (error) {
    console.error('Erro ao criar banda:', error);
    throw new Error('Erro ao processar os dados da banda. Verifique se todos os campos obrigatórios foram preenchidos corretamente.');
  }
}

// Atualizar banda
export async function atualizarBanda(
  id: number | string, 
  dados: AtualizarBandaDTO
): Promise<Banda> {
  console.log('=== INÍCIO DA ATUALIZAÇÃO DE BANDA ===');
  console.log('ID da banda a ser atualizada:', id, '(tipo:', typeof id, ')');
  console.log('Dados recebidos para atualização:', dados);
  
  // Verifica se o ID é válido
  if (id === undefined || id === null || id === '') {
    const erro = 'ID inválido fornecido para atualização';
    console.error(erro);
    throw new Error(erro);
  }
  
  await delay(500);
  
  // Converte o ID para string para garantir a comparação correta
  const idString = String(id);
  console.log('Buscando banda com ID convertido para string:', idString);
  
  // Encontra o índice da banda
  const index = bandas.findIndex(banda => String(banda.id) === idString);
  
  if (index === -1) {
    const erro = `Nenhuma banda encontrada com o ID: ${idString}`;
    console.error(erro);
    console.log('IDs disponíveis:', bandas.map(b => ({
      id: b.id, 
      tipo: typeof b.id,
      nome: b.nome
    })));
    throw new Error(erro);
  }
  
  console.log('Banda encontrada para atualização:', {
    id: bandas[index].id,
    nome: bandas[index].nome,
    index
  });
  
  // Prepara os dados atualizados
  const { redesSociais, ...outrosDados } = dados;
  const novasRedesSociais = {
    ...(bandas[index].redesSociais || {}),
    ...(redesSociais || {})
  };
  
  // Cria o objeto de banda atualizado
  const bandaAtualizada: Banda = {
    ...bandas[index],
    ...outrosDados,
    // Garante que o ID não seja alterado
    id: bandas[index].id,
    // Atualiza as redes sociais
    redesSociais: novasRedesSociais,
    // Atualiza a data de atualização
    dataAtualizacao: new Date().toISOString()
  };
  
  console.log('Banda após atualização:', bandaAtualizada);
  
  // Atualiza o array de bandas
  bandas[index] = bandaAtualizada;
  
  // Salva as alterações
  const salvou = salvarDados();
  if (!salvou) {
    console.error('Falha ao salvar os dados no localStorage');
    throw new Error('Erro ao salvar os dados da banda');
  }

  console.log('Banda atualizada com sucesso:', {
    id: bandaAtualizada.id,
    nome: bandaAtualizada.nome,
    dataAtualizacao: bandaAtualizada.dataAtualizacao
  });
  
  console.log('=== FIM DA ATUALIZAÇÃO DE BANDA ===');

  // Retorna uma cópia do objeto para evitar mutação acidental
  return { ...bandaAtualizada };
}

// Deletar banda
export async function deletarBanda(id: number | string): Promise<boolean> {
  console.log(`=== INÍCIO DA EXCLUSÃO DA BANDA ID: ${id} ===`);
  console.log('Tipo do ID fornecido:', typeof id);
  console.log('Total de bandas antes da exclusão:', bandas.length);
  console.log('IDs das bandas antes da exclusão:', bandas.map(b => b.id));
  
  await delay(400);
  
  // Converte o ID para string para garantir a comparação correta
  const idString = id.toString();
  console.log(`Buscando banda com ID: ${idString}...`);
  console.log('IDs disponíveis:', bandas.map(b => ({ id: b.id, tipo: typeof b.id })));
  
  const index = bandas.findIndex(b => b.id === idString);
  
  if (index !== -1) {
    console.log(`Banda encontrada no índice ${index}, realizando exclusão...`);
    bandas.splice(index, 1);
    console.log('Banda excluída com sucesso!');
    console.log('Total de bandas após exclusão:', bandas.length);
    console.log('IDs das bandas após exclusão:', bandas.map(b => b.id));
    console.log('=== FIM DA EXCLUSÃO DE BANDA ===');
    return true;
  }
  
  console.error(`Erro: Banda com ID ${idString} não encontrada`);
  console.log('=== FIM DA EXCLUSÃO DE BANDA (FALHA) ===');
  return false;
}

// Adicionar músico à banda - Função temporariamente desabilitada
// export async function adicionarMusicoABanda(
//   bandaId: number,
//   musico: Omit<Musico, 'id'>
// ): Promise<Musico | undefined> {
//   const banda = bandas.find(b => b.id === bandaId.toString());
//   if (!banda) return undefined;

//   const novoMusico: Musico = {
//     ...musico,
//     id: Math.max(0, ...banda.musicas.map((m: any) => m.id || 0), 0) + 1
//   };

//   banda.musicas.push(novoMusico);
//   banda.dataAtualizacao = new Date().toISOString();

//   return { ...novoMusico };
// }
