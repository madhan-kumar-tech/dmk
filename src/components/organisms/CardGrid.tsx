import React from 'react';
import {
  View,
  ImageBackground,
  TouchableOpacity,
  ViewStyle,
  ImageStyle,
  TextStyle,
} from 'react-native';
import { makeStyles } from '../../theme/responsive';
import { IMAGES } from '../../assets';
import { AppText } from '../ui/AppText';
import { AppTheme } from '../../theme';
import { ApiUiType, HomeOption } from '../../types/ui';

type CardItem = {
  value: number;
  label: string;
  uiType: ApiUiType;
  api: {
    method: 'GET' | 'POST';
    url: string;
    payload?: any;
  };
};

export const CardGrid: React.FC<{
  data: CardItem[];
  onPress: (opt: HomeOption) => void;
}> = ({ data = [], onPress = () => {} }) => {
  const styles = useStyles();

  return (
    <View style={styles.container}>
      {data.map((item, index) => (
        <TouchableOpacity
          activeOpacity={0.8}
          key={index}
          style={styles.card}
          onPress={() => onPress(item)}
        >
          <ImageBackground
            source={IMAGES.cardGridBg}
            style={styles.bg}
            imageStyle={styles.bgImage}
          >
            <AppText variant="t_caption" style={styles.title}>
              {item.label}
            </AppText>
          </ImageBackground>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const useStyles = makeStyles(() => ({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  } satisfies ViewStyle,
  card: {
    width: '48%',
    aspectRatio: 1.6,
    marginBottom: 12,
    borderRadius: 12,
    overflow: 'hidden',
  } satisfies ViewStyle,
  bg: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  } satisfies ViewStyle,
  bgImage: {
    borderRadius: 12,
  } satisfies ImageStyle,
  title: {
    color: AppTheme.colors.primary,
    textAlign: 'center',
  } satisfies TextStyle,
}));
