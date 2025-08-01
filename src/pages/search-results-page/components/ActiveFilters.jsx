import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ActiveFilters = ({ activeFilters, onRemoveFilter, onClearAll }) => {
  const getFilterLabel = (key, value) => {
    const labels = {
      category: {
        'politik': 'Politik',
        'ekonomi': 'Ekonomi',
        'teknologi': 'Teknologi',
        'olahraga': 'Olahraga',
        'hiburan': 'Hiburan'
      },
      dateRange: {
        'today': 'Hari Ini',
        'week': '7 Hari Terakhir',
        'month': '30 Hari Terakhir',
        'year': 'Tahun Ini'
      },
      author: {
        'ahmad-rizki': 'Ahmad Rizki',
        'sari-dewi': 'Sari Dewi',
        'budi-santoso': 'Budi Santoso',
        'maya-sari': 'Maya Sari',
        'andi-wijaya': 'Andi Wijaya'
      }
    };

    if (key === 'hasImage' && value) return 'Dengan Gambar';
    if (key === 'hasVideo' && value) return 'Dengan Video';
    if (key === 'isTrending' && value) return 'Trending';
    
    return labels?.[key]?.[value] || value;
  };

  const getActiveFiltersList = () => {
    const filters = [];
    
    Object.entries(activeFilters)?.forEach(([key, value]) => {
      if (value && value !== 'all' && value !== '' && value !== false) {
        filters?.push({
          key,
          value,
          label: getFilterLabel(key, value)
        });
      }
    });
    
    return filters;
  };

  const activeFiltersList = getActiveFiltersList();

  if (activeFiltersList?.length === 0) {
    return null;
  }

  return (
    <div className="bg-surface border border-border rounded-lg p-4 mb-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
        <div className="flex items-center space-x-2">
          <Icon name="Filter" size={16} className="text-text-secondary" />
          <span className="text-sm font-body font-medium text-text-primary">
            Filter Aktif ({activeFiltersList?.length})
          </span>
        </div>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={onClearAll}
          iconName="X"
          iconPosition="left"
          className="text-text-secondary hover:text-error self-start sm:self-auto"
        >
          Hapus Semua
        </Button>
      </div>
      <div className="flex flex-wrap gap-2 mt-3">
        {activeFiltersList?.map((filter) => (
          <div
            key={`${filter?.key}-${filter?.value}`}
            className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-body"
          >
            <span>{filter?.label}</span>
            <button
              onClick={() => onRemoveFilter(filter?.key)}
              className="hover:bg-primary/20 rounded-full p-0.5 transition-colors duration-200"
              aria-label={`Hapus filter ${filter?.label}`}
            >
              <Icon name="X" size={12} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActiveFilters;