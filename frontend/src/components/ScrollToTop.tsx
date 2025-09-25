import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Força o scroll para o topo sempre que a rota mudar
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth' // 'smooth' para transição suave, 'instant' para imediato
    });
  }, [pathname]);

  return null; // Este componente não renderiza nada
};

export default ScrollToTop;
