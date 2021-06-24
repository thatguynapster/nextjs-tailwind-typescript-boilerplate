import { useEffect } from 'react';

// function to create event using useEffect
const useWindowEvent = (event: any, callback: any) => {
  useEffect(() => {
    window.addEventListener(event, callback, { passive: true });
    return () => window.removeEventListener(event, callback);
  }, [event, callback]);
};

// call useWindowEvent to create needed event and export
export const useGlobalMouseUp = (callback: Function) => {
  return useWindowEvent('mouseup', callback);
};
