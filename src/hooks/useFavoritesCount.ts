import { useEffect, useState } from 'react';
import { favoritesService } from '../services/favoritesService';

export function useFavoritesCount() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const loadCount = async () => {
      const favorites = await favoritesService.getFavorites();
      setCount(favorites.length);
    };
    
    loadCount();
    
    // Update count every 500ms to catch changes
    const interval = setInterval(loadCount, 500);
    return () => clearInterval(interval);
  }, []);

  return count;
}
