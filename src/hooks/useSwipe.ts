'use client';

import { useRef, useCallback, useState } from 'react';

interface SwipeState {
  deltaX: number;
  deltaY: number;
  isSwiping: boolean;
  direction: 'left' | 'right' | 'up' | 'down' | null;
}

interface UseSwipeOptions {
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  onSwipeUp?: () => void;
  onSwipeDown?: () => void;
  threshold?: number; // minimum distance to trigger swipe
}

export function useSwipe(options: UseSwipeOptions = {}) {
  const { onSwipeLeft, onSwipeRight, onSwipeUp, onSwipeDown, threshold = 80 } = options;
  const startX = useRef(0);
  const startY = useRef(0);
  const [swipeState, setSwipeState] = useState<SwipeState>({
    deltaX: 0,
    deltaY: 0,
    isSwiping: false,
    direction: null,
  });

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    startX.current = e.touches[0].clientX;
    startY.current = e.touches[0].clientY;
    setSwipeState({ deltaX: 0, deltaY: 0, isSwiping: true, direction: null });
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (!swipeState.isSwiping) return;

    const currentX = e.touches[0].clientX;
    const currentY = e.touches[0].clientY;
    const deltaX = currentX - startX.current;
    const deltaY = currentY - startY.current;

    let direction: SwipeState['direction'] = null;
    if (Math.abs(deltaX) > Math.abs(deltaY)) {
      direction = deltaX > 0 ? 'right' : 'left';
    } else {
      direction = deltaY > 0 ? 'down' : 'up';
    }

    setSwipeState({ deltaX, deltaY, isSwiping: true, direction });
  }, [swipeState.isSwiping]);

  const handleTouchEnd = useCallback(() => {
    const { deltaX, deltaY, direction } = swipeState;

    if (Math.abs(deltaX) > threshold && (direction === 'left' || direction === 'right')) {
      if (direction === 'left') onSwipeLeft?.();
      if (direction === 'right') onSwipeRight?.();
    }

    if (Math.abs(deltaY) > threshold && (direction === 'up' || direction === 'down')) {
      if (direction === 'up') onSwipeUp?.();
      if (direction === 'down') onSwipeDown?.();
    }

    setSwipeState({ deltaX: 0, deltaY: 0, isSwiping: false, direction: null });
  }, [swipeState, threshold, onSwipeLeft, onSwipeRight, onSwipeUp, onSwipeDown]);

  const handlers = {
    onTouchStart: handleTouchStart,
    onTouchMove: handleTouchMove,
    onTouchEnd: handleTouchEnd,
  };

  return { swipeState, handlers };
}
