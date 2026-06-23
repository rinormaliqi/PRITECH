import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Task } from '../types';
import { spacing, radius, typography } from '../theme';

interface TaskCardProps {
  task: Task;
}

export default function TaskCard({ task }: TaskCardProps) {
  return (
    <TouchableOpacity
      style={[styles.card, { backgroundColor: task.cardColor }]}
      activeOpacity={0.85}
    >
      <Text style={styles.title} numberOfLines={1}>{task.title}</Text>
      <Text style={styles.description} numberOfLines={2}>{task.description}</Text>
      <Text style={styles.time}>{task.time}</Text>

      <View style={styles.progressRow}>
        <Text style={styles.progressLabel}>Progress</Text>
        <Text style={styles.progressValue}>{task.progress}%</Text>
      </View>
      <View style={styles.track}>
        <View style={[styles.fill, { width: `${task.progress}%` as any }]} />
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
  progressRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.sm,
  },
  progressLabel: {
    fontSize: typography.sm,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  progressValue: {
    fontSize: typography.sm,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  track: {
    height: 6,
    backgroundColor: 'rgba(255,255,255,0.28)',
    borderRadius: radius.full,
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: radius.full,
  },
});
