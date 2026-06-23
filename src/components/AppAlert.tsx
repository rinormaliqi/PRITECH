import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  Platform,
} from 'react-native';
import { colors, spacing, radius, typography } from '../theme';
import { MAX_APP_WIDTH } from '../theme/constants';

export interface AlertConfig {
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  destructive?: boolean;
  showCancel?: boolean;
  onConfirm: () => void;
  onCancel?: () => void;
}

interface Props {
  config: AlertConfig | null;
}

export default function AppAlert({ config }: Props) {
  if (!config) return null;

  const {
    title,
    message,
    confirmLabel = 'OK',
    cancelLabel = 'Cancel',
    destructive = false,
    showCancel = true,
    onConfirm,
    onCancel,
  } = config;

  return (
    <Modal
      visible
      transparent
      animationType="fade"
      statusBarTranslucent
      onRequestClose={onCancel ?? onConfirm}
    >
      <View style={styles.overlay}>
        <View
          style={[
            styles.card,
            Platform.OS === 'web' && { maxWidth: MAX_APP_WIDTH - 40 },
          ]}
        >
          <View style={styles.body}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.message}>{message}</Text>
          </View>

          <View style={styles.divider} />

          <View style={[styles.actions, !showCancel && styles.actionsSingle]}>
            {showCancel && (
              <TouchableOpacity
                style={[styles.btn, styles.cancelBtn]}
                onPress={onCancel ?? onConfirm}
                activeOpacity={0.7}
              >
                <Text style={styles.cancelText}>{cancelLabel}</Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity
              style={[
                styles.btn,
                styles.confirmBtn,
                destructive && styles.confirmBtnDestructive,
                !showCancel && styles.confirmBtnFull,
              ]}
              onPress={onConfirm}
              activeOpacity={0.85}
            >
              <Text style={[styles.confirmText, destructive && styles.confirmTextDestructive]}>
                {confirmLabel}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(10,10,30,0.45)',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.xxl,
  },
  card: {
    width: '100%',
    backgroundColor: colors.background,
    borderRadius: radius.xxl,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.18,
    shadowRadius: 24,
    elevation: 16,
  },
  body: {
    padding: spacing.xxl,
    gap: spacing.sm,
  },
  title: {
    fontSize: typography.lg,
    fontWeight: '700',
    color: colors.text,
    textAlign: 'center',
  },
  message: {
    fontSize: typography.md,
    color: colors.textSub,
    textAlign: 'center',
    lineHeight: 22,
  },
  divider: {
    height: 1,
    backgroundColor: '#F0F0F5',
  },
  actions: {
    flexDirection: 'row',
  },
  actionsSingle: {
    flexDirection: 'column',
  },
  btn: {
    flex: 1,
    paddingVertical: spacing.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelBtn: {
    borderRightWidth: 1,
    borderRightColor: '#F0F0F5',
  },
  cancelText: {
    fontSize: typography.md,
    fontWeight: '600',
    color: colors.textSub,
  },
  confirmBtn: {
    backgroundColor: 'transparent',
  },
  confirmBtnDestructive: {
    backgroundColor: 'transparent',
  },
  confirmBtnFull: {
    flex: 1,
  },
  confirmText: {
    fontSize: typography.md,
    fontWeight: '700',
    color: colors.cardBlue,
  },
  confirmTextDestructive: {
    color: colors.cardRed,
  },
});
