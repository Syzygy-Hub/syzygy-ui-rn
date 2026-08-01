# syzygy-ui-rn

[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![npm](https://img.shields.io/npm/v/syzygy-ui-rn)](https://www.npmjs.com/package/syzygy-ui-rn)
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
- **Buttons:** PrimaryButton, SecondaryButton, DestructiveButton, GhostButton, IconButton
- **Inputs:** TextInput, SecureInput, SearchInput (debounced, with clear button), ToggleSwitch, CheckboxInput, RadioButtonInput, SliderInput, Dropdown, SegmentedControl, QuantityStepper
- **Display:** Avatar, DividerLine, Chip, ListRow, SectionHeader, LazyImageView, StarRatingView, CountBadge, PagerView (swipeable paged content, not navigation chrome; `onPageChange` reports the current page index for you to use as local state — e.g. a carousel — or feed into a navigator, as needed)
- **Feedback:** LoadingView, EmptyStateView, ToastView, ShimmerView, ProgressBar, PullToRefresh, ErrorStateView
- **Overlay:** ModalDialog, BottomSheet, CollapsibleView
- **Navigation:** BackButton, TabBar, BottomNavigationBar, AppBar — presentational only; this library has no navigation dependency, so wire `onPress`/`onSelectionChange` into your own navigator
- **Cards:** CardView
- **Badges:** Badge
- **Transitions:** `slideTransition`, `crossFadeTransition`, `slideVerticalTransition`, `modalPresentationTransition` — `Animated`-driven style helpers

See [CHANGELOG.md](CHANGELOG.md) for version history.

## Design Tokens

All tokens live under `src/tokens/` and are consumed as plain objects — e.g. `spacing.md`, `getColors(scheme).primary`.

### Colors (`getColors`)
`getColors(scheme)` returns a full `ColorPalette` for `'light'` or `'dark'` (falls back to light for `'unspecified'`/`null`/`undefined`):

| Token | Light | Dark |
|---|---|---|
| `background` | `#FFFFFF` | `#101012` |
| `surface` | `#F5F5F7` | `#1C1C1F` |
| `surfaceAlt` | `#ECECEE` | `#27272B` |
| `border` | `#D8D8DC` | `#3A3A3F` |
| `textPrimary` | `#1A1A1E` | `#F5F5F7` |
| `textSecondary` | `#6B6B72` | `#A5A5AC` |
| `primary` | `#2F6FED` | `#5C8DF6` |
| `secondary` | `#ECECEE` | `#27272B` |
| `destructive` / `error` | `#E5484D` | `#F2555A` |
| `success` | `#1F9254` | `#3DD68C` |
| `warning` | `#B7791F` | `#E3A008` |
| `disabled` | `#D8D8DC` | `#3A3A3F` |

Each color also has a matching `*Text` counterpart (e.g. `primaryText`) for text placed on top of it.

### Typography (`fontSizes`, `fontWeights`, `lineHeights`)

| `fontSizes` | Value | | `lineHeights` | Value |
|---|---|---|---|---|
| `xs` | 12 | | `xs` | 16 |
| `sm` | 14 | | `sm` | 20 |
| `md` | 16 | | `md` | 22 |
| `lg` | 18 | | `lg` | 24 |
| `xl` | 22 | | `xl` | 28 |
| `xxl` | 28 | | `xxl` | 34 |

`fontWeights`: `regular` (400) · `medium` (500) · `semibold` (600) · `bold` (700)

### Spacing (`spacing`)

| Token | Value |
|---|---|
| `xs` | 4 |
| `sm` | 8 |
| `md` | 16 |
| `lg` | 24 |
| `xl` | 32 |
| `xxl` | 48 |

### Corner Radius (`radius`)

| Token | Value |
|---|---|
| `sm` | 4 |
| `md` | 8 |
| `lg` | 16 |
| `full` | 9999 (pill/capsule shapes) |

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

## License
MIT
