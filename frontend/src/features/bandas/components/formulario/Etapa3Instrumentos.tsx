import { useFormContext } from 'react-hook-form';
import { useState, useEffect } from 'react';
import type { KeyboardEvent } from 'react';
import { Plus, X, Music } from 'lucide-react';
import { cn } from '@/lib/utils';
import Input from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Button from '@/components/ui/button';

// Tipo para o formulário de instrumentos
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
  instrumentos: Array<{
    id: string;
    nome: string;
    quantidade: number;
  }>;
}

// Fallback para o Separator
const Separator = ({ className }: { className?: string }) => (
  <div className={cn('h-[1px] w-full bg-gray-200 dark:bg-gray-700', className)} />
);

const INSTRUMENTOS_POR_CATEGORIA = [
  {
    categoria: 'Sopros',
    instrumentos: [
      'Flauta', 'Clarinete', 'Flautim', 'Oboé', 'Fagote', 'Saxofone Soprano',
      'Saxofone Alto', 'Saxofone Tenor', 'Saxofone Barítono', 'Trompete',
      'Trompa', 'Trombone', 'Tuba', 'Eufônio', 'Bombardino'
    ]
  },
  {
    categoria: 'Cordas',
    instrumentos: [
      'Violino', 'Viola', 'Violoncelo', 'Contrabaixo', 'Violão', 'Viola Caipira',
      'Cavaquinho', 'Bandolim', 'Harpa', 'Guitarra', 'Baixo Elétrico'
    ]
  },
  {
    categoria: 'Teclas e Percussão',
    instrumentos: [
      'Piano', 'Teclado', 'Órgão', 'Acordeon', 'Sanfona', 'Bateria',
      'Percussão', 'Xilofone', 'Vibrafone', 'Marimba', 'Pandeiro', 'Tamborim'
    ]
  },
  {
    categoria: 'Voz',
    instrumentos: [
      'Soprano', 'Mezzo-Soprano', 'Contralto', 'Contratenor', 'Tenor',
      'Barítono', 'Baixo', 'Backing Vocal'
    ]
  },
  {
    categoria: 'Outros',
    instrumentos: [
      'Gaita', 'Flauta Doce', 'Violão Elétrico', 'Baixo Acústico',
      'Cajón', 'Percussão Corporal'
    ]
  }
];

// Lista plana para o datalist (comentada pois não está sendo usada no momento)
// const INSTRUMENTOS_SUGERIDOS = INSTRUMENTOS_POR_CATEGORIA.flatMap(
//   categoria => categoria.instrumentos
// ).sort((a, b) => a.localeCompare(b));

type InstrumentoTag = {
  id: string;
  nome: string;
  quantidade: number;
};

