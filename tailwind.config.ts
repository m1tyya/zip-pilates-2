import type { Config } from 'tailwindcss';
import defaltTheme from 'tailwindcss/defaultTheme';
import typography from '@tailwindcss/typography';

import { fluid_type_scale, type FluidType, type FluidTypeScale, weight_scale } from './src/utils';
import plugin from 'tailwindcss/plugin';
import theme from 'tailwindcss/defaultTheme';

const font_weights_naming: Array<string> = [
		`microline`,
		`hairline`,
		`thin`,
		`ultralight`,
		`extralight`,
		`light`,
		`semilight`,
		`regular`,
		`book`,
		`medium`,
		`550`,
		`demibold`,
		`semibold`,
		`bold`,
		`heavy`,
		`extrabold`,
		`ultrabold`,
		`black`,
		`extrablack`,
		`ultrablack`,
	],
	fluid_type_defaults: FluidType = {
		max_screen_width: 1400,
		min_screen_width: 370,
		precision: 2,
		rem_value: 10,
	},
	fluid_type_scale_defaults: FluidTypeScale = {
		base_step: `base`,
		base_value_max: 19,
		base_value_min: 16,
		prefix: `fluid`,
		scale_max: 1.25,
		scale_min: 1.15,
		steps: [`xs`, `sm`, `base`, `md`, `lg`, `xl`, `2xl`, `3xl`, `4xl`, `5xl`] as const,
	},
	fluid_typography = fluid_type_scale(fluid_type_scale_defaults, fluid_type_defaults);

export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	corePlugins: {
		preflight: false,
	},
	plugins: [
		typography,
		plugin(function({ matchUtilities, addComponents, e, config }) {
			matchUtilities(
				{
				  'text-shadow': (value) => ({
					textShadow: value,
				  }),
				},
				{ values: theme['textShadow'] }
			)
		}),
		plugin(function({addUtilities}) {
			addUtilities({
				'.text-justify-all': {
					'text-align': 'justify',
					'text-align-last': 'justify'
				}
			})
		}),
		plugin(({addVariant}) => {
			addVariant('child', '& > *')
		}),
		plugin(({ matchUtilities, theme }) => {
			matchUtilities(
				{
					text: (value) => ({
						textOverflow: value,
					})
				},
				{
					values: theme('textOverflow')
				}
			)
		})
	],
	theme: {
		textOverflow: {
			'space-ellipsis': `" ..."`,
		},
		extend: {
			backgroundImage: {
				'test': 'url(/src/assets/images/reformer.jpg)',
			},
			listStyleType: {
				roman: 'upper-roman'
			},
			textShadow: {
				sm: '0 1px 2px var(--tw-shadow-color)',
				DEFAULT: '0 2px 4px var(--tw-shadow-color)',
				lg: '0 8px 16px var(--tw-shadow-color)',
			  },
			colors: {
				bg: `#F0EDE4`,
				brown_light: `#c5b69a`,
				light2: `#fefae0`,
				primary: `#606c38`,
				'primary-darker': `#525C30`,
				'primary-lighter': `#8B9D51`,
				secondary: `#44376C`,
				'secondary-darker': `#3A2F5D`,
				'secondary-lighter': `#59478D`,
				selected: `#655049`,
				silver: `#E0DED6`,
				// test: `oklch(70% 0.144 152.47)`,
				text: `#766C3E`,
				text_darker: `#49411D`,
			},
			content: {
				divider: `url('/vectors/divider.svg')`,
			},
			fontFamily: {
				domaine: `var(--font-domaine)`,
				elegant: `var(--font-brunizer)`,
				heading: ['Cormorant', ...defaltTheme.fontFamily.serif],
				heading2: 'Playfair Display Variable',
				heading3: 'Sprat',
				merri: `Merriweather`,
				naibo: `var(--font-naibo)`,
				text: `Lato`,
			},
			fontSize: {
				...fluid_typography,
			},
			fontWeight: {
				...weight_scale(),
			},
			padding: {
				hello: `500px`,
				button_x: `5rem`,
				button_y: `.8rem`,
				page_x: `max(20px,2vw)`,
				page_y: `max(30px,3vw)`,
			},
			spacing: {
				...fluid_typography,
			},
		},
		screens: {
			'2xl': `1536px`,
			lg: `1024px`,
			md: `768px`,
			sm: `640px`,
			xl: `1280px`,
			xs: `500px`
		},
	},
} satisfies Config;
