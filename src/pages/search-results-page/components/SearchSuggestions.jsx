import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SearchSuggestions = ({ query, onSuggestionClick }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const relatedQueries = [
    'Pemilu 2024 Indonesia',
    'Ekonomi digital Indonesia',
    'Teknologi AI terbaru',
    'Liga Indonesia 2024',
    'Film Indonesia terbaru',
    'Cryptocurrency Indonesia',
    'Vaksin COVID-19 booster',
    'Pendidikan online gratis'
  ];

  const trendingTopics = [
    { topic: 'Pilpres 2024', count: '2.5k artikel', category: 'politik' },
    { topic: 'Inflasi Indonesia', count: '1.8k artikel', category: 'ekonomi' },
    { topic: 'ChatGPT Indonesia', count: '1.2k artikel', category: 'teknologi' },
    { topic: 'Timnas Indonesia', count: '950 artikel', category: 'olahraga' },
    { topic: 'Netflix Indonesia', count: '720 artikel', category: 'hiburan' }
  ];

  const popularCategories = [
    { name: 'Politik', icon: 'Users', count: '15.2k artikel', path: '/category-listing-page?category=politik' },
    { name: 'Ekonomi', icon: 'TrendingUp', count: '12.8k artikel', path: '/category-listing-page?category=ekonomi' },
    { name: 'Teknologi', icon: 'Smartphone', count: '9.5k artikel', path: '/category-listing-page?category=teknologi' },
    { name: 'Olahraga', icon: 'Trophy', count: '7.3k artikel', path: '/category-listing-page?category=olahraga' },
    { name: 'Hiburan', icon: 'Music', count: '6.1k artikel', path: '/category-listing-page?category=hiburan' }
  ];

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="space-y-6">
      {/* Related Queries */}
      <div className="bg-surface border border-border rounded-lg p-6">
        <h3 className="font-heading font-bold text-lg text-text-primary mb-4 flex items-center space-x-2">
          <Icon name="Search" size={20} />
          <span>Pencarian Terkait</span>
        </h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {relatedQueries?.slice(0, isExpanded ? relatedQueries?.length : 6)?.map((suggestion, index) => (
            <button
              key={index}
              onClick={() => onSuggestionClick(suggestion)}
              className="flex items-center space-x-2 p-3 text-left bg-muted hover:bg-muted/80 rounded-md transition-colors duration-200 group"
            >
              <Icon name="Search" size={14} className="text-text-secondary group-hover:text-primary" />
              <span className="text-sm font-body text-text-primary group-hover:text-primary truncate">
                {suggestion}
              </span>
            </button>
          ))}
        </div>
        
        {relatedQueries?.length > 6 && (
          <div className="mt-4 text-center">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleExpanded}
              iconName={isExpanded ? "ChevronUp" : "ChevronDown"}
              iconPosition="right"
            >
              {isExpanded ? 'Tampilkan Lebih Sedikit' : 'Tampilkan Lebih Banyak'}
            </Button>
          </div>
        )}
      </div>
      {/* Trending Topics */}
      <div className="bg-surface border border-border rounded-lg p-6">
        <h3 className="font-heading font-bold text-lg text-text-primary mb-4 flex items-center space-x-2">
          <Icon name="TrendingUp" size={20} />
          <span>Topik Trending</span>
        </h3>
        
        <div className="space-y-3">
          {trendingTopics?.map((topic, index) => (
            <button
              key={index}
              onClick={() => onSuggestionClick(topic?.topic)}
              className="flex items-center justify-between w-full p-3 bg-muted hover:bg-muted/80 rounded-md transition-colors duration-200 group"
            >
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                  <span className="text-sm font-bold text-primary">#{index + 1}</span>
                </div>
                <div className="text-left">
                  <div className="font-body font-medium text-text-primary group-hover:text-primary">
                    {topic?.topic}
                  </div>
                  <div className="text-xs text-text-secondary">
                    {topic?.count} • {topic?.category}
                  </div>
                </div>
              </div>
              <Icon name="ChevronRight" size={16} className="text-text-secondary group-hover:text-primary" />
            </button>
          ))}
        </div>
      </div>
      {/* Popular Categories */}
      <div className="bg-surface border border-border rounded-lg p-6">
        <h3 className="font-heading font-bold text-lg text-text-primary mb-4 flex items-center space-x-2">
          <Icon name="Folder" size={20} />
          <span>Kategori Populer</span>
        </h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3">
          {popularCategories?.map((category, index) => (
            <Link
              key={index}
              to={category?.path}
              className="flex items-center justify-between p-3 bg-muted hover:bg-muted/80 rounded-md transition-colors duration-200 group"
            >
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Icon name={category?.icon} size={18} className="text-primary" />
                </div>
                <div>
                  <div className="font-body font-medium text-text-primary group-hover:text-primary">
                    {category?.name}
                  </div>
                  <div className="text-xs text-text-secondary">
                    {category?.count}
                  </div>
                </div>
              </div>
              <Icon name="ChevronRight" size={16} className="text-text-secondary group-hover:text-primary" />
            </Link>
          ))}
        </div>
      </div>
      {/* Search Tips */}
      <div className="bg-accent/5 border border-accent/20 rounded-lg p-6">
        <h3 className="font-heading font-bold text-lg text-text-primary mb-4 flex items-center space-x-2">
          <Icon name="Lightbulb" size={20} className="text-accent" />
          <span>Tips Pencarian</span>
        </h3>
        
        <div className="space-y-3 text-sm font-body text-text-secondary">
          <div className="flex items-start space-x-2">
            <Icon name="Check" size={16} className="text-accent mt-0.5 flex-shrink-0" />
            <span>Gunakan tanda kutip untuk mencari frasa lengkap: "ekonomi digital"</span>
          </div>
          <div className="flex items-start space-x-2">
            <Icon name="Check" size={16} className="text-accent mt-0.5 flex-shrink-0" />
            <span>Tambahkan tanda minus untuk mengecualikan kata: teknologi -smartphone</span>
          </div>
          <div className="flex items-start space-x-2">
            <Icon name="Check" size={16} className="text-accent mt-0.5 flex-shrink-0" />
            <span>Gunakan OR untuk mencari salah satu kata: politik OR pemilu</span>
          </div>
          <div className="flex items-start space-x-2">
            <Icon name="Check" size={16} className="text-accent mt-0.5 flex-shrink-0" />
            <span>Coba kata kunci yang lebih spesifik untuk hasil yang lebih akurat</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchSuggestions;