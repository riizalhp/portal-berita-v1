import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';
import Input from './Input';

const SearchComponent = ({ variant = 'header', className = '' }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [isExpanded, setIsExpanded] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const searchRef = useRef(null);
  const inputRef = useRef(null);

  // Sample suggestions - in real app, this would come from API
  const sampleSuggestions = [
    'Pemilu 2024',
    'Ekonomi Indonesia',
    'Teknologi AI',
    'Sepak Bola',
    'Film Indonesia',
    'Cryptocurrency',
    'Vaksin COVID-19',
    'Pendidikan Online',
    'Startup Indonesia',
    'Pariwisata Bali'
  ];

  useEffect(() => {
    // Get query from URL if on search results page
    const searchParams = new URLSearchParams(location.search);
    const urlQuery = searchParams?.get('q');
    if (urlQuery && location.pathname === '/search-results-page') {
      setQuery(urlQuery);
    }
  }, [location]);

  useEffect(() => {
    // Generate suggestions based on query
    if (query?.length > 1) {
      const filtered = sampleSuggestions?.filter(suggestion =>
        suggestion?.toLowerCase()?.includes(query?.toLowerCase())
      );
      setSuggestions(filtered?.slice(0, 5));
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [query]);

  useEffect(() => {
    // Close suggestions when clicking outside
    const handleClickOutside = (event) => {
      if (searchRef?.current && !searchRef?.current?.contains(event.target)) {
        setShowSuggestions(false);
        if (variant === 'header') {
          setIsExpanded(false);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [variant]);

  const handleSearch = (searchQuery = query) => {
    if (searchQuery?.trim()) {
      navigate(`/search-results-page?q=${encodeURIComponent(searchQuery?.trim())}`);
      setShowSuggestions(false);
      if (variant === 'header') {
        setIsExpanded(false);
      }
    }
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    handleSearch();
  };

  const handleSuggestionClick = (suggestion) => {
    setQuery(suggestion);
    handleSearch(suggestion);
  };

  const handleExpand = () => {
    setIsExpanded(true);
    setTimeout(() => {
      inputRef?.current?.focus();
    }, 100);
  };

  const handleCollapse = () => {
    setIsExpanded(false);
    setQuery('');
    setShowSuggestions(false);
  };

  // Header variant (compact with expand functionality)
  if (variant === 'header') {
    return (
      <div ref={searchRef} className={`relative ${className}`}>
        {isExpanded ? (
          <form onSubmit={handleSubmit} className="flex items-center space-x-2">
            <div className="relative">
              <Input
                ref={inputRef}
                type="search"
                placeholder="Cari berita..."
                value={query}
                onChange={(e) => setQuery(e?.target?.value)}
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
              
              {/* Suggestions Dropdown */}
              {showSuggestions && suggestions?.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-popover border border-border rounded-md shadow-elevated z-50">
                  {suggestions?.map((suggestion, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => handleSuggestionClick(suggestion)}
                      className="w-full text-left px-4 py-2 text-sm font-body text-popover-foreground hover:bg-muted transition-colors duration-200 first:rounded-t-md last:rounded-b-md"
                    >
                      <div className="flex items-center space-x-2">
                        <Icon name="Search" size={14} className="text-text-secondary" />
                        <span>{suggestion}</span>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={handleCollapse}
            >
              <Icon name="X" size={16} />
            </Button>
          </form>
        ) : (
          <Button
            variant="ghost"
            size="icon"
            onClick={handleExpand}
            className="text-text-primary hover:text-primary"
          >
            <Icon name="Search" size={20} />
          </Button>
        )}
      </div>
    );
  }

  // Full variant (for search page)
  if (variant === 'full') {
    return (
      <div ref={searchRef} className={`relative ${className}`}>
        <form onSubmit={handleSubmit} className="relative">
          <Input
            ref={inputRef}
            type="search"
            placeholder="Cari berita, topik, atau kata kunci..."
            value={query}
            onChange={(e) => setQuery(e?.target?.value)}
            className="w-full pr-12 text-lg h-12"
          />
          <Button
            type="submit"
            variant="ghost"
            size="icon"
            className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8"
          >
            <Icon name="Search" size={20} />
          </Button>
        </form>
        {/* Suggestions Dropdown */}
        {showSuggestions && suggestions?.length > 0 && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-popover border border-border rounded-md shadow-elevated z-50">
            <div className="p-2">
              <div className="text-xs font-caption text-text-secondary mb-2 px-2">
                Saran Pencarian
              </div>
              {suggestions?.map((suggestion, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="w-full text-left px-3 py-2 text-sm font-body text-popover-foreground hover:bg-muted rounded-md transition-colors duration-200"
                >
                  <div className="flex items-center space-x-3">
                    <Icon name="Search" size={16} className="text-text-secondary" />
                    <span>{suggestion}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  // Compact variant (simple input)
  return (
    <div ref={searchRef} className={`relative ${className}`}>
      <form onSubmit={handleSubmit} className="relative">
        <Input
          ref={inputRef}
          type="search"
          placeholder="Cari..."
          value={query}
          onChange={(e) => setQuery(e?.target?.value)}
          className="pr-10"
        />
        <Button
          type="submit"
          variant="ghost"
          size="icon"
          className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8"
        >
          <Icon name="Search" size={16} />
        </Button>
      </form>
    </div>
  );
};

export default SearchComponent;