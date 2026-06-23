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
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { useTasksContext } from '../context/TasksContext';
import { RootStackParamList } from '../types';
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
  const navigation = useNavigation();
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
        <View style={styles.statusRow}>
          <View style={[styles.badge, isDone ? styles.badgeDone : styles.badgeTodo]}>
            <View style={[styles.badgeDot, isDone ? styles.dotDone : styles.dotTodo]} />
            <Text style={[styles.badgeText, isDone ? styles.textDone : styles.textTodo]}>
              {isDone ? 'Completed' : 'Active'}
            </Text>
          </View>
        </View>

        <Text style={[styles.title, isDone && styles.titleDone]}>{task.title}</Text>

        {task.description ? (
          <Text style={styles.description}>{task.description}</Text>
        ) : (
          <Text style={styles.noDesc}>No description added.</Text>
        )}

        <View style={styles.metaRow}>
          <Ionicons name="calendar-outline" size={14} color={colors.textMuted} />
          <Text style={styles.metaText}>Created {formatDate(task.createdAt)}</Text>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.toggleBtn, isDone && styles.toggleBtnDone]}
          onPress={() => toggleTask(task.id)}
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
  statusRow: {
    flexDirection: 'row',
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
    backgroundColor: '#EEF2FF',
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
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  metaText: {
    fontSize: typography.sm,
    color: colors.textMuted,
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
