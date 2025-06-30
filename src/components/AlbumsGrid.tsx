
import React from 'react';
import { AlbumCard } from './AlbumCard';

interface Album {
  id: string;
  name: string;
  artistName: string;
  artworkUrl100: string;
  genres: Array<{ name: string }>;
  url: string;
}

interface AlbumsGridProps {
  albums: Album[];
  isLoading: boolean;
}

export const AlbumsGrid: React.FC<AlbumsGridProps> = ({ albums, isLoading }) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {Array.from({ length: 20 }, (_, i) => (
          <div key={i} className="animate-pulse">
            <div className="bg-gray-200 aspect-square rounded-lg mb-3"></div>
            <div className="bg-gray-200 h-4 rounded mb-2"></div>
            <div className="bg-gray-200 h-3 rounded mb-2"></div>
            <div className="bg-gray-200 h-3 rounded w-2/3"></div>
          </div>
        ))}
      </div>
    );
  }

  if (albums.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">No albums found for the selected genre.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
      {albums.map((album) => (
        <AlbumCard key={album.id} album={album} />
      ))}
    </div>
  );
};
