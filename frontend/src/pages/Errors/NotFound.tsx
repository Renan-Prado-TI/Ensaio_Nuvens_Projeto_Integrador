import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="min-h-screen pt-16 pb-12 flex flex-col bg-white">
      <main className="flex-grow flex flex-col justify-center max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-16">
          <div className="text-center">
            <p className="text-sm font-semibold text-primary-600 uppercase tracking-wide">404 erro</p>
            <h1 className="mt-2 text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl">
              Página não encontrada
            </h1>
            <p className="mt-2 text-base text-gray-500">
              Desculpe, não conseguimos encontrar a página que você está procurando.
            </p>
            <div className="mt-6">
              <Link
                to="/"
                className="text-base font-medium text-primary-600 hover:text-primary-500"
              >
                Voltar para a página inicial<span aria-hidden="true"> &rarr;</span>
              </Link>
            </div>
          </div>
        </div>
      </main>
      <footer className="flex-shrink-0 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex justify-center space-x-4">
          <Link to="/sobre" className="text-sm font-medium text-gray-500 hover:text-gray-600">
            Sobre
          </Link>
          <span className="inline-block border-l border-gray-300" aria-hidden="true" />
          <Link to="/contato" className="text-sm font-medium text-gray-500 hover:text-gray-600">
            Contato
          </Link>
          <span className="inline-block border-l border-gray-300" aria-hidden="true" />
          <Link to="/suporte" className="text-sm font-medium text-gray-500 hover:text-gray-600">
            Suporte
          </Link>
        </nav>
      </footer>
    </div>
  );
};

export default NotFound;
