import React from 'react';
import Confetti from 'react-confetti';
import { useState, useEffect } from 'react';
import { Typography } from '@mui/material';

export const ConfettiCelebrations = ({ points }) => {
  const size = useWindowSize();
  return (
    <Typography xs={12} textAlign={"center"}>
      You finished the quiz with {points} points Congratulations!
      <Confetti width={size.width} height={size.height} />
    </Typography>
  );
}

function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });
  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return windowSize;
}