import React from 'react';
import { 
  LightBulbIcon, 
  SparklesIcon, 
  HeartIcon,
  UserGroupIcon,
  ShieldCheckIcon,
  HandThumbUpIcon
} from '@heroicons/react/24/outline';

const values = [
  {
    name: 'Inovação',
    description: 'Estamos sempre buscando ideias novas para criar soluções que realmente façam a diferença.',
    icon: LightBulbIcon,
  },
  {
    name: 'Simplicidade',
    description: 'Acreditamos que a tecnologia deve ser fácil de usar e entender por todos.',
    icon: SparklesIcon,
  },
  {
    name: 'Acessibilidade',
    description: 'Buscamos tornar nossas soluções cada vez mais acessíveis, evoluindo sempre para incluir e facilitar o uso por todos.',
    icon: ShieldCheckIcon,
  },
  {
    name: 'Empatia',
    description: 'Ouvimos e entendemos as necessidades reais de quem usa nossos produtos e serviços.',
    icon: HeartIcon,
  },
  {
    name: 'Colaboração',
    description: 'Valorizamos o trabalho em equipe, a transparência e o respeito mútuo para alcançar os melhores resultados.',
    icon: UserGroupIcon,
  },
  {
    name: 'Compromisso',
    description: 'Dedicamo-nos a entregar qualidade e a impactar positivamente o dia a dia das pessoas.',
    icon: HandThumbUpIcon,
  },
];

const Values: React.FC = () => {
  return (
    <div className="bg-white p-8 rounded-xl shadow-md">
      <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">Nossos Valores</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {values.map((value, index) => {
          const Icon = value.icon;
          return (
            <div 
              key={index}
              className="p-6 rounded-lg border border-gray-100 hover:border-purple-200 hover:bg-purple-50 transition-all duration-300"
            >
              <div className="flex items-start">
                <div className="p-2 bg-purple-100 rounded-lg mr-4">
                  <Icon className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-1">{value.name}</h4>
                  <p className="text-gray-600 text-sm">{value.description}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Values;
