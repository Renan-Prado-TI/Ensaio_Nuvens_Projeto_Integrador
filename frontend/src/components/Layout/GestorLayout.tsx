import { useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Tabs } from '../ui/tabs';
import Sidebar from '../Sidebar';
import Header from '../Header';

interface GestorLayoutProps {
  children?: ReactNode;
}

const menuItems = [
  { id: 'dashboard', label: 'Dashboard', to: '/gestor' },
  { id: 'bandas', label: 'Bandas', to: '/gestor/bandas' },
  { id: 'musicas', label: 'Músicas', to: '/gestor/musicas' },
  { id: 'musicos', label: 'Músicos', to: '/gestor/musicos' },
  { id: 'notificacoes', label: 'Notificações', to: '/gestor/notificacoes' },
  { id: 'anotacoes', label: 'Anotações', to: '/gestor/anotacoes' },
];

export const GestorLayout: React.FC<GestorLayoutProps> = ({ children }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const location = useLocation();

  // Gerencia o estado do menu baseado no tamanho da tela
  useEffect(() => {
    const handleResize = () => {
      const isMobile = window.innerWidth < 1024;
      if (isMobile) {
        setMobileMenuOpen(false);
      }
    };
    
    // Define o estado inicial baseado no tamanho da tela
    const isMobile = window.innerWidth < 1024;
    if (isMobile) {
      setIsExpanded(false);
    }

    handleResize(); // Chama na montagem para definir o estado inicial
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Fecha o menu mobile ao mudar de rota
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-gray-50 flex w-full">
      {/* Sidebar - Visível apenas em telas grandes ou quando o menu móvel está aberto */}
      <div 
        className={`fixed inset-y-0 left-0 z-30 ${mobileMenuOpen ? 'block' : 'hidden lg:block'}`}
        onMouseEnter={() => window.innerWidth >= 1024 && setIsExpanded(true)}
        onMouseLeave={() => window.innerWidth >= 1024 && !mobileMenuOpen && setIsExpanded(false)}
      >
        <Sidebar 
          isExpanded={window.innerWidth >= 1024 ? isExpanded : mobileMenuOpen}
          onToggleExpand={() => {
            if (window.innerWidth < 1024) {
              setMobileMenuOpen(!mobileMenuOpen);
            } else {
              setIsExpanded(!isExpanded);
            }
          }}
        />
      </div>

      {/* Overlay para mobile - Só aparece quando o menu móvel está aberto */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-20 bg-black bg-opacity-50 transition-opacity lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Conteúdo principal */}
      <div className="flex-1 flex flex-col min-w-0 w-full">
        {/* Header personalizado */}
        <Header 
          onMenuClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
          sidebarExpanded={isExpanded} 
          title="Painel do Gestor"
        />

        {/* Navegação por abas */}
        <div className="border-b border-gray-200 w-full bg-white">
          <div className="w-full px-4 sm:px-6 lg:px-8">
            <Tabs items={menuItems} />
          </div>
        </div>

        {/* Conteúdo da página */}
        <main 
          className={`flex-1 overflow-auto bg-gray-50 transition-all duration-300 pt-16 ${
            isExpanded ? 'lg:ml-64' : 'lg:ml-20'
          }`}
        >
          <div className="w-full p-4 sm:p-6">
            {children || <Outlet />}
          </div>
        </main>
        
        {/* Rodapé */}
        <footer className="bg-white border-t border-gray-200 py-6 w-full mt-auto">
          <div className="w-full px-4 sm:px-6">
            <p className="text-sm text-gray-500 text-center">
              © {new Date().getFullYear()} EnsaioNuvens. Sistema de Gestão de Bandas.
            </p>
            <div className="mt-4 flex justify-center space-x-6">
              <a href="#" className="text-sm text-gray-500 hover:text-[#6A0DAD]">
                Sobre
              </a>
              <a href="#" className="text-sm text-gray-500 hover:text-[#6A0DAD]">
                Contato
              </a>
              <a href="#" className="text-sm text-gray-500 hover:text-[#6A0DAD]">
                Privacidade
              </a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default GestorLayout;
