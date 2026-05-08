"use client";

import { motion, AnimatePresence } from "framer-motion";
import type { Student } from "@/types";
import { StudentCard } from "./StudentCard";
import { EmptyState } from "./EmptyState";

interface StudentListProps {
  students: Student[];
  query: string;
  hasAnyStudents: boolean;
  onDelete: (id: string) => void;
  loading?: boolean;
}

function SkeletonCard() {
  return (
    <div className="rounded-2xl border border-ink-200/60 bg-white/40 p-4 dark:border-ink-700/60 dark:bg-ink-900/30">
      <div className="flex gap-3.5">
        <div className="shimmer h-11 w-11 rounded-xl" />
        <div className="flex-1 space-y-2">
          <div className="shimmer h-4 w-2/3 rounded" />
          <div className="shimmer h-3 w-1/2 rounded" />
          <div className="shimmer h-2.5 w-1/3 rounded" />
        </div>
      </div>
    </div>
  );
}

export function StudentList({
  students,
  query,
  hasAnyStudents,
  onDelete,
  loading,
}: StudentListProps) {
  if (loading) {
    return (
      <div className="grid gap-3 sm:grid-cols-2">
        {[0, 1, 2, 3].map((i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    );
  }

  if (students.length === 0) {
    return (
      <EmptyState
        variant={hasAnyStudents ? "no-results" : "no-students"}
        query={query}
      />
    );
  }

  return (
    <motion.div layout className="grid gap-3 sm:grid-cols-2">
      <AnimatePresence mode="popLayout">
        {students.map((student, idx) => (
          <StudentCard
            key={student.id}
            student={student}
            query={query}
            onDelete={onDelete}
            index={idx}
          />
        ))}
      </AnimatePresence>
    </motion.div>
  );
}
