import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SocialShareButtons = ({ article, variant = 'floating' }) => {
  const [copied, setCopied] = useState(false);

  const shareUrl = window.location?.href;
  const shareText = `${article?.title} - Portal Berita Indonesia`;

  const shareLinks = {
    whatsapp: `https://wa.me/?text=${encodeURIComponent(shareText + ' ' + shareUrl)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`,
    telegram: `https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`
  };

  const handleShare = (platform) => {
    window.open(shareLinks?.[platform], '_blank', 'width=600,height=400');
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard?.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy link:', err);
    }
  };

  if (variant === 'floating') {
    return (
      <div className="fixed right-4 top-1/2 -translate-y-1/2 z-30 hidden lg:flex flex-col space-y-2">
        <div className="bg-surface border border-border rounded-lg p-2 shadow-elevated">
          <div className="flex flex-col space-y-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => handleShare('whatsapp')}
              className="text-green-600 hover:bg-green-50"
              title="Bagikan ke WhatsApp"
            >
              <Icon name="MessageCircle" size={20} />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => handleShare('facebook')}
              className="text-blue-600 hover:bg-blue-50"
              title="Bagikan ke Facebook"
            >
              <Icon name="Facebook" size={20} />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => handleShare('twitter')}
              className="text-sky-500 hover:bg-sky-50"
              title="Bagikan ke Twitter"
            >
              <Icon name="Twitter" size={20} />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => handleShare('telegram')}
              className="text-blue-500 hover:bg-blue-50"
              title="Bagikan ke Telegram"
            >
              <Icon name="Send" size={20} />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleCopyLink}
              className={`${copied ? 'text-success' : 'text-text-secondary'} hover:bg-muted`}
              title="Salin Link"
            >
              <Icon name={copied ? "Check" : "Link"} size={20} />
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center space-x-2 py-4">
      <span className="font-body font-medium text-text-secondary mr-2">Bagikan:</span>
      <Button
        variant="outline"
        size="sm"
        onClick={() => handleShare('whatsapp')}
        iconName="MessageCircle"
        iconPosition="left"
        className="text-green-600 border-green-200 hover:bg-green-50"
      >
        WhatsApp
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={() => handleShare('facebook')}
        iconName="Facebook"
        iconPosition="left"
        className="text-blue-600 border-blue-200 hover:bg-blue-50"
      >
        Facebook
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={() => handleShare('twitter')}
        iconName="Twitter"
        iconPosition="left"
        className="text-sky-500 border-sky-200 hover:bg-sky-50"
      >
        Twitter
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={handleCopyLink}
        iconName={copied ? "Check" : "Link"}
        iconPosition="left"
        className={`${copied ? 'text-success border-success/20 bg-success/10' : 'text-text-secondary border-border hover:bg-muted'}`}
      >
        {copied ? 'Tersalin' : 'Salin'}
      </Button>
    </div>
  );
};

export default SocialShareButtons;