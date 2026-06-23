import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Task } from '../types';
import { colors, spacing, radius, typography } from '../theme';

interface Props {
  task: Task;
  onToggle: () => void;
  onDelete: () => void;
  onPress: () => void;
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  });
}

export default function TaskListItem({ task, onToggle, onDelete, onPress }: Props) {
  const done = task.status === 'done';

  return (
    <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={0.7}>
      <TouchableOpacity
        style={[styles.checkbox, done && styles.checkboxDone]}
        onPress={onToggle}
        hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        activeOpacity={0.7}
      >
        {done && <Ionicons name="checkmark" size={13} color="#FFFFFF" />}
      </TouchableOpacity>

      <View style={styles.body}>
        <Text
          style={[styles.title, done && styles.titleDone]}
          numberOfLines={1}
        >
          {task.title}
        </Text>
        {!!task.description && (
          <Text style={styles.desc} numberOfLines={1}>
            {task.description}
          </Text>
        )}
        <Text style={styles.date}>{formatDate(task.createdAt)}</Text>
      </View>

      <TouchableOpacity
        style={styles.trashBtn}
        onPress={onDelete}
        hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        activeOpacity={0.7}
      >
        <Ionicons name="trash-outline" size={15} color="#C8C8D8" />
      </TouchableOpacity>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    backgroundColor: colors.background,
    borderRadius: radius.lg,
    padding: spacing.md,
    marginBottom: spacing.sm,
    borderWidth: 1,
    borderColor: '#F0F0F5',
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: radius.sm,
    borderWidth: 1.5,
    borderColor: '#DDDDE8',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  checkboxDone: {
    backgroundColor: colors.categoryDoneIcon,
    borderColor: colors.categoryDoneIcon,
  },
  body: {
    flex: 1,
    gap: 2,
  },
  title: {
    fontSize: typography.md,
    fontWeight: '600',
    color: colors.text,
  },
  titleDone: {
    textDecorationLine: 'line-through',
    color: colors.textMuted,
  },
  desc: {
    fontSize: typography.sm,
    color: colors.textMuted,
  },
  date: {
    fontSize: typography.xs,
    color: colors.textMuted,
    marginTop: 1,
  },
  trashBtn: {
    padding: spacing.xs,
    flexShrink: 0,
  },
});
