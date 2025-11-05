import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect, useLocalSearchParams, useRouter } from 'expo-router';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
    FlatList,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CategoryDrawer from '../../../components/CategoryDrawer';
import { categories } from '../../../data/categories';
import { fruits } from '../../../data/fruits';
import { Fruit } from '../../../interfaces/Fruit';
import { favoritesService } from '../../../services/favoritesService';

const PRIMARY_COLOR = '#4CAF50';

export default function FruitsListScreen() {
  const router = useRouter();
  const { categoryId } = useLocalSearchParams<{ categoryId?: string }>();
  const [selectedCategory, setSelectedCategory] = useState<string>(
    categoryId || 'tous'
  );
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [favorites, setFavorites] = useState<number[]>([]);

  // Load favorites when screen is focused
  useFocusEffect(
    useCallback(() => {
      const loadFavorites = async () => {
        const favs = await favoritesService.getFavorites();
        setFavorites(favs.map((f) => f.id));
      };
      loadFavorites();
    }, [])
  );

  useEffect(() => {
    if (categoryId) {
      setSelectedCategory(categoryId);
    }
  }, [categoryId]);

  const filteredFruits = useMemo(() => {
    if (selectedCategory === 'tous') {
      return fruits;
    }
    const category = categories.find((cat) => cat.id === selectedCategory);
    if (!category) return fruits;
    return fruits.filter((fruit) => fruit.categorie === category.nom);
  }, [selectedCategory]);

  const selectedCategoryData = categories.find(
    (cat) => cat.id === selectedCategory
  ) || categories[0];

  const handleFruitPress = (fruit: Fruit) => {
    router.push({
      pathname: '/(tabs)/fruits/[id]' as any,
      params: { fruit: JSON.stringify(fruit) },
    });
  };

  const openDrawer = () => {
    setDrawerVisible(true);
  };

  const handleFavoritePress = async (fruit: Fruit, e: any) => {
    e.stopPropagation(); // Prevent triggering the card press
    const isFavorite = favorites.includes(fruit.id);
    
    if (isFavorite) {
      await favoritesService.removeFavorite(fruit.id);
      setFavorites((prev) => prev.filter((id) => id !== fruit.id));
    } else {
      await favoritesService.addFavorite(fruit);
      setFavorites((prev) => [...prev, fruit.id]);
    }
  };

  const isFavorite = (fruitId: number) => {
    return favorites.includes(fruitId);
  };

  const renderFruitItem = ({ item }: { item: Fruit }) => {
    const fav = isFavorite(item.id);
    return (
      <TouchableOpacity
        style={styles.fruitCard}
        onPress={() => handleFruitPress(item)}
        activeOpacity={0.8}
      >
        <View style={styles.imageContainer}>
          <Image source={item.image as any} style={styles.fruitImage} resizeMode="cover" />
          <TouchableOpacity
            style={styles.favoriteIcon}
            onPress={(e) => handleFavoritePress(item, e)}
            activeOpacity={0.7}
          >
            <Ionicons
              name={fav ? 'heart' : 'heart-outline'}
              size={18}
              color={fav ? '#E91E63' : '#FFFFFF'}
            />
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
            <Text style={styles.timeText}>Stock: {item.stock}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View
        style={[
          styles.header,
          { backgroundColor: selectedCategoryData.couleur || PRIMARY_COLOR },
        ]}
      >
        <TouchableOpacity
          style={styles.menuButton}
          onPress={openDrawer}
          activeOpacity={0.7}
        >
          <Ionicons name="menu" size={28} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{selectedCategoryData.nom}</Text>
        <View style={styles.placeholder} />
      </View>

      {filteredFruits.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Ionicons name="ban-outline" size={80} color="#ccc" />
          <Text style={styles.emptyText}>Aucun fruit trouvé</Text>
        </View>
      ) : (
        <FlatList
          data={filteredFruits}
          renderItem={renderFruitItem}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          contentContainerStyle={styles.list}
          columnWrapperStyle={styles.row}
          showsVerticalScrollIndicator={false}
        />
      )}

      <CategoryDrawer
        visible={drawerVisible}
        onClose={() => setDrawerVisible(false)}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 15,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  menuButton: {
    padding: 5,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  placeholder: {
    width: 38,
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
  favoriteIcon: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
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
  },
  emptyText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#999',
    marginTop: 20,
  },
});
