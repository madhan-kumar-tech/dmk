import React, { useCallback } from 'react';
import { View, ViewStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StackActions } from '@react-navigation/native';
import { makeStyles } from '../../theme/responsive';
import { OutlineButton } from '../atoms/OutlineButton';
import { GradientCTAButton } from '../atoms/GradientCTAButton';
import { SCREEN_NAMES } from '../../constants';
import { useDMKNavigation } from '../../navigation';
import MaterialDesignIcons from '@react-native-vector-icons/material-design-icons';
import DoubleArrowLeftSvg from '../../svg/DoubleArrowLeftSvg';

export type BottomActionsProps = {
  outlineButtonLabel?: string;
  onPressOutlineButton?: () => void;
  footerCtaLabel?: string;
  onPressFooterCta?: () => void;
  homeRouteName?: string;
  hideBackButton?: boolean;
  hideMainMenuButton?: boolean;
};

export const BottomActions: React.FC<BottomActionsProps> = ({
  outlineButtonLabel,
  onPressOutlineButton,
  footerCtaLabel,
  onPressFooterCta,
  hideBackButton = false,
  hideMainMenuButton = false,
}) => {
  const s = useStyles();
  const insets = useSafeAreaInsets();

  const navigation = useDMKNavigation();

  const state = navigation.getState();
  const prevRouteName = state.routes[state.index - 1]?.name;

  const outlineLabel = outlineButtonLabel ?? 'மெயின் மெனு';
  const footerLabel = footerCtaLabel ?? 'முந்தைய பகுதிக்குச் செல்லவும்';

  const showFooter =
    !hideBackButton && !!footerLabel && navigation?.canGoBack();

  const currentRouteName = state?.routes?.[state?.index]?.name;

  const shouldShowOutline =
    currentRouteName === SCREEN_NAMES.SUCCESS_SCREEN ||
    (!hideMainMenuButton &&
      !!outlineLabel &&
      prevRouteName !== SCREEN_NAMES.DASHBOARD &&
      navigation?.canGoBack());

  const handleOutlinePress = useCallback(() => {
    if (onPressOutlineButton) return onPressOutlineButton();
    navigation.dispatch(StackActions.popToTop());
  }, [onPressOutlineButton, navigation]);

  const handleFooterPress = useCallback(() => {
    if (onPressFooterCta) return onPressFooterCta();
    navigation.dispatch(StackActions.pop(1));
  }, [onPressFooterCta, navigation]);

  return (
    <>
      {shouldShowOutline && (
        <OutlineButton
          title={outlineLabel}
          onPress={handleOutlinePress}
          style={s.outlineBtn}
        />
      )}

      {showFooter && (
        <View
          style={[s.footer, { paddingBottom: Math.max(insets.bottom, 12) }]}
        >
          <GradientCTAButton
            title={footerLabel}
            onPress={handleFooterPress}
            leftIcon={
              <View style={{ marginRight: 8 }}>
                <DoubleArrowLeftSvg width={14} height={14} color="white" />
              </View>
            }
            disabled={false}
            gradientStyle={{ width: '100%', height: 48, borderRadius: 8 }}
            block
          />
        </View>
      )}
    </>
  );
};

const useStyles = makeStyles(() => ({
  outlineBtn: {
    marginTop: 16,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#d33',
    paddingVertical: 14,
    alignItems: 'center',
  } satisfies ViewStyle,
  footer: {
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingTop: 12,
  } as ViewStyle,
}));
