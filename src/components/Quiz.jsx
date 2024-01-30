import React, { useState, useCallback } from 'react';
import quizCompleteImg from '../assets/quiz-complete.png';
import QUESTIONS from '../questions';
import Question from './Question';

const Quiz = () => {
  const [answerState, setAnswerState] = useState('unanswered');
  const [userAnswers, setUserAnswers] = useState([]);

  // 다음 질문의 index 번호를 의미하는 변수.
  // userAnswers 상태에서 파생시켜 값을 얻을 수 있기 때문에, 별도의 상태로 만들 필요가 없음.
  // 가령, 첫 번째 문제의 경우 userAnswers.length의 값은 0이기 때문에 0에 해당하는 위치에 값을 저장하고
  // 두 번째 문제의 경우 userAnswers.length의 값은 1 -> [1]에 값 저장.
  // 사용자가 보기를 선택하면 틀렸는지 맞았는지에 따라 색깔을 보여주고 다음 문제로 넘어가고 싶어.
  // 따라서, 아직 보기를 선택하지 않았다면(unanswered 라면) 현재 그 상태로 그대로 있는데 (userAnswers.length)
  // 만약 보기를 선택했다면 -> userAnswers.length의 값이 1이 증가한 상태(다음문제)인데, 이전 문제에 대해 틀렸는지 맞았는지를 보여줘야 해서 -1로 이전 문제를 유지시킴.
  const activeQuestionIndex =
    answerState === 'unanswered' ? userAnswers.length : userAnswers.length - 1;

  const quizIsComplete = activeQuestionIndex === QUESTIONS.length;

  const handleSelectAnswer = useCallback(
    (selectedAnswer) => {
      setAnswerState('answered');
      setUserAnswers((prevAnswers) => {
        return [...prevAnswers, selectedAnswer];
      });

      setTimeout(() => {
        if (selectedAnswer === QUESTIONS[activeQuestionIndex].answers[0]) {
          // 사용자가 선택한 답안이, 해당 문제에 대한 첫 번째 항목(정답)과 같다면 정답처리
          setAnswerState('correct');
        } else {
          setAnswerState('wrong');
        }

        // 바로 위의 답안이 맞는지 틀렸는지를 확인하는 타이머가 끝난 직후에 바로 실행되는 타이머
        setTimeout(() => {
          // 선택한 보기가 틀렸는지 맞았는지 타이머로 보여준 뒤, 다음 문제를 위해서 다시 unanswered로 변경해줌.
          // 위의 activeQuestionIndex = answerState === 'unanswered' ? userAnswers.length : userAnswers.length - 1; 코드에 의해
          // userAnswers의 값은 사용자가 보기를 선택한 시점에서 이미 1증가 했으니 다음 문제를 가리키고 있음.
          // 그래서 다시 unanswered로 만들어주면 다음 문제로 넘어가게 되는 로직.
          setAnswerState('unanswered');
        }, 2000);
      }, 1000);
    },
    [activeQuestionIndex]
  );

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
        onSkipAnswer={handleSkipAnswer}
        questionText={QUESTIONS[activeQuestionIndex].text}
        answers={QUESTIONS[activeQuestionIndex].answers}
        answerState={answerState}
        selectedAnswer={userAnswers[userAnswers.length - 1]}
        onSelectAnswer={handleSelectAnswer}
      />
    </div>
  );
};

export default Quiz;
