
import React from 'react';

interface Album {
  id: string;
  name: string;
  artistName: string;
  artworkUrl100: string;
  genres: Array<{ name: string }>;
  url: string;
}

interface AlbumCardProps {
  album: Album;
}

export const AlbumCard: React.FC<AlbumCardProps> = ({ album }) => {
  const handleClick = () => {
    window.open(album.url, '_blank');
  };

  return (
    <div 
      className="group cursor-pointer transition-all duration-300 hover:scale-105"
      onClick={handleClick}
    >
      <div className="relative overflow-hidden rounded-lg shadow-md group-hover:shadow-xl transition-shadow duration-300">
        <img
          src={album.artworkUrl100.replace('100x100', '500x500')}
          alt={`${album.name} by ${album.artistName}`}
          className="w-full aspect-square object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
      </div>
      
      <div className="mt-3 space-y-1">
        <h3 className="font-semibold text-gray-900 line-clamp-2 text-sm leading-tight group-hover:text-blue-600 transition-colors">
          {album.name}
        </h3>
        <p className="text-gray-600 text-sm line-clamp-1">
          {album.artistName}
        </p>
        <p className="text-gray-500 text-xs">
          {album.genres.map(genre => genre.name).join(', ')}
        </p>
      </div>
    </div>
  );
};
