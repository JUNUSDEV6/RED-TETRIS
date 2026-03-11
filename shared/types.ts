// types commun for ALL players

export interface Player {
	id: string;
	name: string;
	board: number[][];	//grille 20x10 (0 = vide, 1=bloc)
	spectrum: number[];	// Hauteur de chaque colonne [0..10]
}

export	interface Tetromino {
	shape: number[][];		//forme 4x4
	x: number;
	y: number;
	rotation: 0 | 1 | 2 | 3;
}

export type TetrominoType = 'I' | 'O' | 'T' | 'S' | 'Z' | 'J' | 'L';

export	interface GameState {
	players: Record<string, Player>;
	currentPieceIndex: number;
	gameStarted: boolean;
	hostId: string;
}