import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RichTextEditor = ({ content, onChange, placeholder = "Mulai menulis artikel Anda..." }) => {
  const [selectedText, setSelectedText] = useState('');
  const [showLinkDialog, setShowLinkDialog] = useState(false);
  const [linkUrl, setLinkUrl] = useState('');
  const editorRef = useRef(null);

  const formatButtons = [
    { command: 'bold', icon: 'Bold', title: 'Bold (Ctrl+B)' },
    { command: 'italic', icon: 'Italic', title: 'Italic (Ctrl+I)' },
    { command: 'underline', icon: 'Underline', title: 'Underline (Ctrl+U)' },
    { command: 'strikeThrough', icon: 'Strikethrough', title: 'Strikethrough' },
    { type: 'separator' },
    { command: 'formatBlock', value: 'h1', icon: 'Heading1', title: 'Heading 1' },
    { command: 'formatBlock', value: 'h2', icon: 'Heading2', title: 'Heading 2' },
    { command: 'formatBlock', value: 'h3', icon: 'Heading3', title: 'Heading 3' },
    { type: 'separator' },
    { command: 'insertUnorderedList', icon: 'List', title: 'Bullet List' },
    { command: 'insertOrderedList', icon: 'ListOrdered', title: 'Numbered List' },
    { command: 'outdent', icon: 'Outdent', title: 'Decrease Indent' },
    { command: 'indent', icon: 'Indent', title: 'Increase Indent' },
    { type: 'separator' },
    { command: 'justifyLeft', icon: 'AlignLeft', title: 'Align Left' },
    { command: 'justifyCenter', icon: 'AlignCenter', title: 'Align Center' },
    { command: 'justifyRight', icon: 'AlignRight', title: 'Align Right' },
    { type: 'separator' },
    { command: 'createLink', icon: 'Link', title: 'Insert Link' },
    { command: 'unlink', icon: 'Unlink', title: 'Remove Link' },
    { command: 'insertHorizontalRule', icon: 'Minus', title: 'Insert Horizontal Rule' },
    { type: 'separator' },
    { command: 'formatBlock', value: 'blockquote', icon: 'Quote', title: 'Quote' },
    { command: 'removeFormat', icon: 'RemoveFormatting', title: 'Clear Formatting' }
  ];

  useEffect(() => {
    if (editorRef?.current) {
      editorRef.current.innerHTML = content;
    }
  }, []);

  const handleCommand = (command, value = null) => {
    if (command === 'createLink') {
      const selection = window.getSelection();
      if (selection?.toString()) {
        setSelectedText(selection?.toString());
        setShowLinkDialog(true);
        return;
      }
    }

    if (command === 'formatBlock' && value === 'blockquote') {
      document.execCommand('formatBlock', false, 'blockquote');
    } else {
      document.execCommand(command, false, value);
    }
    
    editorRef?.current?.focus();
    handleContentChange();
  };

  const handleContentChange = () => {
    if (editorRef?.current && onChange) {
      onChange(editorRef?.current?.innerHTML);
    }
  };

  const insertLink = () => {
    if (linkUrl && selectedText) {
      document.execCommand('insertHTML', false, `<a href="${linkUrl}" target="_blank" rel="noopener noreferrer">${selectedText}</a>`);
      setShowLinkDialog(false);
      setLinkUrl('');
      setSelectedText('');
      handleContentChange();
    }
  };

  const handleKeyDown = (e) => {
    // Handle keyboard shortcuts
    if (e?.ctrlKey || e?.metaKey) {
      switch (e?.key) {
        case 'b':
          e?.preventDefault();
          handleCommand('bold');
          break;
        case 'i':
          e?.preventDefault();
          handleCommand('italic');
          break;
        case 'u':
          e?.preventDefault();
          handleCommand('underline');
          break;
        default:
          break;
      }
    }
  };

  return (
    <div className="bg-surface border border-border rounded-lg overflow-hidden">
      {/* Formatting Toolbar */}
      <div className="flex flex-wrap items-center gap-1 p-3 border-b border-border bg-muted/30">
        {formatButtons?.map((button, index) => {
          if (button?.type === 'separator') {
            return <div key={index} className="w-px h-6 bg-border mx-1" />;
          }

          return (
            <Button
              key={index}
              variant="ghost"
              size="icon"
              onClick={() => handleCommand(button?.command, button?.value)}
              title={button?.title}
              className="h-8 w-8 text-text-secondary hover:text-primary hover:bg-muted"
            >
              <Icon name={button?.icon} size={16} />
            </Button>
          );
        })}
      </div>
      {/* Editor Content */}
      <div className="relative">
        <div
          ref={editorRef}
          contentEditable
          onInput={handleContentChange}
          onKeyDown={handleKeyDown}
          className="min-h-[500px] p-6 focus:outline-none font-body text-text-primary leading-relaxed"
          style={{
            wordBreak: 'break-word',
            overflowWrap: 'break-word'
          }}
          data-placeholder={placeholder}
        />
        
        {/* Placeholder */}
        {!content && (
          <div className="absolute top-6 left-6 text-text-secondary pointer-events-none font-body">
            {placeholder}
          </div>
        )}
      </div>
      {/* Link Dialog */}
      {showLinkDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-surface border border-border rounded-lg p-6 w-full max-w-md mx-4">
            <h3 className="font-heading font-semibold text-lg text-text-primary mb-4">
              Tambah Link
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-body font-medium text-text-primary mb-2">
                  Teks: {selectedText}
                </label>
              </div>
              <div>
                <label className="block text-sm font-body font-medium text-text-primary mb-2">
                  URL
                </label>
                <input
                  type="url"
                  value={linkUrl}
                  onChange={(e) => setLinkUrl(e?.target?.value)}
                  placeholder="https://example.com"
                  className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  autoFocus
                />
              </div>
              <div className="flex justify-end space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setShowLinkDialog(false);
                    setLinkUrl('');
                    setSelectedText('');
                  }}
                >
                  Batal
                </Button>
                <Button
                  variant="default"
                  size="sm"
                  onClick={insertLink}
                  disabled={!linkUrl}
                >
                  Tambah Link
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RichTextEditor;