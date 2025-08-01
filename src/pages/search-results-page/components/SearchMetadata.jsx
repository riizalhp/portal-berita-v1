import React from 'react';
import Icon from '../../../components/AppIcon';

const SearchMetadata = ({ query, resultsCount, searchDuration, totalResults }) => {
  const formatDuration = (duration) => {
    if (duration < 1) return `${(duration * 1000)?.toFixed(0)}ms`;
    return `${duration?.toFixed(2)}s`;
  };

  const formatResultsCount = (count) => {
    return count?.toLocaleString('id-ID');
  };

  return (
    <div className="bg-surface border border-border rounded-lg p-4 mb-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
        {/* Search Query Info */}
        <div className="flex items-center space-x-2">
          <Icon name="Search" size={16} className="text-text-secondary" />
          <div>
            <span className="text-sm font-body text-text-secondary">Hasil pencarian untuk: </span>
            <span className="text-sm font-body font-medium text-text-primary">"{query}"</span>
          </div>
        </div>

        {/* Results Statistics */}
        <div className="flex items-center space-x-4 text-xs text-text-secondary">
          <div className="flex items-center space-x-1">
            <Icon name="FileText" size={12} />
            <span>{formatResultsCount(resultsCount)} dari {formatResultsCount(totalResults)} artikel</span>
          </div>
          <div className="flex items-center space-x-1">
            <Icon name="Clock" size={12} />
            <span>dalam {formatDuration(searchDuration)}</span>
          </div>
        </div>
      </div>

      {/* Search Quality Indicators */}
      <div className="flex items-center space-x-4 mt-3 pt-3 border-t border-border">
        <div className="flex items-center space-x-1 text-xs text-text-secondary">
          <Icon name="Target" size={12} className="text-accent" />
          <span>Relevansi tinggi</span>
        </div>
        <div className="flex items-center space-x-1 text-xs text-text-secondary">
          <Icon name="Zap" size={12} className="text-warning" />
          <span>Pencarian cepat</span>
        </div>
        {resultsCount > 100 && (
          <div className="flex items-center space-x-1 text-xs text-text-secondary">
            <Icon name="Database" size={12} className="text-primary" />
            <span>Hasil lengkap</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchMetadata;