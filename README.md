# Atrium — Student Registry

A premium, local-first student management dashboard built with Next.js 15, TypeScript, and Tailwind CSS. Editorial typography (Instrument Serif × Geist), aurora glassmorphism, and Framer Motion animations.

## Setup

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Stack

- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS
- Framer Motion
- Lucide React
- React 19 + Hooks
- localStorage persistence (no backend)

## Features

- **Three-stage insert flow**: Add Name → Add ID → Add Grade. Each field has its own commit button. Once all three are staged, the student is auto-saved to the registry.
- **Smart unified search**: One input searches across name, ID, and grade simultaneously, with live result count and inline highlighting.
- **Validation**: Empty-input prevention, duplicate-ID detection, modern toast notifications.
- **Dark mode** with system-preference detection and no flash on load.
- **Glassmorphism UI** with animated aurora background, grain overlay, and editorial type pairing.
- **Cmd/Ctrl+K** to focus search.
- **Persistence**: Students and theme stored in localStorage.

## Folder Structure

```
app/                Next.js App Router pages + global CSS
components/         Reusable UI components
hooks/              useStudents, useToast, useTheme
types/              TypeScript interfaces
utils/              cn(), generateId(), formatDate(), escapeRegex()
data/               Seed students
lib/                Storage adapter
```

## Components

| Component | Purpose |
|---|---|
| `Header` | App branding + student counter + theme toggle |
| `StudentForm` | Container managing the staging state |
| `InsertControls` | Three input rows with individual commit buttons |
| `SearchBar` | Unified search with ⌘K shortcut |
| `StudentCard` | Single student tile with avatar, ID, grade, delete |
| `StudentList` | Animated grid + skeleton loader |
| `EmptyState` | No-students / no-results variants |
| `Highlight` | Inline search-term highlighting |
| `Toaster` | Animated toast notification stack |
| `ThemeToggle` | Animated sun/moon switch |
