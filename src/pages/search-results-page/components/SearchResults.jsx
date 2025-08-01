import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const SearchResults = ({ results, query, isLoading, sortBy, onSortChange }) => {
  const sortOptions = [
    { value: 'relevance', label: 'Relevansi', icon: 'Target' },
    { value: 'date', label: 'Terbaru', icon: 'Calendar' },
    { value: 'popularity', label: 'Populer', icon: 'TrendingUp' }
  ];

  const highlightSearchTerm = (text, searchTerm) => {
    if (!searchTerm || !text) return text;
    
    const regex = new RegExp(`(${searchTerm})`, 'gi');
    const parts = text?.split(regex);
    
    return parts?.map((part, index) => 
      regex?.test(part) ? (
        <mark key={index} className="bg-warning/30 text-warning-foreground px-1 rounded">
          {part}
        </mark>
      ) : part
    );
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return 'Kemarin';
    if (diffDays < 7) return `${diffDays} hari lalu`;
    
    return date?.toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const getCategoryColor = (category) => {
    const colors = {
      'politik': 'bg-red-100 text-red-700',
      'ekonomi': 'bg-green-100 text-green-700',
      'teknologi': 'bg-blue-100 text-blue-700',
      'olahraga': 'bg-orange-100 text-orange-700',
      'hiburan': 'bg-purple-100 text-purple-700'
    };
    return colors?.[category] || 'bg-gray-100 text-gray-700';
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        {/* Sort Controls Skeleton */}
        <div className="flex items-center justify-between">
          <div className="h-4 bg-muted rounded w-32 animate-pulse"></div>
          <div className="h-10 bg-muted rounded w-40 animate-pulse"></div>
        </div>
        {/* Results Skeleton */}
        {[...Array(5)]?.map((_, index) => (
          <div key={index} className="bg-surface border border-border rounded-lg p-4 animate-pulse">
            <div className="flex space-x-4">
              <div className="w-24 h-24 bg-muted rounded-lg flex-shrink-0"></div>
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-muted rounded w-3/4"></div>
                <div className="h-3 bg-muted rounded w-full"></div>
                <div className="h-3 bg-muted rounded w-2/3"></div>
                <div className="flex space-x-2">
                  <div className="h-3 bg-muted rounded w-16"></div>
                  <div className="h-3 bg-muted rounded w-20"></div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Sort Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        <div className="text-sm text-text-secondary">
          Menampilkan {results?.length} hasil untuk "{query}"
        </div>
        
        <div className="flex items-center space-x-2">
          <span className="text-sm font-body font-medium text-text-primary">Urutkan:</span>
          <div className="flex space-x-1">
            {sortOptions?.map((option) => (
              <Button
                key={option?.value}
                variant={sortBy === option?.value ? "default" : "ghost"}
                size="sm"
                onClick={() => onSortChange(option?.value)}
                iconName={option?.icon}
                iconPosition="left"
              >
                {option?.label}
              </Button>
            ))}
          </div>
        </div>
      </div>
      {/* Results List */}
      <div className="space-y-4">
        {results?.map((article) => (
          <article key={article?.id} className="bg-surface border border-border rounded-lg hover:shadow-card transition-shadow duration-200">
            <Link 
              to={`/article-detail-page?id=${article?.id}&category=${article?.category}&title=${encodeURIComponent(article?.title)}`}
              className="block p-4 hover:bg-muted/50 transition-colors duration-200"
            >
              <div className="flex space-x-4">
                {/* Article Image */}
                <div className="w-24 h-24 sm:w-32 sm:h-32 flex-shrink-0 overflow-hidden rounded-lg">
                  <Image
                    src={article?.image}
                    alt={article?.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Article Content */}
                <div className="flex-1 min-w-0 space-y-2">
                  {/* Category Badge */}
                  <div className="flex items-center space-x-2">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-caption font-medium ${getCategoryColor(article?.category)}`}>
                      {article?.category?.charAt(0)?.toUpperCase() + article?.category?.slice(1)}
                    </span>
                    {article?.isTrending && (
                      <span className="inline-flex items-center space-x-1 text-xs text-error">
                        <Icon name="TrendingUp" size={12} />
                        <span>Trending</span>
                      </span>
                    )}
                  </div>

                  {/* Title */}
                  <h3 className="font-heading font-bold text-base sm:text-lg text-text-primary line-clamp-2 leading-tight">
                    {highlightSearchTerm(article?.title, query)}
                  </h3>

                  {/* Excerpt */}
                  <p className="text-sm text-text-secondary line-clamp-2 leading-relaxed">
                    {highlightSearchTerm(article?.excerpt, query)}
                  </p>

                  {/* Meta Information */}
                  <div className="flex items-center space-x-4 text-xs text-text-secondary">
                    <div className="flex items-center space-x-1">
                      <Icon name="User" size={12} />
                      <span>{article?.author}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Icon name="Calendar" size={12} />
                      <span>{formatDate(article?.publishedAt)}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Icon name="Clock" size={12} />
                      <span>{article?.readTime} menit</span>
                    </div>
                    {article?.views && (
                      <div className="flex items-center space-x-1">
                        <Icon name="Eye" size={12} />
                        <span>{article?.views?.toLocaleString('id-ID')}</span>
                      </div>
                    )}
                  </div>

                  {/* Tags */}
                  {article?.tags && article?.tags?.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {article?.tags?.slice(0, 3)?.map((tag, index) => (
                        <span key={index} className="inline-flex items-center px-2 py-1 bg-muted text-text-secondary text-xs rounded-md">
                          #{tag}
                        </span>
                      ))}
                      {article?.tags?.length > 3 && (
                        <span className="text-xs text-text-secondary">
                          +{article?.tags?.length - 3} lainnya
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
};

export default SearchResults;