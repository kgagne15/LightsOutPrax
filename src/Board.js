import React, { useState } from "react";
import Cell from "./Cell";
import "./Board.css";

/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

function Board({ nrows, ncols, chanceLightStartsOn }) {
  const [board, setBoard] = useState(createBoard());

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */
  //this part I get
  function createBoard() {
    let initialBoard = [];
    // TODO: create array-of-arrays of true/false values

    for (let i =0; i < nrows; i++) {
      initialBoard.push([]);
      for (let j = 0; j < ncols; j++) {
        initialBoard[i].push(Math.random() < chanceLightStartsOn);
      }
    }
    return initialBoard;
  }

  function hasWon() {
    // TODO: check the board in state to determine whether the player has won.
    //return board.filter(c => c === true);
   return board.every(row => row.every(cell => !cell))
  }

  function flipCellsAround(coord) {
    setBoard(oldBoard => {
      //where are the x and y coming from?
      const [y, x] = coord.split("-").map(Number);

      const flipCell = (y, x, boardCopy) => {
        // if this coord is actually on board, flip it

        if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
          boardCopy[y][x] = !boardCopy[y][x];
        }
      };

      // TODO: Make a (deep) copy of the oldBoard

      let boardCopy = [...oldBoard];



      // TODO: in the copy, flip this cell and the cells around it
      //flipCell in copy
      //I don't know what this is doing or the purpose of it
      flipCell(y, x, boardCopy);
      flipCell(y, x-1, boardCopy);
      flipCell(y, x+1, boardCopy);
      flipCell(y-1, x, boardCopy);
      flipCell(y+1, x, boardCopy);
      

      // TODO: return the copy
      return boardCopy;
    });
  }

  // if the game is won, just show a winning msg & render nothing else

  // TODO, I don't think this is working but I don't know why
  if (hasWon()) {
    return <div>You win!</div>
  } 
  // make table board, what's the point of the tblboard if you already have board and boardCopy?
  let tblBoard = [];

  for (let y = 0; y < ncols; y++) {
    let row = [];
    for (let x = 0; x < nrows; x++){
      let coord = `${y}-${x}`;
      row.push(
        <Cell 
        key={coord}
        isLit={board[y][x]}
        flipCellsAroundMe={() => flipCellsAround(coord)}
        />
      )
    }
    tblBoard.push(<tr key={y}>{row}</tr>);
  }

  // TODO
  return (
    <table className="Board">
      <tbody>{tblBoard}</tbody>
    </table>
  )
}

export default Board;
