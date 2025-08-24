import React, {
  createContext,
  useContext,
  useCallback,
  ReactNode,
} from 'react';
import { useTranslation } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';

type SupportedLanguage = 'en' | 'ta';

interface LanguageContextType {
  currentLanguage: SupportedLanguage;
  changeLanguage: (language: SupportedLanguage) => Promise<void>;
  isRTL: boolean;
  t: (key: string, options?: any) => string;
  formatNumber: (number: number) => string;
  formatCurrency: (amount: number) => string;
  formatDate: (date: Date) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined,
);

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({
  children,
}) => {
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language as SupportedLanguage;

  const isRTL = false;

  const changeLanguage = useCallback(
    async (language: SupportedLanguage) => {
      try {
        await i18n.changeLanguage(language);
        await AsyncStorage.setItem('dmk_app_language', language);

        if (language === 'ta') {
        }
      } catch (error) {
        console.error('Language change failed:', error);
      }
    },
    [i18n],
  );

  const formatNumber = useCallback((number: number): string => {
    return new Intl.NumberFormat('en-IN').format(number);
  }, []);

  const formatCurrency = useCallback((amount: number): string => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  }, []);

  const formatDate = useCallback(
    (date: Date): string => {
      if (currentLanguage === 'ta') {
        try {
          const tamilDate = new Intl.DateTimeFormat('ta-IN', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          }).format(date);

          return tamilDate;
        } catch {
          const tamilMonths = [
            'ஜனவரி',
            'பிப்ரவரி',
            'மார்ச்',
            'ஏப்ரல்',
            'மே',
            'ஜூன்',
            'ஜூலை',
            'ஆகஸ்ட்',
            'செப்டம்பர்',
            'அக்டோபர்',
            'நவம்பர்',
            'டிசம்பர்',
          ];

          const day = date.getDate();
          const month = tamilMonths[date.getMonth()];
          const year = date.getFullYear();

          return `${day} ${month} ${year}`;
        }
      }

      return new Intl.DateTimeFormat('en-IN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }).format(date);
    },
    [currentLanguage],
  );

  const value: LanguageContextType = {
    currentLanguage,
    changeLanguage,
    isRTL,
    t,
    formatNumber,
    formatCurrency,
    formatDate,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const useFormattedNumber = (number: number): string => {
  const { formatNumber } = useLanguage();
  return formatNumber(number);
};

export const useFormattedCurrency = (amount: number): string => {
  const { formatCurrency } = useLanguage();
  return formatCurrency(amount);
};

export const useFormattedDate = (date: Date): string => {
  const { formatDate } = useLanguage();
  return formatDate(date);
};

export const tamilTextStyle = {
  fontFamily: 'NotoSansTamil-Regular',
  fontSize: 16,
  lineHeight: 24,
};

export const tamilHeadingStyle = {
  fontFamily: 'NotoSansTamil-Bold',
  fontSize: 20,
  lineHeight: 28,
  fontWeight: 'bold' as const,
};

export const detectUserLanguage = (): SupportedLanguage => {
  return 'ta';
};
