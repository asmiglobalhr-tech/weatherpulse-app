import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface SearchBarProps {
  onSearch: (city: string) => void;
  defaultValue?: string;
}

const SearchBar = ({ onSearch, defaultValue = "" }: SearchBarProps) => {
  const [city, setCity] = useState(defaultValue);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (city.trim()) {
      onSearch(city.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <div className="relative flex-1">
        <Input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city name..."
          className="bg-glass backdrop-blur-glass border-glass text-white placeholder:text-white/70 pr-4 pl-4 py-3 text-lg rounded-2xl focus:ring-2 focus:ring-white/50 focus:border-transparent"
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