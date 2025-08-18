import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PerformanceChart = ({ data = [], type = 'sales', period = '7d' }) => {
  const [chartType, setChartType] = useState(type);
  const [selectedPeriod, setSelectedPeriod] = useState(period);

  const periods = [
    { value: '7d', label: '7 jours' },
    { value: '30d', label: '30 jours' },
    { value: '90d', label: '3 mois' },
    { value: '1y', label: '1 an' }
  ];

  const chartTypes = [
    { value: 'sales', label: 'Ventes', icon: 'TrendingUp' },
    { value: 'orders', label: 'Commandes', icon: 'ShoppingBag' },
    { value: 'revenue', label: 'Revenus', icon: 'DollarSign' }
  ];

  const getChartColor = () => {
    switch (chartType) {
      case 'sales':
        return '#D97706';
      case 'orders':
        return '#0EA5E9';
      case 'revenue':
        return '#10B981';
      default:
        return '#D97706';
    }
  };

  const formatValue = (value) => {
    if (chartType === 'revenue') {
      return `${value?.toLocaleString('fr-FR')} FC`;
    }
    return value?.toString();
  };

  const formatTooltipValue = (value, name) => {
    if (name === 'revenue' || chartType === 'revenue') {
      return [`${value?.toLocaleString('fr-FR')} FC`, 'Revenus'];
    }
    if (name === 'orders' || chartType === 'orders') {
      return [value, 'Commandes'];
    }
    return [value, 'Ventes'];
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      return (
        <div className="bg-popover border border-border rounded-lg p-3 shadow-warm-lg">
          <p className="text-sm font-medium mb-1">{label}</p>
          {payload?.map((entry, index) => (
            <p key={index} className="text-sm" style={{ color: entry?.color }}>
              {formatTooltipValue(entry?.value, entry?.dataKey)?.[1]}: {formatTooltipValue(entry?.value, entry?.dataKey)?.[0]}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  if (!data || data?.length === 0) {
    return (
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Performance</h3>
          <div className="flex items-center space-x-2">
            {periods?.map((p) => (
              <Button
                key={p?.value}
                variant={selectedPeriod === p?.value ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setSelectedPeriod(p?.value)}
              >
                {p?.label}
              </Button>
            ))}
          </div>
        </div>
        <div className="text-center py-8">
          <Icon name="BarChart3" size={48} className="text-muted-foreground mx-auto mb-3" />
          <p className="text-muted-foreground">Aucune donnée disponible</p>
          <p className="text-sm text-muted-foreground mt-1">
            Les données de performance apparaîtront ici
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-lg">
      <div className="p-4 border-b border-border">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
          <h3 className="text-lg font-semibold">Performance</h3>
          
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
            {/* Chart Type Selector */}
            <div className="flex items-center space-x-1 bg-muted rounded-lg p-1">
              {chartTypes?.map((ct) => (
                <Button
                  key={ct?.value}
                  variant={chartType === ct?.value ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setChartType(ct?.value)}
                  className="h-8"
                >
                  <Icon name={ct?.icon} size={14} className="mr-1" />
                  {ct?.label}
                </Button>
              ))}
            </div>
            
            {/* Period Selector */}
            <div className="flex items-center space-x-1">
              {periods?.map((p) => (
                <Button
                  key={p?.value}
                  variant={selectedPeriod === p?.value ? 'outline' : 'ghost'}
                  size="sm"
                  onClick={() => setSelectedPeriod(p?.value)}
                  className="h-8"
                >
                  {p?.label}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="p-4">
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            {chartType === 'orders' ? (
              <BarChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis 
                  dataKey="date" 
                  stroke="#6B7280"
                  fontSize={12}
                  tickLine={false}
                />
                <YAxis 
                  stroke="#6B7280"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar 
                  dataKey={chartType} 
                  fill={getChartColor()}
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            ) : (
              <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis 
                  dataKey="date" 
                  stroke="#6B7280"
                  fontSize={12}
                  tickLine={false}
                />
                <YAxis 
                  stroke="#6B7280"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip content={<CustomTooltip />} />
                <Line 
                  type="monotone" 
                  dataKey={chartType} 
                  stroke={getChartColor()}
                  strokeWidth={3}
                  dot={{ fill: getChartColor(), strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, stroke: getChartColor(), strokeWidth: 2 }}
                />
              </LineChart>
            )}
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default PerformanceChart;