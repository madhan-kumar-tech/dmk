import { MMKV } from 'react-native-mmkv';
import { StateStorage } from 'zustand/middleware';

export const mmkvStorage = new MMKV({
  id: 'dmk-app-storage',
  encryptionKey: 'your-encryption-key-here',
});

export const createMMKVStorage = (): StateStorage => ({
  setItem: (name: string, value: string) => {
    return mmkvStorage.set(name, value);
  },
  getItem: (name: string): string | null => {
    const value = mmkvStorage.getString(name);
    return value ?? null;
  },
  removeItem: (name: string) => {
    return mmkvStorage.delete(name);
  },
});

export const storage = {
  getString: (key: string) => mmkvStorage.getString(key) ?? null,
  setString: (key: string, value: string) => mmkvStorage.set(key, value),
  getJSON<T>(key: string): T | null {
    const raw = mmkvStorage.getString(key);
    if (!raw) return null;
    try {
      return JSON.parse(raw) as T;
    } catch {
      return null;
    }
  },
  setJSON(key: string, value: unknown) {
    mmkvStorage.set(key, JSON.stringify(value));
  },
  delete: (key: string) => mmkvStorage.delete(key),
};
