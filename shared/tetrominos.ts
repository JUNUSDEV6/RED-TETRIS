import type { Tetromino, TetrominoType } from './types';

// 7 piece Tetris(SRS)
export const PIECES: Record<TetrominoType, number[][][]> = {
	I: [[[0,0,0,0], [1,1,1,1], [0,0,0,0]]],
	O: [[[0,1,1], [0,1,1], [0,0,0]]],
	T: [[[0,1,0], [1,1,1], [0,0,0]]],
	S: [[[0,1,1], [1,1,1], [0,0,0]]],
	Z: [[[1,1,0], [1,1,1], [0,0,0]]],
	J: [[[1,0,0], [1,1,1], [0,0,0]]],
	L: [[[0,0,1], [1,1,1], [0,0,0]]]
};

// ROTATION function
export const rotatePiece = (piece: number[][], clockwise: boolean = true) : number[][] => {

	const	n = piece.length;
	const	rotated = Array(n).fill(0).map(() => Array(n).fill(0));

	for (let i = 0; i < n; i++){
		for (let j = 0; j < n; j++){
			if (clockwise)
				rotated[j][n - 1 - i] = piece[i][j];
			else
				rotated[n - 1 - j][i] = piece[i][j];
		}
	}
	return rotated;
}

// collision function

export const checkCollision = (board: number[][], piece: Tetromino): boolean => {

	for (let y = 0; y < piece.shape.length; y++){
		for (let x = 0; x < piece.shape[y].length; x++){
			if (piece.shape[y][x]){
				const newY = piece.y + y;
				const newX = piece.x + x;

				if (newY >= 20 || newX < 0 || newX >= 10 || (newY >= 0 && board[newY][newX]))
					return true;
			}
		}
	}
	return false;
}