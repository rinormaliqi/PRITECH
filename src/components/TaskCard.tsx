import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Task } from '../types';
import { spacing, radius, typography } from '../theme';

interface Props {
  task: Task;
  cardColor: string;
  onPress?: () => void;
}

function formatTime(iso: string): string {
  return new Date(iso).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  });
}

export default function TaskCard({ task, cardColor, onPress }: Props) {
  const isDone = task.status === 'done';

  return (
    <TouchableOpacity
      style={[styles.card, { backgroundColor: cardColor }]}
      onPress={onPress}
      activeOpacity={0.85}
    >
      <Text style={styles.title} numberOfLines={1}>{task.title}</Text>
      <Text style={styles.description} numberOfLines={2}>
        {task.description || 'No description.'}
      </Text>
      <Text style={styles.time}>{formatTime(task.createdAt)}</Text>

      <View style={styles.statusRow}>
        <Text style={styles.statusLabel}>Status</Text>
        <Text style={styles.statusValue}>{isDone ? 'Done' : 'Active'}</Text>
      </View>
      <View style={styles.track}>
        {isDone && <View style={styles.fill} />}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 185,
    borderRadius: radius.xxl,
    padding: spacing.xl,
    marginRight: spacing.lg,
  },
  title: {
    fontSize: typography.lg,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: spacing.sm,
  },
  description: {
    fontSize: typography.sm,
    color: 'rgba(255,255,255,0.72)',
    lineHeight: 19,
    marginBottom: spacing.md,
  },
  time: {
    fontSize: typography.sm,
    color: 'rgba(255,255,255,0.72)',
    marginBottom: spacing.xl,
  },
  statusRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.sm,
  },
  statusLabel: {
    fontSize: typography.sm,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  statusValue: {
    fontSize: typography.sm,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  track: {
    height: 6,
    backgroundColor: 'rgba(255,255,255,0.28)',
    borderRadius: radius.full,
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: radius.full,
  },
});
