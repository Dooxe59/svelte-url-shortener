<script>
	const newBaseUrl = 'https://rel.ink/';

	let isInvalid;
	let errorDetails;
	let url;
	let shortenedUrl;

	$: urlTrimmed = url ? url.trim() : '';
	$: disabledButtonTitle = !urlTrimmed ? 'Disabled action because url is empty' : '';

	function resetData() {
		isInvalid = false;
		errorDetails = null;
		shortenedUrl = '';
	}

	function shortUrl() {
		if(!url) return;

		const options = {
			method: 'POST',
			body: JSON.stringify({
				url,
			}),
			headers: {
				'Content-Type': 'application/json',
			},
		};

		fetch('https://rel.ink/api/links/', options)
			.then(res => {
				return res.json();
			})
			.then(data => {
				if(data && data.hashid) {
					isInvalid = false;
					shortenedUrl = newBaseUrl + data.hashid;
				} else {
					isInvalid = true;
					if(data && data.url && data.url.length) {
						errorDetails = data.url[0];
					}
				}
			})
			.catch(err => {
				isInvalid = true;
				errorDetails = err;
			});
	}
</script>

<main>
	<!-- https://codepen.io/finnhvman/pen/xyOORQ -->
	<div class="url-input">
		<label class="text-input">
			<input 
				placeholder=" "
				class="url-input"
				type="url"
				bind:value={url}
				on:input="{resetData}">
				<span>Url to short</span>
			</label>
		</div>
	<button
		disabled={!urlTrimmed}
		title={disabledButtonTitle}
		on:click={shortUrl}>Short Url !
	</button>

	{#if url}
		<h1>Base url: <a target="_blank" href={url}>{url}</a></h1>
		{#if shortenedUrl}
			<h1>Shortened url: <a target="_blank" href={shortenedUrl}>{shortenedUrl}</a></h1>
		{/if}
	{/if}

	{#if isInvalid}
		<h1>An error has occurred, please try again.</h1>
		<h2 class="error-label">{errorDetails}</h2>
	{/if}
</main>

<style>
	.url-input {
		width: 100%;
	}

	.error-label {
		color: #ff3e00;
	}




	.text-input {
		width: 100%;
    --pure-material-safari-helper1: rgb(var(--pure-material-primary-rgb, 33, 150, 243));
    position: relative;
    display: inline-block;
    padding-top: 6px;
    font-family: var(--pure-material-font, "Roboto", "Segoe UI", BlinkMacSystemFont, system-ui, -apple-system);
    font-size: 16px;
    line-height: 1.5;
    overflow: hidden;
}

/* Input, Textarea */
.text-input > input,
.text-input > textarea {
    box-sizing: border-box;
    margin: 0;
    border: solid 1px; /* Safari */
    border-color: rgba(var(--pure-material-onsurface-rgb, 0, 0, 0), 0.6);
    border-top-color: transparent;
    border-radius: 4px;
    padding: 15px 13px 15px;
    width: 100%;
    height: inherit;
    color: rgba(var(--pure-material-onsurface-rgb, 0, 0, 0), 0.87);
    background-color: transparent;
    box-shadow: none; /* Firefox */
    font-family: inherit;
    font-size: inherit;
    line-height: inherit;
    caret-color: rgb(var(--pure-material-primary-rgb, 33, 150, 243));
    transition: border 0.2s, box-shadow 0.2s;
}

/* Span */
.text-input > input + span,
.text-input > textarea + span {
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    border-color: rgba(var(--pure-material-onsurface-rgb, 0, 0, 0), 0.6);
    width: 100%;
    max-height: 100%;
    color: rgba(var(--pure-material-onsurface-rgb, 0, 0, 0), 0.6);
    font-size: 75%;
    line-height: 15px;
    cursor: text;
    transition: color 0.2s, font-size 0.2s, line-height 0.2s;
}

/* Corners */
.text-input > input + span::before,
.text-input > input + span::after,
.text-input > textarea + span::before,
.text-input > textarea + span::after {
    content: "";
    display: block;
    box-sizing: border-box;
    margin-top: 6px;
    border-top: solid 1px;
    border-top-color: rgba(var(--pure-material-onsurface-rgb, 0, 0, 0), 0.6);
    min-width: 10px;
    height: 8px;
    pointer-events: none;
    box-shadow: inset 0 1px transparent;
    transition: border-color 0.2s, box-shadow 0.2s;
}

.text-input > input + span::before,
.text-input > textarea + span::before {
    margin-right: 4px;
    border-left: solid 1px transparent;
    border-radius: 4px 0;
}

.text-input > input + span::after,
.text-input > textarea + span::after {
    flex-grow: 1;
    margin-left: 4px;
    border-right: solid 1px transparent;
    border-radius: 0 4px;
}

/* Hover */
.text-input:hover > input,
.text-input:hover > textarea {
    border-color: rgba(var(--pure-material-onsurface-rgb, 0, 0, 0), 0.87);
    border-top-color: transparent;
}

.text-input:hover > input + span::before,
.text-input:hover > textarea + span::before,
.text-input:hover > input + span::after,
.text-input:hover > textarea + span::after {
    border-top-color: rgba(var(--pure-material-onsurface-rgb, 0, 0, 0), 0.87);
}

.text-input:hover > input:not(:focus):placeholder-shown,
.text-input:hover > textarea:not(:focus):placeholder-shown {
    border-color: rgba(var(--pure-material-onsurface-rgb, 0, 0, 0), 0.87);
}

/* Placeholder-shown */
.text-input > input:not(:focus):placeholder-shown,
.text-input > textarea:not(:focus):placeholder-shown {
    border-top-color: rgba(var(--pure-material-onsurface-rgb, 0, 0, 0), 0.6);
}

.text-input > input:not(:focus):placeholder-shown + span,
.text-input > textarea:not(:focus):placeholder-shown + span {
    font-size: inherit;
    line-height: 68px;
}

.text-input > input:not(:focus):placeholder-shown + span::before,
.text-input > textarea:not(:focus):placeholder-shown + span::before,
.text-input > input:not(:focus):placeholder-shown + span::after,
.text-input > textarea:not(:focus):placeholder-shown + span::after {
    border-top-color: transparent;
}

/* Focus */
.text-input > input:focus,
.text-input > textarea:focus {
    border-color: rgb(var(--pure-material-primary-rgb, 33, 150, 243));
    border-top-color: transparent;
    box-shadow: inset 1px 0 var(--pure-material-safari-helper1), inset -1px 0 var(--pure-material-safari-helper1), inset 0 -1px var(--pure-material-safari-helper1);
    outline: none;
}

.text-input > input:focus + span,
.text-input > textarea:focus + span {
    color: rgb(var(--pure-material-primary-rgb, 33, 150, 243));
}

.text-input > input:focus + span::before,
.text-input > input:focus + span::after,
.text-input > textarea:focus + span::before,
.text-input > textarea:focus + span::after {
    border-top-color: var(--pure-material-safari-helper1) !important;
    box-shadow: inset 0 1px var(--pure-material-safari-helper1);
}

/* Disabled */
.text-input > input:disabled,
.text-input > input:disabled + span,
.text-input > textarea:disabled,
.text-input > textarea:disabled + span {
    border-color: rgba(var(--pure-material-onsurface-rgb, 0, 0, 0), 0.38) !important;
    border-top-color: transparent !important;
    color: rgba(var(--pure-material-onsurface-rgb, 0, 0, 0), 0.38);
    pointer-events: none;
}

.text-input > input:disabled + span::before,
.text-input > input:disabled + span::after,
.text-input > textarea:disabled + span::before,
.text-input > textarea:disabled + span::after {
    border-top-color: rgba(var(--pure-material-onsurface-rgb, 0, 0, 0), 0.38) !important;
}

.text-input > input:disabled:placeholder-shown,
.text-input > input:disabled:placeholder-shown + span,
.text-input > textarea:disabled:placeholder-shown,
.text-input > textarea:disabled:placeholder-shown + span {
    border-top-color: rgba(var(--pure-material-onsurface-rgb, 0, 0, 0), 0.38) !important;
}

.text-input > input:disabled:placeholder-shown + span::before,
.text-input > input:disabled:placeholder-shown + span::after,
.text-input > textarea:disabled:placeholder-shown + span::before,
.text-input > textarea:disabled:placeholder-shown + span::after {
    border-top-color: transparent !important;
}

/* Faster transition in Safari for less noticable fractional font-size issue */
@media not all and (min-resolution:.001dpcm) {
    @supports (-webkit-appearance:none) {
        .text-input > input,
        .text-input > input + span,
        .text-input > textarea,
        .text-input > textarea + span,
        .text-input > input + span::before,
        .text-input > input + span::after,
        .text-input > textarea + span::before,
        .text-input > textarea + span::after {
            transition-duration: 0.1s;
        }
    }
}
</style>