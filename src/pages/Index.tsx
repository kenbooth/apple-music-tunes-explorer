
import React, { useState, useMemo } from 'react';
import { AlbumsGrid } from '@/components/AlbumsGrid';
import { GenreFilter } from '@/components/GenreFilter';
import { useAppleMusicAlbums } from '@/hooks/useAppleMusicAlbums';
import { Music } from 'lucide-react';

const Index = () => {
  const { albums, isLoading, error } = useAppleMusicAlbums();
  const [selectedGenre, setSelectedGenre] = useState('all');

  // Extract unique genres from albums
  const genres = useMemo(() => {
    const allGenres = albums.flatMap(album => 
      album.genres.map(genre => genre.name)
    );
    return [...new Set(allGenres)].sort();
  }, [albums]);

  // Filter albums based on selected genre
  const filteredAlbums = useMemo(() => {
    if (selectedGenre === 'all') return albums;
    return albums.filter(album => 
      album.genres.some(genre => genre.name === selectedGenre)
    );
  }, [albums, selectedGenre]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Music className="h-8 w-8 text-blue-600 mr-3" />
            <h1 className="text-4xl font-bold text-gray-900">
              Apple Music Most Played Albums
            </h1>
          </div>
          <p className="text-gray-600 text-lg">
            Discover the top 50 most played albums on Apple Music
          </p>
        </div>

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-8">
            <p className="text-red-700">{error}</p>
          </div>
        )}

        {/* Genre Filter */}
        {!isLoading && albums.length > 0 && (
          <GenreFilter
            genres={genres}
            selectedGenre={selectedGenre}
            onGenreChange={setSelectedGenre}
          />
        )}

        {/* Albums Grid */}
        <AlbumsGrid 
          albums={filteredAlbums} 
          isLoading={isLoading}
        />

        {/* Footer */}
        <div className="text-center mt-16 pt-8 border-t border-gray-200">
          <p className="text-gray-500 text-sm">
            Data provided by Apple Music • Updates daily
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
