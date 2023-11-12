import { z } from 'astro/zod';

const env_schema = z.object({
	MAPS_API_KEY: z.string(),
	PUBLIC_FORM_SERVICE_ID: z.string(),
	PUBLIC_FORM_TEMPLATE_ID: z.string(),
	PUBLIC_FORM_PUBLIC_KEY: z.string(),
});

export const ENV = env_schema.parse(import.meta.env);