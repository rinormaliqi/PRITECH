import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { colors, spacing, radius, typography } from '../theme';

const WEEK: { day: string; date: number }[] = [
  { day: 'Mon', date: 11 },
  { day: 'Tue', date: 12 },
  { day: 'Wed', date: 13 },
  { day: 'Thu', date: 14 },
  { day: 'Fri', date: 15 },
  { day: 'Sat', date: 16 },
  { day: 'Sun', date: 17 },
];

export default function WeekCalendar() {
  const [selected, setSelected] = useState(14);

  return (
    <View style={styles.row}>
      {WEEK.map(item => {
        const active = item.date === selected;
        return (
          <TouchableOpacity
            key={item.date}
            style={styles.cell}
            onPress={() => setSelected(item.date)}
            activeOpacity={0.7}
          >
            <Text style={[styles.dayLabel, active && styles.dayActive]}>
              {item.day}
            </Text>
            <Text style={[styles.dateLabel, active && styles.dateActive]}>
              {item.date}
            </Text>
            <View style={[styles.dot, active && styles.dotActive]} />
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: spacing.md,
  },
  cell: {
    alignItems: 'center',
    gap: spacing.xs,
    minWidth: 36,
  },
  dayLabel: {
    fontSize: typography.xs,
    fontWeight: '500',
    color: colors.textMuted,
  },
  dayActive: {
    color: colors.text,
    fontWeight: '600',
  },
  dateLabel: {
    fontSize: typography.md,
    fontWeight: '500',
    color: colors.textSub,
  },
  dateActive: {
    fontSize: typography.lg,
    fontWeight: '700',
    color: colors.text,
  },
  dot: {
    width: 5,
    height: 5,
    borderRadius: radius.full,
    backgroundColor: 'transparent',
  },
  dotActive: {
    backgroundColor: colors.timelineAccent,
  },
});
