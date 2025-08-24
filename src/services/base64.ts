import RNFS from 'react-native-fs';

export async function readFileAsBase64(uri: string): Promise<string> {
  return RNFS.readFile(uri, 'base64');
}

export function extFromMime(mime: string): 'jpg' | 'jpeg' | 'png' {
  if (mime === 'image/png') return 'png';
  return 'jpg';
}
