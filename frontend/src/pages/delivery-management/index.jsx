import React, { useState, useEffect } from 'react';
import { 
  MapPin, 
  Phone, 
  Clock, 
  Package, 
  Truck, 
  User, 
  Search, 
  Filter,
  Plus,
  Eye,
  Edit,
  Trash2,
  CheckCircle,
  AlertTriangle,
  X
} from 'lucide-react';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Select from '../../components/ui/Select';
import { 
  MobileCard, 
  ResponsiveGrid, 
  ResponsiveModal, 
  ResponsiveList,
  FloatingActionButton 
} from '../../components/ui';

const DeliveryManagement = () => {
  const [deliveries, setDeliveries] = useState([
    {
      id: 1,
      orderNumber: 'ORD-2024-001',
      customerName: 'Jean Mukendi',
      customerPhone: '+243 812345678',
      customerAddress: 'Avenue du Commerce, Gombe',
      driverName: 'Pierre Mwamba',
      driverPhone: '+243 898765432',
      driverId: 'DRV-001',
      status: 'in_transit',
      pickupAddress: 'Marché Central, Kinshasa',
      deliveryAddress: 'Avenue du Commerce, Gombe',
      estimatedTime: '14:30',
      actualTime: null,
      distance: 8.5,
      earnings: 50000,
      rating: 4.8,
      createdAt: '2024-01-15T10:00:00Z',
      items: [
        { name: 'Smartphone Samsung', quantity: 1, price: 125000 },
        { name: 'Coque de protection', quantity: 2, price: 5000 }
      ]
    },
    {
      id: 2,
      orderNumber: 'ORD-2024-002',
      customerName: 'Marie Tshibola',
      customerPhone: '+243 823456789',
      customerAddress: 'Boulevard du 30 Juin, Limete',
      driverName: 'Thomas Mwamba',
      driverPhone: '+243 887654321',
      driverId: 'DRV-002',
      status: 'completed',
      pickupAddress: 'Centre Commercial, Kinshasa',
      deliveryAddress: 'Boulevard du 30 Juin, Limete',
      estimatedTime: '16:00',
      actualTime: '15:45',
      distance: 12.3,
      earnings: 64000,
      rating: 5.0,
      createdAt: '2024-01-15T11:00:00Z',
      items: [
        { name: 'Sac à dos Nike', quantity: 1, price: 45000 }
      ]
    },
    {
      id: 3,
      orderNumber: 'ORD-2024-003',
      customerName: 'Paul Mwamba',
      customerPhone: '+243 834567890',
      customerAddress: 'Quartier Matonge, Kalamu',
      driverName: 'Pierre Mwamba',
      driverPhone: '+243 898765432',
      driverId: 'DRV-001',
      status: 'pending',
      pickupAddress: 'Marché Central, Kinshasa',
      deliveryAddress: 'Quartier Matonge, Kalamu',
      estimatedTime: '17:30',
      actualTime: null,
      distance: 6.2,
      earnings: 40000,
      rating: null,
      createdAt: '2024-01-15T12:00:00Z',
      items: [
        { name: 'Livre Le Petit Prince', quantity: 1, price: 3500 }
      ]
    }
  ]);

  const [drivers, setDrivers] = useState([
    {
      id: 'DRV-001',
      name: 'Pierre Mwamba',
      phone: '+243 898765432',
      email: 'pierre.mwamba@alikin.com',
      status: 'active',
      rating: 4.8,
      totalDeliveries: 156,
      totalEarnings: 2500000,
      vehicle: 'Moto Yamaha 125cc',
      licensePlate: 'KN-1234-AB',
      location: { lat: -4.4419, lng: 15.2663 },
      isOnline: true,
      currentDelivery: 'ORD-2024-001'
    },
    {
      id: 'DRV-002',
      name: 'Thomas Mwamba',
      phone: '+243 887654321',
      email: 'thomas.mwamba@alikin.com',
      status: 'active',
      rating: 4.9,
      totalDeliveries: 203,
      totalEarnings: 3360000,
      vehicle: 'Moto Honda 150cc',
      licensePlate: 'KN-5678-CD',
      location: { lat: -4.4419, lng: 15.2663 },
      isOnline: true,
      currentDelivery: null
    },
    {
      id: 'DRV-003',
      name: 'David Mwamba',
      phone: '+243 876543210',
      email: 'david.mwamba@alikin.com',
      status: 'offline',
      rating: 4.7,
      totalDeliveries: 89,
      totalEarnings: 1440000,
      vehicle: 'Moto Suzuki 125cc',
      licensePlate: 'KN-9012-EF',
      location: { lat: -4.4419, lng: 15.2663 },
      isOnline: false,
      currentDelivery: null
    }
  ]);

  const [showAddDriverModal, setShowAddDriverModal] = useState(false);
  const [editingDriver, setEditingDriver] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [selectedDriver, setSelectedDriver] = useState('');

  const statuses = [
    { value: 'pending', label: 'En Attente', color: 'warning' },
    { value: 'assigned', label: 'Assigné', color: 'accent' },
    { value: 'in_transit', label: 'En Transit', color: 'primary' },
    { value: 'completed', label: 'Terminé', color: 'success' },
    { value: 'cancelled', label: 'Annulé', color: 'destructive' }
  ];

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    vehicle: '',
    licensePlate: '',
    status: 'active'
  });

  const [formErrors, setFormErrors] = useState({});

  // Filter deliveries based on search and filters
  const filteredDeliveries = deliveries.filter(delivery => {
    const matchesSearch = delivery.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         delivery.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         delivery.driverName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = !selectedStatus || delivery.status === selectedStatus;
    const matchesDriver = !selectedDriver || delivery.driverId === selectedDriver;
    
    return matchesSearch && matchesStatus && matchesDriver;
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (formErrors[field]) {
      setFormErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.name.trim()) errors.name = 'Le nom du chauffeur est requis';
    if (!formData.phone.trim()) errors.phone = 'Le téléphone est requis';
    if (!formData.email.trim()) errors.email = 'L\'email est requis';
    if (!formData.vehicle.trim()) errors.vehicle = 'Le véhicule est requis';
    if (!formData.licensePlate.trim()) errors.licensePlate = 'La plaque d\'immatriculation est requise';
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = () => {
    if (!validateForm()) return;

    const driverData = {
      ...formData,
      id: editingDriver ? editingDriver.id : `DRV-${Date.now().toString().slice(-6)}`,
      rating: editingDriver ? editingDriver.rating : 0,
      totalDeliveries: editingDriver ? editingDriver.totalDeliveries : 0,
      totalEarnings: editingDriver ? editingDriver.totalEarnings : 0,
      location: editingDriver ? editingDriver.location : { lat: 4.0511, lng: 9.7679 },
      isOnline: false,
      currentDelivery: null
    };

    if (editingDriver) {
      setDrivers(prev => prev.map(d => d.id === editingDriver.id ? driverData : d));
    } else {
      setDrivers(prev => [driverData, ...prev]);
    }

    handleCloseModal();
  };

  const handleEdit = (driver) => {
    setEditingDriver(driver);
    setFormData({
      name: driver.name,
      phone: driver.phone,
      email: driver.email,
      vehicle: driver.vehicle,
      licensePlate: driver.licensePlate,
      status: driver.status
    });
    setShowAddDriverModal(true);
  };

  const handleDelete = (driverId) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce chauffeur ?')) {
      setDrivers(prev => prev.filter(d => d.id !== driverId));
    }
  };

  const handleCloseModal = () => {
    setShowAddDriverModal(false);
    setEditingDriver(null);
    setFormData({
      name: '',
      phone: '',
      email: '',
      vehicle: '',
      licensePlate: '',
      status: 'active'
    });
    setFormErrors({});
  };

  const getStatusBadge = (status) => {
    const statusConfig = statuses.find(s => s.value === status);
    if (!statusConfig) return null;

    const colorMap = {
      warning: 'bg-warning/10 text-warning',
      accent: 'bg-accent/10 text-accent',
      primary: 'bg-primary/10 text-primary',
      success: 'bg-success/10 text-success',
      destructive: 'bg-destructive/10 text-destructive'
    };

    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${colorMap[statusConfig.color]}`}>
        {statusConfig.label}
      </span>
    );
  };

  const getDriverStatusBadge = (driver) => {
    if (driver.isOnline) {
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-success/10 text-success">
          <div className="w-2 h-2 bg-success rounded-full mr-1"></div>
          En ligne
        </span>
      );
    } else {
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-muted/10 text-muted-foreground">
          <div className="w-2 h-2 bg-muted-foreground rounded-full mr-1"></div>
          Hors ligne
        </span>
      );
    }
  };

  const calculateStats = () => {
    const totalDeliveries = deliveries.length;
    const completedDeliveries = deliveries.filter(d => d.status === 'completed').length;
    const pendingDeliveries = deliveries.filter(d => d.status === 'pending').length;
    const inTransitDeliveries = deliveries.filter(d => d.status === 'in_transit').length;
    const totalEarnings = deliveries.reduce((sum, d) => sum + d.earnings, 0);
    const averageRating = deliveries
      .filter(d => d.rating)
      .reduce((sum, d) => sum + d.rating, 0) / deliveries.filter(d => d.rating).length || 0;

    return {
      totalDeliveries,
      completedDeliveries,
      pendingDeliveries,
      inTransitDeliveries,
      totalEarnings,
      averageRating: averageRating.toFixed(1)
    };
  };

  const stats = calculateStats();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b border-border px-6 py-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Gestion des Livraisons</h1>
              <p className="text-muted-foreground">Suivez vos livraisons et gérez vos chauffeurs</p>
            </div>
            <Button 
              variant="default" 
              onClick={() => setShowAddDriverModal(true)}
              iconName="Plus"
            >
              Ajouter un Chauffeur
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-card rounded-lg border border-border p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Livraisons</p>
                <p className="text-2xl font-bold text-foreground">{stats.totalDeliveries}</p>
              </div>
              <div className="p-3 rounded-full bg-primary/10">
                <Package className="w-6 h-6 text-primary" />
              </div>
            </div>
          </div>

          <div className="bg-card rounded-lg border border-border p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">En Transit</p>
                <p className="text-2xl font-bold text-foreground">{stats.inTransitDeliveries}</p>
              </div>
              <div className="p-3 rounded-full bg-accent/10">
                <Truck className="w-6 h-6 text-accent" />
              </div>
            </div>
          </div>

          <div className="bg-card rounded-lg border border-border p-4">
            <div className="flex items-center justify-between">
              <div>
                                 <p className="text-sm font-medium text-muted-foreground">Revenus (CDF)</p>
                <p className="text-2xl font-bold text-foreground">{stats.totalEarnings.toLocaleString()}</p>
              </div>
              <div className="p-3 rounded-full bg-success/10">
                <DollarSign className="w-6 h-6 text-success" />
              </div>
            </div>
          </div>

          <div className="bg-card rounded-lg border border-border p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Note Moyenne</p>
                <p className="text-2xl font-bold text-foreground">{stats.averageRating}</p>
              </div>
              <div className="p-3 rounded-full bg-warning/10">
                <Star className="w-6 h-6 text-warning" />
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-card rounded-lg border border-border p-4 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Input
              placeholder="Rechercher par commande, client ou chauffeur..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              iconName="Search"
            />
            <Select
              placeholder="Tous les statuts"
              value={selectedStatus}
              onChange={setSelectedStatus}
              options={statuses}
              clearable
            />
            <Select
              placeholder="Tous les chauffeurs"
              value={selectedDriver}
              onChange={setSelectedDriver}
              options={drivers.map(d => ({ value: d.id, label: d.name }))}
              clearable
            />
            <Button 
              variant="outline" 
              onClick={() => {
                setSearchTerm('');
                setSelectedStatus('');
                setSelectedDriver('');
              }}
              iconName="X"
            >
              Réinitialiser
            </Button>
          </div>
        </div>

        {/* Drivers Overview */}
        <div className="bg-card rounded-lg border border-border p-6 mb-6">
          <h2 className="text-lg font-semibold text-foreground mb-4">Chauffeurs Actifs</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {drivers.map((driver) => (
              <div key={driver.id} className="border border-border rounded-lg p-4 hover:shadow-warm transition-shadow">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-medium text-foreground">{driver.name}</h3>
                    <p className="text-sm text-muted-foreground">{driver.vehicle}</p>
                  </div>
                  {getDriverStatusBadge(driver)}
                </div>
                
                <div className="space-y-2 mb-3">
                  <div className="flex items-center space-x-2 text-sm">
                    <Phone className="w-4 h-4 text-muted-foreground" />
                    <span className="text-muted-foreground">{driver.phone}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <Package className="w-4 h-4 text-muted-foreground" />
                    <span className="text-muted-foreground">{driver.totalDeliveries} livraisons</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <Star className="w-4 h-4 text-warning" />
                    <span className="text-muted-foreground">{driver.rating} ⭐</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <DollarSign className="w-4 h-4 text-success" />
                    <span className="text-muted-foreground">{driver.totalEarnings.toLocaleString()} CDF</span>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => handleEdit(driver)}
                    iconName="Edit"
                    className="flex-1"
                  >
                    Modifier
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => handleDelete(driver.id)}
                    iconName="Trash2"
                    className="text-destructive hover:text-destructive"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Deliveries List */}
        <div className="bg-card rounded-lg border border-border p-6">
          <h2 className="text-lg font-semibold text-foreground mb-4">Livraisons Récentes</h2>
          <div className="space-y-4">
            {filteredDeliveries.map((delivery) => (
              <div key={delivery.id} className="border border-border rounded-lg p-4 hover:shadow-warm transition-shadow">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-medium text-foreground">{delivery.orderNumber}</h3>
                    <p className="text-sm text-muted-foreground">{delivery.customerName}</p>
                  </div>
                  <div className="flex items-center space-x-3">
                    {getStatusBadge(delivery.status)}
                    <Button variant="ghost" size="sm" iconName="Eye">
                      Voir
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-3">
                  <div className="flex items-center space-x-2 text-sm">
                    <User className="w-4 h-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Chauffeur:</span>
                    <span className="font-medium">{delivery.driverName}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <MapPin className="w-4 h-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Distance:</span>
                    <span className="font-medium">{delivery.distance} km</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <Clock className="w-4 h-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Heure estimée:</span>
                    <span className="font-medium">{delivery.estimatedTime}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <DollarSign className="w-4 h-4 text-success" />
                    <span className="text-muted-foreground">Gains:</span>
                    <span className="font-medium">{delivery.earnings.toLocaleString()} CDF</span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-4">
                    <span className="text-muted-foreground">
                      <Phone className="w-4 h-4 inline mr-1" />
                      {delivery.customerPhone}
                    </span>
                    <span className="text-muted-foreground">
                      <MapPin className="w-4 h-4 inline mr-1" />
                      {delivery.deliveryAddress}
                    </span>
                  </div>
                  {delivery.rating && (
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-warning" />
                      <span className="font-medium">{delivery.rating}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {filteredDeliveries.length === 0 && (
            <div className="text-center py-12">
              <Truck className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium text-foreground mb-2">Aucune livraison trouvée</h3>
              <p className="text-muted-foreground">
                {searchTerm || selectedStatus || selectedDriver 
                  ? 'Essayez de modifier vos filtres de recherche'
                  : 'Aucune livraison en cours pour le moment'
                }
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Add/Edit Driver Modal */}
      {showAddDriverModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-background rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-border">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-foreground">
                  {editingDriver ? 'Modifier le Chauffeur' : 'Ajouter un Chauffeur'}
                </h2>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={handleCloseModal}
                  iconName="X"
                />
              </div>
            </div>

            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Nom Complet"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  error={formErrors.name}
                  required
                />
                <Input
                  label="Téléphone"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  error={formErrors.phone}
                  required
                />
                <Input
                  label="Email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  error={formErrors.email}
                  required
                />
                <Input
                  label="Véhicule"
                  value={formData.vehicle}
                  onChange={(e) => handleInputChange('vehicle', e.target.value)}
                  error={formErrors.vehicle}
                  required
                />
                <Input
                  label="Plaque d'Immatriculation"
                  value={formData.licensePlate}
                  onChange={(e) => handleInputChange('licensePlate', e.target.value)}
                  error={formErrors.licensePlate}
                  required
                />
                <Select
                  label="Statut"
                  value={formData.status}
                  onChange={(value) => handleInputChange('status', value)}
                  options={[
                    { value: 'active', label: 'Actif' },
                    { value: 'inactive', label: 'Inactif' },
                    { value: 'suspended', label: 'Suspendu' }
                  ]}
                />
              </div>

              <div className="flex items-center justify-end space-x-3 pt-4 border-t border-border">
                <Button variant="outline" onClick={handleCloseModal}>
                  Annuler
                </Button>
                <Button onClick={handleSubmit}>
                  {editingDriver ? 'Mettre à Jour' : 'Ajouter le Chauffeur'}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeliveryManagement;
