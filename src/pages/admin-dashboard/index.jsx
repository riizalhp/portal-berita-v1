import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import AdminSidebar from '../../components/ui/AdminSidebar';
import Breadcrumb from '../../components/ui/Breadcrumb';
import MetricCard from './components/MetricCard';
import ActivityFeed from './components/ActivityFeed';
import QuickActions from './components/QuickActions';
import AnalyticsWidget from './components/AnalyticsWidget';
import ModerationQueue from './components/ModerationQueue';

const AdminDashboard = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const tab = searchParams?.get('tab');
    if (tab) {
      setActiveTab(tab);
    }
  }, [location.search]);

  const metrics = [
    {
      title: 'Total Artikel',
      value: '2,847',
      change: '+12.5%',
      changeType: 'increase',
      icon: 'FileText',
      color: 'primary'
    },
    {
      title: 'Pengunjung Harian',
      value: '45,231',
      change: '+8.2%',
      changeType: 'increase',
      icon: 'Users',
      color: 'success'
    },
    {
      title: 'Pengguna Aktif',
      value: '12,456',
      change: '+15.3%',
      changeType: 'increase',
      icon: 'UserCheck',
      color: 'accent'
    },
    {
      title: 'Komentar Pending',
      value: '23',
      change: '-5.1%',
      changeType: 'decrease',
      icon: 'MessageSquare',
      color: 'warning'
    }
  ];

  const breadcrumbItems = [
    { label: 'Beranda', path: '/homepage', icon: 'Home' },
    { label: 'Admin Dashboard', path: '/admin-dashboard', icon: 'LayoutDashboard' }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'articles':
        return (
          <div className="bg-card border border-border rounded-lg p-6">
            <h2 className="text-xl font-heading font-semibold text-text-primary mb-4">
              Manajemen Artikel
            </h2>
            <p className="text-text-secondary">
              Fitur manajemen artikel akan tersedia di sini.
            </p>
          </div>
        );
      case 'categories':
        return (
          <div className="bg-card border border-border rounded-lg p-6">
            <h2 className="text-xl font-heading font-semibold text-text-primary mb-4">
              Manajemen Kategori
            </h2>
            <p className="text-text-secondary">
              Fitur manajemen kategori akan tersedia di sini.
            </p>
          </div>
        );
      case 'media':
        return (
          <div className="bg-card border border-border rounded-lg p-6">
            <h2 className="text-xl font-heading font-semibold text-text-primary mb-4">
              Manajemen Media
            </h2>
            <p className="text-text-secondary">
              Fitur manajemen media akan tersedia di sini.
            </p>
          </div>
        );
      case 'users':
        return (
          <div className="bg-card border border-border rounded-lg p-6">
            <h2 className="text-xl font-heading font-semibold text-text-primary mb-4">
              Manajemen Pengguna
            </h2>
            <p className="text-text-secondary">
              Fitur manajemen pengguna akan tersedia di sini.
            </p>
          </div>
        );
      case 'comments':
        return <ModerationQueue />;
      case 'analytics':
        return <AnalyticsWidget />;
      case 'settings':
        return (
          <div className="bg-card border border-border rounded-lg p-6">
            <h2 className="text-xl font-heading font-semibold text-text-primary mb-4">
              Pengaturan Sistem
            </h2>
            <p className="text-text-secondary">
              Fitur pengaturan sistem akan tersedia di sini.
            </p>
          </div>
        );
      default:
        return (
          <div className="space-y-6">
            {/* Metrics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
              {metrics?.map((metric, index) => (
                <MetricCard
                  key={index}
                  title={metric?.title}
                  value={metric?.value}
                  change={metric?.change}
                  changeType={metric?.changeType}
                  icon={metric?.icon}
                  color={metric?.color}
                />
              ))}
            </div>
            {/* Quick Actions */}
            <QuickActions />
            {/* Main Content Grid */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
              {/* Activity Feed */}
              <div className="xl:col-span-2">
                <ActivityFeed />
              </div>

              {/* Moderation Queue */}
              <div className="xl:col-span-1">
                <ModerationQueue />
              </div>
            </div>
            {/* Analytics */}
            <AnalyticsWidget />
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <AdminSidebar />
      <main className="flex-1 p-6">
        <div className="max-w-7xl mx-auto">
          <Breadcrumb customItems={breadcrumbItems} />
          
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-heading font-bold text-text-primary mb-2">
                  Dashboard Admin
                </h1>
                <p className="text-text-secondary font-body">
                  Kelola konten dan pantau performa Portal Berita Indonesia
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm text-text-secondary">
                  Terakhir diperbarui
                </p>
                <p className="text-sm font-medium text-text-primary">
                  {new Date()?.toLocaleDateString('id-ID', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </p>
              </div>
            </div>
          </div>

          {/* Tab Content */}
          {renderTabContent()}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;