import { Routes, Route, Navigate } from 'react-router-dom';
import { GestorLayout } from '../components/Layout/GestorLayout';

// Páginas do Gestor
import GestorDashboard from '../pages/Gestor';
import { BandasPage } from '../pages/Gestor/bandas';
import { MusicasPage } from '../pages/Gestor/musicas';
import { MusicosPage } from '../pages/Gestor/musicos';
import { NotificacoesPage } from '../pages/Gestor/notificacoes';
import { AnotacoesPage } from '../pages/Gestor/anotacoes';

// Páginas de Bandas
import { BandaDetalhesPage } from '@/features/bandas/pages/BandaDetalhesPage';
import { FormularioNovaBanda } from '@/features/bandas/components/formulario/FormularioNovaBanda';
import EditarBandaPage from '@/features/bandas/pages/EditarBandaPage';

const NovaBandaPage = () => (
  <div className="container mx-auto p-6">
    <FormularioNovaBanda />
  </div>
);
const NovaMusicaPage = () => <div>Nova Música</div>;
const EditarMusicaPage = () => <div>Editar Música</div>;
const NovaAnotacaoPage = () => <div>Nova Anotação</div>;
const VerAnotacaoPage = () => <div>Ver Anotação</div>;
const VerMusicoPage = () => <div>Ver Músico</div>;
const NovoMusicoPage = () => <div>Novo Músico</div>;

export const GestorRoutes = () => {
  return (
    <Routes>
      <Route element={<GestorLayout />}>
        <Route index element={<GestorDashboard />} />
        
        {/* Rotas de Bandas */}
        <Route path="bandas">
          <Route index element={<BandasPage />} />
          <Route path="nova" element={<NovaBandaPage />} />
          <Route path="editar/:id" element={<EditarBandaPage />} />
          <Route path=":id" element={<BandaDetalhesPage />} />
          <Route path=":id/editar" element={<EditarBandaPage />} />
          <Route path=":bandaId/musicos" element={<div>Página de Músicos da Banda</div>} />
          <Route path=":bandaId/repertorio" element={<div>Repertório da Banda</div>} />
        </Route>
        
        {/* Rotas de Músicas */}
        <Route path="musicas">
          <Route index element={<MusicasPage />} />
          <Route path="nova" element={<NovaMusicaPage />} />
          <Route path=":id" element={<EditarMusicaPage />} />
          <Route path=":id/editar" element={<EditarMusicaPage />} />
        </Route>
        
        {/* Rotas de Músicos */}
        <Route path="musicos">
          <Route index element={<MusicosPage />} />
          <Route path="novo" element={<NovoMusicoPage />} />
          <Route path=":id" element={<VerMusicoPage />} />
        </Route>
        
        {/* Rotas de Notificações */}
        <Route path="notificacoes" element={<NotificacoesPage />} />
        
        {/* Rotas de Anotações */}
        <Route path="anotacoes">
          <Route index element={<AnotacoesPage />} />
          <Route path="nova" element={<NovaAnotacaoPage />} />
          <Route path=":id" element={<VerAnotacaoPage />} />
        </Route>
        
        {/* Rota padrão para redirecionar para o dashboard */}
        <Route path="*" element={<Navigate to="/gestor" replace />} />
      </Route>
    </Routes>
  );
};

export default GestorRoutes;
