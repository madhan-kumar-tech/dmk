import React, { forwardRef } from 'react';
import {
  TextInput,
  TextInputProps,
  Platform,
  StyleSheet,
  View,
} from 'react-native';

interface StyledTextInputProps extends TextInputProps {
  // Add any additional props specific to your styled input
}

export const StyledTextInput = forwardRef<TextInput, StyledTextInputProps>(
  (props, ref) => {
    return (
      <TextInput
        ref={ref}
        {...props}
        style={[styles.input, props.style]}
        underlineColorAndroid="transparent"
      />
    );
  },
);

const styles = StyleSheet.create({
  input: {
    // Override Android's default underline
    ...Platform.select({
      android: {
        paddingBottom: 0,
        borderBottomWidth: 0,
        textDecorationLine: 'none',
        textAlignVertical: 'center',
      },
    }),
  },
});
