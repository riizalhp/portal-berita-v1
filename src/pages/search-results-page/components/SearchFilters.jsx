import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const SearchFilters = ({ filters, onFiltersChange, activeFilters, onClearFilters }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const categoryOptions = [
    { value: 'all', label: 'Semua Kategori' },
    { value: 'politik', label: 'Politik' },
    { value: 'ekonomi', label: 'Ekonomi' },
    { value: 'teknologi', label: 'Teknologi' },
    { value: 'olahraga', label: 'Olahraga' },
    { value: 'hiburan', label: 'Hiburan' }
  ];

  const dateRangeOptions = [
    { value: 'all', label: 'Semua Waktu' },
    { value: 'today', label: 'Hari Ini' },
    { value: 'week', label: '7 Hari Terakhir' },
    { value: 'month', label: '30 Hari Terakhir' },
    { value: 'year', label: 'Tahun Ini' }
  ];

  const authorOptions = [
    { value: 'all', label: 'Semua Penulis' },
    { value: 'ahmad-rizki', label: 'Ahmad Rizki' },
    { value: 'sari-dewi', label: 'Sari Dewi' },
    { value: 'budi-santoso', label: 'Budi Santoso' },
    { value: 'maya-sari', label: 'Maya Sari' },
    { value: 'andi-wijaya', label: 'Andi Wijaya' }
  ];

  const handleFilterChange = (key, value) => {
    onFiltersChange({
      ...filters,
      [key]: value
    });
  };

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  const activeFilterCount = Object.values(activeFilters)?.filter(value => 
    value && value !== 'all' && value !== ''
  )?.length;

  return (
    <div className="bg-surface border border-border rounded-lg">
      {/* Mobile Filter Toggle */}
      <div className="lg:hidden">
        <Button
          variant="ghost"
          onClick={toggleExpanded}
          className="w-full justify-between p-4 rounded-none border-b border-border"
        >
          <div className="flex items-center space-x-2">
            <Icon name="Filter" size={18} />
            <span className="font-body font-medium">Filter Pencarian</span>
            {activeFilterCount > 0 && (
              <span className="bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full">
                {activeFilterCount}
              </span>
            )}
          </div>
          <Icon name={isExpanded ? "ChevronUp" : "ChevronDown"} size={18} />
        </Button>
        
        {isExpanded && (
          <div className="p-4 space-y-4 animate-slide-in">
            <FilterContent
              filters={filters}
              categoryOptions={categoryOptions}
              dateRangeOptions={dateRangeOptions}
              authorOptions={authorOptions}
              onFilterChange={handleFilterChange}
              onClearFilters={onClearFilters}
              activeFilterCount={activeFilterCount}
            />
          </div>
        )}
      </div>

      {/* Desktop Filters */}
      <div className="hidden lg:block p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-heading font-bold text-lg text-text-primary flex items-center space-x-2">
            <Icon name="Filter" size={20} />
            <span>Filter Pencarian</span>
          </h3>
          {activeFilterCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onClearFilters}
              className="text-text-secondary hover:text-error"
            >
              <Icon name="X" size={16} className="mr-1" />
              Hapus Filter
            </Button>
          )}
        </div>
        
        <FilterContent
          filters={filters}
          categoryOptions={categoryOptions}
          dateRangeOptions={dateRangeOptions}
          authorOptions={authorOptions}
          onFilterChange={handleFilterChange}
          onClearFilters={onClearFilters}
          activeFilterCount={activeFilterCount}
        />
      </div>
    </div>
  );
};

const FilterContent = ({ 
  filters, 
  categoryOptions, 
  dateRangeOptions, 
  authorOptions, 
  onFilterChange, 
  onClearFilters, 
  activeFilterCount 
}) => {
  return (
    <div className="space-y-6">
      {/* Category Filter */}
      <div>
        <Select
          label="Kategori"
          options={categoryOptions}
          value={filters?.category}
          onChange={(value) => onFilterChange('category', value)}
          className="mb-4"
        />
      </div>
      {/* Date Range Filter */}
      <div>
        <Select
          label="Rentang Waktu"
          options={dateRangeOptions}
          value={filters?.dateRange}
          onChange={(value) => onFilterChange('dateRange', value)}
          className="mb-4"
        />
      </div>
      {/* Author Filter */}
      <div>
        <Select
          label="Penulis"
          options={authorOptions}
          value={filters?.author}
          onChange={(value) => onFilterChange('author', value)}
          searchable
          className="mb-4"
        />
      </div>
      {/* Additional Filters */}
      <div className="space-y-3">
        <h4 className="font-body font-medium text-text-primary">Filter Tambahan</h4>
        
        <Checkbox
          label="Hanya artikel dengan gambar"
          checked={filters?.hasImage}
          onChange={(e) => onFilterChange('hasImage', e?.target?.checked)}
        />
        
        <Checkbox
          label="Hanya artikel dengan video"
          checked={filters?.hasVideo}
          onChange={(e) => onFilterChange('hasVideo', e?.target?.checked)}
        />
        
        <Checkbox
          label="Artikel trending"
          checked={filters?.isTrending}
          onChange={(e) => onFilterChange('isTrending', e?.target?.checked)}
        />
      </div>
      {/* Clear All Button (Mobile) */}
      {activeFilterCount > 0 && (
        <div className="lg:hidden pt-4 border-t border-border">
          <Button
            variant="outline"
            onClick={onClearFilters}
            fullWidth
            iconName="X"
            iconPosition="left"
          >
            Hapus Semua Filter
          </Button>
        </div>
      )}
    </div>
  );
};

export default SearchFilters;