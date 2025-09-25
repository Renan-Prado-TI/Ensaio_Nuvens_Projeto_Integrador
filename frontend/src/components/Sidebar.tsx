import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  HomeIcon, 
  XMarkIcon,
  Bars3Icon,
  ArrowLeftOnRectangleIcon,
  MusicalNoteIcon,
  UserPlusIcon,
  UserGroupIcon,
  BellIcon,
  ClipboardDocumentListIcon,
  Cog6ToothIcon,
  UserCircleIcon
} from '@heroicons/react/24/outline';

interface NavItemType {
  id: string;
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  current: boolean;
}

interface SidebarProps {
  mobileOpen?: boolean;
  onMobileClose?: () => void;
}

interface NavItemProps {
  item: NavItemType;
  isExpanded: boolean;
  isActive: boolean;
  onMobileClose?: () => void;
}

// Componente para o título Echo Tech com cores diferentes
const EchoTechTitle = () => (
  <span>
    <span className="text-[#9B59B6]">Echo</span>
    <span className="text-[#E0E0E0]">Tech</span>
  </span>
);

// Definição dos itens de navegação do Gestor
const gestorNavigation: NavItemType[] = [
  { 
    id: 'dashboard',
    name: 'Dashboard',
    href: '/gestor', 
    icon: HomeIcon,
    current: true
  },
  { 
    id: 'bandas',
    name: 'Bandas',
    href: '/gestor/bandas', 
    icon: UserGroupIcon, 
    current: false
  },
  { 
    id: 'musicas',
    name: 'Músicas',
    href: '/gestor/musicas', 
    icon: MusicalNoteIcon, 
    current: false
  },
  { 
    id: 'musicos',
    name: 'Músicos',
    href: '/gestor/musicos', 
    icon: UserCircleIcon, 
    current: false
  },
  { 
    id: 'notificacoes',
    name: 'Notificações',
    href: '/gestor/notificacoes', 
    icon: BellIcon, 
    current: false
  },
  { 
    id: 'anotacoes',
    name: 'Anotações',
    href: '/gestor/anotacoes', 
    icon: ClipboardDocumentListIcon, 
    current: false
  },
  { 
    id: 'configuracoes',
    name: 'Configurações',
    href: '/gestor/configuracoes', 
    icon: Cog6ToothIcon, 
    current: false
  },
];

// Definição dos itens de navegação superiores
const topNavigation: NavItemType[] = [
  { 
    id: 'echotech',
    name: 'Echo Tech',
    href: '/', 
    icon: HomeIcon,
    current: true
  },
  { 
    id: 'ensaionuvens',
    name: 'Ensaio Nuvens',
    href: '/ensaionuvens', 
    icon: MusicalNoteIcon, 
    current: false
  },
];

// Definição dos itens de navegação inferiores
const bottomNavigation: NavItemType[] = [
  { 
    id: 'login',
    name: 'Login',
    href: '/login', 
    icon: ArrowLeftOnRectangleIcon, 
    current: false
  },
  { 
    id: 'cadastro',
    name: 'Cadastre-se',
    href: '/cadastro', 
    icon: UserPlusIcon, 
    current: false
  },
];

// Função auxiliar para classes condicionais
function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

// Componente de item de navegação
function NavItem({ item, isExpanded, isActive, onMobileClose }: NavItemProps) {
  return (
    <Link
      to={item.href}
      className={classNames(
        isActive
          ? 'bg-[#6A0DAD] text-white'
          : 'text-gray-300 hover:bg-[#4B0082] hover:text-white',
        'group flex items-center px-4 py-3 text-sm font-medium rounded-md transition-all duration-200',
        isExpanded ? 'px-4' : 'justify-center'
      )}
      onClick={() => onMobileClose && onMobileClose()}
    >
      <item.icon
        className={classNames(
          isActive ? 'text-white' : 'text-gray-300 group-hover:text-white',
          'h-6 w-6 flex-shrink-0',
          isExpanded ? 'mr-3' : 'mx-auto'
        )}
        aria-hidden="true"
      />
      <span 
        className={classNames(
          'whitespace-nowrap',
          isExpanded ? 'opacity-100' : 'lg:opacity-0 lg:w-0 lg:overflow-hidden',
          'transition-all duration-300'
        )}
      >
        {item.name}
      </span>
    </Link>
  );
}

