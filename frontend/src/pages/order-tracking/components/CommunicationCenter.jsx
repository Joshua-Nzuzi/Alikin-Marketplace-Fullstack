import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const CommunicationCenter = ({ 
  order, 
  onSendMessage, 
  onCallVendor, 
  onCallDriver 
}) => {
  const [activeChat, setActiveChat] = useState('vendor');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);

  // Mock messages data
  const mockMessages = {
    vendor: [
      {
        id: 1,
        sender: 'vendor',
        senderName: order?.vendor?.name,
        content: `Bonjour ! Votre commande #${order?.orderNumber} est en cours de préparation. Elle sera prête dans 30 minutes.`,
        timestamp: new Date(Date.now() - 1800000),
        avatar: order?.vendor?.avatar
      },
      {
        id: 2,
        sender: 'customer',
        senderName: 'Vous',
        content: 'Parfait, merci pour la mise à jour !',
        timestamp: new Date(Date.now() - 1500000),
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face'
      }
    ],
    driver: order?.driver ? [
      {
        id: 1,
        sender: 'driver',
        senderName: order?.driver?.name,
        content: `Je suis en route pour récupérer votre commande. J'arrive dans 10 minutes à votre adresse.`,timestamp: new Date(Date.now() - 600000),avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face'
      }
    ] : []
  };

  useEffect(() => {
    setMessages(mockMessages?.[activeChat] || []);
  }, [activeChat]);

  useEffect(() => {
    messagesEndRef?.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = () => {
    if (message?.trim()) {
      const newMessage = {
        id: Date.now(),
        sender: 'customer',
        senderName: 'Vous',
        content: message,
        timestamp: new Date(),
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face'
      };
      
      setMessages(prev => [...prev, newMessage]);
      onSendMessage(activeChat, message);
      setMessage('');
    }
  };

  const handleKeyPress = (e) => {
    if (e?.key === 'Enter' && !e?.shiftKey) {
      e?.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (date) => {
    return date?.toLocaleTimeString('fr-FR', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const quickMessages = [
    "Où en est ma commande ?",
    "Pouvez-vous me donner une estimation ?",
    "Y a-t-il un problème ?",
    "Merci pour votre service !"
  ];

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      {/* Chat Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-foreground">Communication</h3>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onCallVendor(order?.vendor)}
              iconName="Phone"
              iconPosition="left"
            >
              Vendeur
            </Button>
            {order?.driver && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => onCallDriver(order?.driver)}
                iconName="Phone"
                iconPosition="left"
              >
                Livreur
              </Button>
            )}
          </div>
        </div>

        {/* Chat Tabs */}
        <div className="flex space-x-1 bg-muted rounded-lg p-1">
          <button
            onClick={() => setActiveChat('vendor')}
            className={`flex-1 flex items-center justify-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-smooth ${
              activeChat === 'vendor'
                ? 'bg-card text-foreground shadow-warm-sm' :'text-muted-foreground hover:text-foreground'
            }`}
          >
            <Icon name="Store" size={16} />
            <span>Vendeur</span>
          </button>
          {order?.driver && (
            <button
              onClick={() => setActiveChat('driver')}
              className={`flex-1 flex items-center justify-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-smooth ${
                activeChat === 'driver' ?'bg-card text-foreground shadow-warm-sm' :'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Icon name="Truck" size={16} />
              <span>Livreur</span>
            </button>
          )}
        </div>
      </div>
      {/* Messages Area */}
      <div className="h-64 overflow-y-auto p-4 space-y-4">
        {messages?.length === 0 ? (
          <div className="text-center py-8">
            <Icon name="MessageCircle" size={48} className="text-muted-foreground mx-auto mb-3" />
            <p className="text-muted-foreground">
              Aucun message avec {activeChat === 'vendor' ? 'le vendeur' : 'le livreur'}
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              Commencez une conversation ci-dessous
            </p>
          </div>
        ) : (
          messages?.map((msg) => (
            <div
              key={msg?.id}
              className={`flex items-start space-x-3 ${
                msg?.sender === 'customer' ? 'flex-row-reverse space-x-reverse' : ''
              }`}
            >
              <Image
                src={msg?.avatar}
                alt={msg?.senderName}
                className="w-8 h-8 rounded-full"
              />
              <div className={`flex-1 max-w-xs ${
                msg?.sender === 'customer' ? 'text-right' : ''
              }`}>
                <div className={`p-3 rounded-lg ${
                  msg?.sender === 'customer' ?'bg-primary text-primary-foreground' :'bg-muted text-foreground'
                }`}>
                  <p className="text-sm">{msg?.content}</p>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  {msg?.senderName} • {formatTime(msg?.timestamp)}
                </p>
              </div>
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>
      {/* Quick Messages */}
      <div className="px-4 py-2 border-t border-border">
        <div className="flex flex-wrap gap-2">
          {quickMessages?.map((quickMsg, index) => (
            <button
              key={index}
              onClick={() => setMessage(quickMsg)}
              className="text-xs px-3 py-1 bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground rounded-full transition-smooth"
            >
              {quickMsg}
            </button>
          ))}
        </div>
      </div>
      {/* Message Input */}
      <div className="p-4 border-t border-border">
        <div className="flex items-end space-x-2">
          <div className="flex-1">
            <Input
              type="text"
              placeholder="Tapez votre message..."
              value={message}
              onChange={(e) => setMessage(e?.target?.value)}
              onKeyPress={handleKeyPress}
              className="resize-none"
            />
          </div>
          <Button
            onClick={handleSendMessage}
            disabled={!message?.trim()}
            iconName="Send"
            size="icon"
          />
        </div>
      </div>
    </div>
  );
};

export default CommunicationCenter;