import React, { useState, useEffect } from 'react';
import type { DadosGestor } from '../../../../types/cadastro';
import { PhotoIcon } from '@heroicons/react/24/outline';

interface DadosBandaStepProps {
  data: DadosGestor;
  updateData: (data: DadosGestor) => void;
}

const DadosBandaStep: React.FC<DadosBandaStepProps> = ({ data, updateData }) => {
  const [formData, setFormData] = useState<DadosGestor>(data);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [phoneMask, setPhoneMask] = useState('');

  useEffect(() => {
    updateData(formData);
  }, [formData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Simulando upload - em produção, você faria o upload para um servidor
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result as string);
        setFormData(prev => ({
          ...prev,
          logo: file,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const formatPhone = (value: string) => {
    const cleaned = value.replace(/\D/g, '');
    let formatted = cleaned;
    
    if (cleaned.length > 2) {
      formatted = `(${cleaned.substring(0, 2)}) ${cleaned.substring(2)}`;
    }
    if (cleaned.length > 7) {
      formatted = `${formatted.substring(0, 10)}-${formatted.substring(10, 15)}`;
    }
    
    setPhoneMask(formatted);
    setFormData(prev => ({
      ...prev,
      telefone: cleaned
    }));
  };

  // Função para formatar CNPJ (apenas formatação, sem atualizar o estado)
  const formatCNPJ = (value: string): { cleaned: string; formatted: string } => {
    // Remove tudo que não for dígito
    const cleaned = value.replace(/\D/g, '');
    
    // Aplica a formatação do CNPJ: 00.000.000/0000-00
    let formatted = cleaned;
    if (cleaned.length > 2) {
      formatted = `${cleaned.substring(0, 2)}.${cleaned.substring(2)}`;
    }
    if (cleaned.length > 5) {
      formatted = `${formatted.substring(0, 6)}.${formatted.substring(6)}`;
    }
    if (cleaned.length > 8) {
      formatted = `${formatted.substring(0, 10)}/${formatted.substring(10)}`;
    }
    if (cleaned.length > 12) {
      formatted = `${formatted.substring(0, 15)}-${formatted.substring(15, 17)}`;
    }
    
    return { cleaned: cleaned.substring(0, 14), formatted };
  };
  
  // Estado para o valor formatado do CNPJ
  const [cnpjMask, setCnpjMask] = useState(data.cnpj || '');
  
  // Atualiza a máscara do CNPJ quando o valor mudar
  const handleCnpjChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { cleaned, formatted } = formatCNPJ(e.target.value);
    setCnpjMask(formatted);
    
    // Atualiza o formData com o CNPJ limpo (apenas números)
    setFormData(prev => ({
      ...prev,
      cnpj: cleaned
    }));
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-center">Sobre sua Banda/Orquestra</h2>
      
      <div className="space-y-6">
        {/* Logo no topo e centralizado */}
        <div className="flex flex-col items-center">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Logo da Banda/Orquestra
          </label>
          <div className="relative w-32 h-32 rounded-full bg-gray-100 overflow-hidden border-2 border-dashed border-gray-300 flex items-center justify-center">
            {logoPreview ? (
              <img
                src={logoPreview}
                alt="Logo da banda"
                className="w-full h-full object-cover"
              />
            ) : (
              <PhotoIcon className="h-12 w-12 text-gray-400" />
            )}
            <input
              id="logo"
              name="logo"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
          </div>
          <p className="mt-2 text-sm text-gray-600 text-center">
            Clique para adicionar um logo
            <br />
            <span className="text-xs text-gray-500">Formatos: JPG, PNG (Máx. 5MB)</span>
          </p>
        </div>

        {/* Nome da Banda */}
        <div>
          <label htmlFor="nomeBanda" className="block text-sm font-medium text-gray-700">
            Nome da Banda/Orquestra *
          </label>
          <input
            type="text"
            id="nomeBanda"
            name="nomeBanda"
            value={formData.nomeBanda}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm p-2 border"
          />
        </div>

        {/* CNPJ */}
        <div>
          <label htmlFor="cnpj" className="block text-sm font-medium text-gray-700">
            CNPJ (Opcional)
          </label>
          <input
            type="text"
            id="cnpj"
            name="cnpj"
            value={cnpjMask}
            onChange={handleCnpjChange}
            placeholder="00.000.000/0000-00"
            maxLength={18}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm p-2 border"
          />
        </div>
        
        <div>
          <label htmlFor="telefone" className="block text-sm font-medium text-gray-700">
            Telefone para Contato
          </label>
          <input
            type="tel"
            id="telefone"
            value={phoneMask}
            onChange={(e) => formatPhone(e.target.value)}
            maxLength={15}
            placeholder="(00) 00000-0000"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm p-2 border"
          />
        </div>
        
        <div>
          <label htmlFor="descricao" className="block text-sm font-medium text-gray-700">
            Sobre a Banda/Orquestra
          </label>
          <div className="mt-1">
            <textarea
              id="descricao"
              name="descricao"
              rows={4}
              value={formData.descricao}
              onChange={handleChange}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm p-2 border"
              placeholder="Conte um pouco sobre o estilo musical, história, conquistas, etc."
            />
          </div>
          <p className="mt-1 text-sm text-gray-500">
            Esta descrição aparecerá no perfil público da sua banda/orquestra.
          </p>
        </div>
      </div>
      
      <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mt-6">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <p className="text-sm text-blue-700">
              Você poderá adicionar mais bandas/orquestras e gerenciar seus membros após o cadastro.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DadosBandaStep;
