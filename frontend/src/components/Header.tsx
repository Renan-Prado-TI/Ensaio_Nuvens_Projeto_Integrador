import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeftOnRectangleIcon, Bars3Icon } from '@heroicons/react/24/outline';
import { useEffect, useState } from 'react';

interface HeaderProps {
  onMenuClick?: () => void;
  sidebarExpanded?: boolean;
}

// Mapeamento de rotas para títulos
const pageTitles: Record<string, { title: string; subtitle: string }> = {
  '/login': {
    title: 'Acesse sua conta',
    subtitle: 'Faça login para continuar'
  },
  '/cadastro': {
    title: 'Crie sua conta',
    subtitle: 'Preencha as informações abaixo para se cadastrar'
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
    subtitle: 'Acompanhe suas notificações'
  },
  '/gestor/anotacoes': {
    title: 'Anotações',
    subtitle: 'Suas anotações pessoais'
  },
  '/gestor/configuracoes': {
    title: 'Configurações',
    subtitle: 'Personalize sua experiência'
  },
  '/ensaionuvens': {
    title: 'EnsaioNuvens',
    subtitle: 'Sistema de Gestão de Bandas'
  },
  '/': {
    title: 'EchoTech',
    subtitle: 'Inovação em Soluções Digitais'
  }
};

// Função para obter o título da página com base na URL
const getPageInfo = (pathname: string) => {
  // Encontra a rota mais específica que corresponde ao caminho atual
  const matchedRoute = Object.keys(pageTitles)
    .sort((a, b) => b.length - a.length) // Ordena do mais específico para o menos
    .find(route => pathname === route || pathname.startsWith(route + '/'));

  return matchedRoute 
    ? pageTitles[matchedRoute] 
    : { title: 'Página não encontrada', subtitle: 'A página solicitada não existe' };
};

const Header: React.FC<HeaderProps> = ({ onMenuClick, sidebarExpanded = false }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [pageTitle, setPageTitle] = useState({ title: '', subtitle: '' });
  const isGestorRoute = location.pathname.startsWith('/gestor');
  const isAuthPage = ['/login', '/cadastro'].includes(location.pathname);

  // Atualiza o título quando a rota mudar
  useEffect(() => {
    const { title, subtitle } = getPageInfo(location.pathname);
    setPageTitle({ title, subtitle: subtitle || '' });
    // Atualiza o título da aba do navegador
    document.title = `${title} | EnsaioNuvens`;
  }, [location.pathname]);

  const handleLogout = () => {
    // Simula logout apenas no frontend
    navigate('/login');
  };

  return (
    <header 
      className={`fixed top-0 right-0 left-0 z-[100] bg-white shadow-sm transition-all duration-300 h-16 flex items-center ${
        sidebarExpanded ? 'lg:left-64' : 'lg:left-20'
      }`}
      style={{
        borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
        color: '#1F2937',
        backgroundColor: 'white',
        position: 'fixed',
        width: '100%',
        height: '4rem',
        display: 'flex',
        alignItems: 'center'
      }}
    >
      <div className="w-full">
        <div className="flex items-center justify-between w-full px-4 sm:px-6 lg:px-8">
          {/* Lado esquerdo - Botão de menu e título */}
          <div className="flex items-center">
            {onMenuClick && (
              <button
                type="button"
                className="lg:hidden p-2 -ml-2 mr-2 rounded-md text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#6A0DAD]"
                onClick={onMenuClick}
              >
                <span className="sr-only">Abrir menu</span>
                <Bars3Icon className="h-6 w-6 text-[#6A0DAD]" aria-hidden="true" />
              </button>
            )}
            <div className="ml-2 lg:ml-4">
              <div className="flex items-center">
                {isGestorRoute && !isAuthPage && (
                  <span className="text-[#6A0DAD] font-medium mr-2">Gestor /</span>
                )}
                <h1 className="text-lg font-semibold text-gray-900" style={{ color: '#111827 !important' }}>
                  {pageTitle.title}
                </h1>
              </div>
              {pageTitle.subtitle && (
                <p className="text-xs mt-1 text-gray-700" style={{ color: '#374151 !important' }}>{pageTitle.subtitle}</p>
              )}
            </div>
          </div>

          {/* Lado direito - Apenas botão de Sair para rotas do gestor */}
          <div className="flex items-center">
            {isGestorRoute && (
              <button
                onClick={handleLogout}
                className="group flex items-center px-3 py-2 text-sm font-medium text-gray-800 hover:text-[#6A0DAD] transition-colors"
                title="Sair"
              >
                <ArrowLeftOnRectangleIcon className="h-5 w-5 text-gray-700 group-hover:text-[#6A0DAD] mr-2" />
                <span className="hidden md:inline">Sair</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
