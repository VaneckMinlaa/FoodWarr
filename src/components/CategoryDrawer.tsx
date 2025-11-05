import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import {
    Modal,
    Pressable,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { categories } from '../data/categories';

interface CategoryDrawerProps {
  visible: boolean;
  onClose: () => void;
  selectedCategory: string;
  onSelectCategory: (categoryId: string) => void;
}

export default function CategoryDrawer({
  visible,
  onClose,
  selectedCategory,
  onSelectCategory,
}: CategoryDrawerProps) {
  const handleSelect = (categoryId: string) => {
    onSelectCategory(categoryId);
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <Pressable style={styles.overlay} onPress={onClose}>
        <Pressable style={styles.drawer} onPress={(e) => e.stopPropagation()}>
          <SafeAreaView edges={['top', 'left']} style={styles.safeArea}>
            <View style={styles.header}>
              <Text style={styles.title}>Catégories</Text>
              <TouchableOpacity onPress={onClose} activeOpacity={0.7}>
                <Ionicons name="close" size={28} color="#333" />
              </TouchableOpacity>
            </View>

            <View style={styles.categoriesList}>
              {categories.map((category) => (
                <TouchableOpacity
                  key={category.id}
                  style={[
                    styles.categoryItem,
                    selectedCategory === category.id && styles.categoryItemSelected,
                    { borderLeftColor: category.couleur },
                  ]}
                  onPress={() => handleSelect(category.id)}
                  activeOpacity={0.7}
                >
                  <View
                    style={[
                      styles.categoryColor,
                      { backgroundColor: category.couleur },
                    ]}
                  />
                  <Text
                    style={[
                      styles.categoryName,
                      selectedCategory === category.id && styles.categoryNameSelected,
                    ]}
                  >
                    {category.nom}
                  </Text>
                  {selectedCategory === category.id && (
                    <Ionicons name="checkmark" size={24} color={category.couleur} />
                  )}
                </TouchableOpacity>
              ))}
            </View>
          </SafeAreaView>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-start',
  },
  drawer: {
    width: '75%',
    height: '100%',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 5,
  },
  safeArea: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  categoriesList: {
    flex: 1,
    paddingTop: 10,
  },
  categoryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderLeftWidth: 4,
    backgroundColor: '#fff',
  },
  categoryItemSelected: {
    backgroundColor: '#f5f5f5',
  },
  categoryColor: {
    width: 20,
    height: 20,
    borderRadius: 10,
    marginRight: 15,
  },
  categoryName: {
    flex: 1,
    fontSize: 18,
    color: '#333',
  },
  categoryNameSelected: {
    fontWeight: 'bold',
  },
});

