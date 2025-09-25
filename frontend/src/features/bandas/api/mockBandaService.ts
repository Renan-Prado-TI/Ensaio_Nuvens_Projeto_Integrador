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
      { id: '1', nome: 'Guitarra' },
      { id: '2', nome: 'Bateria' },
      { id: '3', nome: 'Baixo' },
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
      { id: '4', nome: 'Saxofone' },
      { id: '5', nome: 'Piano' },
      { id: '6', nome: 'Contrabaixo' },
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
      { id: '7', nome: 'Viola Caipira' },
      { id: '8', nome: 'Violão' },
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

// Inicializa o array de bandas com os dados iniciais
let bandas: Banda[] = [...dadosIniciais];
console.log('Dados iniciais das bandas carregados com sucesso');

// Simula atraso de rede
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
export async function buscarBandaPorId(id: number): Promise<Banda | undefined> {
  console.log('=== INÍCIO DA BUSCA POR ID ===');
  console.log('ID solicitado:', id);
  console.log('Tipo do ID:', typeof id);

  await delay(300);

  console.log('Array de bandas atual:', bandas.length);
  console.log('IDs disponíveis:', bandas.map(b => ({ id: b.id, tipo: typeof b.id })));

  const banda = bandas.find(banda => banda.id === id.toString());

  console.log('Banda encontrada:', banda ? 'Sim' : 'Não');
  console.log('Banda retornada:', banda);

  console.log('=== FIM DA BUSCA POR ID ===');

  return banda;
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
  id: number, 
  dados: AtualizarBandaDTO
): Promise<Banda | undefined> {
  await delay(600);
  
  const index = bandas.findIndex(b => b.id === id.toString());
  if (index === -1) return undefined;
  
  const bandaAtualizada = {
    ...bandas[index],
    ...dados,
    dataAtualizacao: new Date().toISOString()
  };
  
  bandas[index] = bandaAtualizada;
  return { ...bandaAtualizada };
}

// Deletar banda
export async function deletarBanda(id: number): Promise<boolean> {
  console.log(`=== INÍCIO DA EXCLUSÃO DA BANDA ID: ${id} ===`);
  console.log('Total de bandas antes da exclusão:', bandas.length);
  console.log('IDs das bandas antes da exclusão:', bandas.map(b => b.id));
  
  await delay(400);
  
  console.log(`Buscando banda com ID: ${id}...`);
  const index = bandas.findIndex(b => b.id === id.toString());
  
  if (index !== -1) {
    console.log(`Banda encontrada no índice ${index}, realizando exclusão...`);
    bandas.splice(index, 1);
    console.log('Banda excluída com sucesso!');
    console.log('Total de bandas após exclusão:', bandas.length);
    console.log('IDs das bandas após exclusão:', bandas.map(b => b.id));
    return true;
  }
  
  console.error(`Erro: Banda com ID ${id} não encontrada`);
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
