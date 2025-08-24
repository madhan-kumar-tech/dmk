import type { HomeResponse, SimpleOpt } from '../../types/home';

export function extractRootOptsForComplaint(home?: HomeResponse): SimpleOpt[] {
  const ROOT_LABELS = new Set(['பேரூராட்சி', 'ஊராட்சி']);
  return (
    home?.options
      ?.filter(o => ROOT_LABELS.has(o.label))
      .map(o => ({ label: o.label, value: o.value, api: o.api })) ?? []
  );
}

export function mapDropdown(apiData: any): {
  title?: string;
  options: SimpleOpt[];
} {
  const title = apiData?.response?.success?.title ?? apiData?.title;
  const list = apiData?.response?.success?.list ?? apiData?.list ?? [];
  const options: SimpleOpt[] = list.map((it: any) => ({
    label: it.label,
    value: it.value,
    api: it.api,
  }));
  return { title, options };
}

export const isValidINPhone = (p?: string) =>
  /^[6-9]\d{9}$/.test((p ?? '').trim());

export const MAX_COMBINED_BYTES = 5 * 1024 * 1024;
export function sumSizes(files: { size?: number }[]) {
  return files.reduce((n, f) => n + (f.size ?? 0), 0);
}
export function isAllowedType(mime?: string) {
  return mime === 'image/jpeg' || mime === 'image/png';
}
