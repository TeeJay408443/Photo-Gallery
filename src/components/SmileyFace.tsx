import React, { useEffect, useRef, useState, useCallback } from 'react';

interface EyePosition {
  x: number;
  y: number;
}

export const SmileyFace: React.FC<{ className?: string }> = ({ className = '' }) => {
  const [leftPupil, setLeftPupil] = useState<EyePosition>({ x: 0, y: 0 });
  const [rightPupil, setRightPupil] = useState<EyePosition>({ x: 0, y: 0 });
  const [isBlinking, setIsBlinking] = useState<boolean>(false);

  const leftEyeRef = useRef<HTMLDivElement>(null);
  const rightEyeRef = useRef<HTMLDivElement>(null);

  const calculatePupilOffset = useCallback(
    (eyeElem: HTMLDivElement | null, cursorX: number, cursorY: number): EyePosition => {
      if (!eyeElem) return { x: 0, y: 0 };
      const rect = eyeElem.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const dx = cursorX - centerX;
      const dy = cursorY - centerY;
      const angle = Math.atan2(dy, dx);
      const distance = Math.hypot(dx, dy);

      // Max pupil movement radius inside the eye socket
      const maxOffset = 5.5;
      // Smooth dampening based on distance
      const offset = Math.min(distance / 28, 1) * maxOffset;

      return {
        x: Math.cos(angle) * offset,
        y: Math.sin(angle) * offset,
      };
    },
    []
  );

  useEffect(() => {
    const handlePointerMove = (e: MouseEvent | TouchEvent) => {
      let clientX = 0;
      let clientY = 0;

      if ('touches' in e && e.touches.length > 0) {
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
      } else if ('clientX' in e) {
        clientX = (e as MouseEvent).clientX;
        clientY = (e as MouseEvent).clientY;
      } else {
        return;
      }

      setLeftPupil(calculatePupilOffset(leftEyeRef.current, clientX, clientY));
      setRightPupil(calculatePupilOffset(rightEyeRef.current, clientX, clientY));
    };

    window.addEventListener('mousemove', handlePointerMove, { passive: true });
    window.addEventListener('touchmove', handlePointerMove, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('touchmove', handlePointerMove);
    };
  }, [calculatePupilOffset]);

  // Periodic natural blinking
  useEffect(() => {
    let blinkTimer: ReturnType<typeof setTimeout>;

    const scheduleNextBlink = () => {
      const delay = Math.random() * 3500 + 2500; // between 2.5s and 6s
      blinkTimer = setTimeout(() => {
        setIsBlinking(true);
        setTimeout(() => {
          setIsBlinking(false);
          scheduleNextBlink();
        }, 160);
      }, delay);
    };

    scheduleNextBlink();

    return () => {
      clearTimeout(blinkTimer);
    };
  }, []);

  const handleClick = () => {
    setIsBlinking(true);
    setTimeout(() => setIsBlinking(false), 200);
  };

  return (
    <div
      className={`inline-flex flex-col items-center select-none ${className}`}
      aria-label="Interactive yellow smiley face following your cursor"
      role="img"
    >
      <button
        type="button"
        onClick={handleClick}
        title="Click me! I follow your cursor 🙂"
        className="relative w-20 h-20 sm:w-22 sm:h-22 rounded-full bg-gradient-to-b from-yellow-300 via-amber-400 to-amber-500 border-2 border-amber-500 shadow-lg shadow-amber-500/25 cursor-pointer transition-transform duration-200 hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-amber-300 focus:ring-offset-2 focus:ring-offset-zinc-900"
      >
        {/* Soft highlight shine at top */}
        <div className="absolute top-1.5 left-3 w-7 h-3 bg-white/35 rounded-full blur-[1px] transform -rotate-12 pointer-events-none" />

        {/* Eyes container */}
        <div className="absolute top-5 inset-x-0 flex justify-center gap-4 pointer-events-none">
          {/* Left Eye */}
          <div
            ref={leftEyeRef}
            className="relative w-4.5 h-6 sm:w-5 sm:h-6.5 bg-white border border-stone-800/25 rounded-full overflow-hidden shadow-inner flex items-center justify-center transition-transform duration-75"
            style={{
              transform: isBlinking ? 'scaleY(0.1)' : 'scaleY(1)',
              transitionProperty: 'transform',
              transitionDuration: isBlinking ? '80ms' : '150ms',
            }}
          >
            {/* Pupil */}
            <div
              className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-stone-900 rounded-full relative"
              style={{
                transform: `translate(${leftPupil.x}px, ${leftPupil.y}px)`,
                transition: 'transform 60ms ease-out',
              }}
            >
              {/* Specular highlight glint */}
              <div className="absolute top-0.5 right-0.5 w-1 h-1 bg-white rounded-full" />
            </div>
          </div>

          {/* Right Eye */}
          <div
            ref={rightEyeRef}
            className="relative w-4.5 h-6 sm:w-5 sm:h-6.5 bg-white border border-stone-800/25 rounded-full overflow-hidden shadow-inner flex items-center justify-center transition-transform duration-75"
            style={{
              transform: isBlinking ? 'scaleY(0.1)' : 'scaleY(1)',
              transitionProperty: 'transform',
              transitionDuration: isBlinking ? '80ms' : '150ms',
            }}
          >
            {/* Pupil */}
            <div
              className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-stone-900 rounded-full relative"
              style={{
                transform: `translate(${rightPupil.x}px, ${rightPupil.y}px)`,
                transition: 'transform 60ms ease-out',
              }}
            >
              {/* Specular highlight glint */}
              <div className="absolute top-0.5 right-0.5 w-1 h-1 bg-white rounded-full" />
            </div>
          </div>
        </div>

        {/* Cheeks and Smile SVG overlay */}
        <svg
          viewBox="0 0 88 88"
          className="absolute inset-0 w-full h-full pointer-events-none"
          aria-hidden="true"
        >
          {/* Rosy blush cheeks */}
          <circle cx="18" cy="52" r="5" fill="#f43f5e" fillOpacity="0.32" />
          <circle cx="70" cy="52" r="5" fill="#f43f5e" fillOpacity="0.32" />

          {/* Cheerful mouth curve */}
          <path
            d="M 27 54 Q 44 71 61 54"
            fill="none"
            stroke="#1c1917"
            strokeWidth="3.5"
            strokeLinecap="round"
          />

          {/* Subtle dimples at mouth corners */}
          <path
            d="M 25 52 Q 26 55 28 54"
            fill="none"
            stroke="#1c1917"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <path
            d="M 63 54 Q 62 55 60 52"
            fill="none"
            stroke="#1c1917"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        </svg>
      </button>
    </div>
  );
};

export default SmileyFace;
