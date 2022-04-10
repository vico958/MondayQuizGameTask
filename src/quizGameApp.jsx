import { Box, Button, Container, Grid, Typography } from "@mui/material";
import { useState } from "react";
import { QuizGameComponent } from "./Components/Game/quizGameComponent";
import "./quizGameApp.css";
import React from 'react';

function QuizGameApp() {
  const [isGameStarted, setIsGameStarted] = useState(false);

  if (isGameStarted) {
    return <QuizGameComponent></QuizGameComponent>;
  }

  return (
    <Container>
      <Grid container>
        <Grid xs item>
          <Box textAlign={"center"}>
            <Typography variant={"h1"}>
              Quiz Game
            </Typography>
            <Button variant="contained" size={"large"} onClick={() => setIsGameStarted(true)}>START GAME</Button>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}

export default QuizGameApp;
