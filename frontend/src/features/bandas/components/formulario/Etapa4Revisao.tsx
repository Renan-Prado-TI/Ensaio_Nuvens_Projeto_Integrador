import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Facebook, Instagram, Youtube, Linkedin, Twitter, Globe, MapPin, Phone, Users, Music } from 'lucide-react';

// Tipo para o formulário de revisão
interface DadosBandaFormulario {
  logo?: File;
  nome: string;
  nomeArtistico?: string;
  fundacao?: string;
  cnpj?: string;
  telefone: string;
  email: string;
  descricao: string;
  facebook?: string;
  instagram?: string;
  youtube?: string;
  linkedin?: string;
  tiktok?: string;
  site?: string;
  endereco: {
    cep: string;
    logradouro: string;
    numero: string;
    complemento?: string;
    bairro: string;
    cidade: string;
    estado: string;
    referencia?: string;
  };
  instrumentos?: Array<{
    id?: string;
    nome: string;
    quantidade?: number;
  }>;
}

interface Etapa4RevisaoProps {
  onSubmit: () => Promise<void>;
  dadosSalvos: Partial<DadosBandaFormulario>;
  etapasSalvas: Set<number>;
}

export function Etapa4Revisao({
  onSubmit: _onSubmit,
  dadosSalvos,
  etapasSalvas
}: Etapa4RevisaoProps) {
  // Usa os dados salvos se disponíveis, senão usa um objeto vazio
  const dadosParaMostrar = dadosSalvos.nome ? dadosSalvos : {} as DadosBandaFormulario;

  console.log('=== Etapa4Revisao ===');
  console.log('Dados salvos recebidos:', dadosSalvos);
  console.log('Etapas salvas:', Array.from(etapasSalvas));
  console.log('Dados para mostrar:', dadosParaMostrar);

  const redesSociais = [
    { nome: 'Facebook', icone: Facebook, valor: dadosParaMostrar.facebook, cor: 'text-blue-600' },
    { nome: 'Instagram', icone: Instagram, valor: dadosParaMostrar.instagram, cor: 'text-pink-600' },
    { nome: 'YouTube', icone: Youtube, valor: dadosParaMostrar.youtube, cor: 'text-red-600' },
    { nome: 'LinkedIn', icone: Linkedin, valor: dadosParaMostrar.linkedin, cor: 'text-blue-700' },
    { nome: 'Twitter', icone: Twitter, valor: dadosParaMostrar.tiktok, cor: 'text-blue-400' },
    { nome: 'Site', icone: Globe, valor: dadosParaMostrar.site, cor: 'text-gray-700' },
  ].filter(item => item.valor);

  // Verifica se todas as etapas obrigatórias foram salvas
  const etapasCompletas = etapasSalvas.has(1) && etapasSalvas.has(2) && etapasSalvas.has(3);
  const dadosCompletos = dadosParaMostrar.nome && dadosParaMostrar.telefone && dadosParaMostrar.email && dadosParaMostrar.descricao && (dadosParaMostrar.instrumentos?.length ?? 0) > 0;

  console.log('Etapas completas:', etapasCompletas);
  console.log('Dados completos:', dadosCompletos);
  console.log('Nome:', dadosParaMostrar.nome);
  console.log('Telefone:', dadosParaMostrar.telefone);
  console.log('Email:', dadosParaMostrar.email);
  console.log('Descrição:', dadosParaMostrar.descricao);
  console.log('Instrumentos:', dadosParaMostrar.instrumentos);

  // Mostra mensagem de erro se as etapas obrigatórias não foram salvas ou se os dados não estão completos
  if (!etapasCompletas || !dadosCompletos) {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold mb-4">Revisão dos Dados</h2>
          <p className="text-muted-foreground mb-6">
            ✅ Complete todas as etapas antes de finalizar.
          </p>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-yellow-800">
                  Etapas pendentes
                </h3>
                <div className="mt-2 text-sm text-yellow-700">
                  <ul className="list-disc list-inside space-y-1">
                    {!etapasSalvas.has(1) && <li>Etapa 1: Dados Básicos</li>}
                    {!etapasSalvas.has(2) && <li>Etapa 2: Endereço</li>}
                    {!etapasSalvas.has(3) && <li>Etapa 3: Instrumentos</li>}
                    {!dadosParaMostrar.nome && <li>Nome da banda</li>}
                    {!dadosParaMostrar.telefone && <li>Telefone</li>}
                    {!dadosParaMostrar.email && <li>Email</li>}
                    {!dadosParaMostrar.descricao && <li>Descrição</li>}
                    {(!dadosParaMostrar.instrumentos || (dadosParaMostrar.instrumentos?.length ?? 0) === 0) && <li>Pelo menos um instrumento</li>}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center space-x-4">
              <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center">
                <Users className="w-10 h-10 text-muted-foreground" />
              </div>
              <div>
                <h3 className="text-xl font-semibold">{dadosParaMostrar.nome || 'Nome da banda'}</h3>
                <p className="text-muted-foreground">Complete as etapas para ver a revisão</p>
              </div>
            </div>
          </CardHeader>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-4">Revise seus dados</h2>
        <p className="text-muted-foreground mb-6">
          ✅ Confirme se todas as informações estão corretas antes de finalizar.
        </p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center space-x-4">
            {dadosParaMostrar.logo ? (
              <div className="w-20 h-20 rounded-full overflow-hidden">
                <img
                  src={URL.createObjectURL(dadosParaMostrar.logo)}
                  alt={dadosParaMostrar.nome}
                  className="w-full h-full object-cover"
                />
              </div>
            ) : (
              <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center">
                <Users className="w-10 h-10 text-muted-foreground" />
              </div>
            )}
            <div>
              <h3 className="text-xl font-semibold">{dadosParaMostrar.nome}</h3>
              {dadosParaMostrar.nomeArtistico && (
                <p className="text-muted-foreground">{dadosParaMostrar.nomeArtistico}</p>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Informações de Contato */}
          <div>
            <h4 className="font-medium mb-2">Informações de Contato</h4>
            <div className="space-y-2 pl-2">
              <div className="flex items-center text-sm">
                <Phone className="h-4 w-4 mr-2 text-muted-foreground flex-shrink-0" />
                <span>{dadosParaMostrar.telefone}</span>
              </div>
              {dadosParaMostrar.email && (
                <div className="flex items-center text-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 mr-2 text-muted-foreground flex-shrink-0">
                    <rect width="20" height="16" x="2" y="4" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                  <span>{dadosParaMostrar.email}</span>
                </div>
              )}
              {dadosParaMostrar.cnpj && (
                <div className="flex items-center text-sm">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4 mr-2 text-muted-foreground flex-shrink-0"
                  >
                    <path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z" />
                    <path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2" />
                    <path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2" />
                    <path d="M10 6h4" />
                    <path d="M10 10h4" />
                    <path d="M10 14h4" />
                    <path d="M10 18h4" />
                  </svg>
                  <span>{dadosParaMostrar.cnpj}</span>
                </div>
              )}
            </div>
          </div>

          {/* Endereço */}
          {dadosParaMostrar.endereco && (
            <div>
              <h4 className="font-medium mb-2">Endereço</h4>
              <div className="space-y-1 pl-2 text-sm">
                <div className="flex items-start">
                  <MapPin className="h-4 w-4 mr-2 mt-0.5 text-muted-foreground flex-shrink-0" />
                  <div>
                    <p>{dadosParaMostrar.endereco.logradouro}, {dadosParaMostrar.endereco.numero}</p>
                    {dadosParaMostrar.endereco.complemento && <p>{dadosParaMostrar.endereco.complemento}</p>}
                    <p>{dadosParaMostrar.endereco.bairro}</p>
                    <p>{dadosParaMostrar.endereco.cidade} - {dadosParaMostrar.endereco.estado}</p>
                    <p>CEP: {dadosParaMostrar.endereco.cep}</p>
                    {dadosParaMostrar.endereco.referencia && (
                      <p className="mt-1 text-muted-foreground">
                        <span className="font-medium">Ponto de referência:</span> {dadosParaMostrar.endereco.referencia}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Redes Sociais */}
          {redesSociais.length > 0 && (
            <div>
              <h4 className="font-medium mb-2">Redes Sociais</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pl-2">
                {redesSociais.map((rede) => {
                  const Icone = rede.icone;
                  return (
                    <a
                      key={rede.nome}
                      href={rede.valor}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-sm text-primary hover:underline"
                    >
                      <Icone className={`h-4 w-4 mr-2 ${rede.cor}`} />
                      {rede.nome}
                    </a>
                  );
                })}
              </div>
            </div>
          )}

          {/* Instrumentos */}
          {dadosParaMostrar.instrumentos && dadosParaMostrar.instrumentos.length > 0 && (
            <div>
              <h4 className="font-medium mb-2">Instrumentos Procurados</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pl-2">
                {dadosParaMostrar.instrumentos.map((instrumento: any, index: number) => (
                  <div key={index} className="flex items-center text-sm">
                    <Music className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span>{instrumento.nome}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Descrição */}
          {dadosParaMostrar.descricao && (
            <div>
              <h4 className="font-medium mb-2">Sobre a Banda</h4>
              <p className="text-sm text-muted-foreground pl-2">{dadosParaMostrar.descricao}</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
