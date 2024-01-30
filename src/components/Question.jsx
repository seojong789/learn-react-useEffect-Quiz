import React from 'react';
import QuestionTimer from './QuestionTimer';
import Answers from './Answers';

const Question = ({
  onSkipAnswer,
  questionText,
  answers,
  onSelectAnswer,
  selectedAnswer,
  answerState,
}) => {
  return (
    // 기존의 Quiz에 모여있던 Component를 분리해서 key를 생략하면 key를 다른 컴포넌트에 중복 사용해서 경고가 뜨는 문제를 해결할 수 있음
    // 어째서? -> Quiz에서 해당 컴포넌트(Question)를 호출할 때의 key로 지정하면 해결가능함.
    <div id="question">
      <QuestionTimer
        // key={activeQuestionIndex}
        timeout={10000}
        onTimeout={onSkipAnswer}
      />
      <h2>{questionText}</h2>
      <Answers
        // key={activeQuestionIndex}
        answers={answers}
        selectedAnswer={selectedAnswer}
        answerState={answerState}
        onSelectAnswer={onSelectAnswer}
      />
    </div>
  );
};

export default Question;
