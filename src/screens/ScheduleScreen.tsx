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
import { Ionicons } from '@expo/vector-icons';
import WeekCalendar from '../components/WeekCalendar';
import TimelineTask from '../components/TimelineTask';
import { ScheduleTask } from '../types';
import { colors, spacing, radius, typography } from '../theme';

const H_PAD = spacing.xl;

const SCHEDULE: ScheduleTask[] = [
  {
    id: '1',
    title: 'Wireframing',
    description: 'Make some ideation from sketch and wireframes.',
    time: '12:00 PM',
    cardColor: colors.tlCardRed,
    dotColor: colors.tlDotRed,
    active: true,
  },
  {
    id: '2',
    title: 'UI Design',
    description: 'Visual design from the wireframe and make design system.',
    time: '1:30 PM',
    cardColor: colors.tlCardPurple,
    dotColor: colors.tlDotPurple,
    active: false,
  },
  {
    id: '3',
    title: 'Prototyping',
    description: 'Make the interactive prototype for the testing & stakeholders.',
    time: '3:00 PM',
    cardColor: colors.tlCardYellow,
    dotColor: colors.tlDotYellow,
    active: false,
  },
  {
    id: '4',
    title: 'Usability Testing',
    description: 'Primary user testing and usability testing of the prototype.',
    time: '3:45 PM',
    cardColor: colors.tlCardPink,
    dotColor: colors.tlDotPink,
    active: false,
  },
  {
    id: '5',
    title: 'Meeting',
    description: 'Sum up discussion for the new product with stakeholders.',
    time: '4:30 PM',
    cardColor: colors.tlCardPurple,
    dotColor: colors.tlDotPurple,
    active: false,
  },
];

export default function ScheduleScreen() {
  const navigation = useNavigation();

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
        <TouchableOpacity style={styles.addBtn} activeOpacity={0.85}>
          <Ionicons name="add" size={19} color="#FFFFFF" />
          <Text style={styles.addBtnText}>Add Task</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.calendarWrap}>
        <WeekCalendar />
      </View>

      <View style={styles.divider} />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.timelineContent}
        showsVerticalScrollIndicator={false}
      >
        {SCHEDULE.map((task, index) => (
          <TimelineTask
            key={task.id}
            task={task}
            isLast={index === SCHEDULE.length - 1}
          />
        ))}
      </ScrollView>
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
    paddingHorizontal: spacing.xl,
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
});
