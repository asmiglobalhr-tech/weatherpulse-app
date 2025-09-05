import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { MapPin } from "lucide-react";

interface SearchSuggestionsProps {
  query: string;
  onSelect: (cityName: string) => void;
  isVisible: boolean;
}

interface Suggestion {
  name: string;
  country: string;
  admin1?: string;
}

const SearchSuggestions = ({ query, onSelect, isVisible }: SearchSuggestionsProps) => {
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (query.length >= 3 && isVisible) {
      const fetchSuggestions = async () => {
        setLoading(true);
        try {
          const response = await fetch(
            `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(query)}&count=5&language=en&format=json`
          );
          const data = await response.json();
          
          if (data.results) {
            setSuggestions(data.results.map((result: any) => ({
              name: result.name,
              country: result.country,
              admin1: result.admin1
            })));
          }
        } catch (error) {
          console.error('Error fetching suggestions:', error);
        } finally {
          setLoading(false);
        }
      };

      const debounceTimer = setTimeout(fetchSuggestions, 300);
      return () => clearTimeout(debounceTimer);
    } else {
      setSuggestions([]);
    }
  }, [query, isVisible]);

  if (!isVisible || query.length < 3) return null;

  return (
    <Card className="absolute top-full left-0 right-0 z-50 bg-glass backdrop-blur-glass border-glass mt-2 max-h-64 overflow-y-auto">
      {loading ? (
        <div className="p-4 text-white/70 text-center">Searching...</div>
      ) : suggestions.length > 0 ? (
        <div className="py-2">
          {suggestions.map((suggestion, index) => (
            <button
              key={index}
              onClick={() => onSelect(suggestion.name)}
              className="w-full px-4 py-3 text-left hover:bg-white/10 transition-colors duration-200 flex items-center gap-2 text-white"
            >
              <MapPin className="h-4 w-4 text-white/70" />
              <div>
                <div className="font-medium">{suggestion.name}</div>
                <div className="text-sm text-white/70">
                  {suggestion.admin1 && `${suggestion.admin1}, `}{suggestion.country}
                </div>
              </div>
            </button>
          ))}
        </div>
      ) : (
        <div className="p-4 text-white/70 text-center">No cities found</div>
      )}
    </Card>
  );
};

export default SearchSuggestions;