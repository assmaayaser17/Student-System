"use client";

import { Moon, Sun } from "lucide-react";
import { motion } from "framer-motion";
import { useTheme } from "@/hooks/useTheme";

export function ThemeToggle() {
  const { theme, toggle, mounted } = useTheme();

  if (!mounted) {
    return <div className="h-10 w-10" />;
  }

  return (
    <motion.button
      onClick={toggle}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="glass-soft focus-ring relative grid h-10 w-10 place-items-center overflow-hidden rounded-full"
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
    >
      <motion.div
        key={theme}
        initial={{ rotate: -45, opacity: 0, scale: 0.6 }}
        animate={{ rotate: 0, opacity: 1, scale: 1 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="text-ink-800 dark:text-ink-100"
      >
        {theme === "light" ? (
          <Moon className="h-4 w-4" strokeWidth={1.6} />
        ) : (
          <Sun className="h-4 w-4" strokeWidth={1.6} />
        )}
      </motion.div>
    </motion.button>
  );
}
