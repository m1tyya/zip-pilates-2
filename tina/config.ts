import { Form, TinaCMS, defineConfig } from "tinacms";
import capitalize from 'voca/capitalize';
import {format_date, format_date_readable} from '../src/utils/format';
import React from 'react';
import { removeStopwords, pol } from 'stopword'
import slugify from 'voca/slugify';

// Your hosting provider likely exposes this as an environment variable
const branch = process.env.HEAD || process.env.VERCEL_GIT_COMMIT_REF || "main";

const MAX_TITLE_LENGTH = 40;

export default defineConfig({
  branch,
  clientId: null, // Get this from tina.io
  token: null, // Get this from tina.io

  build: {
	outputFolder: "admin",
	publicFolder: "public",
  },
  search: {
	tina: {
		indexerToken: '', // TODO
		stopwordLanguages: ['pol']
	}
  },
  media: {
	tina: {
	  mediaRoot: "/src/assets/images",
	  publicFolder: '',
	},
  },
  schema: {
	collections: [
	  {
		defaultItem: () => {
			return {
				is_draft: true,
				is_pinned: false,
				published: new Date(),
				tags: [],
			}
		},
		name: "post",
		label: "Posts",
		path: "src/content/blog",
		fields: [
			{
				type: 'string',
				name: 'published',
				label: 'Published',
				required: true,
				ui: {
					component: 'date',
				}
			},
			{
				type: 'string',
				name: 'tags',
				label: 'Tags',
				list: true,
			},
			{
				type: "string",
				name: "title",
				label: "Title",
				isTitle: true,
				required: true,
				ui: {
					format: (value) => capitalize(value),
					validate: (value) => {
						if (!value) return 'Required';
						
						if (value.length > MAX_TITLE_LENGTH) {
							return `Max ${MAX_TITLE_LENGTH} characters.`;
						}
					}
				}
			},
			{
				type: 'image',
				name: 'cover',
				label: 'Cover',
				required: true,
			},
			{
				type: 'boolean',
				name: 'is_draft',
				label: 'Draft',
				required: true,
				searchable: false,
			},
			{
				type: 'boolean',
				name: 'is_pinned',
				label: 'Pinned',
				required: true,
				searchable: false,
			},
			{
				type: 'string',
				name: 'description',
				label: 'Description',
				required: true,
				ui: {
					component: 'textarea'
				}
			},
		  {
			type: "rich-text",
			name: "body",
			label: "Body",
			isBody: true,
		  },
		],
		ui: {
			filename: {
				readonly: false,
				slugify: (values) => {
					if (!values.title) {
						return '';
					}

					return slugify(
						removeStopwords(
							(values.title as string)
								.trim()
								.split(' '), 
							pol
							)
						.join(' ')
					);
					
				}
			},
			beforeSubmit: async ({ values }: {
				values: Record<string, any>
			  }) => {
				return {
					...values,
					tags: values.tags ? values.tags : [],
					published: format_date(values.published)
				}
			  }
		},
	},
	],
  },
});
