"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Search, X } from "lucide-react";
import { useEffect, useRef } from "react";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  resultCount: number;
  totalCount: number;
}

export function SearchBar({
  value,
  onChange,
  resultCount,
  totalCount,
}: SearchBarProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return (
    <section className="space-y-3">
      <div className="flex items-baseline justify-between gap-4">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-500 dark:text-ink-400">
            02 — Discovery
          </p>
          <h2 className="mt-1 font-display text-2xl leading-tight text-ink-900 dark:text-ink-50 sm:text-3xl">
            Search the <em className="text-accent">registry</em>
          </h2>
        </div>
        <AnimatePresence mode="wait">
          {value && (
            <motion.span
              key={resultCount}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              className="font-mono text-[10px] tracking-wider text-ink-500 dark:text-ink-400"
            >
              {resultCount}/{totalCount} matched
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      <motion.div
        whileHover={{ y: -1 }}
        className="group relative flex items-center overflow-hidden rounded-2xl border border-ink-200/70 bg-white/60 backdrop-blur-xl transition-colors focus-within:border-accent/40 dark:border-ink-700/60 dark:bg-ink-900/40 dark:focus-within:border-accent/60"
      >
        <div className="pl-4 pr-2">
          <Search
            className="h-4 w-4 text-ink-500 transition-colors group-focus-within:text-accent dark:text-ink-400"
            strokeWidth={2}
          />
        </div>
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Search by name, ID, or grade…"
          className="focus-ring min-w-0 flex-1 bg-transparent py-3.5 pr-3 text-sm text-ink-900 placeholder:text-ink-400 focus:outline-none dark:text-ink-50 dark:placeholder:text-ink-500"
        />
        <AnimatePresence>
          {value && (
            <motion.button
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.7 }}
              onClick={() => onChange("")}
              className="focus-ring mr-2 grid h-7 w-7 place-items-center rounded-full bg-ink-100 text-ink-600 transition-colors hover:bg-ink-200 dark:bg-ink-800 dark:text-ink-300 dark:hover:bg-ink-700"
              aria-label="Clear search"
            >
              <X className="h-3.5 w-3.5" strokeWidth={2.5} />
            </motion.button>
          )}
        </AnimatePresence>
        <kbd className="mr-3 hidden items-center gap-0.5 rounded-md border border-ink-200/80 bg-white/60 px-1.5 py-0.5 font-mono text-[10px] text-ink-500 sm:flex dark:border-ink-700 dark:bg-ink-900/60 dark:text-ink-400">
          ⌘K
        </kbd>
      </motion.div>
    </section>
  );
}
