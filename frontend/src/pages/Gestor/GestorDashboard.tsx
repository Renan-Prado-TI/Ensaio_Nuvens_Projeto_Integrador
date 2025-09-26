
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  UserGroupIcon, 
  MusicalNoteIcon, 
  CalendarIcon,
  ClockIcon,
  DocumentTextIcon,
  PlusIcon,
  ArrowRightIcon,
  UserIcon,
  ClipboardDocumentCheckIcon,
  UsersIcon
} from '@heroicons/react/24/outline';

// Tipos
interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ComponentType<{ className?: string }>;
  link?: string;
  description?: string;
}

interface ActivityItem {
  id: number;
  title: string;
  time: string;
  type: 'band' | 'music' | 'event' | 'note';
}

interface EventItem {
  id: number;
  title: string;
  date: string;
  time: string;
  type: 'rehearsal' | 'show' | 'meeting' | 'other';
}

// Componente de Card de Estatística
const StatCard: React.FC<StatCardProps> = ({ title, value, icon: Icon, link, description }) => {
  const content = (
    <div className="bg-white rounded-lg shadow p-6 hover:shadow-md transition-all h-full">
      <div className="flex items-start justify-between h-full">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <p className="mt-1 text-2xl font-semibold text-gray-900">{value}</p>
          {description && <p className="mt-2 text-xs text-gray-500">{description}</p>}
        </div>
        <div className="bg-primary-50 rounded-md p-3 ml-4">
          <Icon className="h-6 w-6 text-primary-600" />
        </div>
      </div>
    </div>
  );

  return link ? (
    <Link to={link} className="block h-full">
      {content}
    </Link>
  ) : (
    content
  );
};

// Componente de Atividade Recente
const ActivityItem: React.FC<ActivityItem> = ({ title, time, type }) => {
  const getIcon = () => {
    switch (type) {
      case 'band':
        return <UserGroupIcon className="h-5 w-5 text-purple-500" />;
      case 'music':
        return <MusicalNoteIcon className="h-5 w-5 text-green-500" />;
      case 'event':
        return <CalendarIcon className="h-5 w-5 text-yellow-500" />;
      case 'note':
        return <DocumentTextIcon className="h-5 w-5 text-blue-500" />;
      default:
        return <DocumentTextIcon className="h-5 w-5 text-gray-400" />;
    }
  };

  return (
    <li className="py-3 border-b border-gray-100 last:border-0">
      <div className="flex items-start">
        <div className="flex-shrink-0 mt-0.5">
          <div className="p-1.5 bg-gray-50 rounded-full">
            {getIcon()}
          </div>
        </div>
        <div className="ml-3 flex-1 min-w-0">
          <p className="text-sm font-medium text-gray-900 truncate">{title}</p>
          <p className="text-xs text-gray-500 mt-0.5">{time}</p>
        </div>
      </div>
    </li>
  );
};

// Componente de Evento Próximo
const EventItem: React.FC<EventItem> = ({ title, date, time, type }) => {
  const getEventType = () => {
    switch (type) {
      case 'rehearsal':
        return { text: 'Ensaio', color: 'bg-blue-100 text-blue-800' };
      case 'show':
        return { text: 'Show', color: 'bg-purple-100 text-purple-800' };
      case 'meeting':
        return { text: 'Reunião', color: 'bg-yellow-100 text-yellow-800' };
      default:
        return { text: 'Outro', color: 'bg-gray-100 text-gray-800' };
    }
  };

  const eventType = getEventType();

  return (
    <div className="p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
      <div className="flex items-start">
        <div className="text-center mr-3">
          <div className="text-sm font-medium text-gray-500">{date.split(' ')[0]}</div>
          <div className="text-xl font-bold text-gray-900">{date.split(' ')[1]}</div>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-start">
            <h4 className="text-sm font-medium text-gray-900 truncate">{title}</h4>
            <span className={`px-2 py-1 text-xs rounded-full ${eventType.color}`}>
              {eventType.text}
            </span>
          </div>
          <div className="mt-1 flex items-center text-sm text-gray-500">
            <ClockIcon className="h-4 w-4 mr-1" />
            {time}
          </div>
        </div>
      </div>
    </div>
  );
};

// Dados de exemplo
const recentActivities: ActivityItem[] = [
  {
    id: 1,
    type: 'band',
    title: 'Banda "Os Violões" - Repertório atualizado',
    time: 'Há 15 minutos'
  },
  {
    id: 2,
    type: 'music',
    title: '3 novas músicas adicionadas ao catálogo',
    time: 'Hoje, 10:30'
  },
  {
    id: 3,
    type: 'event',
    title: 'Ensaio confirmado para sábado às 14h',
    time: 'Ontem, 18:45'
  },
  {
    id: 4,
    type: 'note',
    title: 'Lembrar: Pagar aluguel do estúdio até sexta',
    time: 'Ontem, 14:20'
  },
  {
    id: 5,
    type: 'band',
    title: 'Novo músico adicionado à banda "No Tom"',
    time: 'Terça, 10:15'
  }
];

