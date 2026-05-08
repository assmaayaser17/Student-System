"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Check, Plus, User, Hash, Award, X } from "lucide-react";
import type { FieldKey } from "@/types";
import { cn } from "@/utils";

interface FieldDef {
  key: FieldKey;
  label: string;
  placeholder: string;
  icon: typeof User;
  hint: string;
}

const FIELDS: FieldDef[] = [
  {
    key: "name",
    label: "Full Name",
    placeholder: "e.g. Eleanor Whitfield",
    icon: User,
    hint: "Letters & spaces",
  },
  {
    key: "id",
    label: "Student ID",
    placeholder: "e.g. STU-7821",
    icon: Hash,
    hint: "Must be unique",
  },
  {
    key: "grade",
    label: "Grade",
    placeholder: "e.g. A+ or 92",
    icon: Award,
    hint: "Letter or number",
  },
];

interface InsertControlsProps {
  values: Record<FieldKey, string>;
  staged: Record<FieldKey, string | null>;
  onChange: (key: FieldKey, value: string) => void;
  onCommit: (key: FieldKey) => void;
  onClear: (key: FieldKey) => void;
}

export function InsertControls({
  values,
  staged,
  onChange,
  onCommit,
  onClear,
}: InsertControlsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {FIELDS.map((field, idx) => {
        const stagedValue = staged[field.key];
        const isStaged = stagedValue !== null;
        const Icon = field.icon;
        return (
          <motion.div
            key={field.key}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.5,
              delay: 0.1 + idx * 0.07,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="space-y-2"
          >
            <div className="flex items-center justify-between">
              <label
                htmlFor={`field-${field.key}`}
                className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-ink-600 dark:text-ink-300"
              >
                <Icon className="h-3 w-3" strokeWidth={2} />
                {field.label}
              </label>
              <AnimatePresence>
                {isStaged && (
                  <motion.span
                    initial={{ opacity: 0, scale: 0.7 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.7 }}
                    className="flex items-center gap-1 font-mono text-[10px] tracking-wide text-accent"
                  >
                    <Check className="h-3 w-3" strokeWidth={2.5} />
                    saved
                  </motion.span>
                )}
              </AnimatePresence>
            </div>

            <div
              className={cn(
                "group relative flex items-stretch overflow-hidden rounded-xl border transition-all duration-200",
                isStaged
                  ? "border-accent/40 bg-accent/5 dark:bg-accent/10"
                  : "border-ink-200/70 bg-white/50 hover:border-ink-300 dark:border-ink-700/60 dark:bg-ink-900/40 dark:hover:border-ink-600"
              )}
            >
              {/* Input area — shows chip when staged, otherwise input */}
              <div className="relative min-w-0 flex-1">
                <AnimatePresence mode="wait" initial={false}>
                  {isStaged ? (
                    <motion.div
                      key="chip"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.25 }}
                      className="flex h-full items-center gap-2 px-3 py-2.5"
                    >
                      <motion.div
                        initial={{ scale: 0.6, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{
                          delay: 0.05,
                          type: "spring",
                          stiffness: 400,
                          damping: 22,
                        }}
                        className="flex min-w-0 items-center gap-1.5 rounded-lg bg-accent/15 px-2.5 py-1 dark:bg-accent/25"
                      >
                        <Check
                          className="h-3 w-3 flex-shrink-0 text-accent"
                          strokeWidth={2.8}
                        />
                        <span className="truncate text-sm font-medium text-accent-700 dark:text-accent-200">
                          {stagedValue}
                        </span>
                        <button
                          type="button"
                          onClick={() => onClear(field.key)}
                          className="focus-ring -mr-0.5 ml-0.5 grid h-4 w-4 flex-shrink-0 place-items-center rounded-full text-accent/70 transition-colors hover:bg-accent/20 hover:text-accent"
                          aria-label={`Clear ${field.label}`}
                        >
                          <X className="h-2.5 w-2.5" strokeWidth={2.8} />
                        </button>
                      </motion.div>
                    </motion.div>
                  ) : (
                    <motion.input
                      key="input"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      id={`field-${field.key}`}
                      type="text"
                      value={values[field.key]}
                      onChange={(e) => onChange(field.key, e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          onCommit(field.key);
                        }
                      }}
                      placeholder={field.placeholder}
                      className="focus-ring w-full bg-transparent px-3.5 py-3 text-sm text-ink-900 placeholder:text-ink-400 focus:outline-none dark:text-ink-50 dark:placeholder:text-ink-500"
                    />
                  )}
                </AnimatePresence>
              </div>

              {/* Action button */}
              <motion.button
                type="button"
                onClick={() =>
                  isStaged ? onClear(field.key) : onCommit(field.key)
                }
                whileTap={{ scale: 0.96 }}
                className={cn(
                  "focus-ring flex flex-shrink-0 items-center gap-1.5 px-3.5 font-mono text-[10px] uppercase tracking-wider transition-colors",
                  isStaged
                    ? "bg-accent text-white hover:bg-accent-600"
                    : "bg-ink-900 text-ink-50 hover:bg-ink-800 dark:bg-ink-50 dark:text-ink-900 dark:hover:bg-ink-200"
                )}
              >
                <AnimatePresence mode="wait" initial={false}>
                  {isStaged ? (
                    <motion.span
                      key="edit"
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      className="flex items-center gap-1"
                    >
                      <X className="h-3 w-3" strokeWidth={2.5} />
                      Edit
                    </motion.span>
                  ) : (
                    <motion.span
                      key="add"
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      className="flex items-center gap-1"
                    >
                      <Plus className="h-3 w-3" strokeWidth={2.5} />
                      Add {field.label.split(" ")[0]}
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>
            <p className="px-1 font-mono text-[10px] tracking-wide text-ink-500 dark:text-ink-400">
              {field.hint}
            </p>
          </motion.div>
        );
      })}
    </div>
  );
}
