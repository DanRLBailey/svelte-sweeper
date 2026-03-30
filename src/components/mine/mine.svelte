<script lang="ts">
	import Currency from '@tabler/icons-svelte/icons/currency';
</script>

<div class="mine">
	<Currency />
	<Currency />
</div>

<style lang="scss">
	.mine {
		width: 100%;
		height: 100%;
		position: relative;

		:global(svg) {
			position: absolute;
			inset: 0;
			margin: auto;
			fill: currentColor;
			width: 100%;
			height: 100%;
		}

		:global(svg:last-of-type) {
			transform: rotate(45deg);
		}
	}
</style>
