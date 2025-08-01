import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const WeatherWidget = () => {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState([]);

  // Mock weather data - in real app, this would come from weather API
  const mockWeatherData = {
    current: {
      location: "Jakarta",
      temperature: 32,
      condition: "Cerah Berawan",
      humidity: 75,
      windSpeed: 12,
      icon: "Sun",
      lastUpdated: new Date()
    },
    forecast: [
      { day: "Hari Ini", high: 34, low: 26, condition: "Cerah Berawan", icon: "Sun" },
      { day: "Besok", high: 33, low: 25, condition: "Hujan Ringan", icon: "CloudRain" },
      { day: "Lusa", high: 31, low: 24, condition: "Berawan", icon: "Cloud" },
      { day: "Kamis", high: 35, low: 27, condition: "Cerah", icon: "Sun" },
      { day: "Jumat", high: 32, low: 25, condition: "Hujan", icon: "CloudRain" }
    ]
  };

  useEffect(() => {
    // Simulate API call
    const loadWeatherData = () => {
      setCurrentWeather(mockWeatherData?.current);
      setForecast(mockWeatherData?.forecast);
    };

    loadWeatherData();
    
    // Update every 30 minutes
    const interval = setInterval(loadWeatherData, 30 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const getWeatherIcon = (iconName) => {
    const iconMap = {
      "Sun": "Sun",
      "Cloud": "Cloud",
      "CloudRain": "CloudRain",
      "CloudSnow": "CloudSnow"
    };
    return iconMap?.[iconName] || "Sun";
  };

  const getWeatherColor = (condition) => {
    if (condition?.includes("Cerah")) return "text-yellow-500";
    if (condition?.includes("Hujan")) return "text-blue-500";
    if (condition?.includes("Berawan")) return "text-gray-500";
    return "text-gray-500";
  };

  if (!currentWeather) {
    return (
      <div className="bg-card border border-border rounded-lg shadow-card p-6">
        <div className="animate-pulse">
          <div className="h-4 bg-muted rounded w-3/4 mb-4"></div>
          <div className="h-8 bg-muted rounded w-1/2 mb-2"></div>
          <div className="h-4 bg-muted rounded w-2/3"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-lg shadow-card p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <div className="p-2 bg-blue-100 rounded-lg">
            <Icon name="MapPin" size={16} className="text-blue-600" />
          </div>
          <div>
            <h3 className="font-heading font-bold text-lg text-text-primary">
              Cuaca
            </h3>
            <p className="font-caption text-xs text-text-secondary">
              {currentWeather?.location}
            </p>
          </div>
        </div>
        
        <button
          onClick={() => window.location?.reload()}
          className="p-2 text-text-secondary hover:text-primary hover:bg-muted rounded-lg transition-colors duration-200"
          aria-label="Refresh cuaca"
        >
          <Icon name="RefreshCw" size={16} />
        </button>
      </div>
      {/* Current Weather */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-3">
            <div className={`p-3 rounded-full bg-gradient-to-br from-blue-100 to-blue-50`}>
              <Icon 
                name={getWeatherIcon(currentWeather?.icon)} 
                size={32} 
                className={getWeatherColor(currentWeather?.condition)}
              />
            </div>
            <div>
              <div className="text-3xl font-bold text-text-primary">
                {currentWeather?.temperature}°C
              </div>
              <div className="text-sm text-text-secondary">
                {currentWeather?.condition}
              </div>
            </div>
          </div>
        </div>

        {/* Weather Details */}
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center space-x-2">
            <Icon name="Droplets" size={14} className="text-blue-500" />
            <span className="text-text-secondary">Kelembaban</span>
            <span className="font-medium text-text-primary">{currentWeather?.humidity}%</span>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="Wind" size={14} className="text-gray-500" />
            <span className="text-text-secondary">Angin</span>
            <span className="font-medium text-text-primary">{currentWeather?.windSpeed} km/h</span>
          </div>
        </div>
      </div>
      {/* 5-Day Forecast */}
      <div>
        <h4 className="font-body font-medium text-sm text-text-primary mb-3">
          Prakiraan 5 Hari
        </h4>
        <div className="space-y-2">
          {forecast?.map((day, index) => (
            <div key={index} className="flex items-center justify-between py-2">
              <div className="flex items-center space-x-3 flex-1">
                <Icon 
                  name={getWeatherIcon(day?.icon)} 
                  size={20} 
                  className={getWeatherColor(day?.condition)}
                />
                <div className="flex-1">
                  <div className="text-sm font-medium text-text-primary">
                    {day?.day}
                  </div>
                  <div className="text-xs text-text-secondary">
                    {day?.condition}
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <span className="font-medium text-text-primary">{day?.high}°</span>
                <span className="text-text-secondary">{day?.low}°</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Last Updated */}
      <div className="mt-4 pt-4 border-t border-border">
        <div className="flex items-center justify-center space-x-1 text-xs text-text-secondary">
          <Icon name="Clock" size={12} />
          <span>
            Diperbarui {currentWeather?.lastUpdated?.toLocaleTimeString('id-ID', { 
              hour: '2-digit', 
              minute: '2-digit' 
            })}
          </span>
        </div>
      </div>
    </div>
  );
};

export default WeatherWidget;