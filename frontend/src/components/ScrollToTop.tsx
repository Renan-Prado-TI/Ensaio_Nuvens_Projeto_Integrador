import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Função mais robusta para forçar scroll para o topo
    const scrollToTop = () => {
      try {
        // Abordagem mais agressiva e confiável
        const scrollElements = [
          window,
          document.documentElement,
          document.body,
          document.querySelector('.layout-container'),
          document.querySelector('.main-content'),
          document.querySelector('.page-content'),
          document.querySelector('main'),
          document.querySelector('#root')
        ];

        // Força scroll para o topo em todos os elementos
        scrollElements.forEach(element => {
          if (element) {
            if (element === window) {
              element.scrollTo(0, 0);
            } else {
              (element as HTMLElement).scrollTop = 0;
            }
          }
        });

        // Abordagem adicional com setTimeout para garantir
        setTimeout(() => {
          window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
          document.documentElement.scrollTop = 0;
          document.body.scrollTop = 0;
        }, 0);

      } catch (error) {
        console.log('ScrollToTop error:', error);
        // Fallback simples
        window.scrollTo(0, 0);
      }
    };

    // Executa imediatamente
    scrollToTop();

    // E também com delays para garantir que funcione
    const timeouts = [10, 50, 100, 200];
    timeouts.forEach(delay => {
      setTimeout(scrollToTop, delay);
    });

  }, [pathname]);

  return null;
};

export default ScrollToTop;
