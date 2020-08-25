<script>
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	export let label;
	export let title;
	export let isDisabled;

	const onClick = () => dispatch('onClick');
</script>

<main>
	<button
		class="button"
		disabled={isDisabled}
		title={title}
		on:click={onClick}>
		{label}
	</button>
</main>

<style>
	
	.button {
		position: relative;
		display: inline-block;
		box-sizing: border-box;
		border: none;
		border-radius: 4px;
		padding: 0 16px;
		min-width: 64px;
		height: 36px;
		vertical-align: middle;
		text-align: center;
		text-overflow: ellipsis;
		text-transform: uppercase;
		color: rgb(255, 255, 255);
		background-color: #ff3e00;
		/* box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12); */
		font-size: 14px;
		font-weight: 500;
		line-height: 36px;
		overflow: hidden;
		outline: none;
		cursor: pointer;
		transition: box-shadow 0.2s;
	}

	.button:active {
		background-color: #ff3e00;
		box-shadow: 0 5px 5px -3px rgba(0, 0, 0, 0.2), 0 8px 10px 1px rgba(0, 0, 0, 0.14), 0 3px 14px 2px rgba(0, 0, 0, 0.12);
	}

	.button::before {
		content: "";
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		background-color: #ff6600;
		opacity: 0;
		transition: opacity 0.2s;
	}

	.button::after {
		content: "";
		position: absolute;
		left: 50%;
		top: 50%;
		border-radius: 50%;
		padding: 50%;
		width: 32px; /* Safari */
		height: 32px; /* Safari */
		background-color: #ff6600;
		opacity: 0;
		transform: translate(-50%, -50%) scale(1);
		transition: opacity 1s, transform 0.5s;
	}

	.button:hover,
	.button:focus {
		box-shadow: 0 2px 4px -1px rgba(0, 0, 0, 0.2), 0 4px 5px 0 rgba(0, 0, 0, 0.14), 0 1px 10px 0 rgba(0, 0, 0, 0.12);
	}

	.button:disabled {
		color: rgba(0, 0, 0, 0.38);
		background-color: rgba(0, 0, 0, 0.12);
		box-shadow: none;
		cursor: initial;
	}

</style>