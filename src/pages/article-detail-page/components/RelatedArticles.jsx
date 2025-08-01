import React from 'react';
import { Link } from 'react-router-dom';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';

const RelatedArticles = ({ articles = [] }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date?.toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  if (!articles || articles?.length === 0) return null;

  return (
    <div className="mt-12">
      <div className="flex items-center space-x-2 mb-6">
        <Icon name="BookOpen" size={20} className="text-primary" />
        <h2 className="font-heading font-bold text-xl md:text-2xl text-text-primary">
          Artikel Terkait
        </h2>
      </div>
      {/* Mobile: Horizontal Scroll */}
      <div className="md:hidden">
        <div className="flex space-x-4 overflow-x-auto pb-4 scrollbar-hide">
          {articles?.map((article) => (
            <Link
              key={article?.id}
              to={`/article-detail-page?id=${article?.id}&category=${article?.category}&title=${encodeURIComponent(article?.title)}`}
              className="flex-shrink-0 w-72 bg-card border border-border rounded-lg overflow-hidden hover:shadow-elevated transition-shadow duration-200"
            >
              <div className="aspect-video">
                <Image
                  src={article?.image}
                  alt={article?.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <span className="inline-block px-2 py-1 text-xs font-caption bg-primary/10 text-primary rounded">
                    {article?.category}
                  </span>
                  <span className="text-xs font-caption text-text-secondary">
                    {formatDate(article?.publishedAt)}
                  </span>
                </div>
                <h3 className="font-body font-semibold text-sm text-text-primary line-clamp-2 mb-2">
                  {article?.title}
                </h3>
                <p className="font-caption text-xs text-text-secondary line-clamp-2">
                  {article?.excerpt}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
      {/* Desktop: Grid */}
      <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles?.map((article) => (
          <Link
            key={article?.id}
            to={`/article-detail-page?id=${article?.id}&category=${article?.category}&title=${encodeURIComponent(article?.title)}`}
            className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-elevated transition-shadow duration-200"
          >
            <div className="aspect-video">
              <Image
                src={article?.image}
                alt={article?.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="inline-block px-2 py-1 text-xs font-caption bg-primary/10 text-primary rounded">
                  {article?.category}
                </span>
                <span className="text-xs font-caption text-text-secondary">
                  {formatDate(article?.publishedAt)}
                </span>
              </div>
              <h3 className="font-body font-semibold text-base text-text-primary line-clamp-2 mb-2">
                {article?.title}
              </h3>
              <p className="font-caption text-sm text-text-secondary line-clamp-2">
                {article?.excerpt}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RelatedArticles;