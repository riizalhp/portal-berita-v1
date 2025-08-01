import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';
import CategoryBanner from './components/CategoryBanner';
import FilterControls from './components/FilterControls';
import SortControls from './components/SortControls';
import ArticleGrid from './components/ArticleGrid';
import Pagination from './components/Pagination';

const CategoryListingPage = () => {
  const [searchParams] = useSearchParams();
  const category = searchParams?.get('category') || 'politik';
  
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState('newest');
  const [filters, setFilters] = useState({
    dateRange: 'all',
    author: 'all',
    tags: []
  });

  const articlesPerPage = 12;
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

  // Mock articles data
  const mockArticles = [
    {
      id: 1,
      title: "Presiden Jokowi Resmikan Proyek Infrastruktur Terbesar di Indonesia Timur",
      excerpt: "Proyek infrastruktur senilai Rp 50 triliun ini diharapkan dapat meningkatkan konektivitas dan perekonomian di wilayah Indonesia Timur.",
      content: `Presiden Joko Widodo secara resmi meresmikan proyek infrastruktur terbesar di Indonesia Timur dengan nilai investasi mencapai Rp 50 triliun.\n\nProyek ini mencakup pembangunan jalan tol, pelabuhan, dan bandara yang akan menghubungkan berbagai daerah di Indonesia Timur.\n\n"Proyek ini akan menjadi game changer bagi perekonomian Indonesia Timur," ujar Presiden dalam sambutannya.`,
      image: "https://images.unsplash.com/photo-1577962917302-cd874c4e31d2?w=800&h=600&fit=crop",
      author: "Ahmad Rizki",
      publishedAt: "2025-01-31T10:30:00Z",
      category: "politik",
      readingTime: 5,
      views: 15420,
      likes: 892,
      comments: 156,
      tags: ["Breaking News", "Infrastruktur"],
      isBreaking: true
    },
    {
      id: 2,
      title: "Bank Indonesia Pertahankan Suku Bunga Acuan di Level 6%",
      excerpt: "Keputusan ini diambil untuk menjaga stabilitas nilai tukar rupiah dan mengendalikan inflasi yang masih dalam target.",
      content: `Bank Indonesia memutuskan untuk mempertahankan suku bunga acuan BI Rate di level 6,00% dalam Rapat Dewan Gubernur bulan ini.\n\nKeputusan ini sejalan dengan upaya menjaga stabilitas nilai tukar rupiah dan mengendalikan inflasi.\n\nGubernur BI menyatakan bahwa kondisi ekonomi global yang masih tidak pasti menjadi pertimbangan utama.`,
      image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&h=600&fit=crop",
      author: "Sari Dewi",
      publishedAt: "2025-01-31T08:15:00Z",
      category: "ekonomi",
      readingTime: 4,
      views: 8750,
      likes: 445,
      comments: 89,
      tags: ["Analisis", "Ekonomi"],
      isBreaking: false
    },
    {
      id: 3,
      title: "Startup Indonesia Raih Pendanaan Seri B Senilai $50 Juta",
      excerpt: "Perusahaan teknologi finansial asal Jakarta berhasil meraih pendanaan untuk ekspansi ke Asia Tenggara.",
      content: `Sebuah startup fintech Indonesia berhasil meraih pendanaan Seri B senilai $50 juta dari investor regional dan global.\n\nDana ini akan digunakan untuk ekspansi ke negara-negara Asia Tenggara dan pengembangan produk baru.\n\nCEO perusahaan menyatakan optimis dapat menjadi unicorn dalam 2 tahun ke depan.`,
      image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800&h=600&fit=crop",
      author: "Budi Santoso",
      publishedAt: "2025-01-31T06:45:00Z",
      category: "teknologi",
      readingTime: 3,
      views: 12300,
      likes: 678,
      comments: 234,
      tags: ["Startup", "Investasi"],
      isBreaking: false
    },
    {
      id: 4,
      title: "Timnas Indonesia Lolos ke Semifinal Piala AFF 2024",
      excerpt: "Kemenangan 2-1 atas Thailand membawa Garuda Muda melangkah ke semifinal dengan penuh percaya diri.",
      content: `Timnas Indonesia berhasil mengalahkan Thailand dengan skor 2-1 dalam pertandingan perempat final Piala AFF 2024.\n\nDua gol kemenangan dicetak oleh Egy Maulana Vikri dan Witan Sulaeman.\n\nPelatih Shin Tae-yong mengapresiasi permainan apik anak asuhnya.`,
      image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&h=600&fit=crop",
      author: "Maya Sari",
      publishedAt: "2025-01-30T20:30:00Z",
      category: "olahraga",
      readingTime: 4,
      views: 25600,
      likes: 1250,
      comments: 445,
      tags: ["Sepak Bola", "Timnas"],
      isBreaking: true
    },
    {
      id: 5,
      title: "Film Indonesia Raih Penghargaan di Festival Cannes",
      excerpt: "Karya sutradara muda Indonesia berhasil meraih penghargaan bergengsi di ajang film internasional.",
      content: `Film Indonesia berjudul 'Senja di Jakarta' berhasil meraih penghargaan Best Director di Festival Film Cannes.\n\nFilm yang disutradarai oleh Riri Riza ini mengangkat tema kehidupan urban di Jakarta.\n\nIni merupakan pencapaian membanggakan bagi perfilman Indonesia.`,
      image: "https://images.unsplash.com/photo-1489599904472-84b0e19e8b0c?w=800&h=600&fit=crop",
      author: "Ahmad Rizki",
      publishedAt: "2025-01-30T15:20:00Z",
      category: "hiburan",
      readingTime: 3,
      views: 9800,
      likes: 567,
      comments: 123,
      tags: ["Film", "Penghargaan"],
      isBreaking: false
    },
    {
      id: 6,
      title: "Menteri Keuangan Bahas Rencana Tax Amnesty Jilid II",
      excerpt: "Program pengampunan pajak kedua diharapkan dapat meningkatkan penerimaan negara dan kepatuhan wajib pajak.",
      content: `Menteri Keuangan Sri Mulyani mengungkapkan rencana pelaksanaan Tax Amnesty jilid II untuk meningkatkan penerimaan pajak.\n\nProgram ini akan memberikan kesempatan kedua bagi wajib pajak yang belum melaporkan asetnya.\n\nPemerintah menargetkan penerimaan tambahan Rp 100 triliun dari program ini.`,
      image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=600&fit=crop",
      author: "Sari Dewi",
      publishedAt: "2025-01-30T12:10:00Z",
      category: "politik",
      readingTime: 5,
      views: 18900,
      likes: 723,
      comments: 267,
      tags: ["Pajak", "Kebijakan"],
      isBreaking: false
    },
    {
      id: 7,
      title: "Harga Minyak Dunia Naik, Pertamina Pertimbangkan Penyesuaian BBM",
      excerpt: "Kenaikan harga minyak mentah dunia memaksa Pertamina untuk mengevaluasi ulang harga bahan bakar minyak domestik.",
      content: `Harga minyak mentah dunia yang naik hingga $85 per barel membuat Pertamina harus mengevaluasi harga BBM domestik.\n\nDirektur Utama Pertamina menyatakan akan melakukan kajian mendalam sebelum mengambil keputusan.\n\nPemerintah diminta untuk memberikan subsidi tambahan jika diperlukan.`,
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop",
      author: "Budi Santoso",
      publishedAt: "2025-01-30T09:30:00Z",
      category: "ekonomi",
      readingTime: 4,
      views: 14200,
      likes: 456,
      comments: 178,
      tags: ["BBM", "Energi"],
      isBreaking: false
    },
    {
      id: 8,
      title: "Peluncuran Satelit Nusantara Satu Sukses Dilakukan",
      excerpt: "Satelit komunikasi buatan Indonesia berhasil diluncurkan dan akan meningkatkan konektivitas internet di daerah terpencil.",
      content: `Satelit Nusantara Satu berhasil diluncurkan dari Cape Canaveral, Amerika Serikat menggunakan roket Falcon 9.\n\nSatelit ini akan meningkatkan konektivitas internet di daerah-daerah terpencil Indonesia.\n\nMenteri Komunikasi dan Informatika menyatakan ini sebagai langkah besar menuju Indonesia digital.`,
      image: "https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=800&h=600&fit=crop",
      author: "Maya Sari",
      publishedAt: "2025-01-29T22:45:00Z",
      category: "teknologi",
      readingTime: 4,
      views: 11500,
      likes: 634,
      comments: 145,
      tags: ["Satelit", "Teknologi"],
      isBreaking: false
    }
  ];

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      let filteredArticles = mockArticles?.filter(article => 
        article?.category === category
      );

      // Apply filters
      if (filters?.dateRange !== 'all') {
        const now = new Date();
        const filterDate = new Date();
        
        switch (filters?.dateRange) {
          case 'today':
            filterDate?.setHours(0, 0, 0, 0);
            break;
          case 'week':
            filterDate?.setDate(now?.getDate() - 7);
            break;
          case 'month':
            filterDate?.setDate(now?.getDate() - 30);
            break;
          case 'year':
            filterDate?.setFullYear(now?.getFullYear() - 1);
            break;
        }
        
        filteredArticles = filteredArticles?.filter(article => 
          new Date(article.publishedAt) >= filterDate
        );
      }

      if (filters?.author !== 'all') {
        const authorName = filters?.author?.replace('-', ' ')?.replace(/\b\w/g, l => l?.toUpperCase());
        filteredArticles = filteredArticles?.filter(article => 
          article?.author === authorName
        );
      }

      if (filters?.tags && filters?.tags?.length > 0) {
        filteredArticles = filteredArticles?.filter(article =>
          article?.tags && article?.tags?.some(tag => filters?.tags?.includes(tag))
        );
      }

      // Apply sorting
      switch (sortBy) {
        case 'popular':
          filteredArticles?.sort((a, b) => (b?.views || 0) - (a?.views || 0));
          break;
        case 'trending':
          filteredArticles?.sort((a, b) => (b?.likes || 0) - (a?.likes || 0));
          break;
        case 'oldest':
          filteredArticles?.sort((a, b) => new Date(a.publishedAt) - new Date(b.publishedAt));
          break;
        default: // newest
          filteredArticles?.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));
      }

      setArticles(filteredArticles);
      setLoading(false);
    }, 800);
  }, [category, filters, sortBy]);

  const totalPages = Math.ceil(articles?.length / articlesPerPage);
  const currentArticles = articles?.slice(
    (currentPage - 1) * articlesPerPage,
    currentPage * articlesPerPage
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    setCurrentPage(1);
  };

  const handleSortChange = (newSort) => {
    setSortBy(newSort);
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        <CategoryBanner category={category} articleCount={articles?.length} />
        
        <div className="max-w-7xl mx-auto px-4 lg:px-6 py-8">
          <Breadcrumb />
          
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Desktop Sidebar */}
            {!isMobile && (
              <aside className="w-80 flex-shrink-0">
                <FilterControls
                  filters={filters}
                  onFilterChange={handleFilterChange}
                  onSortChange={handleSortChange}
                  sortBy={sortBy}
                  isMobile={false}
                />
              </aside>
            )}

            {/* Main Content */}
            <div className="flex-1">
              {/* Mobile Filters */}
              {isMobile && (
                <FilterControls
                  filters={filters}
                  onFilterChange={handleFilterChange}
                  onSortChange={handleSortChange}
                  sortBy={sortBy}
                  isMobile={true}
                />
              )}

              {/* Sort Controls */}
              <SortControls
                sortBy={sortBy}
                onSortChange={handleSortChange}
                totalResults={articles?.length}
                currentPage={currentPage}
                articlesPerPage={articlesPerPage}
              />

              {/* Articles Grid */}
              <ArticleGrid articles={currentArticles} loading={loading} />

              {/* Pagination */}
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
                totalArticles={articles?.length}
                articlesPerPage={articlesPerPage}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CategoryListingPage;