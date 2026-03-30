<script lang="ts">
	import type { Snippet } from 'svelte';

	type InputProps = {
		value: string | number;
		label?: string;
		prefixElement?: Snippet;
		suffixElement?: Snippet;
		disabled?: boolean;
	};

	let { value = $bindable(), label, prefixElement, suffixElement, disabled }: InputProps = $props();
</script>

<div class="inputContainer">
	{#if label}
		<label for={`${label.toString()}-input`}>{label}</label>
	{/if}
	<div class="input">
		{#if prefixElement}
			{@render prefixElement()}
		{/if}
		<input bind:value {disabled} />
		{#if suffixElement}
			{@render suffixElement()}
		{/if}
	</div>
</div>

<style lang="scss">
	.inputContainer {
		display: flex;
		flex-direction: column;

		label {
			font-size: 0.9rem;
			padding-inline-start: var(--spacing-0-5);
		}

		.input {
			display: flex;
			flex-direction: row;
			background-color: light-dark(#fff, rgba(0, 0, 0, 0.25));
			border: var(--border);
			border-radius: var(--radius-max);
			padding: var(--spacing-0-25);
			gap: var(--spacing-0-5);

			input,
			:global(button) {
				background-color: transparent;
				border: none;
				border-radius: var(--radius-max);
			}

			input {
				width: 4rem;
				padding-inline: var(--spacing-0-5);
				text-align: center;
				flex: 1;

				&:focus-visible {
					outline: var(--border-2-primary);
				}
			}

			:global(button) {
				width: 1.5rem;
				height: 1.5rem;
			}
		}
	}
</style>
