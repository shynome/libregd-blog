import { resolveRoute } from '$app/paths'
export async function load({ parent, fetch, params, route }) {
	const { subnavs } = await parent()
	return {
		subnavs: [
			...subnavs,
			{
				name: `${params.tag}`,
				link: resolveRoute(route.id, params),
			},
		],
	}
}
