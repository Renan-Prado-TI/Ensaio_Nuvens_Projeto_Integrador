import React from 'react';
import SocialLoginButton from '@/components/Auth/SocialLoginButton';

export const SocialLogin: React.FC = () => {
  const handleSocialLogin = (provider: string) => {
    console.log(`Logging in with ${provider}`);
    // Aqui você pode adicionar a lógica de autenticação com o provedor selecionado
  };

  return (
    <div className="w-full">
      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center" aria-hidden="true">
          <div className="w-full border-t border-gray-200"></div>
        </div>
        <div className="relative flex justify-center">
          <span className="px-3 bg-white text-xs font-medium text-gray-500">
            Acesse com sua rede social
          </span>
        </div>
      </div>
      <div className="flex justify-center items-center space-x-3">
        <SocialLoginButton 
          provider="google" 
          onClick={() => handleSocialLogin('google')}
          className="p-2 bg-white border border-gray-200 hover:bg-gray-50 transition-colors duration-200 rounded-full shadow-sm"
          iconClassName="text-red-500 text-base"
          showText={false}
        />
        
        <SocialLoginButton 
          provider="github" 
          onClick={() => handleSocialLogin('github')}
          className="p-2 bg-white border border-gray-200 hover:bg-gray-50 transition-colors duration-200 rounded-full shadow-sm"
          iconClassName="text-gray-800 text-base"
          showText={false}
        />
        
        <SocialLoginButton 
          provider="linkedin" 
          onClick={() => handleSocialLogin('linkedin')}
          className="p-2 bg-white border border-gray-200 hover:bg-gray-50 transition-colors duration-200 rounded-full shadow-sm"
          iconClassName="text-[#0077B5] text-base"
          showText={false}
        />
        
        <SocialLoginButton 
          provider="microsoft" 
          onClick={() => handleSocialLogin('microsoft')}
          className="p-2 bg-white border border-gray-200 hover:bg-gray-50 transition-colors duration-200 rounded-full shadow-sm"
          iconClassName="text-[#00A4EF] text-base"
          showText={false}
        />
        
        <SocialLoginButton 
          provider="facebook" 
          onClick={() => handleSocialLogin('facebook')}
          className="p-2 bg-white border border-gray-200 hover:bg-gray-50 transition-colors duration-200 rounded-full shadow-sm"
          iconClassName="text-[#1877F2] text-base"
          showText={false}
        />
      </div>
    </div>
  );
};

export default SocialLogin;
