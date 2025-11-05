import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const PRIMARY_COLOR = '#4CAF50';

export default function AboutScreen() {
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <View style={[styles.iconContainer, { backgroundColor: PRIMARY_COLOR + '20' }]}>
              <Ionicons name="information" size={24} color={PRIMARY_COLOR} />
            </View>
            <Text style={styles.cardTitle}>A Propos de Nous</Text>
          </View>
          <Text style={styles.cardText}>
            FoodWar est une application moderne de gestion de fruits permettant de
            consulter, filtrer et acheter une variété de fruits frais et délicieux.
            Découvrez notre sélection de fruits de qualité à des prix compétitifs.
          </Text>
        </View>
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <View style={[styles.iconContainer, { backgroundColor: PRIMARY_COLOR + '20' }]}>
              <Ionicons name="people" size={24} color={PRIMARY_COLOR} />
            </View>
            <Text style={styles.cardTitle}>Équipe</Text>
          </View>
          <Text style={styles.cardText}>
            Développé avec passion par DONGMO MINTIDEM Vaneck Mina'a pour vous offrir la meilleure
            expérience d'achat de fruits en ligne.
          </Text>
        </View>

        {/* Contact Section */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <View style={[styles.iconContainer, { backgroundColor: PRIMARY_COLOR + '20' }]}>
              <Ionicons name="mail" size={24} color={PRIMARY_COLOR} />
            </View>
            <Text style={styles.cardTitle}>Contact</Text>
          </View>
          <View style={styles.contactInfo}>
            <View style={styles.contactItem}>
              <Ionicons name="mail-outline" size={16} color="#666" />
              <Text style={styles.contactText}>dongmomintidem@gmail.com</Text>
            </View>
            <View style={styles.contactItem}>
              <Ionicons name="call-outline" size={16} color="#666" />
              <Text style={styles.contactText}>+237 6 58 53 49 19</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  header: {
    alignItems: 'center',
    paddingVertical: 30,
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 12,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1A1A1A',
  },
  cardText: {
    fontSize: 15,
    color: '#666666',
    lineHeight: 24,
    textAlign: 'justify',
  },
  featuresList: {
    gap: 12,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  featureText: {
    fontSize: 15,
    color: '#666666',
    flex: 1,
  },
  contactInfo: {
    gap: 12,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  contactText: {
    fontSize: 15,
    color: '#666666',
  },
  footer: {
    alignItems: 'center',
    paddingVertical: 30,
    marginTop: 10,
  },
  copyright: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 6,
  },
  copyrightSubtext: {
    fontSize: 14,
    color: '#999999',
    marginBottom: 20,
  }
});
