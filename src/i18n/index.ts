import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { getLocales } from 'react-native-localize';
import AsyncStorage from '@react-native-async-storage/async-storage';

import en from './locales/en.json';
import ta from './locales/ta.json';

const getDeviceLanguage = (): string => {
  const locales = getLocales();

  const supportedLanguages = ['en', 'ta'];

  for (const locale of locales) {
    const language = locale.languageCode;
    if (supportedLanguages.includes(language)) {
      return language;
    }
  }

  return 'en';
};

const STORAGE_KEY = 'dmk_app_language';

const languageDetector = {
  type: 'languageDetector' as const,
  async: true,
  detect: async (callback: (lng: string) => void) => {
    try {
      const savedLanguage = await AsyncStorage.getItem(STORAGE_KEY);
      if (savedLanguage) {
        callback(savedLanguage);
        return;
      }

      const deviceLanguage = getDeviceLanguage();
      callback(deviceLanguage);
    } catch (error) {
      console.error('Language detection error:', error);
      callback('en');
    }
  },
  init: () => {},
  cacheUserLanguage: async (lng: string) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, lng);
    } catch (error) {
      console.error('Error saving language preference:', error);
    }
  },
};

export const tamilNumerals: Record<string, string> = {
  '0': '௦',
  '1': '௧',
  '2': '௨',
  '3': '௩',
  '4': '௪',
  '5': '௫',
  '6': '௬',
  '7': '௭',
  '8': '௮',
  '9': '௯',
};

export const convertToTamilNumerals = (number: string | number): string => {
  const numStr = number.toString();
  return numStr.replace(/[0-9]/g, digit => tamilNumerals[digit] || digit);
};

export const formatDateForLocale = (date: Date, language: string): string => {
  if (language === 'ta') {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      calendar: 'indian',
    };

    try {
      return new Intl.DateTimeFormat('ta-IN', options).format(date);
    } catch {
      const day = date.getDate();
      const month = date.getMonth() + 1;
      const year = date.getFullYear();
      return `${convertToTamilNumerals(day)}/${convertToTamilNumerals(
        month,
      )}/${convertToTamilNumerals(year)}`;
    }
  }

  return new Intl.DateTimeFormat('en-IN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
};

export const formatNumberForLocale = (number: number): string => {
  return new Intl.NumberFormat('en-IN').format(number);
};

export const formatCurrencyForLocale = (amount: number): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

i18n
  .use(languageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      ta: { translation: ta },
    },
    fallbackLng: 'ta',
    debug: __DEV__,

    interpolation: {
      escapeValue: false,
      format: (value, format, lng) => {
        if (format === 'number') {
          return formatNumberForLocale(value);
        }
        if (format === 'currency') {
          return formatCurrencyForLocale(value);
        }
        if (format === 'date') {
          return formatDateForLocale(new Date(value), lng || 'en');
        }
        return value;
      },
    },

    react: {
      useSuspense: false,
    },
  });

export default i18n;
