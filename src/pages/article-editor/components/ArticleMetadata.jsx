import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Image from '../../../components/AppImage';

const ArticleMetadata = ({ 
  title, 
  onTitleChange, 
  category, 
  onCategoryChange, 
  tags, 
  onTagsChange,
  featuredImage,
  onFeaturedImageChange,
  metaDescription,
  onMetaDescriptionChange
}) => {
  const [tagInput, setTagInput] = useState('');
  const [showImageUpload, setShowImageUpload] = useState(false);

  const categoryOptions = [
    { value: '', label: 'Pilih Kategori' },
    { value: 'politik', label: 'Politik' },
    { value: 'ekonomi', label: 'Ekonomi' },
    { value: 'teknologi', label: 'Teknologi' },
    { value: 'olahraga', label: 'Olahraga' },
    { value: 'hiburan', label: 'Hiburan' }
  ];

  const suggestedTags = [
    'breaking news', 'indonesia', 'jakarta', 'pemerintah', 'ekonomi digital',
    'startup', 'teknologi', 'ai', 'sepak bola', 'piala dunia', 'film indonesia',
    'musik', 'selebriti', 'covid-19', 'vaksin', 'pendidikan', 'kesehatan'
  ];

  const handleAddTag = (tag) => {
    if (tag && !tags?.includes(tag)) {
      onTagsChange([...tags, tag]);
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    onTagsChange(tags?.filter(tag => tag !== tagToRemove));
  };

  const handleTagInputKeyPress = (e) => {
    if (e?.key === 'Enter' || e?.key === ',') {
      e?.preventDefault();
      handleAddTag(tagInput?.trim());
    }
  };

  const handleImageUpload = (e) => {
    const file = e?.target?.files?.[0];
    if (file) {
      // In real app, this would upload to server
      const imageUrl = URL.createObjectURL(file);
      onFeaturedImageChange(imageUrl);
      setShowImageUpload(false);
    }
  };

  const filteredSuggestions = suggestedTags?.filter(tag => 
    tag?.toLowerCase()?.includes(tagInput?.toLowerCase()) && !tags?.includes(tag)
  );

  return (
    <div className="space-y-6">
      {/* Article Title */}
      <div>
        <Input
          label="Judul Artikel"
          type="text"
          value={title}
          onChange={(e) => onTitleChange(e?.target?.value)}
          placeholder="Masukkan judul artikel yang menarik..."
          required
          className="text-lg font-semibold"
        />
        <div className="mt-1 text-xs text-text-secondary">
          {title?.length}/100 karakter
        </div>
      </div>
      {/* Category Selection */}
      <div>
        <Select
          label="Kategori"
          options={categoryOptions}
          value={category}
          onChange={onCategoryChange}
          required
        />
      </div>
      {/* Tags Input */}
      <div>
        <label className="block text-sm font-body font-medium text-text-primary mb-2">
          Tags
        </label>
        
        {/* Current Tags */}
        {tags?.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-3">
            {tags?.map((tag, index) => (
              <span
                key={index}
                className="inline-flex items-center px-3 py-1 rounded-full text-sm font-body bg-primary/10 text-primary border border-primary/20"
              >
                {tag}
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleRemoveTag(tag)}
                  className="ml-1 h-4 w-4 text-primary hover:text-error"
                >
                  <Icon name="X" size={12} />
                </Button>
              </span>
            ))}
          </div>
        )}

        {/* Tag Input */}
        <div className="relative">
          <Input
            type="text"
            value={tagInput}
            onChange={(e) => setTagInput(e?.target?.value)}
            onKeyDown={handleTagInputKeyPress}
            placeholder="Ketik tag dan tekan Enter..."
          />
          
          {/* Tag Suggestions */}
          {tagInput && filteredSuggestions?.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-popover border border-border rounded-md shadow-elevated z-10 max-h-40 overflow-y-auto">
              {filteredSuggestions?.slice(0, 5)?.map((suggestion, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => handleAddTag(suggestion)}
                  className="w-full text-left px-3 py-2 text-sm font-body text-popover-foreground hover:bg-muted transition-colors duration-200"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
      {/* Featured Image */}
      <div>
        <label className="block text-sm font-body font-medium text-text-primary mb-2">
          Gambar Utama
        </label>
        
        {featuredImage ? (
          <div className="relative">
            <div className="aspect-video w-full overflow-hidden rounded-lg border border-border">
              <Image
                src={featuredImage}
                alt="Featured image"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute top-2 right-2 flex space-x-1">
              <Button
                variant="secondary"
                size="icon"
                onClick={() => setShowImageUpload(true)}
                className="h-8 w-8 bg-black/50 hover:bg-black/70 text-white border-0"
              >
                <Icon name="Edit2" size={14} />
              </Button>
              <Button
                variant="destructive"
                size="icon"
                onClick={() => onFeaturedImageChange('')}
                className="h-8 w-8 bg-black/50 hover:bg-error text-white border-0"
              >
                <Icon name="Trash2" size={14} />
              </Button>
            </div>
          </div>
        ) : (
          <div
            onClick={() => setShowImageUpload(true)}
            className="aspect-video w-full border-2 border-dashed border-border rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-primary transition-colors duration-200"
          >
            <Icon name="ImagePlus" size={48} className="text-text-secondary mb-2" />
            <p className="text-sm font-body text-text-secondary">
              Klik untuk menambah gambar utama
            </p>
          </div>
        )}

        {/* Image Upload Input */}
        {showImageUpload && (
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
            id="featured-image-upload"
            autoFocus
          />
        )}
        {showImageUpload && (
          <label
            htmlFor="featured-image-upload"
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 cursor-pointer"
            onClick={() => setShowImageUpload(false)}
          >
            <div
              className="bg-surface border border-border rounded-lg p-6 w-full max-w-md mx-4"
              onClick={(e) => e?.stopPropagation()}
            >
              <h3 className="font-heading font-semibold text-lg text-text-primary mb-4">
                Upload Gambar
              </h3>
              <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                <Icon name="Upload" size={32} className="text-text-secondary mx-auto mb-2" />
                <p className="text-sm font-body text-text-secondary mb-2">
                  Pilih gambar dari komputer Anda
                </p>
                <p className="text-xs text-text-secondary">
                  Format: JPG, PNG, WebP (Max: 5MB)
                </p>
              </div>
              <div className="flex justify-end space-x-2 mt-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowImageUpload(false)}
                >
                  Batal
                </Button>
              </div>
            </div>
          </label>
        )}
      </div>
      {/* Meta Description */}
      <div>
        <label className="block text-sm font-body font-medium text-text-primary mb-2">
          Meta Description (SEO)
        </label>
        <textarea
          value={metaDescription}
          onChange={(e) => onMetaDescriptionChange(e?.target?.value)}
          placeholder="Deskripsi singkat artikel untuk SEO dan media sosial..."
          rows={3}
          maxLength={160}
          className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none font-body"
        />
        <div className="mt-1 text-xs text-text-secondary">
          {metaDescription?.length}/160 karakter
        </div>
      </div>
    </div>
  );
};

export default ArticleMetadata;