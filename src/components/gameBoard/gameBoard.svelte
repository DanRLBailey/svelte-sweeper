<script lang="ts">
	import MinesweeperButton from '$components/minesweeperButton/minesweeperButton.svelte';
	import { gameStore } from '../../stores/gameStores.svelte';
	import { createGrid, getNearbyMines, handleClick, handleRightClick } from '../../utils/Game';

	type GameBoardProps = {
		cols?: number;
		rows?: number;
		mineChance?: number;
		reset?: () => void;
	};

	let { cols = 20, rows = 20, mineChance = 12, reset = $bindable() }: GameBoardProps = $props();
	// let grid = $state<Grid>([]);
	let gameOver = $state<boolean>(false);

	$effect(() => {
		gameStore.reset(rows, cols, mineChance);
	});

	$effect(() => {
		gameOver = gameStore.grid.some((g) => g.some((t) => t.clickState == 'gameOver'));
	});

	const onClick = (e: MouseEvent, r: number, c: number) => {
		if (gameOver) return;

		e.preventDefault();
		if (e.button === 2) {
			gameStore.setGrid(handleRightClick(gameStore.grid, r, c));
		} else {
			gameStore.setGrid(handleClick(gameStore.grid, r, c));
		}
	};

	const resetGame = () => {
		gameStore.setGrid(createGrid(rows, cols, mineChance));
		gameOver = false;
	};

	reset = resetGame;
</script>

<div class="gameBoard" style={`--cols: ${cols}; --rows: ${rows}`}>
	{#each gameStore.grid as row, r}
		{#each row as tile, c}
			<MinesweeperButton
				mine={tile.hasMine}
				nearbyMines={getNearbyMines(gameStore.grid, r, c)}
				clickState={tile.clickState}
				onClick={(e) => onClick(e, r, c)}
			/>
		{/each}
	{/each}
</div>

<style lang="scss">
	.gameBoard {
		display: grid;
		width: fit-content;
		height: fit-content;
		grid-template-columns: repeat(var(--cols), 1fr);
		grid-template-rows: repeat(var(--rows), 1fr);
		padding: var(--spacing-0-5);
	}
</style>
