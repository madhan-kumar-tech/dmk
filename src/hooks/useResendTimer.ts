import * as React from 'react';

export function useResendTimer(seconds = 30) {
  const [left, setLeft] = React.useState(0);
  const canResend = left <= 0;

  React.useEffect(() => {
    if (left <= 0) return;
    const t = setInterval(() => setLeft(v => (v > 0 ? v - 1 : 0)), 1000);
    return () => clearInterval(t);
  }, [left]);

  const start = React.useCallback(() => setLeft(seconds), [seconds]);

  return { left, canResend, start };
}
