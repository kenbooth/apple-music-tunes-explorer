
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface GenreFilterProps {
  genres: string[];
  selectedGenre: string;
  onGenreChange: (genre: string) => void;
}

export const GenreFilter: React.FC<GenreFilterProps> = ({ 
  genres, 
  selectedGenre, 
  onGenreChange 
}) => {
  return (
    <div className="flex items-center space-x-3 mb-8">
      <label htmlFor="genre-select" className="text-sm font-medium text-gray-700">
        Filter by Genre:
      </label>
      <Select value={selectedGenre} onValueChange={onGenreChange}>
        <SelectTrigger className="w-48">
          <SelectValue placeholder="All Genres" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Genres</SelectItem>
          {genres.map((genre) => (
            <SelectItem key={genre} value={genre}>
              {genre}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
