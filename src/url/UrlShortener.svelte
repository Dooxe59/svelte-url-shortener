<script>
	import UrlInput from './UrlInput.svelte';
	import Button from '../Button.svelte';

	import { shortenUrl } from './UrlShortener.js';

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
	const onInput = (e)  => { 
		url = e.target.value;
	 }

	const resetData = () => {
		isInvalid = false;
		errorDetails = null;
		shortenedUrl = '';
	}

	const shortUrl = () => {
		isInvalid = false;
		shortenUrl(url)
			.then((newUrl) => {
				shortenedUrl = newUrl;
			})
			.catch((err) => {
				isInvalid = true;
				errorDetails = err;
			})
	}
</script>

<main>
	<UrlInput 
		value="{url}"
		label="Url to short"
		on:press-enter={onPressEnter}
		on:input={onInput}/>
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