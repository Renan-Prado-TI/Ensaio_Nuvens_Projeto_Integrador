import { BrowserRouter as Router, Routes, Route, useLocation, Link, Outlet } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import MainLayout from './layouts/MainLayout';
import ScrollToTop from './components/ScrollToTop';
import { PageTransition } from './components/PageTransition';
import { GestorLayout } from './components/Layout/GestorLayout';

// Páginas de Autenticação
import Login from './pages/Auth/Login';
import Cadastro from './pages/Auth/Cadastro';

// Páginas Principais
import EchoTechHome from './pages/EchoTech/Home';
import EnsaioNuvensHome from './pages/EnsaioNuvens/Home';

// Páginas do Gestor
import GestorDashboard from './pages/Gestor/GestorDashboard';
import { BandasPage } from './pages/Gestor/bandas';
import { MusicasPage } from './pages/Gestor/musicas';
import { MusicosPage } from './pages/Gestor/musicos';
import { NotificacoesPage } from './pages/Gestor/notificacoes';
import { AnotacoesPage } from './pages/Gestor/anotacoes';
import { BandaDetalhesPage } from '@/features/bandas/pages/BandaDetalhesPage';
import { FormularioNovaBanda } from '@/features/bandas/components/formulario/FormularioNovaBanda';
import EditarBandaPage from '@/features/bandas/pages/EditarBandaPage';

// Páginas do Músico
import MusicoDashboard from './pages/Musico';

// Componente de Página Não Encontrada
const NotFound = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
    <div className="text-center max-w-md w-full">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white p-8 rounded-xl shadow-lg"
      >
        <h1 className="text-4xl font-bold text-gray-900 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Página não encontrada</h2>
        <p className="text-gray-600 mb-6">A página que você está procurando não existe ou foi movida.</p>
        <Link 
          to="/" 
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          Voltar para o início
        </Link>
      </motion.div>
    </div>
  </div>
);


function AnimatedRoutes() {
  const location = useLocation();
  
  // Log para depuração
  console.log('Rota atual:', location.pathname);
  
  return (
    <AnimatePresence>
      <Routes location={location} key={location.pathname}>
        {/* Rotas Públicas */}
        <Route path="/login" element={
          <MainLayout>
            <PageTransition>
              <Login />
            </PageTransition>
          </MainLayout>
        } />
        
        <Route path="/cadastro" element={
          <MainLayout>
            <PageTransition>
              <Cadastro />
            </PageTransition>
          </MainLayout>
        } />
        
        {/* Rotas com Layout Principal */}
        <Route path="/" element={
          <MainLayout>
            <PageTransition>
              <EchoTechHome />
            </PageTransition>
          </MainLayout>
        } />
        
        <Route path="/ensaios" element={
          <MainLayout>
            <PageTransition>
              <EnsaioNuvensHome />
            </PageTransition>
          </MainLayout>
        } />
        
        <Route path="/ensaios-nuvens" element={
          <MainLayout>
            <PageTransition>
              <EnsaioNuvensHome />
            </PageTransition>
          </MainLayout>
        } />
        
        {/* Rota alternativa para /ensaionuvens (sem o hífen) */}
        <Route path="/ensaionuvens" element={
          <MainLayout>
            <PageTransition>
              <EnsaioNuvensHome />
            </PageTransition>
          </MainLayout>
        } />

        {/* Rotas do Gestor */}
        <Route path="/gestor" element={
          <GestorLayout>
            <PageTransition>
              <Outlet />
            </PageTransition>
          </GestorLayout>
        }>
          <Route index element={<GestorDashboard />} />
          <Route path="dashboard" element={<GestorDashboard />} />
          
          {/* Rotas de Bandas */}
          <Route path="bandas">
            <Route index element={<BandasPage />} />
            <Route path="nova" element={
              <div className="container mx-auto p-6">
                <FormularioNovaBanda />
              </div>
            } />
            <Route path=":id" element={<BandaDetalhesPage />} />
            <Route path=":id/editar" element={<EditarBandaPage />} />
          </Route>
          
          <Route path="musicas" element={<MusicasPage />} />
          <Route path="musicos" element={<MusicosPage />} />
          <Route path="notificacoes" element={<NotificacoesPage />} />
          <Route path="anotacoes" element={<AnotacoesPage />} />
        </Route>

        {/* Rotas do Músico */}
        <Route 
          path="/musico" 
          element={
            <MainLayout>
              <PageTransition>
                <MusicoDashboard />
              </PageTransition>
            </MainLayout>
          } 
        />
        
        {/* Rota 404 - Página não encontrada */}
        <Route 
          path="*" 
          element={
            <MainLayout>
              <PageTransition>
                <NotFound />
              </PageTransition>
            </MainLayout>
          } 
        />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  // Log para depuração
  console.log('Iniciando aplicação...');
  
  return (
    <Router>
      <ScrollToTop />
      <AnimatedRoutes />
    </Router>
  );
}

export default App;
