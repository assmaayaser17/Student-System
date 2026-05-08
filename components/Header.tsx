"use client";

import { motion } from "framer-motion";
import { GraduationCap, Sparkles } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";

interface HeaderProps {
  studentCount: number;
}

export function Header({ studentCount }: HeaderProps) {
  return (
    <motion.header
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="flex items-center justify-between gap-4"
    >
      <div className="flex items-center gap-3">
        <div className="glass-soft grid h-10 w-10 place-items-center rounded-xl">
          <GraduationCap
            className="h-5 w-5 text-ink-900 dark:text-ink-100"
            strokeWidth={1.6}
          />
        </div>
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-500 dark:text-ink-400">
            est. registry
          </p>
          <h1 className="font-display text-xl leading-none text-ink-900 dark:text-ink-50">
            Atrium<span className="italic text-accent">.</span>
          </h1>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="hidden items-center gap-2 rounded-full border border-ink-200/60 bg-white/40 px-3 py-1.5 backdrop-blur sm:flex dark:border-ink-700/60 dark:bg-ink-800/40"
        >
          <Sparkles
            className="h-3 w-3 text-accent"
            strokeWidth={2}
            fill="currentColor"
          />
          <span className="font-mono text-[11px] tracking-wide text-ink-700 dark:text-ink-200">
            {studentCount} {studentCount === 1 ? "scholar" : "scholars"}{" "}
            enrolled
          </span>
        </motion.div>
        <ThemeToggle />
      </div>
    </motion.header>
  );
}
