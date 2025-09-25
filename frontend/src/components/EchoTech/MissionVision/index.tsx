import React from 'react';
import { LightBulbIcon, EyeIcon } from '@heroicons/react/24/outline';

const MissionVision: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Missão */}
        <div className="relative bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-[#6A0DAD] to-black opacity-0 group-hover:opacity-5 transition-opacity duration-300"></div>
          <div className="relative z-10">
            <div className="flex items-center mb-6">
              <div className="p-3 bg-gradient-to-br from-[#6A0DAD] to-[#8A2BE2] rounded-xl mr-4 shadow-md">
                <LightBulbIcon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#6A0DAD] to-[#8A2BE2]">
                Missão
              </h3>
            </div>
            <p className="text-gray-700 leading-relaxed text-justify">
              Criar soluções tecnológicas práticas, eficazes e que busquem ser cada vez mais acessíveis, 
              tornando o dia a dia das pessoas mais fácil, conectado e cheio de significado. Queremos 
              ouvir as reais necessidades de quem usa, para transformar tecnologia em algo inovador e 
              que faça diferença.
            </p>
          </div>
        </div>

        {/* Visão */}
        <div className="relative bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-[#6A0DAD] to-[#C0C0C0] opacity-0 group-hover:opacity-5 transition-opacity duration-300"></div>
          <div className="relative z-10">
            <div className="flex items-center mb-6">
              <div className="p-3 bg-gradient-to-br from-[#6A0DAD] to-[#C0C0C0] rounded-xl mr-4 shadow-md">
                <EyeIcon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#6A0DAD] to-[#C0C0C0]">
                Visão
              </h3>
            </div>
            <p className="text-gray-700 leading-relaxed text-justify">
              Ser uma empresa reconhecida por criar soluções tecnológicas inovadoras, simples e acessíveis, 
              que conectem pessoas e facilitem suas vidas, promovendo progresso contínuo e impacto positivo 
              em diferentes realidades.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MissionVision;
