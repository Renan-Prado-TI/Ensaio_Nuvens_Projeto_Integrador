import type { ReactNode } from 'react';
import React from 'react';
import GradientBackground from '../ui/GradientBackground';

interface AuthLayoutProps {
  children: ReactNode;
  title: React.ReactNode;
  subtitle?: string;
  hideSubtitle?: boolean;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({
  children,
  title,
  subtitle,
  hideSubtitle = false,
}) => {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-grow flex items-center justify-center p-4 sm:p-6 relative w-full">
        <GradientBackground />
        <div className="w-full max-w-2xl mx-auto z-10 px-4">
          {/* Cabeçalho */}
          <div className="text-center mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-white drop-shadow-md">
              {title}
            </h1>
            {!hideSubtitle && subtitle && (
              <p className="mt-2 sm:mt-3 text-sm sm:text-base text-white opacity-95 font-medium">
                {subtitle}
              </p>
            )}
          </div>

          {/* Container do Formulário */}
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl overflow-hidden border border-white/20 w-full">
            <div className="p-6 sm:p-8 w-full">
              {children}
            </div>
          </div>
        </div>
      </div>

      {/* Rodapé */}
      <footer className="bg-white border-t border-gray-200 py-4 w-full mt-auto">
        <div className="w-full px-4 sm:px-6">
          <p className="text-sm text-gray-500 text-center">
            © 2024 EnsaioNuvens. Todos os direitos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default AuthLayout;
