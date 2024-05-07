import { getAllBlogsTags } from './get-blogs';
import { getAllProjectsTags } from './get-projects';
import { getAllSnippetsTags } from './get-snippets';

const projectTags = getAllProjectsTags();
const blogTags = getAllBlogsTags();
const snippetTags = getAllSnippetsTags();

const projecttags = Object.keys(projectTags);
const blogtags = Object.keys(blogTags);
const snippettags = Object.keys(snippetTags);

const tags = [...projecttags, ...blogtags, ...snippettags];

// create an object to store the tags and their counts
const allTags: Record<string, number> = {};

// get all tags with their count
for (const tag of tags) {
  if (allTags[tag]) {
    continue;
  }
  const projectCount = projectTags[tag];
  const blogCount = blogTags[tag];
  const snippetCount = snippetTags[tag];

  let count = projectCount ? projectCount : 0;
  count += blogCount ? blogCount : 0;
  count += snippetCount ? snippetCount : 0;

  // add the tag and its count to the object
  allTags[tag] = count;
}

export { allTags };
