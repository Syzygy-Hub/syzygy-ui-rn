import React from 'react';
import renderer from 'react-test-renderer';
import { Text } from 'react-native';

import { PrimaryButton } from '../components/buttons/PrimaryButton';
import { SecondaryButton } from '../components/buttons/SecondaryButton';
import { DestructiveButton } from '../components/buttons/DestructiveButton';
import { GhostButton } from '../components/buttons/GhostButton';
import { IconButton } from '../components/buttons/IconButton';
import { TextInput } from '../components/inputs/TextInput';
import { SecureInput } from '../components/inputs/SecureInput';
import { LoadingView } from '../components/feedback/LoadingView';
import { EmptyStateView } from '../components/feedback/EmptyStateView';
import { ToastView } from '../components/feedback/ToastView';
import { CardView } from '../components/cards/CardView';
import { Badge } from '../components/badges/Badge';
import { BackButton } from '../components/navigation/BackButton';

describe('component smoke tests', () => {
  it('renders PrimaryButton', () => {
    const tree = renderer.create(
      <PrimaryButton title="Continue" onPress={() => {}} />
    );
    expect(tree.toJSON()).toBeTruthy();
  });

  it('renders SecondaryButton', () => {
    const tree = renderer.create(
      <SecondaryButton title="Cancel" onPress={() => {}} />
    );
    expect(tree.toJSON()).toBeTruthy();
  });

  it('renders DestructiveButton', () => {
    const tree = renderer.create(
      <DestructiveButton title="Delete" onPress={() => {}} />
    );
    expect(tree.toJSON()).toBeTruthy();
  });

  it('renders GhostButton', () => {
    const tree = renderer.create(<GhostButton title="Skip" onPress={() => {}} />);
    expect(tree.toJSON()).toBeTruthy();
  });

  it('renders IconButton', () => {
    const tree = renderer.create(
      <IconButton
        icon={<Text>+</Text>}
        onPress={() => {}}
        accessibilityLabel="Add"
      />
    );
    expect(tree.toJSON()).toBeTruthy();
  });

  it('renders TextInput', () => {
    const tree = renderer.create(
      <TextInput label="Email" value="" onChangeText={() => {}} />
    );
    expect(tree.toJSON()).toBeTruthy();
  });

  it('renders TextInput with error', () => {
    const tree = renderer.create(
      <TextInput
        label="Email"
        value=""
        onChangeText={() => {}}
        error="Required"
      />
    );
    expect(tree.toJSON()).toBeTruthy();
  });

  it('renders TextInput with maxLength counter', () => {
    const tree = renderer.create(
      <TextInput
        label="Bio"
        value="Hello"
        onChangeText={() => {}}
        maxLength={100}
      />
    );
    expect(tree.toJSON()).toBeTruthy();
  });

  it('renders SecureInput', () => {
    const tree = renderer.create(
      <SecureInput label="Password" value="" onChangeText={() => {}} />
    );
    expect(tree.toJSON()).toBeTruthy();
  });

  it('renders LoadingView', () => {
    const tree = renderer.create(<LoadingView message="Loading data" />);
    expect(tree.toJSON()).toBeTruthy();
  });

  it('renders EmptyStateView', () => {
    const tree = renderer.create(
      <EmptyStateView
        title="Nothing here"
        subtitle="Try again later"
        ctaLabel="Retry"
        onCtaPress={() => {}}
      />
    );
    expect(tree.toJSON()).toBeTruthy();
  });

  it('renders ToastView', () => {
    const tree = renderer.create(<ToastView message="Saved!" variant="success" />);
    expect(tree.toJSON()).toBeTruthy();
  });

  it('renders CardView', () => {
    const tree = renderer.create(
      <CardView>
        <Text>Card content</Text>
      </CardView>
    );
    expect(tree.toJSON()).toBeTruthy();
  });

  it('renders Badge', () => {
    const tree = renderer.create(<Badge text="New" variant="primary" />);
    expect(tree.toJSON()).toBeTruthy();
  });

  it('renders BackButton', () => {
    const tree = renderer.create(<BackButton onPress={() => {}} />);
    expect(tree.toJSON()).toBeTruthy();
  });
});
