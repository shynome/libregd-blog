import type { Tagged } from '$routes/blog/tags.json/+server.js'
export async function load({ fetch }) {
	const tagged: Tagged = await fetch('/blog/tags.json').then((r) => r.json())
	return {
		tagged,
	}
}
