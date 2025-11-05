import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect, useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    Alert,
    FlatList,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Fruit } from '../../interfaces/Fruit';
import { favoritesService } from '../../services/favoritesService';

const PRIMARY_COLOR = '#4CAF50';

export default function FavoritesScreen() {
  const router = useRouter();
  const [favorites, setFavorites] = useState<Fruit[]>([]);

  useFocusEffect(
    React.useCallback(() => {
      loadFavorites();
    }, [])
  );

  const loadFavorites = async () => {
    const favs = await favoritesService.getFavorites();
    setFavorites(favs);
  };

  const handleRemoveFavorite = async (fruitId: number) => {
    Alert.alert(
      'Retirer des favoris',
      'Voulez-vous retirer ce fruit de vos favoris ?',
      [
        { text: 'Annuler', style: 'cancel' },
        {
          text: 'Retirer',
          style: 'destructive',
          onPress: async () => {
            await favoritesService.removeFavorite(fruitId);
            loadFavorites();
          },
        },
      ]
    );
  };

  const handleFruitPress = (fruit: Fruit) => {
    router.push({
      pathname: '/(tabs)/fruits/[id]' as any,
      params: { fruit: JSON.stringify(fruit) },
    });
  };

  const renderFruitItem = ({ item }: { item: Fruit }) => (
    <TouchableOpacity
      style={styles.fruitCard}
      onPress={() => handleFruitPress(item)}
      activeOpacity={0.8}
    >
      <View style={styles.imageContainer}>
        <Image source={item.image as any} style={styles.fruitImage} resizeMode="cover" />
        <TouchableOpacity
          style={styles.favoriteButton}
          onPress={(e) => {
            e.stopPropagation();
            handleRemoveFavorite(item.id);
          }}
        >
          <Ionicons name="heart" size={20} color="#E91E63" />
        </TouchableOpacity>
      </View>
      <View style={styles.fruitInfo}>
        <Text style={styles.fruitName} numberOfLines={1}>
          {item.nom}
        </Text>
        <Text style={styles.fruitPrice}>{item.prixVente.toFixed(2)} FCFA</Text>
        <View style={styles.ratingContainer}>
          <Ionicons name="star" size={14} color="#FFD700" />
          <Text style={styles.ratingText}>5.0</Text>
        </View>
        <View style={styles.timeContainer}>
          <Ionicons name="time-outline" size={12} color="#666" />
          <Text style={styles.timeText}>En stock</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  if (favorites.length === 0) {
    return (
      <SafeAreaView style={styles.container} edges={['top']}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Mes Favoris</Text>
        </View>
        <ScrollView
          contentContainerStyle={styles.emptyContainer}
          showsVerticalScrollIndicator={false}
        >
          <Ionicons name="heart-outline" size={80} color="#ccc" />
          <Text style={styles.emptyText}>Aucun favori</Text>
          <Text style={styles.emptySubtext}>
            Ajoutez des fruits à vos favoris depuis la liste
          </Text>
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Mes Favoris</Text>
        <Text style={styles.headerSubtitle}>{favorites.length} fruit(s)</Text>
      </View>
      <FlatList
        data={favorites}
        renderItem={renderFruitItem}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        contentContainerStyle={styles.list}
        columnWrapperStyle={styles.row}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
  },
  header: {
    padding: 20,
    paddingBottom: 10,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#666666',
  },
  list: {
    padding: 15,
    paddingBottom: 20,
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  fruitCard: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  imageContainer: {
    width: '100%',
    height: 140,
    position: 'relative',
  },
  fruitImage: {
    width: '100%',
    height: '100%',
  },
  favoriteButton: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  fruitInfo: {
    padding: 12,
  },
  fruitName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: 6,
  },
  fruitPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: PRIMARY_COLOR,
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  ratingText: {
    fontSize: 12,
    color: '#666666',
    marginLeft: 4,
    fontWeight: '500',
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timeText: {
    fontSize: 11,
    color: '#666666',
    marginLeft: 4,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
    minHeight: 400,
  },
  emptyText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#999',
    marginTop: 20,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
    marginTop: 10,
    paddingHorizontal: 40,
  },
});