export function Etapa3Instrumentos() {
  const { setValue, watch, trigger } = useFormContext<DadosBandaFormulario>();
  const [novoInstrumento, setNovoInstrumento] = useState('');
  
  const instrumentos: InstrumentoTag[] = watch('instrumentos') || [];

  // Valida os instrumentos quando a lista é alterada
  useEffect(() => {
    const validateInstruments = async () => {
      await trigger('instrumentos');
    };
    validateInstruments();
  }, [instrumentos, trigger]);

  // Adiciona um instrumento à lista
  const adicionarInstrumentoSelecionado = (instrumento: string) => {
    if (!instrumento.trim()) return;
    
    // Verifica se o instrumento já foi adicionado
    if (instrumentos.some(i => i.nome.toLowerCase() === instrumento.trim().toLowerCase())) {
      return;
    }
    
    const novoInstrumentoObj = {
      id: crypto.randomUUID(),
      nome: instrumento.trim(),
      quantidade: 1
    };

    const novosInstrumentos = [...instrumentos, novoInstrumentoObj];
    setValue('instrumentos', novosInstrumentos, { shouldValidate: true });
    setNovoInstrumento('');
    
    // Rola para a seção de instrumentos adicionados
    setTimeout(() => {
      const element = document.getElementById('instrumentos-adicionados');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    }, 100);
  };

  const adicionarInstrumento = () => {
    if (!novoInstrumento.trim()) return;

    const novoInstrumentoObj = {
      id: crypto.randomUUID(),
      nome: novoInstrumento.trim(),
      quantidade: 1  // Adicionado a propriedade quantidade
    };

    setValue('instrumentos', [...instrumentos, novoInstrumentoObj], { shouldValidate: true });
    setNovoInstrumento('');
  };

  const removerInstrumento = (id: string) => {
    setValue('instrumentos', instrumentos.filter(item => item.id !== id), { shouldValidate: true });
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      adicionarInstrumento();
    }
  };

  // Verifica se há erros de validação para o campo instrumentos
  const { formState: { errors } } = useFormContext<DadosBandaFormulario>();
  
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-4">Formação da Banda</h2>
        <p className="text-muted-foreground mb-4">
          Adicione os instrumentos necessários para a sua banda. É obrigatório adicionar pelo menos um instrumento para continuar.
        </p>
        {errors.instrumentos && (
          <p className="text-sm text-red-600 font-medium mb-4">
            ❌ {errors.instrumentos.message || 'Você deve adicionar pelo menos um instrumento para continuar'}
          </p>
        )}
        {instrumentos.length === 0 && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Music className="h-5 w-5 text-yellow-400" />
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-yellow-800">
                  Nenhum instrumento adicionado
                </h3>
                <div className="mt-2 text-sm text-yellow-700">
                  <p>Você precisa adicionar pelo menos um instrumento para continuar com o cadastro.</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="space-y-6">
        {/* Instrumentos sugeridos por categoria */}
        <div className="space-y-4">
          <h4 className="font-medium">Selecione os instrumentos da sua banda</h4>
          <div className="space-y-4">
            {INSTRUMENTOS_POR_CATEGORIA.map((categoria) => (
              <div key={categoria.categoria} className="space-y-2">
                <h5 className="text-sm font-medium text-muted-foreground">
                  {categoria.categoria}
                </h5>
                <div className="flex flex-wrap gap-2">
                  {categoria.instrumentos.map((instrumento) => (
                    <Button
                      key={instrumento}
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => adicionarInstrumentoSelecionado(instrumento)}
                      className="text-xs"
                      disabled={instrumentos.some(i => i.nome === instrumento)}
                    >
                      {instrumento}
                    </Button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <Separator className="my-4" />

        <h4 className="font-medium">Ou adicione um instrumento personalizado</h4>
        <div id="instrumentos-adicionados" className="flex flex-wrap gap-2">
          {instrumentos.length === 0 ? (
            <div className="w-full text-center py-8 text-muted-foreground">
              <Music className="mx-auto h-12 w-12 text-gray-300 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhum instrumento adicionado</h3>
              <p className="text-sm">Adicione pelo menos um instrumento para continuar com o cadastro da banda.</p>
              <p className="text-xs text-muted-foreground mt-2">💡 Clique nos botões acima ou digite um instrumento personalizado</p>
            </div>
          ) : (
            <>
              <div className="w-full mb-2">
                <h4 className="font-medium text-green-700 mb-2">
                  ✅ Instrumentos adicionados ({instrumentos.length})
                </h4>
                <p className="text-sm text-muted-foreground">
                  Clique no ✕ para remover um instrumento da lista
                </p>
              </div>
              {instrumentos.map((instrumento) => (
                <div
                  key={instrumento.id}
                  className="flex items-center gap-2 bg-purple-50 border border-purple-200 px-3 py-1.5 rounded-full text-sm"
                >
                  <Music className="w-4 h-4 text-purple-600" />
                  <span className="font-medium">{instrumento.nome}</span>
                  <button
                    type="button"
                    onClick={() => removerInstrumento(instrumento.id)}
                    className="text-muted-foreground hover:text-red-600 transition-colors"
                    title="Remover instrumento"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="novo-instrumento">Instrumento</Label>
          <div className="relative">
            <Input
              id="novo-instrumento"
              type="text"
              value={novoInstrumento}
              onChange={(e) => setNovoInstrumento(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Digite o nome do instrumento e pressione Enter"
              list="instrumentos-sugeridos"
              className="pr-10"
            />
            <Plus 
              className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground cursor-pointer hover:text-primary"
              onClick={adicionarInstrumento}
            />
          </div>
        </div>

        <div className="pt-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={adicionarInstrumento}
            disabled={!novoInstrumento.trim()}
          >
            <Plus className="w-4 h-4 mr-2" />
            Adicionar Instrumento
          </Button>
        </div>
      </div>
    </div>
  );
}
