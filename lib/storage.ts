import type { Student } from "@/types";

const STORAGE_KEY = "student-dashboard:students";
const THEME_KEY = "student-dashboard:theme";

export const storage = {
  getStudents(): Student[] {
    if (typeof window === "undefined") return [];
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (!raw) return [];
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  },

  setStudents(students: Student[]): void {
    if (typeof window === "undefined") return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(students));
    } catch (err) {
      console.error("Failed to persist students", err);
    }
  },

  getTheme(): "light" | "dark" | null {
    if (typeof window === "undefined") return null;
    const v = window.localStorage.getItem(THEME_KEY);
    return v === "light" || v === "dark" ? v : null;
  },

  setTheme(theme: "light" | "dark"): void {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(THEME_KEY, theme);
  },
};
