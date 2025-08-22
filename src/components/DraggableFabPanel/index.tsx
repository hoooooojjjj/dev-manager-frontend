'use client';
import { useState, useRef, ReactNode, KeyboardEvent } from 'react';
import { motion, PanInfo } from 'framer-motion';
import * as Collapsible from '@radix-ui/react-collapsible';
import * as S from './index.css';

export interface DraggableFabPanelProps {
  /** 패널 내용 */
  children: ReactNode;
  /** FAB 버튼에 표시될 아이콘 (닫힌 상태) */
  openIcon: ReactNode;
  /** FAB 버튼에 표시될 아이콘 (열린 상태) */
  closeIcon?: ReactNode;
  /** 패널 contents 위치 */
  contentsPosition?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
  /** FAB 버튼 색상 테마 */
  variant?: 'default' | 'secondary' | 'accent' | 'destructive';
  /** FAB 버튼 크기 */
  size?: 'sm' | 'md' | 'lg';
  /** 초기 위치 */
  togglePosition?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
  /** 초기 열림/닫힘 상태 */
  defaultOpen?: boolean;
  /** 드래그 가능 여부 */
  draggable?: boolean;
  /** 접근성 라벨 */
  ariaLabel?: string;
  /** 패널 열림/닫힘 상태 변경 콜백 */
  onOpenChange?: (open: boolean) => void;
  /** 드래그 시작 콜백 */
  onDragStart?: () => void;
  /** 드래그 종료 콜백 */
  onDragEnd?: () => void;
}

export function DraggableFabPanel({
  children,
  openIcon,
  closeIcon = '✕',
  variant = 'default',
  size = 'md',
  togglePosition = 'bottom-right',
  defaultOpen = false,
  draggable = true,
  ariaLabel = 'Toggle panel',
  onOpenChange,
  onDragStart,
  onDragEnd,
  contentsPosition = 'top-left',
}: DraggableFabPanelProps) {
  const [open, setOpen] = useState(defaultOpen);
  const hasDraggedRef = useRef(false);

  const handleToggle = () => {
    const newOpen = !open;
    setOpen(newOpen);
    onOpenChange?.(newOpen);
  };

  const handleDragStart = () => {
    hasDraggedRef.current = false;
    onDragStart?.();
  };

  const handleDrag = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    // 3px 이상 움직이면 드래그로 간주 (1px은 너무 민감함)
    if (Math.abs(info.offset.x) > 3 || Math.abs(info.offset.y) > 3) {
      hasDraggedRef.current = true;
    }
  };

  const handleDragEnd = () => {
    setTimeout(() => {
      hasDraggedRef.current = false;
    }, 100);
    onDragEnd?.();
  };

  const handleClick = () => {
    if (!hasDraggedRef.current) {
      handleToggle();
    }
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleToggle();
    }
  };

  const className = `${S.containerBase} ${S.positionVariant[togglePosition]}`;

  return draggable ? (
    <motion.div
      drag
      dragMomentum={false}
      onDragStart={handleDragStart}
      onDrag={handleDrag}
      onDragEnd={handleDragEnd}
      className={className}
    >
      <Collapsible.Root open={open}>
        <button
          onClick={handleClick}
          onKeyDown={handleKeyDown}
          className={`${S.fabButton} ${S.fabButtonVariant[variant]} ${S.fabSizeVariant[size]}`}
          aria-label={ariaLabel}
          aria-expanded={open}
          aria-controls="fab-panel-content"
          type="button"
        >
          {open ? closeIcon : openIcon}
        </button>

        <Collapsible.Content
          id="fab-panel-content"
          className={S.panel[contentsPosition]}
          role="dialog"
          aria-modal="false"
        >
          {children}
        </Collapsible.Content>
      </Collapsible.Root>
    </motion.div>
  ) : (
    <div className={className}>
      <Collapsible.Root open={open} onOpenChange={handleToggle}>
        <Collapsible.Trigger asChild>
          <button
            className={`${S.fabButton} ${S.fabButtonVariant[variant]} ${S.fabSizeVariant[size]}`}
            aria-label={ariaLabel}
            aria-expanded={open}
            aria-controls="fab-panel-content"
            type="button"
          >
            {open ? closeIcon : openIcon}
          </button>
        </Collapsible.Trigger>

        <Collapsible.Content
          id="fab-panel-content"
          className={S.panel[contentsPosition]}
          role="dialog"
          aria-modal="false"
        >
          {children}
        </Collapsible.Content>
      </Collapsible.Root>
    </div>
  );
}

export default DraggableFabPanel;
