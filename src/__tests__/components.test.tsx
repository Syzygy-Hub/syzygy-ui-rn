import React from 'react';
import { Text } from 'react-native';
import renderer from 'react-test-renderer';

import { Badge } from '../components/badges/Badge';
import { ButtonGroup } from '../components/buttons/ButtonGroup';
import { DestructiveButton } from '../components/buttons/DestructiveButton';
import { FloatingActionButton } from '../components/buttons/FloatingActionButton';
import { GhostButton } from '../components/buttons/GhostButton';
import { IconButton } from '../components/buttons/IconButton';
import { LoadingButton } from '../components/buttons/LoadingButton';
import { PrimaryButton } from '../components/buttons/PrimaryButton';
import { SecondaryButton } from '../components/buttons/SecondaryButton';
import { CardView } from '../components/cards/CardView';
import { Accordion } from '../components/display/Accordion';
import { Avatar } from '../components/display/Avatar';
import { AvatarGroup } from '../components/display/AvatarGroup';
import { Chip } from '../components/display/Chip';
import { ColorSwatch } from '../components/display/ColorSwatch';
import { CountBadge } from '../components/display/CountBadge';
import { DividerLine } from '../components/display/DividerLine';
import { LazyImageView } from '../components/display/LazyImageView';
import { ListRow } from '../components/display/ListRow';
import { PageControl } from '../components/display/PageControl';
import { RatingInput } from '../components/display/RatingInput';
import { SectionHeader } from '../components/display/SectionHeader';
import { StarRatingView } from '../components/display/StarRatingView';
import { StatsCard } from '../components/display/StatsCard';
import { Timeline } from '../components/display/Timeline';
import { CircularProgress } from '../components/feedback/CircularProgress';
import { ConfirmDialog } from '../components/feedback/ConfirmDialog';
import { EmptyStateView } from '../components/feedback/EmptyStateView';
import { ErrorStateView } from '../components/feedback/ErrorStateView';
import { InlineAlert } from '../components/feedback/InlineAlert';
import { LoadingView } from '../components/feedback/LoadingView';
import { NetworkStatusBanner } from '../components/feedback/NetworkStatusBanner';
import { ProgressBar } from '../components/feedback/ProgressBar';
import { PullToRefresh } from '../components/feedback/PullToRefresh';
import { ShimmerView } from '../components/feedback/ShimmerView';
import { SkeletonView } from '../components/feedback/SkeletonView';
import { Snackbar } from '../components/feedback/Snackbar';
import { ToastView } from '../components/feedback/ToastView';
import { CheckboxInput } from '../components/inputs/CheckboxInput';
import { CurrencyInput } from '../components/inputs/CurrencyInput';
import { DatePickerField } from '../components/inputs/DatePickerField';
import { Dropdown } from '../components/inputs/Dropdown';
import { FormField } from '../components/inputs/FormField';
import { OTPInput } from '../components/inputs/OTPInput';
import { PasswordStrengthIndicator } from '../components/inputs/PasswordStrengthIndicator';
import { PhoneInput } from '../components/inputs/PhoneInput';
import { QuantityStepper } from '../components/inputs/QuantityStepper';
import { RadioButtonInput } from '../components/inputs/RadioButtonInput';
import { SearchableDropdown } from '../components/inputs/SearchableDropdown';
import { SearchInput } from '../components/inputs/SearchInput';
import { SecureInput } from '../components/inputs/SecureInput';
import { SegmentedControl } from '../components/inputs/SegmentedControl';
import { SliderInput } from '../components/inputs/SliderInput';
import { TagInput } from '../components/inputs/TagInput';
import { TextArea } from '../components/inputs/TextArea';
import { TextInput } from '../components/inputs/TextInput';
import { TimePickerField } from '../components/inputs/TimePickerField';
import { ToggleSwitch } from '../components/inputs/ToggleSwitch';
import { AdaptiveStack } from '../components/layout/AdaptiveStack';
import { FlowLayout } from '../components/layout/FlowLayout';
import { KeyboardAvoidingScrollView } from '../components/layout/KeyboardAvoidingScrollView';
import { LabeledDivider } from '../components/layout/LabeledDivider';
import { SafeAreaWrapper } from '../components/layout/SafeAreaWrapper';
import { StickyHeader } from '../components/layout/StickyHeader';
import { AppBar } from '../components/navigation/AppBar';
import { BackButton } from '../components/navigation/BackButton';
import { BottomNavigationBar } from '../components/navigation/BottomNavigationBar';
import { Breadcrumbs } from '../components/navigation/Breadcrumbs';
import { FloatingTabBar } from '../components/navigation/FloatingTabBar';
import { PagerView } from '../components/navigation/PagerView';
import { SideMenu } from '../components/navigation/SideMenu';
import { StepIndicator } from '../components/navigation/StepIndicator';
import { TabBar } from '../components/navigation/TabBar';
import { ActionSheet } from '../components/overlay/ActionSheet';
import { BottomSheet } from '../components/overlay/BottomSheet';
import { CollapsibleView } from '../components/overlay/CollapsibleView';
import { ModalDialog } from '../components/overlay/ModalDialog';
import { Popover } from '../components/overlay/Popover';
import { Tooltip } from '../components/overlay/Tooltip';

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

  it('renders PagerView in controlled mode', () => {
    const tree = renderer.create(
      <PagerView currentPage={0}>
        <Text>Page 1</Text>
        <Text>Page 2</Text>
      </PagerView>
    );
    expect(tree.toJSON()).toBeTruthy();
  });

  it('PagerView does not call onPageChange for programmatic scroll', () => {
    const onPageChange = jest.fn();
    // Render with currentPage in controlled mode. The programmatic-scroll guard
    // (isScrollingProgrammatically ref) must prevent onPageChange from firing
    // when the effect triggers scrollTo — no layout has been measured yet so
    // layoutWidth === 0 and scrollTo is skipped, but onPageChange must still
    // never fire without an actual user swipe.
    const instance = renderer.create(
      <PagerView currentPage={0} onPageChange={onPageChange}>
        <Text>Page 1</Text>
        <Text>Page 2</Text>
      </PagerView>
    );
    expect(instance.toJSON()).toBeTruthy();
    expect(onPageChange).not.toHaveBeenCalled();
  });

  it('renders KeyboardAvoidingScrollView', () => {
    const tree = renderer.create(
      <KeyboardAvoidingScrollView>
        <Text>Content</Text>
      </KeyboardAvoidingScrollView>
    );
    expect(tree.toJSON()).toBeTruthy();
  });

  it('renders LoadingButton', () => {
    const tree = renderer.create(
      <LoadingButton label="Save" isLoading={false} onPress={() => {}} />
    );
    expect(tree.toJSON()).toBeTruthy();
  });

  it('renders LoadingButton while loading', () => {
    const tree = renderer.create(
      <LoadingButton label="Save" isLoading={true} onPress={() => {}} />
    );
    expect(tree.toJSON()).toBeTruthy();
  });

  it('renders FloatingActionButton', () => {
    const tree = renderer.create(
      <FloatingActionButton icon={<Text>+</Text>} onPress={() => {}} />
    );
    expect(tree.toJSON()).toBeTruthy();
  });

  it('renders ButtonGroup', () => {
    const tree = renderer.create(
      <ButtonGroup options={['Day', 'Week']} selectedIndices={[0]} onSelectionChange={() => {}} />
    );
    expect(tree.toJSON()).toBeTruthy();
  });

  it('renders TextArea', () => {
    const tree = renderer.create(<TextArea label="Bio" value="" onChangeText={() => {}} />);
    expect(tree.toJSON()).toBeTruthy();
  });

  it('renders OTPInput', () => {
    const tree = renderer.create(<OTPInput code="12" onCodeChange={() => {}} />);
    expect(tree.toJSON()).toBeTruthy();
  });

  it('renders TagInput', () => {
    const tree = renderer.create(<TagInput tags={['react', 'native']} onTagsChange={() => {}} />);
    expect(tree.toJSON()).toBeTruthy();
  });

  it('renders DatePickerField', () => {
    const tree = renderer.create(
      <DatePickerField label="Birthday" date={null} onDateChange={() => {}} />
    );
    expect(tree.toJSON()).toBeTruthy();
  });

  it('renders TimePickerField', () => {
    const tree = renderer.create(
      <TimePickerField label="Reminder" time={null} onTimeChange={() => {}} />
    );
    expect(tree.toJSON()).toBeTruthy();
  });

  it('renders FormField', () => {
    const tree = renderer.create(
      <FormField label="Email" helperText="We'll never share it">
        <Text>input</Text>
      </FormField>
    );
    expect(tree.toJSON()).toBeTruthy();
  });

  it('renders FormField with error', () => {
    const tree = renderer.create(
      <FormField label="Email" error="Required">
        <Text>input</Text>
      </FormField>
    );
    expect(tree.toJSON()).toBeTruthy();
  });

  it('renders PasswordStrengthIndicator', () => {
    const tree = renderer.create(<PasswordStrengthIndicator password="Sup3r$ecret!" />);
    expect(tree.toJSON()).toBeTruthy();
  });

  it('renders AvatarGroup', () => {
    const tree = renderer.create(
      <AvatarGroup avatars={[{ initials: 'AK' }, { initials: 'JS' }, { initials: 'TS' }]} max={2} />
    );
    expect(tree.toJSON()).toBeTruthy();
  });

  it('renders StatsCard', () => {
    const tree = renderer.create(
      <StatsCard label="Revenue" value="$12,400" trend="up" trendValue="+12%" />
    );
    expect(tree.toJSON()).toBeTruthy();
  });

  it('renders RatingInput', () => {
    const tree = renderer.create(<RatingInput rating={3} onRatingChange={() => {}} />);
    expect(tree.toJSON()).toBeTruthy();
  });

  it('renders SkeletonView', () => {
    const tree = renderer.create(<SkeletonView shape="circle" height={40} />);
    expect(tree.toJSON()).toBeTruthy();
    tree.unmount();
  });

  it('renders CircularProgress (determinate)', () => {
    const tree = renderer.create(<CircularProgress progress={0.5} />);
    expect(tree.toJSON()).toBeTruthy();
  });

  it('renders CircularProgress (indeterminate)', () => {
    const tree = renderer.create(<CircularProgress />);
    expect(tree.toJSON()).toBeTruthy();
    tree.unmount();
  });

  it('renders InlineAlert', () => {
    const tree = renderer.create(<InlineAlert message="Saved successfully" variant="success" />);
    expect(tree.toJSON()).toBeTruthy();
  });

  it('renders Snackbar', () => {
    const tree = renderer.create(
      <Snackbar message="Undo?" actionLabel="Undo" isVisible={true} onDismiss={() => {}} onAction={() => {}} />
    );
    expect(tree.toJSON()).toBeTruthy();
    // Snackbar schedules an auto-dismiss setTimeout while visible; unmount to
    // clear it so it doesn't fire after the Jest environment tears down.
    tree.unmount();
  });

  it('renders ActionSheet', () => {
    const tree = renderer.create(
      <ActionSheet
        visible={true}
        onClose={() => {}}
        actions={[{ label: 'Delete', isDestructive: true, onPress: () => {} }]}
      />
    );
    expect(tree.toJSON()).toBeTruthy();
  });

  it('renders Popover', () => {
    const tree = renderer.create(
      <Popover trigger={<Text>Open</Text>}>
        <Text>Content</Text>
      </Popover>
    );
    expect(tree.toJSON()).toBeTruthy();
  });

  it('renders Tooltip', () => {
    const tree = renderer.create(
      <Tooltip label="More info">
        <Text>Hover me</Text>
      </Tooltip>
    );
    expect(tree.toJSON()).toBeTruthy();
  });

  it('renders SideMenu', () => {
    const tree = renderer.create(
      <SideMenu isOpen={true} onClose={() => {}}>
        <Text>Menu</Text>
      </SideMenu>
    );
    expect(tree.toJSON()).toBeTruthy();
    tree.unmount();
  });

  it('renders FloatingTabBar', () => {
    const tree = renderer.create(
      <FloatingTabBar
        items={[{ tag: 'home', icon: <Text>H</Text>, label: 'Home' }]}
        selection="home"
        onSelectionChange={() => {}}
      />
    );
    expect(tree.toJSON()).toBeTruthy();
  });

  it('renders StepIndicator', () => {
    const tree = renderer.create(<StepIndicator steps={['Info', 'Payment', 'Review']} currentStep={1} />);
    expect(tree.toJSON()).toBeTruthy();
  });

  it('renders Breadcrumbs', () => {
    const tree = renderer.create(
      <Breadcrumbs
        items={[
          { label: 'Home', onPress: () => {} },
          { label: 'Settings', onPress: () => {} },
        ]}
      />
    );
    expect(tree.toJSON()).toBeTruthy();
  });

  it('renders AdaptiveStack', () => {
    const tree = renderer.create(
      <AdaptiveStack breakpoint={600}>
        <Text>A</Text>
        <Text>B</Text>
      </AdaptiveStack>
    );
    expect(tree.toJSON()).toBeTruthy();
  });

  it('renders FlowLayout', () => {
    const tree = renderer.create(
      <FlowLayout>
        <Text>Tag 1</Text>
        <Text>Tag 2</Text>
      </FlowLayout>
    );
    expect(tree.toJSON()).toBeTruthy();
  });

  it('renders StickyHeader', () => {
    const tree = renderer.create(
      <StickyHeader header={<Text>Header</Text>}>
        <Text>Content</Text>
      </StickyHeader>
    );
    expect(tree.toJSON()).toBeTruthy();
  });

  it('renders PageControl', () => {
    const tree = renderer.create(<PageControl pageCount={3} currentPage={1} />);
    expect(tree.toJSON()).toBeTruthy();
  });

  it('renders Accordion', () => {
    const tree = renderer.create(
      <Accordion
        sections={[
          { key: 'a', title: 'Section A', content: <Text>Content A</Text> },
          { key: 'b', title: 'Section B', content: <Text>Content B</Text> },
        ]}
      />
    );
    expect(tree.toJSON()).toBeTruthy();
  });

  it('renders Timeline', () => {
    const tree = renderer.create(
      <Timeline
        events={[
          { key: '1', title: 'Order placed', subtitle: 'Your order was placed', timestamp: '9:00 AM' },
          { key: '2', title: 'Shipped', timestamp: '2:00 PM' },
        ]}
      />
    );
    expect(tree.toJSON()).toBeTruthy();
  });

  it('renders ColorSwatch', () => {
    const tree = renderer.create(<ColorSwatch color="#2F6FED" label="Blue" isSelected />);
    expect(tree.toJSON()).toBeTruthy();
  });

  it('renders SearchableDropdown', () => {
    const tree = renderer.create(
      <SearchableDropdown
        label="Country"
        selection="USA"
        options={['USA', 'Canada', 'Mexico']}
        onSelectionChange={() => {}}
        optionTitle={(option) => option}
      />
    );
    expect(tree.toJSON()).toBeTruthy();
  });

  it('renders PhoneInput', () => {
    const tree = renderer.create(<PhoneInput value="" onChangeText={() => {}} />);
    expect(tree.toJSON()).toBeTruthy();
  });

  it('renders CurrencyInput', () => {
    const tree = renderer.create(<CurrencyInput value={19.99} onValueChange={() => {}} />);
    expect(tree.toJSON()).toBeTruthy();
  });

  it('renders NetworkStatusBanner', () => {
    const tree = renderer.create(<NetworkStatusBanner isOffline />);
    expect(tree.toJSON()).toBeTruthy();
  });

  it('renders ConfirmDialog', () => {
    const tree = renderer.create(
      <ConfirmDialog
        visible
        title="Delete item?"
        message="This cannot be undone."
        onConfirm={() => {}}
        onCancel={() => {}}
        isDestructive
      />
    );
    expect(tree.toJSON()).toBeTruthy();
  });

  it('renders SafeAreaWrapper', () => {
    const tree = renderer.create(
      <SafeAreaWrapper>
        <Text>Content</Text>
      </SafeAreaWrapper>
    );
    expect(tree.toJSON()).toBeTruthy();
  });

  it('renders LabeledDivider', () => {
    const tree = renderer.create(<LabeledDivider label="OR" alignment="center" />);
    expect(tree.toJSON()).toBeTruthy();
  });
});
