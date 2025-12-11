"use client";

import React from 'react';

// Define the keyframes for the dot animation using CSS-in-JS or a direct string
const loadingDotKeyframes = `
@keyframes loading-dot-bounce {
  0%, 80%, 100% {
    transform: scale(0);
    opacity: 0.5;
  }
  40% {
    transform: scale(1);
    opacity: 1;
  }
}
`;

export const LoadingDots = ({ className = "" }) => {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: loadingDotKeyframes }} />
      <div className={`flex items-center justify-center space-x-2 ${className}`}>
        <div className="size-3 rounded-full bg-custom-orange animate-[loading-dot-bounce_1.4s_ease-in-out_infinite] delay-[-0.32s]"></div>
        <div className="size-3 rounded-full bg-custom-orange animate-[loading-dot-bounce_1.4s_ease-in-out_infinite] delay-[-0.16s]"></div>
        <div className="size-3 rounded-full bg-custom-orange animate-[loading-dot-bounce_1.4s_ease-in-out_infinite]"></div>
      </div>
    </>
  );
};

export default LoadingDots;
