import React, { useEffect } from 'react';
import Header from '../../components/ui/Header';
import BreakingNewsTicker from './components/BreakingNewsTicker';
import HeroCarousel from './components/HeroCarousel';
import CategorySection from './components/CategorySection';
import TrendingWidget from './components/TrendingWidget';
import WeatherWidget from './components/WeatherWidget';
import CurrencyWidget from './components/CurrencyWidget';
import NewsletterWidget from './components/NewsletterWidget';

const Homepage = () => {
  useEffect(() => {
    document.title = 'Portal Berita Indonesia - Berita Terkini Hari Ini';
    
    // Set meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription?.setAttribute('content', 'Portal berita terpercaya Indonesia dengan informasi terkini seputar politik, ekonomi, teknologi, olahraga, dan hiburan. Baca berita breaking news hari ini.');
    }
  }, []);

  // Mock data for categories
  const categoryData = {
    politik: {
      title: 'Politik',
      icon: 'Users',
      articles: [
        {
          id: 1,
          title: "Presiden Jokowi Resmikan Pembangunan Fase Kedua IKN Nusantara",
          excerpt: "Pembangunan ibu kota baru memasuki tahap krusial dengan fokus pada infrastruktur pemerintahan dan hunian ASN yang akan dimulai pada Agustus 2024.",
          image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&h=400&fit=crop",
          author: "Dewi Kartika",
          publishedAt: new Date(Date.now() - 1800000),
          readTime: 6,
          views: 45000,
          comments: 128
        },
        {
          id: 2,
          title: "DPR Setujui Anggaran Pendidikan 2025 Naik 15%",
          excerpt: "Peningkatan anggaran pendidikan diharapkan dapat meningkatkan kualitas pendidikan di seluruh Indonesia.",
          image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&h=400&fit=crop",
          author: "Ahmad Rizki",
          publishedAt: new Date(Date.now() - 3600000),
          readTime: 4,
          views: 32000,
          comments: 89
        },
        {
          id: 3,
          title: "Menteri BUMN Luncurkan Program Digitalisasi UMKM",
          excerpt: "Program ini akan membantu 1 juta UMKM untuk go digital dan meningkatkan daya saing di era ekonomi digital.",
          image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=600&h=400&fit=crop",
          author: "Sari Wijayanti",
          publishedAt: new Date(Date.now() - 5400000),
          readTime: 5,
          views: 28000,
          comments: 67
        }
      ]
    },
    ekonomi: {
      title: 'Ekonomi',
      icon: 'TrendingUp',
      articles: [
        {
          id: 4,
          title: "Bank Indonesia Pertahankan Suku Bunga 6% untuk Stabilkan Rupiah",
          excerpt: "Keputusan ini diambil untuk menjaga stabilitas nilai tukar rupiah di tengah ketidakpastian ekonomi global dan inflasi yang masih terkendali.",
          image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=600&h=400&fit=crop",
          author: "Budi Santoso",
          publishedAt: new Date(Date.now() - 2700000),
          readTime: 7,
          views: 67000,
          comments: 156
        },
        {
          id: 5,
          title: "Ekspor Indonesia ke China Meningkat 25% di Kuartal II",
          excerpt: "Peningkatan ekspor didorong oleh komoditas kelapa sawit, batu bara, dan produk manufaktur.",
          image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=400&fit=crop",
          author: "Lisa Permata",
          publishedAt: new Date(Date.now() - 4500000),
          readTime: 5,
          views: 41000,
          comments: 92
        },
        {
          id: 6,
          title: "Startup Fintech Indonesia Raih Pendanaan $50 Juta",
          excerpt: "Pendanaan akan digunakan untuk ekspansi ke negara ASEAN dan pengembangan produk digital banking.",
          image: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=600&h=400&fit=crop",
          author: "Andi Pratama",
          publishedAt: new Date(Date.now() - 6300000),
          readTime: 4,
          views: 35000,
          comments: 78
        }
      ]
    },
    teknologi: {
      title: 'Teknologi',
      icon: 'Smartphone',
      articles: [
        {
          id: 7,
          title: "Indonesia Luncurkan Satelit Komunikasi Generasi Terbaru",
          excerpt: "Satelit SATRIA-2 akan meningkatkan konektivitas internet di daerah terpencil dan mendukung transformasi digital nasional.",
          image: "https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=600&h=400&fit=crop",
          author: "Dr. Rini Soemarno",
          publishedAt: new Date(Date.now() - 1200000),
          readTime: 8,
          views: 89000,
          comments: 234
        },
        {
          id: 8,
          title: "Gojek dan Tokopedia Merger Resmi Jadi GoTo Group",
          excerpt: "Merger ini menciptakan ekosistem digital terbesar di Asia Tenggara dengan valuasi $35 miliar.",
          image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop",
          author: "Teguh Wijaya",
          publishedAt: new Date(Date.now() - 3900000),
          readTime: 6,
          views: 76000,
          comments: 189
        },
        {
          id: 9,
          title: "AI Buatan Indonesia Menang Kompetisi Internasional",
          excerpt: "Tim dari ITB berhasil mengembangkan AI untuk deteksi dini kanker dengan akurasi 95%.",
          image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=600&h=400&fit=crop",
          author: "Prof. Bambang Riyanto",
          publishedAt: new Date(Date.now() - 5700000),
          readTime: 7,
          views: 52000,
          comments: 145
        }
      ]
    },
    olahraga: {
      title: 'Olahraga',
      icon: 'Trophy',
      articles: [
        {
          id: 10,
          title: "Timnas Indonesia Lolos ke Piala Dunia 2026 untuk Pertama Kali",
          excerpt: "Sejarah baru tercipta setelah Garuda berhasil mengalahkan Australia 2-1 di laga kualifikasi terakhir yang dramatis di Stadion GBK.",
          image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=600&h=400&fit=crop",
          author: "Joko Susilo",
          publishedAt: new Date(Date.now() - 900000),
          readTime: 5,
          views: 156000,
          comments: 567
        },
        {
          id: 11,
          title: "Greysia Polii Raih Medali Emas BWF World Championships",
          excerpt: "Pasangan ganda putri Indonesia berhasil mengalahkan pasangan China di final yang berlangsung sengit.",
          image: "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=600&h=400&fit=crop",
          author: "Maya Sari",
          publishedAt: new Date(Date.now() - 2100000),
          readTime: 4,
          views: 87000,
          comments: 298
        },
        {
          id: 12,
          title: "MotoGP Indonesia 2024 Pecahkan Rekor Penonton",
          excerpt: "Sirkuit Mandalika menjadi tuan rumah balapan dengan 150.000 penonton, rekor tertinggi dalam sejarah MotoGP Indonesia.",
          image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop",
          author: "Rizki Pratama",
          publishedAt: new Date(Date.now() - 4200000),
          readTime: 6,
          views: 94000,
          comments: 187
        }
      ]
    },
    hiburan: {
      title: 'Hiburan',
      icon: 'Music',
      articles: [
        {
          id: 13,
          title: "Film Indonesia 'Laskar Pelangi 2' Raih Standing Ovation di Cannes",
          excerpt: "Sekuel film legendaris karya Andrea Hirata mendapat sambutan luar biasa dari kritikus film internasional di Festival Film Cannes 2024.",
          image: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=600&h=400&fit=crop",
          author: "Dian Sastro",
          publishedAt: new Date(Date.now() - 1500000),
          readTime: 6,
          views: 78000,
          comments: 234
        },
        {
          id: 14,
          title: "Konser Raisa di GBK Sold Out dalam 30 Menit",
          excerpt: "Tiket konser 'Raisa Live in Concert 2024' ludes terjual dengan 80.000 penonton, memecahkan rekor konser solo artis Indonesia.",
          image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&h=400&fit=crop",
          author: "Ario Bayu",
          publishedAt: new Date(Date.now() - 3300000),
          readTime: 4,
          views: 65000,
          comments: 189
        },
        {
          id: 15,
          title: "Netflix Produksi Serial Original Indonesia Terbaru",
          excerpt: "Serial \'Nusantara Chronicles\' akan mengangkat cerita sejarah Majapahit dengan budget produksi $10 juta.",
          image: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=600&h=400&fit=crop",
          author: "Reza Rahadian",
          publishedAt: new Date(Date.now() - 5100000),
          readTime: 5,
          views: 43000,
          comments: 156
        }
      ]
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      {/* Breaking News Ticker */}
      <div className="pt-16">
        <BreakingNewsTicker />
      </div>
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 lg:px-6 py-8">
        {/* Hero Carousel */}
        <HeroCarousel />

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">
            {/* Category Sections */}
            {Object.entries(categoryData)?.map(([category, data]) => (
              <CategorySection
                key={category}
                category={category}
                title={data?.title}
                icon={data?.icon}
                articles={data?.articles}
              />
            ))}
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            <TrendingWidget />
            <WeatherWidget />
            <CurrencyWidget />
            <NewsletterWidget />
          </div>
        </div>
      </main>
      {/* Footer */}
      <footer className="bg-card border-t border-border mt-16">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Brand */}
            <div className="md:col-span-1">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">PB</span>
                </div>
                <div>
                  <h3 className="font-heading font-bold text-lg text-primary">Portal Berita</h3>
                  <p className="font-caption text-xs text-text-secondary">Indonesia</p>
                </div>
              </div>
              <p className="font-body text-sm text-text-secondary mb-4">
                Portal berita terpercaya Indonesia dengan informasi terkini dan akurat.
              </p>
              <div className="flex items-center space-x-3">
                <a href="#" className="text-text-secondary hover:text-primary transition-colors duration-200">
                  <span className="sr-only">Facebook</span>
                  📘
                </a>
                <a href="#" className="text-text-secondary hover:text-primary transition-colors duration-200">
                  <span className="sr-only">Twitter</span>
                  🐦
                </a>
                <a href="#" className="text-text-secondary hover:text-primary transition-colors duration-200">
                  <span className="sr-only">Instagram</span>
                  📷
                </a>
                <a href="#" className="text-text-secondary hover:text-primary transition-colors duration-200">
                  <span className="sr-only">YouTube</span>
                  📺
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-heading font-bold text-sm text-text-primary mb-4">Kategori</h4>
              <ul className="space-y-2">
                {Object.entries(categoryData)?.map(([category, data]) => (
                  <li key={category}>
                    <a
                      href={`/category-listing-page?category=${category}`}
                      className="font-body text-sm text-text-secondary hover:text-primary transition-colors duration-200"
                    >
                      {data?.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 className="font-heading font-bold text-sm text-text-primary mb-4">Perusahaan</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="font-body text-sm text-text-secondary hover:text-primary transition-colors duration-200">
                    Tentang Kami
                  </a>
                </li>
                <li>
                  <a href="#" className="font-body text-sm text-text-secondary hover:text-primary transition-colors duration-200">
                    Tim Redaksi
                  </a>
                </li>
                <li>
                  <a href="#" className="font-body text-sm text-text-secondary hover:text-primary transition-colors duration-200">
                    Karir
                  </a>
                </li>
                <li>
                  <a href="#" className="font-body text-sm text-text-secondary hover:text-primary transition-colors duration-200">
                    Kontak
                  </a>
                </li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h4 className="font-heading font-bold text-sm text-text-primary mb-4">Legal</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="font-body text-sm text-text-secondary hover:text-primary transition-colors duration-200">
                    Kebijakan Privasi
                  </a>
                </li>
                <li>
                  <a href="#" className="font-body text-sm text-text-secondary hover:text-primary transition-colors duration-200">
                    Syarat & Ketentuan
                  </a>
                </li>
                <li>
                  <a href="#" className="font-body text-sm text-text-secondary hover:text-primary transition-colors duration-200">
                    Pedoman Komunitas
                  </a>
                </li>
                <li>
                  <a href="#" className="font-body text-sm text-text-secondary hover:text-primary transition-colors duration-200">
                    Disclaimer
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom */}
          <div className="border-t border-border pt-8 mt-8">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <p className="font-body text-sm text-text-secondary">
                © {new Date()?.getFullYear()} Portal Berita Indonesia. Semua hak dilindungi.
              </p>
              <p className="font-body text-sm text-text-secondary mt-2 md:mt-0">
                Dibuat dengan ❤️ untuk Indonesia
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Homepage;