export type ClickedState = 'default' | 'flagged' | 'clicked' | 'gameOver';

export type Tile = {
	hasMine: boolean;
	clickState: ClickedState;
};

export type Grid = Tile[][];

const shuffle = <T>(arr: T[]): T[] => {
	for (let i = arr.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[arr[i], arr[j]] = [arr[j], arr[i]];
	}
	return arr;
};

export const createGrid = (rows: number, cols: number, mineChance: number) => {
	const totalTiles = cols * rows;
	const minePercentage = mineChance / 100;
	let mineCount = Math.floor(totalTiles * minePercentage);

	console.log('no of rows', rows);

	const mines = shuffle(Array.from({ length: totalTiles }, (_, i) => i < mineCount));

	return Array.from({ length: rows }, (_, row) =>
		Array.from({ length: cols }, (_, col) => ({
			hasMine: mines[row * cols + col],
			clickState: 'default'
		}))
	) as Grid;
};

export const getNearbyMines = (grid: Grid, row: number, col: number): number => {
	const directions = [
		[-1, -1],
		[-1, 0],
		[-1, 1],
		[0, -1],
		[0, 1],
		[1, -1],
		[1, 0],
		[1, 1]
	];

	return directions.reduce((count, [dr, dc]) => {
		const r = row + dr;
		const c = col + dc;
		const inBounds = r >= 0 && r < grid.length && c >= 0 && c < grid[0].length;
		return count + (inBounds && grid[r][c].hasMine ? 1 : 0);
	}, 0);
};

export const revealTiles = (grid: Grid, row: number, col: number): Grid => {
	const newGrid = grid.map((r) => r.map((t) => ({ ...t })));

	const reveal = (r: number, c: number) => {
		const inBounds = r >= 0 && r < newGrid.length && c >= 0 && c < newGrid[0].length;
		if (!inBounds) return;

		const tile = newGrid[r][c];
		if (tile.clickState !== 'default') return;
		if (tile.hasMine) return;

		tile.clickState = 'clicked';

		if (getNearbyMines(newGrid, r, c) === 0) {
			const directions = [
				[-1, -1],
				[-1, 0],
				[-1, 1],
				[0, -1],
				[0, 1],
				[1, -1],
				[1, 0],
				[1, 1]
			];
			directions.forEach(([dr, dc]) => reveal(r + dr, c + dc));
		}
	};

	reveal(row, col);
	return newGrid;
};

export const handleClick = (grid: Grid, row: number, col: number): Grid => {
	const tile = grid[row][col];
	if (tile.clickState === 'flagged') return grid;

	if (tile.hasMine) {
		return grid.map((r, ri) =>
			r.map((t, ci) => {
				if (ri === row && ci === col) return { ...t, clickState: 'gameOver' as ClickedState };
				if (t.hasMine) return { ...t, clickState: 'clicked' as ClickedState };
				return t;
			})
		);
	}

	return revealTiles(grid, row, col);
};

export const handleRightClick = (grid: Grid, row: number, col: number): Grid => {
	const tile = grid[row][col];
	if (tile.clickState === 'clicked') return grid;

	const newState: ClickedState = tile.clickState === 'flagged' ? 'default' : 'flagged';

	return grid.map((r, ri) =>
		r.map((t, ci) => (ri === row && ci === col ? { ...t, clickState: newState } : t))
	);
};