// Próximos eventos
const upcomingEvents: EventItem[] = [
  {
    id: 1,
    title: 'Ensaio da Banda "Os Violões"',
    date: 'Sáb 15',
    time: '14:00 - 17:00',
    type: 'rehearsal'
  },
  {
    id: 2,
    title: 'Show no Parque da Cidade',
    date: 'Dom 23',
    time: '19:00 - 22:00',
    type: 'show'
  },
  {
    id: 3,
    title: 'Reunião com produtor',
    date: 'Seg 24',
    time: '20:00 - 21:00',
    type: 'meeting'
  }
];

// Notas importantes
const importantNotes = [
  {
    id: 1,
    title: 'Contratar baterista',
    content: 'Entrevistar candidatos para vaga de baterista até o final do mês.',
    priority: 'high',
    date: 'Prazo: 30/06'
  },
  {
    id: 2,
    title: 'Orçamento 2º semestre',
    content: 'Preparar orçamento para shows e ensaios do segundo semestre.',
    priority: 'medium',
    date: 'Prazo: 15/07'
  },
  {
    id: 3,
    title: 'Renovar contrato estúdio',
    content: 'Negociar renovação do aluguel do estúdio de ensaio.',
    priority: 'high',
    date: 'Vence em: 10/07'
  }
];

// Status das bandas
const bandStatus = [
  {
    id: 1,
    name: 'Os Violões',
    status: 'active',
    members: 5,
    nextEvent: 'Sáb, 15/06 - Ensaio'
  },
  {
    id: 2,
    name: 'No Tom',
    status: 'active',
    members: 4,
    nextEvent: 'Sex, 14/06 - Show'
  },
  {
    id: 3,
    name: 'Acústico & Cia',
    status: 'inactive',
    members: 3,
    nextEvent: 'Sem eventos'
  }
];

