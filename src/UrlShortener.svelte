<script>
	import UrlInput from './UrlInput.svelte';

	const newBaseUrl = 'https://rel.ink/';

	let isInvalid;
	let errorDetails;
	let url = "";
	let shortenedUrl;

	$: urlTrimmed = url ? url.trim() : '';
	$: disabledButtonTitle = !urlTrimmed ? 'Disabled action because url is empty' : '';

	const onKeyUp = (event)  => {
		if(event && event.detail && event.detail.value) {
			url = event.detail.value;
		}
	 }
	const onInput = ()  => { resetData() }

	const resetData = () => {
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
	<UrlInput 
		value="{url}"
		label="Url to short"
		on:onKeyUp={onKeyUp}
		on:onInput={onInput}/>
	<button
		disabled={!urlTrimmed}
		title={disabledButtonTitle}
		on:click={shortUrl}>
		Short Url !
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
	element {
		--main-color: #ff3e00;
	}
	.error-label {
		color: --main-color;
	}

</style>