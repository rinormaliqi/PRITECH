import React, { useState } from 'react';
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
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import { useUserContext } from '../context/UserContext';
import { COLLARS, DEFAULT_COLLAR_ID } from '../data/collars';
import SelectPicker, { PickerOption } from '../components/SelectPicker';
import PritechLogo from '../components/PritechLogo';
import { colors, spacing, radius, typography } from '../theme';

type NavProp = NativeStackNavigationProp<RootStackParamList, 'Welcome'>;

const COLLAR_OPTIONS: PickerOption[] = COLLARS.map(c => ({
  value: c.id,
  label: c.title,
  color: c.color,
  bg: c.bg,
}));

export default function WelcomeScreen() {
  const navigation = useNavigation<NavProp>();
  const { saveProfile } = useUserContext();
  const [name, setName] = useState('');
  const [collar, setCollar] = useState(DEFAULT_COLLAR_ID);
  const [error, setError] = useState('');

  const handleStart = async () => {
    if (!name.trim()) {
      setError('Please enter your name to continue.');
      return;
    }
    await saveProfile(name.trim(), collar);
    navigation.replace('Home');
  };

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.hero}>
            <View style={styles.logoWrap}>
              <PritechLogo size="lg" />
            </View>
            <Text style={styles.tagline}>Your tasks, organized.</Text>
          </View>

          <View style={styles.form}>
            <Text style={styles.formHeading}>Let's get started</Text>
            <Text style={styles.formSub}>
              Tell us a bit about yourself to personalize your workspace.
            </Text>

            <View style={styles.fieldGroup}>
              <View style={styles.field}>
                <Text style={styles.label}>Your name <Text style={styles.required}>*</Text></Text>
                <TextInput
                  style={[
                    styles.input,
                    !!error && styles.inputError,
                    Platform.OS === 'web' && ({ outlineStyle: 'none' } as object),
                  ]}
                  placeholder="Enter your name..."
                  placeholderTextColor={colors.textMuted}
                  value={name}
                  onChangeText={v => { setName(v); setError(''); }}
                  maxLength={40}
                  autoFocus
                  returnKeyType="done"
                  onSubmitEditing={handleStart}
                  autoCapitalize="words"
                  autoCorrect={false}
                />
                {!!error && <Text style={styles.errorText}>{error}</Text>}
              </View>

              <SelectPicker
                label="Job title"
                value={collar}
                options={COLLAR_OPTIONS}
                onChange={setCollar}
                placeholder="Select your role..."
              />
            </View>

            <TouchableOpacity
              style={[styles.btn, !name.trim() && styles.btnDisabled]}
              onPress={handleStart}
              activeOpacity={0.85}
            >
              <Text style={styles.btnText}>Get Started</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
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
  content: {
    flexGrow: 1,
    paddingHorizontal: spacing.xl,
    paddingBottom: spacing.xxxl,
  },
  hero: {
    alignItems: 'center',
    paddingTop: 56,
    paddingBottom: 48,
    gap: spacing.lg,
  },
  logoWrap: {
    marginBottom: spacing.sm,
  },
  tagline: {
    fontSize: typography.md,
    color: colors.textSub,
  },
  form: {
    flex: 1,
    gap: spacing.xl,
  },
  formHeading: {
    fontSize: typography.xxl,
    fontWeight: '700',
    color: colors.text,
    letterSpacing: -0.3,
  },
  formSub: {
    fontSize: typography.md,
    color: colors.textSub,
    lineHeight: 22,
    marginTop: -spacing.md,
  },
  fieldGroup: {
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
  input: {
    height: 52,
    backgroundColor: '#F7F7FB',
    borderRadius: radius.md,
    borderWidth: 1.5,
    borderColor: '#ECECF3',
    paddingHorizontal: spacing.lg,
    fontSize: typography.md,
    color: colors.text,
  },
  inputError: {
    borderColor: colors.cardRed,
  },
  errorText: {
    fontSize: typography.sm,
    color: colors.cardRed,
  },
  btn: {
    height: 52,
    backgroundColor: colors.cardBlue,
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: spacing.sm,
  },
  btnDisabled: {
    backgroundColor: '#A0E8E5',
  },
  btnText: {
    fontSize: typography.md,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});
