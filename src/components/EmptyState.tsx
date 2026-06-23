import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, typography } from '../theme';

type Filter = 'all' | 'todo' | 'done';

interface Props {
  filter: Filter;
}

const CONTENT: Record<Filter, { icon: keyof typeof Ionicons.glyphMap; title: string; subtitle: string }> = {
  all: {
    icon: 'clipboard-outline',
    title: 'No tasks yet',
    subtitle: 'Tap the + button below to add your first task.',
  },
  todo: {
    icon: 'checkmark-done-circle-outline',
    title: 'All caught up',
    subtitle: 'No active tasks right now.',
  },
  done: {
    icon: 'trophy-outline',
    title: 'Nothing completed yet',
    subtitle: 'Complete a task and it will appear here.',
  },
};

export default function EmptyState({ filter }: Props) {
  const { icon, title, subtitle } = CONTENT[filter];

  return (
    <View style={styles.container}>
      <View style={styles.iconWrap}>
        <Ionicons name={icon} size={34} color={colors.textMuted} />
      </View>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
    gap: spacing.sm,
  },
  iconWrap: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: '#F5F5FA',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.sm,
  },
  title: {
    fontSize: typography.lg,
    fontWeight: '700',
    color: colors.text,
  },
  subtitle: {
    fontSize: typography.md,
    color: colors.textMuted,
    textAlign: 'center',
    lineHeight: 22,
    maxWidth: 220,
  },
});
