import type { Tagged } from '$routes/blog/tags.json/+server.js'

export async function load({ fetch, params }) {
	const tagged: Tagged = await fetch('/blog/tags.json').then((r) => r.json())
	let years = Object.keys(tagged).filter((t) => t.startsWith('#'))
	years = years.map((y) => y.slice(1))
	years = years.sort((a, b) => {
		let n1 = Number(a)
		let n2 = Number(b)
		return n1 > n2 ? -1 : 1
	})
	const posts = tagged[`#${params.year}`]
	return {
		years,
		posts,
	}
}
