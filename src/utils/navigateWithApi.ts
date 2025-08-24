import { apiFetch } from '../services/client';
import { ApiUiType, UI_TO_SCREEN } from '../types/ui';
import { SCREEN_NAMES } from '../constants/screens';
import { useAppStore } from '../store';
import { triggerGlobalError } from '../components/ui/GlobalError';
import { navigationRef } from '../services/NavigationService';

type ApiDescriptor<> = {
  method: 'GET' | 'POST';
  url: string;
  payload?: Record<string, any>;
};

type HomeOption = {
  label: string;
  uiType: ApiUiType;
  api: ApiDescriptor;
};

export async function navigateWithApi(option: HomeOption) {
  const begin = useAppStore.getState().beginRequest;
  const end = useAppStore.getState().endRequest;

  try {
    begin();

    const data = await apiFetch<any>(option.api);

    let routeKey: keyof typeof SCREEN_NAMES;

    const appType = UI_TO_SCREEN[option.uiType];
    routeKey = appType as keyof typeof SCREEN_NAMES;

    const routeName = SCREEN_NAMES[routeKey];

    if (navigationRef.isReady()) {
      navigationRef.navigate(
        routeName as any,
        {
          title: option.label,
          uiType: option.uiType,
          descriptor: option.api,
          prefetched: data,
        } as never,
      );
    }
  } catch (error: any) {
    triggerGlobalError(error, {
      scope: 'navigateWithApi',
      label: option.label,
      uiType: option.uiType,
      url: option.api?.url,
      payload: option.api?.payload,
    });
  } finally {
    end();
  }
}
