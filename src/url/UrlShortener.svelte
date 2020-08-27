<script>
	import UrlInput from './UrlInput.svelte';
	import Button from '../Button.svelte';

	import { shortenUrl, getDateTimeNow } from './UrlShortener.js';

	let isInvalid;
	let errorDetails;
	let url = "";
	let shortenedUrl;
	let historyShortenedUrl = [];

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
				historyShortenedUrl.unshift({
					url: url,
					shortenedUrl: newUrl,
					time: getDateTimeNow()
				});
				// TODO: data reactivity
				historyShortenedUrl = historyShortenedUrl;
			})
			.catch((err) => {
				isInvalid = true;
				errorDetails = err;
			})
	}

	const copyText = (text) => {
		if(text) {
			const textArea = document.createElement('textarea');
			textArea.value = text;
			document.body.appendChild(textArea);
			textArea.select();
			document.execCommand('copy');
			document.body.removeChild(textArea);
		}
	};
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

	{#if isInvalid}
		<h1>An error has occurred, please try again.</h1>
		<h2 class="error-label">{errorDetails}</h2>
	{/if}

	<div class="history-shortened-url-list">
		{#each historyShortenedUrl as historyUrl, i}
			<div class="history-shortened-url">
				<span class="shortened-url-time">{historyUrl.time}</span>
				<div class="origin-url">
					<a class="truncated" target="_blank" title="{historyUrl.url}" href="{historyUrl.url}">
						{historyUrl.url}
					</a>
				</div>
				<div class="shorten-url">
					<a  target="_blank" href="{historyUrl.shortenedUrl}">
						{historyUrl.shortenedUrl}
					</a>
				</div>
				<button class="copy-button" on:click="{copyText(historyUrl.shortenedUrl)}">
					Copy !
				</button>
			</div>
		{/each}
	</div>
</main>

<style>
	.error-label {
		color: #ff3e00;
	}

	.truncated {
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	.history-shortened-url {
		height: 40px;
		box-sizing: border-box;
		border-bottom: 1px solid lightgray;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.shortened-url-time {
		margin: 0 10px;
	}

	.origin-url {
		display: flex;
		justify-content: flex-start;
		width: 200px;
	}

	.shorten-url {
		margin: 0 10px;
	}

	.copy-button {
		margin: 0 10px;
	}

</style>