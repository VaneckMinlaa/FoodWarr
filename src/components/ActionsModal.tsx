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

interface ActionsModalProps {
  visible: boolean;
  onClose: () => void;
  onAddToFavorites: () => void;
  onBuy: () => void;
  onNotInterested: () => void;
  isFavorite: boolean;
}

export default function ActionsModal({
  visible,
  onClose,
  onAddToFavorites,
  onBuy,
  onNotInterested,
  isFavorite,
}: ActionsModalProps) {
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <Pressable style={styles.overlay} onPress={onClose}>
        <Pressable style={styles.modalContent} onPress={(e) => e.stopPropagation()}>
          <SafeAreaView edges={['bottom']}>
            <View style={styles.header}>
              <Text style={styles.title}>Actions</Text>
              <TouchableOpacity onPress={onClose} activeOpacity={0.7}>
                <Ionicons name="close" size={28} color="#333" />
              </TouchableOpacity>
            </View>

            <View style={styles.options}>
              <TouchableOpacity
                style={styles.option}
                onPress={onAddToFavorites}
                activeOpacity={0.7}
              >
                <View style={[styles.iconContainer, { backgroundColor: '#E91E6320' }]}>
                  <Ionicons
                    name={isFavorite ? 'heart' : 'heart-outline'}
                    size={24}
                    color="#E91E63"
                  />
                </View>
                <Text style={styles.optionText}>
                  {isFavorite ? 'Déjà en favoris' : 'Ajouter aux Favoris'}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.option}
                onPress={onBuy}
                activeOpacity={0.7}
              >
                <View style={[styles.iconContainer, { backgroundColor: '#4CAF5020' }]}>
                  <Ionicons name="cart-outline" size={24} color="#4CAF50" />
                </View>
                <Text style={styles.optionText}>Acheter</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.option}
                onPress={onNotInterested}
                activeOpacity={0.7}
              >
                <View style={[styles.iconContainer, { backgroundColor: '#FF980020' }]}>
                  <Ionicons name="close-circle-outline" size={24} color="#FF9800" />
                </View>
                <Text style={styles.optionText}>Pas intéressé</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.option}
                onPress={onClose}
                activeOpacity={0.7}
              >
                <View style={[styles.iconContainer, { backgroundColor: '#99920' }]}>
                  <Ionicons name="close-outline" size={24} color="#999" />
                </View>
                <Text style={styles.optionText}>Annuler</Text>
              </TouchableOpacity>
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
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 20,
    maxHeight: '80%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  options: {
    padding: 20,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
    backgroundColor: '#f5f5f5',
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  optionText: {
    fontSize: 18,
    color: '#333',
    fontWeight: '500',
  },
});

