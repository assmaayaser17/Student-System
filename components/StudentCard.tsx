"use client";

import { motion } from "framer-motion";
import { Trash2, Hash, Award } from "lucide-react";
import type { Student } from "@/types";
import { Highlight } from "./Highlight";
import { formatDate } from "@/utils";

interface StudentCardProps {
  student: Student;
  query: string;
  onDelete: (id: string) => void;
  index: number;
}

const initialFor = (name: string) =>
  name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((s) => s[0]?.toUpperCase())
    .join("");

const gradeColor = (grade: string): string => {
  const g = grade.trim().toUpperCase();
  if (g.startsWith("A")) return "text-emerald-700 dark:text-emerald-300";
  if (g.startsWith("B")) return "text-sky-700 dark:text-sky-300";
  if (g.startsWith("C")) return "text-amber-700 dark:text-amber-300";
  if (g.startsWith("D") || g.startsWith("F"))
    return "text-rose-700 dark:text-rose-300";
  // numeric
  const num = parseFloat(g);
  if (!isNaN(num)) {
    if (num >= 90) return "text-emerald-700 dark:text-emerald-300";
    if (num >= 80) return "text-sky-700 dark:text-sky-300";
    if (num >= 70) return "text-amber-700 dark:text-amber-300";
    return "text-rose-700 dark:text-rose-300";
  }
  return "text-ink-700 dark:text-ink-300";
};

export function StudentCard({
  student,
  query,
  onDelete,
  index,
}: StudentCardProps) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{
        duration: 0.4,
        delay: index * 0.04,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{ y: -2 }}
      className="group relative overflow-hidden rounded-2xl border border-ink-200/60 bg-white/55 p-4 backdrop-blur-xl transition-all hover:border-ink-300/80 hover:shadow-elevated dark:border-ink-700/60 dark:bg-ink-900/40 dark:hover:border-ink-600"
    >
      {/* Decorative gradient on hover */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-br from-accent/0 via-accent/0 to-accent/0 opacity-0 transition-opacity duration-500 group-hover:from-accent/5 group-hover:to-accent/10 group-hover:opacity-100" />

      <div className="flex items-start gap-3.5">
        {/* Avatar */}
        <div className="relative flex-shrink-0">
          <div className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-ink-900 to-ink-700 font-display text-base text-ink-50 dark:from-ink-100 dark:to-ink-300 dark:text-ink-900">
            {initialFor(student.name) || "?"}
          </div>
          <div className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-white bg-accent dark:border-ink-900" />
        </div>

        {/* Content */}
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <h3 className="truncate font-display text-lg leading-tight text-ink-900 dark:text-ink-50">
              <Highlight text={student.name} query={query} />
            </h3>
            <motion.button
              onClick={() => onDelete(student.id)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="focus-ring -m-1 flex-shrink-0 rounded-md p-1 text-ink-400 opacity-0 transition-opacity hover:text-rose-500 group-hover:opacity-100 dark:text-ink-500 dark:hover:text-rose-400"
              aria-label={`Remove ${student.name}`}
            >
              <Trash2 className="h-3.5 w-3.5" strokeWidth={1.8} />
            </motion.button>
          </div>

          <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1.5">
            <div className="flex items-center gap-1 font-mono text-[11px] text-ink-600 dark:text-ink-300">
              <Hash className="h-2.5 w-2.5" strokeWidth={2.5} />
              <Highlight text={student.id} query={query} />
            </div>
            <span className="text-ink-300 dark:text-ink-700">·</span>
            <div
              className={`flex items-center gap-1 font-mono text-[11px] font-medium ${gradeColor(
                student.grade
              )}`}
            >
              <Award className="h-2.5 w-2.5" strokeWidth={2.5} />
              <Highlight text={student.grade} query={query} />
            </div>
          </div>

          <p className="mt-2 font-mono text-[10px] tracking-wide text-ink-400 dark:text-ink-500">
            Enrolled {formatDate(student.createdAt)}
          </p>
        </div>
      </div>
    </motion.article>
  );
}
