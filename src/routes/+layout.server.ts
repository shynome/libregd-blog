export interface Nav {
	name: string
	link: string
}

export async function load({ fetch }) {
	return {
		subnavs: [{ name: '首页', link: '/' }] as Nav[],
	}
}
