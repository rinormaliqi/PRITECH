import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { useTasksContext } from '../context/TasksContext';
import { colors, spacing, radius, typography } from '../theme';

const MAX_TITLE = 80;
const MAX_DESC = 300;

const webInput = Platform.OS === 'web' ? ({ outlineStyle: 'none' } as object) : {};

export default function AddTaskScreen() {
  const navigation = useNavigation();
  const { addTask } = useTasksContext();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [titleError, setTitleError] = useState('');
  const descRef = useRef<TextInput>(null);

  const handleSave = () => {
    if (!title.trim()) {
      setTitleError('Title is required.');
      return;
    }
    addTask(title, description);
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <View style={styles.header}>
          <Text style={styles.heading}>New Task</Text>
          <TouchableOpacity
            style={styles.closeBtn}
            onPress={() => navigation.goBack()}
            activeOpacity={0.7}
          >
            <Ionicons name="close" size={20} color={colors.text} />
          </TouchableOpacity>
        </View>

        <ScrollView
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.field}>
            <Text style={styles.label}>
              Title <Text style={styles.required}>*</Text>
            </Text>
            <TextInput
              style={[styles.input, !!titleError && styles.inputError, webInput]}
              placeholder="What needs to be done?"
              placeholderTextColor={colors.textMuted}
              value={title}
              onChangeText={v => { setTitle(v); setTitleError(''); }}
              maxLength={MAX_TITLE}
              returnKeyType="next"
              onSubmitEditing={() => descRef.current?.focus()}
              blurOnSubmit={false}
              autoFocus
            />
            {!!titleError
              ? <Text style={styles.errorText}>{titleError}</Text>
              : <Text style={styles.counter}>{title.length}/{MAX_TITLE}</Text>
            }
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>
              Description <Text style={styles.optional}>(optional)</Text>
            </Text>
            <TextInput
              ref={descRef}
              style={[styles.input, styles.inputMulti, webInput]}
              placeholder="Add more details..."
              placeholderTextColor={colors.textMuted}
              value={description}
              onChangeText={setDescription}
              maxLength={MAX_DESC}
              multiline
              numberOfLines={4}
              textAlignVertical="top"
              returnKeyType="done"
            />
            <Text style={styles.counter}>{description.length}/{MAX_DESC}</Text>
          </View>
        </ScrollView>

        <View style={styles.footer}>
          <TouchableOpacity
            style={styles.cancelBtn}
            onPress={() => navigation.goBack()}
            activeOpacity={0.7}
          >
            <Text style={styles.cancelText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.saveBtn}
            onPress={handleSave}
            activeOpacity={0.85}
          >
            <Text style={styles.saveText}>Add Task</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.background,
  },
  flex: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.lg,
    paddingBottom: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F5',
  },
  heading: {
    fontSize: typography.xl,
    fontWeight: '700',
    color: colors.text,
  },
  closeBtn: {
    width: 36,
    height: 36,
    borderRadius: radius.full,
    backgroundColor: '#F5F5F8',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    padding: spacing.xl,
    gap: spacing.xl,
  },
  field: {
    gap: spacing.sm,
  },
  label: {
    fontSize: typography.sm,
    fontWeight: '600',
    color: colors.text,
  },
  required: {
    color: colors.cardRed,
  },
  optional: {
    color: colors.textMuted,
    fontWeight: '400',
  },
  input: {
    height: 50,
    backgroundColor: '#F7F7FB',
    borderRadius: radius.md,
    borderWidth: 1.5,
    borderColor: '#ECECF3',
    paddingHorizontal: spacing.lg,
    fontSize: typography.md,
    color: colors.text,
  },
  inputMulti: {
    height: 110,
    paddingTop: spacing.md,
    paddingBottom: spacing.md,
  },
  inputError: {
    borderColor: colors.cardRed,
  },
  errorText: {
    fontSize: typography.xs,
    color: colors.cardRed,
  },
  counter: {
    fontSize: typography.xs,
    color: colors.textMuted,
    textAlign: 'right',
  },
  footer: {
    flexDirection: 'row',
    gap: spacing.md,
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.lg,
    paddingBottom: Platform.OS === 'ios' ? spacing.xxl : spacing.lg,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F5',
  },
  cancelBtn: {
    flex: 1,
    height: 50,
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
    height: 50,
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
