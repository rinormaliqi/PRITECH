import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { useQuote } from '../hooks/useQuote';
import { colors, spacing, radius, typography } from '../theme';

export default function QuoteCard() {
  const { quote, loading } = useQuote();

  return (
    <View style={styles.card}>
      {loading ? (
        <ActivityIndicator color={colors.cardBlue} size="small" />
      ) : quote ? (
        <>
          <Text style={styles.quoteText}>"{quote.content}"</Text>
          <Text style={styles.author}>— {quote.author}</Text>
        </>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginHorizontal: spacing.xl,
    marginBottom: spacing.lg,
    backgroundColor: '#F0F1FF',
    borderRadius: radius.lg,
    padding: spacing.lg,
    borderLeftWidth: 3,
    borderLeftColor: colors.cardBlue,
    minHeight: 66,
    justifyContent: 'center',
  },
  quoteText: {
    fontSize: typography.sm,
    color: colors.textSub,
    lineHeight: 20,
    fontStyle: 'italic',
    marginBottom: 4,
  },
  author: {
    fontSize: typography.xs,
    color: colors.textMuted,
    fontWeight: '600',
  },
});
