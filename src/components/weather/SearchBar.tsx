import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import SearchSuggestions from "./SearchSuggestions";

interface SearchBarProps {
  onSearch: (city: string) => void;
  defaultValue?: string;
}

const SearchBar = ({ onSearch, defaultValue = "" }: SearchBarProps) => {
  const [city, setCity] = useState(defaultValue);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (city.trim()) {
      onSearch(city.trim());
      setShowSuggestions(false);
    }
  };

  const handleSuggestionSelect = (selectedCity: string) => {
    setCity(selectedCity);
    onSearch(selectedCity);
    setShowSuggestions(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCity(value);
    setShowSuggestions(value.length >= 3);
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <div className="relative flex-1">
        <Input
          type="text"
          value={city}
          onChange={handleInputChange}
          onFocus={() => city.length >= 3 && setShowSuggestions(true)}
          onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
          placeholder="Enter city name..."
          className="bg-glass backdrop-blur-glass border-glass text-white placeholder:text-white/70 pr-4 pl-4 py-3 text-lg rounded-2xl focus:ring-2 focus:ring-white/50 focus:border-transparent"
        />
        <SearchSuggestions
          query={city}
          onSelect={handleSuggestionSelect}
          isVisible={showSuggestions}
        />
      </div>
      <Button
        type="submit"
        size="lg"
        className="bg-white/20 hover:bg-white/30 text-white border-glass backdrop-blur-glass rounded-2xl px-6 transition-all duration-200 hover:scale-105"
      >
        <Search className="h-5 w-5" />
      </Button>
    </form>
  );
};

export default SearchBar;