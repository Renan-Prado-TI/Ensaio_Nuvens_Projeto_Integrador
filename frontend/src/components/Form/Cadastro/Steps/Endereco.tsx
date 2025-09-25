import React, { useState, useEffect } from 'react';
import type { Endereco } from '../../../../types/cadastro';

const estadosBrasil = [
  'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA',
  'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN',
  'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'
];

const tiposLogradouro = [
  'Rua', 'Avenida', 'Rodovia', 'Alameda', 'Estrada',
  'Travessa', 'Viela', 'Praça', 'Quadra', 'Largo', 'Outro'
];

interface EnderecoStepProps {
  data: Endereco;
  updateData: (data: Endereco) => void;
}

const EnderecoStep: React.FC<EnderecoStepProps> = ({ data, updateData }) => {
  const [formData, setFormData] = useState<Endereco>(data);
  const [loadingCep, setLoadingCep] = useState(false);

  useEffect(() => {
    updateData(formData);
  }, [formData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCepBlur = async (e: React.FocusEvent<HTMLInputElement>) => {
    const cep = e.target.value.replace(/\D/g, '');
    
    if (cep.length === 8) {
      try {
        setLoadingCep(true);
        // Simulando busca de CEP (remova o comentário para usar a API real)
        // const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        // const data = await response.json();
        
        // Simulação de dados (remova quando usar a API real)
        const data = {
          logradouro: 'Rua Exemplo',
          bairro: 'Bairro Exemplo',
          localidade: 'Cidade Exemplo',
          uf: 'SP'
        };
        
        if (data) {
          setFormData(prev => ({
            ...prev,
            logradouro: data.logradouro || '',
            bairro: data.bairro || '',
            cidade: data.localidade || '',
            estado: data.uf || ''
          }));
        }
      } catch (error) {
        console.error('Erro ao buscar CEP:', error);
      } finally {
        setLoadingCep(false);
      }
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold mb-4">Endereço</h2>
      
      <div>
        <label htmlFor="cep" className="block text-sm font-medium text-gray-700">
          CEP
        </label>
        <div className="mt-1 relative rounded-md shadow-sm">
          <input
            type="text"
            id="cep"
            name="cep"
            value={formData.cep}
            onChange={handleChange}
            onBlur={handleCepBlur}
            maxLength={9}
            placeholder="00000-000"
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm p-2 border"
            />
          {loadingCep && (
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <div className="animate-spin h-5 w-5 text-purple-600">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </div>
            </div>
          )}
        </div>
      </div>
      
      <div className="grid grid-cols-4 gap-4">
        <div className="col-span-1">
          <label htmlFor="tipoLogradouro" className="block text-sm font-medium text-gray-700">
            Tipo
          </label>
          <select
            id="tipoLogradouro"
            name="tipoLogradouro"
            value={formData.tipoLogradouro}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm p-2 border"
            >
            {tiposLogradouro.map(tipo => (
              <option key={tipo} value={tipo}>{tipo}</option>
            ))}
          </select>
        </div>
        <div className="col-span-3">
          <label htmlFor="logradouro" className="block text-sm font-medium text-gray-700">
            Logradouro
          </label>
          <input
            type="text"
            id="logradouro"
            name="logradouro"
            value={formData.logradouro}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm p-2 border"
            />
        </div>
      </div>
      
      <div className="grid grid-cols-4 gap-4">
        <div className="col-span-1">
          <label htmlFor="numero" className="block text-sm font-medium text-gray-700">
            Número
          </label>
          <input
            type="text"
            id="numero"
            name="numero"
            value={formData.numero}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm p-2 border"
            />
        </div>
        <div className="col-span-3">
          <label htmlFor="complemento" className="block text-sm font-medium text-gray-700">
            Complemento
          </label>
          <input
            type="text"
            id="complemento"
            name="complemento"
            value={formData.complemento}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm p-2 border"
          />
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="bairro" className="block text-sm font-medium text-gray-700">
            Bairro
          </label>
          <input
            type="text"
            id="bairro"
            name="bairro"
            value={formData.bairro}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm p-2 border"
            />
        </div>
        <div>
          <label htmlFor="cidade" className="block text-sm font-medium text-gray-700">
            Cidade
          </label>
          <input
            type="text"
            id="cidade"
            name="cidade"
            value={formData.cidade}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm p-2 border"
            />
        </div>
      </div>
      
      <div>
        <label htmlFor="estado" className="block text-sm font-medium text-gray-700">
          Estado
        </label>
        <select
          id="estado"
          name="estado"
          value={formData.estado}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm p-2 border"
        >
          <option value="">Selecione...</option>
          {estadosBrasil.map(uf => (
            <option key={uf} value={uf}>{uf}</option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default EnderecoStep;
