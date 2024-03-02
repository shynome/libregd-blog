<script lang="ts">
	import type { Post } from '$routes/blog/posts.json/+server'

	export let post: Post
</script>

<a href={post.path}>{post.attributes.title}</a>
