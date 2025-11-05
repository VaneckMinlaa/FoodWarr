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

export default function CheckoutScreen() {
  const router = useRouter();
  const { fruit: fruitParam } = useLocalSearchParams<{ fruit?: string }>();
  const [fruit, setFruit] = useState<Fruit | null>(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (fruitParam) {
      try {
        const parsedFruit = JSON.parse(fruitParam) as Fruit;
        setFruit(parsedFruit);
      } catch (e) {
        console.error('Error parsing fruit:', e);
      }
    }
  }, [fruitParam]);

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleIncrease = () => {
    if (fruit && quantity < fruit.stock) {
      setQuantity(quantity + 1);
    }
  };

  const handleConfirmPurchase = () => {
    if (!fruit) return;
    Alert.alert(
      'Confirmation',
      `Voulez-vous confirmer l'achat de ${quantity} ${fruit.nom}(s) pour ${total.toFixed(2)} FCFA ?`,
      [
        { text: 'Annuler', style: 'cancel' },
        {
          text: 'Confirmer',
          onPress: () => {
            Alert.alert(
              'Succès',
              'Votre achat a été confirmé !',
              [{ text: 'OK', onPress: () => router.back() }]
            );
          },
        },
      ]
    );
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

  const total = fruit.prixVente * quantity;

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
            activeOpacity={0.7}
          >
            <Ionicons name="arrow-back" size={28} color="#333" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Checkout</Text>
          <View style={styles.placeholder} />
        </View>

        <View style={styles.fruitSection}>
          <Image source={fruit.image as any} style={styles.fruitImage} />
          <View style={styles.fruitInfo}>
            <Text style={styles.fruitName}>{fruit.nom}</Text>
            <Text style={styles.fruitCategory}>{fruit.categorie}</Text>
            <Text style={styles.unitPrice}>
              Prix unitaire: {fruit.prixVente.toFixed(2)} FCFA
            </Text>
          </View>
        </View>

        <View style={styles.quantitySection}>
          <Text style={styles.sectionTitle}>Quantité</Text>
          <View style={styles.quantityControls}>
            <TouchableOpacity
              style={[styles.quantityButton, quantity === 1 && styles.quantityButtonDisabled]}
              onPress={handleDecrease}
              disabled={quantity === 1}
              activeOpacity={0.7}
            >
              <Ionicons
                name="remove"
                size={24}
                color={quantity === 1 ? '#ccc' : '#333'}
              />
            </TouchableOpacity>

            <View style={styles.quantityDisplay}>
              <Text style={styles.quantityText}>{quantity}</Text>
            </View>

            <TouchableOpacity
              style={[
                styles.quantityButton,
                quantity >= fruit.stock && styles.quantityButtonDisabled,
              ]}
              onPress={handleIncrease}
              disabled={quantity >= fruit.stock}
              activeOpacity={0.7}
            >
              <Ionicons
                name="add"
                size={24}
                color={quantity >= fruit.stock ? '#ccc' : '#333'}
              />
            </TouchableOpacity>
          </View>
          <Text style={styles.stockInfo}>
            Stock disponible: {fruit.stock}
          </Text>
        </View>

        <View style={styles.totalSection}>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Sous-total</Text>
            <Text style={styles.totalValue}>
              {(fruit.prixVente * quantity).toFixed(2)} FCFA
            </Text>
          </View>
          <View style={styles.totalDivider} />
          <View style={styles.totalRow}>
            <Text style={styles.totalLabelFinal}>Total</Text>
            <Text style={styles.totalValueFinal}>{total.toFixed(2)} FCFA</Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.confirmButton}
          onPress={handleConfirmPurchase}
          activeOpacity={0.7}
        >
          <Ionicons name="checkmark-circle" size={24} color="#fff" />
          <Text style={styles.confirmButtonText}>Confirmer l'achat</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  backButton: {
    padding: 5,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  placeholder: {
    width: 38,
  },
  fruitSection: {
    flexDirection: 'row',
    padding: 20,
    backgroundColor: '#f5f5f5',
    margin: 15,
    borderRadius: 12,
  },
  fruitImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginRight: 15,
  },
  fruitInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  fruitName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  fruitCategory: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  unitPrice: {
    fontSize: 16,
    color: '#2196F3',
    fontWeight: '600',
  },
  quantitySection: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  quantityButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  quantityButtonDisabled: {
    backgroundColor: '#f5f5f5',
    opacity: 0.5,
  },
  quantityDisplay: {
    width: 100,
    alignItems: 'center',
    marginHorizontal: 20,
  },
  quantityText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
  },
  stockInfo: {
    textAlign: 'center',
    fontSize: 14,
    color: '#666',
    marginTop: 10,
  },
  totalSection: {
    margin: 15,
    padding: 20,
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
  },
  totalLabel: {
    fontSize: 16,
    color: '#666',
  },
  totalValue: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  totalDivider: {
    height: 1,
    backgroundColor: '#ddd',
    marginVertical: 10,
  },
  totalLabelFinal: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  totalValueFinal: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2196F3',
  },
  confirmButton: {
    backgroundColor: '#4CAF50',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 18,
    margin: 15,
    borderRadius: 12,
    marginTop: 20,
  },
  confirmButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 10,
  },
});

