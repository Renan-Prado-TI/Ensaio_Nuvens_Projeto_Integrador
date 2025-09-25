// Import GestorDashboard as default
import GestorDashboard from './GestorDashboard';

// Re-export all Gestor pages for cleaner imports
export { default as BandasPage } from './bandas';
export { default as MusicasPage } from './musicas';
export { default as MusicosPage } from './musicos';
export { default as NotificacoesPage } from './notificacoes';
export { default as AnotacoesPage } from './anotacoes';

export default GestorDashboard;
