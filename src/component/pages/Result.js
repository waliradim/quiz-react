import _ from "lodash";
import React from "react";
import { useHistory, useParams } from "react-router-dom";
import useAnswer from "../../hooks/useAnswer";
import Analysis from "../Analysis";
import Summary from "../Summary";

export default function Result() {
  const { id } = useParams();
  const { location } = useHistory();
  const { state } = location;
  const { questionCopy } = state;

  const { loading, error, answers } = useAnswer(id);

  function quizMark() {
    let score = 0;

    answers.forEach((question, index1) => {
      let correctIndexes = [],
        checkedIndexes = [];

      question.options.forEach((option, index2) => {
        if (option.correct) correctIndexes.push(index2);
        if (questionCopy[index1].options[index2].checked) {
          checkedIndexes.push(index2);
          option.checked = true;
        }
      });

      if (_.isEqual(correctIndexes, checkedIndexes)) {
        score = score + 5;
      }
    });

    return score;
  }

  const userScore = quizMark();

  return (
    <>
      {loading && <div>Loading...</div>}
      {error && <div>There was an Error...</div>}
      {answers && answers.length > 0 && (
        <>
          <Summary score={userScore} noq={answers.length} />
          <Analysis answers={answers} />
        </>
      )}
    </>
  );
}
