import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  HomeIcon, 
  MusicalNoteIcon,
  UserPlusIcon,
  UserGroupIcon,
  BellIcon,
  ClipboardDocumentListIcon,
  Cog6ToothIcon,
  UserCircleIcon,
  ArrowLeftOnRectangleIcon,
  Bars3Icon
} from '@heroicons/react/24/outline';

interface NavItemType {
  id: string;
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  current: boolean;
}

interface SidebarProps {
  isExpanded?: boolean;
  onToggleExpand?: () => void;
}

// Componente para o título Echo Tech com cores diferentes
const EchoTechTitle = () => (
  <div className="flex items-center">
    <span className="text-[#9B59B6]">Echo</span>
    <span className="text-[#E0E0E0]">Tech</span>
  </div>
);

// Definição dos itens de navegação do Gestor
const gestorNavigation: NavItemType[] = [
  { 
    id: 'dashboard',
    name: 'Dashboard',
    href: '/gestor', 
    icon: HomeIcon,
    current: false
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
    current: false
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
function classNames(...classes: (string | boolean | undefined)[]): string {
  return classes.filter(Boolean).join(' ');
}

// Componente de item de navegação
function NavItem({ item, isExpanded, isActive, onMobileClose }: { 
  item: NavItemType; 
  isExpanded: boolean; 
  isActive: boolean;
  onMobileClose?: () => void;
}) {
  return (
    <Link
      to={item.href}
      className={classNames(
        isActive 
          ? 'text-white bg-[rgba(106,13,173,0.2)] border-l-2 border-[#6A0DAD]' 
          : 'text-[#C0C0C0] hover:bg-[rgba(255,255,255,0.03)] hover:text-white',
        'group flex items-center transition-all duration-200',
        isExpanded ? 'px-4 py-2.5 mx-1.5' : 'justify-center py-2.5',
        'text-sm font-medium'
      )}
      onClick={() => onMobileClose && onMobileClose()}
    >
      <item.icon
        className={classNames(
          isActive ? 'text-white' : 'text-[#C0C0C0] group-hover:text-white',
          'flex-shrink-0 transition-colors duration-200',
          isExpanded ? 'h-5 w-5 mr-3' : 'h-5 w-5 mx-auto'
        )}
        aria-hidden="true"
      />
      <span
        className={classNames(
          'whitespace-nowrap',
          isExpanded ? 'opacity-100' : 'opacity-0 w-0 overflow-hidden',
          'transition-all duration-300'
        )}
      >
        {item.name}
      </span>
    </Link>
  );
}

const Sidebar: React.FC<SidebarProps> = ({ 
  isExpanded = false,
  onToggleExpand = () => {}
}) => {
  const location = useLocation();
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isClientSide, setIsClientSide] = useState(false);

  // Garante que o componente está no cliente para evitar problemas de hidratação
  useEffect(() => {
    setIsClientSide(true);
    const isMobileView = window.innerWidth < 1024;
    setIsMobile(isMobileView);
  }, []);

  // Atualiza o estado de mobile quando a tela for redimensionada
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      if (!mobile) {
        setIsHovered(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Verifica se o item está ativo
  const isActive = (path: string): boolean => {
    return location.pathname.startsWith(path) || 
           (path === '/' && location.pathname === '/');
  };
  
  // Filtra os itens de navegação baseado no caminho atual
  const getFilteredNavItems = (navItems: NavItemType[]): NavItemType[] => {
    return navItems.map(item => ({
      ...item,
      current: isActive(item.href)
    }));
  };

  // Determina se o sidebar deve aparecer expandido
  const shouldExpand = isExpanded || (!isMobile && isHovered);
  
  return (
    <div 
      className={`flex flex-col h-screen transition-all duration-300 ${shouldExpand ? 'w-64' : 'w-20'}`}
      style={{
        backgroundColor: 'rgb(30, 30, 50)', /* Tom de roxo mais claro que o fundo */
        borderRight: '1px solid rgba(255, 255, 255, 0.03)',
        boxShadow: '2px 0 8px rgba(0, 0, 0, 0.1)'
      }}
      onMouseEnter={() => !isMobile && setIsHovered(true)}
      onMouseLeave={() => !isMobile && setIsHovered(false)}
    >
      {/* Cabeçalho fixo */}
      <div className="flex-shrink-0 relative">
        <div className="flex items-center justify-center h-16 bg-[rgb(var(--color-primary))] px-4">
          {isClientSide && (
            <div className="flex items-center justify-center w-full transition-all duration-300">
              <div className={`flex items-center justify-center w-full transition-opacity duration-300 ${
                shouldExpand ? 'opacity-100' : 'opacity-0'
              }`}>
                <EchoTechTitle />
              </div>
              {!shouldExpand && (
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                  <div className="h-8 w-8 flex items-center justify-center text-white/80 hover:text-white transition-colors duration-200">
                    <Bars3Icon className="h-5 w-5" />
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Conteúdo rolável */}
      <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600/20 scrollbar-track-transparent hover:scrollbar-thumb-gray-500/30">
        {/* Navegação superior */}
        <nav className="px-2 py-4 space-y-1">
          {getFilteredNavItems(topNavigation).map((item) => (
            <NavItem
              key={item.id}
              item={item}
              isExpanded={shouldExpand}
              isActive={isActive(item.href)}
              onMobileClose={isMobile ? () => onToggleExpand() : undefined}
            />
          ))}
        </nav>

        {/* Navegação principal */}
        <nav className="px-2 py-4 space-y-1">
          {getFilteredNavItems(gestorNavigation).map((item) => (
            <NavItem
              key={item.id}
              item={item}
              isExpanded={shouldExpand}
              isActive={isActive(item.href)}
              onMobileClose={isMobile ? () => onToggleExpand() : undefined}
            />
          ))}
        </nav>
      </div>

      {/* Navegação inferior */}
      <div className="flex-shrink-0 border-t border-white/5 pt-2">
        <nav className="px-2 space-y-1">
          {getFilteredNavItems(bottomNavigation).map((item) => (
            <NavItem
              key={item.id}
              item={item}
              isExpanded={shouldExpand}
              isActive={isActive(item.href)}
              onMobileClose={isMobile ? () => onToggleExpand() : undefined}
            />
          ))}
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
