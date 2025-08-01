import React from 'react';
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import Icon from '../../../components/AppIcon';

const AnalyticsWidget = () => {
  const visitorData = [
    { name: 'Sen', visitors: 2400, pageViews: 4800 },
    { name: 'Sel', visitors: 1398, pageViews: 3200 },
    { name: 'Rab', visitors: 9800, pageViews: 12000 },
    { name: 'Kam', visitors: 3908, pageViews: 7800 },
    { name: 'Jum', visitors: 4800, pageViews: 9600 },
    { name: 'Sab', visitors: 3800, pageViews: 7200 },
    { name: 'Min', visitors: 4300, pageViews: 8600 }
  ];

  const popularArticles = [
    { title: 'Perkembangan Ekonomi Digital Indonesia', views: 15420 },
    { title: 'Teknologi AI dalam Pendidikan', views: 12350 },
    { title: 'Update Pemilu 2024 Terkini', views: 11200 },
    { title: 'Sepak Bola Liga Indonesia', views: 9800 },
    { title: 'Film Indonesia Terbaru', views: 8750 }
  ];

  const trafficSources = [
    { name: 'Organik', value: 45, color: '#1E40AF' },
    { name: 'Sosial Media', value: 25, color: '#059669' },
    { name: 'Direct', value: 20, color: '#DC2626' },
    { name: 'Referral', value: 10, color: '#F59E0B' }
  ];

  return (
    <div className="space-y-6">
      {/* Visitor Statistics */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-heading font-semibold text-text-primary">Statistik Pengunjung</h3>
          <div className="flex items-center space-x-2">
            <Icon name="TrendingUp" size={16} className="text-success" />
            <span className="text-sm font-medium text-success">+12.5%</span>
          </div>
        </div>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={visitorData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="name" stroke="#6B7280" fontSize={12} />
              <YAxis stroke="#6B7280" fontSize={12} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#FFFFFF', 
                  border: '1px solid #E5E7EB',
                  borderRadius: '8px',
                  fontSize: '12px'
                }}
              />
              <Line 
                type="monotone" 
                dataKey="visitors" 
                stroke="#1E40AF" 
                strokeWidth={2}
                dot={{ fill: '#1E40AF', strokeWidth: 2, r: 4 }}
                name="Pengunjung"
              />
              <Line 
                type="monotone" 
                dataKey="pageViews" 
                stroke="#059669" 
                strokeWidth={2}
                dot={{ fill: '#059669', strokeWidth: 2, r: 4 }}
                name="Halaman Dilihat"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Popular Articles */}
        <div className="bg-card border border-border rounded-lg p-6">
          <h3 className="text-lg font-heading font-semibold text-text-primary mb-4">Artikel Populer</h3>
          <div className="space-y-3">
            {popularArticles?.map((article, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-bold">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-body font-medium text-text-primary truncate max-w-xs">
                      {article?.title}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-1 text-text-secondary">
                  <Icon name="Eye" size={14} />
                  <span className="text-sm font-medium">{article?.views?.toLocaleString('id-ID')}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Traffic Sources */}
        <div className="bg-card border border-border rounded-lg p-6">
          <h3 className="text-lg font-heading font-semibold text-text-primary mb-4">Sumber Traffic</h3>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={trafficSources}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {trafficSources?.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry?.color} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value) => [`${value}%`, 'Persentase']}
                  contentStyle={{ 
                    backgroundColor: '#FFFFFF', 
                    border: '1px solid #E5E7EB',
                    borderRadius: '8px',
                    fontSize: '12px'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-2 mt-4">
            {trafficSources?.map((source, index) => (
              <div key={index} className="flex items-center space-x-2">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: source?.color }}
                />
                <span className="text-xs font-body text-text-secondary">
                  {source?.name} ({source?.value}%)
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsWidget;