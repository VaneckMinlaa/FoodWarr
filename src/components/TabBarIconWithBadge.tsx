import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface TabBarIconWithBadgeProps {
  name: keyof typeof Ionicons.glyphMap;
  color: string;
  size: number;
  badgeCount?: number;
}

export default function TabBarIconWithBadge({
  name,
  color,
  size,
  badgeCount,
}: TabBarIconWithBadgeProps) {
  return (
    <View style={styles.container}>
      <Ionicons name={name} size={size} color={color} />
      {badgeCount !== undefined && badgeCount > 0 && (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>
            {badgeCount > 99 ? '99+' : badgeCount}
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    top: -6,
    right: -10,
    backgroundColor: '#E91E63',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: 'bold',
  },
});

