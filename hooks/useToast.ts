"use client";

import { useCallback, useState } from "react";
import type { Toast, ToastType } from "@/types";
import { generateId } from "@/utils";

export function useToast() {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const dismiss = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const toast = useCallback(
    (type: ToastType, title: string, description?: string) => {
      const id = generateId();
      const t: Toast = { id, type, title, description };
      setToasts((prev) => [...prev, t]);
      setTimeout(() => {
        setToasts((prev) => prev.filter((x) => x.id !== id));
      }, 3600);
    },
    []
  );

  return { toasts, toast, dismiss };
}
