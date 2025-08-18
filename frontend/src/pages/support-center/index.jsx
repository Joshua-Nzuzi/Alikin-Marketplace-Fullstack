import React, { useState, useEffect } from 'react';
import { 
  MessageCircle, 
  HelpCircle, 
  FileText, 
  Search, 
  Plus, 
  Send, 
  Clock, 
  User,
  AlertTriangle,
  CheckCircle,
  X,
  Phone,
  Mail,
  MapPin,
  Star,
  Filter,
  Edit,
  Trash2,
  BookOpen,
  MessageSquare,
  Headphones,
  Zap
} from 'lucide-react';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Select from '../../components/ui/Select';

const SupportCenter = () => {
  const [tickets, setTickets] = useState([
    {
      id: 1,
      ticketNumber: 'TKT-2024-001',
      subject: 'Problème de paiement Mobile Money',
      description: 'Je n\'arrive pas à finaliser mon paiement avec Orange Money',
      customerName: 'Jean Mukendi',
      customerEmail: 'jean.mukendi@email.com',
      customerPhone: '+243 812345678',
      priority: 'high',
      status: 'open',
      category: 'payment',
      assignedTo: 'Support Team',
      createdAt: '2024-01-15T10:00:00Z',
      updatedAt: '2024-01-15T10:00:00Z',
      messages: [
        {
          id: 1,
          sender: 'customer',
          message: 'Bonjour, j\'ai un problème avec le paiement Orange Money',
          timestamp: '2024-01-15T10:00:00Z'
        },
        {
          id: 2,
          sender: 'support',
          message: 'Bonjour Jean, pouvez-vous me donner plus de détails sur l\'erreur ?',
          timestamp: '2024-01-15T10:05:00Z'
        }
      ]
    },
    {
      id: 2,
      ticketNumber: 'TKT-2024-002',
      subject: 'Livraison en retard',
      description: 'Ma commande était prévue hier mais n\'est toujours pas arrivée',
      customerName: 'Marie Tshibola',
      customerEmail: 'marie.tshibola@email.com',
      customerPhone: '+243 823456789',
      priority: 'medium',
      status: 'in_progress',
      category: 'delivery',
      assignedTo: 'Logistics Team',
      createdAt: '2024-01-14T15:00:00Z',
      updatedAt: '2024-01-15T09:00:00Z',
      messages: [
        {
          id: 1,
          sender: 'customer',
          message: 'Ma livraison est en retard, pouvez-vous vérifier ?',
          timestamp: '2024-01-14T15:00:00Z'
        },
        {
          id: 2,
          sender: 'support',
          message: 'Je vérifie avec l\'équipe logistique',
          timestamp: '2024-01-15T09:00:00Z'
        }
      ]
    },
    {
      id: 3,
      ticketNumber: 'TKT-2024-003',
      subject: 'Question sur les frais de livraison',
      description: 'Comment sont calculés les frais de livraison ?',
      customerName: 'Paul Mwamba',
      customerEmail: 'paul.mwamba@email.com',
      customerPhone: '+243 834567890',
      priority: 'low',
      status: 'resolved',
      category: 'general',
      assignedTo: 'Support Team',
      createdAt: '2024-01-13T11:00:00Z',
      updatedAt: '2024-01-14T16:00:00Z',
      messages: [
        {
          id: 1,
          sender: 'customer',
          message: 'Bonjour, comment sont calculés les frais de livraison ?',
          timestamp: '2024-01-13T11:00:00Z'
        },
        {
          id: 2,
          sender: 'support',
          message: 'Les frais dépendent de la distance et du poids. Voici le détail...',
          timestamp: '2024-01-14T16:00:00Z'
        }
      ]
    }
  ]);

  const [faqs, setFaqs] = useState([
    {
      id: 1,
      question: 'Comment fonctionne le paiement Mobile Money ?',
      answer: 'Nous acceptons Orange Money, MTN Mobile Money et Moov Money. Le paiement est sécurisé et instantané.',
      category: 'payment',
      views: 1250,
      helpful: 89
    },
    {
      id: 2,
      question: 'Quels sont les délais de livraison ?',
      answer: 'Les livraisons sont effectuées sous 24-48h dans les grandes villes et 3-5 jours en zone rurale.',
      category: 'delivery',
      views: 980,
      helpful: 67
    },
    {
      id: 3,
      question: 'Comment annuler une commande ?',
      answer: 'Vous pouvez annuler votre commande dans les 2h suivant la commande via votre compte ou en nous contactant.',
      category: 'orders',
      views: 756,
      helpful: 45
    },
    {
      id: 4,
      question: 'Que faire en cas de produit défectueux ?',
      answer: 'Contactez-nous sous 48h avec photos. Nous organisons le remplacement ou le remboursement.',
      category: 'returns',
      views: 432,
      helpful: 34
    }
  ]);

  const [showNewTicketModal, setShowNewTicketModal] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [selectedPriority, setSelectedPriority] = useState('');

  const categories = [
    { value: 'payment', label: 'Paiement' },
    { value: 'delivery', label: 'Livraison' },
    { value: 'orders', label: 'Commandes' },
    { value: 'returns', label: 'Retours & Remboursements' },
    { value: 'technical', label: 'Problèmes Techniques' },
    { value: 'general', label: 'Questions Générales' }
  ];

  const priorities = [
    { value: 'low', label: 'Faible', color: 'success' },
    { value: 'medium', label: 'Moyenne', color: 'warning' },
    { value: 'high', label: 'Élevée', color: 'destructive' }
  ];

  const statuses = [
    { value: 'open', label: 'Ouvert', color: 'warning' },
    { value: 'in_progress', label: 'En Cours', color: 'primary' },
    { value: 'waiting_customer', label: 'En Attente Client', color: 'accent' },
    { value: 'resolved', label: 'Résolu', color: 'success' },
    { value: 'closed', label: 'Fermé', color: 'muted' }
  ];

  const [formData, setFormData] = useState({
    subject: '',
    description: '',
    category: '',
    priority: 'medium'
  });

  const [formErrors, setFormErrors] = useState({});
  const [newMessage, setNewMessage] = useState('');

  // Filter tickets based on search and filters
  const filteredTickets = tickets.filter(ticket => {
    const matchesSearch = ticket.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ticket.ticketNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ticket.customerName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || ticket.category === selectedCategory;
    const matchesStatus = !selectedStatus || ticket.status === selectedStatus;
    const matchesPriority = !selectedPriority || ticket.priority === selectedPriority;
    
    return matchesSearch && matchesCategory && matchesStatus && matchesPriority;
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (formErrors[field]) {
      setFormErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.subject.trim()) errors.subject = 'Le sujet est requis';
    if (!formData.description.trim()) errors.description = 'La description est requise';
    if (!formData.category) errors.category = 'La catégorie est requise';
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmitTicket = () => {
    if (!validateForm()) return;

    const ticketData = {
      ...formData,
      id: Date.now(),
      ticketNumber: `TKT-2024-${String(Date.now()).slice(-6)}`,
      customerName: 'Utilisateur Actuel',
      customerEmail: 'user@alikin.com',
      customerPhone: '+243 800000000',
      status: 'open',
      assignedTo: 'Support Team',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      messages: [
        {
          id: 1,
          sender: 'customer',
          message: formData.description,
          timestamp: new Date().toISOString()
        }
      ]
    };

    setTickets(prev => [ticketData, ...prev]);
    handleCloseModal();
  };

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedTicket) return;

    const messageData = {
      id: Date.now(),
      sender: 'customer',
      message: newMessage.trim(),
      timestamp: new Date().toISOString()
    };

    setTickets(prev => prev.map(ticket => 
      ticket.id === selectedTicket.id 
        ? { 
            ...ticket, 
            messages: [...ticket.messages, messageData],
            updatedAt: new Date().toISOString()
          }
        : ticket
    ));

    setNewMessage('');
  };

  const handleCloseModal = () => {
    setShowNewTicketModal(false);
    setFormData({
      subject: '',
      description: '',
      category: '',
      priority: 'medium'
    });
    setFormErrors({});
  };

  const getPriorityBadge = (priority) => {
    const priorityConfig = priorities.find(p => p.value === priority);
    if (!priorityConfig) return null;

    const colorMap = {
      success: 'bg-success/10 text-success',
      warning: 'bg-warning/10 text-warning',
      destructive: 'bg-destructive/10 text-destructive'
    };

    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${colorMap[priorityConfig.color]}`}>
        {priorityConfig.label}
      </span>
    );
  };

  const getStatusBadge = (status) => {
    const statusConfig = statuses.find(s => s.value === status);
    if (!statusConfig) return null;

    const colorMap = {
      warning: 'bg-warning/10 text-warning',
      primary: 'bg-primary/10 text-primary',
      accent: 'bg-accent/10 text-accent',
      success: 'bg-success/10 text-success',
      muted: 'bg-muted/10 text-muted-foreground'
    };

    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${colorMap[statusConfig.color]}`}>
        {statusConfig.label}
      </span>
    );
  };

  const calculateStats = () => {
    const totalTickets = tickets.length;
    const openTickets = tickets.filter(t => t.status === 'open').length;
    const resolvedTickets = tickets.filter(t => t.status === 'resolved').length;
    const averageResponseTime = '2h 15min'; // Mock data

    return {
      totalTickets,
      openTickets,
      resolvedTickets,
      averageResponseTime
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
              <h1 className="text-2xl font-bold text-foreground">Centre de Support</h1>
              <p className="text-muted-foreground">Assistance client et résolution de problèmes</p>
            </div>
            <Button 
              variant="default" 
              onClick={() => setShowNewTicketModal(true)}
              iconName="Plus"
            >
              Nouveau Ticket
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
                <p className="text-sm font-medium text-muted-foreground">Total Tickets</p>
                <p className="text-2xl font-bold text-foreground">{stats.totalTickets}</p>
              </div>
              <div className="p-3 rounded-full bg-primary/10">
                <MessageCircle className="w-6 h-6 text-primary" />
              </div>
            </div>
          </div>

          <div className="bg-card rounded-lg border border-border p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Tickets Ouverts</p>
                <p className="text-2xl font-bold text-foreground">{stats.openTickets}</p>
              </div>
              <div className="p-3 rounded-full bg-warning/10">
                <AlertTriangle className="w-6 h-6 text-warning" />
              </div>
            </div>
          </div>

          <div className="bg-card rounded-lg border border-border p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Résolus</p>
                <p className="text-2xl font-bold text-foreground">{stats.resolvedTickets}</p>
              </div>
              <div className="p-3 rounded-full bg-success/10">
                <CheckCircle className="w-6 h-6 text-success" />
              </div>
            </div>
          </div>

          <div className="bg-card rounded-lg border border-border p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Temps de Réponse</p>
                <p className="text-2xl font-bold text-foreground">{stats.averageResponseTime}</p>
              </div>
              <div className="p-3 rounded-full bg-accent/10">
                <Clock className="w-6 h-6 text-accent" />
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-card rounded-lg border border-border p-6 mb-6">
          <h2 className="text-lg font-semibold text-foreground mb-4">Comment pouvons-nous vous aider ?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button 
              variant="outline" 
              className="h-20 flex-col space-y-2"
              iconName="MessageCircle"
            >
              <span className="font-medium">Nouveau Ticket</span>
              <span className="text-sm text-muted-foreground">Créer une demande</span>
            </Button>
            <Button 
              variant="outline" 
              className="h-20 flex-col space-y-2"
              iconName="BookOpen"
            >
              <span className="font-medium">Base de Connaissances</span>
              <span className="text-sm text-muted-foreground">FAQ et guides</span>
            </Button>
            <Button 
              variant="outline" 
              className="h-20 flex-col space-y-2"
              iconName="Headphones"
            >
              <span className="font-medium">Support en Direct</span>
              <span className="text-sm text-muted-foreground">Chat en temps réel</span>
            </Button>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-card rounded-lg border border-border p-4 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <Input
              placeholder="Rechercher tickets..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              iconName="Search"
            />
            <Select
              placeholder="Toutes catégories"
              value={selectedCategory}
              onChange={setSelectedCategory}
              options={categories}
              clearable
            />
            <Select
              placeholder="Tous statuts"
              value={selectedStatus}
              onChange={setSelectedStatus}
              options={statuses}
              clearable
            />
            <Select
              placeholder="Toutes priorités"
              value={selectedPriority}
              onChange={setSelectedPriority}
              options={priorities}
              clearable
            />
            <Button 
              variant="outline" 
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('');
                setSelectedStatus('');
                setSelectedPriority('');
              }}
              iconName="X"
            >
              Réinitialiser
            </Button>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Tickets List */}
          <div className="lg:col-span-2">
            <div className="bg-card rounded-lg border border-border p-6">
              <h2 className="text-lg font-semibold text-foreground mb-4">Mes Tickets de Support</h2>
              <div className="space-y-4">
                {filteredTickets.map((ticket) => (
                  <div 
                    key={ticket.id} 
                    className={`border border-border rounded-lg p-4 cursor-pointer hover:shadow-warm transition-shadow ${
                      selectedTicket?.id === ticket.id ? 'ring-2 ring-primary' : ''
                    }`}
                    onClick={() => setSelectedTicket(ticket)}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-medium text-foreground">{ticket.subject}</h3>
                        <p className="text-sm text-muted-foreground">{ticket.ticketNumber}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        {getPriorityBadge(ticket.priority)}
                        {getStatusBadge(ticket.status)}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3 text-sm">
                      <div className="flex items-center space-x-2">
                        <User className="w-4 h-4 text-muted-foreground" />
                        <span className="text-muted-foreground">{ticket.customerName}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4 text-muted-foreground" />
                        <span className="text-muted-foreground">
                          {new Date(ticket.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <MessageSquare className="w-4 h-4 text-muted-foreground" />
                        <span className="text-muted-foreground">{ticket.messages.length} messages</span>
                      </div>
                    </div>

                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {ticket.description}
                    </p>
                  </div>
                ))}
              </div>

              {filteredTickets.length === 0 && (
                <div className="text-center py-12">
                  <MessageCircle className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-foreground mb-2">Aucun ticket trouvé</h3>
                  <p className="text-muted-foreground mb-4">
                    {searchTerm || selectedCategory || selectedStatus || selectedPriority
                      ? 'Essayez de modifier vos filtres de recherche'
                      : 'Vous n\'avez pas encore créé de ticket de support'
                    }
                  </p>
                  {!searchTerm && !selectedCategory && !selectedStatus && !selectedPriority && (
                    <Button onClick={() => setShowNewTicketModal(true)}>
                      Créer un Ticket
                    </Button>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Ticket Details / FAQ */}
          <div className="lg:col-span-1">
            {selectedTicket ? (
              <div className="bg-card rounded-lg border border-border p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-foreground">Détails du Ticket</h3>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => setSelectedTicket(null)}
                    iconName="X"
                  />
                </div>

                <div className="space-y-4 mb-6">
                  <div>
                    <h4 className="font-medium text-foreground">{selectedTicket.subject}</h4>
                    <p className="text-sm text-muted-foreground">{selectedTicket.ticketNumber}</p>
                  </div>

                  <div className="flex items-center space-x-2">
                    {getPriorityBadge(selectedTicket.priority)}
                    {getStatusBadge(selectedTicket.status)}
                  </div>

                  <div className="text-sm space-y-2">
                    <p><span className="text-muted-foreground">Client:</span> {selectedTicket.customerName}</p>
                    <p><span className="text-muted-foreground">Catégorie:</span> {categories.find(c => c.value === selectedTicket.category)?.label}</p>
                    <p><span className="text-muted-foreground">Assigné à:</span> {selectedTicket.assignedTo}</p>
                    <p><span className="text-muted-foreground">Créé le:</span> {new Date(selectedTicket.createdAt).toLocaleDateString()}</p>
                  </div>
                </div>

                {/* Messages */}
                <div className="space-y-3 mb-4">
                  <h4 className="font-medium text-foreground">Conversation</h4>
                  <div className="max-h-64 overflow-y-auto space-y-3">
                    {selectedTicket.messages.map((message) => (
                      <div 
                        key={message.id} 
                        className={`p-3 rounded-lg ${
                          message.sender === 'customer' 
                            ? 'bg-primary/10 ml-4' 
                            : 'bg-muted/10 mr-4'
                        }`}
                      >
                        <p className="text-sm text-foreground">{message.message}</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {new Date(message.timestamp).toLocaleTimeString()}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Reply */}
                <div className="space-y-3">
                  <Input
                    placeholder="Tapez votre message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    multiline
                    rows={3}
                  />
                  <Button 
                    onClick={handleSendMessage}
                    disabled={!newMessage.trim()}
                    iconName="Send"
                    className="w-full"
                  >
                    Envoyer
                  </Button>
                </div>
              </div>
            ) : (
              <div className="bg-card rounded-lg border border-border p-6">
                <h3 className="text-lg font-semibold text-foreground mb-4">Questions Fréquentes</h3>
                <div className="space-y-4">
                  {faqs.map((faq) => (
                    <div key={faq.id} className="border border-border rounded-lg p-4">
                      <h4 className="font-medium text-foreground mb-2">{faq.question}</h4>
                      <p className="text-sm text-muted-foreground mb-3">{faq.answer}</p>
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>{faq.views} vues</span>
                        <span>{faq.helpful} personnes ont trouvé cela utile</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* New Ticket Modal */}
      {showNewTicketModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-background rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-border">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-foreground">Nouveau Ticket de Support</h2>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={handleCloseModal}
                  iconName="X"
                />
              </div>
            </div>

            <div className="p-6 space-y-6">
              <Input
                label="Sujet"
                value={formData.subject}
                onChange={(e) => handleInputChange('subject', e.target.value)}
                error={formErrors.subject}
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

              <Select
                label="Priorité"
                value={formData.priority}
                onChange={(value) => handleInputChange('priority', value)}
                options={priorities}
              />

              <Input
                label="Description du problème"
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                error={formErrors.description}
                required
                multiline
                rows={4}
                description="Décrivez votre problème en détail pour une résolution plus rapide"
              />

              <div className="flex items-center justify-end space-x-3 pt-4 border-t border-border">
                <Button variant="outline" onClick={handleCloseModal}>
                  Annuler
                </Button>
                <Button onClick={handleSubmitTicket}>
                  Créer le Ticket
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SupportCenter;
