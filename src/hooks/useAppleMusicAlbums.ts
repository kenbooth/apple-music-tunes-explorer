
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
        
        const targetUrl = 'https://rss.marketingtools.apple.com/api/v2/us/music/most-played/50/albums.json';
        
        // Try multiple CORS proxy options
        const proxyUrls = [
          `https://cors-anywhere.herokuapp.com/${targetUrl}`,
          `https://api.allorigins.win/get?url=${encodeURIComponent(targetUrl)}`,
          `https://corsproxy.io/?${encodeURIComponent(targetUrl)}`,
        ];
        
        let data: AppleMusicResponse | null = null;
        let lastError: Error | null = null;
        
        for (const proxyUrl of proxyUrls) {
          try {
            console.log(`Trying proxy: ${proxyUrl}`);
            const response = await fetch(proxyUrl);
            
            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            if (proxyUrl.includes('allorigins.win')) {
              const proxyData = await response.json();
              data = JSON.parse(proxyData.contents);
            } else {
              data = await response.json();
            }
            
            console.log('Successfully fetched data with proxy:', proxyUrl);
            break;
          } catch (err) {
            console.log(`Proxy failed: ${proxyUrl}`, err);
            lastError = err as Error;
            continue;
          }
        }
        
        if (!data) {
          throw lastError || new Error('All CORS proxies failed');
        }
        
        console.log('Albums fetched successfully:', data.feed.results.length);
        setAlbums(data.feed.results);
        setError(null);
      } catch (err) {
        console.error('Error fetching albums:', err);
        setError('Failed to fetch albums. Using sample data for demonstration.');
        
        // Enhanced fallback data for better demo experience
        const mockAlbums: Album[] = [
          {
            id: '1',
            name: 'Midnights',
            artistName: 'Taylor Swift',
            artworkUrl100: 'https://is1-ssl.mzstatic.com/image/thumb/Music126/v4/1f/58/9e/1f589e3d-65c9-5b3f-a55c-7c3eed0a4c64/22UMGIM86841.rgb.jpg/100x100bb.jpg',
            genres: [{ name: 'Pop' }],
            url: '#'
          },
          {
            id: '2',
            name: 'Harry\'s House',
            artistName: 'Harry Styles',
            artworkUrl100: 'https://is1-ssl.mzstatic.com/image/thumb/Music126/v4/5e/c4/96/5ec49693-08c1-8e5e-64f5-bb4a4e4fd33b/886449965366.jpg/100x100bb.jpg',
            genres: [{ name: 'Pop' }],
            url: '#'
          },
          {
            id: '3',
            name: 'Un Verano Sin Ti',
            artistName: 'Bad Bunny',
            artworkUrl100: 'https://is1-ssl.mzstatic.com/image/thumb/Music126/v4/f0/19/47/f01947e0-3d80-8b4f-d0b6-ce84b52b5446/22UMGIM50796.rgb.jpg/100x100bb.jpg',
            genres: [{ name: 'Latin' }],
            url: '#'
          },
          {
            id: '4',
            name: 'Renaissance',
            artistName: 'Beyoncé',
            artworkUrl100: 'https://is1-ssl.mzstatic.com/image/thumb/Music122/v4/07/48/d5/0748d5ff-9a86-7a8c-b8e6-3b96eb25f9e4/886449834952.jpg/100x100bb.jpg',
            genres: [{ name: 'R&B/Soul' }],
            url: '#'
          },
          {
            id: '5',
            name: 'Music to Be Murdered By',
            artistName: 'Eminem',
            artworkUrl100: 'https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/d4/8b/7a/d48b7ac9-2dc9-b9e8-7b0c-6a1b8e8b9c8d/20UMGIM00001.rgb.jpg/100x100bb.jpg',
            genres: [{ name: 'Hip-Hop/Rap' }],
            url: '#'
          },
          {
            id: '6',
            name: 'Sour',
            artistName: 'Olivia Rodrigo',
            artworkUrl100: 'https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/a7/38/87/a7388784-ee85-8b91-b8b0-7c8fb77fe36c/21UMGIM19955.rgb.jpg/100x100bb.jpg',
            genres: [{ name: 'Pop' }],
            url: '#'
          },
          {
            id: '7',
            name: 'Donda',
            artistName: 'Kanye West',
            artworkUrl100: 'https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/82/ac/4c/82ac4ce8-5b81-33a8-0f96-8b4b8b8b8b8b/21UMGIM52272.rgb.jpg/100x100bb.jpg',
            genres: [{ name: 'Hip-Hop/Rap' }],
            url: '#'
          },
          {
            id: '8',
            name: 'Happier Than Ever',
            artistName: 'Billie Eilish',
            artworkUrl100: 'https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/53/8b/24/538b2407-4d75-0323-a645-0c9f31cd77b7/21UMGIM53592.rgb.jpg/100x100bb.jpg',
            genres: [{ name: 'Alternative' }],
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
