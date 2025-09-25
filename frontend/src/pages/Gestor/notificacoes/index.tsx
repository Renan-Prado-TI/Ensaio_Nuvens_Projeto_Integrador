import React, { useState } from 'react';

interface Notification {
  id: string;
  type: 'solicitacao' | 'atualizacao' | 'sistema';
  title: string;
  message: string;
  date: string;
  read: boolean;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export const NotificacoesPage = () => {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'solicitacao',
      title: 'Nova solicitação de participação',
      message: 'João Silva solicitou participar da banda "Rock & Roll".',
      date: '10 min atrás',
      read: false,
      action: {
        label: 'Ver solicitação',
        onClick: () => console.log('Ver solicitação')
      }
    },
    {
      id: '2',
      type: 'atualizacao',
      title: 'Partitura atualizada',
      message: 'A partitura de "Bohemian Rhapsody" foi atualizada por Maria Santos.',
      date: '2 horas atrás',
      read: true,
      action: {
        label: 'Ver alterações',
        onClick: () => console.log('Ver alterações')
      }
    },
    {
      id: '3',
      type: 'sistema',
      title: 'Atualização do sistema',
      message: 'Nova versão disponível. Atualize para a versão 2.0.0.',
      date: '1 dia atrás',
      read: true
    }
  ]);

  const markAsRead = (id: string) => {
    setNotifications(notifications.map(notification => 
      notification.id === id ? { ...notification, read: true } : notification
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(notification => ({
      ...notification,
      read: true
    })));
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'solicitacao':
        return (
          <div className="flex-shrink-0">
            <svg className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
            </svg>
          </div>
        );
      case 'atualizacao':
        return (
          <div className="flex-shrink-0">
            <svg className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </div>
        );
      default:
        return (
          <div className="flex-shrink-0">
            <svg className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
        );
    }
  };

  return (
    <div>
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-xl font-semibold text-gray-900">Notificações</h1>
          <p className="mt-2 text-sm text-gray-700">
            Acompanhe as atividades e atualizações do sistema.
          </p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <button
            type="button"
            onClick={markAllAsRead}
            className="inline-flex items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 sm:w-auto"
          >
            Marcar todas como lidas
          </button>
        </div>
      </div>

      <div className="mt-8 bg-white shadow overflow-hidden sm:rounded-md">
        <ul className="divide-y divide-gray-200">
          {notifications.length === 0 ? (
            <li className="px-4 py-6 text-center text-gray-500">
              Nenhuma notificação encontrada.
            </li>
          ) : (
            notifications.map((notification) => (
              <li key={notification.id} className={`px-4 py-4 sm:px-6 ${!notification.read ? 'bg-blue-50' : ''}`}>
                <div className="flex items-center">
                  {getNotificationIcon(notification.type)}
                  <div className="ml-3 flex-1">
                    <div className="flex items-center justify-between">
                      <p className={`text-sm font-medium ${!notification.read ? 'text-blue-800' : 'text-gray-900'}`}>
                        {notification.title}
                      </p>
                      <div className="ml-2 flex-shrink-0 flex">
                        <p className="text-xs text-gray-500">{notification.date}</p>
                        {!notification.read && (
                          <span className="ml-2 flex-shrink-0 inline-block h-2 w-2 rounded-full bg-blue-500"></span>
                        )}
                      </div>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">{notification.message}</p>
                    {notification.action && (
                      <button
                        type="button"
                        onClick={() => {
                          notification.action?.onClick();
                          markAsRead(notification.id);
                        }}
                        className="mt-2 text-sm font-medium text-primary-600 hover:text-primary-500"
                      >
                        {notification.action.label} <span aria-hidden="true">&rarr;</span>
                      </button>
                    )}
                  </div>
                </div>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
};

export default NotificacoesPage;
