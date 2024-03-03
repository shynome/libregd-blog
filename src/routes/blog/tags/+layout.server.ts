export async function load({ parent, fetch, params, route }) {
	const { subnavs } = await parent()
	return {
		subnavs: [
			...subnavs,
			{
				name: `Tags 中心`,
				link: '/blog/tags/',
			},
		],
	}
}
