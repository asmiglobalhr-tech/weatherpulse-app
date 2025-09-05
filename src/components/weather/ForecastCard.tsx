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
  const formatDay = (dateString: string) => {
    if (isToday) return "TODAY";
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { weekday: 'short' }).toUpperCase();
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'numeric', day: 'numeric' });
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

  const getDetailedCondition = (condition: string) => {
    const conditionLower = condition.toLowerCase();
    if (conditionLower.includes('clear')) {
      return 'Clear and sunny';
    } else if (conditionLower.includes('partly cloudy')) {
      return 'Partly cloudy with sunshine';
    } else if (conditionLower.includes('cloud')) {
      return 'Mostly cloudy';
    } else if (conditionLower.includes('rain')) {
      return 'Expect some rain';
    } else if (conditionLower.includes('thunder')) {
      return 'Thunderstorms possible';
    } else if (conditionLower.includes('snow')) {
      return 'Snow expected';
    }
    return condition;
  };

  return (
    <Card className="bg-glass backdrop-blur-glass border-glass text-white p-4 rounded-2xl shadow-soft hover:shadow-medium transition-all duration-300 hover:scale-[1.02]">
      <div className="grid grid-cols-12 gap-4 items-center">
        {/* Day and Date */}
        <div className="col-span-2">
          <div className="text-left">
            <p className="font-bold text-sm text-white/90">
              {formatDay(date)}
            </p>
            <p className="text-xs text-white/70">
              {formatDate(date)}
            </p>
          </div>
        </div>

        {/* Weather Icon */}
        <div className="col-span-1 text-center">
          <div className="text-2xl">
            {getWeatherIcon(condition)}
          </div>
        </div>

        {/* Temperature */}
        <div className="col-span-3 text-left">
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-bold">{maxTemp}°</span>
            <span className="text-lg text-white/60">{minTemp}°</span>
          </div>
        </div>

        {/* Weather Description */}
        <div className="col-span-4 text-center">
          <p className="text-sm font-medium text-white/90 capitalize">
            {getDetailedCondition(condition)}
          </p>
          <p className="text-xs text-white/70 mt-1">
            {condition}
          </p>
        </div>

        {/* Rain Probability */}
        <div className="col-span-2 text-right">
          {precipitationProbability > 0 && (
            <div className="flex items-center justify-end gap-1 text-blue-200">
              <Droplets className="h-4 w-4" />
              <span className="text-sm font-medium">{precipitationProbability}%</span>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};

export default ForecastCard;