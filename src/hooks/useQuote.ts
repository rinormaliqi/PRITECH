import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Quote } from '../types';

const QUOTE_KEY = '@pritech:quote';
const QUOTE_DATE_KEY = '@pritech:quote_date';

const FALLBACK: Quote = {
  content: 'The secret of getting ahead is getting started.',
  author: 'Mark Twain',
};

export function useQuote() {
  const [quote, setQuote] = useState<Quote | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const today = new Date().toDateString();
        const [stored, storedDate] = await Promise.all([
          AsyncStorage.getItem(QUOTE_KEY),
          AsyncStorage.getItem(QUOTE_DATE_KEY),
        ]);

        if (stored && storedDate === today) {
          setQuote(JSON.parse(stored));
          return;
        }

        const res = await fetch('https://dummyjson.com/quotes/random');
        const data = await res.json();
        const q: Quote = { content: data.quote, author: data.author };

        await Promise.all([
          AsyncStorage.setItem(QUOTE_KEY, JSON.stringify(q)),
          AsyncStorage.setItem(QUOTE_DATE_KEY, today),
        ]);
        setQuote(q);
      } catch {
        setQuote(FALLBACK);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return { quote, loading };
}
