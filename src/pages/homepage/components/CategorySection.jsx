import React from 'react';
import { Link } from 'react-router-dom';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CategorySection = ({ category, articles, title, icon }) => {
  const formatTime = (date) => {
    const now = new Date();
    const diff = Math.floor((now - date) / 60000);
    if (diff < 60) return `${diff} menit lalu`;
    const hours = Math.floor(diff / 60);
    if (hours < 24) return `${hours} jam lalu`;
    return date?.toLocaleDateString('id-ID');
  };

  const getCategoryColor = (cat) => {
    const colors = {
      politik: 'text-blue-600 border-blue-600',
      ekonomi: 'text-green-600 border-green-600',
      teknologi: 'text-purple-600 border-purple-600',
      olahraga: 'text-orange-600 border-orange-600',
      hiburan: 'text-pink-600 border-pink-600'
    };
    return colors?.[cat] || 'text-gray-600 border-gray-600';
  };

  return (
    <section className="mb-12">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className={`p-2 rounded-lg border-2 ${getCategoryColor(category)}`}>
            <Icon name={icon} size={24} className={getCategoryColor(category)?.split(' ')?.[0]} />
          </div>
          <div>
            <h2 className="font-heading font-bold text-2xl text-text-primary">
              {title}
            </h2>
            <p className="font-caption text-sm text-text-secondary">
              Berita terkini seputar {title?.toLowerCase()}
            </p>
          </div>
        </div>
        
        <Button
          variant="outline"
          iconName="ArrowRight"
          iconPosition="right"
          onClick={() => window.location.href = `/category-listing-page?category=${category}`}
        >
          Lihat Semua
        </Button>
      </div>
      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles?.map((article, index) => (
          <article
            key={article?.id}
            className={`group bg-card border border-border rounded-lg overflow-hidden shadow-card hover:shadow-elevated transition-all duration-300 ${
              index === 0 ? 'md:col-span-2 lg:col-span-1' : ''
            }`}
          >
            <Link
              to={`/article-detail-page?id=${article?.id}&category=${category}&title=${encodeURIComponent(article?.title)}`}
              className="block"
            >
              {/* Image */}
              <div className={`relative overflow-hidden ${index === 0 ? 'h-48 md:h-64' : 'h-48'}`}>
                <Image
                  src={article?.image}
                  alt={article?.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                
                {/* Category Badge */}
                <div className="absolute top-3 left-3">
                  <span className={`px-2 py-1 rounded-md text-white text-xs font-medium bg-black bg-opacity-70 backdrop-blur-sm`}>
                    {category?.toUpperCase()}
                  </span>
                </div>

                {/* Reading Time */}
                <div className="absolute top-3 right-3">
                  <span className="px-2 py-1 rounded-md text-white text-xs font-medium bg-black bg-opacity-70 backdrop-blur-sm flex items-center space-x-1">
                    <Icon name="Clock" size={12} />
                    <span>{article?.readTime} min</span>
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-4">
                <h3 className={`font-heading font-bold mb-2 group-hover:text-primary transition-colors duration-200 ${
                  index === 0 ? 'text-lg md:text-xl' : 'text-base'
                } line-clamp-2 text-text-primary`}>
                  {article?.title}
                </h3>

                {index === 0 && (
                  <p className="font-body text-text-secondary text-sm mb-3 line-clamp-2">
                    {article?.excerpt}
                  </p>
                )}

                {/* Meta Info */}
                <div className="flex items-center justify-between text-xs text-text-secondary">
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center space-x-1">
                      <Icon name="User" size={12} />
                      <span>{article?.author}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Icon name="Clock" size={12} />
                      <span>{formatTime(article?.publishedAt)}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center space-x-1">
                      <Icon name="Eye" size={12} />
                      <span>{article?.views?.toLocaleString('id-ID') || '0'}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Icon name="MessageCircle" size={12} />
                      <span>{article?.comments || 0}</span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>

            {/* Social Share (on hover) */}
            <div className="px-4 pb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <div className="flex items-center justify-between pt-2 border-t border-border">
                <span className="text-xs text-text-secondary">Bagikan:</span>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={(e) => {
                      e?.preventDefault();
                      const url = `${window.location?.origin}/article-detail-page?id=${article?.id}&category=${category}&title=${encodeURIComponent(article?.title)}`;
                      window.open(`https://wa.me/?text=${encodeURIComponent(article?.title + ' - ' + url)}`, '_blank');
                    }}
                    className="p-1 text-green-600 hover:bg-green-50 rounded transition-colors duration-200"
                    aria-label="Bagikan ke WhatsApp"
                  >
                    <Icon name="MessageCircle" size={14} />
                  </button>
                  <button
                    onClick={(e) => {
                      e?.preventDefault();
                      const url = `${window.location?.origin}/article-detail-page?id=${article?.id}&category=${category}&title=${encodeURIComponent(article?.title)}`;
                      window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
                    }}
                    className="p-1 text-blue-600 hover:bg-blue-50 rounded transition-colors duration-200"
                    aria-label="Bagikan ke Facebook"
                  >
                    <Icon name="Facebook" size={14} />
                  </button>
                  <button
                    onClick={(e) => {
                      e?.preventDefault();
                      const url = `${window.location?.origin}/article-detail-page?id=${article?.id}&category=${category}&title=${encodeURIComponent(article?.title)}`;
                      window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(article?.title)}&url=${encodeURIComponent(url)}`, '_blank');
                    }}
                    className="p-1 text-blue-400 hover:bg-blue-50 rounded transition-colors duration-200"
                    aria-label="Bagikan ke Twitter"
                  >
                    <Icon name="Twitter" size={14} />
                  </button>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default CategorySection;