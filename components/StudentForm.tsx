"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import type { FieldKey, Student } from "@/types";
import { InsertControls } from "./InsertControls";
import { cn } from "@/utils";

interface StudentFormProps {
  onSubmit: (student: Omit<Student, "createdAt">) => boolean;
  idExists: (id: string) => boolean;
}

const initialValues: Record<FieldKey, string> = { name: "", id: "", grade: "" };
const initialStaged: Record<FieldKey, string | null> = {
  name: null,
  id: null,
  grade: null,
};

export function StudentForm({ onSubmit, idExists }: StudentFormProps) {
  const [values, setValues] = useState(initialValues);
  const [staged, setStaged] = useState(initialStaged);

  const handleChange = (key: FieldKey, value: string) => {
    setValues((prev) => ({ ...prev, [key]: value }));
    if (staged[key] !== null) {
      setStaged((prev) => ({ ...prev, [key]: null }));
    }
  };

  const handleCommit = (key: FieldKey) => {
    const trimmed = values[key].trim();
    if (!trimmed) return;
    setStaged((prev) => ({ ...prev, [key]: trimmed }));
  };

  const handleClear = (key: FieldKey) => {
    setStaged((prev) => ({ ...prev, [key]: null }));
    setValues((prev) => ({ ...prev, [key]: "" }));
  };

  const allStaged =
    staged.name !== null && staged.id !== null && staged.grade !== null;

  // Auto-submit once all fields are staged
  useEffect(() => {
    if (allStaged) {
      const timer = setTimeout(() => {
        const success = onSubmit({
          name: staged.name!,
          id: staged.id!,
          grade: staged.grade!,
        });
        if (success) {
          setValues(initialValues);
          setStaged(initialStaged);
        } else {
          // ID conflict — clear staged ID so user can retry
          setStaged((prev) => ({ ...prev, id: null }));
        }
      }, 450);
      return () => clearTimeout(timer);
    }
  }, [allStaged, staged, onSubmit]);

  const stagedCount = Object.values(staged).filter((v) => v !== null).length;

  return (
    <section className="space-y-5">
      <div className="flex items-baseline justify-between gap-4">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-500 dark:text-ink-400">
            01 — Enrollment
          </p>
          <h2 className="mt-1 font-display text-2xl leading-tight text-ink-900 dark:text-ink-50 sm:text-3xl">
            Add a new <em className="text-accent">student</em>
          </h2>
        </div>
        <div className="flex items-center gap-2 font-mono text-[10px] tracking-wider text-ink-500 dark:text-ink-400">
          <span>{stagedCount}/3</span>
          <div className="flex gap-1">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                initial={false}
                animate={{
                  backgroundColor:
                    i < stagedCount
                      ? "rgb(232, 93, 47)"
                      : "rgba(156, 141, 114, 0.3)",
                }}
                transition={{ duration: 0.3 }}
                className="h-1 w-5 rounded-full"
              />
            ))}
          </div>
        </div>
      </div>

      <InsertControls
        values={values}
        staged={staged}
        onChange={handleChange}
        onCommit={handleCommit}
        onClear={handleClear}
      />

      <AnimatePresence>
        {allStaged && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            className={cn(
              "flex items-center justify-between gap-3 rounded-xl border border-accent/30 bg-accent/10 px-4 py-3",
              "dark:bg-accent/15"
            )}
          >
            <div className="flex items-center gap-2.5">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{
                  duration: 1.6,
                  ease: "linear",
                  repeat: Infinity,
                }}
              >
                <Sparkles
                  className="h-4 w-4 text-accent"
                  strokeWidth={2}
                  fill="currentColor"
                />
              </motion.div>
              <p className="text-sm text-ink-800 dark:text-ink-100">
                All fields staged — committing to registry
              </p>
            </div>
            <ArrowRight
              className="h-4 w-4 text-accent"
              strokeWidth={2}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
