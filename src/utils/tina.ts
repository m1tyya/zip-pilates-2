// @ts-ignore
import { z, type SchemaContext } from 'astro:content';
import type { TinaField } from 'tinacms';

// export function fields_to_zod_schema(fields: TinaField<false>[],{image}: SchemaContext) {
// 	const res = z.object({});
	
// 	for (const field of fields) {
// 		if (field.type === 'image') {
// 			res[field.name] = image();
// 		}
// 		res.extend({
// 			[field.name]: z.string().transform((val) => new Date(val))
// 		});
// 	}
// 	return z.object ({
// 		published: z.string().transform((val) => new Date(val)),
// 		tags: z.array(z.string()),
// 		title: z.string(),
// 		description: z.string(),
// 		is_draft: z.boolean(),
// 		is_pinned: z.boolean(),
// 		cover: image(),
// 	}).strict()
// }