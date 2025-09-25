import React from 'react';
import { GestorLayout } from '@/components/Layout/GestorLayout';

export const GestorPage: React.FC = () => {
  return (
    <GestorLayout>
      <div className="py-6 w-full">
        <div className="w-full px-4 sm:px-6 md:px-8">
          <h2 className="text-2xl font-semibold text-gray-900">Bem-vindo ao Painel do Gestor</h2>
          <div className="py-4">
            <div className="border-2 border-dashed border-gray-200 rounded-lg h-96 flex items-center justify-center w-full">
              <p className="text-gray-500">Selecione uma opção no menu acima para começar</p>
            </div>
          </div>
        </div>
      </div>
    </GestorLayout>
  );
};

export default GestorPage;
