import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import SearchBar from "@/components/weather/SearchBar";
import WeatherCard from "@/components/weather/WeatherCard";
import ForecastCard from "@/components/weather/ForecastCard";
import Highlights from "@/components/weather/Highlights";
import HourlyForecast from "@/components/weather/HourlyForecast";
import Loader from "@/components/weather/Loader";
import { searchCity, getWeatherData } from "@/lib/weather-api";

interface WeatherData {
  current: {
    temperature: number;
    feelsLike: number;
    condition: string;
    windSpeed: number;
    humidity: number;
    pressure: number;
    visibility: number;
  };
  daily: Array<{
    date: string;
    maxTemp: number;
    minTemp: number;
    condition: string;
    precipitationProbability: number;
    sunrise: string;
    sunset: string;
  }>;
  hourly: Array<{
    time: string;
    temperature: number;
    precipitationProbability: number;
    windSpeed: number;
  }>;
  location: {
    name: string;
    country: string;
  };
}

const Index = () => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [currentCity, setCurrentCity] = useState("London");
  const { toast } = useToast();

  const handleSearch = async (cityName: string) => {
    if (!cityName.trim()) return;
    
    setLoading(true);
    try {
      const locationData = await searchCity(cityName);
      if (!locationData) {
        toast({
          title: "City not found",
          description: "Please check the city name and try again.",
          variant: "destructive",
        });
        return;
      }

      const weather = await getWeatherData(locationData.latitude, locationData.longitude);
      setWeatherData({
        ...weather,
        location: {
          name: locationData.name,
          country: locationData.country,
        },
      });
      setCurrentCity(locationData.name);
    } catch (error) {
      toast({
        title: "Error fetching weather",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleSearch("London"); // Default city on load
  }, []);

  const getBackgroundClass = () => {
    if (!weatherData) return "bg-sky-gradient";
    
    const condition = weatherData.current.condition.toLowerCase();
    const hour = new Date().getHours();
    const isNight = hour < 6 || hour > 20;
    
    if (isNight) return "bg-night-gradient";
    if (condition.includes("rain") || condition.includes("drizzle")) return "bg-rainy-gradient";
    if (condition.includes("cloud")) return "bg-cloudy-gradient";
    if (condition.includes("sun") || condition.includes("clear")) return "bg-sunny-gradient";
    return "bg-sky-gradient";
  };

  return (
    <div className={`min-h-screen transition-all duration-700 ${getBackgroundClass()}`}>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <header className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-2 drop-shadow-lg">
            Weather Now
          </h1>
          <p className="text-white/80 text-lg">Real-time weather for any city</p>
        </header>

        {/* Search Bar */}
        <div className="max-w-md mx-auto mb-8">
          <SearchBar onSearch={handleSearch} defaultValue={currentCity} />
        </div>

        {loading && <Loader />}

        {weatherData && !loading && (
          <div className="space-y-8">
            {/* Current Weather */}
            <WeatherCard 
              weather={weatherData.current}
              location={weatherData.location}
            />

            {/* Today's Highlights */}
            <Highlights 
              weather={weatherData.current}
              sunrise={weatherData.daily[0]?.sunrise}
              sunset={weatherData.daily[0]?.sunset}
            />

            {/* Hourly Forecast */}
            <HourlyForecast hourlyData={weatherData.hourly.slice(0, 24)} />

            {/* 7-Day Forecast */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-white mb-6 text-center">
                7-Day Forecast
              </h2>
              <div className="grid gap-4">
                {weatherData.daily.slice(0, 7).map((day, index) => (
                  <ForecastCard
                    key={day.date}
                    date={day.date}
                    maxTemp={day.maxTemp}
                    minTemp={day.minTemp}
                    condition={day.condition}
                    precipitationProbability={day.precipitationProbability}
                    isToday={index === 0}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;