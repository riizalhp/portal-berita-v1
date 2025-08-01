import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ActivityFeed = () => {
  const activities = [
    {
      id: 1,
      type: 'article_published',
      title: 'Perkembangan Ekonomi Digital Indonesia Meningkat Pesat',
      author: 'Sarah Wijaya',
      timestamp: '2 menit yang lalu',
      category: 'Ekonomi',
      icon: 'FileText',
      color: 'success'
    },
    {
      id: 2,
      type: 'comment_pending',
      title: 'Komentar baru memerlukan moderasi',
      author: 'Ahmad Rahman',
      timestamp: '5 menit yang lalu',
      article: 'Teknologi AI dalam Pendidikan',
      icon: 'MessageSquare',
      color: 'warning'
    },
    {
      id: 3,
      type: 'article_draft',
      title: 'Draft artikel tersimpan otomatis',
      author: 'Rina Sari',
      timestamp: '10 menit yang lalu',
      category: 'Politik',
      icon: 'Edit3',
      color: 'primary'
    },
    {
      id: 4,
      type: 'user_registered',
      title: 'Pengguna baru mendaftar',
      author: 'Budi Santoso',
      timestamp: '15 menit yang lalu',
      icon: 'UserPlus',
      color: 'accent'
    },
    {
      id: 5,
      type: 'article_scheduled',
      title: 'Artikel dijadwalkan untuk publikasi',
      author: 'Maya Putri',
      timestamp: '20 menit yang lalu',
      scheduledTime: 'Besok, 08:00',
      icon: 'Clock',
      color: 'secondary'
    }
  ];

  const getIconColor = (color) => {
    switch (color) {
      case 'success': return 'text-success';
      case 'warning': return 'text-warning';
      case 'error': return 'text-error';
      case 'accent': return 'text-accent';
      case 'secondary': return 'text-secondary';
      default: return 'text-primary';
    }
  };

  const getActionButton = (activity) => {
    switch (activity?.type) {
      case 'comment_pending':
        return (
          <div className="flex space-x-2">
            <Button variant="outline" size="xs">
              Setujui
            </Button>
            <Button variant="destructive" size="xs">
              Tolak
            </Button>
          </div>
        );
      case 'article_draft':
        return (
          <Button variant="outline" size="xs">
            Lanjutkan Edit
          </Button>
        );
      case 'article_scheduled':
        return (
          <Button variant="outline" size="xs">
            Lihat Jadwal
          </Button>
        );
      default:
        return (
          <Button variant="ghost" size="xs">
            Lihat Detail
          </Button>
        );
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-heading font-semibold text-text-primary">Aktivitas Terbaru</h2>
          <Button variant="ghost" size="sm" iconName="RefreshCw" iconPosition="left">
            Refresh
          </Button>
        </div>
      </div>
      <div className="divide-y divide-border max-h-96 overflow-y-auto">
        {activities?.map((activity) => (
          <div key={activity?.id} className="p-4 hover:bg-muted/50 transition-colors duration-200">
            <div className="flex items-start space-x-3">
              <div className={`w-8 h-8 rounded-full bg-muted flex items-center justify-center flex-shrink-0 ${getIconColor(activity?.color)}`}>
                <Icon name={activity?.icon} size={16} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="text-sm font-body font-medium text-text-primary mb-1">
                      {activity?.title}
                    </p>
                    <div className="flex items-center space-x-2 text-xs text-text-secondary">
                      <span>oleh {activity?.author}</span>
                      <span>•</span>
                      <span>{activity?.timestamp}</span>
                      {activity?.category && (
                        <>
                          <span>•</span>
                          <span className="text-primary">{activity?.category}</span>
                        </>
                      )}
                      {activity?.scheduledTime && (
                        <>
                          <span>•</span>
                          <span className="text-warning">{activity?.scheduledTime}</span>
                        </>
                      )}
                    </div>
                    {activity?.article && (
                      <p className="text-xs text-text-secondary mt-1">
                        Artikel: {activity?.article}
                      </p>
                    )}
                  </div>
                  <div className="ml-4 flex-shrink-0">
                    {getActionButton(activity)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="p-4 border-t border-border">
        <Button variant="outline" fullWidth>
          Lihat Semua Aktivitas
        </Button>
      </div>
    </div>
  );
};

export default ActivityFeed;