import React from 'react';
import { StyleProp, StyleSheet, Text, View, ViewStyle, useColorScheme } from 'react-native';

import { getColors } from '../../tokens/colors';
import { spacing } from '../../tokens/spacing';
import { fontSizes, fontWeights } from '../../tokens/typography';

export interface StepIndicatorProps {
  steps: string[];
  currentStep: number;
  style?: StyleProp<ViewStyle>;
}

/**
 * A horizontal step-progress indicator (also known as `WizardSteps`):
 * a filled circle for completed steps, a ring for the active step, a dot
 * for pending steps, connected by lines.
 */
export const StepIndicator: React.FC<StepIndicatorProps> = ({ steps, currentStep, style }) => {
  const scheme = useColorScheme();
  const colors = getColors(scheme);

  return (
    <View style={[styles.container, style]} accessibilityLabel={`Step ${currentStep + 1} of ${steps.length}`}>
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
                    ? { backgroundColor: colors.primary, borderColor: colors.primary }
                    : isActive
                    ? { backgroundColor: 'transparent', borderColor: colors.primary, borderWidth: 2 }
                    : { backgroundColor: colors.surfaceAlt, borderColor: colors.border },
                ]}
              >
                {isCompleted ? <Text style={{ color: colors.primaryText, fontSize: fontSizes.xs }}>{'✓'}</Text> : null}
              </View>
              <Text
                style={[
                  styles.label,
                  { color: isPending ? colors.textSecondary : colors.textPrimary },
                ]}
                numberOfLines={1}
              >
                {label}
              </Text>
            </View>
            {index < steps.length - 1 ? (
              <View style={[styles.connector, { backgroundColor: isCompleted ? colors.primary : colors.border }]} />
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
  label: {
    fontSize: fontSizes.xs,
    fontWeight: fontWeights.medium,
    marginTop: spacing.xxs,
    textAlign: 'center',
  },
  connector: {
    flex: 1,
    height: 1,
    marginTop: 12,
  },
});
