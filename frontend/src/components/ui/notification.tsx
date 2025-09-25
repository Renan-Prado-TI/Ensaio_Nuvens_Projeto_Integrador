import { useEffect, useState } from 'react';
import { X } from 'lucide-react';

type NotificationType = 'success' | 'error' | 'info' | 'warning';

interface NotificationProps {
  message: string;
  type?: NotificationType;
  onClose?: () => void;
  duration?: number;
}

const typeClasses = {
  success: 'bg-green-100 border-green-500 text-green-700',
  error: 'bg-red-100 border-red-500 text-red-700',
  info: 'bg-blue-100 border-blue-500 text-blue-700',
  warning: 'bg-yellow-100 border-yellow-500 text-yellow-700',
};

export const Notification = ({
  message,
  type = 'info',
  onClose,
  duration = 5000,
}: NotificationProps) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        handleClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [duration]);

  const handleClose = () => {
    setIsVisible(false);
    if (onClose) {
      // Pequeno atraso para permitir a animação de saída
      setTimeout(onClose, 300);
    }
  };

  if (!isVisible) return null;

  return (
    <div
      className={`fixed top-4 right-4 p-4 rounded-lg border-l-4 shadow-lg z-50 max-w-md transition-all duration-300 transform ${
        typeClasses[type]
      }`}
      role="alert"
    >
      <div className="flex items-center justify-between">
        <p className="text-sm">{message}</p>
        <button
          type="button"
          onClick={handleClose}
          className="ml-4 text-current opacity-50 hover:opacity-100 focus:outline-none"
          aria-label="Fechar notificação"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
