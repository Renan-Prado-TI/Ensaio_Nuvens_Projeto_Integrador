import React, { useState } from 'react';
import { Link } from 'react-router-dom';

interface Anotacao {
  id: string;
  titulo: string;
  preview: string;
  data: string;
  tags: string[];
  banda: {
    id: string;
    nome: string;
  };
}

export const AnotacoesPage = () => {
  const [filtroTag, setFiltroTag] = useState<string>('todas');
  
  // Dados de exemplo - serão substituídos por dados reais posteriormente
  const anotacoes: Anotacao[] = [
    {
      id: '1',
      titulo: 'Ideias para o próximo ensaio',
      preview: 'Precisamos trabalhar mais na introdução de Stairway to Heaven. A bateria está um pouco fora de compasso no refrão...',
      data: 'Ontem',
      tags: ['ensaio', 'melhorias'],
      banda: {
        id: '1',
        nome: 'Banda de Rock'
      }
    },
    {
      id: '2',
      titulo: 'Repertório para o show',
      preview: 'Lista de músicas confirmadas para o próximo show...',
      data: '3 dias atrás',
      tags: ['repertório', 'show'],
      banda: {
        id: '1',
        nome: 'Banda de Rock'
      }
    },
    {
      id: '3',
      titulo: 'Equipamentos necessários',
      preview: 'Lista de equipamentos que precisamos comprar para o próximo show...',
      data: '1 semana atrás',
      tags: ['equipamentos', 'compras'],
      banda: {
        id: '2',
        nome: 'Banda de Jazz'
      }
    }
  ];

  // Extrair todas as tags únicas
  const todasAsTags = Array.from(
    new Set(anotacoes.flatMap(anotacao => anotacao.tags))
  );

  // Filtrar anotações por tag
  const anotacoesFiltradas = filtroTag === 'todas' 
    ? anotacoes 
    : anotacoes.filter(anotacao => anotacao.tags.includes(filtroTag));

  return (
    <div>
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-xl font-semibold text-gray-900">Anotações</h1>
          <p className="mt-2 text-sm text-gray-700">
            Suas anotações pessoais e da banda.
          </p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <Link
            to="/gestor/anotacoes/nova"
            className="inline-flex items-center justify-center rounded-md border border-transparent bg-primary-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 sm:w-auto"
          >
            Nova Anotação
          </Link>
        </div>
      </div>

      {/* Filtros */}
      <div className="mt-6">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setFiltroTag('todas')}
            className={`px-3 py-1 rounded-full text-xs font-medium ${
              filtroTag === 'todas'
                ? 'bg-primary-100 text-primary-800'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Todas
          </button>
          {todasAsTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setFiltroTag(tag)}
              className={`px-3 py-1 rounded-full text-xs font-medium ${
                filtroTag === tag
                  ? 'bg-primary-100 text-primary-800'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Lista de Anotações */}
      <div className="mt-6 grid gap-6 sm:grid-cols-1 lg:grid-cols-2">
        {anotacoesFiltradas.length === 0 ? (
          <div className="col-span-2 text-center py-12">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">Nenhuma anotação encontrada</h3>
            <p className="mt-1 text-sm text-gray-500">
              {filtroTag === 'todas'
                ? 'Comece criando uma nova anotação.'
                : `Nenhuma anotação encontrada com a tag "${filtroTag}".`}
            </p>
            {filtroTag !== 'todas' && (
              <div className="mt-6">
                <button
                  type="button"
                  onClick={() => setFiltroTag('todas')}
                  className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                >
                  Ver todas as anotações
                </button>
              </div>
            )}
          </div>
        ) : (
          anotacoesFiltradas.map((anotacao) => (
            <div
              key={anotacao.id}
              className="bg-white overflow-hidden shadow rounded-lg divide-y divide-gray-200 flex flex-col h-full"
            >
              <div className="px-4 py-5 sm:p-6 flex-1">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-gray-500">{anotacao.banda.nome}</p>
                  <p className="text-xs text-gray-500">{anotacao.data}</p>
                </div>
                <Link
                  to={`/gestor/anotacoes/${anotacao.id}`}
                  className="mt-2 block"
                >
                  <h3 className="text-lg font-medium text-gray-900">{anotacao.titulo}</h3>
                  <p className="mt-1 text-sm text-gray-600 line-clamp-3">
                    {anotacao.preview}
                  </p>
                </Link>
                <div className="mt-4 flex flex-wrap gap-2">
                  {anotacao.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="px-4 py-4 sm:px-6 bg-gray-50 text-right">
                <Link
                  to={`/gestor/anotacoes/${anotacao.id}`}
                  className="text-sm font-medium text-primary-600 hover:text-primary-500"
                >
                  Ver mais <span aria-hidden="true">&rarr;</span>
                </Link>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AnotacoesPage;
