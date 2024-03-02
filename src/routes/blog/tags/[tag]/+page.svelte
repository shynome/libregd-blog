<script lang="ts">
	export let data
	const posts = data.posts
	import { page } from '$app/stores'
</script>

<div class="container">
	<h1>{$page.params.tag}</h1>
	<ul>
		{#each posts as post}
			<li><a href={post.path}>{post.attributes.title}</a></li>
		{/each}
	</ul>
</div>
