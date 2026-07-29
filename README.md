# rn-ui-library

[![npm](https://img.shields.io/npm/v/@aks5686/rn-ui-library)](https://www.npmjs.com/package/@aks5686/rn-ui-library)
[![Release](https://img.shields.io/github/v/release/aks5686/rn-ui-library)](https://github.com/aks5686/rn-ui-library/releases)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Platform](https://img.shields.io/badge/Platform-iOS%20%7C%20Android%20%7C%20Web-lightgrey)](https://reactnative.dev)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![CI](https://github.com/aks5686/rn-ui-library/actions/workflows/node.yml/badge.svg)](https://github.com/aks5686/rn-ui-library/actions/workflows/node.yml)

Production-ready React Native component library with design tokens, Dark Mode, and zero third-party dependencies.

## Requirements
- React Native 0.70+
- React 18+
- TypeScript 5+

## Installation
```sh
npm install @aks5686/rn-ui-library
```

## Scripts

| Script | Description |
|--------|-------------|
| `npm run build` | Compile TypeScript to dist/ |
| `npm test` | Run Jest test suite |
| `npm run lint` | Run ESLint |
| `npm run lint:fix` | Run ESLint with auto-fix |
| `npm run typecheck` | Type check without emitting files |
| `npm run clean` | Remove dist/ and node_modules/ |
| `npm run reinstall` | Clean and reinstall all dependencies |

## Usage

```tsx
import { PrimaryButton, TextInput, Badge } from '@aks5686/rn-ui-library';

// Button
<PrimaryButton title="Get Started" onPress={() => {}} />

// Input
<TextInput label="Email" value={email} onChangeText={setEmail} />

// Badge
<Badge text="New" variant="primary" />
```

## Components
- **Buttons:** PrimaryButton, SecondaryButton, DestructiveButton, GhostButton, IconButton
- **Inputs:** TextInput, SecureInput
- **Feedback:** LoadingView, EmptyStateView, ToastView
- **Cards:** CardView
- **Badges:** Badge
- **Navigation:** BackButton

## Design Tokens
All components use semantic tokens from tokens/ — colors, typography, spacing, and radius.

## License
MIT
