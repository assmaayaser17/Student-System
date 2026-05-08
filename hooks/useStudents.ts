"use client";

import { useCallback, useEffect, useState } from "react";
import type { Student } from "@/types";
import { storage } from "@/lib/storage";
import { seedStudents } from "@/data/seed";

export function useStudents() {
  const [students, setStudents] = useState<Student[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const stored = storage.getStudents();
    if (stored.length === 0) {
      storage.setStudents(seedStudents);
      setStudents(seedStudents);
    } else {
      setStudents(stored);
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) storage.setStudents(students);
  }, [students, hydrated]);

  const addStudent = useCallback((student: Student) => {
    setStudents((prev) => [student, ...prev]);
  }, []);

  const removeStudent = useCallback((id: string) => {
    setStudents((prev) => prev.filter((s) => s.id !== id));
  }, []);

  const idExists = useCallback(
    (id: string) => students.some((s) => s.id.toLowerCase() === id.toLowerCase()),
    [students]
  );

  return { students, hydrated, addStudent, removeStudent, idExists };
}
