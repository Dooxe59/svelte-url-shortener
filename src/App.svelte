<script>
	import UrlShortener from './UrlShortener.svelte';
</script>

<main>
	<img src="/app_logo.png" alt="Application logo" class="application-logo"/>
	<UrlShortener/>
</main>

<style>
	main {
		text-align: center;
		margin: 0 auto;
	}

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