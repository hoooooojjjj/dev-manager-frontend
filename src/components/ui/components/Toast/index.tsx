'use client';

import * as React from 'react';
import * as ToastPrimitives from '@radix-ui/react-toast';
import { X } from 'lucide-react';
import * as S from './index.css';
import { useUi, type ToastMessage } from '@/lib/store/useUi';

interface ToastProps extends Omit<ToastMessage, 'id'> {
  variant?: 'default' | 'destructive' | 'success' | 'warning';
  className?: string;
  onClose: () => void;
}

const Toast = React.forwardRef<React.ElementRef<typeof ToastPrimitives.Root>, ToastProps>(
  ({ className, variant = 'default', title, description, onClose, ...props }, ref) => {
    return (
      <ToastPrimitives.Provider swipeDirection="right">
        <ToastPrimitives.Root
          ref={ref}
          className={`${S.toastVariant[variant]} ${className || ''}`}
          {...props}
        >
          <div className={S.toastContent}>
            {title && (
              <ToastPrimitives.Title className={S.toastTitle}>{title}</ToastPrimitives.Title>
            )}
            {description && (
              <ToastPrimitives.Description className={S.toastDescription}>
                {description}
              </ToastPrimitives.Description>
            )}
          </div>
          <ToastPrimitives.Close className={S.toastClose} onClick={onClose}>
            <X className="h-4 w-4" />
          </ToastPrimitives.Close>
        </ToastPrimitives.Root>
        <ToastPrimitives.Viewport className={S.toastViewport} />
      </ToastPrimitives.Provider>
    );
  }
);

Toast.displayName = ToastPrimitives.Root.displayName;

export { Toast };

export function Toaster() {
  const { toasts, removeToast } = useUi();

  return (
    <div className={S.toastViewport}>
      {toasts.map((toast) => (
        <Toast key={toast.id} {...toast} onClose={() => removeToast(toast.id)} />
      ))}
    </div>
  );
}
