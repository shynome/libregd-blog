import { type Post } from '$routes/blog/posts.json/+server.js'
import { error } from '@sveltejs/kit'
import MarkdownIt from 'markdown-it'
import hljs from 'highlight.js'

// @ts-ignore
const md = MarkdownIt({
	highlight(str, lang) {
		if (lang && hljs.getLanguage(lang)) {
			try {
				return (
					'<pre><code class="hljs">' +
					hljs.highlight(str, { language: lang, ignoreIllegals: true }).value +
					'</code></pre>'
				)
			} catch (__) {}
		}
		return '<pre><code class="hljs">' + md.utils.escapeHtml(str) + '</code></pre>'
	},
})

import { resolveRoute } from '$app/paths'

export async function load({ fetch, params, route, parent }) {
	const posts: Post[] = await fetch('/blog/posts.json').then((r) => r.json())
	const path = `/blog/${params.year}/${params.post}`
	for (let post of posts) {
		if (post.path === path) {
			const content = md.render(post.body)
			const { subnavs } = await parent()
			return {
				post,
				content,
				subnavs: [
					...subnavs,
					{
						name: `${post.attributes.title}`,
						link: resolveRoute(route.id, params),
					},
				],
			}
		}
	}
	error(404)
}
