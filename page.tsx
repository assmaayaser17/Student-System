"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Header } from "@/components/Header";
import { StudentForm } from "@/components/StudentForm";
import { SearchBar } from "@/components/SearchBar";
import { StudentList } from "@/components/StudentList";
import { Toaster } from "@/components/Toaster";
import { useStudents } from "@/hooks/useStudents";
import { useToast } from "@/hooks/useToast";
import type { Student } from "@/types";

export default function HomePage() {
  const { students, hydrated, addStudent, removeStudent, idExists } =
    useStudents();
  const { toasts, toast, dismiss } = useToast();
  const [query, setQuery] = useState("");

  const handleSubmit = (data: Omit<Student, "createdAt">): boolean => {
    if (!data.name.trim() || !data.id.trim() || !data.grade.trim()) {
      toast("error", "Missing fields", "All three fields are required.");
      return false;
    }
    if (idExists(data.id)) {
      toast(
        "error",
        "Duplicate ID",
        `Student ID "${data.id}" already exists in registry.`
      );
      return false;
    }
    addStudent({
      ...data,
      name: data.name.trim(),
      id: data.id.trim(),
      grade: data.grade.trim(),
      createdAt: Date.now(),
    });
    // Clear any active search so the new student is visible
    setQuery("");
    toast(
      "success",
      "Student enrolled",
      `${data.name} has joined the registry.`
    );
    return true;
  };

  const handleDelete = (id: string) => {
    const s = students.find((x) => x.id === id);
    removeStudent(id);
    if (s) toast("info", "Removed", `${s.name} was removed from the registry.`);
  };

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return students;
    return students.filter(
      (s) =>
        s.name.toLowerCase().includes(q) ||
        s.id.toLowerCase().includes(q) ||
        s.grade.toLowerCase().includes(q)
    );
  }, [students, query]);

  return (
    <>
      {/* Atmospheric background layers */}
      <div className="aurora-bg">
        <div className="aurora-blob aurora-blob-1" />
        <div className="aurora-blob aurora-blob-2" />
        <div className="aurora-blob aurora-blob-3" />
        <div className="aurora-blob aurora-blob-4" />
      </div>
      <div className="grain-overlay" />

      <main className="relative z-10 mx-auto flex min-h-screen w-full max-w-3xl flex-col px-4 py-6 sm:px-6 sm:py-10">
        <Header studentCount={students.length} />

        {/* Main glass card */}
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{
            duration: 0.7,
            delay: 0.1,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="glass mt-6 flex-1 space-y-8 rounded-3xl p-5 sm:mt-8 sm:p-8 md:p-10"
        >
          <StudentForm onSubmit={handleSubmit} idExists={idExists} />

          <div className="dotted-divider" />

          <SearchBar
            value={query}
            onChange={setQuery}
            resultCount={filtered.length}
            totalCount={students.length}
          />

          <StudentList
            students={filtered}
            query={query}
            hasAnyStudents={students.length > 0}
            onDelete={handleDelete}
            loading={!hydrated}
          />
        </motion.div>

        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="mt-6 flex items-center justify-center gap-2 font-mono text-[10px] tracking-[0.18em] text-ink-500 uppercase dark:text-ink-400"
        >
          <span>Crafted with care</span>
          <span className="text-accent">●</span>
          <span>local-first</span>
        </motion.footer>
      </main>

      <Toaster toasts={toasts} onDismiss={dismiss} />
    </>
  );
}
