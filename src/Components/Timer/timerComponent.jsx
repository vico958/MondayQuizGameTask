/** @jsxImportSource @emotion/react */
import { useTimer } from "react-timer-hook";
import { Paper, Box, Typography } from "@mui/material";
import { css } from "@emotion/react";
import { useEffect } from "react";

const displyTime = (seconds) => css`
  ${seconds <= 10 && seconds > 5 ? "color : orange;" : ""}
  ${seconds <= 5 ? "color : red;" : ""}
  `; // making the timer in orange color when left 5-10 seconds, and when 0-5 seconds red color

export const TimerComponent = ({ totalSecondsToRunTimer, isGameOver, timerExpireFunction }) => {
  const expiryTimestamp = new Date();
  expiryTimestamp.setSeconds(expiryTimestamp.getSeconds() + totalSecondsToRunTimer);
  const { seconds, pause } = useTimer({ expiryTimestamp, onExpire: () => handleTimerExpire() });

  useEffect(() => {
    if (isGameOver === true) {
      pause()
    }
    //eslint-disable-next-line
  }, [isGameOver]);

  const handleTimerExpire = () => {
    setTimeout(timerExpireFunction, 1000);
  }

  return (
    <Paper elevation={2}>
      <Box p={2} textAlign={"center"}>
        <Typography variant={"h4"}>
          Time : <br />
          <span css={displyTime(seconds)}>{seconds}
          </span>
        </Typography>
      </Box>
    </Paper>
  );
}