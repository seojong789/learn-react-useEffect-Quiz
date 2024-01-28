import React, { useState } from 'react';
import quizCompleteImg from '../assets/quiz-complete.png';
import QuestionTimer from './QuestionTimer';
import QUESTIONS from '../questions';

const Quiz = () => {
  const [userAnswers, setUserAnswers] = useState([]);

  // 다음 질문의 index 번호를 의미하는 변수.
  // userAnswers 상태에서 파생시켜 값을 얻을 수 있기 때문에, 별도의 상태로 만들 필요가 없음.
  // 가령, 첫 번째 문제의 경우 userAnswers.length의 값은 0이기 때문에 0에 해당하는 위치에 값을 저장하고
  // 두 번째 문제의 경우 userAnswers.length의 값은 1 -> [1]에 값 저장.
  const activeQuestionIndex = userAnswers.length;

  const quizIsComplete = activeQuestionIndex === QUESTIONS.length;

  const handleSelectAnswer = (selectedAnswer) => {
    setUserAnswers((prevAnswers) => {
      return [...prevAnswers, selectedAnswer];
    });
  };

  if (quizIsComplete) {
    return (
      <div id="summary">
        <img src={quizCompleteImg} alt="Quiz Complete Image" />
        <h2>Quiz Completed!</h2>
      </div>
    );
  }

  // 다음 문제에 대한 보기를 뒤섞어야함. -> questions.js 파일에서 각 문제의 답을 항상 1번으로 해뒀기 때문.
  const shuffledAnswers = [...QUESTIONS[activeQuestionIndex].answers];
  shuffledAnswers.sort(() => Math.random() - 0.5);

  return (
    <div id="quiz">
      <div id="question">
        <QuestionTimer
          timeout={10000}
          onTimeout={() => handleSelectAnswer(null)}
        />
        <h2>{QUESTIONS[activeQuestionIndex].text}</h2>
        <ul id="answers">
          {shuffledAnswers.map((answer) => (
            <li key={answer} className="answer">
              <button onClick={() => handleSelectAnswer(answer)}>
                {answer}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Quiz;
