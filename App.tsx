import React from 'react';
import { View, StyleSheet, Platform, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { UserProvider, useUserContext } from './src/context/UserContext';
import { TasksProvider } from './src/context/TasksContext';
import RootNavigator from './src/navigation/RootNavigator';
import { RootStackParamList } from './src/types';
import { colors } from './src/theme';

import { MAX_APP_WIDTH } from './src/theme/constants';

function AppContent() {
  const { loading, name } = useUserContext();

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator color={colors.cardBlue} size="large" />
      </View>
    );
  }

  const initialRoute: keyof RootStackParamList = name ? 'Home' : 'Welcome';

  const navigator = <RootNavigator initialRoute={initialRoute} />;

  return (
    <NavigationContainer>
      <StatusBar style="dark" />
      {Platform.OS === 'web' ? (
        <View style={styles.shell}>
          <View style={styles.appWindow}>{navigator}</View>
        </View>
      ) : (
        navigator
      )}
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <UserProvider>
        <TasksProvider>
          <AppContent />
        </TasksProvider>
      </UserProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  loader: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.background,
  },
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
