export interface Student {
  id: string;
  name: string;
  grade: string;
  createdAt: number;
}

export interface PartialStudent {
  name: string | null;
  id: string | null;
  grade: string | null;
}

export type ToastType = "success" | "error" | "info";

export interface Toast {
  id: string;
  type: ToastType;
  title: string;
  description?: string;
}

export type FieldKey = "name" | "id" | "grade";
