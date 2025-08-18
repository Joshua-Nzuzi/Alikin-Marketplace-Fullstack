import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const MobileMoneyTracker = ({ transactions = [], totalEarnings = 0, onExport = () => {} }) => {
  const [selectedProvider, setSelectedProvider] = useState('all');
  const [selectedPeriod, setSelectedPeriod] = useState('today');

  const providers = [
    { value: 'all', label: 'Tous', icon: 'CreditCard' },
    { value: 'orange_money', label: 'Orange Money', icon: 'Smartphone', color: '#FF6600' },
    { value: 'm_pesa', label: 'M-Pesa', icon: 'Phone', color: '#00A651' },
    { value: 'airtel_money', label: 'Airtel Money', icon: 'Wifi', color: '#E60012' }
  ];

  const periods = [
    { value: 'today', label: 'Aujourd\'hui' },
    { value: 'week', label: 'Cette semaine' },
    { value: 'month', label: 'Ce mois' },
    { value: 'year', label: 'Cette année' }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-success/10 text-success border-success/20';
      case 'pending':
        return 'bg-warning/10 text-warning border-warning/20';
      case 'failed':
        return 'bg-error/10 text-error border-error/20';
      default:
        return 'bg-muted text-muted-foreground border-border';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'completed':
        return 'Complété';
      case 'pending':
        return 'En attente';
      case 'failed':
        return 'Échoué';
      default:
        return status;
    }
  };

  const getProviderIcon = (provider) => {
    const providerData = providers?.find(p => p?.value === provider);
    return providerData ? providerData?.icon : 'CreditCard';
  };

  const getProviderColor = (provider) => {
    const providerData = providers?.find(p => p?.value === provider);
    return providerData?.color || '#D97706';
  };

  const filteredTransactions = transactions?.filter(transaction => {
    if (selectedProvider === 'all') return true;
    return transaction?.provider === selectedProvider;
  });

  const formatDate = (date) => {
    return new Date(date)?.toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const calculateProviderStats = () => {
    const stats = {};
    transactions?.forEach(transaction => {
      if (!stats?.[transaction?.provider]) {
        stats[transaction.provider] = { total: 0, count: 0 };
      }
      if (transaction?.status === 'completed') {
        stats[transaction.provider].total += transaction?.amount;
        stats[transaction.provider].count += 1;
      }
    });
    return stats;
  };

  const providerStats = calculateProviderStats();

  return (
    <div className="bg-card border border-border rounded-lg">
      <div className="p-4 border-b border-border">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
          <div>
            <h3 className="text-lg font-semibold">Revenus Mobile Money</h3>
            <p className="text-2xl font-bold text-primary mt-1 font-mono">
              {totalEarnings?.toLocaleString('fr-FR')} FC
            </p>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" onClick={onExport}>
              <Icon name="Download" size={14} className="mr-2" />
              Exporter
            </Button>
          </div>
        </div>
      </div>
      {/* Provider Stats */}
      <div className="p-4 border-b border-border">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {providers?.slice(1)?.map((provider) => {
            const stats = providerStats?.[provider?.value] || { total: 0, count: 0 };
            return (
              <div key={provider?.value} className="flex items-center space-x-3 p-3 bg-muted/30 rounded-lg">
                <div 
                  className="w-10 h-10 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: `${provider?.color}20`, color: provider?.color }}
                >
                  <Icon name={provider?.icon} size={20} />
                </div>
                <div>
                  <p className="text-sm font-medium">{provider?.label}</p>
                  <p className="text-xs text-muted-foreground">{stats?.count} transactions</p>
                  <p className="text-sm font-bold font-mono">{stats?.total?.toLocaleString('fr-FR')} FC</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {/* Filters */}
      <div className="p-4 border-b border-border">
        <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium">Fournisseur:</span>
            <div className="flex items-center space-x-1">
              {providers?.map((provider) => (
                <Button
                  key={provider?.value}
                  variant={selectedProvider === provider?.value ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setSelectedProvider(provider?.value)}
                  className="h-8"
                >
                  <Icon name={provider?.icon} size={14} className="mr-1" />
                  {provider?.label}
                </Button>
              ))}
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium">Période:</span>
            <div className="flex items-center space-x-1">
              {periods?.map((period) => (
                <Button
                  key={period?.value}
                  variant={selectedPeriod === period?.value ? 'outline' : 'ghost'}
                  size="sm"
                  onClick={() => setSelectedPeriod(period?.value)}
                  className="h-8"
                >
                  {period?.label}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* Transactions List */}
      <div className="max-h-96 overflow-y-auto">
        {filteredTransactions?.length === 0 ? (
          <div className="p-8 text-center">
            <Icon name="CreditCard" size={48} className="text-muted-foreground mx-auto mb-3" />
            <p className="text-muted-foreground">Aucune transaction trouvée</p>
            <p className="text-sm text-muted-foreground mt-1">
              Les paiements Mobile Money apparaîtront ici
            </p>
          </div>
        ) : (
          <div className="divide-y divide-border">
            {filteredTransactions?.map((transaction) => (
              <div key={transaction?.id} className="p-4 hover:bg-muted/30 transition-smooth">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div 
                      className="w-10 h-10 rounded-lg flex items-center justify-center"
                      style={{ 
                        backgroundColor: `${getProviderColor(transaction?.provider)}20`, 
                        color: getProviderColor(transaction?.provider) 
                      }}
                    >
                      <Icon name={getProviderIcon(transaction?.provider)} size={20} />
                    </div>
                    
                    <div>
                      <div className="flex items-center space-x-2">
                        <p className="font-medium text-sm">#{transaction?.id}</p>
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(transaction?.status)}`}>
                          {getStatusText(transaction?.status)}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        {transaction?.customerPhone} • {formatDate(transaction?.createdAt)}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Commande #{transaction?.orderId}
                      </p>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <p className="font-bold text-sm font-mono">
                      +{transaction?.amount?.toLocaleString('fr-FR')} FC
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Frais: {transaction?.fees} FC
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MobileMoneyTracker;