<script>
	import UrlShortener from './url/UrlShortener.svelte';
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
</style>