import type React from 'react';
import useEmblaCarousel, { type EmblaCarouselType, type EmblaEventType, type EmblaOptionsType } from 'embla-carousel-react';
import Autoplay, { type AutoplayOptionsType } from 'embla-carousel-autoplay';
import { useCallback, useEffect, useState } from 'react';

type Testimonial = {
	name: string;
	text: string;
}

const TESTIMONIALS: Testimonial[] = [
	{
		name: `Joanna G`,
		text: `Serdecznie polecam.  Tatiana cudownie pomaga Ci odzyskać kontakt z własnym ciałem.  Zajęcia to inwestycja w swoje zdrowie i samopoczucie. Tatiana dba o każdy szczegół, dopilnuje, aby wszystko robić dokładnie i mieć rezultaty.  Polecam z całego serca.`
	},
	{
		name: `Łukasz Sady`,
		text: `Pełen profesjonalizm, 100% zaangażowania i ogromna cierpliwość Tatiany. Doskonały trening rozciągający i oddechowy. Gorąco polecam!!!`,
	},
	{
		name: `Dymytriy Vykhodets`,
		text: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Amet consectetur adipiscing elit duis. Phasellus faucibus scelerisque eleifend donec pretium vulputate sapien nec sagittis. Pretium nibh ipsum cons`
	},
	{
		name: `Van`,
		text: `naeisrtnaretnesrmten ssaratsratnsrie.tsre enii`
	},
	{
		name: `Van1`,
		text: `naeisrtnaretnesrmten ssaratsratnsrie.tsre enii`
	},
	{
		name: `Van2`,
		text: `naeisrtnaretnesrmten ssaratsratnsrie.tsre enii`
	},
	{
		name: `Van3`,
		text: `naeisrtnaretnesrmten ssaratsratnsrie.tsre enii`
	},
]


const OPTIONS: EmblaOptionsType = { loop: true, align: `start`, duration: 20, skipSnaps: true }
const AUTOPLAY_OPTIONS: AutoplayOptionsType = { stopOnInteraction: false, delay: 4000, stopOnMouseEnter: true}

const st = {
	_: `embla mt-10 lg:mt-16`,
	viewport: `embla__viewport hover:cursor-grab active:cursor-grabbing`,
	container: {
		_: `embla__container [&>*:nth-child(odd)]:bg-primary/50 [&>*:nth-child(even)]:bg-secondary/50`,
		slide: {
			_: `embla__slide rounded-[2.5rem] px-10 py-10 flex flex-col`,
			name: `font-heading2 text-fluid-md`,
			text: `mt-10 font-text text-[calc(theme(fontSize.fluid-base)+.2rem)] leading-[1.6] tracking-[.07rem] line-clamp-[10] overflow-hidden text-ellipsis`
		}
	},
	counter: `ml-auto text-fluid-lg mt-12 w-fit mr-12 text-gray-800`
}

export function ReviewCarousel(): React.JSX.Element {
	const [carousel_ref, embla_api] = useEmblaCarousel(OPTIONS, [Autoplay(AUTOPLAY_OPTIONS)]);
	const [slide_index, set_slide_index] = useState(0);

	const on_select = useCallback((embla_api: EmblaCarouselType, event_name: EmblaEventType) => {
		set_slide_index(embla_api.selectedScrollSnap());
	}, []);

	useEffect(() => {
		if (!embla_api) return;

		embla_api.on('select', on_select);
		
	}, [embla_api]);

	return <div className={st._}>
			<div className={st.viewport} ref={carousel_ref}>
				<div className={st.container._}>
					{TESTIMONIALS.map(({name, text}) => (
						<div className={st.container.slide._} key={name}>
							<h3 className={st.container.slide.name}>{name}</h3>
							<p className={st.container.slide.text}>{text}</p>
						</div>
					))}
				</div>
			</div>
			<p className={st.counter}>{String(slide_index + 1).padStart(2, '0')} / {String(TESTIMONIALS.length).padStart(2, '0')}</p>
	</div>;
}

export default ReviewCarousel;