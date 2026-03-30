<script lang="ts">
	import GameBoard from '$components/gameBoard/gameBoard.svelte';
	import Input from '$components/input/input.svelte';

	let resetGame: () => void = $state(() => {});
	let rows = $state<number>(20);
	let cols = $state<number>(20);
	let mineChance = $state<number>(12);
</script>

<div class="gameContainer">
	<div class="header"></div>
	<div class="controls">
		<Input bind:value={rows} label="Rows">
			{#snippet prefixElement()}
				<button onclick={() => rows--}>-</button>
			{/snippet}
			{#snippet suffixElement()}
				<button onclick={() => rows++}>+</button>
			{/snippet}
		</Input>
		<Input bind:value={cols} label="Columns">
			{#snippet prefixElement()}
				<button onclick={() => cols--}>-</button>
			{/snippet}
			{#snippet suffixElement()}
				<button onclick={() => cols++}>+</button>
			{/snippet}
		</Input>
		<Input bind:value={mineChance} label="Mine chance (%)">
			{#snippet prefixElement()}
				<button onclick={() => mineChance--}>-</button>
			{/snippet}
			{#snippet suffixElement()}
				<button onclick={() => mineChance++}>+</button>
			{/snippet}
		</Input>
		<button onclick={resetGame}>Reset</button>
	</div>
	<GameBoard bind:reset={resetGame} {rows} {cols} {mineChance} />
</div>

<style lang="scss">
	.gameContainer {
		width: fit-content;
		max-width: 100dvw;
		display: flex;
		flex-direction: column;
		align-items: center;
		border: var(--border);
		border-radius: var(--radius);

		.controls {
			display: flex;
			flex-direction: row;
			align-items: flex-end;
			width: 100%;
			gap: var(--spacing);
			padding: var(--spacing);
			border-bottom: var(--border);
		}
	}

	@media (max-width: 768px) {
		.gameContainer {
			.controls {
				display: grid;
				grid-template-columns: 1fr 1fr;
				gap: var(--spacing-0-25);
			}
		}
	}
</style>
