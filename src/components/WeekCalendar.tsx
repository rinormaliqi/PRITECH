import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { colors, spacing, radius, typography } from '../theme';

interface WeekDay {
  label: string;
  date: number;
  dateStr: string;
}

function getCurrentWeek(): WeekDay[] {
  const today = new Date();
  const dow = today.getDay();
  const mondayOffset = dow === 0 ? -6 : 1 - dow;
  const monday = new Date(today);
  monday.setDate(today.getDate() + mondayOffset);

  const DAY_LABELS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  return DAY_LABELS.map((label, i) => {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return { label, date: d.getDate(), dateStr: `${year}-${month}-${day}` };
  });
}

interface Props {
  taskDates?: Set<string>;
  selectedDate?: string;
  onSelectDate?: (dateStr: string) => void;
}

export default function WeekCalendar({
  taskDates = new Set(),
  selectedDate,
  onSelectDate,
}: Props) {
  const week = React.useMemo(() => getCurrentWeek(), []);
  const todayStr = React.useMemo(() => {
    const d = new Date();
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${y}-${m}-${day}`;
  }, []);

  const active = selectedDate ?? todayStr;

  return (
    <View style={styles.row}>
      {week.map(item => {
        const isSelected = item.dateStr === active;
        const isToday = item.dateStr === todayStr;
        const hasTasks = taskDates.has(item.dateStr);

        return (
          <TouchableOpacity
            key={item.dateStr}
            style={[styles.cell, isSelected && styles.cellActive]}
            onPress={() => onSelectDate?.(item.dateStr)}
            activeOpacity={0.7}
          >
            <Text style={[styles.dayLabel, isSelected && styles.dayLabelActive]}>
              {item.label}
            </Text>
            <Text
              style={[
                styles.dateLabel,
                isSelected && styles.dateLabelActive,
                isToday && !isSelected && styles.dateLabelToday,
              ]}
            >
              {item.date}
            </Text>
            <View
              style={[
                styles.dot,
                hasTasks && styles.dotTasks,
                isSelected && styles.dotSelected,
              ]}
            />
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
    minWidth: 38,
    paddingVertical: spacing.sm,
    paddingHorizontal: 4,
    borderRadius: radius.lg,
  },
  cellActive: {
    backgroundColor: colors.cardBlue,
  },
  dayLabel: {
    fontSize: typography.xs,
    fontWeight: '500',
    color: colors.textMuted,
  },
  dayLabelActive: {
    color: 'rgba(255,255,255,0.8)',
    fontWeight: '600',
  },
  dateLabel: {
    fontSize: typography.md,
    fontWeight: '500',
    color: colors.textSub,
  },
  dateLabelActive: {
    fontSize: typography.lg,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  dateLabelToday: {
    color: colors.cardBlue,
    fontWeight: '700',
  },
  dot: {
    width: 5,
    height: 5,
    borderRadius: radius.full,
    backgroundColor: 'transparent',
  },
  dotTasks: {
    backgroundColor: colors.categoryDoneIcon,
  },
  dotSelected: {
    backgroundColor: 'rgba(255,255,255,0.6)',
  },
});
