// src/stores/gameStore.svelte.ts
import { createGrid, type Grid } from '../utils/Game';

const state = $state({
	grid: [] as Grid,
	cols: 10,
	rows: 10,
	mineChance: 12
});

export const gameStore = {
	get grid() {
		return state.grid;
	},
	get cols() {
		return state.cols;
	},
	get rows() {
		return state.rows;
	},
	get mineChance() {
		return state.mineChance;
	},
	set cols(v: number) {
		state.cols = v;
	},
	set rows(v: number) {
		state.rows = v;
	},
	set mineChance(v: number) {
		state.mineChance = v;
	},
	reset(rows?: number, cols?: number, mineChance?: number) {
		state.grid = createGrid(rows ?? state.rows, cols ?? state.cols, mineChance ?? state.mineChance);
	},
	setGrid(newGrid: Grid) {
		state.grid = newGrid;
	}
};
