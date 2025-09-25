import { useFormContext } from 'react-hook-form';
import Input from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Button from '@/components/ui/button';
import { Search } from 'lucide-react';
import { useState } from 'react';

// Tipo para o formulário de endereço
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

export function Etapa2Endereco() {
  const { register, formState: { errors }, setValue, watch } = useFormContext<DadosBandaFormulario>();
  const [isLoadingCep, setIsLoadingCep] = useState(false);

  // Formatar CEP
  const handleCepChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 5) {
      value = value.replace(/^(\d{5})(\d{0,3}).*/, '$1-$2');
    } else if (value.length > 5) {
      value = value.replace(/^(\d{5})(\d{0,3})/, '$1-$2');
    }
    e.target.value = value;
  };

  // Buscar endereço pelo CEP
  const buscarEnderecoPorCep = async (cep: string) => {
    if (!cep || cep.replace(/\D/g, '').length !== 8) return;
    
    setIsLoadingCep(true);
    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const data = await response.json();
      
      if (!data.erro) {
        setValue('endereco.logradouro', data.logradouro, { shouldValidate: true });
        setValue('endereco.bairro', data.bairro, { shouldValidate: true });
        setValue('endereco.cidade', data.localidade, { shouldValidate: true });
        setValue('endereco.estado', data.uf, { shouldValidate: true });
      }
    } catch (error) {
      console.error('Erro ao buscar CEP:', error);
    } finally {
      setIsLoadingCep(false);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Endereço</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* CEP */}
        <div className="space-y-2">
          <Label htmlFor="endereco.cep" className="flex items-center gap-1">
            CEP *
            <span className="text-xs text-muted-foreground">(obrigatório)</span>
          </Label>
          <div className="relative">
            <Input
              id="endereco.cep"
              placeholder="00000-000"
              maxLength={9}
              defaultValue={watch('endereco.cep')}
              onChange={(e) => {
                handleCepChange(e);
                // Atualiza o valor no formulário
                setValue('endereco.cep', e.target.value, { shouldValidate: true });
              }}
              onBlur={(e) => {
                const cep = e.target.value.replace(/\D/g, '');
                if (cep.length === 8) {
                  buscarEnderecoPorCep(cep);
                }
              }}
              className="pr-10"
            />
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="absolute right-0 top-0 h-full px-3 text-muted-foreground hover:bg-transparent"
              onClick={() => {
                const cep = watch('endereco.cep')?.replace(/\D/g, '');
                if (cep?.length === 8) {
                  buscarEnderecoPorCep(cep);
                }
              }}
              disabled={isLoadingCep}
            >
              <Search className={`h-4 w-4 ${isLoadingCep ? 'animate-pulse' : ''}`} />
            </Button>
          </div>
          {errors.endereco?.cep ? (
            <p className="text-sm text-red-600 font-medium">{errors.endereco.cep.message}</p>
          ) : (
            <p className="text-xs text-muted-foreground">Digite um CEP válido para buscar o endereço automaticamente</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Logradouro */}
        <div className="space-y-2">
          <Label htmlFor="endereco.logradouro" className="flex items-center gap-1">
            Logradouro *
            <span className="text-xs text-muted-foreground">(obrigatório)</span>
          </Label>
          <Input
            id="endereco.logradouro"
            placeholder="Rua, Avenida, etc."
            {...register('endereco.logradouro', {
              required: '❌ O logradouro é obrigatório para continuar'
            })}
          />
          {errors.endereco?.logradouro && (
            <p className="text-sm text-red-600 font-medium">{errors.endereco.logradouro.message}</p>
          )}
          <p className="text-xs text-muted-foreground">Nome da rua, avenida, etc.</p>
        </div>

        {/* Número */}
        <div className="space-y-2">
          <Label htmlFor="endereco.numero" className="flex items-center gap-1">
            Número *
            <span className="text-xs text-muted-foreground">(obrigatório)</span>
          </Label>
          <Input
            id="endereco.numero"
            placeholder="Número"
            {...register('endereco.numero', {
              required: '❌ O número é obrigatório para continuar'
            })}
          />
          {errors.endereco?.numero && (
            <p className="text-sm text-red-600 font-medium">{errors.endereco.numero.message}</p>
          )}
          <p className="text-xs text-muted-foreground">Número do endereço</p>
        </div>
      </div>

      {/* Complemento */}
      <div className="space-y-2">
        <Label htmlFor="endereco.complemento">Complemento</Label>
        <Input 
          id="endereco.complemento"
          placeholder="Apartamento, bloco, etc."
          {...register('endereco.complemento')}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Bairro */}
        <div className="space-y-2">
          <Label htmlFor="endereco.bairro" className="flex items-center gap-1">
            Bairro *
            <span className="text-xs text-muted-foreground">(obrigatório)</span>
          </Label>
          <Input
            id="endereco.bairro"
            placeholder="Bairro"
            {...register('endereco.bairro', {
              required: '❌ O bairro é obrigatório para continuar'
            })}
          />
          {errors.endereco?.bairro && (
            <p className="text-sm text-red-600 font-medium">{errors.endereco.bairro.message}</p>
          )}
          <p className="text-xs text-muted-foreground">Nome do bairro</p>
        </div>

        {/* Cidade */}
        <div className="space-y-2">
          <Label htmlFor="endereco.cidade" className="flex items-center gap-1">
            Cidade *
            <span className="text-xs text-muted-foreground">(obrigatório)</span>
          </Label>
          <Input
            id="endereco.cidade"
            placeholder="Cidade"
            {...register('endereco.cidade', {
              required: '❌ A cidade é obrigatória para continuar'
            })}
          />
          {errors.endereco?.cidade && (
            <p className="text-sm text-red-600 font-medium">{errors.endereco.cidade.message}</p>
          )}
          <p className="text-xs text-muted-foreground">Nome da cidade</p>
        </div>

        {/* Estado */}
        <div className="space-y-2">
          <Label htmlFor="endereco.estado" className="flex items-center gap-1">
            Estado *
            <span className="text-xs text-muted-foreground">(obrigatório)</span>
          </Label>
          <select
            id="endereco.estado"
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            {...register('endereco.estado', {
              required: '❌ O estado é obrigatório para continuar'
            })}
          >
            <option value="">Selecione o estado</option>
            {[
              'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA',
              'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN',
              'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'
            ].map(uf => (
              <option key={uf} value={uf}>{uf}</option>
            ))}
          </select>
          {errors.endereco?.estado && (
            <p className="text-sm text-red-600 font-medium">{errors.endereco.estado.message}</p>
          )}
          <p className="text-xs text-muted-foreground">Selecione o estado</p>
        </div>
      </div>

      {/* Ponto de Referência */}
      <div className="space-y-2">
        <Label htmlFor="endereco.referencia">Ponto de Referência</Label>
        <Input 
          id="endereco.referencia"
          placeholder="Ex: Próximo ao mercado X"
          {...register('endereco.referencia')}
        />
      </div>
    </div>
  );
}
