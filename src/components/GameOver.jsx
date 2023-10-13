import React from 'react'
import "./GameOver.css"
function GameOver({restart, pontuacao}) {
  return (
    <div>
        <h1>Fim de jogo!</h1>
        <h2>A sua pontuação foi de: <span>{pontuacao}</span></h2>
        <button onClick={restart}>Restart</button>
    </div>
  )
}

export default GameOver