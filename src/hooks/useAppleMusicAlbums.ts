
import { useState, useEffect } from 'react';

interface Album {
  id: string;
  name: string;
  artistName: string;
  artworkUrl100: string;
  genres: Array<{ name: string }>;
  url: string;
}

interface AppleMusicResponse {
  feed: {
    results: Array<{
      id: string;
      name: string;
      artistName: string;
      artworkUrl100: string;
      genres: Array<{ name: string }>;
      url: string;
    }>;
  };
}

export const useAppleMusicAlbums = () => {
  const [albums, setAlbums] = useState<Album[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        setIsLoading(true);
        console.log('Fetching Apple Music albums...');
        
        // Using a CORS proxy to fetch the data
        const proxyUrl = 'https://api.allorigins.win/get?url=';
        const targetUrl = 'https://rss.marketingtools.apple.com/api/v2/us/music/most-played/50/albums.json';
        
        const response = await fetch(proxyUrl + encodeURIComponent(targetUrl));
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const proxyData = await response.json();
        const data: AppleMusicResponse = JSON.parse(proxyData.contents);
        
        console.log('Albums fetched successfully:', data.feed.results.length);
        setAlbums(data.feed.results);
        setError(null);
      } catch (err) {
        console.error('Error fetching albums:', err);
        setError('Failed to fetch albums. Please try again later.');
        
        // Fallback: create some mock data for demo purposes
        const mockAlbums: Album[] = [
          {
            id: '1',
            name: 'Sample Album 1',
            artistName: 'Sample Artist 1',
            artworkUrl100: 'https://via.placeholder.com/100',
            genres: [{ name: 'Pop' }],
            url: '#'
          },
          {
            id: '2',
            name: 'Sample Album 2',
            artistName: 'Sample Artist 2',
            artworkUrl100: 'https://via.placeholder.com/100',
            genres: [{ name: 'Rock' }],
            url: '#'
          }
        ];
        setAlbums(mockAlbums);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAlbums();
  }, []);

  return { albums, isLoading, error };
};
