import fs from 'fs/promises'
import { glob } from 'glob'
import { simpleGit, type SimpleGit } from 'simple-git'
import fpath from 'path'

const git: SimpleGit = simpleGit()

export interface Attributes {
	title: string
	tags: string[]
	desc: string
	poster?: string
}
import fm, { type FrontMatterResult } from 'front-matter'

export interface Post extends FrontMatterResult<Attributes> {
	created: Date
	updated: Date
	path: string
}

export async function GET() {
	const files = await glob('blog/*/*.md')
	const postsTasks = files.map(async (f) => {
		let content = await fs.readFile(f, 'utf8')
		let r = fm<Attributes>(content) as Post
		const result = await git.log({ file: f })
		if (result.total > 0) {
			r.created = new Date(result.all.slice(-1)[0].date)
			r.updated = new Date(result.latest!.date)
		} else {
			const stat = await fs.stat(f)
			r.created = stat.ctime
			r.updated = stat.mtime
		}
		if (!r.attributes.title) {
			r.attributes.title = fpath.basename(f).slice(5)
		}
		const year = fpath.dirname(f).slice('blog/'.length)
		r.attributes.tags = (r.attributes?.tags ?? []).concat(`#${year}`)
		r.path = f
		return r
	})
	let posts = await Promise.all(postsTasks)
	posts = posts.sort((a, b) => {
		let n1 = getDate(a.path)
		let n2 = getDate(b.path)
		return n1 > n2 ? -1 : 1
	})
	const resp = JSON.stringify(posts, null, 2)
	return new Response(resp, {
		headers: {
			'Content-Type': 'application/json',
		},
	})
}

function getDate(path: string): number {
	const date = path.slice('blog/'.length).split('-')[0]
	return Number(date.replace('/', ''))
}
