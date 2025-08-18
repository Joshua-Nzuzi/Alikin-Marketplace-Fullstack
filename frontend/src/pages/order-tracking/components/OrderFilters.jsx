import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const OrderFilters = ({ 
  onFilterChange, 
  activeFilters = {}, 
  orderCounts = {} 
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const statusOptions = [
    { value: 'all', label: 'Tous les statuts' },
    { value: 'confirmed', label: 'Confirmées' },
    { value: 'prepared', label: 'En préparation' },
    { value: 'dispatched', label: 'Expédiées' },
    { value: 'delivered', label: 'Livrées' },
    { value: 'cancelled', label: 'Annulées' }
  ];

  const timeRangeOptions = [
    { value: 'all', label: 'Toutes les périodes' },
    { value: 'today', label: "Aujourd\'hui" },
    { value: 'week', label: 'Cette semaine' },
    { value: 'month', label: 'Ce mois' },
    { value: '3months', label: '3 derniers mois' }
  ];

  const sortOptions = [
    { value: 'newest', label: 'Plus récentes' },
    { value: 'oldest', label: 'Plus anciennes' },
    { value: 'amount_high', label: 'Montant décroissant' },
    { value: 'amount_low', label: 'Montant croissant' }
  ];

  const handleFilterChange = (key, value) => {
    onFilterChange({
      ...activeFilters,
      [key]: value
    });
  };

  const clearFilters = () => {
    onFilterChange({
      status: 'all',
      timeRange: 'all',
      sortBy: 'newest'
    });
  };

  const hasActiveFilters = Object.values(activeFilters)?.some(value => 
    value && value !== 'all' && value !== 'newest'
  );

  return (
    <div className="bg-card border border-border rounded-lg">
      {/* Filter Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Icon name="Filter" size={20} className="text-muted-foreground" />
            <h3 className="font-medium text-foreground">Filtres</h3>
            {hasActiveFilters && (
              <span className="bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full">
                Actifs
              </span>
            )}
          </div>
          <div className="flex items-center space-x-2">
            {hasActiveFilters && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearFilters}
                className="text-muted-foreground hover:text-foreground"
              >
                Effacer
              </Button>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
              iconName={isExpanded ? "ChevronUp" : "ChevronDown"}
            />
          </div>
        </div>
      </div>
      {/* Quick Status Filters */}
      <div className="p-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 mb-4">
          {statusOptions?.slice(0, 4)?.map((status) => (
            <button
              key={status?.value}
              onClick={() => handleFilterChange('status', status?.value)}
              className={`p-3 rounded-lg text-left transition-smooth animate-scale-press ${
                activeFilters?.status === status?.value
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground'
              }`}
            >
              <div className="text-sm font-medium">{status?.label}</div>
              <div className="text-xs opacity-80">
                {orderCounts?.[status?.value] || 0} commande(s)
              </div>
            </button>
          ))}
        </div>

        {/* Expanded Filters */}
        {isExpanded && (
          <div className="space-y-4 animate-slide-in">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              <Select
                label="Statut"
                options={statusOptions}
                value={activeFilters?.status || 'all'}
                onChange={(value) => handleFilterChange('status', value)}
              />
              
              <Select
                label="Période"
                options={timeRangeOptions}
                value={activeFilters?.timeRange || 'all'}
                onChange={(value) => handleFilterChange('timeRange', value)}
              />
              
              <Select
                label="Trier par"
                options={sortOptions}
                value={activeFilters?.sortBy || 'newest'}
                onChange={(value) => handleFilterChange('sortBy', value)}
              />
            </div>

            {/* Additional Filters */}
            <div className="pt-4 border-t border-border">
              <h4 className="font-medium text-foreground mb-3">Filtres avancés</h4>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Montant minimum (CDF)
                  </label>
                  <input
                    type="number"
                    placeholder="0"
                    className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    value={activeFilters?.minAmount || ''}
                    onChange={(e) => handleFilterChange('minAmount', e?.target?.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Montant maximum (CDF)
                  </label>
                  <input
                    type="number"
                    placeholder="1000000"
                    className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    value={activeFilters?.maxAmount || ''}
                    onChange={(e) => handleFilterChange('maxAmount', e?.target?.value)}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderFilters;