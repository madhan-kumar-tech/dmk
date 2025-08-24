import React, { createContext, useContext, useMemo } from 'react';
import { useColorScheme } from 'react-native';
import { AppTheme, AppThemeType } from '../theme';
import { darkTheme, lightTheme } from '../theme/paper-theme';

type RuntimeTheme = AppThemeType & {
  mode: 'light' | 'dark';
  colors: AppThemeType['colors'] & {
    backgroundCurrent: string;
    textCurrent: string;
  };
};

type ThemeContextType = {
  theme: RuntimeTheme;
  isDarkMode: boolean;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const isDarkMode = useColorScheme() === 'dark';

  const theme = useMemo<RuntimeTheme>(() => {
    return {
      ...AppTheme,
      mode: isDarkMode ? 'dark' : 'light',
      colors: {
        ...AppTheme.colors,
        backgroundCurrent: isDarkMode
          ? AppTheme.colors.background.dark
          : AppTheme.colors.background.primary,
        textCurrent: isDarkMode ? '#ffffff' : AppTheme.colors.text.primary,
      },
    };
  }, [isDarkMode]);

  return (
    <ThemeContext.Provider value={{ theme, isDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useAppTheme = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useAppTheme must be used within ThemeProvider');
  return ctx;
};

export const getPaperTheme = (isDarkMode: boolean) => {
  return isDarkMode ? darkTheme : lightTheme;
};
