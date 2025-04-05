import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { cache } from 'react'
import { getReadingTime } from './utils'

// import { getMdxFiles, getReadingTime } from './utils';

const BLOGS_FOLDER = path.join(process.cwd(), 'src', 'content', 'blogs')

type Metadata = {
  title: string
  publishedAt: string
  summary: string
  tags: string[]
  published: boolean
  image?: string
}

function getBlogFiles(dir: string) {
  return fs.readdirSync(dir).filter((file) => path.extname(file) === '.mdx')
}

// function readBlogFile(filePath: string) {
//   return fs.readFileSync(filePath, 'utf-8');
// }

export const getBlogs = cache(async () => {
  const posts = getBlogFiles(BLOGS_FOLDER)

  return posts.map((post) => {
    const filePath = path.join(BLOGS_FOLDER, post)
    const fileContent = fs.readFileSync(filePath, 'utf-8')
    const { data, content } = matter(fileContent)
    const readingTime = getReadingTime(content)
    return {
      metadata: data as Partial<Metadata>,
      readingTime: readingTime,
      content,
      slug: post.replace(/\.mdx?$/, ''),
    }
  })
})

// export const getBBlogs = async () => {
//   'use cache';
//   unstable_cacheTag('blogs');

//   return await getBlogs();
// };

export async function getBlog(slug: string) {
  let blogs = await getBlogs()
  if (process.env.APP_ENV !== 'development') {
    blogs = blogs.filter(
      (blog) => blog.metadata && blog.metadata.published === true,
    )
  }
  const blog = blogs.find((blog) => blog.slug === slug)
  return blog
}

export async function getLatestBlogs() {
  let blogs = await getBlogs()
  blogs = blogs.filter(
    (blog) => blog.metadata && blog.metadata.published === true,
  )

  // Sort by date
  blogs.sort((a, b) => {
    const dateA = new Date(a.metadata.publishedAt!)
    const dateB = new Date(b.metadata.publishedAt!)
    return dateB.getTime() - dateA.getTime()
  })

  // Return the latest 3 blogs
  return blogs.slice(0, 3)
}

export default getBlogs

export async function getBlogByTag(tag: string) {
  let blogs = await getBlogs()
  blogs = blogs.filter(
    (blog) => blog.metadata && blog.metadata.published === true,
  )
  const filteredBlogs = blogs.filter(
    (blog) =>
      blog.metadata.tags!.filter((t) => t.toLowerCase() === tag.toLowerCase())
        .length > 0,
  )
  return filteredBlogs
}

export async function getAllBlogsTags() {
  let blogs = await getBlogs()
  blogs = blogs.filter(
    (blog) => blog.metadata && blog.metadata.published === true,
  )
  const tags: Record<string, number> = {}
  blogs.forEach((blog) => {
    blog.metadata.tags!.forEach((tag) => {
      tag = tag.trim()
      tag = tag.toLowerCase()
      if (!tags[tag]) {
        tags[tag] = 0
      }
      tags[tag]++
    })
  })

  return tags
}
