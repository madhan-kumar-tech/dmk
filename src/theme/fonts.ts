import { Platform } from 'react-native';

export type Weight =
  | 'regular'
  | 'medium'
  | 'semibold'
  | 'bold'
  | 'extrabold'
  | 'black';

type Family = Partial<Record<Weight, string>>;

const NotoTamil: Family = {
  regular: 'NotoSansTamil-Regular',
  medium: 'NotoSansTamil-Medium',
  semibold: 'NotoSansTamil-SemiBold',
  bold: 'NotoSansTamil-Bold',
  extrabold: 'NotoSansTamil-ExtraBold',
};

const Montserrat: Family = {
  regular: 'Montserrat-Regular',
  medium: 'Montserrat-Medium',
  semibold: 'Montserrat-SemiBold',
  bold: 'Montserrat-Bold',
  extrabold: 'Montserrat-ExtraBold',
};

const Nunito: Family = {
  regular: 'Nunito-Regular',
  medium: 'Nunito-Medium',
  semibold: 'Nunito-SemiBold',
  bold: 'Nunito-Bold',
  extrabold: 'Nunito-ExtraBold',
};

const Roboto: Family = {
  regular: Platform.select({ ios: 'Roboto-Regular', android: 'Roboto' }),
  medium: 'Roboto-Medium',
  semibold: 'Roboto-Medium',
  bold: 'Roboto-Bold',
  black: 'Roboto-Black',
  extrabold: 'Roboto-Black',
};

export const fontGroups = {
  headings: Montserrat,
  body: Nunito,
  tamil: NotoTamil,
  system: Roboto,
};
export type FontGroupKey = keyof typeof fontGroups;

const ORDER: Weight[] = [
  'regular',
  'medium',
  'semibold',
  'bold',
  'extrabold',
  'black',
];

export function resolveFont(group: FontGroupKey, weight: Weight): string {
  const fam = fontGroups[group];
  if (fam[weight]) return fam[weight] as string;

  const idx = ORDER.indexOf(weight);

  for (let i = idx + 1; i < ORDER.length; i++) {
    const candidate = fam[ORDER[i]];
    if (candidate) return candidate;
  }

  for (let i = idx - 1; i >= 0; i--) {
    const candidate = fam[ORDER[i]];
    if (candidate) return candidate;
  }

  return fam.regular as string;
}
