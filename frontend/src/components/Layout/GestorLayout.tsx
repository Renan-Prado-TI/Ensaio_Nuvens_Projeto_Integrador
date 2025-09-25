import React from 'react';
import type { ReactNode } from 'react';
import { Outlet } from 'react-router-dom';
import { Tabs } from '../ui/tabs';

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
  return (
    <div className="min-h-screen bg-gray-50 w-full">
      {/* Cabeçalho */}
      <header className="bg-white shadow-sm w-full">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <h1 className="text-xl font-semibold text-gray-900">Painel do Gestor</h1>
            <div className="flex items-center">
              {/* Aqui pode ir o seletor de banda quando necessário */}
              <div className="ml-4 flex items-center md:ml-6">
                {/* Botão de notificações */}
                <button
                  type="button"
                  className="p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                >
                  <span className="sr-only">Ver notificações</span>
                  <svg
                    className="h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                    />
                  </svg>
                </button>

                {/* Perfil dropdown */}
                <div className="ml-3 relative">
                  <div>
                    <button
                      type="button"
                      className="max-w-xs bg-white flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                      id="user-menu"
                      aria-expanded="false"
                      aria-haspopup="true"
                    >
                      <span className="sr-only">Abrir menu de usuário</span>
                      <div className="h-8 w-8 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 font-medium">
                        G
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navegação por abas */}
        <div className="border-b border-gray-200 w-full">
          <div className="w-full px-4 sm:px-6 lg:px-8">
            <Tabs items={menuItems} />
          </div>
        </div>
      </header>

      {/* Conteúdo principal */}
      <main className="w-full py-6 sm:px-6 lg:px-8">
        <div className="w-full">
          {children || <Outlet />}
        </div>
      </main>
    </div>
  );
};

export default GestorLayout;
