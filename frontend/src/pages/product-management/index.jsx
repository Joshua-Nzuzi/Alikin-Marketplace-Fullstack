import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  Search, 
  Filter, 
  Edit, 
  Trash2, 
  Eye, 
  Upload, 
  Package, 
  DollarSign,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  X,
  Image as ImageIcon
} from 'lucide-react';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Select from '../../components/ui/Select';
import { 
  MobileCard, 
  ResponsiveGrid, 
  ResponsiveModal, 
  FloatingActionButton,
  ResponsiveList 
} from '../../components/ui';

const ProductManagement = () => {
  const [products, setProducts] = useState([
    {
      id: 1,
      name: 'Smartphone Samsung Galaxy A54',
      category: 'electronics',
      price: 2500000,
      stock: 15,
      status: 'active',
      images: ['https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400'],
      description: 'Smartphone Android avec écran 6.4" et appareil photo 50MP',
      sku: 'SAM-A54-001',
      createdAt: '2024-01-15'
    },
    {
      id: 2,
      name: 'Sac à dos Nike Sport',
      category: 'fashion',
      price: 900000,
      stock: 8,
      status: 'active',
      images: ['https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400'],
      description: 'Sac à dos sportif avec compartiments multiples',
      sku: 'NIKE-SAC-002',
      createdAt: '2024-01-10'
    },
    {
      id: 3,
      name: 'Livre "Le Petit Prince"',
      category: 'books',
      price: 70000,
      stock: 0,
      status: 'out_of_stock',
      images: ['https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400'],
      description: 'Édition illustrée du classique de Saint-Exupéry',
      sku: 'BOOK-PP-003',
      createdAt: '2024-01-05'
    },
    {
      id: 4,
      name: 'Ordinateur Portable HP Pavilion',
      category: 'electronics',
      price: 8000000,
      stock: 5,
      status: 'active',
      images: ['https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400'],
      description: 'Ordinateur portable performant pour tous usages',
      sku: 'HP-PAV-004',
      createdAt: '2024-01-12'
    },
    {
      id: 5,
      name: 'Chaussures Nike Air Max',
      category: 'fashion',
      price: 150000,
      stock: 12,
      status: 'active',
      images: ['https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400'],
      description: 'Chaussures de sport confortables et stylées',
      sku: 'NIKE-AM-005',
      createdAt: '2024-01-08'
    },
    {
      id: 6,
      name: 'Set de Cuisine Complet',
      category: 'home',
      price: 95000,
      stock: 3,
      status: 'active',
      images: ['https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400'],
      description: 'Set de cuisine 12 pièces en acier inoxydable',
      sku: 'HOME-CUIS-006',
      createdAt: '2024-01-03'
    }
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');

  const categories = [
    { value: 'electronics', label: 'Électronique' },
    { value: 'fashion', label: 'Mode & Accessoires' },
    { value: 'home', label: 'Maison & Décoration' },
    { value: 'books', label: 'Livres & Papeterie' },
    { value: 'sports', label: 'Sport & Loisirs' },
    { value: 'beauty', label: 'Beauté & Santé' },
    { value: 'food', label: 'Alimentation' },
    { value: 'other', label: 'Autre' }
  ];

  const statuses = [
    { value: 'active', label: 'Actif' },
    { value: 'inactive', label: 'Inactif' },
    { value: 'out_of_stock', label: 'Rupture de Stock' },
    { value: 'draft', label: 'Brouillon' }
  ];

  const [formData, setFormData] = useState({
    name: '',
    category: '',
    price: '',
    stock: '',
    description: '',
    sku: '',
    images: []
  });

  const [formErrors, setFormErrors] = useState({});

  // Filter products based on search and filters
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.sku.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || product.category === selectedCategory;
    const matchesStatus = !selectedStatus || product.status === selectedStatus;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const generateSKU = () => {
    const prefix = formData.category ? formData.category.substring(0, 3).toUpperCase() : 'PROD';
    const timestamp = Date.now().toString().slice(-6);
    return `${prefix}-${timestamp}`;
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (formErrors[field]) {
      setFormErrors(prev => ({ ...prev, [field]: '' }));
    }
    
    // Auto-generate SKU when category changes
    if (field === 'category') {
      setFormData(prev => ({ ...prev, sku: generateSKU() }));
    }
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const imageUrls = files.map(file => URL.createObjectURL(file));
    setFormData(prev => ({ ...prev, images: [...prev.images, ...imageUrls] }));
  };

  const removeImage = (index) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.name.trim()) errors.name = 'Le nom du produit est requis';
    if (!formData.category) errors.category = 'La catégorie est requise';
    if (!formData.price || formData.price <= 0) errors.price = 'Le prix doit être supérieur à 0';
    if (!formData.stock || formData.stock < 0) errors.stock = 'Le stock ne peut pas être négatif';
    if (!formData.description.trim()) errors.description = 'La description est requise';
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = () => {
    if (!validateForm()) return;

    const productData = {
      ...formData,
      id: editingProduct ? editingProduct.id : Date.now(),
      price: parseFloat(formData.price),
      stock: parseInt(formData.stock),
      status: 'active',
      createdAt: editingProduct ? editingProduct.createdAt : new Date().toISOString().split('T')[0]
    };

    if (editingProduct) {
      setProducts(prev => prev.map(p => p.id === editingProduct.id ? productData : p));
    } else {
      setProducts(prev => [productData, ...prev]);
    }

    handleCloseModal();
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      category: product.category,
      price: product.price.toString(),
      stock: product.stock.toString(),
      description: product.description,
      sku: product.sku,
      images: product.images
    });
    setShowAddModal(true);
  };

  const handleDelete = (productId) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce produit ?')) {
      setProducts(prev => prev.filter(p => p.id !== productId));
    }
  };

  const handleCloseModal = () => {
    setShowAddModal(false);
    setEditingProduct(null);
    setFormData({
      name: '',
      category: '',
      price: '',
      stock: '',
      description: '',
      sku: '',
      images: []
    });
    setFormErrors({});
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      active: { color: 'bg-success/10 text-success', icon: CheckCircle },
      inactive: { color: 'bg-muted/10 text-muted-foreground', icon: X },
      out_of_stock: { color: 'bg-warning/10 text-warning', icon: AlertTriangle },
      draft: { color: 'bg-muted/10 text-muted-foreground', icon: Package }
    };

    const config = statusConfig[status] || statusConfig.inactive;
    const IconCmp = config.icon;

    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.color}`}>
        <IconCmp className="w-3 h-3 mr-1" />
        {statuses.find(s => s.value === status)?.label || status}
      </span>
    );
  };

  const getStockBadge = (stock) => {
    if (stock === 0) {
      return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-destructive/10 text-destructive">Rupture</span>;
    } else if (stock < 5) {
      return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-warning/10 text-warning">Faible</span>;
    } else {
      return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-success/10 text-success">En Stock</span>;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background pt-16 lg:pt-20">
      {/* Header */}
      <div className="bg-card border-b border-border px-6 py-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Gestion des Produits</h1>
              <p className="text-muted-foreground">Gérez votre catalogue et votre inventaire</p>
            </div>
            <Button 
              variant="default" 
              onClick={() => setShowAddModal(true)}
              iconName="Plus"
            >
              Ajouter un Produit
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        {/* Filters and Search */}
        <div className="bg-card rounded-lg border border-border p-4 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Input
              placeholder="Rechercher par nom ou SKU..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              iconName="Search"
            />
            <Select
              placeholder="Toutes les catégories"
              value={selectedCategory}
              onChange={setSelectedCategory}
              options={categories}
              clearable
            />
            <Select
              placeholder="Tous les statuts"
              value={selectedStatus}
              onChange={setSelectedStatus}
              options={statuses}
              clearable
            />
            <Button 
              variant="outline" 
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('');
                setSelectedStatus('');
              }}
              iconName="X"
            >
              Réinitialiser
            </Button>
          </div>
        </div>

        {/* Products Grid */}
        <ResponsiveGrid cols={{ mobile: 1, tablet: 2, desktop: 3, wide: 4 }} gap={{ mobile: 4, tablet: 6, desktop: 8 }}>
          {filteredProducts.map((product) => (
            <MobileCard key={product.id} padding="default" shadow="mobile" interactive>
              {/* Product Image */}
              <div className="aspect-square bg-muted/30 relative mb-4">
                {product.images.length > 0 ? (
                  <img 
                    src={product.images[0]} 
                    alt={product.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <ImageIcon className="w-12 h-12 text-muted-foreground" />
                  </div>
                )}
                
                {/* Status Badge */}
                <div className="absolute top-2 right-2">
                  {getStatusBadge(product.status)}
                </div>
              </div>

              {/* Product Info */}
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <h3 className="font-medium text-foreground line-clamp-2 text-base">{product.name}</h3>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Prix:</span>
                    <span className="font-semibold text-foreground">{product.price.toLocaleString()} CDF</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Stock:</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium">{product.stock}</span>
                      {getStockBadge(product.stock)}
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">SKU:</span>
                    <span className="text-xs font-mono text-muted-foreground">{product.sku}</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center space-x-2 pt-3 border-t border-border">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => handleEdit(product)}
                    iconName="Edit"
                    className="flex-1 touch-target"
                  >
                    Modifier
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => handleDelete(product.id)}
                    iconName="Trash2"
                    className="text-destructive hover:text-destructive"
                  />
                </div>
              </div>
            </MobileCard>
          ))}
        </ResponsiveGrid>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <Package className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">Aucun produit trouvé</h3>
            <p className="text-muted-foreground mb-4">
              {searchTerm || selectedCategory || selectedStatus 
                ? 'Essayez de modifier vos filtres de recherche'
                : 'Commencez par ajouter votre premier produit'
              }
            </p>
            {!searchTerm && !selectedCategory && !selectedStatus && (
              <Button onClick={() => setShowAddModal(true)}>
                Ajouter un Produit
              </Button>
            )}
          </div>
        )}
      </div>

      {/* Add/Edit Product Modal */}
      <ResponsiveModal
        isOpen={showAddModal}
        onClose={handleCloseModal}
        title={editingProduct ? 'Modifier le Produit' : 'Ajouter un Produit'}
        size="mobile"
      >
        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Nom du Produit"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              error={formErrors.name}
              required
            />
            <Select
              label="Catégorie"
              value={formData.category}
              onChange={(value) => handleInputChange('category', value)}
              options={categories}
              error={formErrors.category}
              required
            />
            <Input
              label="Prix (CDF)"
              type="number"
              value={formData.price}
              onChange={(e) => handleInputChange('price', e.target.value)}
              error={formErrors.price}
              required
            />
            <Input
              label="Stock"
              type="number"
              value={formData.stock}
              onChange={(e) => handleInputChange('stock', e.target.value)}
              error={formErrors.stock}
              required
            />
          </div>

          <Input
            label="Description"
            value={formData.description}
            onChange={(e) => handleInputChange('description', e.target.value)}
            error={formErrors.description}
            required
            multiline
            rows={3}
          />

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">
              Images du Produit
            </label>
            <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                id="product-images"
              />
              <label htmlFor="product-images" className="cursor-pointer">
                <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">
                  Cliquez pour sélectionner des images
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  JPG, PNG (max 5MB par image)
                </p>
              </label>
            </div>
            
            {/* Image Preview */}
            {formData.images.length > 0 && (
              <div className="grid grid-cols-4 gap-2 mt-4">
                {formData.images.map((image, index) => (
                  <div key={index} className="relative aspect-square bg-muted/30 rounded-lg overflow-hidden">
                    <img 
                      src={image} 
                      alt={`Preview ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                    <button
                      onClick={() => removeImage(index)}
                      className="absolute top-1 right-1 w-6 h-6 bg-destructive text-destructive-foreground rounded-full flex items-center justify-center text-xs hover:bg-destructive/90"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="flex items-center justify-end space-x-3 pt-4 border-t border-border">
            <Button variant="outline" onClick={handleCloseModal}>
              Annuler
            </Button>
            <Button onClick={handleSubmit}>
              {editingProduct ? 'Mettre à Jour' : 'Ajouter le Produit'}
            </Button>
          </div>
        </div>
      </ResponsiveModal>

      {/* Floating Action Button */}
      <FloatingActionButton
        icon={Plus}
        label="Ajouter un produit"
        position="bottom-right"
        size="default"
        onClick={() => setShowAddModal(true)}
      />
    </div>
  );
};

export default ProductManagement;