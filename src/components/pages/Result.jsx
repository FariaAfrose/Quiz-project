import React from 'react';
// import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { useLocation, useParams } from 'react-router-dom';
import _ from 'lodash';
import Analysis from '../Analysis';
import Summary from '../Summary';
import useAnswers from '../../hooks/useAnswers';

export default function Result() {
// const navigate = useNavigate();
const { videoID } = useParams();
const { state } = useLocation();
const { qna } = state;
 console.log(state);
const { loading, error, answers } = useAnswers(videoID);
console.log(answers);
function calculater() {
    let score = 0;
  if (answers && qna) {
    answers.forEach((question, index1) => {
      let correctIndexes = [];
        let checkedIndexes = [];

      question.options.forEach((option, index2) => {
          if (option.correct)correctIndexes.push(index2);
          if (qna[index1].options[index2].checked) {
              checkedIndexes.push(index2);
              // eslint-disable-next-line no-param-reassign
              option.checked = true;
          }
      });

        if (_.isEqual(correctIndexes, checkedIndexes)) {
         score += 5;
        }
    });
  }
 return score;
}
const userScore = calculater();
  return (
    <>
      {loading && <div>Loading...</div>}
      {error && <div>There was an error!</div>}
      {answers && answers.length > 0 && (

      <>
        <Summary score={userScore} noq={answers.length} />
        <Analysis answers={answers} />
      </>
    )}
    </>
  );
}
