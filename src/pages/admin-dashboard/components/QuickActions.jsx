import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';

const QuickActions = () => {
  const navigate = useNavigate();

  const quickActions = [
    {
      title: 'Artikel Baru',
      description: 'Buat artikel berita baru',
      icon: 'Plus',
      variant: 'default',
      action: () => navigate('/article-editor')
    },
    {
      title: 'Draft Artikel',
      description: '12 draft tersimpan',
      icon: 'FileText',
      variant: 'outline',
      action: () => navigate('/admin-dashboard?tab=articles&filter=draft')
    },
    {
      title: 'Jadwal Posting',
      description: '5 artikel terjadwal',
      icon: 'Clock',
      variant: 'outline',
      action: () => navigate('/admin-dashboard?tab=articles&filter=scheduled')
    },
    {
      title: 'Moderasi Komentar',
      description: '23 komentar pending',
      icon: 'MessageSquare',
      variant: 'outline',
      badge: '23',
      action: () => navigate('/admin-dashboard?tab=comments')
    }
  ];

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <h2 className="text-lg font-heading font-semibold text-text-primary mb-4">Aksi Cepat</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {quickActions?.map((action, index) => (
          <div
            key={index}
            className="relative p-4 border border-border rounded-lg hover:border-primary/50 hover:shadow-card transition-all duration-200 cursor-pointer group"
            onClick={action?.action}
          >
            {action?.badge && (
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-error text-error-foreground rounded-full flex items-center justify-center text-xs font-bold">
                {action?.badge}
              </div>
            )}
            <div className="flex items-center space-x-3">
              <Button
                variant={action?.variant}
                size="icon"
                iconName={action?.icon}
                className="pointer-events-none"
              />
              <div className="flex-1">
                <h3 className="font-body font-medium text-text-primary group-hover:text-primary transition-colors duration-200">
                  {action?.title}
                </h3>
                <p className="text-sm text-text-secondary">
                  {action?.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;