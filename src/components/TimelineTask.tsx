import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { colors, spacing, radius, typography } from '../theme';

interface TimelineTaskData {
  id: string;
  title: string;
  description: string;
  time: string;
  cardColor: string;
  dotColor: string;
  active: boolean;
}

interface Props {
  task: TimelineTaskData;
  isLast: boolean;
  onPress?: () => void;
}

export default function TimelineTask({ task, isLast, onPress }: Props) {
  return (
    <View style={styles.row}>
      <View style={styles.rail}>
        <View
          style={[
            styles.dot,
            { borderColor: task.dotColor },
            task.active && { backgroundColor: task.dotColor },
          ]}
        />
        {!isLast && <View style={styles.line} />}
      </View>

      <TouchableOpacity
        style={[styles.card, { backgroundColor: task.cardColor }]}
        onPress={onPress}
        activeOpacity={onPress ? 0.75 : 1}
      >
        <View style={styles.cardTop}>
          <Text style={styles.title} numberOfLines={1}>{task.title}</Text>
          <Text style={styles.time}>{task.time}</Text>
        </View>
        <Text style={styles.description} numberOfLines={2}>{task.description}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    gap: spacing.lg,
    marginBottom: spacing.lg,
  },
  rail: {
    alignItems: 'center',
    alignSelf: 'stretch',
    width: 16,
    paddingTop: 2,
  },
  dot: {
    width: 14,
    height: 14,
    borderRadius: radius.full,
    borderWidth: 2,
    backgroundColor: 'transparent',
    zIndex: 1,
  },
  line: {
    flex: 1,
    width: 2,
    backgroundColor: colors.timelineLine,
    marginTop: spacing.xs,
  },
  card: {
    flex: 1,
    borderRadius: radius.lg,
    padding: spacing.lg,
  },
  cardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  title: {
    fontSize: typography.md,
    fontWeight: '700',
    color: colors.text,
    flex: 1,
    marginRight: spacing.sm,
  },
  time: {
    fontSize: typography.sm,
    color: colors.textSub,
    fontWeight: '500',
  },
  description: {
    fontSize: typography.sm,
    color: colors.textSub,
    lineHeight: 20,
  },
});
