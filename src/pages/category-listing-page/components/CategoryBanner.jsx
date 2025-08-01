import React from 'react';
import Icon from '../../../components/AppIcon';

const CategoryBanner = ({ category, articleCount }) => {
  const categoryData = {
    politik: {
      title: 'Politik',
      description: 'Berita terkini seputar politik Indonesia dan dunia',
      icon: 'Users',
      gradient: 'from-blue-600 to-blue-800'
    },
    ekonomi: {
      title: 'Ekonomi',
      description: 'Informasi ekonomi, bisnis, dan keuangan terbaru',
      icon: 'TrendingUp',
      gradient: 'from-green-600 to-green-800'
    },
    teknologi: {
      title: 'Teknologi',
      description: 'Perkembangan teknologi dan inovasi digital',
      icon: 'Smartphone',
      gradient: 'from-purple-600 to-purple-800'
    },
    olahraga: {
      title: 'Olahraga',
      description: 'Berita olahraga nasional dan internasional',
      icon: 'Trophy',
      gradient: 'from-orange-600 to-orange-800'
    },
    hiburan: {
      title: 'Hiburan',
      description: 'Dunia hiburan, selebriti, dan lifestyle',
      icon: 'Music',
      gradient: 'from-pink-600 to-pink-800'
    }
  };

  const data = categoryData?.[category] || categoryData?.politik;

  return (
    <div className={`relative bg-gradient-to-r ${data?.gradient} text-white py-12 md:py-16`}>
      <div className="absolute inset-0 bg-black bg-opacity-20"></div>
      <div className="relative max-w-7xl mx-auto px-4 lg:px-6">
        <div className="flex items-center space-x-4 mb-4">
          <div className="w-12 h-12 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
            <Icon name={data?.icon} size={24} color="white" />
          </div>
          <div>
            <h1 className="font-heading font-bold text-3xl md:text-4xl">{data?.title}</h1>
            <p className="font-body text-lg opacity-90 mt-1">{data?.description}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2 text-sm font-body opacity-80">
          <Icon name="FileText" size={16} />
          <span>{articleCount} artikel tersedia</span>
        </div>
      </div>
    </div>
  );
};

export default CategoryBanner;