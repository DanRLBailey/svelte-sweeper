<script lang="ts">
	import { IconMoonFilled, IconSunFilled } from '@tabler/icons-svelte';

	let theme: 'light' | 'dark' = $state('dark');

	const toggleTheme = () => {
		theme = theme === 'light' ? 'dark' : 'light';
		document.documentElement.setAttribute('data-theme', theme);
	};
</script>

<nav class="flex-row">
	<span>SvelteSweeper</span>
	<button onclick={toggleTheme}>
		{#if theme == 'dark'}
			<IconSunFilled />
		{:else}
			<IconMoonFilled />
		{/if}
	</button>
</nav>

<style lang="scss">
	nav {
		padding: var(--spacing-0-5) var(--spacing);
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		border-bottom: var(--border);
	}
</style>
