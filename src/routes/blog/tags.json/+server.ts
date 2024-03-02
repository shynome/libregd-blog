export const prerender = true

import { type Post } from '$routes/blog/posts.json/+server.js'

export type Tagged = { [k: string]: Post[] }

export async function GET({ fetch }) {
	const posts: Post[] = await fetch('/blog/posts.json').then((r) => r.json())
	const tagged: Tagged = {}
	for (const post of posts) {
		for (const tag of post.attributes.tags) {
			tagged[tag] = tagged[tag] ?? []
			// @ts-ignore
			post.body = null
			tagged[tag].push(post)
		}
	}
	const resp = JSON.stringify(tagged, null, 2)
	return new Response(resp, {
		headers: {
			'Content-Type': 'application/json',
		},
	})
}
