import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const MediaPanel = ({ onInsertMedia }) => {
  const [activeTab, setActiveTab] = useState('upload');
  const [dragOver, setDragOver] = useState(false);

  // Mock uploaded media
  const [uploadedMedia] = useState([
    {
      id: 1,
      type: 'image',
      url: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=400',
      name: 'breaking-news.jpg',
      size: '2.3 MB',
      uploadDate: '2025-01-31'
    },
    {
      id: 2,
      type: 'image', 
      url: 'https://images.unsplash.com/photo-1586339949916-3e9457bef6d3?w=400',
      name: 'politics-meeting.jpg',
      size: '1.8 MB',
      uploadDate: '2025-01-30'
    },
    {
      id: 3,
      type: 'image',
      url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400',
      name: 'economy-chart.jpg',
      size: '3.1 MB',
      uploadDate: '2025-01-29'
    }
  ]);

  const tabs = [
    { id: 'upload', label: 'Upload', icon: 'Upload' },
    { id: 'gallery', label: 'Galeri', icon: 'Image' },
    { id: 'video', label: 'Video', icon: 'Video' }
  ];

  const handleDragOver = (e) => {
    e?.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e) => {
    e?.preventDefault();
    setDragOver(false);
  };

  const handleDrop = (e) => {
    e?.preventDefault();
    setDragOver(false);
    
    const files = Array.from(e?.dataTransfer?.files);
    files?.forEach(file => {
      if (file?.type?.startsWith('image/')) {
        // In real app, this would upload to server
        const imageUrl = URL.createObjectURL(file);
        onInsertMedia({
          type: 'image',
          url: imageUrl,
          alt: file?.name
        });
      }
    });
  };

  const handleFileUpload = (e) => {
    const files = Array.from(e?.target?.files);
    files?.forEach(file => {
      if (file?.type?.startsWith('image/')) {
        const imageUrl = URL.createObjectURL(file);
        onInsertMedia({
          type: 'image',
          url: imageUrl,
          alt: file?.name
        });
      }
    });
  };

  const handleInsertMedia = (media) => {
    onInsertMedia({
      type: media?.type,
      url: media?.url,
      alt: media?.name
    });
  };

  const handleInsertVideo = (videoUrl) => {
    if (videoUrl) {
      onInsertMedia({
        type: 'video',
        url: videoUrl,
        alt: 'Embedded video'
      });
    }
  };

  return (
    <div className="bg-surface border border-border rounded-lg overflow-hidden">
      {/* Tab Navigation */}
      <div className="flex border-b border-border">
        {tabs?.map(tab => (
          <button
            key={tab?.id}
            onClick={() => setActiveTab(tab?.id)}
            className={`flex-1 flex items-center justify-center space-x-2 px-4 py-3 text-sm font-body transition-colors duration-200 ${
              activeTab === tab?.id
                ? 'bg-primary text-primary-foreground'
                : 'text-text-secondary hover:text-primary hover:bg-muted'
            }`}
          >
            <Icon name={tab?.icon} size={16} />
            <span className="hidden sm:inline">{tab?.label}</span>
          </button>
        ))}
      </div>
      {/* Tab Content */}
      <div className="p-4">
        {/* Upload Tab */}
        {activeTab === 'upload' && (
          <div className="space-y-4">
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors duration-200 ${
                dragOver 
                  ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50'
              }`}
            >
              <Icon name="Upload" size={48} className="text-text-secondary mx-auto mb-4" />
              <h3 className="font-body font-medium text-text-primary mb-2">
                Drag & Drop Gambar
              </h3>
              <p className="text-sm text-text-secondary mb-4">
                atau klik untuk memilih file
              </p>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
                id="media-upload"
              />
              <label htmlFor="media-upload">
                <Button variant="outline" size="sm" asChild>
                  <span className="cursor-pointer">
                    Pilih File
                  </span>
                </Button>
              </label>
              <p className="text-xs text-text-secondary mt-2">
                Format: JPG, PNG, WebP, GIF (Max: 10MB per file)
              </p>
            </div>
          </div>
        )}

        {/* Gallery Tab */}
        {activeTab === 'gallery' && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {uploadedMedia?.map(media => (
                <div key={media?.id} className="group relative">
                  <div className="aspect-square overflow-hidden rounded-lg border border-border">
                    <Image
                      src={media?.url}
                      alt={media?.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                    />
                  </div>
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-200 rounded-lg flex items-center justify-center">
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => handleInsertMedia(media)}
                      className="opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                    >
                      Sisipkan
                    </Button>
                  </div>
                  <div className="mt-2">
                    <p className="text-xs font-body text-text-primary truncate">
                      {media?.name}
                    </p>
                    <p className="text-xs text-text-secondary">
                      {media?.size} • {media?.uploadDate}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            
            {uploadedMedia?.length === 0 && (
              <div className="text-center py-8">
                <Icon name="Image" size={48} className="text-text-secondary mx-auto mb-2" />
                <p className="text-sm text-text-secondary">
                  Belum ada media yang diupload
                </p>
              </div>
            )}
          </div>
        )}

        {/* Video Tab */}
        {activeTab === 'video' && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-body font-medium text-text-primary mb-2">
                URL Video YouTube
              </label>
              <div className="flex space-x-2">
                <input
                  type="url"
                  placeholder="https://www.youtube.com/watch?v=..."
                  className="flex-1 px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent font-body"
                  onKeyPress={(e) => {
                    if (e?.key === 'Enter') {
                      handleInsertVideo(e?.target?.value);
                      e.target.value = '';
                    }
                  }}
                />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={(e) => {
                    const input = e?.target?.parentElement?.querySelector('input');
                    handleInsertVideo(input?.value);
                    input.value = '';
                  }}
                >
                  Sisipkan
                </Button>
              </div>
            </div>

            <div className="border-t border-border pt-4">
              <h4 className="font-body font-medium text-text-primary mb-3">
                Video yang Didukung
              </h4>
              <div className="grid grid-cols-2 gap-3 text-sm text-text-secondary">
                <div className="flex items-center space-x-2">
                  <Icon name="Play" size={16} />
                  <span>YouTube</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon name="Play" size={16} />
                  <span>Vimeo</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon name="Play" size={16} />
                  <span>Dailymotion</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon name="Play" size={16} />
                  <span>MP4 Direct</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MediaPanel;