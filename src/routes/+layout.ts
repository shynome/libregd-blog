export const prerender = true

export const trailingSlash = 'always'

import { loadTranslations } from '$lib/translations'

export async function load({ parent, params, url }) {
	const initLocale = params.lang ?? 'zh' // get from cookie, user session, ...

	await loadTranslations(initLocale, url.pathname) // keep this just before the `return`

	const data = await parent()

	return {
		...data,
		lang: initLocale,
		langPathPrefix: initLocale === 'zh' ? '' : '/' + initLocale,
	}
}
