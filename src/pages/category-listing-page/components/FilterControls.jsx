import React, { useState } from 'react';

import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const FilterControls = ({ filters, onFilterChange, onSortChange, sortBy, isMobile }) => {
  const [showFilters, setShowFilters] = useState(false);

  const dateRangeOptions = [
    { value: 'all', label: 'Semua Waktu' },
    { value: 'today', label: 'Hari Ini' },
    { value: 'week', label: '7 Hari Terakhir' },
    { value: 'month', label: '30 Hari Terakhir' },
    { value: 'year', label: 'Tahun Ini' }
  ];

  const sortOptions = [
    { value: 'newest', label: 'Terbaru' },
    { value: 'popular', label: 'Terpopuler' },
    { value: 'trending', label: 'Trending' },
    { value: 'oldest', label: 'Terlama' }
  ];

  const authorOptions = [
    { value: 'all', label: 'Semua Penulis' },
    { value: 'ahmad-rizki', label: 'Ahmad Rizki' },
    { value: 'sari-dewi', label: 'Sari Dewi' },
    { value: 'budi-santoso', label: 'Budi Santoso' },
    { value: 'maya-sari', label: 'Maya Sari' }
  ];

  const handleFilterChange = (key, value) => {
    onFilterChange({ ...filters, [key]: value });
  };

  const resetFilters = () => {
    onFilterChange({
      dateRange: 'all',
      author: 'all',
      tags: []
    });
  };

  if (isMobile) {
    return (
      <div className="bg-surface border-b border-border sticky top-16 z-40">
        <div className="px-4 py-3">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-body font-medium text-text-primary">Filter & Urutkan</h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowFilters(!showFilters)}
              iconName={showFilters ? "ChevronUp" : "ChevronDown"}
              iconPosition="right"
            >
              {showFilters ? 'Sembunyikan' : 'Tampilkan'}
            </Button>
          </div>

          {showFilters && (
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <Select
                  label="Urutkan"
                  options={sortOptions}
                  value={sortBy}
                  onChange={onSortChange}
                />
                <Select
                  label="Waktu"
                  options={dateRangeOptions}
                  value={filters?.dateRange}
                  onChange={(value) => handleFilterChange('dateRange', value)}
                />
              </div>
              <Select
                label="Penulis"
                options={authorOptions}
                value={filters?.author}
                onChange={(value) => handleFilterChange('author', value)}
              />
              <div className="flex justify-between items-center pt-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={resetFilters}
                  iconName="RotateCcw"
                  iconPosition="left"
                >
                  Reset
                </Button>
                <Button
                  variant="default"
                  size="sm"
                  onClick={() => setShowFilters(false)}
                >
                  Terapkan
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-surface border border-border rounded-lg p-6 sticky top-20">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-body font-semibold text-lg text-text-primary">Filter Artikel</h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={resetFilters}
          iconName="RotateCcw"
          iconPosition="left"
        >
          Reset
        </Button>
      </div>
      <div className="space-y-4">
        <Select
          label="Urutkan Berdasarkan"
          options={sortOptions}
          value={sortBy}
          onChange={onSortChange}
        />

        <Select
          label="Rentang Waktu"
          options={dateRangeOptions}
          value={filters?.dateRange}
          onChange={(value) => handleFilterChange('dateRange', value)}
        />

        <Select
          label="Penulis"
          options={authorOptions}
          value={filters?.author}
          onChange={(value) => handleFilterChange('author', value)}
        />

        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Tag Populer
          </label>
          <div className="flex flex-wrap gap-2">
            {['Breaking News', 'Analisis', 'Eksklusif', 'Video', 'Infografis']?.map((tag) => (
              <button
                key={tag}
                onClick={() => {
                  const newTags = filters?.tags?.includes(tag)
                    ? filters?.tags?.filter(t => t !== tag)
                    : [...(filters?.tags || []), tag];
                  handleFilterChange('tags', newTags);
                }}
                className={`px-3 py-1 rounded-full text-xs font-body transition-colors duration-200 ${
                  filters?.tags?.includes(tag)
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-text-secondary hover:bg-primary hover:text-primary-foreground'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterControls;