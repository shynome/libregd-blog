<script>
	export let data
	const tags = Object.keys(data.tagged).filter((t) => !t.startsWith('#'))
	import { tooltip } from '$lib/action/bootstrap'
</script>

<div class="container">
	<div class="row row-cols-3 row-cols-xl-6 g-2">
		{#each tags as tag}
			{@const posts = data.tagged[tag]}
			<div class="col">
				<a href="./{tag}/" class="btn btn-outline-primary">
					{tag}
					<span class="badge text-bg-secondary" use:tooltip title="文章数量">{posts.length}</span>
				</a>
			</div>
		{/each}
	</div>
</div>
