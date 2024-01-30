import React, { useRef } from 'react';

const Answers = ({ answers, selectedAnswer, answerState, onSelectAnswer }) => {
  const shuffledAnswers = useRef();

  // 다음 문제에 대한 보기를 뒤섞어야함. -> questions.js 파일에서 각 문제의 답을 항상 1번으로 해뒀기 때문.
  // const shuffledAnswers = [...QUESTIONS[activeQuestionIndex].answers];
  // 왜 참조를 사용하냐? -> sort의 코드는 해당 컴포넌트가 재렌더링되면 다시 실행되는데,
  // 사용자가 보기를 선택했을 때, 하이라이트 강조를 위해 상태를 업데이트 시킴. -> 즉 재렌더링되어서 보기가 다시 뒤섞여서 원래 선택했던 보기가 4번인데, 4번 보기가 1번으로 이동하는 문제가 발생함. 이를 해결하기 위함.
  // !shuffledAnswers.current -> 정의되지 않은 상태(undefined)라면.. : useRef의 초기 상태는 undefined
  // 즉, 선택한 다음에는 shuffledAnswers.current의 값이 undefined가 아니라서 sort를 수행하지 않음. 문제해결!
  if (!shuffledAnswers.current) {
    shuffledAnswers.current = [...answers];
    shuffledAnswers.current.sort(() => Math.random() - 0.5);
  }

  return (
    <ul id="answers">
      {shuffledAnswers.current.map((answer) => {
        // userAnswers[userAnswers.length - 1] (=selectedAnswer)의 값은 사용자가 가장 최근에 푼 문제에 대한 answer
        // 즉, 해당 값과 shuffledAnswers.map의 answer이 같다면 잘 선택된 것이라고 판단할 수 있음.
        const isSelected = selectedAnswer === answer;
        let cssClass = '';

        // 보기들 중에서 선택했을 경우의 css 설정.
        if (answerState === 'answered' && isSelected) {
          cssClass = 'selected';
        }

        // 보기들 중에서 선택한 값이 정답 or 오답이였을 때의 css 설정.
        if (
          (answerState === 'correct' || answerState === 'wrong') &&
          isSelected
        ) {
          cssClass = answerState; // answerState에 correct || wrong이 저장되어 있음.
        }
        return (
          <li key={answer} className="answer">
            <button
              onClick={() => onSelectAnswer(answer)}
              className={cssClass}
              disabled={answerState !== ''}
            >
              {answer}
            </button>
          </li>
        );
      })}
    </ul>
  );
};

export default Answers;
