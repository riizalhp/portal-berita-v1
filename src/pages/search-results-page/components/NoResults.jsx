import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import SearchComponent from '../../../components/ui/SearchComponent';

const NoResults = ({ query, onNewSearch }) => {
  const suggestions = [
    'Periksa ejaan kata kunci Anda',
    'Coba gunakan kata kunci yang lebih umum',
    'Gunakan sinonim atau kata-kata alternatif',
    'Kurangi jumlah kata kunci',
    'Hapus filter pencarian yang aktif'
  ];

  const popularSearches = [
    'Pemilu 2024',
    'Ekonomi Indonesia',
    'Teknologi AI',
    'Sepak Bola Indonesia',
    'Film Indonesia',
    'Cryptocurrency',
    'Pendidikan Online',
    'Pariwisata Bali'
  ];

  const popularCategories = [
    { name: 'Politik', icon: 'Users', path: '/category-listing-page?category=politik', description: 'Berita politik terkini' },
    { name: 'Ekonomi', icon: 'TrendingUp', path: '/category-listing-page?category=ekonomi', description: 'Update ekonomi dan bisnis' },
    { name: 'Teknologi', icon: 'Smartphone', path: '/category-listing-page?category=teknologi', description: 'Inovasi dan gadget terbaru' },
    { name: 'Olahraga', icon: 'Trophy', path: '/category-listing-page?category=olahraga', description: 'Berita olahraga nasional' }
  ];

  return (
    <div className="max-w-4xl mx-auto text-center space-y-8">
      {/* No Results Icon and Message */}
      <div className="space-y-4">
        <div className="w-24 h-24 mx-auto bg-muted rounded-full flex items-center justify-center">
          <Icon name="SearchX" size={48} className="text-text-secondary" />
        </div>
        
        <div className="space-y-2">
          <h2 className="font-heading font-bold text-2xl text-text-primary">
            Tidak Ada Hasil Ditemukan
          </h2>
          <p className="text-text-secondary font-body">
            Pencarian untuk <span className="font-medium text-text-primary">"{query}"</span> tidak menghasilkan artikel apapun.
          </p>
        </div>
      </div>
      {/* Search Again */}
      <div className="bg-surface border border-border rounded-lg p-6 space-y-4">
        <h3 className="font-heading font-bold text-lg text-text-primary">
          Coba Pencarian Baru
        </h3>
        <div className="max-w-md mx-auto">
          <SearchComponent variant="compact" />
        </div>
      </div>
      {/* Search Suggestions */}
      <div className="bg-surface border border-border rounded-lg p-6 text-left">
        <h3 className="font-heading font-bold text-lg text-text-primary mb-4 flex items-center justify-center space-x-2">
          <Icon name="Lightbulb" size={20} className="text-accent" />
          <span>Saran Pencarian</span>
        </h3>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-body font-medium text-text-primary mb-3">Tips untuk hasil yang lebih baik:</h4>
            <ul className="space-y-2">
              {suggestions?.map((suggestion, index) => (
                <li key={index} className="flex items-start space-x-2 text-sm text-text-secondary">
                  <Icon name="Check" size={16} className="text-accent mt-0.5 flex-shrink-0" />
                  <span>{suggestion}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="font-body font-medium text-text-primary mb-3">Pencarian populer:</h4>
            <div className="flex flex-wrap gap-2">
              {popularSearches?.map((search, index) => (
                <button
                  key={index}
                  onClick={() => onNewSearch(search)}
                  className="px-3 py-1 bg-muted hover:bg-muted/80 text-text-primary text-sm rounded-full transition-colors duration-200"
                >
                  {search}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* Popular Categories */}
      <div className="bg-surface border border-border rounded-lg p-6">
        <h3 className="font-heading font-bold text-lg text-text-primary mb-6 flex items-center justify-center space-x-2">
          <Icon name="Folder" size={20} />
          <span>Jelajahi Kategori Populer</span>
        </h3>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {popularCategories?.map((category, index) => (
            <Link
              key={index}
              to={category?.path}
              className="p-4 bg-muted hover:bg-muted/80 rounded-lg transition-colors duration-200 group text-center"
            >
              <div className="w-12 h-12 mx-auto mb-3 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-200">
                <Icon name={category?.icon} size={24} className="text-primary" />
              </div>
              <h4 className="font-body font-medium text-text-primary group-hover:text-primary mb-1">
                {category?.name}
              </h4>
              <p className="text-xs text-text-secondary">
                {category?.description}
              </p>
            </Link>
          ))}
        </div>
      </div>
      {/* Back to Homepage */}
      <div className="pt-4">
        <Button
          variant="outline"
          size="lg"
          iconName="Home"
          iconPosition="left"
          onClick={() => window.location.href = '/homepage'}
        >
          Kembali ke Beranda
        </Button>
      </div>
    </div>
  );
};

export default NoResults;