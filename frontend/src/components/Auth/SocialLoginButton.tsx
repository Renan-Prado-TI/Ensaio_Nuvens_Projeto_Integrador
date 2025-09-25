import React from 'react';
import { twMerge } from 'tailwind-merge';
import { FaGoogle, FaGithub, FaLinkedin, FaMicrosoft } from 'react-icons/fa';

type SocialProvider = 'google' | 'github' | 'linkedin' | 'microsoft';

interface SocialLoginButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  provider: SocialProvider;
  label?: string;
  className?: string;
  iconClassName?: string;
  textClassName?: string;
  showText?: boolean;
}

const providerConfig = {
  google: {
    icon: <FaGoogle className="w-5 h-5" />,
    defaultLabel: 'Continuar com Google',
    bgColor: 'bg-white dark:bg-gray-800',
    textColor: 'text-gray-800 dark:text-gray-200',
    hoverBgColor: 'hover:bg-gray-50 dark:hover:bg-gray-700',
    borderColor: 'border-gray-300 dark:border-gray-600',
  },
  github: {
    icon: <FaGithub className="w-5 h-5" />,
    defaultLabel: 'Continuar com GitHub',
    bgColor: 'bg-gray-800 dark:bg-gray-700',
    textColor: 'text-white',
    hoverBgColor: 'hover:bg-gray-700 dark:hover:bg-gray-600',
    borderColor: 'border-gray-700 dark:border-gray-600',
  },
  linkedin: {
    icon: <FaLinkedin className="w-5 h-5" />,
    defaultLabel: 'Continuar com LinkedIn',
    bgColor: 'bg-[#0077B5]',
    textColor: 'text-white',
    hoverBgColor: 'hover:bg-[#006097]',
    borderColor: 'border-[#006097]',
  },
  microsoft: {
    icon: <FaMicrosoft className="w-5 h-5" />,
    defaultLabel: 'Continuar com Microsoft',
    bgColor: 'bg-[#00A4EF]',
    textColor: 'text-white',
    hoverBgColor: 'hover:bg-[#008BD2]',
    borderColor: 'border-[#008BD2]',
  },
} as const;

const SocialLoginButton: React.FC<SocialLoginButtonProps> = ({
  provider,
  label,
  className = '',
  iconClassName = '',
  textClassName = '',
  showText = true,
  ...props
}) => {
  const config = providerConfig[provider];
  
  return (
    <button
      type="button"
      className={twMerge(
        'inline-flex items-center justify-center rounded-lg border',
        'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500',
        'transition-colors duration-200',
        showText ? 'px-4 py-2.5' : 'p-2',
        config.bgColor,
        config.textColor,
        config.hoverBgColor,
        config.borderColor,
        className
      )}
      title={!showText ? (label || config.defaultLabel) : undefined}
      {...props}
    >
      <span className={twMerge(showText ? 'mr-2' : '', iconClassName)}>
        {config.icon}
      </span>
      {showText && (
        <span className={twMerge('text-sm font-medium', textClassName)}>
          {label || config.defaultLabel}
        </span>
      )}
    </button>
  );
};

export default SocialLoginButton;
