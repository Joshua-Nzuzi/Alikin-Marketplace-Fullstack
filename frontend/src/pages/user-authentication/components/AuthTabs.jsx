import React from 'react';
import Icon from '../../../components/AppIcon';

const AuthTabs = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'login', label: 'Connexion', icon: 'LogIn' },
    { id: 'register', label: 'Inscription', icon: 'UserPlus' }
  ];

  return (
    <div className="flex bg-muted rounded-lg p-1 mb-8">
      {tabs?.map((tab) => (
        <button
          key={tab?.id}
          onClick={() => onTabChange(tab?.id)}
          className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-md text-sm font-medium transition-smooth animate-scale-press ${
            activeTab === tab?.id
              ? 'bg-card text-foreground shadow-warm-sm'
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          <Icon name={tab?.icon} size={18} />
          <span>{tab?.label}</span>
        </button>
      ))}
    </div>
  );
};

export default AuthTabs;