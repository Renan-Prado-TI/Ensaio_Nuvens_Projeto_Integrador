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
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300" />
        </div>
        <div className="relative flex justify-center">
          <span className="px-3 bg-white text-gray-600 text-sm font-medium">
            Ou continue com
          </span>
        </div>
      </div>
      
      <div className="flex flex-wrap justify-center gap-4 mt-6">
        <SocialLoginButton 
          provider="google" 
          onClick={() => handleSocialLogin('google')}
          className="p-3 bg-white border border-gray-200 hover:bg-gray-50 transition-colors duration-200 rounded-lg shadow-sm"
          iconClassName="text-red-500 text-2xl"
          showText={false}
        />
        
        <SocialLoginButton 
          provider="github" 
          onClick={() => handleSocialLogin('github')}
          className="p-3 bg-white border border-gray-200 hover:bg-gray-50 transition-colors duration-200 rounded-lg shadow-sm"
          iconClassName="text-gray-800 text-2xl"
          showText={false}
        />
        
        <SocialLoginButton 
          provider="linkedin" 
          onClick={() => handleSocialLogin('linkedin')}
          className="p-3 bg-white border border-gray-200 hover:bg-gray-50 transition-colors duration-200 rounded-lg shadow-sm"
          iconClassName="text-[#0077B5] text-2xl"
          showText={false}
        />
        
        <SocialLoginButton 
          provider="microsoft" 
          onClick={() => handleSocialLogin('microsoft')}
          className="p-3 bg-white border border-gray-200 hover:bg-gray-50 transition-colors duration-200 rounded-lg shadow-sm"
          iconClassName="text-[#00A4EF] text-2xl"
          showText={false}
        />
      </div>
    </div>
  );
};

export default SocialLogin;
