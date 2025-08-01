import React from 'react';
import { Link } from 'react-router-dom';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';

const TrendingWidget = () => {
  const trendingArticles = [
    {
      id: 1,
      title: "Harga BBM Naik Lagi, Masyarakat Diminta Berhemat",
      category: "ekonomi",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=200&fit=crop",
      views: 125000,
      publishedAt: new Date(Date.now() - 1800000),
      trending: 1
    },
    {
      id: 2,
      title: "ChatGPT Versi Indonesia Segera Diluncurkan",
      category: "teknologi",
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=300&h=200&fit=crop",
      views: 98000,
      publishedAt: new Date(Date.now() - 3600000),
      trending: 2
    },
    {
      id: 3,
      title: "Timnas Indonesia Siap Hadapi Kualifikasi Piala Dunia",
      category: "olahraga",
      image: "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=300&h=200&fit=crop",
      views: 87000,
      publishedAt: new Date(Date.now() - 5400000),
      trending: 3
    },
    {
      id: 4,
      title: "Artis Indonesia Raih Penghargaan di Festival Film Cannes",
      category: "hiburan",
      image: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=300&h=200&fit=crop",
      views: 76000,
      publishedAt: new Date(Date.now() - 7200000),
      trending: 4
    },
    {
      id: 5,
      title: "Kebijakan Baru Pajak Digital Mulai Berlaku",
      category: "politik",
      image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=300&h=200&fit=crop",
      views: 65000,
      publishedAt: new Date(Date.now() - 9000000),
      trending: 5
    }
  ];

  const formatTime = (date) => {
    const now = new Date();
    const diff = Math.floor((now - date) / 60000);
    if (diff < 60) return `${diff} menit lalu`;
    const hours = Math.floor(diff / 60);
    if (hours < 24) return `${hours} jam lalu`;
    return date?.toLocaleDateString('id-ID');
  };

  const formatViews = (views) => {
    if (views >= 1000000) {
      return `${(views / 1000000)?.toFixed(1)}M`;
    } else if (views >= 1000) {
      return `${(views / 1000)?.toFixed(1)}K`;
    }
    return views?.toString();
  };

  const getTrendingColor = (position) => {
    if (position === 1) return 'text-yellow-600 bg-yellow-100';
    if (position === 2) return 'text-gray-600 bg-gray-100';
    if (position === 3) return 'text-orange-600 bg-orange-100';
    return 'text-primary bg-primary/10';
  };

  return (
    <div className="bg-card border border-border rounded-lg shadow-card p-6">
      {/* Header */}
      <div className="flex items-center space-x-2 mb-6">
        <div className="p-2 bg-secondary/10 rounded-lg">
          <Icon name="TrendingUp" size={20} className="text-secondary" />
        </div>
        <div>
          <h3 className="font-heading font-bold text-lg text-text-primary">
            Trending Hari Ini
          </h3>
          <p className="font-caption text-xs text-text-secondary">
            Berita paling banyak dibaca
          </p>
        </div>
      </div>
      {/* Trending List */}
      <div className="space-y-4">
        {trendingArticles?.map((article, index) => (
          <Link
            key={article?.id}
            to={`/article-detail-page?id=${article?.id}&category=${article?.category}&title=${encodeURIComponent(article?.title)}`}
            className="flex items-start space-x-3 p-3 rounded-lg hover:bg-muted transition-colors duration-200 group"
          >
            {/* Trending Number */}
            <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${getTrendingColor(article?.trending)}`}>
              {article?.trending}
            </div>

            {/* Image */}
            <div className="flex-shrink-0 w-16 h-12 rounded overflow-hidden">
              <Image
                src={article?.image}
                alt={article?.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
              />
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <h4 className="font-body font-medium text-sm text-text-primary line-clamp-2 group-hover:text-primary transition-colors duration-200 mb-1">
                {article?.title}
              </h4>
              
              <div className="flex items-center justify-between text-xs text-text-secondary">
                <div className="flex items-center space-x-2">
                  <span className="capitalize">{article?.category}</span>
                  <span>•</span>
                  <span>{formatTime(article?.publishedAt)}</span>
                </div>
                
                <div className="flex items-center space-x-1">
                  <Icon name="Eye" size={12} />
                  <span>{formatViews(article?.views)}</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
      {/* View All Button */}
      <div className="mt-6 pt-4 border-t border-border">
        <Link
          to="/search-results-page?sort=trending"
          className="flex items-center justify-center space-x-2 w-full py-2 text-sm font-medium text-primary hover:bg-primary/5 rounded-lg transition-colors duration-200"
        >
          <span>Lihat Semua Trending</span>
          <Icon name="ArrowRight" size={16} />
        </Link>
      </div>
    </div>
  );
};

export default TrendingWidget;