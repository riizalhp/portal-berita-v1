import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';
import ArticleHeader from './components/ArticleHeader';
import ReadingProgressBar from './components/ReadingProgressBar';
import SocialShareButtons from './components/SocialShareButtons';
import ArticleContent from './components/ArticleContent';
import ArticleTags from './components/ArticleTags';
import RelatedArticles from './components/RelatedArticles';
import CommentSection from './components/CommentSection';
import TrendingSidebar from './components/TrendingSidebar';

const ArticleDetailPage = () => {
  const [searchParams] = useSearchParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);

  // Mock article data
  const mockArticles = {
    1: {
      id: 1,
      title: "Pemerintah Indonesia Luncurkan Program Digitalisasi UMKM Nasional 2024",
      subtitle: "Inisiatif baru ini bertujuan untuk meningkatkan daya saing usaha mikro, kecil, dan menengah di era digital dengan dukungan teknologi terdepan.",
      category: "ekonomi",
      image: "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg",
      author: {
        name: "Dr. Sari Indrawati",
        role: "Editor Ekonomi",
        avatar: "https://randomuser.me/api/portraits/women/5.jpg"
      },
      publishedAt: new Date('2024-01-31T10:30:00'),
      views: 15420,
      content: `Program digitalisasi UMKM yang diluncurkan pemerintah Indonesia pada hari ini menandai langkah besar dalam transformasi ekonomi digital nasional. Inisiatif ambisius ini melibatkan kerjasama antara Kementerian Koperasi dan UKM, Kementerian Komunikasi dan Informatika, serta berbagai stakeholder swasta.

## Latar Belakang Program

Pandemi COVID-19 telah mengubah lanskap bisnis secara fundamental, memaksa pelaku UMKM untuk beradaptasi dengan teknologi digital. Data menunjukkan bahwa hanya 30% UMKM di Indonesia yang telah memanfaatkan platform digital untuk pemasaran dan penjualan produk mereka.

"Kami melihat kesenjangan digital yang signifikan di sektor UMKM. Program ini hadir untuk menjembatani gap tersebut dan memastikan tidak ada yang tertinggal dalam era transformasi digital," ungkap Menteri Koperasi dan UKM dalam konferensi pers hari ini.

### Target dan Sasaran

Program ini menargetkan 2 juta UMKM di seluruh Indonesia dalam fase pertama yang akan berlangsung hingga akhir 2024. Fokus utama meliputi:

- Pelatihan literasi digital dasar
- Bantuan pembuatan website dan toko online
- Integrasi sistem pembayaran digital
- Pemasaran digital dan media sosial
- Manajemen inventori berbasis cloud

## Dukungan Teknologi dan Platform

Pemerintah telah menggandeng berbagai perusahaan teknologi terkemuka untuk menyediakan infrastruktur dan platform yang dibutuhkan. Kerjasama ini mencakup penyediaan hosting gratis, domain, dan akses ke berbagai tools marketing digital.

"Transformasi digital bukan hanya tentang teknologi, tetapi juga tentang mindset dan kemampuan adaptasi. Kami berkomitmen memberikan pendampingan menyeluruh kepada para pelaku UMKM," tambah Direktur Jenderal Perdagangan Dalam Negeri.

### Implementasi Bertahap

Pelaksanaan program akan dilakukan secara bertahap dimulai dari daerah-daerah dengan konsentrasi UMKM tertinggi. Setiap peserta akan mendapat pendampingan intensif selama 6 bulan dengan mentor berpengalaman di bidang digital marketing dan e-commerce.

Program ini juga menyediakan akses ke marketplace lokal dengan komisi khusus dan dukungan promosi untuk produk-produk UMKM yang telah terdigitalisasi.

## Dampak Ekonomi yang Diharapkan

Berdasarkan studi kelayakan yang telah dilakukan, program digitalisasi UMKM diproyeksikan dapat meningkatkan omzet rata-rata peserta hingga 40% dalam tahun pertama. Selain itu, program ini juga diharapkan dapat menciptakan ekosistem digital yang berkelanjutan di tingkat grassroot.

"Kami optimis program ini akan menjadi game changer bagi perekonomian nasional, terutama dalam meningkatkan kontribusi UMKM terhadap PDB Indonesia," tutup Menteri Koperasi dan UKM.

Pendaftaran program telah dibuka melalui portal resmi pemerintah dan akan berlangsung hingga akhir Februari 2024.`,
      tags: ["UMKM", "Digitalisasi", "Ekonomi Digital", "Pemerintah", "Teknologi", "Koperasi"],
      gallery: [
        {
          url: "https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg",
          caption: "Peluncuran program digitalisasi UMKM di Jakarta"
        },
        {
          url: "https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg",
          caption: "Pelatihan digital marketing untuk pelaku UMKM"
        },
        {
          url: "https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg",
          caption: "Workshop pembuatan toko online"
        }
      ]
    },
    2: {
      id: 2,
      title: "Timnas Indonesia Raih Kemenangan Gemilang 3-1 Atas Thailand",
      subtitle: "Pertandingan spektakuler di Stadion Gelora Bung Karno menunjukkan performa terbaik skuad Garuda dalam beberapa tahun terakhir.",
      category: "olahraga",
      image: "https://images.pexels.com/photos/274506/pexels-photo-274506.jpeg",
      author: {
        name: "Bambang Sutrisno",
        role: "Reporter Olahraga",
        avatar: "https://randomuser.me/api/portraits/men/8.jpg"
      },
      publishedAt: new Date('2024-01-30T21:45:00'),
      views: 28750,
      content: `Stadion Gelora Bung Karno menjadi saksi kebangkitan Timnas Indonesia dengan kemenangan telak 3-1 atas Thailand dalam laga persahabatan yang berlangsung malam ini. Pertandingan yang disaksikan 78.000 penonton ini menampilkan permainan terbaik skuad Garuda dalam beberapa tahun terakhir.

## Jalannya Pertandingan

Laga dimulai dengan tempo tinggi dari kedua tim. Indonesia tampil agresif sejak menit awal dengan menguasai possession dan menciptakan beberapa peluang berbahaya. Gol pembuka datang di menit ke-23 melalui tendangan keras Egy Maulana Vikri yang memanfaatkan umpan silang sempurna dari Pratama Arhan.

"Kami sudah mempersiapkan strategi ini dengan matang. Tim Thailand memang kuat, tapi kami yakin dengan kemampuan pemain-pemain muda Indonesia," ungkap Shin Tae-yong, pelatih Timnas Indonesia, dalam konferensi pers pasca pertandingan.

### Dominasi Babak Kedua

Memasuki babak kedua, Indonesia semakin menunjukkan dominasinya. Gol kedua tercipta di menit ke-58 melalui sundulan Marselino Ferdinan yang memanfaatkan corner kick dari Witan Sulaeman. Stadion langsung bergemuruh dengan sorakan 78.000 penonton yang hadir.

Thailand sempat memperkecil kedudukan di menit ke-71 melalui Chanathip Songkrasin, namun semangat juang Indonesia tidak surut. Gol penutup datang di menit ke-85 melalui tendangan penalti yang dieksekusi dengan sempurna oleh Rizky Ridho.

## Performa Individu yang Memukau

Beberapa pemain Indonesia menunjukkan performa luar biasa dalam pertandingan ini. Egy Maulana Vikri tampil sebagai man of the match dengan satu gol dan dua assist. Sementara itu, Pratama Arhan konsisten memberikan umpan-umpan berkualitas dari sisi kiri.

"Ini adalah hasil kerja keras seluruh tim. Kami telah berlatih dengan intensitas tinggi selama berminggu-minggu untuk pertandingan ini," kata Egy Maulana Vikri saat diwawancarai di lapangan.

### Strategi Taktik yang Efektif

Shin Tae-yong menerapkan formasi 4-3-3 dengan penekanan pada permainan sayap yang cepat dan pressing tinggi. Strategi ini terbukti efektif mengacaukan ritme permainan Thailand yang terkenal dengan passing game mereka.

Lini tengah Indonesia yang diisi oleh Marselino Ferdinan, Witan Sulaeman, dan Saddil Ramdani berhasil menguasai tempo permainan dan menciptakan banyak peluang untuk para penyerang.

## Reaksi Suporter dan Media

Kemenangan ini mendapat sambutan luar biasa dari suporter Indonesia yang memadati media sosial dengan ucapan selamat dan dukungan. Hashtag #GarudaMuda trending di Twitter Indonesia dengan lebih dari 500.000 tweet dalam 2 jam pasca pertandingan.

Media Thailand juga memberikan apresiasi terhadap permainan Indonesia, dengan Bangkok Post menulis: "Indonesia menunjukkan football yang indah dan pantas mendapat kemenangan ini."

Kemenangan ini sekaligus menjadi modal penting bagi Timnas Indonesia menjelang turnamen regional yang akan datang dan semakin memperkuat posisi mereka di ranking FIFA.`,
      tags: ["Timnas Indonesia", "Sepak Bola", "Thailand", "Shin Tae-yong", "Egy Maulana", "GBK"],
      gallery: [
        {
          url: "https://images.pexels.com/photos/1884574/pexels-photo-1884574.jpeg",
          caption: "Selebrasi gol pertama Egy Maulana Vikri"
        },
        {
          url: "https://images.pexels.com/photos/1884576/pexels-photo-1884576.jpeg",
          caption: "Suporter Indonesia memadati Stadion GBK"
        }
      ]
    }
  };

  const relatedArticles = [
    {
      id: 3,
      title: "Startup Fintech Indonesia Raih Pendanaan $25 Juta",
      category: "Teknologi",
      image: "https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg",
      excerpt: "Perusahaan fintech lokal berhasil meraih pendanaan seri B untuk ekspansi ke Asia Tenggara.",
      publishedAt: new Date('2024-01-30T14:20:00')
    },
    {
      id: 4,
      title: "Bank Indonesia Pertahankan Suku Bunga Acuan 6%",
      category: "Ekonomi",
      image: "https://images.pexels.com/photos/259027/pexels-photo-259027.jpeg",
      excerpt: "Keputusan ini diambil untuk menjaga stabilitas nilai tukar rupiah dan inflasi.",
      publishedAt: new Date('2024-01-29T16:45:00')
    },
    {
      id: 5,
      title: "Film Indonesia 'Laskar Pelangi 2' Raih Standing Ovation di Cannes",
      category: "Hiburan",
      image: "https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg",
      excerpt: "Karya sutradara muda Indonesia mendapat apresiasi tinggi dari kritikus film internasional.",
      publishedAt: new Date('2024-01-28T19:30:00')
    }
  ];

  useEffect(() => {
    // Simulate loading and get article data
    const articleId = searchParams.get('id') || '1';
    
    setTimeout(() => {
      const foundArticle = mockArticles[articleId];
      if (foundArticle) {
        setArticle(foundArticle);
      } else {
        // Default to first article if not found
        setArticle(mockArticles[1]);
      }
      setLoading(false);
    }, 500);

    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, [searchParams]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="pt-16">
          <div className="max-w-7xl mx-auto px-4 lg:px-6 py-8">
            <div className="animate-pulse">
              <div className="h-4 bg-muted rounded w-1/3 mb-6"></div>
              <div className="h-64 md:h-96 bg-muted rounded-lg mb-6"></div>
              <div className="h-8 bg-muted rounded w-3/4 mb-4"></div>
              <div className="h-4 bg-muted rounded w-1/2 mb-8"></div>
              <div className="space-y-4">
                <div className="h-4 bg-muted rounded"></div>
                <div className="h-4 bg-muted rounded"></div>
                <div className="h-4 bg-muted rounded w-5/6"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="pt-16">
          <div className="max-w-7xl mx-auto px-4 lg:px-6 py-8">
            <div className="text-center">
              <h1 className="font-heading font-bold text-2xl text-text-primary mb-4">
                Artikel Tidak Ditemukan
              </h1>
              <p className="font-body text-text-secondary">
                Artikel yang Anda cari tidak tersedia atau telah dihapus.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <ReadingProgressBar />
      <SocialShareButtons article={article} variant="floating" />
      
      <div className="pt-16">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 py-8">
          <Breadcrumb />
          
          <div className="flex gap-8">
            {/* Main Content */}
            <div className="flex-1 max-w-4xl">
              <article>
                <ArticleHeader article={article} />
                <ArticleContent content={article.content} gallery={article.gallery} />
                <ArticleTags tags={article.tags} />
                
                {/* Mobile Social Share */}
                <div className="lg:hidden">
                  <SocialShareButtons article={article} variant="inline" />
                </div>
                
                <RelatedArticles articles={relatedArticles} />
                <CommentSection articleId={article.id} />
              </article>
            </div>
            
            {/* Sidebar */}
            <TrendingSidebar />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleDetailPage;