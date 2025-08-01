import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const Pagination = ({ currentPage, totalPages, onPageChange, totalArticles, articlesPerPage }) => {
  const startItem = (currentPage - 1) * articlesPerPage + 1;
  const endItem = Math.min(currentPage * articlesPerPage, totalArticles);

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

  if (totalPages <= 1) return null;

  return (
    <div className="flex flex-col items-center space-y-4 py-8">
      {/* Results Info */}
      <div className="text-sm text-text-secondary font-body">
        Menampilkan {startItem}-{endItem} dari {totalArticles?.toLocaleString('id-ID')} artikel
      </div>
      {/* Pagination Controls */}
      <div className="flex items-center space-x-2">
        {/* Previous Button */}
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          iconName="ChevronLeft"
          iconPosition="left"
          className="hidden sm:flex"
        >
          Sebelumnya
        </Button>

        <Button
          variant="outline"
          size="icon"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="sm:hidden"
        >
          <Icon name="ChevronLeft" size={16} />
        </Button>

        {/* Page Numbers */}
        <div className="flex items-center space-x-1">
          {getVisiblePages()?.map((page, index) => (
            <React.Fragment key={index}>
              {page === '...' ? (
                <span className="px-3 py-2 text-text-secondary">...</span>
              ) : (
                <Button
                  variant={currentPage === page ? "default" : "ghost"}
                  size="sm"
                  onClick={() => onPageChange(page)}
                  className="min-w-[40px] h-10"
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
          className="hidden sm:flex"
        >
          Selanjutnya
        </Button>

        <Button
          variant="outline"
          size="icon"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="sm:hidden"
        >
          <Icon name="ChevronRight" size={16} />
        </Button>
      </div>
      {/* Quick Jump (Desktop Only) */}
      <div className="hidden lg:flex items-center space-x-2 text-sm">
        <span className="text-text-secondary font-body">Lompat ke halaman:</span>
        <div className="flex space-x-1">
          {[1, Math.ceil(totalPages / 4), Math.ceil(totalPages / 2), Math.ceil(3 * totalPages / 4), totalPages]?.filter((page, index, arr) => page <= totalPages && arr?.indexOf(page) === index && page !== currentPage)?.slice(0, 4)?.map((page) => (
              <Button
                key={page}
                variant="ghost"
                size="sm"
                onClick={() => onPageChange(page)}
                className="text-xs"
              >
                {page}
              </Button>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Pagination;