export default function Sidebar({ 
  mobileOpen = false, 
  onMobileClose = () => {} 
}: SidebarProps) {
  const location = useLocation();
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

  // Atualiza o estado de mobile quando a janela for redimensionada
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      if (!mobile) {
        setIsExpanded(true);
      } else {
        setIsExpanded(false);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Verifica se o item está ativo
  const isActive = (path: string) => {
    // Verifica se o caminho atual começa com o caminho do item
    // Isso permite que subrotas sejam destacadas corretamente
    return location.pathname.startsWith(path) || 
           (path === '/' && location.pathname === '/');
  };

  const sidebarWidth = isExpanded ? 'w-64' : 'w-20';

  return (
    <>
      {/* Mobile sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-[#1A1A2E] shadow-lg transform transition-transform duration-300 ease-in-out lg:hidden ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between h-16 bg-[#6A0DAD] px-4">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <EchoTechTitle />
              </div>
            </div>
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-[#4B0082] focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              onClick={onMobileClose}
            >
              <span className="sr-only">Fechar menu</span>
              <XMarkIcon className="w-6 h-6" aria-hidden="true" />
            </button>
          </div>

          <div className="flex flex-col h-full overflow-y-auto">
            {/* Navegação do Gestor */}
            <div className="px-4 py-3 border-b border-gray-700">
              <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Menu do Gestor
              </h3>
            </div>
            <div className="px-2 py-4 space-y-1">
              {gestorNavigation.map((item) => (
                <NavItem
                  key={item.id}
                  item={item}
                  isExpanded={true}
                  isActive={isActive(item.href)}
                  onMobileClose={onMobileClose}
                />
              ))}
            </div>

            <div className="px-4 py-3 border-t border-b border-gray-700">
              <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Navegação
              </h3>
            </div>
            <div className="px-2 py-4 space-y-1">
              {topNavigation.map((item) => (
                <NavItem
                  key={item.id}
                  item={item}
                  isExpanded={true}
                  isActive={isActive(item.href)}
                  onMobileClose={onMobileClose}
                />
              ))}
            </div>

            {/* Navegação inferior */}
            <div className="px-2 py-4 border-t border-gray-700">
              {bottomNavigation.map((item) => (
                <NavItem
                  key={item.id}
                  item={item}
                  isExpanded={true}
                  isActive={isActive(item.href)}
                  onMobileClose={onMobileClose}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Desktop sidebar */}
      <div
        className={`hidden lg:flex lg:flex-col bg-[#1A1A2E] shadow-lg transition-all duration-300 ease-in-out overflow-x-hidden ${sidebarWidth}`}
        onMouseEnter={() => !isMobile && setIsExpanded(true)}
        onMouseLeave={() => !isMobile && setIsExpanded(false)}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-center h-16 bg-[#6A0DAD] flex-shrink-0">
            <div className="flex items-center justify-center flex-shrink-0 w-full px-4">
              {isExpanded ? (
                <EchoTechTitle />
              ) : (
                <Bars3Icon className="w-8 h-8 text-white" />
              )}
            </div>
          </div>

          {/* Container principal com altura fixa e scroll */}
          <div className="flex-1 overflow-y-auto min-h-0">
            {/* Navegação do Gestor */}
            <div className="px-4 py-3 border-b border-gray-700">
              <h3 className={`text-xs font-semibold text-gray-400 uppercase tracking-wider transition-opacity duration-300 ${isExpanded ? 'opacity-100' : 'opacity-0'}`}>
                Menu do Gestor
              </h3>
            </div>
            <div className="px-2 py-4 space-y-1">
              {gestorNavigation.map((item) => (
                <NavItem
                  key={item.id}
                  item={item}
                  isExpanded={isExpanded}
                  isActive={isActive(item.href)}
                />
              ))}
            </div>

            <div className="px-4 py-3 border-t border-b border-gray-700">
              <h3 className={`text-xs font-semibold text-gray-400 uppercase tracking-wider transition-opacity duration-300 ${isExpanded ? 'opacity-100' : 'opacity-0'}`}>
                Navegação
              </h3>
            </div>
            <div className="px-2 py-4 space-y-1">
              {topNavigation.map((item) => (
                <NavItem
                  key={item.id}
                  item={item}
                  isExpanded={isExpanded}
                  isActive={isActive(item.href)}
                />
              ))}
            </div>

            {/* Navegação inferior */}
            <div className="px-2 py-4 border-t border-gray-700">
              {bottomNavigation.map((item) => (
                <NavItem
                  key={item.id}
                  item={item}
                  isExpanded={isExpanded}
                  isActive={isActive(item.href)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Overlay para mobile */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-30 bg-black bg-opacity-50 transition-opacity lg:hidden"
          onClick={onMobileClose}
        />
      )}
    </>
  );
}
