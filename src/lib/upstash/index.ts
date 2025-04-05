import { Index } from '@upstash/vector'

export const index = new Index({
  url: process.env.UPSTASH_VECTOR_REST_URL,
  token: process.env.UPSTASH_VECTOR_REST_TOKEN,
})

type Metadata = {
  title: string
  type: 'blog' | 'project'
  blog?: 'string'
  project?: 'string'
}

export const getSimilarPosts = async (
  slug: string,
  blogPost: string,
  type: 'blog' | 'project',
) => {
  let relatedBlogs = await index.query<Metadata>({
    data: blogPost,
    topK: type === 'blog' ? 3 : 2,
    filter: "type = 'blog'",
    includeMetadata: true,
  })

  // remove the current blog post from the related blogs
  relatedBlogs = relatedBlogs.filter(
    (post) => post.metadata && post.metadata.blog !== slug,
  )

  let relatedProjects = await index.query<Metadata>({
    data: blogPost,
    topK: type === 'project' ? 3 : 2,
    filter: "type = 'project'",
    includeMetadata: true,
  })

  // remove the current blog post from the related projects
  relatedProjects = relatedProjects.filter(
    (post) => post.metadata && post.metadata.project !== slug,
  )

  return {
    relatedBlogs,
    relatedProjects,
  }
}
