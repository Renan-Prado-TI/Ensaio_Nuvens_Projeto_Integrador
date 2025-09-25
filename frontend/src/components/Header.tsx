import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeftOnRectangleIcon } from '@heroicons/react/24/outline';

interface HeaderProps {
  onMenuClick: () => void;
}

// Função para obter o título da página com base na URL
function getPageInfo(pathname: string): { title: string; subtitle?: string } {
  const pages: { [key: string]: { title: string; subtitle?: string } } = {
    '/': { 
      title: 'EchoTech',
      subtitle: 'Início'
    },
    '/ensaionuvens': { 
      title: 'Ensaio Nuvens',
      subtitle: 'Sua plataforma musical'
    },
    '/gestor': { 
      title: 'Dashboard',
      subtitle: 'Visão geral do sistema'
    },
    '/gestor/bandas': { 
      title: 'Bandas',
      subtitle: 'Gerencie suas bandas'
    },
    '/gestor/musicas': { 
      title: 'Músicas',
      subtitle: 'Gerencie seu repertório'
    },
    '/gestor/musicos': { 
      title: 'Músicos',
      subtitle: 'Gerencie os músicos'
    },
    '/gestor/notificacoes': { 
      title: 'Notificações',
      subtitle: 'Suas notificações'
    },
    '/gestor/anotacoes': { 
      title: 'Anotações',
      subtitle: 'Suas anotações pessoais'
    },
    '/gestor/configuracoes': { 
      title: 'Configurações',
      subtitle: 'Ajustes da conta'
    },
    '/login': { 
      title: 'Login',
      subtitle: 'Acesse sua conta'
    },
    '/cadastro': { 
      title: 'Cadastro',
      subtitle: 'Crie sua conta'
    },
  };

  // Tenta encontrar uma correspondência exata primeiro
  if (pages[pathname]) {
    return pages[pathname];
  }

  // Se não encontrar, tenta encontrar por prefixo para rotas dinâmicas
  const matchingPath = Object.keys(pages).find(key => 
    pathname.startsWith(key) && key !== '/'
  );

  return matchingPath ? pages[matchingPath] : { 
    title: 'EchoTech',
    subtitle: 'Sua plataforma musical'
  };
}

export default function Header({ onMenuClick }: HeaderProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const { title, subtitle } = getPageInfo(location.pathname);
  const isGestorRoute = location.pathname.startsWith('/gestor');

  const handleLogout = () => {
    // Simula logout apenas no frontend
    navigate('/login');
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Lado esquerdo - Botão de menu e título */}
          <div className="flex items-center">
            <button
              type="button"
              className="rounded-md p-2 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#6A0DAD] lg:hidden"
              onClick={onMenuClick}
            >
              <span className="sr-only">Abrir menu</span>
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" 
                viewBox="0 0 24 24" 
                strokeWidth={1.5} 
                stroke="currentColor" 
                className="w-8 h-8 text-[#6A0DAD]"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            </button>
            
            <div className="ml-4 lg:ml-6">
              <h1 className="text-lg font-semibold text-gray-900">
                {isGestorRoute && (
                  <span className="text-[#6A0DAD] mr-2">Painel do Gestor</span>
                )}
                {title}
              </h1>
              {subtitle && (
                <p className="text-xs text-gray-500">{subtitle}</p>
              )}
            </div>
          </div>
          
          {/* Lado direito - Ações */}
          <div className="flex items-center space-x-4">
            {isGestorRoute ? (
              <button
                onClick={handleLogout}
                className="group flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:text-[#6A0DAD] transition-colors"
                title="Sair"
              >
                <ArrowLeftOnRectangleIcon className="h-5 w-5 text-gray-500 group-hover:text-[#6A0DAD] mr-2" />
                <span className="hidden md:inline">Sair</span>
              </button>
            ) : (
              <button
                onClick={() => navigate('/login')}
                className="group flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:text-[#6A0DAD] transition-colors"
                title="Entrar"
              >
                <ArrowLeftOnRectangleIcon className="h-5 w-5 text-gray-500 group-hover:text-[#6A0DAD] mr-2 transform rotate-180" />
                <span className="hidden md:inline">Entrar</span>
              </button>
            )}
            
            {/* Avatar do usuário */}
            <div className="relative">
              <div className="h-8 w-8 rounded-full bg-gradient-to-r from-[#6A0DAD] to-[#4B0082] flex items-center justify-center text-white font-medium cursor-pointer">
                {isGestorRoute ? 'G' : 'U'}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
