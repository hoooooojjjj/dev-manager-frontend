"use client";

import * as React from "react";
import * as ToastPrimitives from "@radix-ui/react-toast";
import { X } from "lucide-react";
import { toastVariant, toastContent, toastTitle, toastDescription, toastClose, toastViewport } from './toast.css';
import type { ToastMessage } from "@/lib/store/useUi";

interface ToastProps extends 
  Omit<ToastMessage, 'id'> {
  variant?: 'default' | 'destructive' | 'success' | 'warning';
  className?: string;
  onClose: () => void;
}

const Toast = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Root>,
  ToastProps
>(({ className, variant = 'default', title, description, onClose, ...props }, ref) => {
  return (
    <ToastPrimitives.Provider swipeDirection="right">
      <ToastPrimitives.Root
        ref={ref}
        className={`${toastVariant[variant]} ${className || ''}`}
        {...props}
      >
        <div className={toastContent}>
          {title && (
            <ToastPrimitives.Title className={toastTitle}>
              {title}
            </ToastPrimitives.Title>
          )}
          {description && (
            <ToastPrimitives.Description className={toastDescription}>
              {description}
            </ToastPrimitives.Description>
          )}
        </div>
        <ToastPrimitives.Close
          className={toastClose}
          onClick={onClose}
        >
          <X className="h-4 w-4" />
        </ToastPrimitives.Close>
      </ToastPrimitives.Root>
      <ToastPrimitives.Viewport className={toastViewport} />
    </ToastPrimitives.Provider>
  );
});

Toast.displayName = ToastPrimitives.Root.displayName;

export { Toast };
