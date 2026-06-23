import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Alert,
  Platform,
} from 'react-native';
import { useNavigation, useRoute, RouteProp, NavigationProp } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { useTasksContext } from '../context/TasksContext';
import { RootStackParamList } from '../types';
import { getCollar } from '../data/collars';
import { getTheme } from '../data/taskThemes';
import { colors, spacing, radius, typography } from '../theme';

type RouteType = RouteProp<RootStackParamList, 'TaskDetail'>;

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}

export default function TaskDetailScreen() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const route = useRoute<RouteType>();
  const { getTask, toggleTask, deleteTask } = useTasksContext();

  const task = getTask(route.params.taskId);

  const confirmDelete = () => {
    if (Platform.OS === 'web') {
      if (window.confirm('Delete this task? This cannot be undone.')) {
        deleteTask(task!.id);
        navigation.goBack();
      }
      return;
    }
    Alert.alert(
      'Delete Task',
      'Are you sure you want to delete this task?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => { deleteTask(task!.id); navigation.goBack(); },
        },
      ],
    );
  };

  if (!task) {
    return (
      <SafeAreaView style={styles.safe}>
        <View style={styles.notFound}>
          <Text style={styles.notFoundText}>Task not found.</Text>
          <TouchableOpacity onPress={() => navigation.goBack()} activeOpacity={0.7}>
            <Text style={styles.backLink}>Go back</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  const isDone = task.status === 'done';
  const theme = getTheme(task.theme);
  const supervisor = task.supervisor ? getCollar(task.supervisor) : null;

  const confirmToggle = () => {
    const action = isDone ? 'Mark as Active' : 'Mark as Done';
    const successMsg = isDone
      ? 'Task has been marked as active.'
      : 'Task has been marked as done.';

    if (Platform.OS === 'web') {
      if (window.confirm(`${action}?\n\nAre you sure you want to change the status of this task?`)) {
        toggleTask(task.id);
        window.alert(successMsg);
      }
      return;
    }

    Alert.alert(
      action,
      'Are you sure you want to change the status of this task?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Yes, continue',
          style: 'default',
          onPress: () => {
            toggleTask(task.id);
            Alert.alert('Done', successMsg, [{ text: 'OK' }]);
          },
        },
      ],
    );
  };

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
        <Text style={styles.headerTitle}>Task Detail</Text>
        <TouchableOpacity
          style={styles.deleteBtn}
          onPress={confirmDelete}
          activeOpacity={0.7}
        >
          <Ionicons name="trash-outline" size={18} color={colors.cardRed} />
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.badgeRow}>
          <View style={[styles.badge, isDone ? styles.badgeDone : styles.badgeTodo]}>
            <View style={[styles.badgeDot, isDone ? styles.dotDone : styles.dotTodo]} />
            <Text style={[styles.badgeText, isDone ? styles.textDone : styles.textTodo]}>
              {isDone ? 'Completed' : 'Active'}
            </Text>
          </View>
          <View style={[styles.themeBadge, { backgroundColor: theme.bg }]}>
            <Text style={[styles.themeText, { color: theme.color }]}>{theme.label}</Text>
          </View>
        </View>

        <Text style={[styles.title, isDone && styles.titleDone]}>{task.title}</Text>

        {task.description ? (
          <Text style={styles.description}>{task.description}</Text>
        ) : (
          <Text style={styles.noDesc}>No description added.</Text>
        )}

        <View style={styles.metaSection}>
          <View style={styles.metaRow}>
            <Ionicons name="calendar-outline" size={15} color={colors.textMuted} />
            <View>
              <Text style={styles.metaLabel}>Created</Text>
              <Text style={styles.metaValue}>{formatDate(task.createdAt)}</Text>
            </View>
          </View>

          {task.finishDate && (
            <View style={styles.metaRow}>
              <Ionicons name="checkmark-circle-outline" size={15} color={colors.categoryDoneIcon} />
              <View>
                <Text style={styles.metaLabel}>Completed</Text>
                <Text style={[styles.metaValue, { color: colors.categoryDoneIcon }]}>
                  {formatDate(task.finishDate)}
                </Text>
              </View>
            </View>
          )}

          {supervisor && (
            <View style={styles.metaRow}>
              <Ionicons name="person-outline" size={15} color={colors.textMuted} />
              <View>
                <Text style={styles.metaLabel}>Supervisor</Text>
                <View style={styles.supervisorChip}>
                  <View style={[styles.supervisorDot, { backgroundColor: supervisor.color }]} />
                  <Text style={[styles.metaValue, { color: supervisor.color }]}>
                    {supervisor.title}
                  </Text>
                </View>
              </View>
            </View>
          )}
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.toggleBtn, isDone && styles.toggleBtnDone]}
          onPress={confirmToggle}
          activeOpacity={0.85}
        >
          <Ionicons
            name={isDone ? 'refresh-outline' : 'checkmark-circle-outline'}
            size={20}
            color="#FFFFFF"
          />
          <Text style={styles.toggleText}>
            {isDone ? 'Mark as Active' : 'Mark as Done'}
          </Text>
        </TouchableOpacity>
      </View>
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
    alignItems: 'center',
    paddingHorizontal: spacing.xl,
    paddingTop: Platform.OS === 'android' ? spacing.xl : spacing.md,
    paddingBottom: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F5',
  },
  backBtn: {
    width: 38,
    height: 38,
    borderRadius: radius.full,
    borderWidth: 1,
    borderColor: '#EBEBF0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    fontSize: typography.lg,
    fontWeight: '700',
    color: colors.text,
  },
  deleteBtn: {
    width: 38,
    height: 38,
    borderRadius: radius.full,
    borderWidth: 1,
    borderColor: '#FFECEC',
    backgroundColor: '#FFF5F5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    padding: spacing.xl,
    gap: spacing.xl,
    paddingBottom: 40,
  },
  badgeRow: {
    flexDirection: 'row',
    gap: spacing.sm,
    flexWrap: 'wrap',
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    paddingVertical: 6,
    paddingHorizontal: spacing.md,
    borderRadius: radius.full,
  },
  badgeTodo: {
    backgroundColor: '#E5FAFA',
  },
  badgeDone: {
    backgroundColor: colors.categoryDoneBg,
  },
  badgeDot: {
    width: 7,
    height: 7,
    borderRadius: radius.full,
  },
  dotTodo: {
    backgroundColor: colors.cardBlue,
  },
  dotDone: {
    backgroundColor: colors.categoryDoneIcon,
  },
  badgeText: {
    fontSize: typography.sm,
    fontWeight: '600',
  },
  textTodo: {
    color: colors.cardBlue,
  },
  textDone: {
    color: colors.categoryDoneIcon,
  },
  themeBadge: {
    paddingVertical: 6,
    paddingHorizontal: spacing.md,
    borderRadius: radius.full,
  },
  themeText: {
    fontSize: typography.sm,
    fontWeight: '600',
  },
  title: {
    fontSize: typography.xxl,
    fontWeight: '700',
    color: colors.text,
    lineHeight: 34,
    letterSpacing: -0.3,
  },
  titleDone: {
    textDecorationLine: 'line-through',
    color: colors.textMuted,
  },
  description: {
    fontSize: typography.md,
    color: colors.textSub,
    lineHeight: 24,
  },
  noDesc: {
    fontSize: typography.md,
    color: colors.textMuted,
    fontStyle: 'italic',
  },
  metaSection: {
    gap: spacing.lg,
    backgroundColor: '#F8F8FC',
    borderRadius: radius.lg,
    padding: spacing.lg,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.md,
  },
  metaLabel: {
    fontSize: typography.xs,
    color: colors.textMuted,
    fontWeight: '500',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 2,
  },
  metaValue: {
    fontSize: typography.sm,
    color: colors.text,
    fontWeight: '500',
  },
  supervisorChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  supervisorDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  footer: {
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.lg,
    paddingBottom: Platform.OS === 'ios' ? spacing.xxl : spacing.lg,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F5',
  },
  toggleBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    height: 52,
    borderRadius: radius.md,
    backgroundColor: colors.cardBlue,
  },
  toggleBtnDone: {
    backgroundColor: colors.categoryDoneIcon,
  },
  toggleText: {
    fontSize: typography.md,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  notFound: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.md,
  },
  notFoundText: {
    fontSize: typography.lg,
    color: colors.textSub,
  },
  backLink: {
    fontSize: typography.md,
    color: colors.cardBlue,
    fontWeight: '600',
  },
});
