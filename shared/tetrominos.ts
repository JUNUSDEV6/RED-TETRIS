import type { Tetromino, TetrominoType } from './types';

// 7 piece Tetris(SRS)

export const PIECES: Record<TetrominoType, number[][][]> = {
	I: [[[0,0,0,0], [1,1,1,1], [0,0,0,0]]],
	0: [[[0, ]]]
}