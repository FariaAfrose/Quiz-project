import React, { useEffect, useState, useReducer } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import _ from 'lodash';
import { getDatabase, ref, set } from 'firebase/database';
import Answers from '../Answers';
import MiniPlayer from '../MiniPlayer';
import ProgressBar from '../ProgressBar';
import useQuestions from '../../hooks/useQuestions';
import { useAuth } from '../../contexts/AuthContext'; // Import useAuth

const initialState = null;

const reducer = (state, action) => {
  switch (action.type) {
    case 'questions':
      action.value.forEach((question) => {
        question.options.forEach((option) => {
          option.checked = false;
        });
      });
      return action.value;
    case 'answer':
      const questions = _.cloneDeep(state);
      questions[action.questionId].options[action.optionIndex].checked = action.value;
      return questions;
    default:
      return state;
  }
};

export default function Quiz() {
  const { videoID } = useParams();
  // videoTitle
  const data = useLocation();
  const { videoTitle } = data.state;
// console.log('videTitle', videoTitle);

// videoTitle
  const { loading, error, questions } = useQuestions(videoID);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [qna, dispatch] = useReducer(reducer, initialState);
  const { currentUser } = useAuth();
  const navigate = useNavigate();

console.log(qna);
  useEffect(() => {
    dispatch({
      type: 'questions',

      value: questions,
    });
  }, [questions]);

  function handleAnswerChange(e, index) {
    dispatch({
      type: 'answer',
      questionId: currentQuestion,
      optionIndex: index,
      value: e.target.checked,
    });
  }

  function nextQuestion() {
    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion((prevCurrent) => prevCurrent + 1);
    }
  }

  function prevQuestion() {
    if (currentQuestion >= 1 && currentQuestion <= questions.length) {
      setCurrentQuestion((prevCurrent) => prevCurrent - 1);
    }
  }
// submit
  async function submit() {
    const { uid } = currentUser;
    const db = getDatabase();
    const resultRef = ref(db, `result/${uid}`);
    await set(resultRef, {
      [videoID]: qna,
    });
    navigate(`/result/${videoID}`, { state: { qna } });
  }
  console.log('currentUser', currentUser);

  const percentage = questions.length > 0 ? ((currentQuestion + 1) / questions.length) * 100 : 0;

  return (
    <>
      {loading && <div>Loading...</div>}
      {error && <div>There was an error!</div>}
      {!loading && !error && qna && qna.length > 0 && (
        <>
          <h1>{qna[currentQuestion].title}</h1>
          <h4>Questions can have multiple answers</h4>
          <Answers
            input
            options={qna[currentQuestion].options}
            handleChange={handleAnswerChange}
          />
          <ProgressBar
            next={nextQuestion}
            prev={prevQuestion}
            submit={submit}
            progress={percentage}
          />
          <MiniPlayer videoID={videoID} title={videoTitle} />
        </>
      )}
    </>
  );
}
