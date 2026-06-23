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
import { useUserContext } from '../context/UserContext';
import { RootStackParamList } from '../types';
import SearchBar from '../components/SearchBar';
import CategoryItem from '../components/CategoryItem';
import TaskCard from '../components/TaskCard';
import { colors, spacing, radius, typography } from '../theme';

type NavProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

const CARD_COLORS = [colors.cardBlue, colors.cardRed];

const H_PAD = spacing.xl;

function timeGreeting(): string {
  const h = new Date().getHours();
  if (h < 12) return 'Good Morning';
  if (h < 18) return 'Good Afternoon';
  return 'Good Evening';
}

export default function HomeScreen() {
  const navigation = useNavigation<NavProp>();
  const { name } = useUserContext();
  const { tasks } = useTasksContext();
  const [query, setQuery] = React.useState('');

  const counts = useMemo(
    () => ({
      total: tasks.length,
      todo: tasks.filter(t => t.status === 'todo').length,
      done: tasks.filter(t => t.status === 'done').length,
    }),
    [tasks],
  );

  const isSearching = query.trim().length > 0;

  const displayTasks = useMemo(() => {
    if (isSearching) {
      const q = query.trim().toLowerCase();
      return tasks.filter(t => t.title.toLowerCase().includes(q));
    }
    if (tasks.length === 0) return [];
    const today = new Date().toDateString();
    const todayTasks = tasks.filter(
      t => new Date(t.createdAt).toDateString() === today,
    );
    return todayTasks.length > 0 ? todayTasks : tasks.slice(0, 5);
  }, [tasks, query, isSearching]);

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <TouchableOpacity style={styles.menuBtn} activeOpacity={0.7}>
            <Ionicons name="menu-outline" size={22} color={colors.text} />
          </TouchableOpacity>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>
              {(name ?? 'U')[0].toUpperCase()}
            </Text>
          </View>
        </View>

        <View style={styles.hero}>
          <Text style={styles.greeting}>
            {timeGreeting()}, {name}!
          </Text>
          <Text style={styles.heroText}>
            {'You have '}
            <Text style={styles.heroAccent}>
              {counts.total} task{counts.total !== 1 ? 's' : ''}
            </Text>
            {'\nthis month'}
          </Text>
        </View>

        <View style={styles.searchWrap}>
          <SearchBar value={query} onChangeText={setQuery} />
        </View>

        <View style={styles.categories}>
          <CategoryItem
            label="To-Do"
            iconBg={colors.categoryTodoBg}
            icon={
              <Ionicons
                name="clipboard-outline"
                size={26}
                color={colors.categoryTodoIcon}
              />
            }
            onPress={() => navigation.navigate('Schedule')}
          />
          <CategoryItem
            label="Done"
            iconBg={colors.categoryDoneBg}
            icon={
              <Ionicons
                name="checkmark-circle-outline"
                size={26}
                color={colors.categoryDoneIcon}
              />
            }
            onPress={() => navigation.navigate('Schedule')}
          />
          <CategoryItem
            label="All Tasks"
            iconBg={colors.categoryProgressBg}
            icon={
              <Ionicons
                name="grid-outline"
                size={26}
                color={colors.categoryProgressIcon}
              />
            }
            onPress={() => navigation.navigate('Schedule')}
          />
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>
            {isSearching ? 'Search Results' : "Today's Tasks"}
          </Text>
          {!isSearching && (
            <TouchableOpacity
              onPress={() => navigation.navigate('Schedule')}
              activeOpacity={0.7}
            >
              <Text style={styles.seeAll}>See All</Text>
            </TouchableOpacity>
          )}
        </View>

        {displayTasks.length === 0 ? (
          <View style={styles.emptyCards}>
            <Ionicons
              name="clipboard-outline"
              size={36}
              color={colors.textMuted}
            />
            <Text style={styles.emptyText}>
              {isSearching ? 'No results found.' : 'No tasks yet.'}
            </Text>
            <Text style={styles.emptySubtext}>
              {isSearching
                ? 'Try a different search term.'
                : 'Tap + to add your first task.'}
            </Text>
          </View>
        ) : (
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.taskList}
            decelerationRate="fast"
            snapToInterval={201}
            snapToAlignment="start"
          >
            {displayTasks.map((task, index) => (
              <TaskCard
                key={task.id}
                task={task}
                cardColor={CARD_COLORS[index % CARD_COLORS.length]}
                onPress={() =>
                  navigation.navigate('TaskDetail', { taskId: task.id })
                }
              />
            ))}
          </ScrollView>
        )}
      </ScrollView>

      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate('AddTask')}
        activeOpacity={0.85}
      >
        <Ionicons name="add" size={28} color="#FFFFFF" />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scroll: {
    flex: 1,
  },
  content: {
    paddingBottom: 100,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: H_PAD,
    paddingTop: Platform.OS === 'android' ? spacing.xl : spacing.md,
    paddingBottom: spacing.lg,
  },
  menuBtn: {
    width: 42,
    height: 42,
    borderRadius: radius.md,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#EBEBF0',
  },
  avatar: {
    width: 42,
    height: 42,
    borderRadius: radius.full,
    backgroundColor: colors.cardRed,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: typography.lg,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  hero: {
    paddingHorizontal: H_PAD,
    paddingBottom: spacing.xl,
  },
  greeting: {
    fontSize: typography.md,
    color: colors.textSub,
    marginBottom: 4,
  },
  heroText: {
    fontSize: typography.xxxl,
    fontWeight: '800',
    color: colors.text,
    lineHeight: 40,
    letterSpacing: -0.5,
  },
  heroAccent: {
    color: colors.cardBlue,
  },
  searchWrap: {
    paddingHorizontal: H_PAD,
    marginBottom: spacing.xxl,
  },
  categories: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: H_PAD,
    marginBottom: spacing.xxl,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: H_PAD,
    marginBottom: spacing.lg,
  },
  sectionTitle: {
    fontSize: typography.xl,
    fontWeight: '700',
    color: colors.text,
  },
  seeAll: {
    fontSize: typography.sm,
    color: colors.textSub,
    fontWeight: '500',
  },
  taskList: {
    paddingLeft: H_PAD,
    paddingRight: spacing.md,
    paddingBottom: 4,
  },
  emptyCards: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    paddingVertical: spacing.xxxl,
    paddingHorizontal: H_PAD,
  },
  emptyText: {
    fontSize: typography.lg,
    fontWeight: '600',
    color: colors.text,
  },
  emptySubtext: {
    fontSize: typography.md,
    color: colors.textMuted,
  },
  fab: {
    position: 'absolute',
    bottom: 32,
    right: H_PAD,
    width: 56,
    height: 56,
    borderRadius: radius.full,
    backgroundColor: colors.cardBlue,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.cardBlue,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 8,
  },
});
