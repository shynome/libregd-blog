<script lang="ts">
	export let data
	const posts = data.posts
	import { page } from '$app/stores'
	import Item from './Item.svelte'
</script>

<div class="container">
	<h1>{$page.params.tag}</h1>
	<ul>
		{#each posts as post}
			<li>
				<Item {post}></Item>
			</li>
		{/each}
	</ul>
</div>
