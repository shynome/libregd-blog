<script lang="ts">
	export let data
	import { page } from '$app/stores'
	import Item from '$routes/blog/tags/[tag]/Item.svelte'
</script>

<div class="container">
	<div class="row row-cols-3 row-cols-xl-6 g-2">
		{#each data.years as y}
			<div class="col">
				<a
					href="../{y}/"
					class="btn btn-outline-primary w-100"
					class:active={$page.params.year === y}
				>
					{y}
				</a>
			</div>
		{/each}
	</div>
	<ul>
		{#each data.posts as post}
			<li>
				<Item {post}></Item>
			</li>
		{/each}
	</ul>
</div>
