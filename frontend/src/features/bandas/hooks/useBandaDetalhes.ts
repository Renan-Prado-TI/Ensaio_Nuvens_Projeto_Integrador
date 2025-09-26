import { useState, useEffect, useCallback } from 'react';
import type { Banda } from '../types/banda';
import { buscarBandaPorId } from '../api/mockBandaService';
import { useParams } from 'react-router-dom';

export function useBandaDetalhes(id?: string | number) {
  const [banda, setBanda] = useState<Banda | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const params = useParams();

  const carregarBanda = async (bandaId: string | number) => {
    // Não faz nada se não tiver ID
    if (!bandaId) {
      console.log('[useBandaDetalhes] Nenhum ID fornecido para carregamento');
      setBanda(null);
      setLoading(false);
      return null;
    }

    console.log(`[useBandaDetalhes] Buscando banda com ID: ${bandaId} (tipo: ${typeof bandaId})`);
    console.log('Params atuais:', params);
    
    try {
      setLoading(true);
      setError(null);

      const dados = await buscarBandaPorId(bandaId);
      
      if (!dados) {
        const mensagem = `Banda com ID ${bandaId} não encontrada`;
        console.error(`[useBandaDetalhes] ${mensagem}`);
        throw new Error(mensagem);
      }

      console.log(`[useBandaDetalhes] Banda encontrada:`, dados);
      setBanda(dados);
      return dados;
    } catch (err) {
      console.error(`[useBandaDetalhes] Erro ao carregar banda:`, err);
      const error = err instanceof Error ? err : new Error('Erro ao carregar a banda');
      setError(error);
      setBanda(null);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Efeito para carregar a banda quando o ID ou os parâmetros mudarem
  useEffect(() => {
    if (id) {
      carregarBanda(id).catch(console.error);
    }
  }, [id, params]);

  // Função para forçar o recarregamento dos dados
  const recarregar = useCallback(async () => {
    console.log('[useBandaDetalhes] Forçando recarregamento...');
    if (id) {
      try {
        // Força um novo carregamento chamando carregarBanda diretamente
        return await carregarBanda(id);
      } catch (error) {
        console.error('[useBandaDetalhes] Erro ao recarregar banda:', error);
        throw error;
      }
    }
    return null;
  }, [id]);

  return { 
    banda, 
    loading, 
    error,
    recarregar
  };
}
