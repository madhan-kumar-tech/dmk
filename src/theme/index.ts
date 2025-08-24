import { DesignTokens } from './tokens';
import { resolveFont } from './fonts';

const { typography } = DesignTokens;

export const AppTheme = {
  ...DesignTokens,

  textVariants: {
    h1: {
      fontFamily: resolveFont('headings', 'bold'),
      fontSize: typography.fontSizes.header,
      lineHeight: Math.round(typography.fontSizes.header * 1.3),
      color: DesignTokens.colors.text.primary,
    },
    h2: {
      fontFamily: resolveFont('headings', 'semibold'),
      fontSize: typography.fontSizes.body + 2,
      lineHeight: Math.round((typography.fontSizes.body + 2) * 1.3),
      color: DesignTokens.colors.text.primary,
    },
    small_heading: {
      fontFamily: resolveFont('headings', 'semibold'),
      fontSize: typography.fontSizes.xSmall2,
      lineHeight: Math.round((typography.fontSizes.xSmall2 + 2) * 1.3),
      color: DesignTokens.colors.text.primary,
    },
    small_head_desc: {
      fontFamily: resolveFont('headings', 'regular'),
      fontSize: typography.fontSizes.xSmall,
      lineHeight: Math.round((typography.fontSizes.xSmall + 2) * 1.3),
      color: DesignTokens.colors.text.primary,
    },
    desc: {
      fontFamily: resolveFont('tamil', 'regular'),
      fontSize: typography.fontSizes.small,
      lineHeight: Math.round(typography.fontSizes.small * 1.3),
      color: DesignTokens.colors.text.primary,
    },
    small_desc: {
      fontFamily: resolveFont('tamil', 'regular'),
      fontSize: typography.fontSizes.xSmall,
      lineHeight: Math.round(typography.fontSizes.xSmall * 1.3),
      color: DesignTokens.colors.text.primary,
    },
    subtitle: {
      fontFamily: resolveFont('body', 'semibold'),
      fontSize: typography.fontSizes.body,
      lineHeight: Math.round(typography.fontSizes.body * 1.3),
      color: DesignTokens.colors.text.dark,
    },
    body: {
      fontFamily: resolveFont('body', 'regular'),
      fontSize: typography.fontSizes.body,
      lineHeight: Math.round(typography.fontSizes.body * 1.45),
      color: DesignTokens.colors.text.primary,
    },
    caption: {
      fontFamily: resolveFont('body', 'regular'),
      fontSize: typography.fontSizes.caption,
      lineHeight: Math.round(typography.fontSizes.caption * 1.3),
      color: DesignTokens.colors.text.secondary,
    },

    t_header: {
      fontFamily: resolveFont('tamil', 'semibold'),
      fontSize: typography.fontSizes.header,
      lineHeight: Math.round(typography.fontSizes.header * 1.3),
      color: DesignTokens.colors.text.primary,
    },
    t_header_medium: {
      fontFamily: resolveFont('tamil', 'medium'),
      fontSize: typography.fontSizes.header,
      lineHeight: Math.round(typography.fontSizes.header * 1.3),
      color: DesignTokens.colors.text.primary,
    },
    t_header_1: {
      fontFamily: resolveFont('tamil', 'semibold'),
      fontSize: typography.fontSizes.header1,
      lineHeight: Math.round(typography.fontSizes.header1 * 1.3),
      color: DesignTokens.colors.text.primary,
    },
    t_caption: {
      fontFamily: resolveFont('tamil', 'regular'),
      fontSize: typography.fontSizes.caption,
      lineHeight: Math.round(typography.fontSizes.caption * 1.45),
      color: DesignTokens.colors.text.secondary,
    },
    t_body: {
      fontFamily: resolveFont('tamil', 'regular'),
      fontSize: typography.fontSizes.body,
      lineHeight: Math.round(typography.fontSizes.body * 1.45),
      color: DesignTokens.colors.text.primary,
    },
    t_body_semibold: {
      fontFamily: resolveFont('tamil', 'semibold'),
      fontSize: typography.fontSizes.body,
      lineHeight: Math.round(typography.fontSizes.body * 1.45),
      color: DesignTokens.colors.text.primary,
    },
    t_body_bold: {
      fontFamily: resolveFont('tamil', 'bold'),
      fontSize: typography.fontSizes.body,
      lineHeight: Math.round(typography.fontSizes.body * 1.45),
      color: DesignTokens.colors.text.primary,
    },
  },

  semantic: {
    success: '#28a745',
    warning: '#ffc107',
    info: '#17a2b8',
    danger: DesignTokens.colors.error,
  },

  components: {
    card: {
      backgroundColor: DesignTokens.colors.surface,
      borderRadius: DesignTokens.layout.borderRadius,
      padding: DesignTokens.layout.spacing.md,
      ...DesignTokens.shadows.small,
    },

    button: {
      primary: {
        backgroundColor: DesignTokens.colors.accent,
        color: DesignTokens.colors.primary,
        height: DesignTokens.layout.buttonHeight,
        borderRadius: DesignTokens.layout.borderRadius,
        textStyle: {
          fontFamily: resolveFont('headings', 'semibold'),
          fontSize: typography.fontSizes.body,
        },
      },
      secondary: {
        backgroundColor: DesignTokens.colors.background.secondary,
        color: DesignTokens.colors.secondary,
        height: DesignTokens.layout.buttonHeight,
        borderRadius: DesignTokens.layout.borderRadius,
        textStyle: {
          fontFamily: resolveFont('body', 'semibold'),
          fontSize: typography.fontSizes.body,
        },
      },
    },

    header: {
      backgroundColor: DesignTokens.colors.primary,
      height: DesignTokens.layout.spacing.lg + DesignTokens.layout.spacing.sm,
      paddingHorizontal: DesignTokens.layout.spacing.md,
      ...DesignTokens.shadows.small,
      titleStyle: {
        fontFamily: resolveFont('headings', 'bold'),
        fontSize: typography.fontSizes.body + 2,
      },
    },

    statsCard: {
      backgroundColor: DesignTokens.colors.surface,
      borderRadius: DesignTokens.layout.borderRadius,
      padding: DesignTokens.layout.spacing.md,
      margin: DesignTokens.layout.spacing.sm,
      ...DesignTokens.shadows.medium,
      titleStyle: {
        fontFamily: resolveFont('headings', 'semibold'),
        fontSize: typography.fontSizes.caption,
      },
      valueStyle: {
        fontFamily: resolveFont('headings', 'bold'),
        fontSize: typography.fontSizes.header,
      },
    },
  },
} as const;

export type AppThemeType = typeof AppTheme;
export type TextVariantKey = keyof typeof AppTheme.textVariants;
