import type { Student } from "@/types";

export const seedStudents: Student[] = [
  {
    id: "STU-1042",
    name: "Amelia Hartwell",
    grade: "A+",
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 6,
  },
  {
    id: "STU-2087",
    name: "Marcus Okonkwo",
    grade: "A",
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 4,
  },
  {
    id: "STU-3120",
    name: "Yuki Tanaka",
    grade: "A+",
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 3,
  },
  {
    id: "STU-4231",
    name: "Sofia Esposito",
    grade: "B+",
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 2,
  },
  {
    id: "STU-5394",
    name: "Daniel Mwangi",
    grade: "A",
    createdAt: Date.now() - 1000 * 60 * 60 * 26,
  },
  {
    id: "STU-6478",
    name: "Priya Raghavan",
    grade: "A+",
    createdAt: Date.now() - 1000 * 60 * 60 * 5,
  },
];
