import React from 'react';
import { TextInput, View, Text, TextInputProps } from 'react-native';
import { AppTheme } from '../../theme';
import { makeStyles } from '../../theme/responsive';

interface Props extends TextInputProps {
  label?: string;
  error?: string;
}

export const TextInputField: React.FC<Props> = ({ label, error, ...props }) => {
  const styles = useStyles();

  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TextInput
        style={[styles.input, error && styles.errorBorder]}
        {...props}
      />
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
};

const useStyles = makeStyles(() => ({
  container: { marginBottom: AppTheme.layout.spacing.sm + 4 },
  label: {
    ...AppTheme.textVariants.caption,
    fontWeight: '500' as const,
    marginBottom: AppTheme.layout.spacing.xs,
    color: AppTheme.colors.text.dark,
  },
  input: {
    borderWidth: 1,
    borderColor: AppTheme.colors.text.secondary,
    borderRadius: AppTheme.layout.borderRadius,
    paddingHorizontal: AppTheme.layout.spacing.sm + 4,
    paddingVertical: AppTheme.layout.spacing.sm + 2,
    height: AppTheme.layout.inputHeight,
    ...AppTheme.textVariants.body,
    color: AppTheme.colors.text.primary,
  },
  errorBorder: { borderColor: AppTheme.colors.error },
  error: {
    marginTop: AppTheme.layout.spacing.xs,
    ...AppTheme.textVariants.caption,
    fontSize: AppTheme.textVariants.caption.fontSize - 2,
    color: AppTheme.colors.error,
  },
}));
