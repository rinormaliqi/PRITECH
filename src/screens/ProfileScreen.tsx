import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Platform,
} from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../types';
import { Ionicons } from '@expo/vector-icons';
import { useUserContext } from '../context/UserContext';
import { useTasksContext } from '../context/TasksContext';
import { COLLARS, getCollar } from '../data/collars';
import SelectPicker, { PickerOption } from '../components/SelectPicker';
import PritechLogo from '../components/PritechLogo';
import { colors, spacing, radius, typography } from '../theme';

const COLLAR_OPTIONS: PickerOption[] = COLLARS.map(c => ({
  value: c.id,
  label: c.title,
  color: c.color,
  bg: c.bg,
}));

export default function ProfileScreen() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { name, collar, saveCollar } = useUserContext();
  const { tasks } = useTasksContext();
  const [editingCollar, setEditingCollar] = useState(false);
  const [pendingCollar, setPendingCollar] = useState(collar ?? '');

  const currentCollar = getCollar(collar);
  const totalTasks = tasks.length;
  const doneTasks = tasks.filter(t => t.status === 'done').length;
  const activeTasks = totalTasks - doneTasks;

  const handleSaveCollar = async () => {
    await saveCollar(pendingCollar);
    setEditingCollar(false);
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
        <Text style={styles.headerTitle}>Profile</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.brandRow}>
          <PritechLogo size="sm" />
        </View>

        <View style={styles.avatarSection}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>
              {(name ?? 'U')[0].toUpperCase()}
            </Text>
          </View>
          <Text style={styles.nameText}>{name}</Text>
          <View style={[styles.collarBadge, { backgroundColor: currentCollar.bg }]}>
            <View style={[styles.collarDot, { backgroundColor: currentCollar.color }]} />
            <Text style={[styles.collarLabel, { color: currentCollar.color }]}>
              {currentCollar.title}
            </Text>
          </View>
        </View>

        <View style={styles.statsRow}>
          <View style={[styles.statCard, { backgroundColor: '#E5FAFA' }]}>
            <Text style={[styles.statNum, { color: colors.cardBlue }]}>{totalTasks}</Text>
            <Text style={styles.statLabel}>Total</Text>
          </View>
          <View style={[styles.statCard, { backgroundColor: '#FFF1F3' }]}>
            <Text style={[styles.statNum, { color: colors.cardRed }]}>{activeTasks}</Text>
            <Text style={styles.statLabel}>Active</Text>
          </View>
          <View style={[styles.statCard, { backgroundColor: colors.categoryDoneBg }]}>
            <Text style={[styles.statNum, { color: colors.categoryDoneIcon }]}>{doneTasks}</Text>
            <Text style={styles.statLabel}>Done</Text>
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Job Title</Text>
            {!editingCollar && (
              <TouchableOpacity
                onPress={() => {
                  setPendingCollar(collar ?? '');
                  setEditingCollar(true);
                }}
                activeOpacity={0.7}
              >
                <Text style={styles.editLink}>Edit</Text>
              </TouchableOpacity>
            )}
          </View>

          {editingCollar ? (
            <View style={styles.editBlock}>
              <SelectPicker
                label="Select your role"
                value={pendingCollar}
                options={COLLAR_OPTIONS}
                onChange={setPendingCollar}
              />
              <View style={styles.editActions}>
                <TouchableOpacity
                  style={styles.cancelBtn}
                  onPress={() => setEditingCollar(false)}
                  activeOpacity={0.7}
                >
                  <Text style={styles.cancelText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.saveBtn}
                  onPress={handleSaveCollar}
                  activeOpacity={0.85}
                >
                  <Text style={styles.saveText}>Save</Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            <View style={[styles.currentCollarCard, { backgroundColor: currentCollar.bg }]}>
              <View style={[styles.levelBadge, { backgroundColor: currentCollar.color + '22' }]}>
                <Text style={[styles.levelText, { color: currentCollar.color }]}>
                  L{currentCollar.level}
                </Text>
              </View>
              <View style={styles.collarCardInfo}>
                <Text style={[styles.collarCardTitle, { color: currentCollar.color }]}>
                  {currentCollar.title}
                </Text>
                <Text style={styles.collarCardSub}>Current role</Text>
              </View>
              <Ionicons name="checkmark-circle" size={22} color={currentCollar.color} />
            </View>
          )}
        </View>
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
  headerSpacer: {
    width: 38,
  },
  content: {
    padding: spacing.xl,
    gap: spacing.xxl,
    paddingBottom: 48,
  },
  brandRow: {
    alignItems: 'center',
    paddingTop: spacing.sm,
  },
  avatarSection: {
    alignItems: 'center',
    gap: spacing.md,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: radius.full,
    backgroundColor: colors.cardRed,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: 36,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  nameText: {
    fontSize: typography.xxl,
    fontWeight: '700',
    color: colors.text,
    letterSpacing: -0.3,
  },
  collarBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    paddingVertical: 7,
    paddingHorizontal: spacing.lg,
    borderRadius: radius.full,
  },
  collarDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  collarLabel: {
    fontSize: typography.sm,
    fontWeight: '600',
  },
  statsRow: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  statCard: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: spacing.lg,
    borderRadius: radius.xl,
    gap: spacing.xs,
  },
  statNum: {
    fontSize: typography.xxl,
    fontWeight: '800',
  },
  statLabel: {
    fontSize: typography.xs,
    color: colors.textSub,
    fontWeight: '500',
  },
  section: {
    gap: spacing.md,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: typography.lg,
    fontWeight: '700',
    color: colors.text,
  },
  editLink: {
    fontSize: typography.sm,
    color: colors.cardBlue,
    fontWeight: '600',
  },
  currentCollarCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    padding: spacing.lg,
    borderRadius: radius.xl,
  },
  levelBadge: {
    width: 40,
    height: 40,
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  levelText: {
    fontSize: typography.sm,
    fontWeight: '800',
  },
  collarCardInfo: {
    flex: 1,
    gap: 2,
  },
  collarCardTitle: {
    fontSize: typography.md,
    fontWeight: '700',
  },
  collarCardSub: {
    fontSize: typography.xs,
    color: colors.textMuted,
    fontWeight: '500',
  },
  editBlock: {
    gap: spacing.lg,
  },
  editActions: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  cancelBtn: {
    flex: 1,
    height: 46,
    borderRadius: radius.md,
    borderWidth: 1.5,
    borderColor: '#ECECF3',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelText: {
    fontSize: typography.md,
    fontWeight: '600',
    color: colors.textSub,
  },
  saveBtn: {
    flex: 2,
    height: 46,
    borderRadius: radius.md,
    backgroundColor: colors.cardBlue,
    alignItems: 'center',
    justifyContent: 'center',
  },
  saveText: {
    fontSize: typography.md,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});
