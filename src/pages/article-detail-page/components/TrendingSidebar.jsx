import React from 'react';
import { Link } from 'react-router-dom';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';

const TrendingSidebar = () => {
  const trendingArticles = [
    {
      id: 1,
      title: "Pemerintah Umumkan Kebijakan Baru Subsidi BBM 2024",
      category: "Politik",
      image: "https://images.pexels.com/photos/6077326/pexels-photo-6077326.jpeg",
      views: 45230,
      publishedAt: new Date(Date.now() - 1800000)
    },
    {
      id: 2,
      title: "Startup Indonesia Raih Pendanaan Seri B $50 Juta",
      category: "Teknologi",
      image: "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg",
      views: 32100,
      publishedAt: new Date(Date.now() - 3600000)
    },
    {
      id: 3,
      title: "Timnas Indonesia Lolos ke Semifinal Piala AFF",
      category: "Olahraga",
      image: "https://images.pexels.com/photos/274506/pexels-photo-274506.jpeg",
      views: 28750,
      publishedAt: new Date(Date.now() - 5400000)
    },
    {
      id: 4,
      title: "Bank Indonesia Pertahankan Suku Bunga Acuan",
      category: "Ekonomi",
      image: "https://images.pexels.com/photos/259027/pexels-photo-259027.jpeg",
      views: 21400,
      publishedAt: new Date(Date.now() - 7200000)
    },
    {
      id: 5,
      title: "Film Indonesia Raih Penghargaan di Festival Cannes",
      category: "Hiburan",
      image: "https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg",
      views: 19800,
      publishedAt: new Date(Date.now() - 9000000)
    }
  ];

  const formatTimeAgo = (date) => {
    const now = new Date();
    const diffInMinutes = Math.floor((now - date) / (1000 * 60));
    
    if (diffInMinutes < 60) {
      return `${diffInMinutes} menit lalu`;
    } else if (diffInMinutes < 1440) {
      return `${Math.floor(diffInMinutes / 60)} jam lalu`;
    } else {
      return `${Math.floor(diffInMinutes / 1440)} hari lalu`;
    }
  };

  return (
    <div className="hidden lg:block lg:w-80 xl:w-96">
      <div className="sticky top-20 space-y-6">
        {/* Trending Articles */}
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center space-x-2 mb-4">
            <Icon name="TrendingUp" size={20} className="text-primary" />
            <h3 className="font-heading font-bold text-lg text-text-primary">
              Trending Hari Ini
            </h3>
          </div>
          
          <div className="space-y-4">
            {trendingArticles?.map((article, index) => (
              <Link
                key={article?.id}
                to={`/article-detail-page?id=${article?.id}&category=${article?.category?.toLowerCase()}&title=${encodeURIComponent(article?.title)}`}
                className="flex space-x-3 group hover:bg-muted/50 p-2 -m-2 rounded-lg transition-colors duration-200"
              >
                <div className="flex-shrink-0">
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-primary text-primary-foreground text-xs font-bold rounded">
                    {index + 1}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-body font-semibold text-sm text-text-primary line-clamp-2 group-hover:text-primary transition-colors duration-200 mb-1">
                    {article?.title}
                  </h4>
                  <div className="flex items-center space-x-2 text-xs font-caption text-text-secondary">
                    <span className="px-2 py-1 bg-primary/10 text-primary rounded">
                      {article?.category}
                    </span>
                    <span>{formatTimeAgo(article?.publishedAt)}</span>
                  </div>
                  <div className="flex items-center space-x-1 mt-1">
                    <Icon name="Eye" size={12} className="text-text-secondary" />
                    <span className="text-xs font-caption text-text-secondary">
                      {article?.views?.toLocaleString('id-ID')}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Newsletter Subscription */}
        <div className="bg-gradient-to-br from-primary to-primary/80 rounded-lg p-6 text-primary-foreground">
          <div className="flex items-center space-x-2 mb-3">
            <Icon name="Mail" size={20} />
            <h3 className="font-heading font-bold text-lg">
              Newsletter
            </h3>
          </div>
          <p className="font-body text-sm mb-4 opacity-90">
            Dapatkan berita terbaru langsung di email Anda setiap hari.
          </p>
          <div className="space-y-3">
            <input
              type="email"
              placeholder="Email Anda"
              className="w-full px-3 py-2 rounded-md text-text-primary bg-white border-0 focus:ring-2 focus:ring-white/50 outline-none"
            />
            <button className="w-full bg-white text-primary font-body font-semibold py-2 px-4 rounded-md hover:bg-gray-50 transition-colors duration-200">
              Berlangganan
            </button>
          </div>
        </div>

        {/* Advertisement Banner */}
        <div className="bg-muted border border-border rounded-lg p-6 text-center">
          <div className="flex items-center justify-center space-x-2 mb-2">
            <Icon name="Megaphone" size={16} className="text-text-secondary" />
            <span className="font-caption text-xs text-text-secondary uppercase tracking-wide">
              Iklan
            </span>
          </div>
          <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center mb-3">
            <Icon name="Image" size={48} className="text-gray-400" />
          </div>
          <p className="font-body text-sm text-text-secondary">
            Ruang iklan tersedia untuk bisnis Anda
          </p>
        </div>
      </div>
    </div>
  );
};

export default TrendingSidebar;