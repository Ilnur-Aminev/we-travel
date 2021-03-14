import { useState, useEffect } from 'react';
import { useWindowScroll } from 'react-use';

interface ScrollPosition {
  x: number;
  y: number;
}

export interface ScrollPositions {
  prevPos: ScrollPosition;
  currPos: ScrollPosition;
}

export function useScrollPosition(): ScrollPositions {
  const { x, y } = useWindowScroll();

  const [prevPosition, setPrevScrollPosition] = useState<ScrollPosition>({ x, y });
  const [currentPosition, setCurrentScrollPosition] = useState<ScrollPosition>({ x, y });

  useEffect(() => {
    setCurrentScrollPosition(prevState => {
      setPrevScrollPosition({ ...prevState });
      return { x, y };
    });
  }, [x, y]);

  return { prevPos: prevPosition, currPos: currentPosition };
}
