// @ts-ignore
import { getCollection } from "astro:content";

export const getPosts = async () => {
	return (await getCollection('blog'))
		.filter((post) => !post.data.is_draft)
		.sort((post1, post2) => {
			if (!post1.data.is_pinned && post2.data.is_pinned) return 1;
			
			return post2.data.published.getTime() - post1.data.published.getTime();
		})
}