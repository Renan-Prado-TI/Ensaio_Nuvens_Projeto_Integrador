import type { ReactNode } from 'react';
import React from 'react';
import { Link } from 'react-router-dom';
import GradientBackground from '../ui/GradientBackground';

interface AuthLayoutProps {
  children: ReactNode;
  title: string;
  subtitle?: string;
  footerText?: string;
  footerLink?: {
    text: string;
    to: string;
  };
}

const AuthLayout: React.FC<AuthLayoutProps> = ({
  children,
  title,
  subtitle,
  footerText,
  footerLink,
}) => {
  return (
    <div className="min-h-screen w-full relative">
      <GradientBackground />
      <div className="main-container">
        <div className="w-full flex flex-col items-center">
          <div className="cadastro-container">
            {/* Cabeçalho */}
            <div className="cabecalho-formulario">
              <h1 className="text-2xl sm:text-3xl font-bold text-white">
                {title}
              </h1>
              {subtitle && (
                <p className="mt-1 sm:mt-2 text-sm sm:text-base text-white/90">
                  {subtitle}
                </p>
              )}
            </div>

            {/* Container do Formulário com Background */}
            <div className="formulario-container">
              {children}
            </div>
          </div>
        </div>

        {/* Rodapé */}
        {(footerText || footerLink) && (
          <div className="auth-footer">
            {footerText}
            {footerLink && (
              <Link to={footerLink.to}>
                {footerLink.text}
              </Link>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AuthLayout;
