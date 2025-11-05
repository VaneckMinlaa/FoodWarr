import AsyncStorage from '@react-native-async-storage/async-storage';
import { Fruit } from '../interfaces/Fruit';

const FAVORITES_KEY = '@favorites';

export const favoritesService = {
  async getFavorites(): Promise<Fruit[]> {
    try {
      const jsonValue = await AsyncStorage.getItem(FAVORITES_KEY);
      return jsonValue != null ? JSON.parse(jsonValue) : [];
    } catch (e) {
      console.error('Error getting favorites:', e);
      return [];
    }
  },

  async addFavorite(fruit: Fruit): Promise<void> {
    try {
      const favorites = await this.getFavorites();
      const exists = favorites.find(f => f.id === fruit.id);
      if (!exists) {
        favorites.push(fruit);
        await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
      }
    } catch (e) {
      console.error('Error adding favorite:', e);
    }
  },

  async removeFavorite(fruitId: number): Promise<void> {
    try {
      const favorites = await this.getFavorites();
      const filtered = favorites.filter(f => f.id !== fruitId);
      await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(filtered));
    } catch (e) {
      console.error('Error removing favorite:', e);
    }
  },

  async isFavorite(fruitId: number): Promise<boolean> {
    try {
      const favorites = await this.getFavorites();
      return favorites.some(f => f.id === fruitId);
    } catch (e) {
      return false;
    }
  }
};

