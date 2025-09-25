import { useState, useEffect } from 'react';
import type { DadosMusico, Instrumento } from '../../../../types/cadastro';
import { PlusIcon, TrashIcon } from '@heroicons/react/24/outline';

interface InstrumentosStepProps {
  data: DadosMusico;
  updateData: (data: DadosMusico) => void;
}

const StarRating = ({ 
  rating, 
  onRatingChange
}: { 
  rating: number; 
  onRatingChange: (rating: number) => void;
}) => {
  // Função para renderizar o ícone da estrela
  const renderStarIcon = (star: number) => {
    if (star <= rating) {
      return (
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 24 24" 
          fill="currentColor" 
          aria-hidden="true" 
          data-slot="icon" 
          className="drop-shadow-[0_0_4px_rgba(250,204,21,0.7)]"
        >
          <path 
            fillRule="evenodd" 
            d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" 
            clipRule="evenodd"
          />
        </svg>
      );
    } else {
      return (
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          fill="none" 
          viewBox="0 0 24 24" 
          strokeWidth="1.5" 
          stroke="currentColor" 
          aria-hidden="true" 
          data-slot="icon"
          className="text-yellow-400"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
          />
        </svg>
      );
    }
  };

  return (
    <div className="flex items-center">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          className={`h-8 w-8 text-yellow-400 hover:text-yellow-500 transition-colors focus:outline-none transform transition-transform duration-200 ${
            star <= rating ? 'scale-110' : 'hover:scale-105'
          }`}
          onClick={() => onRatingChange(star)}
          onMouseEnter={(e) => {
            e.currentTarget.classList.add('scale-110');
          }}
          onMouseLeave={(e) => {
            if (star > rating) {
              e.currentTarget.classList.remove('scale-110');
            }
          }}
        >
          {renderStarIcon(star)}
        </button>
      ))}
      <span className="ml-2 text-sm text-gray-500">
        {rating}/5
      </span>
    </div>
  );
};

