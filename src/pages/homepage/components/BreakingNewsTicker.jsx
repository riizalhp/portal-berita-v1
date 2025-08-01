import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';

const BreakingNewsTicker = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  const breakingNews = [
    {
      id: 1,
      title: "Presiden Jokowi Resmikan Proyek Infrastruktur Senilai Rp 50 Triliun di Jakarta",
      category: "politik",
      timestamp: new Date(Date.now() - 300000),
      urgent: true
    },
    {
      id: 2,
      title: "Bank Indonesia Naikkan Suku Bunga Acuan Menjadi 6.25% untuk Stabilkan Rupiah",
      category: "ekonomi",
      timestamp: new Date(Date.now() - 600000),
      urgent: false
    },
    {
      id: 3,
      title: "Gempa 7.2 SR Guncang Sulawesi Tengah, BMKG Keluarkan Peringatan Tsunami",
      category: "nasional",
      timestamp: new Date(Date.now() - 900000),
      urgent: true
    },
    {
      id: 4,
      title: "Timnas Indonesia Lolos ke Semifinal Piala AFF 2024 Setelah Kalahkan Thailand 2-1",
      category: "olahraga",
      timestamp: new Date(Date.now() - 1200000),
      urgent: false
    },
    {
      id: 5,
      title: "OpenAI Luncurkan ChatGPT-5 dengan Kemampuan Multimodal yang Revolusioner",
      category: "teknologi",
      timestamp: new Date(Date.now() - 1500000),
      urgent: false
    }
  ];

  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % breakingNews?.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isPlaying, breakingNews?.length]);

  const handlePrevious = () => {
    setCurrentIndex((prev) => prev === 0 ? breakingNews?.length - 1 : prev - 1);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % breakingNews?.length);
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const formatTime = (date) => {
    const now = new Date();
    const diff = Math.floor((now - date) / 60000);
    if (diff < 1) return 'Baru saja';
    if (diff < 60) return `${diff} menit lalu`;
    const hours = Math.floor(diff / 60);
    if (hours < 24) return `${hours} jam lalu`;
    return date?.toLocaleDateString('id-ID');
  };

  const currentNews = breakingNews?.[currentIndex];

  return (
    <div className="bg-secondary text-secondary-foreground shadow-card border-b border-border">
      <div className="max-w-7xl mx-auto px-4 lg:px-6">
        <div className="flex items-center py-3">
          {/* Breaking News Label */}
          <div className="flex items-center space-x-2 flex-shrink-0 mr-4">
            <div className="bg-white text-secondary px-3 py-1 rounded-md font-heading font-bold text-sm">
              BREAKING
            </div>
            {currentNews?.urgent && (
              <div className="w-2 h-2 bg-warning rounded-full animate-pulse" />
            )}
          </div>

          {/* News Content */}
          <div className="flex-1 min-w-0 mr-4">
            <Link
              to={`/article-detail-page?id=${currentNews?.id}&category=${currentNews?.category}&title=${encodeURIComponent(currentNews?.title)}`}
              className="block hover:underline"
            >
              <div className="flex items-center space-x-3">
                <h3 className="font-body font-medium text-sm md:text-base line-clamp-2 flex-1">
                  {currentNews?.title}
                </h3>
                <div className="hidden md:flex items-center space-x-2 text-xs opacity-80">
                  <Icon name="Clock" size={14} />
                  <span>{formatTime(currentNews?.timestamp)}</span>
                </div>
              </div>
            </Link>
          </div>

          {/* Controls */}
          <div className="flex items-center space-x-2 flex-shrink-0">
            <button
              onClick={handlePrevious}
              className="p-1 hover:bg-white hover:bg-opacity-20 rounded-md transition-colors duration-200"
              aria-label="Berita sebelumnya"
            >
              <Icon name="ChevronLeft" size={18} />
            </button>
            
            <button
              onClick={togglePlayPause}
              className="p-1 hover:bg-white hover:bg-opacity-20 rounded-md transition-colors duration-200"
              aria-label={isPlaying ? "Jeda" : "Putar"}
            >
              <Icon name={isPlaying ? "Pause" : "Play"} size={16} />
            </button>
            
            <button
              onClick={handleNext}
              className="p-1 hover:bg-white hover:bg-opacity-20 rounded-md transition-colors duration-200"
              aria-label="Berita selanjutnya"
            >
              <Icon name="ChevronRight" size={18} />
            </button>

            {/* Progress Indicators */}
            <div className="hidden sm:flex items-center space-x-1 ml-2">
              {breakingNews?.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full transition-colors duration-200 ${
                    index === currentIndex ? 'bg-white' : 'bg-white bg-opacity-40'
                  }`}
                  aria-label={`Berita ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BreakingNewsTicker;