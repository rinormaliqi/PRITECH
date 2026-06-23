import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const USER_KEY = '@pritech:user_name';

export function useUser() {
  const [name, setName] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AsyncStorage.getItem(USER_KEY).then(stored => {
      setName(stored);
      setLoading(false);
    });
  }, []);

  const saveName = async (value: string) => {
    const trimmed = value.trim();
    await AsyncStorage.setItem(USER_KEY, trimmed);
    setName(trimmed);
  };

  return { name, loading, saveName };
}
