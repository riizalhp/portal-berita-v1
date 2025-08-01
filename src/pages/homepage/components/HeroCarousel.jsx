import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';


const HeroCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const featuredNews = [
    {
      id: 1,
      title: "Indonesia Raih Kesepakatan Perdagangan Senilai $15 Miliar dengan Uni Eropa",
      excerpt: "Menteri Perdagangan Zulkifli Hasan mengumumkan pencapaian bersejarah dalam hubungan dagang Indonesia-Uni Eropa yang akan membuka peluang ekspor produk unggulan Indonesia ke pasar Eropa.",
      image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&h=500&fit=crop",
      category: "ekonomi",
      author: "Sari Wijayanti",
      publishedAt: new Date(Date.now() - 1800000),
      readTime: 5,
      featured: true
    },
    {
      id: 2,
      title: "Breakthrough Teknologi AI Indonesia Pertama Kali Diakui Dunia Internasional",
      excerpt: "Startup teknologi asal Bandung berhasil mengembangkan sistem AI untuk deteksi dini bencana alam yang mendapat pengakuan dari UNESCO dan akan diimplementasikan di 20 negara.",
      image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&h=500&fit=crop",
      category: "teknologi",
      author: "Ahmad Rizki",
      publishedAt: new Date(Date.now() - 3600000),
      readTime: 7,
      featured: true
    },
    {
      id: 3,
      title: "Timnas Indonesia Juara Piala AFF 2024, Trofi Pertama Setelah 27 Tahun",
      excerpt: "Skuad Garuda berhasil mengalahkan Thailand 3-1 di final yang berlangsung di Stadion Gelora Bung Karno. Kemenangan ini menjadi pencapaian bersejarah sepak bola Indonesia.",
      image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&h=500&fit=crop",
      category: "olahraga",
      author: "Budi Santoso",
      publishedAt: new Date(Date.now() - 7200000),
      readTime: 4,
      featured: true
    },
    {
      id: 4,
      title: "Presiden Jokowi Luncurkan Program Ibu Kota Nusantara Tahap Kedua",
      excerpt: "Pembangunan infrastruktur IKN memasuki fase baru dengan fokus pada kawasan pemerintahan dan hunian untuk ASN. Target perpindahan bertahap dimulai Agustus 2024.",
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=500&fit=crop",
      category: "politik",
      author: "Dewi Kartika",
      publishedAt: new Date(Date.now() - 10800000),
      readTime: 6,
      featured: true
    }
  ];

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % featuredNews?.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, featuredNews?.length]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const goToPrevious = () => {
    setCurrentSlide((prev) => prev === 0 ? featuredNews?.length - 1 : prev - 1);
  };

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % featuredNews?.length);
  };

  const formatTime = (date) => {
    const now = new Date();
    const diff = Math.floor((now - date) / 60000);
    if (diff < 60) return `${diff} menit lalu`;
    const hours = Math.floor(diff / 60);
    if (hours < 24) return `${hours} jam lalu`;
    return date?.toLocaleDateString('id-ID');
  };

  const getCategoryColor = (category) => {
    const colors = {
      politik: 'bg-blue-600',
      ekonomi: 'bg-green-600',
      teknologi: 'bg-purple-600',
      olahraga: 'bg-orange-600',
      hiburan: 'bg-pink-600'
    };
    return colors?.[category] || 'bg-gray-600';
  };

  const currentNews = featuredNews?.[currentSlide];

  return (
    <section className="relative bg-surface">
      <div className="max-w-7xl mx-auto">
        <div className="relative overflow-hidden rounded-lg shadow-elevated">
          {/* Main Carousel */}
          <div className="relative h-96 md:h-[500px] lg:h-[600px]">
            <div 
              className="flex transition-transform duration-500 ease-in-out h-full"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {featuredNews?.map((news, index) => (
                <div key={news?.id} className="w-full flex-shrink-0 relative">
                  <Image
                    src={news?.image}
                    alt={news?.title}
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                  
                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 lg:p-12">
                    <div className="max-w-4xl">
                      {/* Category Badge */}
                      <div className="flex items-center space-x-2 mb-4">
                        <span className={`px-3 py-1 rounded-full text-white text-xs font-medium ${getCategoryColor(news?.category)}`}>
                          {news?.category?.toUpperCase()}
                        </span>
                        {news?.featured && (
                          <span className="px-3 py-1 rounded-full bg-warning text-warning-foreground text-xs font-medium">
                            UTAMA
                          </span>
                        )}
                      </div>

                      {/* Title */}
                      <Link
                        to={`/article-detail-page?id=${news?.id}&category=${news?.category}&title=${encodeURIComponent(news?.title)}`}
                        className="block group"
                      >
                        <h1 className="font-heading font-bold text-2xl md:text-3xl lg:text-4xl text-white mb-4 line-clamp-3 group-hover:text-primary transition-colors duration-200">
                          {news?.title}
                        </h1>
                      </Link>

                      {/* Excerpt */}
                      <p className="font-body text-gray-200 text-base md:text-lg mb-6 line-clamp-3 max-w-3xl">
                        {news?.excerpt}
                      </p>

                      {/* Meta Info */}
                      <div className="flex items-center space-x-4 text-sm text-gray-300">
                        <div className="flex items-center space-x-2">
                          <Icon name="User" size={16} />
                          <span>{news?.author}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Icon name="Clock" size={16} />
                          <span>{formatTime(news?.publishedAt)}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Icon name="BookOpen" size={16} />
                          <span>{news?.readTime} menit baca</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={goToPrevious}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black bg-opacity-50 hover:bg-opacity-70 text-white rounded-full flex items-center justify-center transition-all duration-200 backdrop-blur-sm"
            aria-label="Slide sebelumnya"
          >
            <Icon name="ChevronLeft" size={24} />
          </button>

          <button
            onClick={goToNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black bg-opacity-50 hover:bg-opacity-70 text-white rounded-full flex items-center justify-center transition-all duration-200 backdrop-blur-sm"
            aria-label="Slide selanjutnya"
          >
            <Icon name="ChevronRight" size={24} />
          </button>

          {/* Slide Indicators */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center space-x-2">
            {featuredNews?.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-200 ${
                  index === currentSlide 
                    ? 'bg-white scale-110' :'bg-white bg-opacity-50 hover:bg-opacity-75'
                }`}
                aria-label={`Slide ${index + 1}`}
              />
            ))}
          </div>

          {/* Auto-play Toggle */}
          <button
            onClick={() => setIsAutoPlaying(!isAutoPlaying)}
            className="absolute top-4 right-4 w-10 h-10 bg-black bg-opacity-50 hover:bg-opacity-70 text-white rounded-full flex items-center justify-center transition-all duration-200 backdrop-blur-sm"
            aria-label={isAutoPlaying ? "Hentikan auto-play" : "Mulai auto-play"}
          >
            <Icon name={isAutoPlaying ? "Pause" : "Play"} size={16} />
          </button>
        </div>

        {/* Thumbnail Navigation (Desktop) */}
        <div className="hidden lg:flex items-center space-x-4 mt-6 overflow-x-auto pb-2">
          {featuredNews?.map((news, index) => (
            <button
              key={news?.id}
              onClick={() => goToSlide(index)}
              className={`flex-shrink-0 w-64 p-3 rounded-lg border-2 transition-all duration-200 ${
                index === currentSlide
                  ? 'border-primary bg-primary/5' :'border-border bg-card hover:border-primary/50'
              }`}
            >
              <div className="flex items-center space-x-3">
                <Image
                  src={news?.image}
                  alt={news?.title}
                  className="w-16 h-12 object-cover rounded"
                />
                <div className="flex-1 text-left">
                  <h4 className="font-body font-medium text-sm line-clamp-2 text-text-primary">
                    {news?.title}
                  </h4>
                  <p className="text-xs text-text-secondary mt-1">
                    {formatTime(news?.publishedAt)}
                  </p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroCarousel;