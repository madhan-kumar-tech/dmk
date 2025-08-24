import React from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import { AppText } from '../ui';
import { makeStyles } from '../../theme/responsive';
import type { PickedImage } from '../../types/home';

type Props = {
  images: PickedImage[];
  onPick: () => void;
  onRemove: (index: number) => void;
  error?: string | null;
};

export const AttachmentGrid: React.FC<Props> = ({
  images,
  onPick,
  onRemove,
  error,
}) => {
  const s = useStyles();
  return (
    <View>
      <AppText variant="t_body">புகைப்படங்கள் (JPG/PNG, மொத்தம் ≤ 5MB)</AppText>
      <View style={s.grid}>
        {images.map((img, i) => (
          <View key={`${img.uri}-${i}`} style={s.thumbWrap}>
            <Image source={{ uri: img.uri }} style={s.thumb} />
            <TouchableOpacity style={s.removePill} onPress={() => onRemove(i)}>
              <AppText variant="t_caption" style={{ color: '#fff' }}>
                ×
              </AppText>
            </TouchableOpacity>
          </View>
        ))}
        <TouchableOpacity style={[s.thumbWrap, s.addBox]} onPress={onPick}>
          <AppText variant="t_header" style={{ textAlign: 'center' }}>
            +
          </AppText>
        </TouchableOpacity>
      </View>
      {!!error && (
        <AppText variant="t_caption" style={{ color: '#C62828', marginTop: 6 }}>
          {error}
        </AppText>
      )}
    </View>
  );
};

const BOX = 72;
const useStyles = makeStyles(
  () =>
    ({
      grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
      thumbWrap: {
        width: BOX,
        height: BOX,
        borderRadius: 10,
        overflow: 'hidden',
        backgroundColor: '#F1F3F5',
        position: 'relative',
      },
      thumb: { width: '100%', height: '100%' },
      removePill: {
        position: 'absolute',
        top: 4,
        right: 4,
        backgroundColor: '#00000088',
        borderRadius: 12,
        paddingHorizontal: 6,
        paddingVertical: 1,
      },
      addBox: {
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderStyle: 'dashed',
        borderColor: '#C8CFD8',
        backgroundColor: '#FAFBFC',
      },
    } as any),
);
