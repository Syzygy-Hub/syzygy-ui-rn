# Changelog

All notable changes to this project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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
