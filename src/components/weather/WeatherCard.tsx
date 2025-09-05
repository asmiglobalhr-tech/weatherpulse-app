import { Card } from "@/components/ui/card";
import { MapPin, Thermometer, Wind } from "lucide-react";

interface WeatherCardProps {
  weather: {
    temperature: number;
    feelsLike: number;
    condition: string;
    windSpeed: number;
    humidity: number;
  };
  location: {
    name: string;
    country: string;
  };
}

const WeatherCard = ({ weather, location }: WeatherCardProps) => {
  const getWeatherIcon = () => {
    const condition = weather.condition.toLowerCase();
    const hour = new Date().getHours();
    const isNight = hour < 6 || hour > 20;
    
    if (condition.includes('rain') || condition.includes('drizzle') || condition.includes('shower')) {
      return '🌧️';
    } else if (condition.includes('snow')) {
      return '🌨️';
    } else if (condition.includes('thunder')) {
      return '⛈️';
    } else if (isNight) {
      return condition.includes('clear') ? '🌙' : '☁️';
    } else {
      if (condition.includes('clear') || condition.includes('sun')) return '☀️';
      if (condition.includes('partly')) return '🌤️';
      return '☁️';
    }
  };

  return (
    <Card className="bg-glass backdrop-blur-glass border-glass text-white p-8 rounded-3xl shadow-soft max-w-2xl mx-auto">
      <div className="text-center space-y-4">
        {/* Location */}
        <div className="flex items-center justify-center gap-2 text-white/80">
          <MapPin className="h-5 w-5" />
          <span className="text-lg">{location.name}, {location.country}</span>
        </div>

        {/* Main Temperature */}
        <div className="space-y-2">
          <div className="flex items-center justify-center gap-4">
            <div className="text-6xl">
              {getWeatherIcon()}
            </div>
            <div className="text-7xl md:text-8xl font-bold tracking-tight">
              {weather.temperature}°C
            </div>
          </div>
          <p className="text-2xl text-white/90 capitalize">{weather.condition}</p>
        </div>

        {/* Weather Details */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 pt-6 border-t border-white/20">
          <div className="text-center">
            <Thermometer className="h-6 w-6 mx-auto mb-2 text-white/70" />
            <p className="text-sm text-white/70">Feels like</p>
            <p className="text-xl font-semibold">{weather.feelsLike}°C</p>
          </div>
          
          <div className="text-center">
            <Wind className="h-6 w-6 mx-auto mb-2 text-white/70" />
            <p className="text-sm text-white/70">Wind</p>
            <p className="text-xl font-semibold">{weather.windSpeed} km/h</p>
          </div>
          
          <div className="text-center col-span-2 md:col-span-1">
            <div className="h-6 w-6 mx-auto mb-2 bg-white/20 rounded-full flex items-center justify-center">
              <div className="h-3 w-3 bg-white/70 rounded-full"></div>
            </div>
            <p className="text-sm text-white/70">Humidity</p>
            <p className="text-xl font-semibold">{weather.humidity}%</p>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default WeatherCard;