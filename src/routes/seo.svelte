<script lang="ts">
	import { page } from '$app/stores'
	import type { Nav } from './+layout.server'
  import { sitename } from "$lib/config";
	$: subnavs = $page.data.subnavs as Nav[]
	$: subtitle = (subnavs.length === 1 ? subnavs : subnavs.slice(1))
		.map((t) => t.name)
		.reverse()
		.join(' - ')
</script>

<svelte:head>
	<title>{subtitle} - {sitename}</title>
</svelte:head>
