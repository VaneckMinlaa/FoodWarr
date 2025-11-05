import { Ionicons } from '@expo/vector-icons';
import { Tabs, useSegments } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import TabBarIconWithBadge from '../../components/TabBarIconWithBadge';
import { favoritesService } from '../../services/favoritesService';

const PRIMARY_COLOR = '#4CAF50';

export default function TabsLayout() {
  const insets = useSafeAreaInsets();
  const [favoritesCount, setFavoritesCount] = useState(0);
  const segments = useSegments();

  // Load favorites count and update it
  useEffect(() => {
    const loadFavoritesCount = async () => {
      const favorites = await favoritesService.getFavorites();
      setFavoritesCount(favorites.length);
    };
    
    loadFavoritesCount();
    
    // Update count every 500ms to catch changes immediately
    const interval = setInterval(loadFavoritesCount, 500);
    return () => clearInterval(interval);
  }, []);

  // Also update when route changes (user navigates)
  useEffect(() => {
    const loadFavoritesCount = async () => {
      const favorites = await favoritesService.getFavorites();
      setFavoritesCount(favorites.length);
    };
    loadFavoritesCount();
  }, [segments]);

  return (
    <Tabs
      screenOptions={() => ({
        tabBarActiveTintColor: PRIMARY_COLOR,
        tabBarInactiveTintColor: '#999999',
        tabBarStyle: {
          height: 60 + insets.bottom,
          paddingBottom: insets.bottom > 0 ? insets.bottom : 10,
          paddingTop: 10,
          borderTopWidth: 1,
          borderTopColor: '#E0E0E0',
          backgroundColor: '#FFFFFF',
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
        },
        headerShown: false,
      })}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Accueil',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="favoris"
        options={{
          title: 'Favoris',
          tabBarIcon: ({ color, size }) => (
            <TabBarIconWithBadge
              name="heart"
              color={color}
              size={size}
              badgeCount={favoritesCount}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="apropos"
        options={{
          title: 'À propos',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="information-circle" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="fruits"
        options={{
          href: null, // Hide from tabs
        }}
      />
    </Tabs>
  );
}
