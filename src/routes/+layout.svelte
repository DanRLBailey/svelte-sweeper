<script lang="ts">
	import Navbar from '$components/navbar/navbar.svelte';
	import favicon from '$lib/assets/favicon.svg';
	import '../app.scss';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<title>Svelte Sweeper</title>
</svelte:head>

<Navbar />
<main>
	{@render children()}
</main>

<style lang="scss">
	main {
		width: 100dvw;
		display: flex;
		justify-content: center;
		padding-top: var(--spacing);
	}
</style>
