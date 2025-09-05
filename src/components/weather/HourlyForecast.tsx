import { Card } from "@/components/ui/card";
import { Droplets } from "lucide-react";

interface HourlyData {
  time: string;
  temperature: number;
  precipitationProbability: number;
  windSpeed: number;
}

interface HourlyForecastProps {
  hourlyData: HourlyData[];
}

const HourlyForecast = ({ hourlyData }: HourlyForecastProps) => {
  const formatHour = (timeString: string) => {
    const date = new Date(timeString);
    const hour = date.getHours();
    
    if (hour === 0) return "12 AM";
    if (hour === 12) return "12 PM";
    if (hour > 12) return `${hour - 12} PM`;
    return `${hour} AM`;
  };

  const isCurrentHour = (timeString: string) => {
    const hourFromString = new Date(timeString).getHours();
    const currentHour = new Date().getHours();
    return hourFromString === currentHour;
  };

  const getWeatherIcon = (temperature: number, precipitationProbability: number, timeString: string) => {
    const hour = new Date(timeString).getHours();
    const isNight = hour < 6 || hour > 20;
    
    if (precipitationProbability > 30) {
      return '🌧️';
    } else if (isNight) {
      return temperature >= 15 ? '🌙' : '🌙';
    } else {
      return temperature >= 25 ? '☀️' : 
             temperature >= 15 ? '🌤️' : '☁️';
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-white text-center mb-6">
        24-Hour Forecast
      </h2>
      
      <Card className="bg-glass backdrop-blur-glass border-glass p-6 rounded-2xl shadow-soft">
        <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
          {hourlyData.map((hour, index) => (
            <div
              key={hour.time}
              className={`flex-shrink-0 text-center p-4 rounded-xl transition-all duration-200 min-w-[100px] ${
                isCurrentHour(hour.time)
                  ? 'bg-white/20 text-white scale-105'
                  : 'text-white/80 hover:bg-white/10'
              }`}
            >
              <p className="text-sm font-medium mb-3">
                {index === 0 ? 'Now' : formatHour(hour.time)}
              </p>
              
              <div className="text-2xl mb-3">
                {getWeatherIcon(hour.temperature, hour.precipitationProbability, hour.time)}
              </div>
              
              <p className="text-xl font-bold mb-3">{hour.temperature}°C</p>
              
              {hour.precipitationProbability > 0 && (
                <div className="flex items-center justify-center gap-1 text-blue-200 mb-2">
                  <Droplets className="h-3 w-3" />
                  <span className="text-xs">{hour.precipitationProbability}%</span>
                </div>
              )}
              
              <p className="text-xs text-white/60">{hour.windSpeed} km/h</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default HourlyForecast;