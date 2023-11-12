import { motion, type MotionProps, AnimatePresence } from 'framer-motion';
import { useState, type PropsWithChildren } from 'react';
import { useMediaQuery } from "@uidotdev/usehooks";
import clsx from 'clsx';
import type { MenuLink } from '~constants';

export function rect_path(start_point: [number, number], width: number, thickness: number): string {
	return `M${start_point[0]},${start_point[1]}
							c${thickness},0,${thickness},${thickness},0,${thickness}
							h-${width}
							c-${thickness},0,-${thickness},-${thickness},0,-${thickness}
							h${width}`;
}

type MenuIconProps = {
	color: string;
	height: string;
	padding_x: string;
	padding_y: string;
	size: number;
	weight: 'lg' | 'md' | 'sm';
};

export function handle_animation(is_menu_open: boolean): MenuStates {
	return is_menu_open ? `OPEN` : `CLOSED`;
}

type LinkProps = PropsWithChildren & {
	styles?: string;
	url: URL | string;
};

export type MenuProps = {
	bg_color: string;
	links: Array<MenuLink>;
	menu_icon: MenuIconProps
};

const MENU_STATES = { CLOSED: `CLOSED`, OPEN: `OPEN` } as const;
const MENU_ANIMATION_DURATION = 0.5;
type MenuStates = (typeof MENU_STATES)[keyof typeof MENU_STATES];
const BP = 'md';

function is_current_page(path: string) {
	return window.location.pathname == path;
}

export function Navigation({ links, menu_icon: {color,height,padding_x,padding_y,size,weight} }: MenuProps): JSX.Element {
	const st = {
		burger: {
			_: `z-[500] -mr-6 cursor-pointer p-6 md:hidden`,
			svg: `w-[30px] h-[30px]`
		},
		menu: {
			_: `bg-silver md:bg-transparent fixed md:relative top-0 right-0 z-[100] h-screen md:h-auto w-full`,
			items: {
				_: `flex flex-col md:flex-row justify-center gap-32 md:gap-20 md:justify-end py-40 md:py-0 flex flex-col h-screen md:h-auto w-full max-md:items-center max-md:text-center`,
				item: ` `,
				link: `group/underscore group py-10 -my-10 px-16 -mx-16 block md:py-6 md:-my-6 md:px-8 md:-mx-8`,
				text: clsx(` font-heading text-fluid-2xl md:text-fluid-base font-heading md:font-[500] active:scale-[105%] uppercase tracking-[0.2rem]`)
			},
		},
	};
	const is_small_screen = useMediaQuery(`(max-width: 767px)`);
	const [is_menu_open, set_is_menu_open] = useState(false),
		links_animation: MotionProps = {
			animate: handle_animation(is_menu_open),
			variants: {
				[MENU_STATES.CLOSED]: {
					opacity: 0,
					transition: {
						delay: MENU_ANIMATION_DURATION / 2,
						duration: MENU_ANIMATION_DURATION,
						ease: `easeInOut`,
					},
				},
				[MENU_STATES.OPEN]: {
					opacity: 1,
					transition: { duration: MENU_ANIMATION_DURATION / 2, ease: `easeInOut` },
				},
			},
		},
		menu_animation: MotionProps = {
			animate: handle_animation(is_menu_open),
			initial: MENU_STATES.CLOSED,
			transition: { duration: MENU_ANIMATION_DURATION, ease: `easeInOut` },
			variants: {
				[MENU_STATES.CLOSED]: { x: `100%` },
				[MENU_STATES.OPEN]: { x: 0 },
			},
		};
		
		const [THICKNESS, VERTICAL_SPACING] = ((): [number, number] => {
			switch (weight) {
				case `lg`: {
					return [3, 0.15];
				}
				case `md`: {
					return [2, 0.25];
				}
				case `sm`: {
					return [1, 0.3];
				}
			}
		})(),
		ORIGIN_X = size,
		WIDTH_LG = size,
		WIDTH_MD = size * 0.7,
		WIDTH_SM = size * 0.5,
		WIDTH_X = Math.sqrt((size * (1 - 2 * VERTICAL_SPACING)) ** 2 * 2),
		top_bar: MotionProps = {
			style: { originX: `${ORIGIN_X}`, originY: `${size * VERTICAL_SPACING + THICKNESS / 2}` },
			variants: {
				[MENU_STATES.CLOSED]: {
					d: rect_path([ORIGIN_X, size * VERTICAL_SPACING], WIDTH_MD, THICKNESS),
					rotate: 0,
				},
				[MENU_STATES.OPEN]: {
					d: rect_path([ORIGIN_X, size * VERTICAL_SPACING], WIDTH_X, THICKNESS),
					rotate: -45,
				},
			},
		},
		middle_bar: MotionProps = {
			transition: { duration: 0.2, ease: `easeInOut` },
			variants: {
				[MENU_STATES.CLOSED]: {
					d: rect_path([ORIGIN_X, size * 0.5], WIDTH_LG, THICKNESS),
					opacity: 1,
					x: 0,
				},
				[MENU_STATES.OPEN]: { opacity: 0, x: -20 },
			},
		},
		bottom_bar: MotionProps = {
			style: {
				originX: `${ORIGIN_X}`,
				originY: `${size * (1 - VERTICAL_SPACING) + THICKNESS / 2}`,
			},
			variants: {
				[MENU_STATES.CLOSED]: {
					d: rect_path([ORIGIN_X, size * (1 - VERTICAL_SPACING)], WIDTH_SM, THICKNESS),
					rotate: 0,
				},
				[MENU_STATES.OPEN]: {
					d: rect_path([ORIGIN_X, size * (1 - VERTICAL_SPACING)], WIDTH_X, THICKNESS),
					rotate: 45,
				},
			},
		};

	function handle_menu(): void {
		set_is_menu_open(is_menu_open => !is_menu_open);
		document.body.style.overflowY = is_menu_open ? `unset` : `hidden`;
	}

	return (
		<>
			<button
				aria-controls='menu'
				aria-expanded={is_menu_open}
				className={st.burger._}
				onClick={handle_menu}
				title='menu'
				type='button'>
				<motion.svg
					initial={MENU_STATES.CLOSED}
					animate={handle_animation(is_menu_open)}
					className={st.burger.svg}
					fill={color}
					overflow='visible'
					viewBox={`0 0 ${size} ${size}`}>
					<motion.path {...top_bar} />
					<motion.path {...middle_bar} />
					<motion.path {...bottom_bar} />
				</motion.svg>
			</button>
			<motion.nav {...(is_small_screen && menu_animation)} className={st.menu._} id='menu'>
				<ul className={st.menu.items._}>
					{links.map(({ text, url }) => (
						<motion.li {...(is_small_screen && links_animation)} className={st.menu.items.item} key={text}>
							<a className={st.menu.items.link} href={url}>
								<p className={clsx(st.menu.items.text, {
									'-skew-x-[16deg] underscore-animation-active': is_current_page(url),
									'transform-gpu group-hover:-skew-x-[16deg] underscore-animation duration-[400ms]': !is_current_page(url)
									})}>
									{text}
								</p>
							</a>
						</motion.li>
					))}
				</ul>
			</motion.nav>
		</>);
}