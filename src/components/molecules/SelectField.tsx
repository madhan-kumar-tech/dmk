import React, { useMemo } from 'react';
import {
  View,
  ViewStyle,
  TextStyle,
  Platform,
  ImageStyle,
  ActivityIndicator,
} from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { makeStyles } from '../../theme/responsive';
import { AppText } from '../ui';
import { InnerShadow } from '../../../ui/atoms/InnerShadow';
import MaterialDesignIcons from '@react-native-vector-icons/material-design-icons';

export type SelectOption = {
  value: string | number;
  label: string;
  [k: string]: any;
};

type Props = {
  label?: string;
  value?: string | number;
  onChange: (value: string | number, option?: SelectOption) => void;
  options: SelectOption[];
  placeholder?: string;
  helperText?: string;
  disabled?: boolean;
  locked?: boolean;
  searchable?: boolean;
  maxHeight?: number;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  zIndex?: number;
  dropdownZIndex?: number;
  containerStyle?: ViewStyle;
  placeholderMaxChars?: number;

  loading?: boolean;
  inset?: boolean;
};

const ellipsize = (s: string, max = 28) =>
  !s || s.length <= max ? s : s.slice(0, Math.max(0, max - 1)) + '…';

export const SelectField: React.FC<Props> = ({
  label,
  value,
  onChange,
  options,
  placeholder = 'தேர்ந்தெடுக்கவும்',
  helperText,
  disabled,
  locked,
  searchable = true,
  maxHeight = 320,
  leftIcon,
  rightIcon,
  zIndex = 1,
  dropdownZIndex,
  containerStyle,
  placeholderMaxChars = 28,
  loading = false,
  inset = true,
}) => {
  const s = useStyles();
  const isDisabled = !!disabled || !!locked || loading;
  const current = useMemo(() => value, [value]);

  const fieldZ = zIndex;
  const panelZ = dropdownZIndex ?? zIndex + 10;

  return (
    <View style={[s.container, containerStyle, { zIndex: fieldZ }]}>
      {!!label && (
        <AppText variant="caption" style={s.label}>
          {label}
        </AppText>
      )}

      <View style={{ position: 'relative' }}>
        <Dropdown
          mode="default"
          dropdownPosition="bottom"
          autoScroll
          search={searchable}
          data={options}
          labelField="label"
          valueField="value"
          value={current}
          onChange={item => onChange(item.value, item)}
          disable={isDisabled}
          maxHeight={maxHeight}
          flatListProps={{
            initialNumToRender: 12,
            maxToRenderPerBatch: 12,
            windowSize: 10,
            removeClippedSubviews: true,
            keyExtractor: (it: any, idx: number) => String(it.value ?? idx),
          }}
          style={[
            s.field,
            (disabled || locked) && s.fieldDisabled,
            Platform.OS === 'android'
              ? { elevation: Math.max(1, fieldZ) }
              : null,
          ]}
          containerStyle={[
            s.dropdownContainer,
            { zIndex: panelZ },
            Platform.OS === 'android'
              ? { elevation: Math.max(6, panelZ) }
              : null,
          ]}
          activeColor="#F7F8FA"
          placeholder={ellipsize(placeholder, placeholderMaxChars)}
          placeholderStyle={s.placeholder}
          selectedTextStyle={s.selectedText}
          selectedTextProps={{ numberOfLines: 1, ellipsizeMode: 'tail' }}
          itemTextStyle={s.itemText}
          inputSearchStyle={s.inputSearch}
          iconStyle={s.iconStyle}
          renderLeftIcon={() => (
            <MaterialDesignIcons
              name={(leftIcon as any) || 'home-city-outline'}
              color="#9AA0A6"
              size={24}
              style={{ marginRight: 10 }}
            />
          )}
          renderRightIcon={
            rightIcon
              ? () => <>{rightIcon}</>
              : () =>
                  loading ? (
                    <ActivityIndicator
                      size="small"
                      color="#666"
                      style={{ marginRight: 6 }}
                    />
                  ) : (
                    <AppText style={s.caret}>▾</AppText>
                  )
          }
          renderItem={item => {
            const active = item.value === value;
            return (
              <View style={[s.row, active && s.rowActive]}>
                <AppText
                  numberOfLines={1}
                  style={[s.rowLabel, active && s.rowLabelActive]}
                >
                  {item.label}
                </AppText>
                {active ? <AppText style={s.tick}>✓</AppText> : null}
              </View>
            );
          }}
        />
        {inset && <InnerShadow />}
      </View>

      {!!helperText && (
        <AppText variant="caption" style={s.helper}>
          {helperText}
        </AppText>
      )}
    </View>
  );
};

const useStyles = makeStyles(() => ({
  container: { marginBottom: 12 } as ViewStyle,
  label: { opacity: 0.9, marginBottom: 6, fontSize: 16 } as TextStyle,
  field: {
    minHeight: 48,
    borderRadius: 12,
    paddingHorizontal: 12,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#E1E4E8',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOpacity: 0.06,
        shadowRadius: 6,
        shadowOffset: { width: 0, height: 2 },
      },
      android: { elevation: 1 },
    }),
  } as ViewStyle,
  fieldDisabled: {
    backgroundColor: '#F4F5F6',
    borderColor: '#E7E9EC',
  } as ViewStyle,
  dropdownContainer: {
    borderRadius: 12,
    borderColor: '#E1E4E8',
    borderWidth: 1,
    paddingVertical: 4,
    backgroundColor: '#fff',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOpacity: 0.12,
        shadowRadius: 12,
        shadowOffset: { width: 0, height: 6 },
      },
      android: { elevation: 6 },
    }),
  } as ViewStyle,
  leftIcon: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: '#E1E4E8',
    marginRight: 8,
  } as ViewStyle,
  iconStyle: { width: 0, height: 0 } as ImageStyle,
  placeholder: { color: '#9AA1A7' } as TextStyle,
  selectedText: { color: '#111' } as TextStyle,
  itemText: {} as TextStyle,
  inputSearch: {
    borderColor: '#E1E4E8',
    borderRadius: 10,
    paddingHorizontal: 12,
  } as TextStyle,
  row: {
    minHeight: 44,
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  } as ViewStyle,
  rowActive: { backgroundColor: '#F7F8FA' } as ViewStyle,
  rowLabel: {} as TextStyle,
  rowLabelActive: { fontWeight: '700' } as TextStyle,
  tick: { fontWeight: '700', color: '#16A34A', marginLeft: 12 } as TextStyle,
  caret: { marginLeft: 8, color: '#6B7280' } as TextStyle,
  helper: { color: '#9AA1A7', marginTop: 6 } as TextStyle,
}));
