import { Grid } from "@mui/material";
import { Fragment, useEffect, useState } from "react";
import { TimerComponent } from "../Timer/timerComponent";
import { QuestionComponent } from "../Questions/questionComponent";
import { PointsComponent } from "../Points/pointsComponent";
import { calculateNewPointsAfterSubmitAnswer, isPointsBiggerThanTwo, addIdToQuestions } from "./quizGameComponentLib";
import { ConfettiCelebrations } from "../Confetti/confettiCelebrations";
import React from 'react';

export const QuizGameComponent = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(null);
  const [points, setPoints] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isQuestionChangedByTimer, setIsQuestionChangedByTimer] = useState(false);

  useEffect(() => {
    if (questions.length === 0) {
      getQuestionsFromApi("https://opentdb.com/api.php?amount=100");
    } else {
      setCurrentQuestionIndex(0);
    }
  }, [questions])

  const getQuestionsFromApi = async (apiUrl) => {
    const fetchApi = await fetch(apiUrl);
    const jsonApi = await fetchApi.json();
    setQuestions(addIdToQuestions(jsonApi.results));
  }

  const handleTimePassed = () => {
    setIsQuestionChangedByTimer(true);
    if (isPointsBiggerThanTwo(points) === true) {
      setPoints(points - 1);
    }
    else {
      setPoints(0);
    }
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
    else {
      setIsGameOver(true);
    }
  }

  if (isGameOver) {
    return <ConfettiCelebrations points={points}></ConfettiCelebrations>;
  }

  const handleAnswerSubmit = (isAnswerChooseWasCorrect, isHelpUsed) => {
    setIsQuestionChangedByTimer(false);
    let newPoints = calculateNewPointsAfterSubmitAnswer(isAnswerChooseWasCorrect, isHelpUsed, points);
    setPoints(newPoints);
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
    else {
      setIsGameOver(true);
    }
  }

  const gridValue = {
    "xs": 12,
    "sm": 6,
    "lg": 4,
    "spacing": 2
  };

  return (
    <Grid container spacing={gridValue.spacing}>
      {currentQuestionIndex !== null ?
        <Fragment>
          <Grid container item xs={gridValue.xs} spacing={gridValue.spacing} justifyContent={"center"}>
            <Grid item xs={gridValue.xs / 2} sm={gridValue.sm / 2} lg={gridValue.lg / 2}>
              <TimerComponent key={currentQuestionIndex} totalSecondsToRunTimer={30} isGameOver={isGameOver} timerExpireFunction={handleTimePassed} />
            </Grid>
            <Grid item xs={gridValue.xs / 2} sm={gridValue.sm / 2} lg={gridValue.lg / 2}>
              <PointsComponent totalPoints={points} />
            </Grid>
          </Grid>
          <Grid container item xs={gridValue.xs} justifyContent={"center"}>
            <Grid item xs={gridValue.xs} sm={gridValue.sm} lg={gridValue.lg}>
              <QuestionComponent question={questions[currentQuestionIndex]} isGameOver={isGameOver} answerSubmitFunction={handleAnswerSubmit} isQuestionChangedByTimer={isQuestionChangedByTimer} />
            </Grid>
          </Grid>
        </Fragment>
        : <Grid container item xs={gridValue.xs} justifyContent={"center"}>Getting Questions...</Grid>}
    </Grid>
  );
}

