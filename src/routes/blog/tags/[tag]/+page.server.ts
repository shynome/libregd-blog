import type { Tagged } from '$routes/blog/tags.json/+server.js'
import { error } from '@sveltejs/kit'
export async function load({ fetch, params }) {
	const tagged: Tagged = await fetch('/blog/tags.json').then((r) => r.json())
	const posts = tagged[params.tag]
	if (!posts) {
		error(404)
	}
	return {
		posts,
	}
}
