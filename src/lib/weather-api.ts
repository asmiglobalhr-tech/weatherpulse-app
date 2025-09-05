export interface LocationData {
  name: string;
  country: string;
  latitude: number;
  longitude: number;
}

export interface WeatherApiResponse {
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
}

export const searchCity = async (cityName: string): Promise<LocationData | null> => {
  try {
    const response = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(cityName)}&count=1&language=en&format=json`
    );
    
    if (!response.ok) {
      throw new Error('Failed to search city');
    }
    
    const data = await response.json();
    
    if (!data.results || data.results.length === 0) {
      return null;
    }
    
    const result = data.results[0];
    return {
      name: result.name,
      country: result.country,
      latitude: result.latitude,
      longitude: result.longitude,
    };
  } catch (error) {
    console.error('Error searching city:', error);
    return null;
  }
};

export const getWeatherData = async (latitude: number, longitude: number): Promise<WeatherApiResponse> => {
  try {
    const response = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,rain,showers,snowfall,weather_code,cloud_cover,pressure_msl,surface_pressure,wind_speed_10m,wind_direction_10m,wind_gusts_10m&hourly=temperature_2m,relative_humidity_2m,precipitation_probability,precipitation,rain,showers,snowfall,snow_depth,weather_code,pressure_msl,surface_pressure,cloud_cover,visibility,evapotranspiration,et0_fao_evapotranspiration,vapour_pressure_deficit,wind_speed_10m,wind_speed_80m,wind_speed_120m,wind_speed_180m,wind_direction_10m,wind_direction_80m,wind_direction_120m,wind_direction_180m,wind_gusts_10m,temperature_80m,temperature_120m,temperature_180m,soil_temperature_0cm,soil_temperature_6cm,soil_temperature_18cm,soil_temperature_54cm,soil_moisture_0_1cm,soil_moisture_1_3cm,soil_moisture_3_9cm,soil_moisture_9_27cm,soil_moisture_27_81cm&daily=weather_code,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,sunrise,sunset,daylight_duration,sunshine_duration,uv_index_max,uv_index_clear_sky_max,precipitation_sum,rain_sum,showers_sum,snowfall_sum,precipitation_hours,precipitation_probability_max,precipitation_probability_min,precipitation_probability_mean,wind_speed_10m_max,wind_gusts_10m_max,wind_direction_10m_dominant,shortwave_radiation_sum,et0_fao_evapotranspiration&timezone=auto`
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch weather data');
    }
    
    const data = await response.json();
    
    // Parse current weather
    const current = {
      temperature: Math.round(data.current.temperature_2m),
      feelsLike: Math.round(data.current.apparent_temperature),
      condition: getWeatherCondition(data.current.weather_code),
      windSpeed: Math.round(data.current.wind_speed_10m),
      humidity: data.current.relative_humidity_2m,
      pressure: Math.round(data.current.pressure_msl),
      visibility: Math.round((data.hourly.visibility[0] || 10000) / 1000),
    };
    
    // Parse daily forecast
    const daily = data.daily.time.map((date: string, index: number) => ({
      date,
      maxTemp: Math.round(data.daily.temperature_2m_max[index]),
      minTemp: Math.round(data.daily.temperature_2m_min[index]),
      condition: getWeatherCondition(data.daily.weather_code[index]),
      precipitationProbability: Math.round(data.daily.precipitation_probability_mean[index] || 0),
      sunrise: data.daily.sunrise[index],
      sunset: data.daily.sunset[index],
    }));
    
    // Parse hourly forecast
    const hourly = data.hourly.time.slice(0, 24).map((time: string, index: number) => ({
      time,
      temperature: Math.round(data.hourly.temperature_2m[index]),
      precipitationProbability: Math.round(data.hourly.precipitation_probability[index] || 0),
      windSpeed: Math.round(data.hourly.wind_speed_10m[index]),
    }));
    
    return { current, daily, hourly };
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw error;
  }
};

const getWeatherCondition = (weatherCode: number): string => {
  const weatherCodes: { [key: number]: string } = {
    0: 'Clear sky',
    1: 'Mainly clear',
    2: 'Partly cloudy',
    3: 'Overcast',
    45: 'Foggy',
    48: 'Depositing rime fog',
    51: 'Light drizzle',
    53: 'Moderate drizzle',
    55: 'Dense drizzle',
    56: 'Light freezing drizzle',
    57: 'Dense freezing drizzle',
    61: 'Slight rain',
    63: 'Moderate rain',
    65: 'Heavy rain',
    66: 'Light freezing rain', 
    67: 'Heavy freezing rain',
    71: 'Slight snow fall',
    73: 'Moderate snow fall',
    75: 'Heavy snow fall',
    77: 'Snow grains',
    80: 'Slight rain showers',
    81: 'Moderate rain showers',
    82: 'Violent rain showers',
    85: 'Slight snow showers',
    86: 'Heavy snow showers',
    95: 'Thunderstorm',
    96: 'Thunderstorm with slight hail',
    99: 'Thunderstorm with heavy hail',
  };
  
  return weatherCodes[weatherCode] || 'Unknown';
};