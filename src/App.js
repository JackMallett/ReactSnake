import logo from './logo.svg';
import './App.css';
import {useEffect, useState} from "react";

const rows = 20;
const columns = 30;


let speedX = 0
let speedY = 0

let snakeX = 5
let snakeY = 4

let foodX = 5;
let foodY = 5;

let snakeBody = [[5,4]]

let gameOver = false

function changeDirection(e) {
    if (e.code === "ArrowUp" && speedY !== 1) {
        // If up arrow key pressed with this condition...
        // snake will not move in the opposite direction
        speedX = 0;
        speedY = -1;
    }
    else if (e.code === "ArrowDown" && speedY !== -1) {
        //If down arrow key pressed
        speedX = 0;
        speedY = 1;
    }
    else if (e.code === "ArrowLeft" && speedX !== 1) {
        //If left arrow key pressed
        speedX = -1;
        speedY = 0;
    }
    else if (e.code === "ArrowRight" && speedX !== -1) {
        //If Right arrow key pressed
        speedX = 1;
        speedY = 0;
    }
    console.log(`Changed speed to [${speedX}, ${speedY}]`)
}




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
    const [blue, setBlue] = useState("WhiteSquare")
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


    // useEffect(() => {
    //     placeFood()
    //     // snakeX = Math.floor(Math.random() * columns)
    //     // snakeY = Math.floor(Math.random() * rows)
    //     // snakeBody.push([snakeX, snakeY])
    //     squareColors();
    // }, []);


    function move() {
        console.log("called move")
        if (gameOver || (speedX === 0 && speedY === 0)) {
            return
        }


        snakeX += speedX
        snakeY += speedY

        snakeBody.push([snakeX, snakeY])


        if (snakeX === foodX && snakeY === foodY) {
            placeFood()
        } else {
            snakeBody.shift()
        }
        console.log(snakeBody)


        squareColors()


        if (snakeX > columns || snakeX < 0 || snakeY > rows || snakeY < 0) {
            gameOver = true
            alert("gameover")
        }

        for (let i = 0; i < snakeBody.length - 1; i++) {
            if (snakeX === snakeBody[i][0] && snakeY === snakeBody[i][1]) {
                gameOver = true;
                alert("gameover");
            }
        }

    }

    useEffect(() => {
        window.addEventListener('keydown', changeDirection)
    });


    setTimeout(move, 1000/5)

    return (
        <>
        <header className={"App-header"}>
            <div className={"Row"}>
                {Array.from({ length: rows * columns }, (_, index) => (
                    <Square key={index} isBlue={colors[index]}/>
                ))}
            </div>

            <button onClick={squareColors}>Press me</button>

        </header>
        </>
    );
}

export default Board;
