import React from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import RootNavigator from './src/navigation/RootNavigator';
import { colors } from './src/theme';

const MAX_APP_WIDTH = 430;

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <StatusBar style="dark" />
        {Platform.OS === 'web' ? (
          <View style={styles.shell}>
            <View style={styles.appWindow}>
              <RootNavigator />
            </View>
          </View>
        ) : (
          <RootNavigator />
        )}
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  shell: {
    flex: 1,
    backgroundColor: colors.shellBackground,
    alignItems: 'center',
  },
  appWindow: {
    width: '100%',
    maxWidth: MAX_APP_WIDTH,
    flex: 1,
    backgroundColor: colors.background,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.12,
    shadowRadius: 28,
  },
});
