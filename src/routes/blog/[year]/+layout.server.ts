import { resolveRoute } from '$app/paths'
export async function load({ parent, fetch, params, route }) {
	const { subnavs } = await parent()
	return {
		subnavs: [
			...subnavs,
			{
				name: `${params.year}年份的文章`,
				link: resolveRoute('/blog/[year]', { year: params.year }),
			},
		],
	}
}
