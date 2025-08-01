import React from 'react';
import Icon from '../../../components/AppIcon';
import Select from '../../../components/ui/Select';

const SortControls = ({ sortBy, onSortChange, totalResults, currentPage, articlesPerPage }) => {
  const sortOptions = [
    { value: 'newest', label: 'Terbaru' },
    { value: 'popular', label: 'Terpopuler' },
    { value: 'trending', label: 'Trending' },
    { value: 'oldest', label: 'Terlama' }
  ];

  const startItem = (currentPage - 1) * articlesPerPage + 1;
  const endItem = Math.min(currentPage * articlesPerPage, totalResults);

  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
      <div className="flex items-center space-x-2">
        <Icon name="FileText" size={16} className="text-text-secondary" />
        <span className="text-sm font-body text-text-secondary">
          Menampilkan {startItem}-{endItem} dari {totalResults?.toLocaleString('id-ID')} artikel
        </span>
      </div>
      <div className="flex items-center space-x-3">
        <span className="text-sm font-body text-text-secondary whitespace-nowrap">
          Urutkan berdasarkan:
        </span>
        <div className="min-w-[140px]">
          <Select
            options={sortOptions}
            value={sortBy}
            onChange={onSortChange}
            className="text-sm"
          />
        </div>
      </div>
    </div>
  );
};

export default SortControls;