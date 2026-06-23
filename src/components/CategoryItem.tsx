import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { colors, spacing, radius, typography } from '../theme';

interface CategoryItemProps {
  icon: React.ReactNode;
  label: string;
  iconBg: string;
  onPress?: () => void;
}

export default function CategoryItem({ icon, label, iconBg, onPress }: CategoryItemProps) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={0.75}>
      <View style={[styles.iconWrap, { backgroundColor: iconBg }]}>
        {icon}
      </View>
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    gap: spacing.sm,
  },
  iconWrap: {
    width: 68,
    height: 68,
    borderRadius: radius.xl,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontSize: typography.sm,
    color: colors.textSub,
    fontWeight: '500',
  },
});
