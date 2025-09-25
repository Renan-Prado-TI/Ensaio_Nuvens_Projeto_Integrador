import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import ScrollToTop from './components/ScrollToTop';

// Páginas de Autenticação
import Login from './pages/Auth/Login';
import Cadastro from './pages/Auth/Cadastro';

// Páginas Principais
import EchoTechHome from './pages/EchoTech/Home';
import EnsaioNuvensHome from './pages/EnsaioNuvens/Home';

// Rotas do Gestor
import { GestorRoutes } from './routes/GestorRoutes';

// Componente de Página Não Encontrada
const NotFound = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50">
    <div className="text-center">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">404</h1>
      <p className="text-xl text-gray-600 mb-8">Página não encontrada</p>
      <a 
        href="/" 
        className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
      >
        Voltar para o início
      </a>
    </div>
  </div>
);

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        {/* Rota Inicial - EchoTech */}
        <Route path="/" element={
          <MainLayout>
            <EchoTechHome />
          </MainLayout>
        } />
        
        {/* Projeto Ensaio Nuvens */}
        <Route path="/ensaionuvens" element={
          <MainLayout>
            <EnsaioNuvensHome />
          </MainLayout>
        } />
        
        {/* Páginas de Autenticação */}
        <Route path="/login" element={<Login />} />
        
        <Route path="/cadastro" element={<Cadastro />} />
        
        {/* Rotas do Gestor */}
        <Route path="/gestor/*" element={
          <MainLayout>
            <GestorRoutes />
          </MainLayout>
        } />
        
        {/* Painel do Músico (será implementado posteriormente) */}
        <Route path="/musico" element={
          <MainLayout>
            <div className="p-6">
              <h1 className="text-2xl font-bold mb-4">Painel do Músico</h1>
              <p>Em desenvolvimento...</p>
            </div>
          </MainLayout>
        } />
        
        {/* Rota 404 - Página não encontrada */}
        <Route path="*" element={
          <MainLayout>
            <NotFound />
          </MainLayout>
        } />
      </Routes>
    </Router>
  );
}

export default App;
