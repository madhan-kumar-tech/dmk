/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import {
  installGlobalJsErrorHandlers,
  triggerGlobalError,
} from './src/components/ui/GlobalError';

installGlobalJsErrorHandlers({
  onError: (e, isFatal) => {
    triggerGlobalError(e, { isFatal });
  },
});

AppRegistry.registerComponent(appName, () => App);
