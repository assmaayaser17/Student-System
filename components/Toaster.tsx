"use client";

import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, AlertCircle, Info, X } from "lucide-react";
import type { Toast } from "@/types";
import { cn } from "@/utils";

interface ToasterProps {
  toasts: Toast[];
  onDismiss: (id: string) => void;
}

const iconFor = {
  success: CheckCircle2,
  error: AlertCircle,
  info: Info,
};

const accentFor = {
  success:
    "border-emerald-300/40 bg-emerald-50/80 dark:border-emerald-500/30 dark:bg-emerald-950/40",
  error:
    "border-rose-300/40 bg-rose-50/80 dark:border-rose-500/30 dark:bg-rose-950/40",
  info: "border-sky-300/40 bg-sky-50/80 dark:border-sky-500/30 dark:bg-sky-950/40",
};

const iconColor = {
  success: "text-emerald-600 dark:text-emerald-400",
  error: "text-rose-600 dark:text-rose-400",
  info: "text-sky-600 dark:text-sky-400",
};

export function Toaster({ toasts, onDismiss }: ToasterProps) {
  return (
    <div className="pointer-events-none fixed bottom-4 right-4 z-50 flex w-full max-w-sm flex-col gap-2 sm:bottom-6 sm:right-6">
      <AnimatePresence>
        {toasts.map((t) => {
          const Icon = iconFor[t.type];
          return (
            <motion.div
              key={t.id}
              layout
              initial={{ opacity: 0, x: 60, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 60, scale: 0.9 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className={cn(
                "pointer-events-auto flex items-start gap-3 rounded-xl border p-3.5 backdrop-blur-xl shadow-elevated",
                accentFor[t.type]
              )}
            >
              <div
                className={cn(
                  "mt-0.5 flex-shrink-0",
                  iconColor[t.type]
                )}
              >
                <Icon className="h-4 w-4" strokeWidth={2} />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-ink-900 dark:text-ink-50">
                  {t.title}
                </p>
                {t.description && (
                  <p className="mt-0.5 text-xs text-ink-600 dark:text-ink-300">
                    {t.description}
                  </p>
                )}
              </div>
              <button
                onClick={() => onDismiss(t.id)}
                className="focus-ring -mr-1 -mt-1 flex-shrink-0 rounded p-1 text-ink-400 transition-colors hover:text-ink-700 dark:hover:text-ink-200"
                aria-label="Dismiss"
              >
                <X className="h-3.5 w-3.5" strokeWidth={2} />
              </button>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
