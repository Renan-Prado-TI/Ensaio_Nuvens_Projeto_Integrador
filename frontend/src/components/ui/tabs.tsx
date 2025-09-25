import React, { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';

interface TabItem {
  id: string;
  label: string;
  icon?: ReactNode;
  to: string;
}

interface TabsProps {
  items: TabItem[];
  className?: string;
}

export const Tabs: React.FC<TabsProps> = ({ items, className = '' }) => {
  const location = useLocation();
  
  return (
    <div className={`border-b border-gray-200 ${className}`}>
      <nav className="-mb-px flex space-x-8 overflow-x-auto" aria-label="Tabs">
        {items.map((tab) => {
          const isActive = location.pathname.startsWith(tab.to);
          
          return (
            <Link
              key={tab.id}
              to={tab.to}
              className={`
                ${isActive
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } 
                whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2
              `}
            >
              {tab.icon && <span className="h-5 w-5">{tab.icon}</span>}
              <span>{tab.label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
};

export default Tabs;
