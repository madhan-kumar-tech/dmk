import {
  MD3LightTheme,
  MD3DarkTheme,
  configureFonts,
  MD3TypescaleKey,
} from 'react-native-paper';
import { resolveFont } from './fonts';
import { fs } from './responsive';

export const DMK_COLORS = {
  primary: '#B71C1C',
  primaryContainer: '#FFEBEE',
  secondary: '#1976D2',
  secondaryContainer: '#E3F2FD',
  tertiary: '#FF9800',
  tertiaryContainer: '#FFF3E0',
  surface: '#FFFFFF',
  surfaceVariant: '#F5F5F5',
  background: '#FAFAFA',
  error: '#D32F2F',
  errorContainer: '#FFEBEE',
  onPrimary: '#FFFFFF',
  onPrimaryContainer: '#B71C1C',
  onSecondary: '#FFFFFF',
  onSecondaryContainer: '#1976D2',
  onTertiary: '#FFFFFF',
  onTertiaryContainer: '#FF9800',
  onSurface: '#212121',
  onSurfaceVariant: '#616161',
  onBackground: '#212121',
  onError: '#FFFFFF',
  onErrorContainer: '#D32F2F',
  outline: '#BDBDBD',
  outlineVariant: '#E0E0E0',
  inverseSurface: '#303030',
  inverseOnSurface: '#F5F5F5',
  inversePrimary: '#EF5350',
  shadow: '#000000',
  scrim: '#000000',
  surfaceDisabled: '#E0E0E0',
  onSurfaceDisabled: '#BDBDBD',
} as const;

const paperFontFamilies = {
  displayLarge: { fontFamily: resolveFont('headings', 'bold') },
  displayMedium: { fontFamily: resolveFont('headings', 'bold') },
  displaySmall: { fontFamily: resolveFont('headings', 'semibold') },

  headlineLarge: { fontFamily: resolveFont('headings', 'bold') },
  headlineMedium: { fontFamily: resolveFont('headings', 'semibold') },
  headlineSmall: { fontFamily: resolveFont('headings', 'semibold') },

  titleLarge: { fontFamily: resolveFont('headings', 'semibold') },
  titleMedium: { fontFamily: resolveFont('headings', 'semibold') },
  titleSmall: { fontFamily: resolveFont('headings', 'medium') },

  labelLarge: { fontFamily: resolveFont('body', 'semibold') },
  labelMedium: { fontFamily: resolveFont('body', 'medium') },
  labelSmall: { fontFamily: resolveFont('body', 'regular') },

  bodyLarge: { fontFamily: resolveFont('body', 'regular') },
  bodyMedium: { fontFamily: resolveFont('body', 'regular') },
  bodySmall: { fontFamily: resolveFont('body', 'regular') },
} as const;

const paperFontSizes: Partial<Record<MD3TypescaleKey, number>> = {
  displayLarge: fs(57),
  displayMedium: fs(45),
  displaySmall: fs(36),

  headlineLarge: fs(32),
  headlineMedium: fs(28),
  headlineSmall: fs(24),

  titleLarge: fs(22),
  titleMedium: fs(16),
  titleSmall: fs(14),

  labelLarge: fs(14),
  labelMedium: fs(12),
  labelSmall: fs(11),

  bodyLarge: fs(16),
  bodyMedium: fs(14),
  bodySmall: fs(12),
};

function buildPaperFonts() {
  const config: Partial<
    Record<MD3TypescaleKey, { fontFamily: string; fontSize?: number }>
  > = {};
  (Object.keys(paperFontFamilies) as MD3TypescaleKey[]).forEach(k => {
    config[k] = {
      ...paperFontFamilies[k],
      fontSize: paperFontSizes[k],
    };
  });
  return configureFonts({ config });
}

export function createPaperTheme(mode: 'light' | 'dark') {
  if (mode === 'dark') {
    return {
      ...MD3DarkTheme,
      colors: {
        ...MD3DarkTheme.colors,
        primary: '#EF5350',
        primaryContainer: '#B71C1C',
        secondary: '#42A5F5',
        secondaryContainer: '#1976D2',
        tertiary: '#FFB74D',
        tertiaryContainer: '#FF9800',
        surface: '#121212',
        surfaceVariant: '#1E1E1E',
        background: '#000000',
        onPrimary: '#000000',
        onPrimaryContainer: '#FFFFFF',
        onSecondary: '#000000',
        onSecondaryContainer: '#FFFFFF',
        onSurface: '#FFFFFF',
        onSurfaceVariant: '#E0E0E0',
        onBackground: '#FFFFFF',
      },
      fonts: buildPaperFonts(),
    };
  }

  return {
    ...MD3LightTheme,
    colors: {
      ...MD3LightTheme.colors,
      ...DMK_COLORS,
    },
    fonts: buildPaperFonts(),
  };
}

export const lightTheme = createPaperTheme('light');
export const darkTheme = createPaperTheme('dark');
