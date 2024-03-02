export const prerender = true

import { type Post } from '$routes/blog/posts.json/+server.js'
import { SitemapStream, streamToPromise } from 'sitemap'
import { base } from '$app/paths'

export async function GET({ fetch, url }) {
	const posts: Post[] = await fetch('/blog/posts.json').then((r) => r.json())
	const stream = new SitemapStream({
		hostname: url.toString(),
	})
	for (let post of posts) {
		stream.write({
			url: base + post.path,
		})
	}
	stream.end()
	const resp = await streamToPromise(stream)
	return new Response(resp, {
		headers: {
			'Content-Type': 'text/xml',
		},
	})
}