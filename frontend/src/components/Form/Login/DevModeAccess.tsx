import React from 'react';
import { Link } from 'react-router-dom';
import { AlertTriangle } from 'lucide-react';
import Button from '@/components/ui/button';

export const DevModeAccess: React.FC = () => {
  return (
    <div className="mt-8 border-2 border-dashed border-yellow-400/70 dark:border-yellow-500/30 rounded-xl p-5 bg-yellow-50/70 dark:bg-yellow-900/10">
      <div className="flex">
        <div className="flex-shrink-0 pt-0.5">
          <AlertTriangle className="h-5 w-5 text-yellow-500 dark:text-yellow-400" />
        </div>
        <div className="ml-3">
          <h3 className="text-sm font-semibold text-yellow-800 dark:text-yellow-200">
            Modo Desenvolvedor
          </h3>
          <div className="mt-1 text-sm text-yellow-700/90 dark:text-yellow-300/90">
            <p>Acesso rápido para testes (apenas desenvolvimento)</p>
          </div>
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Link 
              to="/musico" 
              className="block w-full"
            >
              <Button
                variant="outline"
                size="sm"
                fullWidth
                leftIcon={<span className="text-yellow-500">🎵</span>}
                className="justify-center bg-white/50 hover:bg-yellow-50/70 text-yellow-800 border-yellow-300/70 hover:border-yellow-400/70 dark:bg-yellow-900/20 dark:border-yellow-700/50 dark:hover:bg-yellow-900/30 dark:text-yellow-200 transition-colors duration-200"
              >
                Acessar como Músico
              </Button>
            </Link>
            <Link 
              to="/gestor" 
              className="block w-full"
            >
              <Button
                variant="outline"
                size="sm"
                fullWidth
                leftIcon={<span className="text-yellow-500">👔</span>}
                className="justify-center bg-white/50 hover:bg-yellow-50/70 text-yellow-800 border-yellow-300/70 hover:border-yellow-400/70 dark:bg-yellow-900/20 dark:border-yellow-700/50 dark:hover:bg-yellow-900/30 dark:text-yellow-200 transition-colors duration-200"
              >
                Acessar como Gestor
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DevModeAccess;
