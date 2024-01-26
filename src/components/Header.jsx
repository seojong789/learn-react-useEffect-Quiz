import React from 'react';
import logoImg from '../assets/quiz-logoImg.png';

const Header = () => {
  return (
    <header>
      <img src={logoImg} alt="Quiz logoImg" />
      <h1>ReactQuiz</h1>
    </header>
  );
};

export default Header;
