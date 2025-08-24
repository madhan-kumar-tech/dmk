export type ApiMethod = 'GET' | 'POST';

export type ApiEnvelope<TSuccess = unknown, TError = unknown> = {
  message: string;
  statusCode: number;
  response: {
    success?: TSuccess | TSuccess[];
    error?: TError | TError[];
  };
};

export type ApiDescriptor<P extends object = Record<string, unknown>> = {
  method: ApiMethod;
  url: string;
  payload?: P;
  uiType?: string;
};
