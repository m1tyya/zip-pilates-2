// @ts-ignore
import { defineCollection, z } from 'astro:content';

const blog_collection = defineCollection({
	type: 'content',
	schema: ({ image }) =>
		z.object ({
			published: z.string().transform((val) => new Date(val)),
			tags: z.array(z.string()),
			title: z.string(),
			description: z.string(),
			is_draft: z.boolean(),
			is_pinned: z.boolean(),
			cover: image(),
		}).strict()
});

export const collections = { blog: blog_collection };