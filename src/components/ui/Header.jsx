import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';
import Input from './Input';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();

  const navigationItems = [
    { label: 'Beranda', path: '/homepage', icon: 'Home' },
    { label: 'Politik', path: '/category-listing-page?category=politik', icon: 'Users' },
    { label: 'Ekonomi', path: '/category-listing-page?category=ekonomi', icon: 'TrendingUp' },
    { label: 'Teknologi', path: '/category-listing-page?category=teknologi', icon: 'Smartphone' },
    { label: 'Olahraga', path: '/category-listing-page?category=olahraga', icon: 'Trophy' },
  ];

  const moreItems = [
    { label: 'Hiburan', path: '/category-listing-page?category=hiburan', icon: 'Music' },
    { label: 'Admin', path: '/admin-dashboard', icon: 'Settings' },
  ];

  const handleSearch = (e) => {
    e?.preventDefault();
    if (searchQuery?.trim()) {
      window.location.href = `/search-results-page?q=${encodeURIComponent(searchQuery)}`;
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleSearch = () => {
    setIsSearchExpanded(!isSearchExpanded);
    if (!isSearchExpanded) {
      setTimeout(() => {
        document.getElementById('search-input')?.focus();
      }, 100);
    }
  };

  const isActive = (path) => {
    if (path === '/homepage') {
      return location.pathname === '/homepage' || location.pathname === '/';
    }
    return location.pathname === path || location.search?.includes(path?.split('?')?.[1]);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-surface border-b border-border shadow-card">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between h-16 px-4 lg:px-6">
          {/* Logo */}
          <Link to="/homepage" className="flex items-center space-x-2 flex-shrink-0">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Icon name="Newspaper" size={20} color="white" />
            </div>
            <div className="hidden sm:block">
              <h1 className="font-heading font-bold text-lg text-primary">Portal Berita</h1>
              <p className="font-caption text-xs text-text-secondary -mt-1">Indonesia</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navigationItems?.map((item) => (
              <Link
                key={item?.path}
                to={item?.path}
                className={`px-4 py-2 rounded-md font-body font-medium text-sm transition-colors duration-200 ${
                  isActive(item?.path)
                    ? 'bg-primary text-primary-foreground'
                    : 'text-text-primary hover:bg-muted hover:text-primary'
                }`}
              >
                {item?.label}
              </Link>
            ))}
            
            {/* More Dropdown */}
            <div className="relative group">
              <button className="px-4 py-2 rounded-md font-body font-medium text-sm text-text-primary hover:bg-muted hover:text-primary transition-colors duration-200 flex items-center space-x-1">
                <span>Lainnya</span>
                <Icon name="ChevronDown" size={16} />
              </button>
              <div className="absolute top-full right-0 mt-1 w-48 bg-popover border border-border rounded-md shadow-elevated opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                {moreItems?.map((item) => (
                  <Link
                    key={item?.path}
                    to={item?.path}
                    className="flex items-center space-x-3 px-4 py-3 text-sm font-body text-popover-foreground hover:bg-muted transition-colors duration-200"
                  >
                    <Icon name={item?.icon} size={16} />
                    <span>{item?.label}</span>
                  </Link>
                ))}
              </div>
            </div>
          </nav>

          {/* Search and Mobile Menu */}
          <div className="flex items-center space-x-2">
            {/* Desktop Search */}
            <div className="hidden md:block">
              {isSearchExpanded ? (
                <form onSubmit={handleSearch} className="flex items-center space-x-2">
                  <div className="relative">
                    <Input
                      id="search-input"
                      type="search"
                      placeholder="Cari berita..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e?.target?.value)}
                      className="w-64 pr-10"
                    />
                    <Button
                      type="submit"
                      variant="ghost"
                      size="icon"
                      className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8"
                    >
                      <Icon name="Search" size={16} />
                    </Button>
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={toggleSearch}
                  >
                    <Icon name="X" size={16} />
                  </Button>
                </form>
              ) : (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={toggleSearch}
                  className="text-text-primary hover:text-primary"
                >
                  <Icon name="Search" size={20} />
                </Button>
              )}
            </div>

            {/* Mobile Search Button */}
            <Link
              to="/search-results-page"
              className="md:hidden p-2 text-text-primary hover:text-primary transition-colors duration-200"
            >
              <Icon name="Search" size={20} />
            </Link>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMobileMenu}
              className="lg:hidden text-text-primary hover:text-primary"
            >
              <Icon name={isMobileMenuOpen ? "X" : "Menu"} size={20} />
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-surface border-t border-border animate-slide-in">
            <nav className="px-4 py-4 space-y-2">
              {[...navigationItems, ...moreItems]?.map((item) => (
                <Link
                  key={item?.path}
                  to={item?.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-md font-body font-medium text-sm transition-colors duration-200 ${
                    isActive(item?.path)
                      ? 'bg-primary text-primary-foreground'
                      : 'text-text-primary hover:bg-muted hover:text-primary'
                  }`}
                >
                  <Icon name={item?.icon} size={18} />
                  <span>{item?.label}</span>
                </Link>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;