import { useState } from "react";

const startedBoard = Array(9).fill(null);

export function TicTacToe() {
	const [board, setBoard] = useState(startedBoard);
	const [currentPlayer, setCurrentPlayer] = useState("X");

	function handleClick(index) {
		if (board[index] === null) {
			const newBoard = [...board];
			newBoard[index] = currentPlayer;
			setBoard(newBoard);
			setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
		}
	}

	function handleRestart() {
		setBoard(startedBoard);
	}

	function checkWin() {
		const winningLines = [
			[0, 1, 2],
			[3, 4, 5],
			[6, 7, 8],
			[0, 3, 6],
			[1, 4, 7],
			[2, 5, 8],
			[0, 4, 8],
			[2, 4, 6],
		];

		for (let i = 0; i < winningLines.length; i++) {
			const [a, b, c] = winningLines[i];
			if (board[a] && board[a] === board[b] && board[b] === board[c]) {
				return board[a];
			}
		}
		if (board.every((cell) => cell !== null)) {
			return "tie";
		}
		return null;
	}

	const winner = checkWin();

	return (
		<div className="flex flex-col items-center justify-center h-screen bg-background">
			<h1 className="text-3xl font-bold mb-8">Tic Tac Toe</h1>
			<div className="grid grid-cols-3 gap-4">
				{board.map((cell, index) => (
					<button
						key={index}
						className={`w-20 h-20 bg-card text-card-foreground rounded-md flex items-center justify-center text-4xl font-bold cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground ${
							cell === "X"
								? "text-primary"
								: cell === "O"
								? "text-secondary"
								: ""
						} ${winner ? "cursor-not-allowed" : ""}`}
						onClick={() => handleClick(index)}
						disabled={winner}>
						{cell}
					</button>
				))}
			</div>
			{winner && (
				<>
					<div className="mt-8 text-2xl font-bold">
						{winner === "tie" ? "It's a tie!" : `Player ${winner} wins!`}
					</div>
					<div className="mt-5">
						<button
							className="bg-card text-white font-semibold transition-colors hover:bg-accent w-[150px] py-1"
							onClick={handleRestart}>
							Restart
						</button>
					</div>
				</>
			)}
		</div>
	);
}
