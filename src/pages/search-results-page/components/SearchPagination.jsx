import React from 'react';

import Button from '../../../components/ui/Button';

const SearchPagination = ({ 
  currentPage, 
  totalPages, 
  totalResults, 
  resultsPerPage, 
  onPageChange,
  onLoadMore,
  hasMore,
  isLoading 
}) => {
  const getVisiblePages = () => {
    const delta = 2;
    const range = [];
    const rangeWithDots = [];

    for (let i = Math.max(2, currentPage - delta); i <= Math.min(totalPages - 1, currentPage + delta); i++) {
      range?.push(i);
    }

    if (currentPage - delta > 2) {
      rangeWithDots?.push(1, '...');
    } else {
      rangeWithDots?.push(1);
    }

    rangeWithDots?.push(...range);

    if (currentPage + delta < totalPages - 1) {
      rangeWithDots?.push('...', totalPages);
    } else if (totalPages > 1) {
      rangeWithDots?.push(totalPages);
    }

    return rangeWithDots;
  };

  const getResultsRange = () => {
    const start = (currentPage - 1) * resultsPerPage + 1;
    const end = Math.min(currentPage * resultsPerPage, totalResults);
    return { start, end };
  };

  const { start, end } = getResultsRange();
  const visiblePages = getVisiblePages();

  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className="space-y-6">
      {/* Results Info */}
      <div className="text-center text-sm text-text-secondary">
        Menampilkan {start?.toLocaleString('id-ID')} - {end?.toLocaleString('id-ID')} dari {totalResults?.toLocaleString('id-ID')} hasil
      </div>
      {/* Load More Button (Mobile First) */}
      <div className="md:hidden text-center">
        {hasMore && (
          <Button
            variant="outline"
            size="lg"
            onClick={onLoadMore}
            loading={isLoading}
            iconName="ChevronDown"
            iconPosition="right"
            fullWidth
          >
            {isLoading ? 'Memuat...' : 'Muat Lebih Banyak'}
          </Button>
        )}
      </div>
      {/* Desktop Pagination */}
      <div className="hidden md:flex items-center justify-center space-x-2">
        {/* Previous Button */}
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          iconName="ChevronLeft"
          iconPosition="left"
        >
          Sebelumnya
        </Button>

        {/* Page Numbers */}
        <div className="flex items-center space-x-1">
          {visiblePages?.map((page, index) => (
            <React.Fragment key={index}>
              {page === '...' ? (
                <span className="px-3 py-2 text-text-secondary">...</span>
              ) : (
                <Button
                  variant={currentPage === page ? "default" : "ghost"}
                  size="sm"
                  onClick={() => onPageChange(page)}
                  className="min-w-[40px]"
                >
                  {page}
                </Button>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Next Button */}
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          iconName="ChevronRight"
          iconPosition="right"
        >
          Selanjutnya
        </Button>
      </div>
      {/* Quick Jump (Desktop) */}
      <div className="hidden lg:flex items-center justify-center space-x-4 text-sm">
        <span className="text-text-secondary">Lompat ke halaman:</span>
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onPageChange(1)}
            disabled={currentPage === 1}
            iconName="ChevronsLeft"
          >
            Pertama
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onPageChange(totalPages)}
            disabled={currentPage === totalPages}
            iconName="ChevronsRight"
          >
            Terakhir
          </Button>
        </div>
      </div>
      {/* Mobile Pagination Info */}
      <div className="md:hidden bg-surface border border-border rounded-lg p-4">
        <div className="flex items-center justify-between text-sm">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            iconName="ChevronLeft"
          >
            Sebelumnya
          </Button>
          
          <div className="flex items-center space-x-2">
            <span className="text-text-secondary">Halaman</span>
            <span className="font-medium text-text-primary">{currentPage}</span>
            <span className="text-text-secondary">dari</span>
            <span className="font-medium text-text-primary">{totalPages}</span>
          </div>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            iconName="ChevronRight"
          >
            Selanjutnya
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SearchPagination;