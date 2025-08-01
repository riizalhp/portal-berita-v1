import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';

const Breadcrumb = ({ customItems = null }) => {
  const location = useLocation();
  
  const generateBreadcrumbs = () => {
    if (customItems) return customItems;
    
    const pathSegments = location.pathname?.split('/')?.filter(Boolean);
    const searchParams = new URLSearchParams(location.search);
    
    const breadcrumbs = [
      { label: 'Beranda', path: '/homepage', icon: 'Home' }
    ];

    // Handle different page types
    if (pathSegments?.includes('category-listing-page')) {
      const category = searchParams?.get('category');
      const categoryLabels = {
        'politik': 'Politik',
        'ekonomi': 'Ekonomi', 
        'teknologi': 'Teknologi',
        'olahraga': 'Olahraga',
        'hiburan': 'Hiburan'
      };
      
      if (category && categoryLabels?.[category]) {
        breadcrumbs?.push({
          label: categoryLabels?.[category],
          path: `/category-listing-page?category=${category}`,
          icon: 'Folder'
        });
      }
    } else if (pathSegments?.includes('article-detail-page')) {
      const category = searchParams?.get('category');
      const articleTitle = searchParams?.get('title');
      
      if (category) {
        const categoryLabels = {
          'politik': 'Politik',
          'ekonomi': 'Ekonomi',
          'teknologi': 'Teknologi', 
          'olahraga': 'Olahraga',
          'hiburan': 'Hiburan'
        };
        
        if (categoryLabels?.[category]) {
          breadcrumbs?.push({
            label: categoryLabels?.[category],
            path: `/category-listing-page?category=${category}`,
            icon: 'Folder'
          });
        }
      }
      
      breadcrumbs?.push({
        label: articleTitle ? decodeURIComponent(articleTitle)?.substring(0, 50) + '...' : 'Detail Artikel',
        path: location.pathname + location.search,
        icon: 'FileText'
      });
    } else if (pathSegments?.includes('search-results-page')) {
      const query = searchParams?.get('q');
      breadcrumbs?.push({
        label: query ? `Hasil Pencarian: "${query}"` : 'Hasil Pencarian',
        path: location.pathname + location.search,
        icon: 'Search'
      });
    } else if (pathSegments?.includes('admin-dashboard')) {
      const tab = searchParams?.get('tab');
      breadcrumbs?.push({
        label: 'Admin Dashboard',
        path: '/admin-dashboard',
        icon: 'LayoutDashboard'
      });
      
      if (tab) {
        const tabLabels = {
          'articles': 'Manajemen Artikel',
          'categories': 'Kategori',
          'media': 'Media',
          'users': 'Pengguna',
          'comments': 'Komentar',
          'analytics': 'Analitik',
          'settings': 'Pengaturan'
        };
        
        if (tabLabels?.[tab]) {
          breadcrumbs?.push({
            label: tabLabels?.[tab],
            path: `/admin-dashboard?tab=${tab}`,
            icon: 'Settings'
          });
        }
      }
    } else if (pathSegments?.includes('article-editor')) {
      breadcrumbs?.push({
        label: 'Admin Dashboard',
        path: '/admin-dashboard',
        icon: 'LayoutDashboard'
      });
      breadcrumbs?.push({
        label: 'Editor Artikel',
        path: '/article-editor',
        icon: 'Edit3'
      });
    }

    return breadcrumbs;
  };

  const breadcrumbs = generateBreadcrumbs();

  // Don't show breadcrumbs on homepage
  if (location.pathname === '/homepage' || location.pathname === '/') {
    return null;
  }

  return (
    <nav className="flex items-center space-x-2 text-sm font-body mb-6" aria-label="Breadcrumb">
      {breadcrumbs?.map((item, index) => (
        <div key={item?.path} className="flex items-center space-x-2">
          {index > 0 && (
            <Icon name="ChevronRight" size={14} className="text-text-secondary" />
          )}
          {index === breadcrumbs?.length - 1 ? (
            <span className="flex items-center space-x-1 text-text-primary font-medium">
              <Icon name={item?.icon} size={14} />
              <span className="truncate max-w-xs">{item?.label}</span>
            </span>
          ) : (
            <Link
              to={item?.path}
              className="flex items-center space-x-1 text-text-secondary hover:text-primary transition-colors duration-200"
            >
              <Icon name={item?.icon} size={14} />
              <span className="hover:underline">{item?.label}</span>
            </Link>
          )}
        </div>
      ))}
    </nav>
  );
};

export default Breadcrumb;