import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const EditorToolbar = ({ 
  onSave, 
  onPreview, 
  onPublish, 
  saveStatus, 
  isPreviewMode, 
  canPublish,
  onTogglePreview 
}) => {
  const getSaveStatusColor = () => {
    switch (saveStatus) {
      case 'saving': return 'text-warning';
      case 'saved': return 'text-success';
      case 'error': return 'text-error';
      default: return 'text-text-secondary';
    }
  };

  const getSaveStatusText = () => {
    switch (saveStatus) {
      case 'saving': return 'Menyimpan...';
      case 'saved': return 'Tersimpan';
      case 'error': return 'Gagal menyimpan';
      default: return 'Belum disimpan';
    }
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-surface border-b border-border shadow-card">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between h-16 px-4 lg:px-6">
          {/* Logo & Back */}
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => window.history?.back()}
              className="text-text-secondary hover:text-primary"
            >
              <Icon name="ArrowLeft" size={20} />
            </Button>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Icon name="Edit3" size={16} color="white" />
              </div>
              <div className="hidden sm:block">
                <h1 className="font-heading font-bold text-lg text-primary">Editor Artikel</h1>
                <p className="font-caption text-xs text-text-secondary -mt-1">Portal Berita Indonesia</p>
              </div>
            </div>
          </div>

          {/* Save Status */}
          <div className="hidden md:flex items-center space-x-2">
            <Icon 
              name={saveStatus === 'saving' ? 'Loader2' : saveStatus === 'saved' ? 'Check' : 'AlertCircle'} 
              size={16} 
              className={`${getSaveStatusColor()} ${saveStatus === 'saving' ? 'animate-spin' : ''}`} 
            />
            <span className={`text-sm font-body ${getSaveStatusColor()}`}>
              {getSaveStatusText()}
            </span>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={onSave}
              iconName="Save"
              iconPosition="left"
              className="hidden sm:flex"
            >
              Simpan
            </Button>
            
            <Button
              variant={isPreviewMode ? "default" : "outline"}
              size="sm"
              onClick={onTogglePreview}
              iconName={isPreviewMode ? "Edit3" : "Eye"}
              iconPosition="left"
            >
              {isPreviewMode ? 'Edit' : 'Preview'}
            </Button>

            <Button
              variant="default"
              size="sm"
              onClick={onPublish}
              disabled={!canPublish}
              iconName="Send"
              iconPosition="left"
              className="bg-success hover:bg-success/90"
            >
              Publikasikan
            </Button>

            {/* Mobile Save */}
            <Button
              variant="ghost"
              size="icon"
              onClick={onSave}
              className="sm:hidden text-text-secondary hover:text-primary"
            >
              <Icon name="Save" size={20} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditorToolbar;