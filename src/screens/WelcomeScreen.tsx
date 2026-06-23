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
import { colors, spacing, radius, typography } from '../theme';

type NavProp = NativeStackNavigationProp<RootStackParamList, 'Welcome'>;

export default function WelcomeScreen() {
  const navigation = useNavigation<NavProp>();
  const { saveName } = useUserContext();
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  const handleStart = async () => {
    if (!name.trim()) {
      setError('Please enter your name to continue.');
      return;
    }
    await saveName(name.trim());
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
            <View style={styles.logoCircle}>
              <Text style={styles.logoLetter}>P</Text>
            </View>
            <Text style={styles.appName}>Pritech</Text>
            <Text style={styles.tagline}>Your tasks, organized.</Text>
          </View>

          <View style={styles.form}>
            <Text style={styles.formHeading}>What's your name?</Text>
            <Text style={styles.formSub}>
              We'll use this to personalize your experience.
            </Text>

            <TextInput
              style={[styles.input, !!error && styles.inputError]}
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
    paddingTop: 64,
    paddingBottom: 52,
  },
  logoCircle: {
    width: 88,
    height: 88,
    borderRadius: radius.full,
    backgroundColor: colors.cardBlue,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.lg,
  },
  logoLetter: {
    fontSize: 42,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  appName: {
    fontSize: typography.xxl,
    fontWeight: '800',
    color: colors.text,
    letterSpacing: -0.5,
    marginBottom: spacing.xs,
  },
  tagline: {
    fontSize: typography.md,
    color: colors.textSub,
  },
  form: {
    flex: 1,
  },
  formHeading: {
    fontSize: typography.xxl,
    fontWeight: '700',
    color: colors.text,
    letterSpacing: -0.3,
    marginBottom: spacing.sm,
  },
  formSub: {
    fontSize: typography.md,
    color: colors.textSub,
    lineHeight: 22,
    marginBottom: spacing.xxl,
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
    marginBottom: spacing.md,
    ...(Platform.OS === 'web' ? ({ outlineStyle: 'none' } as object) : {}),
  },
  inputError: {
    borderColor: colors.cardRed,
  },
  errorText: {
    fontSize: typography.sm,
    color: colors.cardRed,
    marginBottom: spacing.md,
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
    backgroundColor: '#C8C8E8',
  },
  btnText: {
    fontSize: typography.md,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});
