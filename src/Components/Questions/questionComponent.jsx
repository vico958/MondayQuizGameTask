import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardActions, Button, FormControl, CardHeader, FormLabel, RadioGroup, Radio, FormControlLabel } from "@mui/material";
import { styled } from '@mui/material/styles';
import { decode } from 'html-entities';

const StyledCard = styled(Card)(() => ({
    "&.correct-answer": {
        "-moz-box-shadow": "inset 0 0 10px green",
        "-webkit-box-shadow": "inset 0 0 10px green",
        "box-shadow": "inset 0 0 10px green",
        border: "1px solid green"
    },
    "&.incorrect-answer": {
        "-moz-box-shadow": "inset 0 0 10px red",
        "-webkit-box-shadow": "inset 0 0 10px red",
        "box-shadow": "inset 0 0 10px red",
        border: "1px solid red"
    }
}))

export const QuestionComponent = ({ question, isGameOver, answerSubmitFunction, isQuestionChangedByTimer }) => {
    const [possibleAnswersOfTheQuestion, setPossibleAnswersOfTheQuestion] = useState([]);
    const [answerChoosedByUser, setAnswerChoosedByUser] = useState("");
    const [is50_50Click, setIs50_50Click] = useState(false);
    const [answerIndicatorClassName, setAnswerIndicatorClassName] = useState(""); // will hold in which className in StyledCard we will use

    useEffect(() => {
        const answers = [...question.incorrect_answers, question.correct_answer];
        answers.sort();
        setPossibleAnswersOfTheQuestion(answers);
        setIs50_50Click(false);
        setAnswerChoosedByUser("");
        if (isQuestionChangedByTimer === true) {
            setAnswerIndicator(false);
        }
        //eslint-disable-next-line
    }, [question])

    const setAnswerIndicator = (isCorrectAnswer) => {
        setAnswerIndicatorClassName(isCorrectAnswer ? "correct-answer" : "incorrect-answer");
        setTimeout(() => {
            setAnswerIndicatorClassName("");
        }, 1000)
    }

    const handleSubmitAnswerClick = () => {
        let isAnswerChooseWasCorrect = true;
        if (answerChoosedByUser !== question.correct_answer) {
            isAnswerChooseWasCorrect = false;
        }
        setAnswerIndicator(isAnswerChooseWasCorrect);
        answerSubmitFunction(isAnswerChooseWasCorrect, is50_50Click);
        setAnswerChoosedByUser("");
    }
    const handleRadioButtonChange = (event) => {
        setAnswerChoosedByUser(event.target.value);
    };

    const handle50_50ButtonClick = () => {
        const maxLengthOfNewPossibleAnswers = Math.floor(possibleAnswersOfTheQuestion.length / 2);
        const newAnswers = [question.correct_answer];
        while (newAnswers.length < maxLengthOfNewPossibleAnswers) {
            const incorrectAnswers = possibleAnswersOfTheQuestion.filter(answer => newAnswers.indexOf(answer) === -1);
            const randomNumber = Math.floor(Math.random() * (maxLengthOfNewPossibleAnswers + 1));
            newAnswers.push(incorrectAnswers[randomNumber]);
        }
        newAnswers.sort();
        setPossibleAnswersOfTheQuestion(newAnswers);
        setIs50_50Click(true);
        setAnswerChoosedByUser("");
    }

    return (
        <StyledCard className={answerIndicatorClassName} variant="outlined">
            <CardHeader title={decode(question.question)} />
            <CardContent>
                <FormControl>
                    <FormLabel id="your-answer-label">Answer options :</FormLabel>
                    <RadioGroup
                        aria-labelledby="your-answer-label"
                        name="radio-buttons-group"
                        onChange={handleRadioButtonChange}
                        key={question.id}>
                        {possibleAnswersOfTheQuestion.map((answerOption, index) => <FormControlLabel key={index}
                            value={answerOption} control={<Radio />} label={decode(answerOption)} disabled={isGameOver} />)}
                    </RadioGroup>
                </FormControl>
            </CardContent>
            <CardActions>
                <Button size="small" onClick={handleSubmitAnswerClick} disabled={answerChoosedByUser === "" || isGameOver}>Submit answer</Button>
                <Button size="small" onClick={handle50_50ButtonClick} disabled={possibleAnswersOfTheQuestion.length <= 3 || is50_50Click || isGameOver}>50/50</Button>
            </CardActions>
        </StyledCard>
    );
}
