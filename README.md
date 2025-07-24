# Weapon Card Upgrade App

## Project Overview

This is an interactive web application built with Next.js that simulates a weapon card upgrade system. Users can upgrade their weapon cards by spending energy points, with each upgrade increasing the card's progress bar. Once the progress reaches 100%, the card can level up.

The app features a dynamic progress bar, energy management with automatic regeneration, and smooth user interactions. The goal is to create an engaging and efficient user experience while ensuring data consistency and performance.

## Features

- **Weapon Cards:** Each card displays its current level, progress, name, description, and an image that updates with upgrades.
- **Energy System:** Users have a limited amount of energy that regenerates over time. Each upgrade consumes energy.
- **Progress Bar:** Visually displays current progress and the potential increase from selected upgrades.
- **Batch Upgrading:** Users can select the number of upgrades to apply in one action, reducing the number of server requests.
- **Level Up:** When progress reaches 100%, users can level up their cards without energy cost.
- **Local Storage Sync:** Cards and energy states persist across sessions using local storage.

## Improvements and Technical Details

### Performance and UX Enhancements

- **Reduced API Calls:** Batch upgrade requests consolidate multiple increments into a single API call, improving responsiveness and reducing server load.
- **Progress Preview:** The progress bar uses a dual-color system—pink indicates current progress, green shows the upcoming progress based on user input.
- **Input Controls:** Increment/decrement buttons with input validation prevent invalid upgrade counts.

### Technical Implementation

- Built with Next.js and React hooks (`useState`, `useEffect`) for efficient state management.
- API endpoints handle upgrade progress, level-up actions, and energy status.
- Energy regeneration logic includes a timer with persistence in local storage.
- Frontend disables controls appropriately when maximum levels or progress are reached to prevent erroneous inputs.
- Security considerations include backend validation of user requests and energy availability.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
