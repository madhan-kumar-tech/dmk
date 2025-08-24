import { ApiEnvelope } from '../types/api';
import NetInfo from '@react-native-community/netinfo';

const BASE_URL = 'https://app.dmk.zerame.com/';

const pendingRequests = new Map<string, Promise<any>>();

function createRequestKey(
  descriptor: { method: string; url: string; payload?: any },
  opts?: any,
): string {
  return JSON.stringify({
    method: descriptor.method,
    url: descriptor.url,
    payload: descriptor.payload,
    form: opts?.form,
  });
}

function toAbsoluteUrl(url: string) {
  if (url.startsWith('http')) return url;
  return `${BASE_URL}${url.replace(/^\//, '')}`;
}

function normalize<TSuccess, TError>(json: ApiEnvelope<TSuccess, TError>) {
  const ok = json?.response?.success !== undefined;
  if (ok) {
    return { ok: true as const, data: json.response.success as TSuccess };
  }
  const err = json?.response?.error ?? { message: json.message };
  return { ok: false as const, error: Array.isArray(err) ? err : [err] };
}

function makeBody(payload: any, form?: boolean) {
  if (form) {
    if (
      !payload ||
      (typeof payload === 'object' && Object.keys(payload).length === 0)
    ) {
      return '_ping=1';
    }
    const p = new URLSearchParams();
    Object.entries(payload).forEach(([k, v]) =>
      p.append(k, v == null ? '' : String(v)),
    );
    return p.toString();
  }

  if (!payload) return undefined;
  return JSON.stringify(payload);
}

export async function apiFetch<TSuccess = unknown>(
  descriptor: { method: string; url: string; payload?: any },
  opts?: {
    form?: boolean;
    headers?: Record<string, string>;
    signal?: AbortSignal;
  },
) {
  const requestKey = createRequestKey(descriptor, opts);

  if (pendingRequests.has(requestKey)) {
    return pendingRequests.get(requestKey);
  }

  const executeRequest = async (): Promise<TSuccess> => {
    const networkState = await NetInfo.fetch();

    if (!networkState.isConnected) {
      throw new Error(
        'No internet connection. Please check your network and try again.',
      );
    }

    if (networkState.isInternetReachable === false) {
      throw new Error(
        'Internet is not reachable. Please check your connection.',
      );
    }

    const controller = new AbortController();
    const signal = opts?.signal ?? controller.signal;
    const timeout = setTimeout(() => {
      controller.abort();
    }, 30000);

    try {
      const url = toAbsoluteUrl(descriptor.url);

      const method = descriptor.method.toUpperCase();

      const headers: Record<string, any> = {
        ...(opts?.form
          ? { 'Content-Type': 'application/x-www-form-urlencoded' }
          : { 'Content-Type': 'application/json' }),
        Accept: '*/*',
        'User-Agent': 'DMKApp/1.0 (ReactNative)',
        ...(opts?.headers ?? {}),
      };

      const body =
        method === 'GET' ? undefined : makeBody(descriptor.payload, opts?.form);

      const res = await fetch(url, {
        method,
        headers,
        body,
        signal,
      });

      const json = (await res.json()) as ApiEnvelope<TSuccess, any>;

      const norm = normalize<TSuccess, any>(json);

      if (!norm.ok) {
        const e = new Error('API_ERROR');
        (e as any).detail = norm.error;
        throw e;
      }
      return norm.data;
    } catch (error) {
      const errorMessage = (error as any)?.message || 'Unknown error';

      if (errorMessage.includes('Network request failed')) {
      } else if (
        errorMessage.includes('timeout') ||
        errorMessage.includes('AbortError')
      ) {
      } else if (errorMessage.includes('JSON')) {
      }

      throw error;
    } finally {
      clearTimeout(timeout);
    }
  };

  const requestPromise = executeRequest();
  pendingRequests.set(requestKey, requestPromise);

  try {
    const result = await requestPromise;
    return result;
  } finally {
    pendingRequests.delete(requestKey);
  }
}
