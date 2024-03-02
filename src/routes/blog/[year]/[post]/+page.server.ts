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

export async function load({ fetch, params }) {
	const posts: Post[] = await fetch('/blog/posts.json').then((r) => r.json())
	const path = `/blog/${params.year}/${params.post}`
	for (let post of posts) {
		if (post.path === path) {
			const content = md.render(post.body)
			return {
				post,
				content,
			}
		}
	}
	error(404)
}
