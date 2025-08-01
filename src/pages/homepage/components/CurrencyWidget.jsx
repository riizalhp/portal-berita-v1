import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const CurrencyWidget = () => {
  const [exchangeRates, setExchangeRates] = useState([]);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  // Mock currency data - in real app, this would come from financial API
  const mockCurrencyData = [
    {
      currency: "USD",
      name: "US Dollar",
      flag: "🇺🇸",
      buy: 15750,
      sell: 15850,
      change: 0.25,
      changePercent: 0.16
    },
    {
      currency: "EUR",
      name: "Euro",
      flag: "🇪🇺",
      buy: 17200,
      sell: 17350,
      change: -0.15,
      changePercent: -0.09
    },
    {
      currency: "SGD",
      name: "Singapore Dollar",
      flag: "🇸🇬",
      buy: 11650,
      sell: 11750,
      change: 0.08,
      changePercent: 0.07
    },
    {
      currency: "JPY",
      name: "Japanese Yen",
      flag: "🇯🇵",
      buy: 105.50,
      sell: 107.20,
      change: -0.30,
      changePercent: -0.28
    },
    {
      currency: "GBP",
      name: "British Pound",
      flag: "🇬🇧",
      buy: 19850,
      sell: 20100,
      change: 0.45,
      changePercent: 0.23
    },
    {
      currency: "AUD",
      name: "Australian Dollar",
      flag: "🇦🇺",
      buy: 10450,
      sell: 10580,
      change: -0.12,
      changePercent: -0.11
    }
  ];

  useEffect(() => {
    // Simulate API call
    const loadCurrencyData = () => {
      setExchangeRates(mockCurrencyData);
      setLastUpdated(new Date());
    };

    loadCurrencyData();
    
    // Update every 5 minutes
    const interval = setInterval(loadCurrencyData, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const formatCurrency = (amount, currency) => {
    if (currency === 'JPY') {
      return amount?.toFixed(2);
    }
    return amount?.toLocaleString('id-ID');
  };

  const getChangeColor = (change) => {
    if (change > 0) return 'text-green-600 bg-green-50';
    if (change < 0) return 'text-red-600 bg-red-50';
    return 'text-gray-600 bg-gray-50';
  };

  const getChangeIcon = (change) => {
    if (change > 0) return 'TrendingUp';
    if (change < 0) return 'TrendingDown';
    return 'Minus';
  };

  return (
    <div className="bg-card border border-border rounded-lg shadow-card p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <div className="p-2 bg-green-100 rounded-lg">
            <Icon name="DollarSign" size={16} className="text-green-600" />
          </div>
          <div>
            <h3 className="font-heading font-bold text-lg text-text-primary">
              Kurs Mata Uang
            </h3>
            <p className="font-caption text-xs text-text-secondary">
              Terhadap Rupiah (IDR)
            </p>
          </div>
        </div>
        
        <button
          onClick={() => window.location?.reload()}
          className="p-2 text-text-secondary hover:text-primary hover:bg-muted rounded-lg transition-colors duration-200"
          aria-label="Refresh kurs"
        >
          <Icon name="RefreshCw" size={16} />
        </button>
      </div>
      {/* Currency List */}
      <div className="space-y-3">
        {exchangeRates?.map((rate, index) => (
          <div
            key={rate?.currency}
            className="flex items-center justify-between p-3 rounded-lg hover:bg-muted transition-colors duration-200"
          >
            {/* Currency Info */}
            <div className="flex items-center space-x-3">
              <div className="text-2xl">{rate?.flag}</div>
              <div>
                <div className="font-body font-medium text-sm text-text-primary">
                  {rate?.currency}
                </div>
                <div className="font-caption text-xs text-text-secondary">
                  {rate?.name}
                </div>
              </div>
            </div>

            {/* Rates */}
            <div className="text-right">
              <div className="flex items-center space-x-2 mb-1">
                <div className="text-sm">
                  <span className="text-text-secondary text-xs">Beli: </span>
                  <span className="font-medium text-text-primary">
                    {formatCurrency(rate?.buy, rate?.currency)}
                  </span>
                </div>
                <div className="text-sm">
                  <span className="text-text-secondary text-xs">Jual: </span>
                  <span className="font-medium text-text-primary">
                    {formatCurrency(rate?.sell, rate?.currency)}
                  </span>
                </div>
              </div>
              
              {/* Change */}
              <div className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getChangeColor(rate?.change)}`}>
                <Icon name={getChangeIcon(rate?.change)} size={12} />
                <span>
                  {rate?.change > 0 ? '+' : ''}{rate?.change} ({rate?.changePercent > 0 ? '+' : ''}{rate?.changePercent}%)
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Market Status */}
      <div className="mt-6 pt-4 border-t border-border">
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center space-x-2 text-text-secondary">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span>Pasar Terbuka</span>
          </div>
          <div className="flex items-center space-x-1 text-text-secondary">
            <Icon name="Clock" size={12} />
            <span>
              Update {lastUpdated?.toLocaleTimeString('id-ID', { 
                hour: '2-digit', 
                minute: '2-digit' 
              })}
            </span>
          </div>
        </div>
      </div>
      {/* Disclaimer */}
      <div className="mt-3 p-3 bg-muted rounded-lg">
        <p className="text-xs text-text-secondary text-center">
          Kurs ini hanya untuk referensi. Kurs aktual dapat berbeda di setiap bank atau money changer.
        </p>
      </div>
    </div>
  );
};

export default CurrencyWidget;