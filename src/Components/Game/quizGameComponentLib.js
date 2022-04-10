export function calculateNewPointsAfterSubmitAnswer(isAnswerChooseWasCorrect, isHelpUsed, points) {
    let newPoints = points;
    if (isAnswerChooseWasCorrect === true) {
      if (isHelpUsed) {
        newPoints += 1;
      }
      else {
        newPoints += 3;
      }
    }
    else {
      if (isPointsBiggerThanTwo(newPoints) === true) {
        newPoints -= 2;
      }
      else {
        newPoints = 0;
      }
    }

    return newPoints;
  }

  export function isPointsBiggerThanTwo(points){
    if (points > 2)
    {
      return true;
    }
    return false;
  }

  export function addIdToQuestions(questions){
    return questions.map((question, index) => {
      question.id = index;
      return question;
    })
  }