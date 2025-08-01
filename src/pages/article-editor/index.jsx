import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import EditorToolbar from './components/EditorToolbar';
import RichTextEditor from './components/RichTextEditor';
import ArticleMetadata from './components/ArticleMetadata';
import MediaPanel from './components/MediaPanel';
import ArticleSettings from './components/ArticleSettings';
import PreviewMode from './components/PreviewMode';

const ArticleEditor = () => {
  const navigate = useNavigate();
  
  // Article content state
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [tags, setTags] = useState([]);
  const [featuredImage, setFeaturedImage] = useState('');
  const [metaDescription, setMetaDescription] = useState('');
  
  // Editor state
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [saveStatus, setSaveStatus] = useState('unsaved'); // unsaved, saving, saved, error
  const [lastSaved, setLastSaved] = useState(null);
  
  // Article settings
  const [settings, setSettings] = useState({
    status: 'draft',
    visibility: 'public',
    author: 'admin',
    allowComments: true,
    showOnHomepage: true,
    featured: false,
    breakingNews: false,
    searchIndex: true,
    slug: ''
  });

  // Auto-save functionality
  useEffect(() => {
    const autoSaveInterval = setInterval(() => {
      if (title || content) {
        handleAutoSave();
      }
    }, 30000); // Auto-save every 30 seconds

    return () => clearInterval(autoSaveInterval);
  }, [title, content, category, tags, featuredImage, metaDescription, settings]);

  // Generate slug from title
  useEffect(() => {
    if (title && !settings?.slug) {
      const slug = title?.toLowerCase()?.replace(/[^a-z0-9\s-]/g, '')?.replace(/\s+/g, '-')?.replace(/-+/g, '-')?.trim();
      setSettings(prev => ({ ...prev, slug }));
    }
  }, [title]);

  const handleAutoSave = async () => {
    setSaveStatus('saving');
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const articleData = {
        title,
        content,
        category,
        tags,
        featuredImage,
        metaDescription,
        settings,
        lastModified: new Date()?.toISOString()
      };
      
      // In real app, save to localStorage or API
      localStorage.setItem('article-draft', JSON.stringify(articleData));
      
      setSaveStatus('saved');
      setLastSaved(new Date());
    } catch (error) {
      setSaveStatus('error');
      console.error('Auto-save failed:', error);
    }
  };

  const handleManualSave = async () => {
    await handleAutoSave();
  };

  const handlePublish = async () => {
    if (!title || !content || !category) {
      alert('Mohon lengkapi judul, konten, dan kategori sebelum mempublikasikan.');
      return;
    }

    setSaveStatus('saving');
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const articleData = {
        title,
        content,
        category,
        tags,
        featuredImage,
        metaDescription,
        settings: { ...settings, status: 'published' },
        publishedAt: new Date()?.toISOString()
      };
      
      // In real app, publish via API
      console.log('Publishing article:', articleData);
      
      setSaveStatus('saved');
      alert('Artikel berhasil dipublikasikan!');
      
      // Redirect to article or dashboard
      navigate('/admin-dashboard');
    } catch (error) {
      setSaveStatus('error');
      alert('Gagal mempublikasikan artikel. Silakan coba lagi.');
      console.error('Publish failed:', error);
    }
  };

  const handleSchedulePublish = async (scheduledDateTime) => {
    try {
      const articleData = {
        title,
        content,
        category,
        tags,
        featuredImage,
        metaDescription,
        settings: { ...settings, status: 'scheduled', scheduledAt: scheduledDateTime?.toISOString() }
      };
      
      console.log('Scheduling article:', articleData);
      alert(`Artikel dijadwalkan untuk dipublikasikan pada ${scheduledDateTime?.toLocaleString('id-ID')}`);
    } catch (error) {
      alert('Gagal menjadwalkan artikel.');
      console.error('Schedule failed:', error);
    }
  };

  const handleSaveDraft = async () => {
    const draftData = {
      title,
      content,
      category,
      tags,
      featuredImage,
      metaDescription,
      settings: { ...settings, status: 'draft' },
      savedAt: new Date()?.toISOString()
    };
    
    localStorage.setItem('article-draft', JSON.stringify(draftData));
    alert('Draft berhasil disimpan!');
  };

  const handleInsertMedia = (media) => {
    if (media?.type === 'image') {
      const imageHtml = `<img src="${media?.url}" alt="${media?.alt}" style="max-width: 100%; height: auto; margin: 1rem 0;" />`;
      setContent(prev => prev + imageHtml);
    } else if (media?.type === 'video') {
      const videoHtml = `<div style="margin: 1rem 0;"><iframe width="100%" height="315" src="${media?.url}" frameborder="0" allowfullscreen></iframe></div>`;
      setContent(prev => prev + videoHtml);
    }
  };

  const togglePreviewMode = () => {
    setIsPreviewMode(!isPreviewMode);
  };

  const canPublish = title && content && category;

  // Load draft on component mount
  useEffect(() => {
    const savedDraft = localStorage.getItem('article-draft');
    if (savedDraft) {
      try {
        const draftData = JSON.parse(savedDraft);
        setTitle(draftData?.title || '');
        setContent(draftData?.content || '');
        setCategory(draftData?.category || '');
        setTags(draftData?.tags || []);
        setFeaturedImage(draftData?.featuredImage || '');
        setMetaDescription(draftData?.metaDescription || '');
        setSettings(draftData?.settings || settings);
        setSaveStatus('saved');
        setLastSaved(new Date(draftData.lastModified || draftData.savedAt));
      } catch (error) {
        console.error('Failed to load draft:', error);
      }
    }
  }, []);

  if (isPreviewMode) {
    return (
      <PreviewMode
        title={title}
        content={content}
        category={category}
        tags={tags}
        featuredImage={featuredImage}
        author={settings?.author}
        onExitPreview={() => setIsPreviewMode(false)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Editor Toolbar */}
      <EditorToolbar
        onSave={handleManualSave}
        onPreview={togglePreviewMode}
        onPublish={handlePublish}
        saveStatus={saveStatus}
        isPreviewMode={isPreviewMode}
        canPublish={canPublish}
        onTogglePreview={togglePreviewMode}
      />
      {/* Main Editor Layout */}
      <div className="pt-16">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 py-6">
          <div className="grid lg:grid-cols-4 gap-6">
            {/* Main Content Area */}
            <div className="lg:col-span-3 space-y-6">
              {/* Article Metadata */}
              <div className="bg-surface border border-border rounded-lg p-6">
                <h2 className="font-heading font-semibold text-lg text-text-primary mb-4">
                  Informasi Artikel
                </h2>
                <ArticleMetadata
                  title={title}
                  onTitleChange={setTitle}
                  category={category}
                  onCategoryChange={setCategory}
                  tags={tags}
                  onTagsChange={setTags}
                  featuredImage={featuredImage}
                  onFeaturedImageChange={setFeaturedImage}
                  metaDescription={metaDescription}
                  onMetaDescriptionChange={setMetaDescription}
                />
              </div>

              {/* Rich Text Editor */}
              <div>
                <h2 className="font-heading font-semibold text-lg text-text-primary mb-4">
                  Konten Artikel
                </h2>
                <RichTextEditor
                  content={content}
                  onChange={setContent}
                  placeholder="Mulai menulis artikel Anda di sini...\n\nGunakan toolbar di atas untuk memformat teks, menambah heading, list, dan lainnya."
                />
              </div>

              {/* Media Panel - Mobile */}
              <div className="lg:hidden">
                <h2 className="font-heading font-semibold text-lg text-text-primary mb-4">
                  Media
                </h2>
                <MediaPanel onInsertMedia={handleInsertMedia} />
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              {/* Article Settings */}
              <div>
                <h2 className="font-heading font-semibold text-lg text-text-primary mb-4">
                  Pengaturan
                </h2>
                <ArticleSettings
                  settings={settings}
                  onSettingsChange={setSettings}
                  onSchedulePublish={handleSchedulePublish}
                  onSaveDraft={handleSaveDraft}
                />
              </div>

              {/* Media Panel - Desktop */}
              <div className="hidden lg:block">
                <h2 className="font-heading font-semibold text-lg text-text-primary mb-4">
                  Media
                </h2>
                <MediaPanel onInsertMedia={handleInsertMedia} />
              </div>

              {/* Save Status */}
              {lastSaved && (
                <div className="bg-muted/30 border border-border rounded-lg p-4">
                  <div className="text-sm text-text-secondary">
                    Terakhir disimpan: {lastSaved?.toLocaleTimeString('id-ID')}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleEditor;