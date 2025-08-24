import React from 'react';
import {
  View,
  Text,
  Platform,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Clipboard from '@react-native-clipboard/clipboard';
import { AppHeader } from '../common';
import { AppTheme } from '../../theme';
import { makeStyles } from '../../theme/responsive';

type DebugData = Record<string, any>;

type GlobalErrorState = {
  hasError: boolean;
  error?: Error;
  errorInfo?: React.ErrorInfo;
  isFatal?: boolean;
  extraDebug?: DebugData;
};

type GlobalErrorContextType = {
  triggerError: (error: Error, extraDebug?: DebugData) => void;
  clearError: () => void;
};

export type NavigateHomeFn = () => void;

const GlobalErrorContext = React.createContext<GlobalErrorContextType>({
  triggerError: () => {},
  clearError: () => {},
});

let _ctxRef: GlobalErrorContextType | null = null;
export function triggerGlobalError(error: Error, extraDebug?: DebugData) {
  _ctxRef?.triggerError(error, extraDebug);
}

const DebugBlock: React.FC<{ data: DebugData }> = ({ data }) => {
  const styles = useStyles();
  const [open, setOpen] = React.useState(true);

  const json = React.useMemo(
    () =>
      JSON.stringify(
        {
          platform: Platform.OS,
          platformVersion: Platform.Version,
          ...data,
        },
        null,
        2,
      ),
    [data],
  );

  const copy = () => Clipboard.setString(json);

  return (
    <View style={styles.debugWrap}>
      <TouchableOpacity
        onPress={() => setOpen(!open)}
        style={styles.debugHeader}
        activeOpacity={0.7}
      >
        <Text style={styles.debugHeaderText}>
          {open ? '▼' : '▶'} Debug Info
        </Text>
        <TouchableOpacity
          onPress={copy}
          style={styles.copyBtn}
          activeOpacity={0.8}
        >
          <Text style={styles.copyBtnText}>Copy</Text>
        </TouchableOpacity>
      </TouchableOpacity>

      {open && (
        <View style={styles.debugBody}>
          <ScrollView bounces={false} style={styles.debugScroll}>
            <Text style={styles.debugMono}>{json}</Text>
          </ScrollView>
        </View>
      )}
    </View>
  );
};

const GlobalErrorView: React.FC<{
  title?: string;
  message?: string;
  onGoHome: () => void;
  onRetry?: () => void;
  debug?: DebugData;

  showHeader?: boolean;
  headerTitle?: string;
}> = ({
  title = 'ஏதோ தவறு ஏற்பட்டுள்ளது',
  message = 'தயவுசெய்து மீண்டும் முயற்சிக்கவும். கீழே தொடர்புடைய விவரங்கள் கொடுக்கப்பட்டுள்ளன.',
  onGoHome,
  onRetry,
  debug,
  showHeader = true,
  headerTitle = 'Error',
}) => {
  const styles = useStyles();

  return (
    <SafeAreaView style={styles.container}>
      {showHeader && <AppHeader title={headerTitle} />}

      <View style={styles.card}>
        <Text style={styles.title}>{title}</Text>
        {!!message && <Text style={styles.message}>{message}</Text>}

        <View style={styles.actions}>
          <TouchableOpacity
            onPress={onGoHome}
            style={[styles.btn, styles.primary]}
            activeOpacity={0.8}
          >
            <Text style={styles.btnTextPrimary}>Go Home</Text>
          </TouchableOpacity>

          {!!onRetry && (
            <TouchableOpacity
              onPress={onRetry}
              style={[styles.btn, styles.ghost]}
              activeOpacity={0.8}
            >
              <Text style={styles.btnTextGhost}>Try Again</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      {!!debug && <DebugBlock data={debug} />}
    </SafeAreaView>
  );
};

export class GlobalErrorBoundary extends React.Component<
  {
    navigateHome: NavigateHomeFn;
    children: React.ReactNode;
    getExtraDebug?: () => DebugData;
    showStack?: boolean;
    showHeader?: boolean;
    headerTitle?: string;
  },
  GlobalErrorState
> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): Partial<GlobalErrorState> {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    this.setState({ error, errorInfo });
  }

  private resetToHome = () => {
    this.setState({ hasError: false, error: undefined, errorInfo: undefined });
    this.props.navigateHome();
  };

  render() {
    if (this.state.hasError) {
      const debug: DebugData = {
        error: this.state.error?.message,
        name: this.state.error?.name,
        ...(this.props.showStack && this.state.error?.stack
          ? { stack: this.state.error.stack }
          : {}),
        ...(this.state.errorInfo
          ? { componentStack: this.state.errorInfo.componentStack }
          : {}),
        ...(this.props.getExtraDebug ? this.props.getExtraDebug() : {}),
      };

      return (
        <GlobalErrorView
          message="We hit an unexpected error. You can head back to Home. Debug details are available below."
          onGoHome={this.resetToHome}
          debug={debug}
          showHeader={this.props.showHeader}
          headerTitle={this.props.headerTitle}
        />
      );
    }
    return this.props.children as React.ReactElement;
  }
}

export const GlobalErrorProvider: React.FC<{
  children: React.ReactNode;
  navigateHome: NavigateHomeFn;
  getExtraDebug?: () => DebugData;
  showHeader?: boolean;
  headerTitle?: string;
}> = ({ children, navigateHome, getExtraDebug, showHeader, headerTitle }) => {
  const [state, setState] = React.useState<GlobalErrorState>({
    hasError: false,
  });

  const ctx = React.useMemo<GlobalErrorContextType>(
    () => ({
      triggerError: (error, extraDebug) =>
        setState({
          hasError: true,
          error,
          extraDebug: {
            message: error?.message,
            name: error?.name,
            ...(error?.stack ? { stack: error.stack } : {}),
            ...(extraDebug || {}),
          },
        }),
      clearError: () => setState({ hasError: false }),
    }),
    [],
  );

  React.useEffect(() => {
    _ctxRef = ctx;
    return () => {
      if (_ctxRef === ctx) _ctxRef = null;
    };
  }, [ctx]);

  if (state.hasError) {
    const debug: DebugData = {
      ...(state.extraDebug || {}),
      ...(getExtraDebug ? getExtraDebug() : {}),
    };
    return (
      <GlobalErrorView
        message="An unexpected error occurred. You can head back to Home. Debug details are available below."
        onGoHome={navigateHome}
        debug={debug}
        showHeader={showHeader}
        headerTitle={headerTitle}
      />
    );
  }

  return (
    <GlobalErrorContext.Provider value={ctx}>
      {children}
    </GlobalErrorContext.Provider>
  );
};

export function installGlobalJsErrorHandlers(opts: {
  onError: (e: Error, isFatal?: boolean) => void;
}) {
  const { onError } = opts;

  const ErrorUtilsAny: any = (globalThis as any).ErrorUtils;
  const prev = ErrorUtilsAny?.getGlobalHandler?.();

  ErrorUtilsAny?.setGlobalHandler?.((e: Error, isFatal?: boolean) => {
    try {
      onError(e, isFatal);
    } finally {
      prev && prev(e, isFatal);
    }
  });

  const handler = (reason: any) => {
    const err = reason instanceof Error ? reason : new Error(String(reason));
    onError(err, false);
  };

  const g: any = globalThis as any;
  if (typeof g.addEventListener === 'function') {
    g.addEventListener('unhandledrejection', handler);
  }
}

const useStyles = makeStyles(() => {
  const C = AppTheme.colors;
  return {
    container: {
      flex: 1,
      padding: 16,
      gap: 12,
      backgroundColor: C.background.primary,
    },
    card: {
      borderRadius: 16,
      padding: 16,
      backgroundColor: C.background.secondary,
      borderWidth: 1,
      borderColor: AppTheme.colors.primary,
    },
    title: {
      fontSize: 20,
      fontWeight: '700',
      color: C.text.primary,
      marginBottom: 8,
      textAlign: 'left',
    },
    message: { fontSize: 14, color: C.text.secondary },

    actions: { flexDirection: 'row', gap: 12, marginTop: 16 },
    btn: {
      paddingHorizontal: 16,
      paddingVertical: 12,
      borderRadius: 12,
      borderWidth: 1,
    },
    primary: {
      backgroundColor: AppTheme.colors.primary,
      borderColor: C.primary,
    },
    btnTextPrimary: { color: AppTheme.colors.primary, fontWeight: '600' },
    ghost: { borderColor: AppTheme.colors.primary },
    btnTextGhost: { color: C.text.primary, fontWeight: '600' },

    debugWrap: {
      borderRadius: 16,
      overflow: 'hidden',
      backgroundColor: C.surface,
      borderWidth: 1,
      borderColor: AppTheme.colors.primary,
    },
    debugHeader: {
      paddingHorizontal: 12,
      paddingVertical: 10,
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
    },
    debugHeaderText: {
      color: AppTheme.colors.primary,
      fontWeight: '700',
      fontSize: 12,
      flex: 1,
    },
    copyBtn: {
      paddingHorizontal: 10,
      paddingVertical: 6,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: AppTheme.colors.primary,
    },
    copyBtnText: { color: C.text.primary, fontWeight: '600', fontSize: 12 },
    debugBody: { paddingHorizontal: 12, paddingBottom: 12 },
    debugScroll: { maxHeight: 220 },
    debugMono: {
      color: C.text.secondary,
      fontFamily: Platform.select({
        ios: 'Menlo',
        android: 'monospace',
      }) as any,
      fontSize: 12,
    },
  } as const;
});

export const useGlobalError = () => React.useContext(GlobalErrorContext);
