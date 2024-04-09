<script lang="ts">
	import 'highlight.js/styles/default.min.css'
	import type { Post } from '$routes/data/posts.json/+server'

	import { t } from '$lib/translations'
	import Placeholder from './placeholder.png'
	import { onMount } from 'svelte'
	export let post: Post & { content: string }
	$: tags = post.attributes.tags.filter((t) => !t.startsWith('c_'))
	let show = false
	let btn: HTMLElement
	onMount(() => {
		console.log(btn)
		btn.addEventListener('show.bs.collapse', () => {
			show = true
		})
		btn.addEventListener('hide.bs.collapse', () => {
			show = false
		})
	})
	import { page } from '$app/stores'
	import { resolveRoute } from '$app/paths'
</script>

<div class="card rounded-4">
	<a href={post.path} class="d-none">{post.attributes.title}</a>
	<img src={Placeholder} width="960" height="204" alt="" class="card-img-top" />
	<div class="card-body">
		<h4 class="card-title">
			{post.attributes.title}
		</h4>
		{#if tags.length}
			<div class="row row-cols-auto g-2">
				{#each tags as tag}
					<div class="col">
						<button class="btn btn-sm rounded-5 btn-secondary">{tag}</button>
					</div>
				{/each}
			</div>
		{/if}
		{#if post.attributes.desc}
			<p class="card-text">
				{post.attributes.desc}
			</p>
		{/if}
	</div>
	<div class="collapse" id="post-{post.path}" bind:this={btn}>
		<div class="card-body border-top">
			{@html post.content}
		</div>
	</div>
	<a class="card-footer text-center" data-bs-toggle="collapse" href="#post-{post.path}">
		<small>
			{show ? $t('common.collapse_artcile') : $t('common.expand_artcile')}
		</small>
	</a>
</div>

<style>
	a.card-footer {
		text-decoration: none;
	}
	.card{
		overflow: hidden;
	}
</style>
