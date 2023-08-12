import logo from './logo.svg';
import './App.css';
import {useEffect, useState} from "react";

const rows = 20;
const columns = 30;


let speedX = 0
let speedY = 0

let lastSpeedX = 0
let lastSpeedY = 0

let snakeX
let snakeY

let foodX = 2;
let foodY = 4;

let snakeBody = []

let gameOver = false








function placeFood() {
    // in x coordinates.
    foodX = Math.floor(Math.random() * columns)
    //in y coordinates.
    foodY = Math.floor(Math.random() * rows)
}


function Square({isBlue}) {

    return <button className={isBlue}></button>
}




function Board() {
    const [colors, setColors] = useState(Array(columns * rows).fill("WhiteSquare"))
    const [highScore, setHighScore] = useState()
    let score = 0

    function changeDirection(e) {
        if (gameOver) {
            StartGame()
        }
        if (e.code === "ArrowUp" && lastSpeedY !== 1) {
            // If up arrow key pressed with this condition...
            // snake will not move in the opposite direction
            speedX = 0;
            speedY = -1;
        }
        else if (e.code === "ArrowDown" && lastSpeedY !== -1) {
            //If down arrow key pressed
            speedX = 0;
            speedY = 1;
        }
        else if (e.code === "ArrowLeft" && lastSpeedX !== 1) {
            //If left arrow key pressed
            speedX = -1;
            speedY = 0;
        }
        else if (e.code === "ArrowRight" && lastSpeedX !== -1) {
            //If Right arrow key pressed
            speedX = 1;
            speedY = 0;
        }
    }

    function squareColors() {
        let newColors = Array(columns * rows).fill("WhiteSquare")
        for (let i = 0; i < snakeBody.length; i++) {
            let x = snakeBody[i][0]
            let y = snakeBody[i][1]
            let ind = (y * columns) + x
            console.log(`setting index : ${x},${y} to blue`)
            newColors[ind] = "BlueSquare"
        }
        newColors[(snakeY * columns) + snakeX] = "BlueSquare"

        newColors[(foodY * columns) + foodX] = "YellowSquare"
        setColors(newColors)
    }


    useEffect(() => {
        snakeX = Math.floor(Math.random() * columns)
        snakeY = Math.floor(Math.random() * rows)
        snakeBody.push([snakeX,snakeY])
        placeFood();
        squareColors();
        setInterval(move, 1000/5);
    }, []);



    function move() {
        if (gameOver) {
            return
        }

        if  (speedY !== 0 || speedX !== 0) {
            snakeX += speedX
            snakeY += speedY

            lastSpeedX = speedX
            lastSpeedY = speedY
            
            if (snakeX === foodX && snakeY === foodY) {
                placeFood()
            } else {
                snakeBody.shift()
            }
            console.log(snakeBody)

            snakeBody.push([snakeX, snakeY])




            if (snakeX > columns || snakeX < 0 || snakeY > rows || snakeY < 0) {
                gameOver = true

                setHighScore(snakeBody.length)
            }

            for (let i = 0; i < snakeBody.length - 1; i++) {
                if (snakeX === snakeBody[i][0] && snakeY === snakeBody[i][1]) {
                    gameOver = true;
                    setHighScore(snakeBody.length)
                }
            }
            if (!gameOver) {
                squareColors()
            }

        }

    }

    useEffect(() => {
        window.addEventListener('keydown', changeDirection)
    });


    function StartGame() {
        if (gameOver) {
            placeFood();
            snakeX = Math.floor(Math.random() * columns)
            snakeY = Math.floor(Math.random() * rows)
            speedY = 0
            speedX = 0
            lastSpeedY = 0
            lastSpeedX = 0
            snakeBody = []
            snakeBody.push([snakeX,snakeY])
            squareColors();
            gameOver = false
        }

    }


    return (
        <>
        <header className={"App-header"}>
            <div>
                <h1>{!gameOver ? "Play Snake" : "Game Over!"}</h1>
                <h2>Score: {highScore}</h2>
                {gameOver && <button onClick={StartGame}>Play Again</button>}
            </div>
            <div className={"Row"}>
                {Array.from({ length: rows * columns }, (_, index) => (
                    <Square key={index} isBlue={colors[index]}/>
                ))}
            </div>


        </header>
        </>
    );
}

export default Board;
