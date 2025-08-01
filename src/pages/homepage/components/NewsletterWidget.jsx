import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const NewsletterWidget = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubscribe = async (e) => {
    e?.preventDefault();
    setError('');
    
    if (!email) {
      setError('Email harus diisi');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/?.test(email)) {
      setError('Format email tidak valid');
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setIsSubscribed(true);
      setEmail('');
    } catch (err) {
      setError('Terjadi kesalahan. Silakan coba lagi.');
    } finally {
      setIsLoading(false);
    }
  };

  const resetSubscription = () => {
    setIsSubscribed(false);
    setError('');
  };

  if (isSubscribed) {
    return (
      <div className="bg-card border border-border rounded-lg shadow-card p-6">
        <div className="text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="CheckCircle" size={32} className="text-green-600" />
          </div>
          <h3 className="font-heading font-bold text-lg text-text-primary mb-2">
            Berhasil Berlangganan!
          </h3>
          <p className="font-body text-sm text-text-secondary mb-4">
            Terima kasih telah berlangganan newsletter kami. Anda akan menerima berita terkini setiap hari.
          </p>
          <Button
            variant="outline"
            size="sm"
            onClick={resetSubscription}
            iconName="ArrowLeft"
            iconPosition="left"
          >
            Kembali
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground rounded-lg shadow-card p-6">
      {/* Header */}
      <div className="text-center mb-6">
        <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
          <Icon name="Mail" size={32} className="text-white" />
        </div>
        <h3 className="font-heading font-bold text-xl mb-2">
          Newsletter Harian
        </h3>
        <p className="font-body text-sm opacity-90">
          Dapatkan ringkasan berita terpenting langsung di email Anda setiap pagi
        </p>
      </div>
      {/* Benefits */}
      <div className="space-y-3 mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-6 h-6 bg-white bg-opacity-20 rounded-full flex items-center justify-center flex-shrink-0">
            <Icon name="Check" size={14} className="text-white" />
          </div>
          <span className="font-body text-sm">Berita breaking news terkini</span>
        </div>
        <div className="flex items-center space-x-3">
          <div className="w-6 h-6 bg-white bg-opacity-20 rounded-full flex items-center justify-center flex-shrink-0">
            <Icon name="Check" size={14} className="text-white" />
          </div>
          <span className="font-body text-sm">Analisis mendalam dari editor</span>
        </div>
        <div className="flex items-center space-x-3">
          <div className="w-6 h-6 bg-white bg-opacity-20 rounded-full flex items-center justify-center flex-shrink-0">
            <Icon name="Check" size={14} className="text-white" />
          </div>
          <span className="font-body text-sm">Tanpa spam, bisa unsubscribe kapan saja</span>
        </div>
      </div>
      {/* Subscription Form */}
      <form onSubmit={handleSubscribe} className="space-y-4">
        <div>
          <Input
            type="email"
            placeholder="Masukkan email Anda"
            value={email}
            onChange={(e) => setEmail(e?.target?.value)}
            error={error}
            className="bg-white text-text-primary placeholder-text-secondary"
          />
        </div>
        
        <Button
          type="submit"
          variant="secondary"
          fullWidth
          loading={isLoading}
          iconName="Send"
          iconPosition="right"
          className="bg-white text-primary hover:bg-gray-50"
        >
          {isLoading ? 'Mendaftar...' : 'Berlangganan Gratis'}
        </Button>
      </form>
      {/* Privacy Note */}
      <div className="mt-4 pt-4 border-t border-white border-opacity-20">
        <p className="text-xs opacity-80 text-center">
          Dengan berlangganan, Anda menyetujui{' '}
          <button className="underline hover:no-underline">
            Kebijakan Privasi
          </button>{' '}
          kami. Email Anda aman bersama kami.
        </p>
      </div>
      {/* Stats */}
      <div className="mt-6 grid grid-cols-2 gap-4 text-center">
        <div>
          <div className="font-heading font-bold text-2xl">50K+</div>
          <div className="font-caption text-xs opacity-80">Subscriber</div>
        </div>
        <div>
          <div className="font-heading font-bold text-2xl">4.8★</div>
          <div className="font-caption text-xs opacity-80">Rating</div>
        </div>
      </div>
    </div>
  );
};

export default NewsletterWidget;