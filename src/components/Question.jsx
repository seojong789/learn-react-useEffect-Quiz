import React, { useState } from 'react';
import QuestionTimer from './QuestionTimer';
import Answers from './Answers';
import QUESTIONS from '../questions';

// keyIdx를 key라고 사용하면 안 돼. key prop은 리액트만 사용가능하고 사용자는 사용할 수 없어.
const Question = ({ keyIdx, onSkipAnswer, onSelectAnswer }) => {
  const [answer, setAnswer] = useState({
    selectedAnswer: '',
    isCorrect: null,
  });

  let timer = 10000;
  if (answer.selectedAnswer) {
    timer = 1000;
  }

  // 사용자가 선택해서 정답 or 오답을 가진 상태라면 2000초 뒤에 다음 질문으로 넘어가기 떄문에, 2000으로 설정.
  if (answer.isCorrect !== null) {
    timer = 2000;
  }

  const handleSelectAnswer = (answer) => {
    setAnswer({
      selectedAnswer: answer,
      isCorrect: null,
    });

    setTimeout(() => {
      setAnswer({
        selectedAnswer: answer,
        // QUESTIONS[keyIdx].answers[0]는 현재 문제에 대한 정답을 의미함.
        isCorrect: answer === QUESTIONS[keyIdx].answers[0],
      });

      setTimeout(() => {
        onSelectAnswer(answer);
      }, 2000);
    }, 1000);
  };

  let answerState = '';
  if (answer.selectedAnswer && answer.isCorrect !== null) {
    answerState = answer.isCorrect ? 'correct' : 'wrong';
  } else if (answer.selectedAnswer) {
    answerState = 'answered';
  }

  return (
    // 기존의 Quiz에 모여있던 Component를 분리해서 key를 생략하면 key를 다른 컴포넌트에 중복 사용해서 경고가 뜨는 문제를 해결할 수 있음
    // 어째서? -> Quiz에서 해당 컴포넌트(Question)를 호출할 때의 key로 지정하면 해결가능함.
    <div id="question">
      <QuestionTimer
        // keyIdx={activeQuestionIndex}
        key={timer}
        timeout={timer}
        onTimeout={answer.selectedAnswer === '' ? onSkipAnswer : null}
        mode={answerState}
      />
      <h2>{QUESTIONS[keyIdx].text}</h2>
      <Answers
        // keyIdx={activeQuestionIndex}
        answers={QUESTIONS[keyIdx].answers}
        selectedAnswer={answer.selectedAnswer}
        answerState={answerState}
        onSelectAnswer={handleSelectAnswer}
      />
    </div>
  );
};

export default Question;
