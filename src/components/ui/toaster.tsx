"use client";

import { useUi } from "@/lib/store/useUi";
import { Toast } from "./toast";
import { toastViewport } from './toast.css';

export function Toaster() {
  const { toasts, removeToast } = useUi();

  return (
    <div className={toastViewport}>
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          {...toast}
          onClose={() => removeToast(toast.id)}
        />
      ))}
    </div>
  );
}
