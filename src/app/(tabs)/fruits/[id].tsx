import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Fruit } from '../../../interfaces/Fruit';
import { favoritesService } from '../../../services/favoritesService';

const PRIMARY_COLOR = '#4CAF50';

export default function FruitDetailScreen() {
  const router = useRouter();
  const { fruit: fruitParam } = useLocalSearchParams<{ fruit?: string }>();
  const [fruit, setFruit] = useState<Fruit | null>(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (fruitParam) {
      try {
        const parsedFruit = JSON.parse(fruitParam) as Fruit;
        setFruit(parsedFruit);
        checkFavorite(parsedFruit.id);
      } catch (e) {
        console.error('Error parsing fruit:', e);
      }
    }
  }, [fruitParam]);

  const checkFavorite = async (fruitId: number) => {
    const fav = await favoritesService.isFavorite(fruitId);
    setIsFavorite(fav);
  };

  const handleBack = () => {
    router.back();
  };


  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleIncreaseQuantity = () => {
    if (fruit && quantity < fruit.stock) {
      setQuantity(quantity + 1);
    }
  };

  const handleAddToCart = () => {
    if (!fruit) return;
    Alert.alert('Ajouté au panier', `${quantity} ${fruit.nom}(s) ajouté(s) !`);
  };

  if (!fruit) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.centerContainer}>
          <Text>Chargement...</Text>
        </View>
      </SafeAreaView>
    );
  }

  const totalPrice = fruit.prixVente * quantity;

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={handleBack}
            activeOpacity={0.7}
          >
            <Ionicons name="arrow-back" size={28} color="#FFFFFF" />
          </TouchableOpacity>
          <View style={styles.headerRight}>
            <TouchableOpacity
              style={styles.favoriteHeaderButton}
              onPress={async () => {
                if (isFavorite) {
                  await favoritesService.removeFavorite(fruit.id);
                  setIsFavorite(false);
                  Alert.alert('Retiré', 'Fruit retiré des favoris');
                } else {
                  await favoritesService.addFavorite(fruit);
                  setIsFavorite(true);
                  Alert.alert('Ajouté', 'Fruit ajouté aux favoris');
                }
              }}
            >
              <Ionicons
                name={isFavorite ? 'heart' : 'heart-outline'}
                size={24}
                color="#FFFFFF"
              />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.imageContainer}>
          <Image source={fruit.image as any} style={styles.fruitImage} resizeMode="cover" />
        </View>

        <View style={styles.content}>
          <Text style={styles.fruitName}>{fruit.nom}</Text>
          <View style={styles.infoRow}>
            <View style={styles.ratingContainer}>
              <Ionicons name="star" size={16} color="#FFD700" />
              <Text style={styles.ratingText}>5.0</Text>
            </View>
            <View style={styles.locationContainer}>
              <Ionicons name="location" size={14} color="#666" />
              <Text style={styles.locationText}>Disponible</Text>
            </View>
            <View style={styles.timeContainer}>
              <Ionicons name="time-outline" size={14} color="#666" />
              <Text style={styles.timeText}>Stock: {fruit.stock}</Text>
            </View>
          </View>

          <View style={styles.priceSection}>
            <Text style={styles.originalPrice}>{fruit.prixAchat.toFixed(2)} FCFA</Text>
            <Text style={styles.salePrice}>{fruit.prixVente.toFixed(2)} FCFA</Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Description</Text>
            <Text style={styles.description}>{fruit.description}</Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Détails</Text>
            <View style={styles.detailsGrid}>
              <View style={styles.detailItem}>
                <Text style={styles.detailLabel}>Prix d'achat</Text>
                <Text style={styles.detailValue}>{fruit.prixAchat.toFixed(2)} FCFA</Text>
              </View>
              <View style={styles.detailItem}>
                <Text style={styles.detailLabel}>Stock</Text>
                <Text style={styles.detailValue}>{fruit.stock}</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

      <View style={styles.actionBar}>
        <View style={styles.quantityControls}>
          <TouchableOpacity
            style={[styles.quantityButton, quantity === 1 && styles.quantityButtonDisabled]}
            onPress={handleDecreaseQuantity}
            disabled={quantity === 1}
          >
            <Ionicons
              name="remove"
              size={20}
              color={quantity === 1 ? '#ccc' : '#FFFFFF'}
            />
          </TouchableOpacity>
          <Text style={styles.quantityText}>{quantity}</Text>
          <TouchableOpacity
            style={[
              styles.quantityButton,
              quantity >= fruit.stock && styles.quantityButtonDisabled,
            ]}
            onPress={handleIncreaseQuantity}
            disabled={quantity >= fruit.stock}
          >
            <Ionicons
              name="add"
              size={20}
              color={quantity >= fruit.stock ? '#ccc' : '#FFFFFF'}
            />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={styles.addToCartButton}
          onPress={handleAddToCart}
          activeOpacity={0.8}
        >
          <Text style={styles.addToCartText}>Ajouter au panier</Text>
          <Ionicons name="cart" size={20} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    backgroundColor: PRIMARY_COLOR,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20,
    position: 'relative',
  },
  backButton: {
    padding: 5,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  favoriteHeaderButton: {
    padding: 5,
  },
  imageContainer: {
    alignItems: 'center',
    marginTop: -60,
    marginBottom: 20,
  },
  fruitImage: {
    width: 180,
    height: 180,
    borderRadius: 90,
    borderWidth: 6,
    borderColor: '#FFFFFF',
  },
  content: {
    padding: 20,
    paddingTop: 0,
  },
  fruitName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: 12,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    gap: 20,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 14,
    color: '#1A1A1A',
    marginLeft: 4,
    fontWeight: '600',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    fontSize: 12,
    color: '#666666',
    marginLeft: 4,
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timeText: {
    fontSize: 12,
    color: '#666666',
    marginLeft: 4,
  },
  priceSection: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 24,
  },
  originalPrice: {
    fontSize: 16,
    color: '#999999',
    textDecorationLine: 'line-through',
    marginRight: 12,
  },
  salePrice: {
    fontSize: 28,
    fontWeight: 'bold',
    color: PRIMARY_COLOR,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: 12,
  },
  description: {
    fontSize: 14,
    color: '#666666',
    lineHeight: 22,
  },
  detailsGrid: {
    flexDirection: 'row',
    gap: 15,
  },
  detailItem: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    padding: 15,
    borderRadius: 12,
  },
  detailLabel: {
    fontSize: 12,
    color: '#666666',
    marginBottom: 6,
  },
  detailValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1A1A1A',
  },
  actionBar: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 25,
    marginRight: 15,
    padding: 4,
  },
  quantityButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: PRIMARY_COLOR,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityButtonDisabled: {
    backgroundColor: '#E0E0E0',
  },
  quantityText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginHorizontal: 15,
    minWidth: 30,
    textAlign: 'center',
  },
  addToCartButton: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: PRIMARY_COLOR,
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  addToCartText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
});
