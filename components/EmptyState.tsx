"use client";

import { motion } from "framer-motion";
import { SearchX, Users } from "lucide-react";

interface EmptyStateProps {
  variant: "no-students" | "no-results";
  query?: string;
}

export function EmptyState({ variant, query }: EmptyStateProps) {
  const config =
    variant === "no-students"
      ? {
          icon: Users,
          title: "Registry awaits",
          desc: "No students have been enrolled yet. Add one above to begin.",
        }
      : {
          icon: SearchX,
          title: "Nothing matches",
          desc: query ? `No students found for "${query}"` : "Try another query.",
        };

  const Icon = config.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-ink-300/60 bg-white/30 px-6 py-12 text-center backdrop-blur-sm dark:border-ink-700/60 dark:bg-ink-900/20"
    >
      <motion.div
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
        className="glass-soft mb-4 grid h-14 w-14 place-items-center rounded-2xl"
      >
        <Icon
          className="h-6 w-6 text-ink-500 dark:text-ink-400"
          strokeWidth={1.4}
        />
      </motion.div>
      <h3 className="font-display text-2xl text-ink-900 dark:text-ink-50">
        {config.title}
      </h3>
      <p className="mt-1.5 max-w-xs text-sm text-ink-600 dark:text-ink-400">
        {config.desc}
      </p>
    </motion.div>
  );
}
