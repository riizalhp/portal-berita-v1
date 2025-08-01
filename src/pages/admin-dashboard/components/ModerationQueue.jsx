import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const ModerationQueue = () => {
  const [pendingComments, setPendingComments] = useState([
    {
      id: 1,
      author: 'Ahmad Rahman',
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
      content: 'Artikel yang sangat informatif! Terima kasih sudah berbagi informasi yang bermanfaat ini.',
      article: 'Perkembangan Ekonomi Digital Indonesia',
      timestamp: '5 menit yang lalu',
      status: 'pending'
    },
    {
      id: 2,
      author: 'Siti Nurhaliza',
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
      content: 'Saya kurang setuju dengan pendapat ini. Menurut saya ada beberapa aspek yang perlu dipertimbangkan lebih lanjut.',
      article: 'Teknologi AI dalam Pendidikan',
      timestamp: '12 menit yang lalu',
      status: 'pending'
    },
    {
      id: 3,
      author: 'Budi Santoso',
      avatar: 'https://randomuser.me/api/portraits/men/56.jpg',
      content: 'Kapan update selanjutnya akan dirilis? Saya sangat menantikan perkembangan lebih lanjut.',
      article: 'Update Pemilu 2024 Terkini',
      timestamp: '18 menit yang lalu',
      status: 'pending'
    },
    {
      id: 4,
      author: 'Maya Putri',
      avatar: 'https://randomuser.me/api/portraits/women/28.jpg',
      content: 'Terima kasih atas artikelnya. Sangat membantu untuk memahami situasi terkini.',
      article: 'Sepak Bola Liga Indonesia',
      timestamp: '25 menit yang lalu',
      status: 'pending'
    }
  ]);

  const handleApprove = (commentId) => {
    setPendingComments(prev => 
      prev?.map(comment => 
        comment?.id === commentId 
          ? { ...comment, status: 'approved' }
          : comment
      )?.filter(comment => comment?.status === 'pending')
    );
  };

  const handleReject = (commentId) => {
    setPendingComments(prev => 
      prev?.map(comment => 
        comment?.id === commentId 
          ? { ...comment, status: 'rejected' }
          : comment
      )?.filter(comment => comment?.status === 'pending')
    );
  };

  const userManagementItems = [
    {
      title: 'Pengguna Aktif',
      count: '1,234',
      icon: 'Users',
      color: 'success'
    },
    {
      title: 'Pengguna Baru Hari Ini',
      count: '23',
      icon: 'UserPlus',
      color: 'primary'
    },
    {
      title: 'Laporan Spam',
      count: '5',
      icon: 'AlertTriangle',
      color: 'warning'
    },
    {
      title: 'Akun Diblokir',
      count: '12',
      icon: 'UserX',
      color: 'error'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Moderation Queue */}
      <div className="bg-card border border-border rounded-lg">
        <div className="p-6 border-b border-border">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-heading font-semibold text-text-primary">
              Antrian Moderasi Komentar
            </h2>
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-warning text-warning-foreground rounded-full flex items-center justify-center text-xs font-bold">
                {pendingComments?.length}
              </div>
              <Button variant="outline" size="sm" iconName="RefreshCw">
                Refresh
              </Button>
            </div>
          </div>
        </div>
        
        <div className="divide-y divide-border max-h-96 overflow-y-auto">
          {pendingComments?.length > 0 ? (
            pendingComments?.map((comment) => (
              <div key={comment?.id} className="p-4">
                <div className="flex items-start space-x-3">
                  <Image
                    src={comment?.avatar}
                    alt={comment?.author}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-2">
                      <h4 className="font-body font-medium text-text-primary">
                        {comment?.author}
                      </h4>
                      <span className="text-xs text-text-secondary">
                        {comment?.timestamp}
                      </span>
                    </div>
                    <p className="text-sm font-body text-text-primary mb-2 leading-relaxed">
                      {comment?.content}
                    </p>
                    <div className="flex items-center space-x-2 text-xs text-text-secondary mb-3">
                      <Icon name="FileText" size={12} />
                      <span>Artikel: {comment?.article}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="xs"
                        iconName="Check"
                        iconPosition="left"
                        onClick={() => handleApprove(comment?.id)}
                      >
                        Setujui
                      </Button>
                      <Button
                        variant="destructive"
                        size="xs"
                        iconName="X"
                        iconPosition="left"
                        onClick={() => handleReject(comment?.id)}
                      >
                        Tolak
                      </Button>
                      <Button
                        variant="ghost"
                        size="xs"
                        iconName="Eye"
                        iconPosition="left"
                      >
                        Lihat Artikel
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="p-8 text-center">
              <Icon name="CheckCircle" size={48} className="text-success mx-auto mb-4" />
              <h3 className="font-heading font-medium text-text-primary mb-2">
                Semua Komentar Sudah Dimoderasi
              </h3>
              <p className="text-sm text-text-secondary">
                Tidak ada komentar yang memerlukan persetujuan saat ini.
              </p>
            </div>
          )}
        </div>
      </div>
      {/* User Management */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h2 className="text-lg font-heading font-semibold text-text-primary mb-4">
          Manajemen Pengguna
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {userManagementItems?.map((item, index) => (
            <div
              key={index}
              className="p-4 border border-border rounded-lg hover:border-primary/50 hover:shadow-card transition-all duration-200 cursor-pointer"
            >
              <div className="flex items-center space-x-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                  item?.color === 'success' ? 'bg-success text-success-foreground' :
                  item?.color === 'warning' ? 'bg-warning text-warning-foreground' :
                  item?.color === 'error' ? 'bg-error text-error-foreground' :
                  'bg-primary text-primary-foreground'
                }`}>
                  <Icon name={item?.icon} size={20} />
                </div>
                <div>
                  <h3 className="text-xl font-heading font-bold text-text-primary">
                    {item?.count}
                  </h3>
                  <p className="text-sm font-body text-text-secondary">
                    {item?.title}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4">
          <Button variant="outline" fullWidth>
            Kelola Semua Pengguna
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ModerationQueue;