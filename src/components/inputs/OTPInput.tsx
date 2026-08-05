import React, { useRef } from 'react';
import {
  StyleProp,
  StyleSheet,
  TextInput as RNTextInput,
  View,
  ViewStyle,
} from 'react-native';

import { SyzygyTheme, useSyzygyTheme } from '../../theme';

export interface OTPInputProps {
  length?: number;
  code: string;
  onCodeChange: (code: string) => void;
  style?: StyleProp<ViewStyle>;
  accessibilityLabel?: string;
  theme?: SyzygyTheme;
}

export const OTPInput: React.FC<OTPInputProps> = ({
  length = 6,
  code,
  onCodeChange,
  style,
  accessibilityLabel,
  theme: themeProp,
}) => {
  const { theme: contextTheme } = useSyzygyTheme();
  const theme = themeProp ?? contextTheme;
  const inputs = useRef<(RNTextInput | null)[]>([]);
  const boxes = Array.from({ length }, (_, i) => i);

  const handleChangeText = (text: string, index: number) => {
    const digit = text.slice(-1);
    const chars = code.split('');
    chars[index] = digit;
    const next = chars.join('').slice(0, length);
    onCodeChange(next);
    if (digit && index < length - 1) {
      inputs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (key: string, index: number) => {
    if (key === 'Backspace' && !code[index] && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  };

  return (
    <View style={[styles.container, style]} accessibilityLabel={accessibilityLabel ?? 'One-time code'}>
      {boxes.map((index) => (
        <RNTextInput
          key={index}
          ref={(ref) => {
            inputs.current[index] = ref;
          }}
          value={code[index] ?? ''}
          onChangeText={(text) => handleChangeText(text, index)}
          onKeyPress={({ nativeEvent }) => handleKeyPress(nativeEvent.key, index)}
          keyboardType="number-pad"
          maxLength={1}
          accessibilityLabel={`Digit ${index + 1}`}
          style={[
            styles.box,
            {
              borderRadius: theme.radius.md,
              fontSize: theme.typography.body.fontSize,
              fontWeight: theme.typography.headline.fontWeight,
              backgroundColor: theme.colors.surface,
              borderColor: theme.colors.border,
              color: theme.colors.textPrimary,
            },
          ]}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  box: {
    width: 44,
    height: 44,
    borderWidth: 1,
    textAlign: 'center',
  },
});
