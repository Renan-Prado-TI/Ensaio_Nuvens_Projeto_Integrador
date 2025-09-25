import { useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';

interface MainLayoutProps {
  children: ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false); // Começa fechado
  const location = useLocation();

  // Gerencia o estado do menu baseado no tamanho da tela
  useEffect(() => {
    const handleResize = () => {
      const isMobile = window.innerWidth < 1024;
      if (isMobile) {
        setMobileMenuOpen(false);
      }
      // Não forçamos mais o estado de expansão aqui
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

  // Verifica se a rota atual é de autenticação
  const isAuthPage = ['/login', '/cadastro'].includes(location.pathname);


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
        <Header onMenuClick={() => setMobileMenuOpen(!mobileMenuOpen)} sidebarExpanded={isExpanded} />

        {/* Conteúdo da página */}
        <main 
          className={`flex-1 overflow-auto bg-gray-50 transition-all duration-300 pt-16 ${
            isExpanded ? 'lg:ml-64' : 'lg:ml-20'
          }`}
        >
          <div className="w-full p-4 sm:p-6">
            {children}
          </div>
        </main>
        
        {/* Rodapé */}
        {!isAuthPage && (
          <footer className="bg-white border-t border-gray-200 py-6 w-full mt-auto">
            <div className="w-full px-4 sm:px-6">
              <p className="text-sm text-gray-500 text-center">
                © 2024 EnsaioNuvens. Sistema de Gestão de Bandas.
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
        )}
      </div>
    </div>
  );
}
