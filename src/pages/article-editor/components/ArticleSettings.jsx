import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const ArticleSettings = ({ 
  settings, 
  onSettingsChange,
  onSchedulePublish,
  onSaveDraft 
}) => {
  const [showScheduler, setShowScheduler] = useState(false);
  const [scheduleDate, setScheduleDate] = useState('');
  const [scheduleTime, setScheduleTime] = useState('');

  const authorOptions = [
    { value: 'admin', label: 'Admin User' },
    { value: 'editor1', label: 'Andi Wijaya' },
    { value: 'editor2', label: 'Sari Indah' },
    { value: 'editor3', label: 'Budi Santoso' }
  ];

  const visibilityOptions = [
    { value: 'public', label: 'Publik' },
    { value: 'private', label: 'Privat' },
    { value: 'password', label: 'Dilindungi Password' }
  ];

  const statusOptions = [
    { value: 'draft', label: 'Draft' },
    { value: 'pending', label: 'Menunggu Review' },
    { value: 'published', label: 'Dipublikasikan' }
  ];

  const handleSettingChange = (key, value) => {
    onSettingsChange({
      ...settings,
      [key]: value
    });
  };

  const handleSchedule = () => {
    if (scheduleDate && scheduleTime) {
      const scheduledDateTime = new Date(`${scheduleDate}T${scheduleTime}`);
      onSchedulePublish(scheduledDateTime);
      setShowScheduler(false);
    }
  };

  const getCurrentDateTime = () => {
    const now = new Date();
    const date = now?.toISOString()?.split('T')?.[0];
    const time = now?.toTimeString()?.slice(0, 5);
    return { date, time };
  };

  React.useEffect(() => {
    const { date, time } = getCurrentDateTime();
    setScheduleDate(date);
    setScheduleTime(time);
  }, []);

  return (
    <div className="space-y-6">
      {/* Publication Status */}
      <div className="bg-muted/30 border border-border rounded-lg p-4">
        <h3 className="font-heading font-semibold text-text-primary mb-3 flex items-center">
          <Icon name="Settings" size={18} className="mr-2" />
          Pengaturan Publikasi
        </h3>
        
        <div className="space-y-4">
          <Select
            label="Status"
            options={statusOptions}
            value={settings?.status || 'draft'}
            onChange={(value) => handleSettingChange('status', value)}
          />

          <Select
            label="Visibilitas"
            options={visibilityOptions}
            value={settings?.visibility || 'public'}
            onChange={(value) => handleSettingChange('visibility', value)}
          />

          {settings?.visibility === 'password' && (
            <Input
              label="Password"
              type="password"
              value={settings?.password || ''}
              onChange={(e) => handleSettingChange('password', e?.target?.value)}
              placeholder="Masukkan password..."
            />
          )}
        </div>
      </div>
      {/* Author & Date */}
      <div className="bg-muted/30 border border-border rounded-lg p-4">
        <h3 className="font-heading font-semibold text-text-primary mb-3 flex items-center">
          <Icon name="User" size={18} className="mr-2" />
          Penulis & Tanggal
        </h3>
        
        <div className="space-y-4">
          <Select
            label="Penulis"
            options={authorOptions}
            value={settings?.author || 'admin'}
            onChange={(value) => handleSettingChange('author', value)}
          />

          <div>
            <label className="block text-sm font-body font-medium text-text-primary mb-2">
              Tanggal Publikasi
            </label>
            <div className="text-sm text-text-secondary">
              {new Date()?.toLocaleDateString('id-ID', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </div>
          </div>
        </div>
      </div>
      {/* Schedule Publishing */}
      <div className="bg-muted/30 border border-border rounded-lg p-4">
        <h3 className="font-heading font-semibold text-text-primary mb-3 flex items-center">
          <Icon name="Clock" size={18} className="mr-2" />
          Jadwal Publikasi
        </h3>
        
        {!showScheduler ? (
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowScheduler(true)}
            iconName="Calendar"
            iconPosition="left"
            fullWidth
          >
            Jadwalkan Publikasi
          </Button>
        ) : (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <Input
                label="Tanggal"
                type="date"
                value={scheduleDate}
                onChange={(e) => setScheduleDate(e?.target?.value)}
                min={getCurrentDateTime()?.date}
              />
              <Input
                label="Waktu"
                type="time"
                value={scheduleTime}
                onChange={(e) => setScheduleTime(e?.target?.value)}
              />
            </div>
            <div className="flex space-x-2">
              <Button
                variant="default"
                size="sm"
                onClick={handleSchedule}
                disabled={!scheduleDate || !scheduleTime}
                className="flex-1"
              >
                Jadwalkan
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowScheduler(false)}
                className="flex-1"
              >
                Batal
              </Button>
            </div>
          </div>
        )}
      </div>
      {/* Article Options */}
      <div className="bg-muted/30 border border-border rounded-lg p-4">
        <h3 className="font-heading font-semibold text-text-primary mb-3 flex items-center">
          <Icon name="ToggleLeft" size={18} className="mr-2" />
          Opsi Artikel
        </h3>
        
        <div className="space-y-3">
          <Checkbox
            label="Izinkan Komentar"
            checked={settings?.allowComments !== false}
            onChange={(e) => handleSettingChange('allowComments', e?.target?.checked)}
          />
          
          <Checkbox
            label="Tampilkan di Beranda"
            checked={settings?.showOnHomepage !== false}
            onChange={(e) => handleSettingChange('showOnHomepage', e?.target?.checked)}
          />
          
          <Checkbox
            label="Artikel Unggulan"
            checked={settings?.featured || false}
            onChange={(e) => handleSettingChange('featured', e?.target?.checked)}
          />
          
          <Checkbox
            label="Breaking News"
            checked={settings?.breakingNews || false}
            onChange={(e) => handleSettingChange('breakingNews', e?.target?.checked)}
          />
        </div>
      </div>
      {/* SEO Settings */}
      <div className="bg-muted/30 border border-border rounded-lg p-4">
        <h3 className="font-heading font-semibold text-text-primary mb-3 flex items-center">
          <Icon name="Search" size={18} className="mr-2" />
          SEO
        </h3>
        
        <div className="space-y-4">
          <Input
            label="URL Slug"
            type="text"
            value={settings?.slug || ''}
            onChange={(e) => handleSettingChange('slug', e?.target?.value)}
            placeholder="url-artikel-ini"
            description="URL ramah SEO untuk artikel ini"
          />
          
          <Checkbox
            label="Indeks di Mesin Pencari"
            checked={settings?.searchIndex !== false}
            onChange={(e) => handleSettingChange('searchIndex', e?.target?.checked)}
          />
        </div>
      </div>
      {/* Action Buttons */}
      <div className="space-y-2">
        <Button
          variant="outline"
          size="sm"
          onClick={onSaveDraft}
          iconName="Save"
          iconPosition="left"
          fullWidth
        >
          Simpan sebagai Draft
        </Button>
        
        <Button
          variant="destructive"
          size="sm"
          iconName="Trash2"
          iconPosition="left"
          fullWidth
          className="text-error hover:bg-error/10"
        >
          Hapus Draft
        </Button>
      </div>
    </div>
  );
};

export default ArticleSettings;