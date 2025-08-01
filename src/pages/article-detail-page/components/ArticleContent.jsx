import React from 'react';
import Image from '../../../components/AppImage';

const ArticleContent = ({ content, gallery = [] }) => {
  const renderContent = (text) => {
    // Split content by paragraphs and render with proper formatting
    const paragraphs = text?.split('\n\n');
    
    return paragraphs?.map((paragraph, index) => {
      // Check if it's a quote (starts with ")
      if (paragraph?.startsWith('"') && paragraph?.endsWith('"')) {
        return (
          <blockquote key={index} className="border-l-4 border-primary pl-6 py-4 my-6 bg-muted/30 rounded-r-lg">
            <p className="font-body text-lg italic text-text-primary leading-relaxed">
              {paragraph}
            </p>
          </blockquote>
        );
      }
      
      // Check if it's a heading (starts with ##)
      if (paragraph?.startsWith('## ')) {
        return (
          <h2 key={index} className="font-heading font-bold text-xl md:text-2xl text-text-primary mt-8 mb-4">
            {paragraph?.replace('## ', '')}
          </h2>
        );
      }
      
      // Check if it's a subheading (starts with ###)
      if (paragraph?.startsWith('### ')) {
        return (
          <h3 key={index} className="font-heading font-semibold text-lg md:text-xl text-text-primary mt-6 mb-3">
            {paragraph?.replace('### ', '')}
          </h3>
        );
      }
      
      // Regular paragraph
      return (
        <p key={index} className="font-body text-base md:text-lg text-text-primary leading-relaxed mb-4">
          {paragraph}
        </p>
      );
    });
  };

  return (
    <div className="prose prose-lg max-w-none">
      <div className="article-content">
        {renderContent(content)}
      </div>
      {/* Photo Gallery */}
      {gallery && gallery?.length > 0 && (
        <div className="my-8">
          <h3 className="font-heading font-semibold text-xl text-text-primary mb-4">
            Galeri Foto
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {gallery?.map((image, index) => (
              <div key={index} className="relative group cursor-pointer overflow-hidden rounded-lg">
                <div className="aspect-video">
                  <Image
                    src={image?.url}
                    alt={image?.caption || `Galeri foto ${index + 1}`}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                {image?.caption && (
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
                    <p className="text-white text-sm font-caption">
                      {image?.caption}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ArticleContent;