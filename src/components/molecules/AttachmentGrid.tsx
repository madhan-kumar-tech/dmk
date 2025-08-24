import React from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import { AppText } from '../ui';
import { makeStyles } from '../../theme/responsive';
import type { PickedImage } from '../../types/home';
import CardImageUploadSvg from '../../svg/CardImageUploadSvg';
import { InnerShadow } from '../../../ui/atoms/InnerShadow';
import { AppTheme } from '../../theme';

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
      {images.length === 0 ? (
        <TouchableOpacity style={s.uploadContainer} onPress={onPick}>
          <View style={s.uploadContent}>
            <CardImageUploadSvg width={40} height={40} color="#9AA0A6" />
            <AppText variant="caption" style={s.uploadTitle}>
              புதியேற்ற கிளிக் செய்யவும்
            </AppText>
            <AppText variant="t_caption" style={s.uploadSubtitle}>
              JPG, JPEG, PNG - 5MB-ஐ விட குறைவாக இருக்க வேண்டும்
            </AppText>
          </View>
        </TouchableOpacity>
      ) : (
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
        </View>
      )}
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
      grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginTop: 10 },
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
      uploadContainer: {
        position: 'relative',
        borderWidth: 1,
        borderColor: '#ADADAD',
        borderRadius: 10,
        borderStyle: 'dashed',
        padding: 20,
        backgroundColor: '#fff',
        marginBottom: 12,
      },
      uploadContent: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
      },
      uploadTitle: {
        ...AppTheme.textVariants.t_body_semibold,
        color: '#0EA5E9',
        fontSize: 10,
        textAlign: 'center',
      },
      uploadSubtitle: {
       fontSize: 12,
        color: '#9AA0A6',
        textAlign: 'center',
      },
    } as any),
);
