/**
 * UI 상태 관리 스토어 (Zustand)
 * 전역 UI 상태: 사이드바, 모달, 토스트, 테마 등
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface ToastMessage {
  id: string;
  title?: string;
  description: string;
  variant?: 'default' | 'destructive' | 'success' | 'warning';
  duration?: number;
}

interface UiState {
  // 사이드바 상태
  sidebarOpen: boolean;

  // 모달 상태
  activeModal: string | null;
  modalData: Record<string, unknown>;

  // 토스트 메시지
  toasts: ToastMessage[];

  // 로딩 상태
  loadingStates: Record<string, boolean>;

  // 브레드크럼 상태
  breadcrumbs: Array<{ label: string; href: string }>;

  // Actions
  setSidebarOpen: (open: boolean) => void;
  toggleSidebar: () => void;

  openModal: (modalId: string, data?: Record<string, unknown>) => void;
  closeModal: () => void;

  addToast: (toast: Omit<ToastMessage, 'id'>) => void;
  removeToast: (id: string) => void;
  clearToasts: () => void;

  setLoading: (key: string, loading: boolean) => void;
  isLoading: (key: string) => boolean;

  setBreadcrumbs: (breadcrumbs: Array<{ label: string; href: string }>) => void;
}

export const useUi = create<UiState>()(
  persist(
    (set, get) => ({
      // Initial state
      sidebarOpen: true,
      activeModal: null,
      modalData: {},
      toasts: [],
      loadingStates: {},
      breadcrumbs: [],

      // Sidebar actions
      setSidebarOpen: (open) => set({ sidebarOpen: open }),
      toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),

      // Modal actions
      openModal: (modalId, data = {}) => set({ activeModal: modalId, modalData: data }),
      closeModal: () => set({ activeModal: null, modalData: {} }),

      // Toast actions
      addToast: (toast) => {
        const id = Math.random().toString(36).substring(2, 9);
        const newToast: ToastMessage = {
          id,
          variant: 'default',
          duration: 5000,
          ...toast,
        };

        set((state) => ({
          toasts: [...state.toasts, newToast],
        }));

        // 자동 제거
        if (newToast.duration && newToast.duration > 0) {
          setTimeout(() => {
            get().removeToast(id);
          }, newToast.duration);
        }
      },

      removeToast: (id) =>
        set((state) => ({
          toasts: state.toasts.filter((toast) => toast.id !== id),
        })),

      clearToasts: () => set({ toasts: [] }),

      // Loading actions
      setLoading: (key, loading) =>
        set((state) => ({
          loadingStates: {
            ...state.loadingStates,
            [key]: loading,
          },
        })),

      isLoading: (key) => get().loadingStates[key] || false,

      // Breadcrumb actions
      setBreadcrumbs: (breadcrumbs) => set({ breadcrumbs }),
    }),
    {
      name: 'ui-store',
      partialize: (state) => ({
        sidebarOpen: state.sidebarOpen,
      }),
    }
  )
);

// 편의 함수들
export const useToast = () => {
  const { addToast } = useUi();

  return {
    toast: addToast,
    success: (message: string, title?: string) =>
      addToast({
        title: title || '성공',
        description: message,
        variant: 'success',
      }),
    error: (message: string, title?: string) =>
      addToast({
        title: title || '오류',
        description: message,
        variant: 'destructive',
      }),
    warning: (message: string, title?: string) =>
      addToast({
        title: title || '경고',
        description: message,
        variant: 'warning',
      }),
    info: (message: string, title?: string) =>
      addToast({
        title: title || '알림',
        description: message,
        variant: 'default',
      }),
  };
};
