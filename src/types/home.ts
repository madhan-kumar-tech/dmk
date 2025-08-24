export type ApiDescriptor<T = any> = {
  method: 'GET' | 'POST';
  url: string;
  payload?: T;
};
export type HomeOption = {
  value: number | string;
  label: string;
  uiType: string;
  api: ApiDescriptor<any>;
};
export type HomeResponse = {
  options: HomeOption[];
};
export type SimpleOpt = {
  label: string;
  value: string | number;
  api?: ApiDescriptor<any>;
};

export type PickedImage = {
  uri: string;
  name: string;
  type: 'image/jpeg' | 'image/png';
  size?: number;
};
