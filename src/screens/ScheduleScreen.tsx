import React, { useMemo } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { useTasksContext } from '../context/TasksContext';
import { RootStackParamList } from '../types';
import WeekCalendar from '../components/WeekCalendar';
import TimelineTask from '../components/TimelineTask';
import { colors, spacing, radius, typography } from '../theme';

type NavProp = NativeStackNavigationProp<RootStackParamList, 'Schedule'>;

const H_PAD = spacing.xl;

const DOT_COLORS = [
  colors.tlDotRed,
  colors.tlDotPurple,
  colors.tlDotYellow,
  colors.tlDotPink,
];
const CARD_COLORS = [
  colors.tlCardRed,
  colors.tlCardPurple,
  colors.tlCardYellow,
  colors.tlCardPink,
];

function formatTime(iso: string): string {
  return new Date(iso).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  });
}

type FilterOption = 'all' | 'todo' | 'done';

const FILTER_LABELS: Record<FilterOption, string> = {
  all: 'All',
  todo: 'Active',
  done: 'Done',
};

export default function ScheduleScreen() {
  const navigation = useNavigation<NavProp>();
  const { tasks } = useTasksContext();
  const [filter, setFilter] = React.useState<FilterOption>('all');

  const filterCounts = useMemo(
    () => ({
      all: tasks.length,
      todo: tasks.filter(t => t.status === 'todo').length,
      done: tasks.filter(t => t.status === 'done').length,
    }),
    [tasks],
  );

  const timelineTasks = useMemo(() => {
    const filtered =
      filter === 'all' ? tasks : tasks.filter(t => t.status === filter);
    return [...filtered]
      .sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
      )
      .map((task, index) => ({
        id: task.id,
        title: task.title,
        description: task.description || 'No description.',
        time: formatTime(task.createdAt),
        cardColor: CARD_COLORS[index % CARD_COLORS.length],
        dotColor: DOT_COLORS[index % DOT_COLORS.length],
        active: task.status === 'todo',
      }));
  }, [tasks, filter]);

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => navigation.goBack()}
          activeOpacity={0.7}
        >
          <Ionicons name="arrow-back-outline" size={20} color={colors.text} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.addBtn}
          onPress={() => navigation.navigate('AddTask')}
          activeOpacity={0.85}
        >
          <Ionicons name="add" size={19} color="#FFFFFF" />
          <Text style={styles.addBtnText}>Add Task</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.calendarWrap}>
        <WeekCalendar />
      </View>

      <View style={styles.filterRow}>
        {(['all', 'todo', 'done'] as FilterOption[]).map(f => (
          <TouchableOpacity
            key={f}
            style={[styles.filterChip, filter === f && styles.filterChipActive]}
            onPress={() => setFilter(f)}
            activeOpacity={0.7}
          >
            <Text
              style={[
                styles.filterLabel,
                filter === f && styles.filterLabelActive,
              ]}
            >
              {FILTER_LABELS[f]}
            </Text>
            <View
              style={[
                styles.filterBadge,
                filter === f && styles.filterBadgeActive,
              ]}
            >
              <Text
                style={[
                  styles.filterBadgeText,
                  filter === f && styles.filterBadgeTextActive,
                ]}
              >
                {filterCounts[f]}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.divider} />

      {timelineTasks.length === 0 ? (
        <View style={styles.empty}>
          <View style={styles.emptyIcon}>
            <Ionicons
              name="calendar-outline"
              size={34}
              color={colors.textMuted}
            />
          </View>
          <Text style={styles.emptyTitle}>No tasks yet</Text>
          <Text style={styles.emptySub}>
            Tap "Add Task" above to create your first task.
          </Text>
        </View>
      ) : (
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.timelineContent}
          showsVerticalScrollIndicator={false}
        >
          {timelineTasks.map((task, index) => (
            <TimelineTask
              key={task.id}
              task={task}
              isLast={index === timelineTasks.length - 1}
              onPress={() =>
                navigation.navigate('TaskDetail', { taskId: task.id })
              }
            />
          ))}
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: H_PAD,
    paddingTop: Platform.OS === 'android' ? spacing.xl : spacing.md,
    paddingBottom: spacing.lg,
  },
  backBtn: {
    width: 42,
    height: 42,
    borderRadius: radius.full,
    borderWidth: 1,
    borderColor: '#EBEBF0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  addBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: colors.cardBlue,
    paddingVertical: 11,
    paddingHorizontal: H_PAD,
    borderRadius: radius.full,
  },
  addBtnText: {
    fontSize: typography.md,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  calendarWrap: {
    paddingHorizontal: H_PAD,
    paddingBottom: spacing.sm,
  },
  filterRow: {
    flexDirection: 'row',
    gap: spacing.sm,
    paddingHorizontal: H_PAD,
    paddingVertical: spacing.lg,
  },
  filterChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 7,
    paddingHorizontal: spacing.lg,
    borderRadius: radius.full,
    borderWidth: 1,
    borderColor: '#EBEBF0',
    backgroundColor: colors.surface,
  },
  filterChipActive: {
    backgroundColor: colors.cardBlue,
    borderColor: colors.cardBlue,
  },
  filterLabel: {
    fontSize: typography.sm,
    fontWeight: '600',
    color: colors.textSub,
  },
  filterLabelActive: {
    color: '#FFFFFF',
  },
  filterBadge: {
    minWidth: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: '#F0F0F5',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 4,
  },
  filterBadgeActive: {
    backgroundColor: 'rgba(255,255,255,0.25)',
  },
  filterBadgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.textSub,
  },
  filterBadgeTextActive: {
    color: '#FFFFFF',
  },
  divider: {
    height: 1,
    backgroundColor: '#F0F0F5',
    marginHorizontal: H_PAD,
    marginBottom: spacing.xl,
  },
  scroll: {
    flex: 1,
  },
  timelineContent: {
    paddingHorizontal: H_PAD,
    paddingBottom: 40,
  },
  empty: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    paddingHorizontal: H_PAD,
  },
  emptyIcon: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: '#F5F5FA',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.sm,
  },
  emptyTitle: {
    fontSize: typography.lg,
    fontWeight: '700',
    color: colors.text,
  },
  emptySub: {
    fontSize: typography.md,
    color: colors.textMuted,
    textAlign: 'center',
    lineHeight: 22,
    maxWidth: 220,
  },
});
