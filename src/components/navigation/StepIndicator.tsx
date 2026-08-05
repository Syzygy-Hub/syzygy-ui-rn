import React from 'react';
import { StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native';

import { SyzygyTheme, useSyzygyTheme } from '../../theme';

export interface StepIndicatorProps {
  steps: string[];
  currentStep: number;
  style?: StyleProp<ViewStyle>;
  theme?: SyzygyTheme;
}

export const StepIndicator: React.FC<StepIndicatorProps> = ({
  steps,
  currentStep,
  style,
  theme: themeProp,
}) => {
  const { theme: contextTheme } = useSyzygyTheme();
  const theme = themeProp ?? contextTheme;

  return (
    <View
      style={[styles.container, style]}
      accessibilityLabel={`Step ${currentStep + 1} of ${steps.length}`}
    >
      {steps.map((label, index) => {
        const isCompleted = index < currentStep;
        const isActive = index === currentStep;
        const isPending = index > currentStep;

        return (
          <React.Fragment key={label}>
            <View style={styles.stepColumn}>
              <View
                style={[
                  styles.node,
                  isCompleted
                    ? {
                        backgroundColor: theme.colors.primary,
                        borderColor: theme.colors.primary,
                      }
                    : isActive
                    ? [styles.nodeActive, { borderColor: theme.colors.primary }]
                    : {
                        backgroundColor: theme.colors.surfaceSecondary,
                        borderColor: theme.colors.border,
                      },
                ]}
              >
                {isCompleted ? (
                  <Text
                    style={[
                      styles.checkmark,
                      {
                        fontSize: theme.typography.caption.fontSize,
                        color: theme.colors.onPrimary,
                      },
                    ]}
                  >
                    {'✓'}
                  </Text>
                ) : null}
              </View>
              <Text
                style={[
                  styles.label,
                  {
                    fontSize: theme.typography.caption.fontSize,
                    marginTop: theme.spacing.xxs,
                    color: isPending ? theme.colors.textSecondary : theme.colors.textPrimary,
                  },
                ]}
                numberOfLines={1}
              >
                {label}
              </Text>
            </View>
            {index < steps.length - 1 ? (
              <View
                style={[
                  styles.connector,
                  {
                    backgroundColor: isCompleted ? theme.colors.primary : theme.colors.border,
                  },
                ]}
              />
            ) : null}
          </React.Fragment>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  stepColumn: {
    alignItems: 'center',
    width: 64,
  },
  node: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  nodeActive: {
    backgroundColor: 'transparent',
    borderWidth: 2,
  },
  label: {
    textAlign: 'center',
  },
  connector: {
    flex: 1,
    height: 1,
    marginTop: 12,
  },
  checkmark: {},
});
