import * as RNImagePicker from 'react-native-image-picker';
import type { PickedImage } from '../types/home';

export async function pickMultipleImages(): Promise<PickedImage[] | null> {
  const res = await RNImagePicker.launchImageLibrary({
    mediaType: 'photo',
    selectionLimit: 10,
  });

  if (res.didCancel) return null;

  const assets = res.assets ?? [];

  const images: PickedImage[] = assets
    .filter(a => !!a.uri)
    .map(a => {
      const type = (
        a.type === 'image/jpg' ? 'image/jpeg' : a.type
      ) as PickedImage['type'];
      const name =
        a.fileName ??
        `img_${Date.now()}_${Math.floor(Math.random() * 1e6)}.${
          type === 'image/png' ? 'png' : 'jpg'
        }`;
      return {
        uri: a.uri!,
        name,
        type: (type ?? 'image/jpeg') as PickedImage['type'],
        size: a.fileSize,
      };
    });
  return images;
}
