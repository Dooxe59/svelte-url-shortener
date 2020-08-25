<script>
	import UrlInput from './UrlInput.svelte';
	import Button from './Button.svelte';

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
	const onPressEnter = () => { shortUrl() }
	const onInput = ()  => { resetData() }

	const resetData = () => {
		isInvalid = false;
		errorDetails = null;
		shortenedUrl = '';
	}

	const shortUrl = () => {
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
		on:onPressEnter={onPressEnter}
		on:onInput={onInput}/>
	<Button
		isDisabled={!urlTrimmed}
		label="Shorten Url !"
		title={disabledButtonTitle}
		on:onClick={shortUrl}/>

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
	.error-label {
		color: #ff3e00;
	}

</style>