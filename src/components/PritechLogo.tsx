import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';

const NAVY = '#1A1F5A';
const TEAL = '#2DCFC8';

interface Props {
  size?: 'sm' | 'md' | 'lg';
}

const FONT_SIZES: Record<string, number> = { sm: 22, md: 36, lg: 52 };
const BAR_WIDTHS: Record<string, number> = { sm: 20, md: 32, lg: 46 };
const BAR_HEIGHTS: Record<string, number> = { sm: 4, md: 6, lg: 9 };

export default function PritechLogo({ size = 'md' }: Props) {
  const fontSize = FONT_SIZES[size];
  const barWidth = BAR_WIDTHS[size];
  const barHeight = BAR_HEIGHTS[size];
  const barGap = 3;

  const textStyle: object[] = [
    styles.text,
    { fontSize },
    ...(Platform.OS === 'android' ? [{ includeFontPadding: false }] : []),
  ];

  return (
    <View style={[styles.row, { paddingTop: barHeight + barGap }]}>
      <Text style={textStyle}>pri</Text>
      <View>
        <View
          style={{
            position: 'absolute',
            top: -(barHeight + barGap),
            left: 0,
            right: 0,
            alignItems: 'center',
          }}
        >
          <View
            style={{
              width: barWidth,
              height: barHeight,
              backgroundColor: TEAL,
              borderRadius: barHeight / 2,
            }}
          />
        </View>
        <Text style={textStyle}>t</Text>
      </View>
      <Text style={textStyle}>ech.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  text: {
    fontWeight: '800',
    color: NAVY,
    letterSpacing: -0.5,
  },
});
