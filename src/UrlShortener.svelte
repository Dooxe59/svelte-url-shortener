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
	<label>
		Url to short
		<input
			required
			placeholder="Enter url here"
			class="url-input"
			type="url"
			bind:value={url}
			on:input="{resetData}"/>
	</label>
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

</style>