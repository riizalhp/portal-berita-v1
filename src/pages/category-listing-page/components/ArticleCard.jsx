import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ArticleCard = ({ article }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Baru saja';
    if (diffInHours < 24) return `${diffInHours} jam lalu`;
    if (diffInHours < 48) return 'Kemarin';
    return date?.toLocaleDateString('id-ID', { 
      day: 'numeric', 
      month: 'short', 
      year: 'numeric' 
    });
  };

  const shareArticle = (platform) => {
    const url = encodeURIComponent(window.location?.origin + `/article-detail-page?id=${article?.id}&category=${article?.category}&title=${encodeURIComponent(article?.title)}`);
    const text = encodeURIComponent(article?.title);
    
    const shareUrls = {
      whatsapp: `https://wa.me/?text=${text} ${url}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
      twitter: `https://twitter.com/intent/tweet?text=${text}&url=${url}`,
      telegram: `https://t.me/share/url?url=${url}&text=${text}`
    };
    
    window.open(shareUrls?.[platform], '_blank', 'width=600,height=400');
  };

  return (
    <article className="bg-surface border border-border rounded-lg overflow-hidden shadow-card hover:shadow-elevated transition-all duration-300 group">
      <div className="relative overflow-hidden">
        <Link 
          to={`/article-detail-page?id=${article?.id}&category=${article?.category}&title=${encodeURIComponent(article?.title)}`}
          className="block"
        >
          <div className="aspect-video overflow-hidden">
            <Image
              src={article?.image}
              alt={article?.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        </Link>
        
        {article?.isBreaking && (
          <div className="absolute top-3 left-3">
            <span className="bg-error text-error-foreground px-2 py-1 rounded text-xs font-bold animate-pulse">
              BREAKING
            </span>
          </div>
        )}
        
        {article?.tags && article?.tags?.length > 0 && (
          <div className="absolute top-3 right-3">
            <span className="bg-black bg-opacity-70 text-white px-2 py-1 rounded text-xs font-body">
              {article?.tags?.[0]}
            </span>
          </div>
        )}
      </div>
      <div className="p-4">
        <div className="flex items-center space-x-2 mb-2">
          <span className="text-xs font-caption text-primary bg-primary bg-opacity-10 px-2 py-1 rounded">
            {article?.category?.toUpperCase()}
          </span>
          <div className="flex items-center space-x-1 text-xs text-text-secondary">
            <Icon name="Clock" size={12} />
            <span>{article?.readingTime} menit baca</span>
          </div>
        </div>

        <Link 
          to={`/article-detail-page?id=${article?.id}&category=${article?.category}&title=${encodeURIComponent(article?.title)}`}
          className="block group-hover:text-primary transition-colors duration-200"
        >
          <h3 className="font-heading font-semibold text-lg text-text-primary mb-2 line-clamp-2 leading-tight">
            {article?.title}
          </h3>
        </Link>

        <p className="text-text-secondary text-sm font-body mb-3 line-clamp-2 leading-relaxed">
          {article?.excerpt}
        </p>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 bg-accent rounded-full flex items-center justify-center">
              <Icon name="User" size={12} color="white" />
            </div>
            <div className="text-xs">
              <div className="font-body font-medium text-text-primary">{article?.author}</div>
              <div className="text-text-secondary">{formatDate(article?.publishedAt)}</div>
            </div>
          </div>

          <div className="flex items-center space-x-1">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => shareArticle('whatsapp')}
              className="w-8 h-8 text-text-secondary hover:text-green-600"
            >
              <Icon name="MessageCircle" size={14} />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => shareArticle('facebook')}
              className="w-8 h-8 text-text-secondary hover:text-blue-600"
            >
              <Icon name="Share2" size={14} />
            </Button>
          </div>
        </div>

        <div className="flex items-center justify-between mt-3 pt-3 border-t border-border">
          <div className="flex items-center space-x-3 text-xs text-text-secondary">
            <div className="flex items-center space-x-1">
              <Icon name="Eye" size={12} />
              <span>{article?.views?.toLocaleString('id-ID') || '0'}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Icon name="Heart" size={12} />
              <span>{article?.likes?.toLocaleString('id-ID') || '0'}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Icon name="MessageSquare" size={12} />
              <span>{article?.comments?.toLocaleString('id-ID') || '0'}</span>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

export default ArticleCard;