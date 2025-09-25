import React, { useState, useEffect } from 'react';
import type { DadosPessoais } from '@/types/cadastro';

interface DadosPessoaisStepProps {
  data: DadosPessoais;
  updateData: (data: DadosPessoais) => void;
}

const DadosPessoaisStep: React.FC<DadosPessoaisStepProps> = ({ data, updateData }) => {
  const [formData, setFormData] = useState<DadosPessoais>(data);
  const [cpfMask, setCpfMask] = useState('');
  const [phoneMask, setPhoneMask] = useState('');

  useEffect(() => {
    updateData(formData);
  }, [formData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const formatCPF = (value: string) => {
    const cleaned = value.replace(/\D/g, '');
    let formatted = cleaned;
    
    if (cleaned.length > 3) {
      formatted = `${cleaned.substr(0, 3)}.${cleaned.substr(3)}`;
    }
    if (cleaned.length > 6) {
      formatted = `${formatted.substr(0, 7)}.${formatted.substr(7)}`;
    }
    if (cleaned.length > 9) {
      formatted = `${formatted.substr(0, 11)}-${formatted.substr(11)}`;
    }
    
    setCpfMask(formatted);
    setFormData(prev => ({
      ...prev,
      cpf: cleaned
    }));
  };

  const formatPhone = (value: string) => {
    const cleaned = value.replace(/\D/g, '');
    let formatted = cleaned;
    
    if (cleaned.length > 2) {
      formatted = `(${cleaned.substr(0, 2)}) ${cleaned.substr(2)}`;
    }
    if (cleaned.length > 7) {
      formatted = `${formatted.substr(0, 10)}-${formatted.substr(10)}`;
    }
    
    setPhoneMask(formatted);
    setFormData(prev => ({
      ...prev,
      telefone: cleaned
    }));
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold mb-4">Dados Pessoais</h2>
      
      <div>
        <label htmlFor="nomeCompleto" className="block text-sm font-medium text-gray-700">
          Nome Completo
        </label>
        <input
          type="text"
          id="nomeCompleto"
          name="nomeCompleto"
          value={formData.nomeCompleto}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm p-2 border"
        />
      </div>
      
      <div>
        <label htmlFor="cpf" className="block text-sm font-medium text-gray-700">
          CPF
        </label>
        <input
          type="text"
          id="cpf"
          value={cpfMask}
          onChange={(e) => formatCPF(e.target.value)}
          maxLength={14}
          placeholder="000.000.000-00"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm p-2 border"
        />
      </div>
      
      <div>
        <label htmlFor="dataNascimento" className="block text-sm font-medium text-gray-700">
          Data de Nascimento
        </label>
        <input
          type="date"
          id="dataNascimento"
          name="dataNascimento"
          value={formData.dataNascimento}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm p-2 border"
        />
      </div>
      
      <div>
        <label htmlFor="telefone" className="block text-sm font-medium text-gray-700">
          Telefone
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
    </div>
  );
};

export default DadosPessoaisStep;
