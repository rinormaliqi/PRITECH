import React, { useRef, useState, useEffect, useMemo, useCallback } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  LayoutChangeEvent,
} from 'react-native';
import { colors, spacing, radius, typography } from '../theme';

const DAYS_BEFORE = 180;
const DAYS_AFTER = 180;
const TODAY_INDEX = DAYS_BEFORE;
const DAY_LABELS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

interface DayItem {
  dateStr: string;
  dayLabel: string;
  date: number;
}

function buildDays(): DayItem[] {
  const result: DayItem[] = [];
  const base = new Date();
  base.setHours(0, 0, 0, 0);
  for (let i = -DAYS_BEFORE; i <= DAYS_AFTER; i++) {
    const d = new Date(base);
    d.setDate(base.getDate() + i);
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    result.push({
      dateStr: `${y}-${m}-${day}`,
      dayLabel: DAY_LABELS[d.getDay()],
      date: d.getDate(),
    });
  }
  return result;
}

function getTodayStr(): string {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
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
  const days = useMemo(() => buildDays(), []);
  const todayStr = useMemo(() => getTodayStr(), []);
  const active = selectedDate ?? todayStr;

  const listRef = useRef<FlatList<DayItem>>(null);
  const [cellWidth, setCellWidth] = useState(0);
  const hasScrolled = useRef(false);

  const handleLayout = useCallback((e: LayoutChangeEvent) => {
    const w = e.nativeEvent.layout.width / 7;
    setCellWidth(w);
  }, []);

  useEffect(() => {
    if (cellWidth > 0 && !hasScrolled.current && listRef.current) {
      // Scroll so today sits in the middle of the visible 7-day window
      const offset = Math.max(0, (TODAY_INDEX - 3) * cellWidth);
      listRef.current.scrollToOffset({ offset, animated: false });
      hasScrolled.current = true;
    }
  }, [cellWidth]);

  const getItemLayout = useCallback(
    (_: ArrayLike<DayItem> | null | undefined, index: number) => ({
      length: cellWidth,
      offset: cellWidth * index,
      index,
    }),
    [cellWidth],
  );

  const renderItem = useCallback(
    ({ item }: { item: DayItem }) => {
      const isSelected = item.dateStr === active;
      const isToday = item.dateStr === todayStr;
      const hasTasks = taskDates.has(item.dateStr);

      return (
        <TouchableOpacity
          style={[
            styles.cell,
            { width: cellWidth },
            isSelected && styles.cellActive,
          ]}
          onPress={() => onSelectDate?.(item.dateStr)}
          activeOpacity={0.7}
        >
          <Text style={[styles.dayLabel, isSelected && styles.dayLabelActive]}>
            {item.dayLabel}
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
    },
    [active, todayStr, taskDates, cellWidth, onSelectDate],
  );

  return (
    <View onLayout={handleLayout} style={styles.container}>
      {cellWidth > 0 && (
        <FlatList
          ref={listRef}
          data={days}
          horizontal
          keyExtractor={item => item.dateStr}
          renderItem={renderItem}
          getItemLayout={getItemLayout}
          showsHorizontalScrollIndicator={false}
          decelerationRate="fast"
          snapToInterval={cellWidth}
          snapToAlignment="start"
          removeClippedSubviews={false}
          initialNumToRender={14}
          windowSize={5}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: spacing.md,
  },
  cell: {
    alignItems: 'center',
    gap: spacing.xs,
    paddingVertical: spacing.sm,
    paddingHorizontal: 2,
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
