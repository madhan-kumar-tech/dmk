import React from 'react';
import { TouchableOpacity, GestureResponderEvent } from 'react-native';
import { IconButton as PaperIconButton } from 'react-native-paper';
import { AppTheme } from '../../theme';
import { makeStyles } from '../../theme/responsive';

interface IconButtonProps {
  icon: string;
  size?: number;
  color?: string;
  onPress?: (e: GestureResponderEvent) => void;
}

export const IconButton: React.FC<IconButtonProps> = ({
  icon,
  size = 24,
  color = AppTheme.colors.text.primary,
  onPress,
}) => {
  const styles = useStyles();

  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <PaperIconButton icon={icon} size={size} iconColor={color} />
    </TouchableOpacity>
  );
};

const useStyles = makeStyles(r => ({
  container: {
    padding: AppTheme.layout.spacing.sm,
    borderRadius: r.responsiveSize(20),
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
  },
}));
