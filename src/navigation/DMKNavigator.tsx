import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AppTheme } from '../theme';
import { SCREEN_NAMES } from '../constants/screens';
import type { DMKStackParamList } from './types';

import { AppHeader } from '../components/common/AppHeader';
import {
  HomeScreen,
  MemberDetailScreen,
  MemberListScreen,
  SuccessScreen,
  TwoOptionListScreen,
} from '../screens';
import { ComplaintScreen } from '../screens/ComplaintScreen';
import { APP_HEADER_TITLE } from '../constants';

const Stack = createNativeStackNavigator<DMKStackParamList>();

export const DMKNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      initialRouteName={SCREEN_NAMES.DASHBOARD}
      screenOptions={{
        headerShown: true,
        gestureEnabled: true,
        animation: 'slide_from_right',
        fullScreenGestureEnabled: true,
        header: () => <AppHeader title={APP_HEADER_TITLE} />,
        contentStyle: {
          backgroundColor: AppTheme.colors.background.primary,
        },
      }}
    >
      <Stack.Screen
        name={SCREEN_NAMES.DASHBOARD}
        component={HomeScreen}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name={SCREEN_NAMES.MEMBER_DETAIL}
        component={MemberDetailScreen}
        options={{
          headerShown: true,
        }}
      />
      <Stack.Screen
        name={SCREEN_NAMES.MEMBER_LIST}
        component={MemberListScreen}
        options={{
          headerShown: true,
        }}
      />
      <Stack.Screen
        name={SCREEN_NAMES.TWO_OPTION_LIST}
        component={TwoOptionListScreen}
        options={{
          headerShown: true,
        }}
      />

      <Stack.Screen
        name={SCREEN_NAMES.COMPLAINT_SCREEN}
        component={ComplaintScreen}
        options={{
          headerShown: true,
        }}
      />

      <Stack.Screen
        name={SCREEN_NAMES.SUCCESS_SCREEN}
        component={SuccessScreen}
        options={{
          headerShown: true,
        }}
      />
    </Stack.Navigator>
  );
};