const GestorDashboard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('activities');

  useEffect(() => {
    // Simulando carregamento de dados
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  return (
    <div className="py-6 w-full space-y-6">
      {/* Cabeçalho */}
      <div className="mb-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Painel do Gestor</h1>
            <p className="mt-1 text-sm text-gray-500">
              Bem-vindo de volta! Aqui está um resumo das suas atividades.
            </p>
          </div>
          <div className="flex space-x-2">
            <button className="px-4 py-2 text-sm font-medium text-primary-600 bg-primary-50 rounded-md hover:bg-primary-100">
              Relatório Mensal
            </button>
          </div>
        </div>
      </div>

      {/* Cards de Estatísticas */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Bandas Ativas"
          value="2/3"
          icon={UserGroupIcon}
          link="/gestor/bandas"
          description="2 ativas de 3 totais"
        />
        <StatCard
          title="Músicos Ativos"
          value="12"
          icon={UsersIcon}
          link="/gestor/musicos"
          description="Em 3 bandas diferentes"
        />
        <StatCard
          title="Músicas no Catálogo"
          value="48"
          icon={MusicalNoteIcon}
          link="/gestor/musicas"
          description="+5 na última semana"
        />
        <StatCard
          title="Próximo Evento"
          value="Amanhã"
          icon={CalendarIcon}
          link="/gestor/eventos"
          description="Ensaio - 14:00"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Atividades Recentes e Status das Bandas */}
        <div className="lg:col-span-2 space-y-6">
          {/* Tabs */}
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <div className="border-b border-gray-200">
              <nav className="flex -mb-px">
                <button
                  onClick={() => setActiveTab('activities')}
                  className={`flex-1 py-4 px-1 text-center border-b-2 font-medium text-sm ${
                    activeTab === 'activities'
                      ? 'border-primary-500 text-primary-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Atividades Recentes
                </button>
                <button
                  onClick={() => setActiveTab('bands')}
                  className={`flex-1 py-4 px-1 text-center border-b-2 font-medium text-sm ${
                    activeTab === 'bands'
                      ? 'border-primary-500 text-primary-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Status das Bandas
                </button>
              </nav>
            </div>
            
            {/* Conteúdo das Tabs */}
            <div className="p-4">
              {activeTab === 'activities' ? (
                <div className="space-y-4">
                  <ul className="divide-y divide-gray-200">
                    {recentActivities.map((activity) => (
                      <ActivityItem key={activity.id} {...activity} />
                    ))}
                  </ul>
                  <div className="text-center mt-4">
                    <Link 
                      to="/gestor/atividades" 
                      className="text-sm font-medium text-primary-600 hover:text-primary-500"
                    >
                      Ver todas as atividades <span aria-hidden="true">&rarr;</span>
                    </Link>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  {bandStatus.map((band) => (
                    <div key={band.id} className="border rounded-lg p-4 hover:bg-gray-50">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium text-gray-900">{band.name}</h4>
                          <div className="flex items-center mt-1 text-sm text-gray-500">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              band.status === 'active' 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-yellow-100 text-yellow-800'
                            }`}>
                              {band.status === 'active' ? 'Ativa' : 'Inativa'}
                            </span>
                            <span className="ml-2">{band.members} integrantes</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium text-gray-900">
                            {band.nextEvent}
                          </p>
                          <Link 
                            to={`/gestor/bandas/${band.id}`} 
                            className="text-sm text-primary-600 hover:text-primary-500"
                          >
                            Ver detalhes
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

        </div>

        {/* Próximos Eventos, Notas e Ações Rápidas */}
        <div className="space-y-6">
          {/* Próximos Eventos */}
          <div className="bg-white shadow overflow-hidden rounded-lg">
            <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium leading-6 text-gray-900">Próximos Eventos</h3>
                <Link 
                  to="/gestor/eventos" 
                  className="text-sm font-medium text-primary-600 hover:text-primary-500"
                >
                  Ver calendário
                </Link>
              </div>
            </div>
            <div className="p-4 space-y-3">
              {upcomingEvents.map((event) => (
                <EventItem key={event.id} {...event} />
              ))}
              <div className="mt-3 text-center">
                <Link 
                  to="/gestor/eventos/novo"
                  className="inline-flex items-center text-sm font-medium text-primary-600 hover:text-primary-500"
                >
                  <PlusIcon className="h-4 w-4 mr-1" />
                  Adicionar Evento
                </Link>
              </div>
            </div>
          </div>

          {/* Notas Importantes */}
          <div className="bg-white shadow overflow-hidden rounded-lg">
            <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
              <h3 className="text-lg font-medium leading-6 text-gray-900">Notas Importantes</h3>
            </div>
            <div className="p-4 space-y-4">
              {importantNotes.map((note) => (
                <div key={note.id} className="border-l-4 border-yellow-400 pl-4 py-1">
                  <div className="flex justify-between items-start">
                    <h4 className="font-medium text-gray-900">{note.title}</h4>
                    <span className="text-xs text-gray-500">{note.date}</span>
                  </div>
                  <p className="mt-1 text-sm text-gray-600">{note.content}</p>
                </div>
              ))}
              <div className="mt-3">
                <Link 
                  to="/gestor/anotacoes"
                  className="inline-flex items-center text-sm font-medium text-primary-600 hover:text-primary-500"
                >
                  Ver todas as anotações <span className="ml-1">→</span>
                </Link>
              </div>
            </div>
          </div>

          {/* Ações Rápidas */}
          <div className="bg-white shadow overflow-hidden rounded-lg">
            <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
              <h3 className="text-lg font-medium leading-6 text-gray-900">Ações Rápidas</h3>
            </div>
            <div className="p-4">
              <div className="grid grid-cols-2 gap-3">
                <Link
                  to="/gestor/bandas/nova"
                  className="flex flex-col items-center justify-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-center"
                >
                  <div className="p-3 bg-purple-100 rounded-full mb-2">
                    <UserGroupIcon className="h-6 w-6 text-purple-600" />
                  </div>
                  <span className="text-sm font-medium">Nova Banda</span>
                </Link>
                
                <Link
                  to="/gestor/musicos/novo"
                  className="flex flex-col items-center justify-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-center"
                >
                  <div className="p-3 bg-green-100 rounded-full mb-2">
                    <UserIcon className="h-6 w-6 text-green-600" />
                  </div>
                  <span className="text-sm font-medium">Novo Músico</span>
                </Link>
                
                <Link
                  to="/gestor/musicas/nova"
                  className="flex flex-col items-center justify-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-center"
                >
                  <div className="p-3 bg-blue-100 rounded-full mb-2">
                    <MusicalNoteIcon className="h-6 w-6 text-blue-600" />
                  </div>
                  <span className="text-sm font-medium">Nova Música</span>
                </Link>
                
                <Link
                  to="/gestor/eventos/novo"
                  className="flex flex-col items-center justify-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-center"
                >
                  <div className="p-3 bg-yellow-100 rounded-full mb-2">
                    <CalendarIcon className="h-6 w-6 text-yellow-600" />
                  </div>
                  <span className="text-sm font-medium">Novo Evento</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GestorDashboard;
