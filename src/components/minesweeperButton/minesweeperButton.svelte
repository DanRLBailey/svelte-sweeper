<script lang="ts">
	import Flag2Filled from '@tabler/icons-svelte/icons/flag-2-filled';
	import type { ClickedState } from '../../utils/Game';
	import Mine from '$components/mine/mine.svelte';

	type MinesweeperButtonProps = {
		mine?: boolean;
		nearbyMines?: number;
		clickState: ClickedState;
		onClick: (e: MouseEvent) => void;
	};

	let { mine, nearbyMines, clickState, onClick }: MinesweeperButtonProps = $props();
</script>

{#if clickState == 'default' || clickState == 'flagged'}
	<button aria-label="minesweeper-button-x-y" onclick={onClick} oncontextmenu={onClick}>
		{#if clickState == 'flagged'}
			<Flag2Filled />
		{/if}
	</button>
{:else}
	<div
		class="tile"
		data-nearby={mine ? 0 : (nearbyMines ?? null)}
		data-mine={mine}
		data-game-over={clickState == 'gameOver'}
	>
		{#if mine}
			<Mine />
		{:else if nearbyMines}
			{nearbyMines}
		{/if}
	</div>
{/if}

<style lang="scss">
	button,
	.tile {
		width: 2rem;
		height: 2rem;
		border-radius: 0;
		border: var(--border);
		display: flex;
		justify-content: center;
		align-items: center;
		padding: var(--spacing-0-25);
	}

	button {
		background-color: light-dark(rgba(0, 0, 0, 0.3), rgba(255, 255, 255, 0.6));

		&:hover {
			z-index: 10;
		}

		:global(svg) {
			color: #000;
		}
	}

	.tile {
		font-weight: bold;
		position: relative;

		&[data-mine='true'][data-game-over='true'] {
			background-color: light-dark(#ff0000, #ff6666);
		}
		&[data-nearby='1'] {
			color: light-dark(#0000ff, #6699ff);
		}
		&[data-nearby='2'] {
			color: light-dark(#008000, #66ff66);
		}
		&[data-nearby='3'] {
			color: light-dark(#ff0000, #ff6666);
		}
		&[data-nearby='4'] {
			color: light-dark(#000080, #6666ff);
		}
		&[data-nearby='5'] {
			color: light-dark(#800000, #ff6666);
		}
		&[data-nearby='6'] {
			color: light-dark(#008080, #66ffff);
		}
		&[data-nearby='7'] {
			color: light-dark(#000000, #ffffff);
		}
		&[data-nearby='8'] {
			color: light-dark(#808080, #dddddd);
		}
	}

	@media (max-width: 768px) {
		button,
		.tile {
			width: 1.5rem;
			height: 1.5rem;
		}
	}
</style>
