import React from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, radius, typography } from '../theme';

interface Props {
  label: string;
  value: string;
  onChange: (value: string) => void;
}

function todayStr(): string {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

export { todayStr };

export default function DateInput({ label, value, onChange }: Props) {
  return (
    <View style={styles.field}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.inputWrap}>
        <Ionicons name="calendar-outline" size={17} color={colors.textMuted} />
        <TextInput
          style={[styles.input, Platform.OS === 'web' && (webStyle as object)]}
          value={value}
          onChangeText={onChange}
          placeholder={todayStr()}
          placeholderTextColor={colors.textMuted}
          {...(Platform.OS === 'web' ? ({ type: 'date' } as object) : {})}
          maxLength={10}
          keyboardType={Platform.OS === 'web' ? 'default' : 'numbers-and-punctuation'}
          autoCorrect={false}
        />
      </View>
    </View>
  );
}

const webStyle = {
  outlineStyle: 'none',
  colorScheme: 'light',
};

const styles = StyleSheet.create({
  field: {
    gap: spacing.sm,
  },
  label: {
    fontSize: typography.sm,
    fontWeight: '600',
    color: colors.text,
  },
  inputWrap: {
    height: 50,
    backgroundColor: '#F7F7FB',
    borderRadius: radius.md,
    borderWidth: 1.5,
    borderColor: '#ECECF3',
    paddingHorizontal: spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  input: {
    flex: 1,
    fontSize: typography.md,
    color: colors.text,
  },
});
