import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const AdminSidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const location = useLocation();

  const navigationItems = [
    {
      label: 'Dashboard',
      path: '/admin-dashboard',
      icon: 'LayoutDashboard',
      description: 'Overview & Analytics'
    },
    {
      label: 'Editor Artikel',
      path: '/article-editor',
      icon: 'Edit3',
      description: 'Tulis & Edit Berita'
    },
    {
      label: 'Manajemen Artikel',
      path: '/admin-dashboard?tab=articles',
      icon: 'FileText',
      description: 'Kelola Semua Artikel'
    },
    {
      label: 'Kategori',
      path: '/admin-dashboard?tab=categories',
      icon: 'Folder',
      description: 'Atur Kategori Berita'
    },
    {
      label: 'Media',
      path: '/admin-dashboard?tab=media',
      icon: 'Image',
      description: 'Kelola Gambar & Video'
    },
    {
      label: 'Pengguna',
      path: '/admin-dashboard?tab=users',
      icon: 'Users',
      description: 'Manajemen User'
    },
    {
      label: 'Komentar',
      path: '/admin-dashboard?tab=comments',
      icon: 'MessageSquare',
      description: 'Moderasi Komentar'
    },
    {
      label: 'Analitik',
      path: '/admin-dashboard?tab=analytics',
      icon: 'BarChart3',
      description: 'Statistik & Laporan'
    },
    {
      label: 'Pengaturan',
      path: '/admin-dashboard?tab=settings',
      icon: 'Settings',
      description: 'Konfigurasi Sistem'
    }
  ];

  const quickActions = [
    { label: 'Artikel Baru', icon: 'Plus', action: () => window.location.href = '/article-editor' },
    { label: 'Lihat Situs', icon: 'ExternalLink', action: () => window.open('/homepage', '_blank') }
  ];

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  const toggleMobile = () => {
    setIsMobileOpen(!isMobileOpen);
  };

  const isActive = (path) => {
    if (path?.includes('?')) {
      const [basePath, query] = path?.split('?');
      return location.pathname === basePath && location.search?.includes(query?.split('=')?.[1]);
    }
    return location.pathname === path;
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <Button
        variant="ghost"
        size="icon"
        onClick={toggleMobile}
        className="fixed top-20 left-4 z-50 md:hidden bg-surface border border-border shadow-card"
      >
        <Icon name="Menu" size={20} />
      </Button>
      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={toggleMobile}
        />
      )}
      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-full bg-surface border-r border-border z-50 transition-all duration-300 ${
          isCollapsed ? 'w-16' : 'w-64'
        } ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-border">
            {!isCollapsed && (
              <Link to="/homepage" className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <Icon name="Newspaper" size={20} color="white" />
                </div>
                <div>
                  <h1 className="font-heading font-bold text-sm text-primary">Portal Berita</h1>
                  <p className="font-caption text-xs text-text-secondary">Admin Panel</p>
                </div>
              </Link>
            )}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleCollapse}
              className="hidden md:flex text-text-secondary hover:text-primary"
            >
              <Icon name={isCollapsed ? "ChevronRight" : "ChevronLeft"} size={16} />
            </Button>
          </div>

          {/* Quick Actions */}
          {!isCollapsed && (
            <div className="p-4 border-b border-border">
              <div className="space-y-2">
                {quickActions?.map((action, index) => (
                  <Button
                    key={index}
                    variant={index === 0 ? "default" : "outline"}
                    size="sm"
                    onClick={action?.action}
                    iconName={action?.icon}
                    iconPosition="left"
                    fullWidth
                    className="justify-start"
                  >
                    {action?.label}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto p-4">
            <div className="space-y-1">
              {navigationItems?.map((item) => (
                <Link
                  key={item?.path}
                  to={item?.path}
                  onClick={() => setIsMobileOpen(false)}
                  className={`flex items-center space-x-3 px-3 py-2 rounded-md font-body font-medium text-sm transition-colors duration-200 group ${
                    isActive(item?.path)
                      ? 'bg-primary text-primary-foreground'
                      : 'text-text-primary hover:bg-muted hover:text-primary'
                  }`}
                  title={isCollapsed ? item?.label : ''}
                >
                  <Icon name={item?.icon} size={18} className="flex-shrink-0" />
                  {!isCollapsed && (
                    <div className="flex-1 min-w-0">
                      <div className="font-medium">{item?.label}</div>
                      <div className="text-xs text-text-secondary group-hover:text-primary/70 truncate">
                        {item?.description}
                      </div>
                    </div>
                  )}
                </Link>
              ))}
            </div>
          </nav>

          {/* User Profile */}
          <div className="p-4 border-t border-border">
            <div className={`flex items-center space-x-3 ${isCollapsed ? 'justify-center' : ''}`}>
              <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center">
                <Icon name="User" size={16} color="white" />
              </div>
              {!isCollapsed && (
                <div className="flex-1 min-w-0">
                  <div className="font-body font-medium text-sm text-text-primary truncate">
                    Admin User
                  </div>
                  <div className="font-caption text-xs text-text-secondary">
                    Editor
                  </div>
                </div>
              )}
            </div>
            {!isCollapsed && (
              <div className="mt-3 space-y-1">
                <Button
                  variant="ghost"
                  size="sm"
                  iconName="LogOut"
                  iconPosition="left"
                  fullWidth
                  className="justify-start text-text-secondary hover:text-error"
                >
                  Keluar
                </Button>
              </div>
            )}
          </div>
        </div>
      </aside>
      {/* Content Spacer */}
      <div className={`hidden md:block transition-all duration-300 ${isCollapsed ? 'w-16' : 'w-64'}`} />
    </>
  );
};

export default AdminSidebar;