const InstrumentosStep: React.FC<InstrumentosStepProps> = ({ data, updateData }) => {
  const [instrumentos, setInstrumentos] = useState<Instrumento[]>(data.instrumentos);
  const [novoInstrumento, setNovoInstrumento] = useState('');
  const [prioridade, setPrioridade] = useState(5);
  const [erro, setErro] = useState('');

  useEffect(() => {
    updateData({ instrumentos });
  }, [instrumentos]);

  // Encontra a próxima prioridade disponível
  const encontrarProximaPrioridadeDisponivel = () => {
    const prioridadesEmUso = instrumentos.map(i => i.prioridade);
    for (let i = 1; i <= 5; i++) {
      if (!prioridadesEmUso.includes(i)) {
        return i;
      }
    }
    return 1; // Se todas as prioridades estiverem em uso, retorna 1
  };

  const adicionarInstrumento = () => {
    const nomeInstrumento = novoInstrumento.trim();
    
    if (!nomeInstrumento) {
      setErro('Por favor, insira o nome do instrumento');
      return;
    }
    
    if (instrumentos.some(i => i.nome.toLowerCase() === nomeInstrumento.toLowerCase())) {
      setErro('Este instrumento já foi adicionado');
      return;
    }

    // Verifica se a prioridade atual já está em uso
    const prioridadeAtualEmUso = instrumentos.some(i => i.prioridade === prioridade);
    const prioridadeParaUsar = prioridadeAtualEmUso ? encontrarProximaPrioridadeDisponivel() : prioridade;

    const novoItem: Instrumento = {
      id: Date.now(),
      nome: nomeInstrumento,
      prioridade: prioridadeParaUsar
    };

    // Adiciona o novo item e ordena por prioridade (1 é a maior prioridade)
    setInstrumentos(prev => [...prev, novoItem].sort((a, b) => a.prioridade - b.prioridade));
    
    // Define a próxima prioridade disponível para o próximo instrumento
    const proximaPrioridade = encontrarProximaPrioridadeDisponivel();
    setPrioridade(proximaPrioridade);
    
    setNovoInstrumento('');
    setErro('');
  };

  const removerInstrumento = (id: number) => {
    setInstrumentos(prev => {
      const novosInstrumentos = prev.filter(item => item.id !== id);
      // Atualiza a prioridade para a próxima disponível
      const proximaPrioridade = encontrarProximaPrioridadeDisponivel();
      setPrioridade(proximaPrioridade);
      return novosInstrumentos;
    });
  };

  const atualizarPrioridade = (id: number, novaPrioridade: number) => {
    // Verifica se a nova prioridade já está sendo usada por outro instrumento
    const prioridadeEmUso = instrumentos.some(
      item => item.id !== id && item.prioridade === novaPrioridade
    );
    
    if (prioridadeEmUso) {
      setErro('Esta prioridade já está sendo usada por outro instrumento');
      return;
    }
    
    setInstrumentos(prev => 
      prev.map(item => 
        item.id === id ? { ...item, prioridade: novaPrioridade } : item
      ).sort((a, b) => a.prioridade - b.prioridade)
    );
    setErro('');
  };
  
  const atualizarInstrumento = (id: number, novoNome: string) => {
    setInstrumentos(prev => 
      prev.map(item => 
        item.id === id ? { ...item, nome: novoNome } : item
      )
    );
  };

  // Função para mover um item na lista
  const moverItem = (fromIndex: number, toIndex: number) => {
    const newItems = [...instrumentos];
    const [removed] = newItems.splice(fromIndex, 1);
    newItems.splice(toIndex, 0, removed);
    
    // Atualiza as prioridades baseado na nova ordem
    const itemsComPrioridadesAtualizadas = newItems.map((item, index) => ({
      ...item,
      prioridade: index + 1
    }));
    
    setInstrumentos(itemsComPrioridadesAtualizadas);
  };

  // Função para mover um item para cima na prioridade
  const moverParaCima = (index: number) => {
    if (index > 0) {
      moverItem(index, index - 1);
    }
  };

  // Função para mover um item para baixo na prioridade
  const moverParaBaixo = (index: number) => {
    if (index < instrumentos.length - 1) {
      moverItem(index, index + 1);
    }
  };

  return (
    <div className="space-y-6">
      {instrumentos.length > 0 && (
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Seus Instrumentos (Prioridade: 1 é a maior)
            </h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              Prioridade 1 (mais alta) para 5 (mais baixa). Use as setas para ajustar a ordem.
            </p>
          </div>
          <div className="border-t border-gray-200">
            <ul className="divide-y divide-gray-200">
              {instrumentos.map((instrumento, index) => (
                <li 
                  key={instrumento.id} 
                  className="px-4 py-4 sm:px-6 hover:bg-gray-50 transition-colors duration-150"
                  draggable
                  onDragStart={(e) => {
                    e.dataTransfer.setData('text/plain', index.toString());
                  }}
                  onDragOver={(e) => {
                    e.preventDefault();
                    e.currentTarget.classList.add('bg-purple-50');
                  }}
                  onDragLeave={(e) => {
                    e.currentTarget.classList.remove('bg-purple-50');
                  }}
                  onDrop={(e) => {
                    e.preventDefault();
                    e.currentTarget.classList.remove('bg-purple-50');
                    const fromIndex = parseInt(e.dataTransfer.getData('text/plain'));
                    if (fromIndex !== index) {
                      moverItem(fromIndex, index);
                    }
                  }}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex-1 min-w-0 mb-3 sm:mb-0">
                      <div className="flex items-center">
                        <span className="mr-2 text-sm font-medium text-gray-500">
                          {instrumento.prioridade}º
                        </span>
                        <input
                          type="text"
                          value={instrumento.nome}
                          onChange={(e) => atualizarInstrumento(instrumento.id, e.target.value)}
                          className="text-sm font-medium text-gray-900 bg-transparent border-b border-transparent focus:border-purple-500 focus:outline-none focus:ring-0 px-1 py-1"
                        />
                      </div>
                      <div className="mt-2">
                        <StarRating 
                          rating={6 - instrumento.prioridade} // Inverte a prioridade para as estrelas
                          onRatingChange={(rating) => atualizarPrioridade(instrumento.id, 6 - rating)}
                        />
                      </div>
                    </div>
                    <div className="flex-shrink-0 flex space-x-2">
                      <div className="flex flex-col space-y-1">
                        <button
                          type="button"
                          onClick={() => moverParaCima(index)}
                          disabled={index === 0}
                          className={`p-1 rounded-md ${index === 0 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-600 hover:bg-gray-100'}`}
                          aria-label="Aumentar prioridade"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                          </svg>
                        </button>
                        <button
                          type="button"
                          onClick={() => moverParaBaixo(index)}
                          disabled={index === instrumentos.length - 1}
                          className={`p-1 rounded-md ${index === instrumentos.length - 1 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-600 hover:bg-gray-100'}`}
                          aria-label="Diminuir prioridade"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </button>
                      </div>
                      <button
                        type="button"
                        onClick={() => removerInstrumento(instrumento.id)}
                        className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-200"
                      >
                        <TrashIcon className="-ml-0.5 mr-1.5 h-4 w-4" />
                        Remover
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Adicionar Instrumento</h3>
        <div className="space-y-4">
          <div>
            <label htmlFor="instrumento" className="block text-sm font-medium text-gray-700 mb-1">
              Nome do Instrumento
            </label>
            <div className="mt-1 flex rounded-md shadow-sm">
              <input
                type="text"
                id="instrumento"
                value={novoInstrumento}
                onChange={(e) => {
                  setNovoInstrumento(e.target.value);
                  if (erro) setErro('');
                }}
                placeholder="Ex: Violino, Piano, Flauta..."
                className="flex-1 min-w-0 block w-full px-3 py-2 rounded-l-md border border-gray-300 focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
              />
              <button
                type="button"
                onClick={adicionarInstrumento}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-r-md shadow-sm text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors duration-200"
              >
                <PlusIcon className="-ml-1 mr-2 h-5 w-5" />
                Adicionar
              </button>
            </div>
            {erro && <p className="mt-1 text-sm text-red-600">{erro}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Prioridade para tocar
            </label>
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">
                  Prioridade {prioridade}
                </span>
                <span className="text-xs text-gray-500">
                  {prioridade === 1 ? 'Mais alta' : prioridade === 5 ? 'Mais baixa' : ''}
                </span>
              </div>
              <StarRating 
                rating={6 - prioridade} // Inverte a prioridade para as estrelas (5 estrelas = prioridade 1)
                onRatingChange={(rating) => setPrioridade(6 - rating)} 
              />
              <div className="mt-2 text-xs text-gray-600">
                <p>5 estrelas = Prioridade 1 (mais alta)</p>
                <p>1 estrela = Prioridade 5 (mais baixa)</p>
                {instrumentos.length > 0 && (
                  <div className="mt-2 p-2 bg-gray-100 rounded text-gray-700">
                    <p className="font-medium">Prioridades em uso:</p>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {[1, 2, 3, 4, 5].map(p => (
                        <span 
                          key={p} 
                          className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                            instrumentos.some(i => i.prioridade === p) 
                              ? 'bg-purple-100 text-purple-800' 
                              : 'bg-gray-200 text-gray-800'
                          }`}
                        >
                          {p}º
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstrumentosStep;
