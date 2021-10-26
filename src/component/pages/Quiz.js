import { getDatabase, ref, set } from "@firebase/database";
import _ from "lodash";
import React, { useEffect, useReducer, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import useQuestion from "../../hooks/useQuestion";
import Answer from "../Answer";
import MiniPlayer from "../MiniPlayer";
import Progressbar from "../Progressbar";

const initialState = null;
const reducer = (state, action) => {
  switch (action.type) {
    case "questions":
      action.value.forEach((question) => {
        question.options.forEach((option) => {
          option.checked = false;
        });
      });
      return action.value;
    case "answer":
      const questions = _.cloneDeep(state);
      questions[action.questionID].options[action.optionIndex].checked =
        action.value;
      return questions;

    default:
      return state;
  }
};

export default function Quiz() {
  const { id } = useParams();
  const { loading, error, questions } = useQuestion(id);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [questionCopy, dispatch] = useReducer(reducer, initialState);
  const { currentUser } = useAuth();
  const history = useHistory();

  useEffect(() => {
    dispatch({
      type: "questions",
      value: questions,
    });
  }, [questions]);

  function handleAnswerChange(e, index) {
    dispatch({
      type: "answer",
      questionID: currentQuestion,
      optionIndex: index,
      value: e.target.checked,
    });
  }

  //handle next question click go to next question
  function nextQuestion() {
    if (currentQuestion <= questions.length) {
      setCurrentQuestion((prevCurrentQuestion) => prevCurrentQuestion + 1);
    }
  }

  //handle previous question click back to previous question
  function previousQuestion() {
    if (currentQuestion >= 1 && currentQuestion <= questions.length) {
      setCurrentQuestion((prevCurrentQuestion) => prevCurrentQuestion - 1);
    }
  }

  //Quiz submit function
  async function submit() {
    const { uid } = currentUser;
    const db = getDatabase();
    const resultTblRef = ref(db, `result/${uid}`);
    await set(resultTblRef, {
      [id]: questionCopy,
    });

    history.push({
      pathname: `/result/${id}`,
      state: {
        questionCopy,
      },
    });
  }

  //calculate percentage of progressbar
  const progressbar =
    questions.length > 0 ? ((currentQuestion + 1) / questions.length) * 100 : 0;

  return (
    <>
      {loading && <div>Loading...</div>}
      {error && <div>There was an Error...</div>}
      {!loading && !error && questionCopy && questionCopy.length > 0 && (
        <>
          <h1>{questionCopy[currentQuestion].title}</h1>
          <h4>Question can have multiple answers</h4>
          <Answer
            options={questionCopy[currentQuestion].options}
            handleChange={handleAnswerChange}
          />
          <Progressbar
            next={nextQuestion}
            previous={previousQuestion}
            progress={progressbar}
            submit={submit}
          />
          <MiniPlayer />
        </>
      )}
    </>
  );
}
