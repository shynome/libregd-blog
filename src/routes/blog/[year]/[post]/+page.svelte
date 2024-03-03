<script lang="ts">
	import 'highlight.js/styles/default.min.css'
	export let data
	const post = data.post
	const tags = post.attributes.tags.filter((t) => !t.startsWith('#'))
</script>

<div class="container">
	<h1>{post.attributes.title}</h1>
	<div>
		{#each tags as tag}
			<a href="/blog/tags/{tag}/" class="btn btn-sm btn-outline-secondary me-2">{tag}</a>
		{/each}
	</div>
	<hr />
	<div>
		{@html data.content}
	</div>
	<div>
		<small>
			创建时间: {post.created}<br />
			修改时间: {post.updated}
		</small>
	</div>
</div>
