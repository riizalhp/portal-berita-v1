import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const PreviewMode = ({ 
  title, 
  content, 
  category, 
  tags, 
  featuredImage, 
  author, 
  onExitPreview 
}) => {
  const categoryLabels = {
    'politik': 'Politik',
    'ekonomi': 'Ekonomi',
    'teknologi': 'Teknologi',
    'olahraga': 'Olahraga',
    'hiburan': 'Hiburan'
  };

  const estimateReadingTime = (content) => {
    const wordsPerMinute = 200;
    const words = content?.replace(/<[^>]*>/g, '')?.split(/\s+/)?.length;
    const minutes = Math.ceil(words / wordsPerMinute);
    return minutes;
  };

  const formatDate = (date) => {
    return new Date(date)?.toLocaleDateString('id-ID', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="bg-background min-h-screen">
      {/* Preview Header */}
      <div className="bg-warning/10 border-b border-warning/20 px-4 py-3">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Icon name="Eye" size={20} className="text-warning" />
            <span className="font-body font-medium text-warning">
              Mode Preview - Artikel belum dipublikasikan
            </span>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={onExitPreview}
            iconName="Edit3"
            iconPosition="left"
          >
            Kembali ke Editor
          </Button>
        </div>
      </div>
      {/* Article Content */}
      <article className="max-w-4xl mx-auto px-4 py-8">
        {/* Category Badge */}
        {category && (
          <div className="mb-4">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-body font-medium bg-primary text-primary-foreground">
              {categoryLabels?.[category] || category}
            </span>
          </div>
        )}

        {/* Article Title */}
        <h1 className="font-heading font-bold text-3xl lg:text-4xl text-text-primary mb-4 leading-tight">
          {title || 'Judul Artikel'}
        </h1>

        {/* Article Meta */}
        <div className="flex flex-wrap items-center gap-4 text-sm text-text-secondary mb-6 pb-6 border-b border-border">
          <div className="flex items-center space-x-2">
            <Icon name="User" size={16} />
            <span>{author || 'Admin User'}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="Calendar" size={16} />
            <span>{formatDate(new Date())}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="Clock" size={16} />
            <span>{estimateReadingTime(content)} menit baca</span>
          </div>
        </div>

        {/* Featured Image */}
        {featuredImage && (
          <div className="mb-8">
            <div className="aspect-video w-full overflow-hidden rounded-lg">
              <Image
                src={featuredImage}
                alt={title}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        )}

        {/* Article Content */}
        <div 
          className="prose prose-lg max-w-none font-body text-text-primary leading-relaxed"
          dangerouslySetInnerHTML={{ __html: content || '<p>Konten artikel akan muncul di sini...</p>' }}
          style={{
            lineHeight: '1.8'
          }}
        />

        {/* Tags */}
        {tags && tags?.length > 0 && (
          <div className="mt-8 pt-6 border-t border-border">
            <h3 className="font-body font-semibold text-text-primary mb-3">Tags:</h3>
            <div className="flex flex-wrap gap-2">
              {tags?.map((tag, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm font-body bg-muted text-text-secondary hover:bg-primary/10 hover:text-primary transition-colors duration-200"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Social Share Buttons */}
        <div className="mt-8 pt-6 border-t border-border">
          <h3 className="font-body font-semibold text-text-primary mb-4">Bagikan Artikel:</h3>
          <div className="flex flex-wrap gap-3">
            <Button
              variant="outline"
              size="sm"
              iconName="MessageCircle"
              iconPosition="left"
              className="text-green-600 border-green-600 hover:bg-green-50"
            >
              WhatsApp
            </Button>
            <Button
              variant="outline"
              size="sm"
              iconName="Facebook"
              iconPosition="left"
              className="text-blue-600 border-blue-600 hover:bg-blue-50"
            >
              Facebook
            </Button>
            <Button
              variant="outline"
              size="sm"
              iconName="Twitter"
              iconPosition="left"
              className="text-sky-500 border-sky-500 hover:bg-sky-50"
            >
              Twitter
            </Button>
            <Button
              variant="outline"
              size="sm"
              iconName="Send"
              iconPosition="left"
              className="text-blue-500 border-blue-500 hover:bg-blue-50"
            >
              Telegram
            </Button>
          </div>
        </div>

        {/* Related Articles Placeholder */}
        <div className="mt-12 pt-8 border-t border-border">
          <h3 className="font-heading font-bold text-xl text-text-primary mb-6">
            Artikel Terkait
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3]?.map((item) => (
              <div key={item} className="bg-card border border-border rounded-lg overflow-hidden">
                <div className="aspect-video bg-muted flex items-center justify-center">
                  <Icon name="Image" size={32} className="text-text-secondary" />
                </div>
                <div className="p-4">
                  <h4 className="font-body font-semibold text-text-primary mb-2">
                    Artikel Terkait #{item}
                  </h4>
                  <p className="text-sm text-text-secondary">
                    Deskripsi singkat artikel terkait akan muncul di sini...
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </article>
    </div>
  );
};

export default PreviewMode;