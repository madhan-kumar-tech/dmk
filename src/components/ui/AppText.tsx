import React from 'react';
import { Text, TextProps } from 'react-native';
import { AppTheme, TextVariantKey } from '../../theme';

const isTamil = (s: string) => /[\u0B80-\u0BFF]/.test(s);

type Props = TextProps & { variant?: TextVariantKey };

export const AppText: React.FC<Props> = ({
  variant = 'body',
  children,
  style,
  ...rest
}) => {
  const raw = typeof children === 'string' ? children : '';
  const variantKey: TextVariantKey =
    isTamil(raw) && (variant === 'body' || variant === 'caption')
      ? ('t_body' as TextVariantKey)
      : variant;

  return (
    <Text style={[AppTheme.textVariants[variantKey], style]} {...rest}>
      {children}
    </Text>
  );
};
