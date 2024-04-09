import MarkdownIt from 'markdown-it'
import hljs from 'highlight.js'

// @ts-ignore
export const md = MarkdownIt({
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
