import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DEFAULT_COLLAR_ID } from '../data/collars';

const USER_KEY = '@pritech:user_name';
const COLLAR_KEY = '@pritech:user_collar';

export function useUser() {
  const [name, setName] = useState<string | null>(null);
  const [collar, setCollar] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      AsyncStorage.getItem(USER_KEY),
      AsyncStorage.getItem(COLLAR_KEY),
    ]).then(([storedName, storedCollar]) => {
      setName(storedName);
      setCollar(storedCollar ?? DEFAULT_COLLAR_ID);
      setLoading(false);
    });
  }, []);

  const saveName = async (value: string) => {
    const trimmed = value.trim();
    await AsyncStorage.setItem(USER_KEY, trimmed);
    setName(trimmed);
  };

  const saveCollar = async (collarId: string) => {
    await AsyncStorage.setItem(COLLAR_KEY, collarId);
    setCollar(collarId);
  };

  const saveProfile = async (newName: string, collarId: string) => {
    const trimmed = newName.trim();
    await AsyncStorage.multiSet([
      [USER_KEY, trimmed],
      [COLLAR_KEY, collarId],
    ]);
    setName(trimmed);
    setCollar(collarId);
  };

  return { name, collar, loading, saveName, saveCollar, saveProfile };
}
