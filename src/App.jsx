import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import StartScreen from './components/StartScreen'

import { wordsList } from './data/word'
import Game from './components/Game'
import GameOver from './components/GameOver'

function App() {
  const [count, setCount] = useState(0)

  const [pickedWord, setPickedWord] = useState("");
  const [pickedCategory, setPickedCategory] = useState("");


  const [pickedLetter, setPickedLetter] = useState([]);

  const [words] = useState(wordsList);

  const [guessedLetters, setGuessedLetters] = useState([])

  const [wrongLetters, setWrongLetters] = useState([])
  const [guesses, setGuesses] = useState(3);
  const [score, setScore] = useState(0);

  const gameStages = [
    { id: 0, name: "start" },
    { id: 1, name: "game" },
    { id: 2, name: "end" }
  ]

  const [stage, setStage] = useState(gameStages[0].name)

  const pickWordAndCategory = () => {
    const categorys = Object.keys(words)

    const category = categorys[Math.floor(Math.random() * categorys.length)]


    let listWords = []
    for (let value of words[category]) {
      listWords.push(value);
    }



    const word = listWords[Math.floor(Math.random() * listWords.length)]



    return { category, word }

  }

  const startGame = () => {
    let { category, word } = pickWordAndCategory();

    word = word.toUpperCase()
    let wordLetter = word.split("")
    setPickedWord(word)
    setPickedCategory(category)
    setPickedLetter(wordLetter)
    setStage(gameStages[1].name)
    
  }

  const verifyLetter = (letter) => {

    const normalizedLetter = letter.toUpperCase();
    if (guessedLetters.includes(normalizedLetter) || wrongLetters.includes(normalizedLetter)) {
      return;
    }



    if (pickedLetter.includes(normalizedLetter)) {
      setGuessedLetters((actualGuessedLetters) => [
        ...actualGuessedLetters,
        normalizedLetter
      ])




    }
    else {
      setWrongLetters((actualGuessedLetters) => [
        ...actualGuessedLetters,
        normalizedLetter
      ])

      setGuesses((actualGuesses) => actualGuesses - 1);
    }




  }

  const clearLetterStates = () => {
    setGuessedLetters([])
    setWrongLetters([])

  }

  useEffect(() => {
    if (guesses <= 0) {
      //need to set the stages
      clearLetterStates();
      setStage(gameStages[2].name);
    }
  }, [guesses])


  //check win

  useEffect(() => {
    const uniqueLetters = [...new Set(pickedLetter)]
    if ((guessedLetters.length === uniqueLetters.length) && uniqueLetters.length != 0) {
      console.log("o jogador ganhou");
      setScore((actualScore) => actualScore += 100);
      clearLetterStates();
      setGuesses(3)
      startGame();

    }
  }, [guessedLetters])

  const restart = () => {
    setGuesses(3)
    setScore(0)
    setStage(gameStages[0].name);
  }



  return (
    <>
      <div className='App'>
        {stage == 'start' && <StartScreen startGame={startGame} />}
        {stage == 'game' && <Game verifyLetter={verifyLetter} pickedWord={pickedWord} pickedCategory={pickedCategory} pickedLetter={pickedLetter} guessedLetters={guessedLetters} wrongLetters={wrongLetters} guesses={guesses} score={score} />}
        {stage == 'end' && <GameOver restart={restart} pontuacao={score} />}

      </div>

    </>
  )
}

export default App
