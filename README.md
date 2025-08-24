# 📱 DMK - த.ந.பாளையம் ஒன்றிய திமுக

> **React Native Application**

[![React Native](https://img.shields.io/badge/React%20Native-0.81.0-blue.svg)](https://reactnative.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9.2-blue.svg)](https://www.typescriptlang.org/)
[![Code Quality](https://img.shields.io/badge/ESLint-Configured-green.svg)](https://eslint.org/)
[![Build Status](https://img.shields.io/badge/Build-Production%20Ready-green.svg)](#)

A modern, scalable React Native application for த.ந.பாளையம் ஒன்றிய திமுக (T.N.Palayam Union DMK) built with TypeScript, featuring comprehensive state management, internationalization, and production-ready architecture.

## 🚀 **Quick Start**

### **Prerequisites**

- Node.js >= 20.19.4
- React Native development environment set up
- iOS: Xcode 16.2+ and CocoaPods
- Android: Android Studio with SDK 28+

### **Installation**

```bash
# Clone the repository
git clone <repository-url>
cd dmk

# Install dependencies
pnpm install

# iOS setup
npm run ios:pods

# Start the application
npm start

# Run on iOS
npm run ios

# Run on Android
npm run android
```

## 🏗️ **Architecture**

### **Tech Stack**

- **Framework:** React Native 0.81.0 with New Architecture
- **Language:** TypeScript 5.9.2
- **State Management:** Zustand + TanStack Query
- **Navigation:** React Navigation 7.x
- **Styling:** React Native Paper + Custom Responsive System
- **Internationalization:** i18next + react-i18next
- **Storage:** React Native MMKV + Encrypted Storage
- **Networking:** Axios with React Query
- **Image Handling:** React Native Fast Image
- **Charts:** Victory Native + Custom Skia Components

### **Project Structure**

```
src/
├── assets/          # Static assets (images, fonts)
├── components/      # Reusable UI components
│   ├── atoms/       # Basic building blocks
│   ├── molecules/   # Composed components
│   ├── organisms/   # Complex component groups
│   └── templates/   # Page layouts
├── constants/       # App constants and configuration
├── features/        # Feature-specific components
├── hooks/          # Custom React hooks
├── i18n/           # Internationalization setup
├── navigation/     # Navigation configuration
├── providers/      # Context providers
├── screens/        # Screen components
├── services/       # API and external services
├── store/          # State management (Zustand)
├── theme/          # Design system and theming
├── types/          # TypeScript type definitions
└── utils/          # Utility functions
```

## 🛠️ **Development**

### **Available Scripts**

```bash
# Development
npm start              # Start Metro bundler
npm run ios           # Run iOS simulator
npm run android       # Run Android emulator

# Code Quality
npm run lint          # Run ESLint
npm run lint -- --fix # Auto-fix ESLint issues
npm run format        # Format code with Prettier

# Testing
npm run test          # Run Jest tests
npm run production:check  # Full production readiness check

# Platform Specific
npm run ios:pods      # Install iOS CocoaPods
npm run ios:clean     # Clean iOS build
npm run android:clean # Clean Android build
npm run clean         # Clean both platforms
```

### **Code Quality Standards**

This project maintains high code quality standards with:

- ✅ **ESLint** configuration for React Native + TypeScript
- ✅ **Prettier** for consistent code formatting
- ✅ **TypeScript** strict mode enabled
- ✅ **Performance monitoring** and optimization

## 🎨 **Features**

### **Core Functionality**

- 🏠 **Dashboard** with interactive charts and statistics
- 👥 **Member Management** with detailed profiles
- 📝 **Complaint System** with attachments and status tracking
- 📊 **Data Visualization** with custom charts and gauges
- 🔍 **Search & Filter** across all data types
- 📱 **Responsive Design** for all screen sizes

### **Technical Features**

- 🌐 **Offline Support** with data synchronization
- 🔒 **Secure Storage** for sensitive data
- 🌍 **Multi-language Support** (Tamil + English)
- 🔔 **Error Handling** with user-friendly messages
- ⚡ **Performance Optimized** with lazy loading
- 🎭 **Dark/Light Theme** support
- 📷 **Image Picker** with compression
- 📞 **Phone Integration** for direct calling

### **UI/UX**

- 🎨 **Modern Design** with Material Design principles
- 🌈 **Gradient Themes** and custom color schemes
- 📱 **Responsive Layout** using custom responsive system
- ♿ **Accessibility** support
- 🎛️ **Custom Components** with consistent theming
- 📐 **Typography System** with responsive font scaling

## 🌐 **Internationalization**

The app supports multiple languages:

- **Tamil (தமிழ்)** - Primary language
- **English** - Secondary language

Language detection is automatic based on device settings, with manual override support.

## 🔧 **Configuration**

### **Environment Setup**

The app uses environment-specific configurations:

```typescript
// Development vs Production API endpoints
// Error logging and reporting
// Feature flags for A/B testing
// Analytics and crash reporting
```

### **Theme Configuration**

```typescript
// Responsive design system
// Color schemes and gradients
// Typography scaling
// Component theming
```

## 📱 **Platform Support**

- **iOS:** 12.0+ (iPhone & iPad)
- **Android:** API level 21+ (Android 5.0+)
- **Architecture:**
  - iOS: arm64, x86_64 (simulator)
  - Android: arm64-v8a, armeabi-v7a, x86, x86_64

## 🚀 **Production Deployment**

### **Pre-deployment Checklist**

1. **Code Quality Check**

   ```bash
   npm run production:check
   ```

2. **Build Testing**

   ```bash
   # iOS Release Build
   cd ios && xcodebuild -workspace dmk.xcworkspace -scheme dmk -configuration Release

   # Android Release Build
   cd android && ./gradlew assembleRelease
   ```

3. **Performance Testing**
   - Memory usage monitoring
   - Network failure scenarios
   - Low-end device testing

### **Build Configuration**

- **iOS:** Archive and upload to App Store Connect
- **Android:** Generate signed APK/AAB for Play Store
- **Code Signing:** Configured for both platforms
- **Optimization:** Bundle size optimization enabled

## 📊 **Performance**

### **Optimization Features**

- ⚡ **Bundle Splitting** for faster load times
- 🖼️ **Image Optimization** with Fast Image
- 💾 **Efficient Storage** with MMKV
- 🔄 **Smart Caching** with React Query
- 📱 **Memory Management** with proper cleanup
- ⏱️ **Lazy Loading** for screens and components

### **Metrics**

- **Bundle Size:** Optimized for production
- **Startup Time:** < 3 seconds on mid-range devices
- **Memory Usage:** Efficient management with cleanup
- **Network Requests:** Batched and cached

## 🔒 **Security**

- 🔐 **Encrypted Storage** for sensitive data
- 🛡️ **API Security** with proper authentication
- 🚫 **No Debug Code** in production builds
- 🔍 **Input Validation** on all user inputs
- 📝 **Secure Logging** with sensitive data filtering

## 🤝 **Contributing**

### **Development Workflow**

1. Create feature branch from `main`
2. Follow TypeScript and ESLint standards
3. Write tests for new functionality
4. Run `npm run production:check` before PR
5. Submit pull request with clear description

### **Code Standards**

- Use functional components with hooks
- Follow clean architecture principles
- Implement proper error boundaries
- Use TypeScript for all new code
- Follow responsive design patterns

## 📚 **Documentation**

## 🐛 **Troubleshooting**

### **Common Issues**

**Metro bundler issues:**

```bash
npm start -- --reset-cache
```

**iOS build issues:**

```bash
npm run ios:clean
npm run ios:pods
```

**Android build issues:**

```bash
npm run android:clean
```

**ESLint errors:**

```bash
npm run cleanup
npm run lint -- --fix
```

## 📄 **License**

This project is proprietary software for த.ந.பாளையம் ஒன்றிய திமுக.

---
