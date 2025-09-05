import { Card } from "@/components/ui/card";
import { Droplets } from "lucide-react";

interface ForecastCardProps {
  date: string;
  maxTemp: number;
  minTemp: number;
  condition: string;
  precipitationProbability: number;
  isToday?: boolean;
}

const ForecastCard = ({ 
  date, 
  maxTemp, 
  minTemp, 
  condition, 
  precipitationProbability, 
  isToday = false 
}: ForecastCardProps) => {
  const formatDate = (dateString: string) => {
    if (isToday) return "Today";
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { weekday: 'long' });
  };

  const getWeatherIcon = (condition: string) => {
    const conditionLower = condition.toLowerCase();
    if (conditionLower.includes('clear') || conditionLower.includes('sunny')) {
      return '☀️';
    } else if (conditionLower.includes('cloud')) {
      return '☁️';
    } else if (conditionLower.includes('rain') || conditionLower.includes('drizzle')) {
      return '🌧️';
    } else if (conditionLower.includes('snow')) {
      return '❄️';
    } else if (conditionLower.includes('thunder')) {
      return '⛈️';
    } else if (conditionLower.includes('fog')) {
      return '🌫️';
    }
    return '🌤️';
  };

  return (
    <Card className="bg-glass backdrop-blur-glass border-glass text-white p-4 rounded-2xl shadow-soft hover:shadow-medium transition-all duration-300 hover:scale-[1.02]">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="font-semibold text-lg">
            {formatDate(date)}
          </p>
          <p className="text-white/70 text-sm capitalize">{condition}</p>
        </div>
        
        <div className="flex items-center gap-4">
          {precipitationProbability > 0 && (
            <div className="flex items-center gap-1 text-blue-200">
              <Droplets className="h-4 w-4" />
              <span className="text-sm">{precipitationProbability}%</span>
            </div>
          )}
          
          <div className="text-2xl">
            {getWeatherIcon(condition)}
          </div>
          
          <div className="text-right">
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold">{maxTemp}°C</span>
              <span className="text-lg text-white/70">{minTemp}°C</span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ForecastCard;