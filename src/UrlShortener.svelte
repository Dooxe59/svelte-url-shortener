<script>

	const newBaseUrl = 'https://rel.ink/';

	let isInvalid;
	let errorDetails;
	let url;
	let shortenedUrl;

	$: disabledButtonTitle = !url ? 'Disabled action because url is empty' : '';

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
	<input
		required
		placeholder="Enter url here"
		class="url-input"
		type="url"
		bind:value={url}/>
	<button
		disabled={!url}
		title={disabledButtonTitle}
		on:click={shortUrl}>Short Url !</button>

	{#if url}
		<h1>Base url: <a href={url}>{url}</a></h1>
		{#if shortenedUrl}
			<h1>Shortened url: <a href={shortenedUrl}>{shortenedUrl}</a></h1>
		{/if}
	{/if}

	{#if isInvalid}
		<h1>An error has occurred, please try again.</h1>
		<h2 class="error-label">{errorDetails}</h2>
	{/if}
</main>

<style>
	.application-logo {
		width: 25%;
	}

	.url-input {
		width: 100%;
	}

	.error-label {
		color: #ff3e00;
	}
</style>