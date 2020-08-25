<script>
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	export let value;
	export let label;

	const onKeyUp = (event) => {
		if(event && event.key && event.key === 'Enter') {
			dispatch('press-enter');
		}
	};
</script>

<main>
	<div class="url-input">
		<label class="text-input">
			<input
				placeholder=" "
				class="url-input"
				type="url"
				value={value}
				on:input
				on:keyup={onKeyUp}/>
			<span>
				{label}
			</span>
		</label>
	</div>
</main>

<style>

	.text-input {
		width: 100%;
		position: relative;
		display: inline-block;
		padding-top: 6px;
		font-size: 16px;
		line-height: 1.5;
		overflow: hidden;
	}

	.text-input > input {
		box-sizing: border-box;
		margin: 0;
		border: solid 1px; /* Safari */
		border-color: rgba(0, 0, 0, 0.6);
		border-top-color: transparent;
		border-radius: 4px;
		padding: 15px 13px 15px;
		width: 100%;
		height: inherit;
		color: rgba(0, 0, 0, 0.87);
		background-color: transparent;
		box-shadow: none;
		font-family: inherit;
		font-size: inherit;
		line-height: inherit;
		transition: border 0.2s, box-shadow 0.2s;
	}

	/* Span */
	.text-input > input + span {
		position: absolute;
		top: 0;
		left: 0;
		display: flex;
		border-color: rgba(0, 0, 0, 0.6);
		width: 100%;
		max-height: 100%;
		color: rgba(0, 0, 0, 0.6);
		font-size: 75%;
		line-height: 15px;
		cursor: text;
		transition: color 0.2s, font-size 0.2s, line-height 0.2s;
	}

	/* Corners */
	.text-input > input + span::before,
	.text-input > input + span::after {
		content: "";
		display: block;
		box-sizing: border-box;
		margin-top: 6px;
		border-top: solid 1px;
		border-top-color: rgba(0, 0, 0, 0.6);
		min-width: 10px;
		height: 8px;
		pointer-events: none;
		box-shadow: inset 0 1px transparent;
		transition: border-color 0.2s, box-shadow 0.2s;
	}

	.text-input > input + span::before {
		margin-right: 4px;
		border-left: solid 1px transparent;
		border-radius: 4px 0;
	}

	.text-input > input + span::after {
		flex-grow: 1;
		margin-left: 4px;
		border-right: solid 1px transparent;
		border-radius: 0 4px;
	}

	/* Hover */
	.text-input:hover > input {
		border-color: rgba(var(--pure-material-onsurface-rgb, 0, 0, 0), 0.87);
		border-top-color: transparent;
	}

	.text-input:hover > input + span::before,
	.text-input:hover > input + span::after {
		border-top-color: rgba(var(--pure-material-onsurface-rgb, 0, 0, 0), 0.87);
	}

	.text-input:hover > input:not(:focus):placeholder-shown{
		border-color: rgba(0, 0, 0, 0.87);
	}

	/* Placeholder-shown */
	.text-input > input:not(:focus):placeholder-shown  {
		border-top-color: rgba(var(--pure-material-onsurface-rgb, 0, 0, 0), 0.6);
	}

	.text-input > input:not(:focus):placeholder-shown + span {
		font-size: inherit;
		line-height: 68px;
	}

	.text-input > input:not(:focus):placeholder-shown + span::before
	.text-input > input:not(:focus):placeholder-shown + span::after {
		border-top-color: transparent;
	}

	/* Focus */
	.text-input > input:focus {
		border-color: #ff3e00;
		border-top-color: transparent;
		outline: none;
	}

	.text-input > input:focus + span {
		color: #ff3e00;
	}

	.text-input > input:focus + span::before,
	.text-input > input:focus + span::after {
		border-top-color: #ff3e00 !important;
	}

	.text-input > input:disabled,
	.text-input > input:disabled + span {
		border-color: rgba(0, 0, 0, 0.38) !important;
		border-top-color: transparent !important;
		color: rgba(0, 0, 0, 0.38);
		pointer-events: none;
	}

	.text-input > input:disabled + span::before,
	.text-input > input:disabled + span::after {
		border-top-color: rgba(0, 0, 0), 0.38 !important;
	}

	.text-input > input:disabled:placeholder-shown,
	.text-input > input:disabled:placeholder-shown + span {
		border-top-color: rgba(0, 0, 0, 0.38) !important;
	}

	.text-input > input:disabled:placeholder-shown + span::before,
	.text-input > input:disabled:placeholder-shown + span::after {
		border-top-color: transparent !important;
	}

	/* Faster transition in Safari for less noticable fractional font-size issue */
	@media not all and (min-resolution:.001dpcm) {
		@supports (-webkit-appearance:none) {
			.text-input > input,
			.text-input > input + span
			.text-input > input + span::before,
			.text-input > input + span::after {
					transition-duration: 0.1s;
			}
		}
	}
</style>