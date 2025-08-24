import { fs, vs, ms } from './responsive';

export const DesignTokens = {
  colors: {
    primary: '#ffffff',
    secondary: '#000000',
    accent: '#ff0202',

    text: {
      primary: '#000000',
      secondary: '#818181',
      dark: '#1e1e1e',
    },

    background: {
      primary: '#ffffff',
      secondary: '#eeeeee',
      dark: '#1e1f21',
    },

    surface: '#ffffff',
    error: '#ff0202',
    accentGradient: ['#9b0000', '#ff0202'],
    ctaButtonGradient: ['#000000', '#ff0202'],
    dmkRed: '#e41c1c',
  },

  typography: {
    fontSizes: {
      header: fs(20),
      header1: fs(18),
      body: fs(16),
      caption: fs(14),
      small: fs(12),
      xSmall: fs(10),
      xSmall2: fs(8),
    },
    fontFamilies: {
      tamil: 'Noto Serif Tamil',
      tamilSans: 'Noto Sans Tamil',
      english: 'Montserrat',
      system: 'System',
    },
    fontWeights: {
      regular: '400' as const,
      medium: '500' as const,
      semibold: '600' as const,
      bold: '700' as const,
      black: '900' as const,
    },
  },

  layout: {
    buttonHeight: vs(48),
    inputHeight: vs(56),
    borderRadius: ms(8),
    spacing: {
      xs: ms(4),
      sm: ms(8),
      md: ms(16),
      lg: ms(24),
      xl: ms(32),
    },
  },

  shadows: {
    small: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 3,
      elevation: 2,
    },
    medium: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.15,
      shadowRadius: 6,
      elevation: 4,
    },
  },
} as const;

export type ThemeTokens = typeof DesignTokens;
