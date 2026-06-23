# Pritech Task Manager

A lightweight task management app built with React Native and Expo. Supports iOS, Android, and web from a single codebase.

---

## Features

- Create, view, and delete tasks with title, description, theme/category, and supervisor
- Mark tasks as done or active (with confirmation flow)
- Search tasks by title
- Filter tasks by status (All / Active / Done)
- Schedule screen powered by task creation dates — tap any day to see that day's tasks
- User profile with job title (collar) selection
- Daily motivational quote fetched from a public API and cached locally
- Data persisted locally via AsyncStorage — survives app restarts
- Responsive web layout with side margins on large screens

---

## Prerequisites

Make sure you have the following installed before running the project:

| Tool | Version | Install |
|------|---------|---------|
| Node.js | 18 or higher | https://nodejs.org |
| npm | comes with Node | — |
| Expo CLI | via npx (no global install needed) | — |
| Git | any recent version | https://git-scm.com |

To run on a physical device you will also need:

- **iOS** — [Expo Go](https://apps.apple.com/app/expo-go/id982107779) from the App Store (must match SDK version — see note below)
- **Android** — [Expo Go](https://play.google.com/store/apps/details?id=host.exp.exponent) from Google Play
- **Web** — any modern browser, no extra setup

---

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/pritech.git
cd pritech
```

### 2. Install dependencies

```bash
npm install --legacy-peer-deps
```

> The `--legacy-peer-deps` flag is required because some Expo SDK 52 packages declare peer dependencies that conflict under npm's strict resolution mode.

### 3. Start the development server

```bash
npx expo start
```

This opens the Expo developer menu in your terminal. From there:

| Target | Command | Notes |
|--------|---------|-------|
| Web browser | press `w` | Recommended for quick testing — no device needed |
| Android device/emulator | press `a` | Requires Android Studio or a physical device with Expo Go |
| iOS simulator | press `i` | Requires Xcode on macOS |
| iOS physical device | scan QR with camera | Expo Go must match the SDK version (see below) |

Alternatively you can use the dedicated scripts:

```bash
npm run web       # opens in browser directly
npm run android   # opens Android
npm run ios       # opens iOS simulator
```

---

## Expo Go and SDK Version

This project uses **Expo SDK 52**. Expo Go on iOS always installs the latest SDK version, which may be newer than 52. If you see an "incompatible SDK" error on a physical iOS device, use one of these alternatives:

- **Web** (`npm run web`) — fully functional and recommended for testing
- **iOS Simulator** (`npm run ios`) — requires Xcode, not affected by Expo Go SDK constraints
- **Android** — Expo Go on Android allows older SDK versions; check [expo.dev/go](https://expo.dev/go) to install the SDK 52 build

---

## Project Structure

```
pritech/
├── App.tsx                     # Root component, navigation container, web shell
├── app.json                    # Expo configuration
├── assets/                     # Static assets (icons, splash screen)
└── src/
    ├── components/             # Reusable UI components
    │   ├── CategoryItem.tsx
    │   ├── PritechLogo.tsx
    │   ├── QuoteCard.tsx
    │   ├── SearchBar.tsx
    │   ├── SelectPicker.tsx
    │   ├── TaskCard.tsx
    │   ├── TimelineTask.tsx
    │   └── WeekCalendar.tsx
    ├── context/                # React Context providers
    │   ├── TasksContext.tsx
    │   └── UserContext.tsx
    ├── data/                   # Static data — collars and task themes
    │   ├── collars.ts
    │   └── taskThemes.ts
    ├── hooks/                  # Custom hooks (logic layer)
    │   ├── useQuote.ts         # Public API fetch with daily cache
    │   ├── useTasks.ts         # Task CRUD with AsyncStorage persistence
    │   └── useUser.ts          # User name and job title persistence
    ├── navigation/
    │   └── RootNavigator.tsx   # Stack navigator with all screen registrations
    ├── screens/
    │   ├── AddTaskScreen.tsx
    │   ├── HomeScreen.tsx
    │   ├── ProfileScreen.tsx
    │   ├── ScheduleScreen.tsx
    │   ├── TaskDetailScreen.tsx
    │   └── WelcomeScreen.tsx
    └── theme/
        ├── constants.ts        # Shared layout constants (MAX_APP_WIDTH)
        └── index.ts            # Colors, spacing, radius, typography tokens
```

---

## Tech Stack

- **Expo SDK 52** with Metro bundler (web + native)
- **React Native 0.76**
- **TypeScript**
- **React Navigation v7** (native stack)
- **AsyncStorage** — local persistence
- **Expo Vector Icons** (Ionicons)
- **dummyjson.com/quotes** — public API for daily quotes

---

## Notes

- First launch shows a welcome screen asking for your name and job title. This runs once and is not shown again.
- All task data is stored locally on the device. There is no backend or account system.
- The web build renders in a centred 820px container on large screens to maintain a mobile-like layout.
