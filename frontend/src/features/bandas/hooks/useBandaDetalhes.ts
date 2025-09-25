import { useState, useEffect } from 'react';
import type { Banda } from '../types/banda';
import { buscarBandaPorId } from '../api/mockBandaService';

export function useBandaDetalhes(id?: string) {
  const [banda, setBanda] = useState<Banda | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  console.log('=== HOOK useBandaDetalhes ===');
  console.log('ID recebido:', id);

  useEffect(() => {
    const carregarBanda = async () => {
      try {
        console.log('Iniciando carregamento da banda...');
        if (!id) {
          console.log('ID não fornecido, retornando');
          return;
        }

        setLoading(true);
        setError(null);

        console.log('Chamando buscarBandaPorId com ID:', id);
        const dados = await buscarBandaPorId(parseInt(id, 10));
        console.log('Dados retornados de buscarBandaPorId:', dados);

        if (dados) {
          console.log('Banda encontrada, definindo estado');
          setBanda(dados);
          setError(null);
        } else {
          console.log('Banda não encontrada, definindo erro');
          setError(new Error('Banda não encontrada'));
          setBanda(null);
        }
      } catch (err) {
        console.error('Erro no hook useBandaDetalhes:', err);
        setError(err instanceof Error ? err : new Error('Erro ao carregar a banda'));
        setBanda(null);
      } finally {
        console.log('Finalizando carregamento da banda');
        setLoading(false);
      }
    };

    carregarBanda();
  }, [id]);

  console.log('Estado atual do hook:', { banda: !!banda, loading, error: error?.message });

  return { banda, loading, error };
}
