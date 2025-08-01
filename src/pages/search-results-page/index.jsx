import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';
import SearchComponent from '../../components/ui/SearchComponent';
import SearchFilters from './components/SearchFilters';
import SearchResults from './components/SearchResults';
import SearchSuggestions from './components/SearchSuggestions';
import ActiveFilters from './components/ActiveFilters';
import SearchMetadata from './components/SearchMetadata';
import NoResults from './components/NoResults';
import SearchPagination from './components/SearchPagination';

const SearchResultsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams?.get('q') || '';

  const [isLoading, setIsLoading] = useState(true);
  const [searchResults, setSearchResults] = useState([]);
  const [totalResults, setTotalResults] = useState(0);
  const [searchDuration, setSearchDuration] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState('relevance');
  const [filters, setFilters] = useState({
    category: 'all',
    dateRange: 'all',
    author: 'all',
    hasImage: false,
    hasVideo: false,
    isTrending: false
  });

  const resultsPerPage = 10;

  // Mock search results data
  const mockSearchResults = [
    {
      id: 1,
      title: "Pemilu 2024: Strategi Digital Capres dalam Menjangkau Pemilih Milenial",
      excerpt: "Calon presiden berlomba menggunakan platform digital untuk menarik perhatian pemilih muda. Strategi media sosial menjadi kunci utama kampanye politik modern.",
      content: `Menjelang Pemilu 2024, para calon presiden semakin gencar menggunakan strategi digital untuk menjangkau pemilih milenial dan Gen Z.\n\nPlatform media sosial seperti TikTok, Instagram, dan Twitter menjadi medan pertempuran baru dalam politik Indonesia.\n\nData menunjukkan bahwa 60% pemilih muda mendapatkan informasi politik dari media sosial.`,
      image: "https://images.pexels.com/photos/6077326/pexels-photo-6077326.jpeg?auto=compress&cs=tinysrgb&w=800",
      category: "politik",
      author: "Ahmad Rizki",
      publishedAt: "2025-01-30T10:30:00Z",
      readTime: 5,
      views: 15420,
      tags: ["pemilu2024", "digital", "milenial", "politik"],
      isTrending: true
    },
    {
      id: 2,
      title: "Ekonomi Digital Indonesia Tumbuh 25% di Tahun 2024",
      excerpt: "Sektor ekonomi digital Indonesia mengalami pertumbuhan signifikan dengan kontribusi terhadap PDB mencapai 8.2%. E-commerce dan fintech menjadi pendorong utama.",
      content: `Ekonomi digital Indonesia mencatat pertumbuhan yang mengesankan sepanjang tahun 2024.\n\nSektor e-commerce tumbuh 30% dengan nilai transaksi mencapai Rp 500 triliun.\n\nFintech juga berkontribusi besar dengan peningkatan pengguna digital banking sebesar 40%.`,
      image: "https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=800",
      category: "ekonomi",
      author: "Sari Dewi",
      publishedAt: "2025-01-29T14:15:00Z",
      readTime: 7,
      views: 12350,
      tags: ["ekonomi", "digital", "ecommerce", "fintech"],
      isTrending: false
    },
    {
      id: 3,
      title: "Teknologi AI Generative Mulai Diterapkan di Sektor Pendidikan Indonesia",
      excerpt: "Universitas dan sekolah di Indonesia mulai mengadopsi teknologi AI untuk meningkatkan kualitas pembelajaran. ChatGPT dan tools AI lainnya diintegrasikan dalam kurikulum.",
      content: `Revolusi AI dalam pendidikan Indonesia telah dimulai dengan adopsi teknologi generative AI.\n\nBerbagai institusi pendidikan mulai mengintegrasikan ChatGPT dan tools AI lainnya.\n\nHasil penelitian menunjukkan peningkatan engagement siswa hingga 45%.`,
      image: "https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=800",
      category: "teknologi",
      author: "Budi Santoso",
      publishedAt: "2025-01-28T09:45:00Z",
      readTime: 6,
      views: 9870,
      tags: ["AI", "pendidikan", "teknologi", "chatgpt"],
      isTrending: true
    },
    {
      id: 4,
      title: "Timnas Indonesia Lolos ke Piala Asia 2024 Setelah Mengalahkan Thailand 2-1",
      excerpt: "Kemenangan dramatis Timnas Indonesia atas Thailand dengan skor 2-1 memastikan lolos ke babak selanjutnya Piala Asia. Gol kemenangan dicetak di menit ke-89.",
      content: `Timnas Indonesia berhasil meraih kemenangan penting melawan Thailand.\n\nPertandingan berlangsung sengit dengan Thailand unggul lebih dulu di babak pertama.\n\nGol balasan Indonesia dicetak oleh Egy Maulana Vikri dan Witan Sulaeman.`,
      image: "https://images.pexels.com/photos/274506/pexels-photo-274506.jpeg?auto=compress&cs=tinysrgb&w=800",
      category: "olahraga",
      author: "Maya Sari",
      publishedAt: "2025-01-27T20:30:00Z",
      readTime: 4,
      views: 25600,
      tags: ["timnas", "sepakbola", "piala-asia", "indonesia"],
      isTrending: true
    },
    {
      id: 5,
      title: "Film Indonesia 'Laskar Pelangi 2' Raih Penghargaan di Festival Film Internasional",
      excerpt: "Film sequel Laskar Pelangi berhasil meraih penghargaan Best Cinematography di Festival Film Asia Pasifik. Sutradara Riri Riza mengungkapkan kebanggaannya.",
      content: `Film Laskar Pelangi 2 kembali mengharumkan nama Indonesia di kancah internasional.\n\nPenghargaan Best Cinematography diraih dalam kompetisi ketat dengan 50 film dari berbagai negara.\n\nSutradara Riri Riza menyampaikan terima kasih kepada seluruh tim produksi.`,
      image: "https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=800",
      category: "hiburan",
      author: "Andi Wijaya",
      publishedAt: "2025-01-26T16:20:00Z",
      readTime: 5,
      views: 8940,
      tags: ["film", "indonesia", "penghargaan", "laskar-pelangi"],
      isTrending: false
    }
  ];

  // Simulate search functionality
  useEffect(() => {
    const performSearch = async () => {
      setIsLoading(true);
      const startTime = performance.now();
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      let filteredResults = mockSearchResults;
      
      // Filter by search query
      if (query) {
        filteredResults = filteredResults?.filter(article =>
          article?.title?.toLowerCase()?.includes(query?.toLowerCase()) ||
          article?.excerpt?.toLowerCase()?.includes(query?.toLowerCase()) ||
          article?.content?.toLowerCase()?.includes(query?.toLowerCase()) ||
          article?.tags?.some(tag => tag?.toLowerCase()?.includes(query?.toLowerCase()))
        );
      }
      
      // Apply filters
      if (filters?.category !== 'all') {
        filteredResults = filteredResults?.filter(article => article?.category === filters?.category);
      }
      
      if (filters?.author !== 'all') {
        filteredResults = filteredResults?.filter(article => 
          article?.author?.toLowerCase()?.replace(' ', '-') === filters?.author
        );
      }
      
      if (filters?.hasImage) {
        filteredResults = filteredResults?.filter(article => article?.image);
      }
      
      if (filters?.isTrending) {
        filteredResults = filteredResults?.filter(article => article?.isTrending);
      }
      
      // Apply sorting
      switch (sortBy) {
        case 'date':
          filteredResults?.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));
          break;
        case 'popularity':
          filteredResults?.sort((a, b) => b?.views - a?.views);
          break;
        case 'relevance':
        default:
          // Keep original order for relevance
          break;
      }
      
      const endTime = performance.now();
      setSearchDuration((endTime - startTime) / 1000);
      setTotalResults(filteredResults?.length);
      
      // Paginate results
      const startIndex = (currentPage - 1) * resultsPerPage;
      const paginatedResults = filteredResults?.slice(startIndex, startIndex + resultsPerPage);
      
      setSearchResults(paginatedResults);
      setIsLoading(false);
    };

    performSearch();
  }, [query, filters, sortBy, currentPage]);

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
    setCurrentPage(1);
  };

  const handleRemoveFilter = (filterKey) => {
    const newFilters = { ...filters };
    if (filterKey === 'hasImage' || filterKey === 'hasVideo' || filterKey === 'isTrending') {
      newFilters[filterKey] = false;
    } else {
      newFilters[filterKey] = 'all';
    }
    setFilters(newFilters);
    setCurrentPage(1);
  };

  const handleClearAllFilters = () => {
    setFilters({
      category: 'all',
      dateRange: 'all',
      author: 'all',
      hasImage: false,
      hasVideo: false,
      isTrending: false
    });
    setCurrentPage(1);
  };

  const handleSortChange = (newSortBy) => {
    setSortBy(newSortBy);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSuggestionClick = (suggestion) => {
    navigate(`/search-results-page?q=${encodeURIComponent(suggestion)}`);
  };

  const handleNewSearch = (newQuery) => {
    navigate(`/search-results-page?q=${encodeURIComponent(newQuery)}`);
  };

  const getActiveFilters = () => {
    const active = {};
    Object.entries(filters)?.forEach(([key, value]) => {
      if (value && value !== 'all' && value !== false) {
        active[key] = value;
      }
    });
    return active;
  };

  const totalPages = Math.ceil(totalResults / resultsPerPage);
  const hasResults = searchResults?.length > 0;
  const activeFilters = getActiveFilters();

  return (
    <>
      <Helmet>
        <title>{query ? `Hasil Pencarian: ${query} - Portal Berita Indonesia` : 'Pencarian - Portal Berita Indonesia'}</title>
        <meta name="description" content={`Hasil pencarian untuk "${query}" di Portal Berita Indonesia. Temukan berita terkini seputar politik, ekonomi, teknologi, olahraga, dan hiburan.`} />
        <meta name="keywords" content={`pencarian, ${query}, berita indonesia, portal berita`} />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Header />
        
        <main className="pt-16">
          <div className="max-w-7xl mx-auto px-4 lg:px-6 py-8">
            <Breadcrumb />
            
            {/* Search Header */}
            <div className="mb-8">
              <div className="max-w-2xl mx-auto lg:max-w-none">
                <SearchComponent variant="full" />
              </div>
            </div>

            <div className="lg:grid lg:grid-cols-12 lg:gap-8">
              {/* Sidebar - Filters */}
              <aside className="lg:col-span-3 mb-8 lg:mb-0">
                <div className="sticky top-24 space-y-6">
                  <SearchFilters
                    filters={filters}
                    onFiltersChange={handleFiltersChange}
                    activeFilters={activeFilters}
                    onClearFilters={handleClearAllFilters}
                  />
                  
                  {/* Search Suggestions - Desktop Only */}
                  <div className="hidden lg:block">
                    <SearchSuggestions
                      query={query}
                      onSuggestionClick={handleSuggestionClick}
                    />
                  </div>
                </div>
              </aside>

              {/* Main Content */}
              <div className="lg:col-span-9">
                {query && (
                  <SearchMetadata
                    query={query}
                    resultsCount={searchResults?.length}
                    searchDuration={searchDuration}
                    totalResults={totalResults}
                  />
                )}

                <ActiveFilters
                  activeFilters={activeFilters}
                  onRemoveFilter={handleRemoveFilter}
                  onClearAll={handleClearAllFilters}
                />

                {!isLoading && !hasResults && query ? (
                  <NoResults
                    query={query}
                    onNewSearch={handleNewSearch}
                  />
                ) : (
                  <>
                    <SearchResults
                      results={searchResults}
                      query={query}
                      isLoading={isLoading}
                      sortBy={sortBy}
                      onSortChange={handleSortChange}
                    />

                    {!isLoading && hasResults && (
                      <div className="mt-8">
                        <SearchPagination
                          currentPage={currentPage}
                          totalPages={totalPages}
                          totalResults={totalResults}
                          resultsPerPage={resultsPerPage}
                          onPageChange={handlePageChange}
                          hasMore={currentPage < totalPages}
                          isLoading={isLoading}
                        />
                      </div>
                    )}
                  </>
                )}

                {/* Mobile Search Suggestions */}
                <div className="lg:hidden mt-8">
                  <SearchSuggestions
                    query={query}
                    onSuggestionClick={handleSuggestionClick}
                  />
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default SearchResultsPage;