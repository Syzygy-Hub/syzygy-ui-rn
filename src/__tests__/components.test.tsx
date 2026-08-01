import React from 'react';
import { Text } from 'react-native';
import renderer from 'react-test-renderer';

import { CardView } from '../components/cards/CardView';
import { Badge } from '../components/badges/Badge';
import { DestructiveButton } from '../components/buttons/DestructiveButton';
import { GhostButton } from '../components/buttons/GhostButton';
import { IconButton } from '../components/buttons/IconButton';
import { PrimaryButton } from '../components/buttons/PrimaryButton';
import { SecondaryButton } from '../components/buttons/SecondaryButton';
import { SliderInput } from '../components/inputs/SliderInput';
import { Dropdown } from '../components/inputs/Dropdown';
import { SegmentedControl } from '../components/inputs/SegmentedControl';
import { QuantityStepper } from '../components/inputs/QuantityStepper';
import { Avatar } from '../components/display/Avatar';
import { DividerLine } from '../components/display/DividerLine';
import { Chip } from '../components/display/Chip';
import { ListRow } from '../components/display/ListRow';
import { SectionHeader } from '../components/display/SectionHeader';
import { LazyImageView } from '../components/display/LazyImageView';
import { StarRatingView } from '../components/display/StarRatingView';
import { CountBadge } from '../components/display/CountBadge';
import { EmptyStateView } from '../components/feedback/EmptyStateView';
import { ShimmerView } from '../components/feedback/ShimmerView';
import { PullToRefresh } from '../components/feedback/PullToRefresh';
import { ErrorStateView } from '../components/feedback/ErrorStateView';
import { LoadingView } from '../components/feedback/LoadingView';
import { ProgressBar } from '../components/feedback/ProgressBar';
import { ToastView } from '../components/feedback/ToastView';
import { CheckboxInput } from '../components/inputs/CheckboxInput';
import { RadioButtonInput } from '../components/inputs/RadioButtonInput';
import { SearchInput } from '../components/inputs/SearchInput';
import { SecureInput } from '../components/inputs/SecureInput';
import { TextInput } from '../components/inputs/TextInput';
import { ToggleSwitch } from '../components/inputs/ToggleSwitch';
import { KeyboardAvoidingScrollView } from '../components/layout/KeyboardAvoidingScrollView';
import { AppBar } from '../components/navigation/AppBar';
import { BackButton } from '../components/navigation/BackButton';
import { BottomNavigationBar } from '../components/navigation/BottomNavigationBar';
import { PagerView } from '../components/navigation/PagerView';
import { TabBar } from '../components/navigation/TabBar';
import { BottomSheet } from '../components/overlay/BottomSheet';
import { CollapsibleView } from '../components/overlay/CollapsibleView';
import { ModalDialog } from '../components/overlay/ModalDialog';

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

  it('renders SearchInput', () => {
    const tree = renderer.create(<SearchInput value="" onChangeText={() => {}} />);
    expect(tree.toJSON()).toBeTruthy();
  });

  it('renders ToggleSwitch', () => {
    const tree = renderer.create(
      <ToggleSwitch label="Notifications" value={true} onValueChange={() => {}} />
    );
    expect(tree.toJSON()).toBeTruthy();
  });

  it('renders CheckboxInput', () => {
    const tree = renderer.create(
      <CheckboxInput label="Remember me" checked={false} onValueChange={() => {}} />
    );
    expect(tree.toJSON()).toBeTruthy();
  });

  it('renders RadioButtonInput', () => {
    const tree = renderer.create(
      <RadioButtonInput label="Option A" selected={true} onPress={() => {}} />
    );
    expect(tree.toJSON()).toBeTruthy();
  });

  it('renders SliderInput', () => {
    const tree = renderer.create(
      <SliderInput label="Volume" value={0.5} onValueChange={() => {}} />
    );
    expect(tree.toJSON()).toBeTruthy();
  });

  it('renders Dropdown', () => {
    const tree = renderer.create(
      <Dropdown
        label="Country"
        selection="USA"
        options={['USA', 'Canada']}
        onSelectionChange={() => {}}
        optionTitle={(o) => o}
      />
    );
    expect(tree.toJSON()).toBeTruthy();
  });

  it('renders SegmentedControl', () => {
    const tree = renderer.create(
      <SegmentedControl
        options={['Day', 'Week']}
        selection="Day"
        onSelectionChange={() => {}}
        optionTitle={(o) => o}
      />
    );
    expect(tree.toJSON()).toBeTruthy();
  });

  it('renders QuantityStepper', () => {
    const tree = renderer.create(<QuantityStepper value={1} onValueChange={() => {}} />);
    expect(tree.toJSON()).toBeTruthy();
  });

  it('renders Avatar', () => {
    const tree = renderer.create(<Avatar initials="AK" />);
    expect(tree.toJSON()).toBeTruthy();
  });

  it('renders DividerLine', () => {
    const tree = renderer.create(<DividerLine />);
    expect(tree.toJSON()).toBeTruthy();
  });

  it('renders Chip', () => {
    const tree = renderer.create(<Chip text="Swift" onRemove={() => {}} />);
    expect(tree.toJSON()).toBeTruthy();
  });

  it('renders ListRow', () => {
    const tree = renderer.create(<ListRow title="Settings" subtitle="Manage preferences" />);
    expect(tree.toJSON()).toBeTruthy();
  });

  it('renders SectionHeader', () => {
    const tree = renderer.create(<SectionHeader title="Recent Activity" />);
    expect(tree.toJSON()).toBeTruthy();
  });

  it('renders LazyImageView', () => {
    const tree = renderer.create(<LazyImageView uri={null} />);
    expect(tree.toJSON()).toBeTruthy();
  });

  it('renders StarRatingView', () => {
    const tree = renderer.create(<StarRatingView rating={3} />);
    expect(tree.toJSON()).toBeTruthy();
  });

  it('renders CountBadge', () => {
    const tree = renderer.create(<CountBadge count={3} />);
    expect(tree.toJSON()).toBeTruthy();
  });

  it('renders ShimmerView', () => {
    const tree = renderer.create(<ShimmerView />);
    expect(tree.toJSON()).toBeTruthy();
    // ShimmerView runs an infinite Animated.loop; unmount to stop it,
    // otherwise its timers keep firing after the Jest environment tears down.
    tree.unmount();
  });

  it('renders ProgressBar', () => {
    const tree = renderer.create(<ProgressBar progress={0.5} />);
    expect(tree.toJSON()).toBeTruthy();
  });

  it('renders PullToRefresh', () => {
    const tree = renderer.create(
      <PullToRefresh refreshing={false} onRefresh={() => {}}>
        <Text>Content</Text>
      </PullToRefresh>
    );
    expect(tree.toJSON()).toBeTruthy();
  });

  it('renders ErrorStateView', () => {
    const tree = renderer.create(
      <ErrorStateView title="Something went wrong" onRetryPress={() => {}} />
    );
    expect(tree.toJSON()).toBeTruthy();
  });

  it('renders ModalDialog', () => {
    const tree = renderer.create(
      <ModalDialog visible={true} onDismiss={() => {}}>
        <Text>Content</Text>
      </ModalDialog>
    );
    expect(tree.toJSON()).toBeTruthy();
  });

  it('renders BottomSheet', () => {
    const tree = renderer.create(
      <BottomSheet visible={true} onDismiss={() => {}}>
        <Text>Content</Text>
      </BottomSheet>
    );
    expect(tree.toJSON()).toBeTruthy();
    tree.unmount();
  });

  it('renders CollapsibleView', () => {
    const tree = renderer.create(
      <CollapsibleView title="Details">
        <Text>Content</Text>
      </CollapsibleView>
    );
    expect(tree.toJSON()).toBeTruthy();
  });

  it('renders TabBar', () => {
    const tree = renderer.create(
      <TabBar
        items={[{ tag: 'home', icon: <Text>H</Text>, label: 'Home' }]}
        selection="home"
        onSelectionChange={() => {}}
      />
    );
    expect(tree.toJSON()).toBeTruthy();
  });

  it('renders BottomNavigationBar', () => {
    const tree = renderer.create(
      <BottomNavigationBar
        items={[{ tag: 'home', icon: <Text>H</Text>, label: 'Home' }]}
        selection="home"
        onSelectionChange={() => {}}
      />
    );
    expect(tree.toJSON()).toBeTruthy();
  });

  it('renders AppBar', () => {
    const tree = renderer.create(<AppBar title="Settings" />);
    expect(tree.toJSON()).toBeTruthy();
  });

  it('renders PagerView', () => {
    const tree = renderer.create(
      <PagerView>
        <Text>Page 1</Text>
      </PagerView>
    );
    expect(tree.toJSON()).toBeTruthy();
  });

  it('renders KeyboardAvoidingScrollView', () => {
    const tree = renderer.create(
      <KeyboardAvoidingScrollView>
        <Text>Content</Text>
      </KeyboardAvoidingScrollView>
    );
    expect(tree.toJSON()).toBeTruthy();
  });
});
