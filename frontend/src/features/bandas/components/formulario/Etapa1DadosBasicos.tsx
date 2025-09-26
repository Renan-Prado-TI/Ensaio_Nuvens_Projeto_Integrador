import { useFormContext } from 'react-hook-form';
import Input from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Upload, Facebook, Instagram, Youtube, Linkedin, Twitter, Globe, Mail, Phone } from 'lucide-react';

// Tipo para o formulário de dados básicos
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

export function Etapa1DadosBasicos() {
  const { register, watch, setValue, formState: { errors } } = useFormContext<DadosBandaFormulario>();
  
  // Adiciona tipo para o objeto de erros
  type FieldErrors = {
    [key: string]: {
      message?: string;
    };
  };
  
  // Faz o type assertion para o objeto de erros
  const fieldErrors = errors as unknown as FieldErrors;
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setValue('logo', file);
    }
  };

  // Formatar CNPJ
  const handleCNPJChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length <= 14) {
      value = value.replace(/(\d{2})(\d)/, '$1.$2')
                  .replace(/(\d{3})(\d)/, '$1.$2')
                  .replace(/(\d{3})(\d)/, '$1/$2')
                  .replace(/(\d{4})(\d{1,2})/, '$1-$2');
      setValue('cnpj', value, { shouldValidate: true });
    }
  };

  // Formatar telefone
  const handleTelefoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '');
    
    // Aplica a máscara de telefone
    if (value.length <= 11) {
      if (value.length <= 10) {
        // Formato para telefone fixo: (00) 0000-0000
        value = value.replace(/^(\d{2})(\d{0,4})(\d{0,4}).*/, '($1) $2$3');
        value = value.replace(/(\d{4})(\d)/, '$1-$2');
      } else {
        // Formato para celular: (00) 00000-0000
        value = value.replace(/^(\d{2})(\d{0,5})(\d{0,4}).*/, '($1) $2-$3');
      }
      
      // Remove qualquer hífen extra no final
      value = value.replace(/[\s-]+$/, '');
      
      setValue('telefone', value, { shouldValidate: true });
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-primary-700 mb-4">Dados Básicos</h2>
      
      {/* Upload da Logo */}
      <div className="space-y-3">
        <Label htmlFor="logo" className="block text-sm font-medium text-gray-700">
          Logo da Banda
        </Label>
        <div className="flex items-center gap-4">
          <div className="w-24 h-24 rounded-full bg-white border-2 border-dashed border-gray-200 flex items-center justify-center overflow-hidden hover:border-primary-300 transition-colors">
            {watch('logo') ? (
              <img 
                src={URL.createObjectURL(watch('logo')!)} 
                alt="Preview" 
                className="w-full h-full object-cover"
              />
            ) : (
              <Upload className="w-8 h-8 text-gray-400" />
            )}
          </div>
          <div>
            <input
              id="logo"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />
            <div>
              <Label 
                htmlFor="logo" 
                className="cursor-pointer text-sm font-medium text-primary-600 hover:text-primary-800 hover:underline transition-colors"
              >
                {watch('logo') ? 'Alterar imagem' : 'Enviar imagem'}
              </Label>
              <p className="text-xs text-gray-500 mt-1">
                Formatos: JPG, PNG. Máx: 5MB
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Nome da Banda */}
      <div className="space-y-2">
        <Label htmlFor="nome" className="block text-sm font-medium text-gray-700">
          Nome da Banda <span className="text-red-500">*</span>
        </Label>
        <div className="mt-1">
          <Input
            id="nome"
            placeholder="Digite o nome da banda"
            className="w-full rounded-md border-gray-200 bg-white shadow-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
            {...register('nome', {
              required: 'O nome da banda é obrigatório',
              minLength: {
                value: 2,
                message: 'O nome deve ter pelo menos 2 caracteres'
              }
            })}
          />
          {errors.nome && (
            <p className="mt-1 text-sm text-red-600">{errors.nome.message}</p>
          )}
        </div>
      </div>

      {/* Nome Artístico */}
      <div className="space-y-2">
        <Label htmlFor="nomeArtistico" className="block text-sm font-medium text-gray-700">
          Nome Artístico
        </Label>
        <div className="mt-1">
          <Input 
            id="nomeArtistico"
            placeholder="Se diferente do nome oficial"
            className="w-full rounded-md border-gray-200 bg-white shadow-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
            {...register('nomeArtistico')}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* CNPJ */}
        <div className="space-y-2">
          <Label htmlFor="cnpj">CNPJ (opcional)</Label>
          <div className="relative">
            <svg 
              className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <path d="M19 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2z" />
              <path d="M21 9H3" />
              <path d="M9 21V9" />
            </svg>
            <Input 
              id="cnpj" 
              placeholder="00.000.000/0000-00"
              value={watch('cnpj') || ''}
              onChange={handleCNPJChange}
              maxLength={18}
              className="w-full rounded-md border border-gray-200 bg-white shadow-sm pl-9 focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-colors"
            />
          </div>
          {errors.cnpj && (
            <p className="text-sm text-red-500">{errors.cnpj.message}</p>
          )}
        </div>

        {/* Telefone */}
        <div className="space-y-2">
          <Label htmlFor="telefone" className="flex items-center gap-1">
            Telefone *
            <span className="text-xs text-muted-foreground">(obrigatório)</span>
          </Label>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              id="telefone"
              placeholder="(00) 00000-0000"
              value={watch('telefone') || ''}
              onChange={handleTelefoneChange}
              maxLength={15}
              className="w-full rounded-md border border-gray-200 bg-white shadow-sm pl-9 focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-colors"
            />
          </div>
          {errors.telefone && (
            <p className="text-sm text-red-600 font-medium">{errors.telefone.message}</p>
          )}
          <p className="text-xs text-muted-foreground">Formato: (00) 00000-0000 ou (00) 0000-0000</p>
        </div>

        {/* Email */}
        <div className="space-y-2">
          <Label htmlFor="email" className="flex items-center gap-1">
            Email *
            <span className="text-xs text-muted-foreground">(obrigatório)</span>
          </Label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              id="email"
              type="email"
              placeholder="seu@email.com"
              className="w-full rounded-md border border-gray-200 bg-white shadow-sm pl-9 focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-colors"
              {...register('email', {
                required: '❌ O email é obrigatório para continuar',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: '❌ Por favor, insira um endereço de email válido'
                }
              })}
            />
          </div>
          {fieldErrors.email?.message && (
            <p className="text-sm text-red-600 font-medium">{fieldErrors.email.message}</p>
          )}
          <p className="text-xs text-muted-foreground">Digite um email válido para contato</p>
        </div>

        {/* Data de Fundação */}
        <div className="space-y-2">
          <Label htmlFor="fundacao">Data de Fundação (Opcional)</Label>
          <div className="relative">
            <svg 
              className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="16" y1="2" x2="16" y2="6"></line>
              <line x1="8" y1="2" x2="8" y2="6"></line>
              <line x1="3" y1="10" x2="21" y2="10"></line>
            </svg>
            <Input 
              id="fundacao"
              type="date"
              className="w-full rounded-md border border-gray-200 bg-white shadow-sm pl-9 focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-colors"
              {...register('fundacao')}
            />
          </div>
          <p className="text-xs text-muted-foreground">Data em que a banda foi fundada</p>
        </div>
      </div>

      {/* Descrição */}
      <div className="space-y-2">
        <Label htmlFor="descricao" className="block text-sm font-medium text-gray-700">
          Descrição <span className="text-red-500">*</span>
        </Label>
        <div className="mt-1">
          <Textarea
            id="descricao"
            placeholder="Conte um pouco sobre a banda..."
              className="w-full rounded-md border border-gray-200 bg-white shadow-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 min-h-[100px] transition-colors"
            {...register('descricao', {
              required: 'A descrição é obrigatória',
              minLength: {
                value: 10,
                message: 'A descrição deve ter pelo menos 10 caracteres'
              },
              maxLength: {
                value: 500,
                message: 'A descrição deve ter no máximo 500 caracteres'
              }
            })}
          />
          <div className="mt-1 flex justify-between text-sm text-gray-500">
            <span>Mínimo de 10 caracteres</span>
            <span className={watch('descricao')?.length > 500 ? 'text-red-600 font-medium' : ''}>
              {watch('descricao')?.length || 0}/500
            </span>
          </div>
          {fieldErrors.descricao?.message && (
            <p className="mt-1 text-sm text-red-600">{fieldErrors.descricao.message}</p>
          )}
        </div>
      </div>

      {/* Redes Sociais */}
      <div className="space-y-4 pt-4 border-t border-gray-200">
        <h3 className="text-lg font-medium text-gray-900">Redes Sociais</h3>
        <p className="text-sm text-gray-500">Adicione os links das suas redes sociais (opcional)</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <Facebook className="h-5 w-5 text-blue-600" />
              <Label htmlFor="facebook" className="text-sm font-medium text-gray-700">
                Facebook
              </Label>
            </div>
            <Input 
              id="facebook"
              placeholder="https://facebook.com/suabanda"
              {...register('facebook')}
              className="w-full rounded-md border-gray-200 bg-white shadow-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
            />
          </div>
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <Instagram className="h-5 w-5 text-pink-600" />
              <Label htmlFor="instagram" className="text-sm font-medium text-gray-700">
                Instagram
              </Label>
            </div>
            <Input 
              id="instagram"
              placeholder="https://instagram.com/suabanda"
              {...register('instagram')}
              className="w-full rounded-md border-gray-200 bg-white shadow-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
            />
          </div>
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <Youtube className="h-5 w-5 text-red-600" />
              <Label htmlFor="youtube" className="text-sm font-medium text-gray-700">
                YouTube
              </Label>
            </div>
            <Input 
              id="youtube"
              placeholder="https://youtube.com/suabanda"
              {...register('youtube')}
              className="w-full rounded-md border-gray-200 bg-white shadow-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
            />
          </div>
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <Linkedin className="h-5 w-5 text-blue-700" />
              <Label htmlFor="linkedin" className="text-sm font-medium text-gray-700">
                LinkedIn
              </Label>
            </div>
            <Input 
              id="linkedin"
              placeholder="https://linkedin.com/company/suabanda"
              {...register('linkedin')}
              className="w-full rounded-md border-gray-200 bg-white shadow-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
            />
          </div>
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <Twitter className="h-5 w-5 text-blue-400" />
              <Label htmlFor="tiktok" className="text-sm font-medium text-gray-700">
                TikTok
              </Label>
            </div>
            <Input 
              id="tiktok"
              placeholder="https://tiktok.com/@suabanda"
              {...register('tiktok')}
              className="w-full rounded-md border-gray-200 bg-white shadow-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
            />
          </div>
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <Globe className="h-5 w-5 text-gray-700" />
              <Label htmlFor="site" className="text-sm font-medium text-gray-700">
                Site
              </Label>
            </div>
            <Input 
              id="site"
              placeholder="https://suabanda.com.br"
              {...register('site')}
              className="w-full rounded-md border-gray-200 bg-white shadow-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
