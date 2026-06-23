import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  ScrollView,
  StyleSheet,
  Pressable,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, radius, typography } from '../theme';
import { MAX_APP_WIDTH } from '../theme/constants';

export interface PickerOption {
  value: string;
  label: string;
  color?: string;
  bg?: string;
}

interface Props {
  label: string;
  value: string | null;
  options: PickerOption[];
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
}

export default function SelectPicker({
  label,
  value,
  options,
  onChange,
  placeholder = 'Select an option...',
  required = false,
}: Props) {
  const [open, setOpen] = useState(false);
  const selected = options.find(o => o.value === value);

  return (
    <>
      <View style={styles.field}>
        <Text style={styles.label}>
          {label}
          {required && <Text style={styles.required}> *</Text>}
        </Text>
        <TouchableOpacity
          style={styles.trigger}
          onPress={() => setOpen(true)}
          activeOpacity={0.7}
        >
          {selected ? (
            <View style={styles.selectedRow}>
              {selected.color && (
                <View
                  style={[styles.colorDot, { backgroundColor: selected.color }]}
                />
              )}
              <Text style={styles.selectedText}>{selected.label}</Text>
            </View>
          ) : (
            <Text style={styles.placeholder}>{placeholder}</Text>
          )}
          <Ionicons
            name="chevron-down"
            size={16}
            color={colors.textMuted}
          />
        </TouchableOpacity>
      </View>

      <Modal
        visible={open}
        transparent
        animationType="fade"
        onRequestClose={() => setOpen(false)}
      >
        <Pressable
          style={[
            styles.overlay,
            Platform.OS === 'web' && styles.overlayWeb,
          ]}
          onPress={() => setOpen(false)}
        >
          <Pressable
            style={[
              styles.sheet,
              Platform.OS === 'web' && styles.sheetWeb,
            ]}
            onPress={() => {}}
          >
            <View style={styles.sheetHandle} />
            <Text style={styles.sheetTitle}>{label}</Text>
            <ScrollView
              showsVerticalScrollIndicator={false}
              bounces={false}
            >
              {options.map(opt => {
                const isActive = opt.value === value;
                return (
                  <TouchableOpacity
                    key={opt.value}
                    style={[
                      styles.optionRow,
                      isActive && styles.optionRowActive,
                    ]}
                    onPress={() => {
                      onChange(opt.value);
                      setOpen(false);
                    }}
                    activeOpacity={0.7}
                  >
                    {opt.color && (
                      <View
                        style={[
                          styles.optionDot,
                          {
                            backgroundColor: opt.bg ?? opt.color + '22',
                            borderColor: opt.color,
                          },
                        ]}
                      >
                        <View
                          style={[
                            styles.optionDotInner,
                            { backgroundColor: opt.color },
                          ]}
                        />
                      </View>
                    )}
                    <Text
                      style={[
                        styles.optionLabel,
                        isActive && { color: colors.cardBlue, fontWeight: '700' },
                      ]}
                    >
                      {opt.label}
                    </Text>
                    {isActive && (
                      <Ionicons
                        name="checkmark"
                        size={17}
                        color={colors.cardBlue}
                      />
                    )}
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </Pressable>
        </Pressable>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
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
  trigger: {
    height: 50,
    backgroundColor: '#F7F7FB',
    borderRadius: radius.md,
    borderWidth: 1.5,
    borderColor: '#ECECF3',
    paddingHorizontal: spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  selectedRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    flex: 1,
  },
  colorDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  selectedText: {
    fontSize: typography.md,
    color: colors.text,
    fontWeight: '500',
  },
  placeholder: {
    fontSize: typography.md,
    color: colors.textMuted,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.38)',
    justifyContent: 'flex-end',
  },
  overlayWeb: {
    alignItems: 'center',
  },
  sheet: {
    backgroundColor: colors.background,
    borderTopLeftRadius: radius.xxl,
    borderTopRightRadius: radius.xxl,
    paddingTop: spacing.lg,
    paddingBottom: 40,
    paddingHorizontal: spacing.xl,
    maxHeight: '70%',
  },
  sheetWeb: {
    width: '100%',
    maxWidth: MAX_APP_WIDTH,
  },
  sheetHandle: {
    width: 36,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#E0E0EA',
    alignSelf: 'center',
    marginBottom: spacing.lg,
  },
  sheetTitle: {
    fontSize: typography.lg,
    fontWeight: '700',
    color: colors.text,
    marginBottom: spacing.lg,
  },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5FA',
  },
  optionRowActive: {
    backgroundColor: '#F5F5FF',
    marginHorizontal: -spacing.xl,
    paddingHorizontal: spacing.xl,
    borderRadius: radius.md,
    borderBottomColor: 'transparent',
  },
  optionDot: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  optionDotInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  optionLabel: {
    flex: 1,
    fontSize: typography.md,
    color: colors.text,
    fontWeight: '500',
  },
});
