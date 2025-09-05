import { Card } from "@/components/ui/card";
import { Sunrise, Sunset, Droplets, Gauge, Eye, Wind } from "lucide-react";

interface HighlightsProps {
  weather: {
    humidity: number;
    pressure: number;
    windSpeed: number;
    visibility: number;
  };
  sunrise?: string;
  sunset?: string;
}

const Highlights = ({ weather, sunrise, sunset }: HighlightsProps) => {
  const formatTime = (timeString: string) => {
    if (!timeString) return '--:--';
    const date = new Date(timeString);
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: false 
    });
  };

  const getUVStatus = (hour: number) => {
    if (hour >= 10 && hour <= 16) return { level: 'High', color: 'text-red-300' };
    if (hour >= 8 && hour <= 18) return { level: 'Moderate', color: 'text-yellow-300' };
    return { level: 'Low', color: 'text-green-300' };
  };

  const getHumidityStatus = (humidity: number) => {
    if (humidity >= 70) return { status: 'High', color: 'text-blue-300' };
    if (humidity >= 40) return { status: 'Normal', color: 'text-green-300' };
    return { status: 'Low', color: 'text-red-300' };
  };

  const getPressureStatus = (pressure: number) => {
    if (pressure >= 1020) return { status: 'High', color: 'text-green-300' };
    if (pressure >= 1000) return { status: 'Normal', color: 'text-blue-300' };
    return { status: 'Low', color: 'text-red-300' };
  };

  const getVisibilityStatus = (visibility: number) => {
    if (visibility >= 10) return { status: 'Excellent', color: 'text-green-300' };
    if (visibility >= 5) return { status: 'Good', color: 'text-blue-300' };
    if (visibility >= 2) return { status: 'Poor', color: 'text-yellow-300' };
    return { status: 'Very Poor', color: 'text-red-300' };
  };

  const currentHour = new Date().getHours();
  const uvStatus = getUVStatus(currentHour);
  const humidityStatus = getHumidityStatus(weather.humidity);
  const pressureStatus = getPressureStatus(weather.pressure);
  const visibilityStatus = getVisibilityStatus(weather.visibility);

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-white text-center mb-6">
        Today's Highlights
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Sunrise & Sunset */}
        <Card className="bg-glass backdrop-blur-glass border-glass text-white p-6 rounded-2xl shadow-soft">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Sunrise className="h-6 w-6 text-yellow-300" />
              <span className="text-lg font-semibold">Sunrise</span>
            </div>
            <p className="text-2xl font-bold">{formatTime(sunrise || '')}</p>
            
            <div className="flex items-center gap-3 pt-2 border-t border-white/20">
              <Sunset className="h-6 w-6 text-orange-300" />
              <span className="text-lg font-semibold">Sunset</span>
            </div>
            <p className="text-2xl font-bold">{formatTime(sunset || '')}</p>
          </div>
        </Card>

        {/* Humidity */}
        <Card className="bg-glass backdrop-blur-glass border-glass text-white p-6 rounded-2xl shadow-soft">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Droplets className="h-6 w-6 text-blue-300" />
              <span className="text-lg font-semibold">Humidity</span>
            </div>
            <p className="text-3xl font-bold">{weather.humidity}%</p>
            <p className={`text-sm ${humidityStatus.color}`}>
              {humidityStatus.status}
            </p>
          </div>
        </Card>

        {/* Pressure */}
        <Card className="bg-glass backdrop-blur-glass border-glass text-white p-6 rounded-2xl shadow-soft">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Gauge className="h-6 w-6 text-green-300" />
              <span className="text-lg font-semibold">Pressure</span>
            </div>
            <p className="text-3xl font-bold">{weather.pressure}</p>
            <p className="text-sm text-white/70">hPa</p>
            <p className={`text-sm ${pressureStatus.color}`}>
              {pressureStatus.status}
            </p>
          </div>
        </Card>

        {/* Wind Speed */}
        <Card className="bg-glass backdrop-blur-glass border-glass text-white p-6 rounded-2xl shadow-soft">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Wind className="h-6 w-6 text-gray-300" />
              <span className="text-lg font-semibold">Wind Speed</span>
            </div>
            <p className="text-3xl font-bold">{weather.windSpeed}</p>
            <p className="text-sm text-white/70">km/h</p>
          </div>
        </Card>

        {/* Visibility */}
        <Card className="bg-glass backdrop-blur-glass border-glass text-white p-6 rounded-2xl shadow-soft">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Eye className="h-6 w-6 text-purple-300" />
              <span className="text-lg font-semibold">Visibility</span>
            </div>
            <p className="text-3xl font-bold">{weather.visibility}</p>
            <p className="text-sm text-white/70">km</p>
            <p className={`text-sm ${visibilityStatus.color}`}>
              {visibilityStatus.status}
            </p>
          </div>
        </Card>

        {/* UV Index */}
        <Card className="bg-glass backdrop-blur-glass border-glass text-white p-6 rounded-2xl shadow-soft">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="h-6 w-6 bg-yellow-400 rounded-full flex items-center justify-center">
                <div className="h-3 w-3 bg-yellow-600 rounded-full"></div>
              </div>
              <span className="text-lg font-semibold">UV Index</span>
            </div>
            <p className="text-3xl font-bold">
              {currentHour >= 6 && currentHour <= 18 ? Math.floor(Math.random() * 10) + 1 : 0}
            </p>
            <p className={`text-sm ${uvStatus.color}`}>
              {uvStatus.level}
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Highlights;