import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';

const ArticleTags = ({ tags = [] }) => {
  if (!tags || tags?.length === 0) return null;

  return (
    <div className="py-6 border-t border-b border-border my-8">
      <div className="flex items-start space-x-3">
        <div className="flex items-center space-x-2 flex-shrink-0">
          <Icon name="Tag" size={16} className="text-text-secondary" />
          <span className="font-body font-medium text-text-secondary">Tags:</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {tags?.map((tag, index) => (
            <Link
              key={index}
              to={`/search-results-page?q=${encodeURIComponent(tag)}`}
              className="inline-flex items-center px-3 py-1 rounded-full text-sm font-caption bg-muted text-text-primary hover:bg-primary hover:text-primary-foreground transition-colors duration-200"
            >
              #{tag}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ArticleTags;