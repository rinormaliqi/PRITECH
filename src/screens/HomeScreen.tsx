import React from 'react';
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
import SearchBar from '../components/SearchBar';
import CategoryItem from '../components/CategoryItem';
import TaskCard from '../components/TaskCard';
import { RootStackParamList, Task } from '../types';
import { colors, spacing, radius, typography } from '../theme';

type NavProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

const H_PAD = spacing.xl;

const CATEGORIES = [
  {
    id: 'todo',
    label: 'To-Do',
    iconBg: colors.categoryTodoBg,
    iconName: 'clipboard-outline' as const,
    iconColor: colors.categoryTodoIcon,
  },
  {
    id: 'progress',
    label: 'Progress',
    iconBg: colors.categoryProgressBg,
    iconName: 'time-outline' as const,
    iconColor: colors.categoryProgressIcon,
  },
  {
    id: 'done',
    label: 'Done',
    iconBg: colors.categoryDoneBg,
    iconName: 'checkmark-circle-outline' as const,
    iconColor: colors.categoryDoneIcon,
  },
];

const TODAY_TASKS: Task[] = [
  {
    id: '1',
    title: 'Team Meeting',
    description: 'Group discussion for the new product.',
    time: '10:00 AM',
    status: 'progress',
    progress: 48,
    cardColor: colors.cardBlue,
  },
  {
    id: '2',
    title: 'UI Design',
    description: 'Make a homepage for the app.',
    time: '11:00 AM',
    status: 'progress',
    progress: 35,
    cardColor: colors.cardRed,
  },
  {
    id: '3',
    title: 'Code Review',
    description: 'Review pull requests from the team.',
    time: '2:00 PM',
    status: 'todo',
    progress: 0,
    cardColor: colors.cardBlue,
  },
];

export default function HomeScreen() {
  const navigation = useNavigation<NavProp>();

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
            <Text style={styles.avatarText}>R</Text>
          </View>
        </View>

        <View style={styles.hero}>
          <Text style={styles.greeting}>Good Morning, Rinor!</Text>
          <Text style={styles.heroText}>
            {'You have '}
            <Text style={styles.heroAccent}>49 tasks</Text>
            {'\nthis month'}
          </Text>
        </View>

        <View style={styles.searchRow}>
          <SearchBar />
        </View>

        <View style={styles.categories}>
          {CATEGORIES.map(cat => (
            <CategoryItem
              key={cat.id}
              label={cat.label}
              iconBg={cat.iconBg}
              icon={
                <Ionicons name={cat.iconName} size={26} color={cat.iconColor} />
              }
              onPress={() => navigation.navigate('Schedule')}
            />
          ))}
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Today's Tasks</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('Schedule')}
            activeOpacity={0.7}
          >
            <Text style={styles.seeAll}>See All</Text>
          </TouchableOpacity>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.taskList}
          decelerationRate="fast"
          snapToInterval={201}
          snapToAlignment="start"
        >
          {TODAY_TASKS.map(task => (
            <TaskCard key={task.id} task={task} />
          ))}
        </ScrollView>
      </ScrollView>
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
    paddingBottom: 40,
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
    lineHeight: 38,
    letterSpacing: -0.4,
  },
  heroAccent: {
    color: colors.cardBlue,
  },
  searchRow: {
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
    marginBottom: spacing.md,
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
});
