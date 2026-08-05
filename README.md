# syzygy-ui-rn

[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![npm](https://img.shields.io/npm/v/syzygy-ui-rn?label=npm&color=2F6FED)](https://www.npmjs.com/package/syzygy-ui-rn)
[![Version](https://img.shields.io/badge/version-2.4.0-2F6FED)](CHANGELOG.md)
[![Platform](https://img.shields.io/badge/Platform-iOS%20%7C%20Android%20%7C%20Web-lightgrey)](https://reactnative.dev)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![CI](https://github.com/Syzygy-Hub/syzygy-ui-rn/actions/workflows/node.yml/badge.svg)](https://github.com/Syzygy-Hub/syzygy-ui-rn/actions/workflows/node.yml)

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/Syzygy-Hub/syzygy-brand-assets/main/Assets/syzygy-banner-dark-2400.png">
  <img src="https://raw.githubusercontent.com/Syzygy-Hub/syzygy-brand-assets/main/Assets/syzygy-banner-light-2400.png" alt="Syzygy" width="500">
</picture>

Production-ready React Native component library with design tokens, Dark Mode, and zero third-party dependencies.

## Requirements
- React Native 0.70+
- React 18+
- TypeScript 5+

## Installation
```sh
npm install syzygy-ui-rn
```

## Components

79 components across 9 categories, plus a set of `Animated`-driven transition helpers.

- **Buttons:** PrimaryButton, SecondaryButton, DestructiveButton, GhostButton, IconButton, LoadingButton (built-in spinner, disables itself while loading), FloatingActionButton (circular, elevated), ButtonGroup (segmented row; single- or multi-select via `multiSelect`)
- **Inputs:** TextInput, SecureInput, SearchInput (debounced, with clear button), ToggleSwitch, CheckboxInput, RadioButtonInput, SliderInput, Dropdown, SegmentedControl, QuantityStepper, TextArea, OTPInput (auto-advancing focus), TagInput (chips via `Chip`), DatePickerField, TimePickerField (field/trigger only — RN core has no built-in date/time picker; consumer is responsible for rendering the picker UI), FormField (label/error/helper wrapper), PasswordStrengthIndicator (live length + character-class heuristic), SearchableDropdown (Dropdown's trigger + sheet rendering, with an inline case-insensitive filter field), PhoneInput (tappable flag + dial-code prefix; exposes both formatted and raw-digits values; small real starter country list, overridable via `countries`), CurrencyInput (`Intl.NumberFormat` currency display, raw numeric value parsed back out)
- **Display:** Avatar, DividerLine, Chip, ListRow, SectionHeader, LazyImageView, StarRatingView, CountBadge, AvatarGroup (overlapping stack with "+N" overflow), StatsCard (aka MetricCard; label + value + trend), RatingInput (tappable counterpart to the read-only StarRatingView), PageControl (aka DotIndicator; read-only page-position dots, syncs with PagerView), Accordion (vertically stacked expandable sections; single-open by default, `allowMultipleOpen` for independent toggling), Timeline (aka ActivityFeed; connected dots/icons with title, subtitle, timestamp; `leading`/`trailing` alignment), ColorSwatch (circle/square color preview with optional label; `isSelected` border uses the `focus` token)
- **Feedback:** LoadingView, EmptyStateView, ToastView, ShimmerView, ProgressBar, PullToRefresh, ErrorStateView, SkeletonView (shape-aware shimmer placeholder), CircularProgress (determinate + indeterminate), InlineAlert (aka Banner; 4 variants using the `*Muted` tokens), Snackbar (auto-dismissing, optional action), NetworkStatusBanner (controlled/presentational — accepts `isOffline` rather than self-detecting; see cross-platform note below), ConfirmDialog (preset confirm/cancel modal built on ModalDialog; `isDestructive` tints the confirm button)
- **Overlay:** ModalDialog, BottomSheet, CollapsibleView, ActionSheet (bottom-anchored action list), Popover (anchored floating content), Tooltip (long-press label)
- **Navigation:** BackButton, TabBar, BottomNavigationBar, AppBar, SideMenu (aka Drawer), FloatingTabBar (floating pill, icon **+** label — distinct from BottomNavigationBar's floating icon-only pill), StepIndicator (aka WizardSteps), Breadcrumbs, PagerView (swipeable paged content; `onPageChange` reports the current page index for local state or navigator wiring) — presentational only; this library has no navigation dependency, so wire `onPress`/`onSelectionChange` into your own navigator
- **Cards:** CardView
- **Badges:** Badge
- **Layout:** KeyboardAvoidingScrollView, AdaptiveStack (row above `breakpoint` width, column below), FlowLayout (wrapping row with consistent inter-item spacing), StickyHeader (via core `ScrollView`'s `stickyHeaderIndices`), SafeAreaWrapper (core-only best-effort safe-area inset wrapper — real `SafeAreaView` on iOS, `StatusBar.currentHeight` top-inset fallback on Android; no bottom-gesture-bar insets or precise cutout handling on Android — use `react-native-safe-area-context` if you need that), LabeledDivider (DividerLine segments flanking a centered/leading/trailing label)
- **Transitions:** `slideTransition`, `crossFadeTransition`, `slideVerticalTransition`, `modalPresentationTransition`, `scaleTransition`, `fadeThroughTransition` — `Animated`-driven style helpers

**NetworkStatusBanner — cross-platform note**: On iOS and Android, `NetworkStatusBanner` self-detects connectivity via first-party OS APIs and requires no `isOffline` prop. On React Native and Flutter, real network detection requires a third-party package that this library deliberately does not bundle, so the banner is controlled/presentational — pass `isOffline` from your own network state (e.g. `@react-native-community/netinfo`).

See [CHANGELOG.md](CHANGELOG.md) for version history.

## Design Tokens

All tokens live under `src/tokens/` and are consumed as plain objects — e.g. `spacing.md`, `getColors(scheme).primary`, `elevation.md`.

### Colors (`getColors(scheme)`)

Falls back to light for `'unspecified'`/`null`/`undefined`. Every color also has a matching `*Text` counterpart (e.g. `primaryText`) for text placed on top of it.

| Token | Light | Dark |
|---|---|---|
| `background` | `#FFFFFF` | `#101012` |
| `surface` | `#F5F5F7` | `#1C1C1F` |
| `surfaceAlt` | `#ECECEE` | `#27272B` |
| `surfaceSecondary` | `#EFEFF2` | `#232327` |
| `surfaceTertiary` | `#E4E4E8` | `#2C2C31` |
| `border` | `#D8D8DC` | `#3A3A3F` |
| `separator` | `#D8D8DC` | `#3A3A3F` |
| `textPrimary` | `#1A1A1E` | `#F5F5F7` |
| `textSecondary` | `#6B6B72` | `#A5A5AC` |
| `textTertiary` | `#9A9AA1` | `#6B6B72` |
| `primary` | `#2F6FED` | `#5C8DF6` |
| `primaryMuted` | `#E3ECFC` | `#1E2C47` |
| `secondary` | `#ECECEE` | `#27272B` |
| `destructive` / `error` | `#E5484D` | `#F2555A` |
| `destructiveMuted` | `#FBE4E5` | `#3B2023` |
| `success` | `#1F9254` | `#3DD68C` |
| `successMuted` | `#E1F2E8` | `#1B3327` |
| `warning` | `#B7791F` | `#E3A008` |
| `warningMuted` | `#F8ECD9` | `#3A2E14` |
| `disabled` | `#D8D8DC` | `#3A3A3F` |
| `overlay` | `rgba(0,0,0,0.4)` | `rgba(0,0,0,0.6)` |
| `link` | `#2F6FED` | `#5C8DF6` |
| `focus` | `#2F6FED` | `#5C8DF6` |

### Typography (`fontSizes`, `fontWeights`, `lineHeights`)

| `fontSizes` | Value | | `lineHeights` | Value |
|---|---|---|---|---|
| `xs` | 12 | | `xs` | 16 |
| `sm` | 14 | | `sm` | 20 |
| `md` | 16 | | `md` | 22 |
| `lg` | 18 | | `lg` | 24 |
| `xl` | 22 | | `xl` | 28 |
| `xxl` | 28 | | `xxl` | 34 |
| `largeTitle` | 34 | | | |

`fontWeights`: `regular` (400) · `medium` (500) · `semibold` (600) · `bold` (700)

### Spacing (`spacing`)

| Token | Value |
|---|---|
| `xxs` | 2 |
| `xs` | 4 |
| `sm` | 8 |
| `md` | 16 |
| `lg` | 24 |
| `xl` | 32 |
| `xxl` | 48 |
| `xxxl` | 64 |

### Corner Radius (`radius`)

| Token | Value |
|---|---|
| `xs` | 2 |
| `sm` | 4 |
| `md` | 8 |
| `lg` | 16 |
| `xl` | 16 |
| `full` | 9999 (pill/capsule shapes) |

### Elevation (`elevation`)

Each level is one style object carrying both Android's `elevation` and iOS's `shadow*` props — spread directly onto a `View`'s style.

| Token | `elevation` | `shadowOpacity` | `shadowRadius` |
|---|---|---|---|
| `none` | 0 | 0 | 0 |
| `sm` | 2 | 0.10 | 2 |
| `md` | 4 | 0.15 | 4 |
| `lg` | 8 | 0.20 | 8 |

### Opacity (`opacity`)

| Token | Value |
|---|---|
| `disabled` | 0.38 |
| `secondary` | 0.60 |
| `overlay` | 0.54 |

### Border Width (`borderWidth`)

| Token | Value |
|---|---|
| `thin` | 0.5 |
| `regular` | 1 |
| `thick` | 2 |

### Icon Size (`iconSize`)

| Token | Value |
|---|---|
| `sm` | 16 |
| `md` | 20 |
| `lg` | 24 |
| `xl` | 32 |

### Animation (`duration`, `easing`)

| `duration` | ms | | `easing` | Maps to |
|---|---|---|---|---|
| `fast` | 150 | | `standard` | `Easing.inOut(Easing.ease)` |
| `normal` | 300 | | `decelerate` | `Easing.out(Easing.ease)` |
| `slow` | 500 | | `accelerate` | `Easing.in(Easing.ease)` |
| | | | `spring` | `{ damping: 15, stiffness: 150 }` (a spring config, not an `Easing` curve — for `Animated.spring()`) |

## Usage

```tsx
import { PrimaryButton, TextInput, Badge } from 'syzygy-ui-rn';

<PrimaryButton title="Get Started" onPress={() => {}} />
<TextInput label="Email" value={email} onChangeText={setEmail} />
<Badge text="New" variant="primary" />
```

See the [Components](#components) list above for everything else available.

## Contributing & Releases

### Making a release
Releases are fully automated. To publish a new version:

1. Make your changes and ensure all tests pass:
```sh
   npm test
   npm run typecheck
   npm run lint
```

2. Commit with the release prefix:
```sh
   git commit -m "release: v1.2.0 — description of changes"
   git push origin main
```

3. The CI pipeline will automatically:
   - Run all tests
   - Sync package.json version to match the commit message
   - Publish to npm via OIDC trusted publishing (no tokens needed)
   - Create a GitHub release with the version tag

### Version format
Follow semver: `v{major}.{minor}.{patch}`
- Patch: `v1.0.1` — bug fixes
- Minor: `v1.1.0` — new components or features
- Major: `v2.0.0` — breaking changes

### Scripts

| Script | Description |
|--------|-------------|
| `npm run build` | Compile TypeScript to dist/ |
| `npm test` | Run Jest test suite |
| `npm run lint` | Run ESLint |
| `npm run lint:fix` | Run ESLint with auto-fix |
| `npm run typecheck` | Type check without emitting files |
| `npm run clean` | Remove dist/ and node_modules/ |
| `npm run reinstall` | Clean and reinstall all dependencies |

## Theming

syzygy-ui-rn v2.4.0 ships a first-class theming system built on React Context.

### Setup

Wrap your app with `SyzygyThemeProvider`:

```tsx
import { SyzygyThemeProvider, darkTheme } from 'syzygy-ui-rn';

export default function App() {
  return (
    <SyzygyThemeProvider theme={darkTheme}>
      {/* your screens */}
    </SyzygyThemeProvider>
  );
}
```

### Built-in themes

| Name | Description |
|------|-------------|
| `defaultTheme` | Light theme — default when no provider is present |
| `darkTheme` | Dark surfaces with adjusted color palette |
| `highContrastTheme` | Maximum contrast for accessibility; sharp radii |

### Runtime theme switching

```tsx
import { useSyzygyTheme, darkTheme, defaultTheme } from 'syzygy-ui-rn';

function ThemeToggle() {
  const { theme, setTheme } = useSyzygyTheme();
  return (
    <Button
      title="Toggle"
      onPress={() => setTheme(theme === defaultTheme ? darkTheme : defaultTheme)}
    />
  );
}
```

### Component-level overrides

Use `SyzygyThemeOverride` to apply a different theme to a subtree without affecting the global theme:

```tsx
import { SyzygyThemeOverride, highContrastTheme } from 'syzygy-ui-rn';

<SyzygyThemeOverride theme={highContrastTheme}>
  <MyAccessibleSection />
</SyzygyThemeOverride>
```

### `theme` prop

Every component accepts an optional `theme?: SyzygyTheme` prop. When provided it overrides the context theme for that component only:

```tsx
import { PrimaryButton, darkTheme } from 'syzygy-ui-rn';

<PrimaryButton title="Dark Button" onPress={...} theme={darkTheme} />
```

### `useSyzygyTheme()` hook

```tsx
import { useSyzygyTheme } from 'syzygy-ui-rn';

function MyComponent() {
  const { theme, setTheme } = useSyzygyTheme();
  return <View style={{ backgroundColor: theme.colors.surface }} />;
}
```

The hook returns `{ theme: SyzygyTheme; setTheme: (t: SyzygyTheme) => void }`.

### Custom themes

Build your own theme by composing the primitive objects:

```tsx
import { defaultTheme, SyzygyTheme } from 'syzygy-ui-rn';

const brandTheme: SyzygyTheme = {
  ...defaultTheme,
  colors: {
    ...defaultTheme.colors,
    primary: '#FF6600',
    onPrimary: '#FFFFFF',
  },
};
```

## License
MIT
