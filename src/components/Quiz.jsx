import React, { useState, useCallback } from 'react';
import quizCompleteImg from '../assets/quiz-complete.png';
import QUESTIONS from '../questions';
import Question from './Question';

const Quiz = () => {
  const [userAnswers, setUserAnswers] = useState([]);

  // 다음 질문의 index 번호를 의미하는 변수.
  // userAnswers 상태에서 파생시켜 값을 얻을 수 있기 때문에, 별도의 상태로 만들 필요가 없음.
  // 가령, 첫 번째 문제의 경우 userAnswers.length의 값은 0이기 때문에 0에 해당하는 위치에 값을 저장하고
  // 두 번째 문제의 경우 userAnswers.length의 값은 1 -> [1]에 값 저장.

  const activeQuestionIndex = userAnswers.length;

  const quizIsComplete = activeQuestionIndex === QUESTIONS.length;

  const handleSelectAnswer = useCallback((selectedAnswer) => {
    setUserAnswers((prevAnswers) => {
      return [...prevAnswers, selectedAnswer];
    });
  }, []);

  const handleSkipAnswer = useCallback(
    () => handleSelectAnswer(null),
    [handleSelectAnswer]
  );

  if (quizIsComplete) {
    return (
      <div id="summary">
        <img src={quizCompleteImg} alt="Quiz Complete Image" />
        <h2>Quiz Completed!</h2>
      </div>
    );
  }

  return (
    <div id="quiz">
      {/* 기존의 Quiz에 모여있던 Component를 분리해서 key를 생략하면 key를 다른 컴포넌트에 중복 사용해서 경고가 뜨는 문제를 해결할 수 있음
       어째서? -> Quiz에서 해당 컴포넌트(Question)를 호출할 때의 key로 지정하면 해결가능함. */}
      <Question
        key={activeQuestionIndex}
        // keyIdx를 key라고 사용하면 안 돼. key prop은 리액트만 사용가능하고 사용자는 사용할 수 없어.
        keyIdx={activeQuestionIndex}
        onSkipAnswer={handleSkipAnswer}
        onSelectAnswer={handleSelectAnswer}
      />
    </div>
  );
};

export default Quiz;
