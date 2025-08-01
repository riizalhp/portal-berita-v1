import React from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';

const ArticleHeader = ({ article }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date?.toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const calculateReadingTime = (content) => {
    const wordsPerMinute = 200;
    const words = content?.split(' ')?.length;
    return Math.ceil(words / wordsPerMinute);
  };

  return (
    <div className="mb-8">
      {/* Hero Image */}
      <div className="relative w-full h-64 md:h-96 lg:h-[500px] mb-6 overflow-hidden rounded-lg">
        <Image
          src={article?.image}
          alt={article?.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
      </div>
      {/* Article Title */}
      <h1 className="font-heading font-bold text-2xl md:text-3xl lg:text-4xl text-text-primary mb-4 leading-tight">
        {article?.title}
      </h1>
      {/* Article Subtitle */}
      {article?.subtitle && (
        <p className="font-body text-lg md:text-xl text-text-secondary mb-6 leading-relaxed">
          {article?.subtitle}
        </p>
      )}
      {/* Author and Meta Information */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-border">
        <div className="flex items-center space-x-4">
          {/* Author Avatar */}
          <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
            <Image
              src={article?.author?.avatar}
              alt={article?.author?.name}
              className="w-full h-full object-cover"
            />
          </div>
          
          {/* Author Info */}
          <div>
            <div className="font-body font-semibold text-text-primary">
              {article?.author?.name}
            </div>
            <div className="font-caption text-sm text-text-secondary">
              {article?.author?.role}
            </div>
          </div>
        </div>

        {/* Meta Information */}
        <div className="flex items-center space-x-6 text-sm font-caption text-text-secondary">
          <div className="flex items-center space-x-1">
            <Icon name="Calendar" size={16} />
            <span>{formatDate(article?.publishedAt)}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Icon name="Clock" size={16} />
            <span>{calculateReadingTime(article?.content)} menit baca</span>
          </div>
          <div className="flex items-center space-x-1">
            <Icon name="Eye" size={16} />
            <span>{article?.views?.toLocaleString('id-ID')} views</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleHeader;