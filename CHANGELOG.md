# Changelog

All notable changes to this project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.4.0] - 2026-08-05

### Added
- `src/theme/` module: `SyzygyColors`, `SyzygyRadius`, `SyzygyTypography`, `SyzygySpacing`, `SyzygyElevation`, `SyzygyAnimation`, `SyzygyTheme` interfaces and default implementations
- Three built-in themes: `defaultTheme`, `darkTheme`, `highContrastTheme`
- `SyzygyThemeProvider` React context provider with runtime theme switching via `setTheme`
- `useSyzygyTheme()` custom hook returning `{ theme, setTheme }`
- `SyzygyThemeOverride` component for subtree-level theme overrides
- `theme?: SyzygyTheme` prop on every component for per-instance theme injection
- `accessibilityLiveRegion="polite"` on `ToastView`
- `accessibilityRole="button"` and per-segment `accessibilityLabel` on `ButtonGroup`
- Controlled `currentPage` prop on `PagerView`
- Theme barrel export via `src/index.ts`

### Changed
- All 76+ components migrated from `useColorScheme()` + `getColors()` to `useSyzygyTheme()`
- Color, spacing, radius, typography, and elevation references now sourced from `SyzygyTheme` instead of raw token imports
- Theme-dependent styles moved from `StyleSheet.create()` to inline style objects

### Fixed
- Hardcoded literals flagged: `fontSize: 20` (star/rating glyph), `fontSize: 40` (error glyph), `backgroundColor: 'rgba(0,0,0,0.4)'` (modal backdrop) — intentionally retained as non-token values

## [2.3.0] - 2026-08-05

### Changed (Breaking)
- **Color token vocabulary alignment** — `ColorPalette` interface and `lightColors`/`darkColors` objects updated to canonical token set; renamed/removed tokens:
  - `primaryText` → `onPrimary`
  - `destructiveText` → `onDestructive`
  - `secondaryText` → `textPrimary` (same hex values)
  - `surfaceAlt` → `surfaceSecondary`
  - `successText` → `onSuccess`
  - `warningText` → `onWarning`
  - `errorText` → `onError`
  - `disabledText` → `textDisabled`
  - All 26 component files updated
- **New tokens added**: `onPrimary`, `onDestructive`, `onSuccess`, `onWarning`, `onError`, `onSurface`, `textDisabled`, `textInverse`, `primarySubtle`, `errorMuted`, `scrim`
- **Removed tokens**: `surfaceAlt`, `primaryText`, `secondaryText`, `destructiveText`, `successText`, `warningText`, `errorText`, `disabledText`

### Fixed
- CI `release.yml`: added `VERSION="${VERSION#v}"` defensive strip; added `sleep 30` step before npm verify to allow registry propagation

## [2.2.1] - 2026-08-04

### Fixed
- `ModalDialog`, `BottomSheet`, `SideMenu`: added `accessibilityViewIsModal={true}` on `Modal` so VoiceOver restricts focus to modal content on iOS
- `Snackbar`: added `accessibilityLiveRegion="polite"` so Android TalkBack announces the message on appearance
- `PagerView`: added `accessibilityRole="adjustable"` and `accessibilityLabel` on the scroll container
- Inline styles: extracted static `fontSize`/`fontWeight`/`marginLeft` values to `StyleSheet.create` across 13 component files (`SectionHeader`, `AppBar`, `Avatar`, `AvatarGroup`, `CollapsibleView`, `QuantityStepper`, `ListRow`, `Chip`, `CheckboxInput`, `RadioButtonInput`, `SecureInput`, `SliderInput`, `StepIndicator`, `TabBar`, `CountBadge`, `Tooltip`)

### Added
- `PagerView`: `currentPage?: number` prop for controlled mode — host drives the active page programmatically; an `isScrollingProgrammatically` guard prevents the resulting `onMomentumScrollEnd` from re-firing `onPageChange` and looping
- `Timeline`: renamed exported type `TimelineEvent` → `TimelineItem` — cross-platform naming alignment (breaking rename)

### Changed
- README: `PagerView` moved from Display to Navigation category (matches source folder placement); `NetworkStatusBanner` cross-platform note added

## [2.2.0] - 2026-08-04

### Added

- **Display**: `PageControl` (aka `DotIndicator`; read-only row of dots tracking `PagerView`'s current page), `Accordion` (vertically stacked expandable sections built on `CollapsibleView`'s expand/collapse logic; single-open by default, `allowMultipleOpen` to allow independent toggling), `Timeline` (aka `ActivityFeed`; connected dots/icons with title/subtitle/timestamp, `leading`/`trailing` alignment), `ColorSwatch` (circle/square color preview with optional label; `isSelected` border uses the `focus` token).
- **Inputs**: `SearchableDropdown` (composed on top of `Dropdown`'s trigger + sheet rendering, adding an inline case-insensitive filter field), `PhoneInput` (tappable flag + dial-code prefix selector, numeric keyboard; exposes both a formatted display string and the raw digits-only number; small real starter country list of 15 countries, overridable via `countries`), `CurrencyInput` (`Intl.NumberFormat`-based currency display with configurable `locale`/`currency`; raw numeric value parsed back out of the typed input).
- **Feedback**: `NetworkStatusBanner` (top/bottom-anchored "no internet connection" banner; controlled/presentational via an `isOffline` prop rather than self-detecting, since real connectivity detection has no first-party RN API and this library takes on no third-party dependencies — consumers wire it to their own detection or `@react-native-community/netinfo`), `ConfirmDialog` (preset confirm/cancel modal built on `ModalDialog`; configurable button labels, `isDestructive` tints the confirm button with the destructive/error token).
- **Layout**: `SafeAreaWrapper` (core-only best-effort safe-area inset wrapper — real `SafeAreaView` on iOS, `StatusBar.currentHeight` top-inset fallback on Android; does not handle bottom gesture-bar insets or precise notch cutouts on Android — use `react-native-safe-area-context` in the host app for full cross-platform coverage), `LabeledDivider` (`DividerLine` segments flanking a centered/leading/trailing label).

### Fixed

- Resolved all 74 ESLint warnings surfaced by the `syzygy-lint-config@v1.0.0` config-parity fix: `import/order` (60, mostly auto-fixed via `eslint --fix`), `react-native/no-inline-styles` (10, moved into each file's `StyleSheet.create` block, keeping only genuinely dynamic values inline as array styles), `@typescript-eslint/no-unused-vars` (4 — removed unused `StyleSheet`/`spacing` imports in `SkeletonView`/`OTPInput`, suppressed with a documented `eslint-disable-next-line` for `DatePickerField`/`TimePickerField`'s intentional-but-unused public API props).
- The `lint` script now runs with `--max-warnings=0`, so newly introduced lint warnings fail CI instead of accumulating silently.

## [2.1.0] - 2026-08-03

### Added

- **Buttons**: `LoadingButton` (built-in `ActivityIndicator`, disables itself while loading), `FloatingActionButton` (circular, elevated primary action button), `ButtonGroup` (segmented row; single- or multi-select via `multiSelect`).
- **Inputs**: `TextArea` (multi-line, configurable min/max lines), `OTPInput` (fixed-length, auto-advancing focus), `TagInput` (renders entered tags as dismissible `Chip`s), `DatePickerField` / `TimePickerField` (field + open-state UI only — RN core has no built-in date/time picker and this library takes on no third-party dependencies, so wiring an actual native picker is left to the host app), `FormField` (generic label/error/helper wrapper), `PasswordStrengthIndicator` (live length + character-class heuristic, not hardcoded).
- **Display**: `AvatarGroup` (overlapping `Avatar` stack with "+N" overflow), `StatsCard` (aka `MetricCard`; label/value/trend), `RatingInput` (always-tappable counterpart to the read-only `StarRatingView`).
- **Feedback**: `SkeletonView` (shape-aware shimmer placeholder, mirrors `ShimmerView`'s animation), `CircularProgress` (determinate + indeterminate; approximated via a rotated bordered ring since RN core has no arc-drawing primitive), `InlineAlert` (aka `Banner`; 4 variants using the new `*Muted` color tokens), `Snackbar` (auto-dismissing, optional action button, mirrors `ToastView`'s presentational pattern).
- **Overlay**: `ActionSheet` (bottom-anchored action list, same `visible`/`onClose` convention as `BottomSheet`/`ModalDialog`), `Popover` (anchored floating content via measure + absolute positioning — no native anchor-positioning primitive in RN core), `Tooltip` (long-press label, same positioning approach as `Popover`).
- **Navigation**: `SideMenu` (aka `Drawer`; slide-in panel with a dimming scrim), `FloatingTabBar` (floating pill, icon **+** label — distinct from `BottomNavigationBar`'s floating icon-only pill, filling the last cell in the {edge-to-edge vs floating} x {icon-only vs icon+label} matrix), `StepIndicator` (aka `WizardSteps`), `Breadcrumbs`.
- **Layout**: `AdaptiveStack` (row above `breakpoint` width, column below), `FlowLayout` (wrapping row with consistent spacing — uses margins rather than the flexbox `gap` property, since `gap` isn't reliably supported across this library's `react-native >=0.70.0` peer range), `StickyHeader` (built on core `ScrollView`'s `stickyHeaderIndices`).
- **Transitions**: `scaleTransition` (scale in/out + fade), `fadeThroughTransition` (sequential fade-out-then-fade-in, not a simultaneous cross-fade).
- **Design Tokens**:
  - **Colors**: `primaryMuted`, `destructiveMuted`, `successMuted`, `warningMuted`, `surfaceSecondary`, `surfaceTertiary`, `textTertiary`, `link`, `focus`, `separator` added to both light and dark palettes (`overlay` already existed and is unchanged).
  - **Typography**: `fontSizes.largeTitle` (34).
  - **Spacing**: `xxs` (2), `xxxl` (64).
  - **Radius**: `xs` (2), `xl` (16).
  - **New token files**: `elevation.ts` (`none`/`sm`/`md`/`lg`, cross-platform Android `elevation` + iOS `shadow*` objects), `opacity.ts` (`disabled`/`secondary`/`overlay`), `borderWidth.ts` (`thin`/`regular`/`thick`), `iconSize.ts` (`sm`/`md`/`lg`/`xl`), `animation.ts` (`duration` and `easing`, the latter including a `spring` config object distinct in shape from the `Easing`-curve entries).

This repo required no carry-over patch fixes for this release (PagerView's Display-category listing was already correct from a previous release).

### Changed

- Design Tokens section of the README condensed from per-token prose into compact reference tables, for both existing and newly added token categories.

## [2.0.0] - 2026-08-01

### Changed — BREAKING

- **Repository renamed and transferred**: `rn-ui-library` has moved from `github.com/aks5686/rn-ui-library` to `github.com/Syzygy-Hub/syzygy-ui-rn`.
  - **npm package renamed and un-scoped**: `@aks5686/rn-ui-library` → `syzygy-ui-rn` (plain, unscoped — this is now an org-owned package under the Syzygy brand, not a personal-scope package).
  - **Consumers must update their npm dependency** to `npm install syzygy-ui-rn` and their imports to `from 'syzygy-ui-rn'`. No API-level renames were made to existing components.

### Added

- **Inputs**: `SearchInput` (debounced, clear button), `ToggleSwitch`, `CheckboxInput`, `RadioButtonInput`, `SliderInput` (`PanResponder`-based — React Native's core `Slider` was removed in favor of a community package, so this has no third-party dependency), `Dropdown`, `SegmentedControl`, `QuantityStepper`.
- **Display** (new category): `Avatar`, `DividerLine`, `Chip`, `ListRow`, `SectionHeader`, `LazyImageView` (uses React Native's core `Image`, which handles async loading/caching natively), `StarRatingView`, `CountBadge`.
- **Feedback**: `ShimmerView`, `ProgressBar`, `PullToRefresh` (wraps core `RefreshControl`), `ErrorStateView` (retry pattern, mirrors `EmptyStateView`).
- **Overlay** (new category): `ModalDialog` (named to avoid ambiguity with the `Modal` import from `react-native`), `BottomSheet`, `CollapsibleView` (via `LayoutAnimation`).
- **Navigation**: `TabBar`, `BottomNavigationBar` (floating icon-only pill — a visual alternative to `TabBar`), `AppBar`, `PagerView` (paging `ScrollView`). All presentational only — this library has no navigation dependency (no React Navigation), matching the existing `BackButton`'s pattern.
- **Transitions** (new): `slideTransition`, `crossFadeTransition`, `slideVerticalTransition`, `modalPresentationTransition` — `Animated`-driven style helpers for use with `Animated.Value`.

### Fixed

- CI's `lint` job now fetches the shared ESLint/Prettier config from `syzygy-lint-config` (pinned to `v1.0.0`) instead of using only the local `.eslintrc.js`.
- Added `eslint-plugin-react`, `eslint-plugin-react-hooks`, `eslint-plugin-react-native`, `eslint-plugin-import`, `eslint-config-prettier`, and `prettier` as devDependencies — required by the shared config's rules, previously missing.

## [1.0.2] - v1.0.2

- Fix `getColors` to handle unspecified color scheme.

## [1.0.1] - v1.0.1

- OIDC npm publishing, scoped package, lint and typecheck in CI.

## [1.0.0] - v1.0.0

- Initial release with TextInput character counter.
