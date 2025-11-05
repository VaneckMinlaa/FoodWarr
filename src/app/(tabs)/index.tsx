import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useMemo } from 'react';
import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ImageBackground
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { categories } from '../../data/categories';
import { fruits } from '../../data/fruits';
import { Fruit } from '../../interfaces/Fruit';

export default function HomeScreen() {
  const router = useRouter();

  const popularFruits = useMemo(() => {
    return fruits.slice(0, 5); // Top 5 fruits
  }, []);

  const handleCategoryPress = (categoryId: string) => {
    router.push({
      pathname: '/(tabs)/fruits' as any,
      params: { categoryId },
    });
  };

  const handleFruitPress = (fruit: Fruit) => {
    router.push({
      pathname: '/(tabs)/fruits/[id]' as any,
      params: { fruit: JSON.stringify(fruit) },
    });
  };

  const renderCategoryItem = ({ item }: { item: typeof categories[0] }) => {
    if (item.id === 'tous') return null;
    
    // Trouver un fruit de cette catégorie pour l'icône
    const categoryFruit = fruits.find(f => f.categorie === item.nom);
    
    return (
      <TouchableOpacity
        style={styles.categoryCard}
        onPress={() => handleCategoryPress(item.id)}
        activeOpacity={0.7}
      >
        <View style={[styles.categoryIconContainer, { backgroundColor: item.couleur + '20' }]}>
          {categoryFruit ? (
            <Image
              source={categoryFruit.image as any}
              style={styles.categoryIcon}
              resizeMode="cover"
            />
          ) : (
            <Ionicons name="leaf" size={40} color={item.couleur} />
          )}
        </View>
        <Text style={styles.categoryCardText}>{item.nom}</Text>
      </TouchableOpacity>
    );
  };

  const renderPopularItem = ({ item }: { item: Fruit }) => (
    <TouchableOpacity
      style={styles.popularCard}
      onPress={() => handleFruitPress(item)}
      activeOpacity={0.7}
    >
      <View style={styles.popularCardLeft}>
        <View style={styles.popularCardHeader}>
          <Text style={styles.popularCardTitle} numberOfLines={1}>
            {item.nom}
          </Text>
        </View>
        <Text style={styles.popularCardPrice}>
          {item.prixVente.toFixed(2)} FCFA
        </Text>
        <Text style={styles.popularCardDescription} numberOfLines={2}>
          {item.description}
        </Text>
        <View style={styles.ratingContainer}>
          <Ionicons name="star" size={14} color="#FFD700" />
          <Text style={styles.ratingText}>5.0</Text>
        </View>
      </View>
      <View style={styles.popularCardRight}>
        <Image
          source={item.image as any}
          style={styles.popularCardImage}
          resizeMode="cover"
        />
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        nestedScrollEnabled={true}
      >
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Text style={styles.greeting}>Salut ! </Text>
            <Text style={styles.tagline}>Ne tardez pas, commandez vos fruits !</Text>
          </View>
        </View>

        {/* Promotional Banner */}
        <ImageBackground
          source={popularFruits[3]?.image as any}
          style={styles.banner}
          resizeMode="cover" 
          imageStyle={{ borderRadius: 1 }} 
        >
          <View style={styles.bannerContent}>
            <View style={styles.bannerLeft}>
              <Text style={styles.bannerTitle}>
                Fruits frais avec 15% de réduction !
              </Text>
              <Text style={styles.bannerDescription}>
                Profitez de nos fruits délicieux à prix réduit avec notre offre spéciale.
              </Text>

              <TouchableOpacity
                style={styles.bannerButton}
                onPress={() => handleCategoryPress('fruits-frais')}
                activeOpacity={0.8}
              >
                <Text style={styles.bannerButtonText}>Commander</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ImageBackground>

        <View style={styles.bannerIndicators}>
          <View style={[styles.indicator, styles.indicatorActive]} />
          <View style={styles.indicator} />
          <View style={styles.indicator} />
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Catégories</Text>
            <TouchableOpacity onPress={() => handleCategoryPress('tous')}>
              <Text style={styles.seeAllText}>Voir tout</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={categories.filter((cat) => cat.id !== 'tous')}
            renderItem={renderCategoryItem}
            keyExtractor={(item) => item.id}
            horizontal
            scrollEnabled={true}
            showsHorizontalScrollIndicator={false}
            nestedScrollEnabled={true}
            contentContainerStyle={styles.categoriesList}
            style={styles.categoriesFlatList}
          />
        </View>

        {/* Popular Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Populaires</Text>
            <TouchableOpacity onPress={() => router.push('/(tabs)/fruits' as any)}>
              <Text style={styles.seeAllText}>Voir tout</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={popularFruits}
            renderItem={renderPopularItem}
            keyExtractor={(item) => item.id.toString()}
            horizontal
            scrollEnabled={true}
            showsHorizontalScrollIndicator={false}
            nestedScrollEnabled={true}
            contentContainerStyle={styles.popularList}
            style={styles.popularFlatList}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20,
  },
  headerLeft: {
    flex: 1,
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  tagline: {
    fontSize: 14,
    color: '#666666',
  },
  avatarContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    overflow: 'hidden',
  },
  banner: {
    flexDirection: 'row',
    backgroundColor: '#4CAF50',
    marginHorizontal: 20,
    borderRadius: 20,
    padding: 20,
    marginBottom: 10,
    overflow: 'hidden',
    minHeight: 180,
  },
  bannerLeft: {
    flex: 1,
    justifyContent: 'space-between',
    paddingRight: 10,
  },
  bannerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  bannerContent: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  bannerDescription: {
    fontSize: 12,
    color: '#FFFFFF',
    opacity: 0.9,
    marginBottom: 15,
    lineHeight: 18,
  },
  bannerButton: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    alignSelf: 'flex-start',
  },
  bannerButtonText: {
    color: '#4CAF50',
    fontSize: 14,
    fontWeight: 'bold',
  },
  bannerRight: {
    width: 120,
    height: 140,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bannerImage: {
    width: '100%',
    height: '100%',
    borderRadius: 15,
  },
  bannerIndicators: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
    gap: 6,
  },
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#E0E0E0',
  },
  indicatorActive: {
    backgroundColor: '#4CAF50',
    width: 24,
  },
  section: {
    marginBottom: 30,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1A1A1A',
  },
  seeAllText: {
    fontSize: 14,
    color: '#666666',
  },
  categoriesList: {
    paddingLeft: 20,
    paddingRight: 20,
    gap: 15,
  },
  categoriesFlatList: {
    flexGrow: 0,
  },
  categoryCard: {
    width: 100,
    alignItems: 'center',
    marginRight: 15,
  },
  categoryIconContainer: {
    width: 80,
    height: 80,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  categoryIcon: {
    width: 60,
    height: 60,
    borderRadius: 15,
  },
  categoryCardText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1A1A1A',
    textAlign: 'center',
  },
  popularList: {
    paddingLeft: 20,
    paddingRight: 20,
    gap: 15,
  },
  popularFlatList: {
    flexGrow: 0,
  },
  popularCard: {
    width: 280,
    height: 190,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    overflow: 'hidden',
    marginRight: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  popularCardLeft: {
    flex: 1,
    backgroundColor: '#4CAF59',
    padding: 15,
  },
  popularCardRight: {
    width: 120,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  popularCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  popularCardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 5,
  },
  popularCardPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 5,
  },
  popularCardDescription: {
    fontSize: 11,
    color: '#FFFFFF',
    opacity: 0.9,
    lineHeight: 14,
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  ratingText: {
    fontSize: 12,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  popularCardImage: {
    width: '100%',
    height: '100%',
  },
});
