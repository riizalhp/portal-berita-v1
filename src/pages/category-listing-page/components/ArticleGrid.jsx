import React from 'react';
import ArticleCard from './ArticleCard';

const ArticleGrid = ({ articles, loading }) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: 8 })?.map((_, index) => (
          <div key={index} className="bg-surface border border-border rounded-lg overflow-hidden animate-pulse">
            <div className="aspect-video bg-muted"></div>
            <div className="p-4 space-y-3">
              <div className="flex space-x-2">
                <div className="h-4 bg-muted rounded w-16"></div>
                <div className="h-4 bg-muted rounded w-20"></div>
              </div>
              <div className="space-y-2">
                <div className="h-5 bg-muted rounded w-full"></div>
                <div className="h-5 bg-muted rounded w-3/4"></div>
              </div>
              <div className="space-y-2">
                <div className="h-4 bg-muted rounded w-full"></div>
                <div className="h-4 bg-muted rounded w-2/3"></div>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 bg-muted rounded-full"></div>
                  <div className="space-y-1">
                    <div className="h-3 bg-muted rounded w-16"></div>
                    <div className="h-3 bg-muted rounded w-12"></div>
                  </div>
                </div>
                <div className="flex space-x-1">
                  <div className="w-8 h-8 bg-muted rounded"></div>
                  <div className="w-8 h-8 bg-muted rounded"></div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (!articles || articles?.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-12 h-12 text-text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
        <h3 className="font-heading font-semibold text-lg text-text-primary mb-2">
          Tidak Ada Artikel
        </h3>
        <p className="text-text-secondary font-body">
          Tidak ditemukan artikel yang sesuai dengan filter yang dipilih.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {articles?.map((article) => (
        <ArticleCard key={article?.id} article={article} />
      ))}
    </div>
  );
};

export default ArticleGrid;