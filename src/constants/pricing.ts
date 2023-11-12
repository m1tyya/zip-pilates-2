import { ReactComponent as Standing } from 'assets/vectors/standing.svg';
import { ReactComponent as Laying } from 'assets/vectors/laying.svg';
import { ReactComponent as Stretching } from 'assets/vectors/stretching.svg';

export type MenuLink = {
	text: string,
	url: string
};
export const MENU_LINKS: Array<MenuLink> = [
	{
		text: `Blog`,
		url: `/blog`,
	},
];

export type PriceCard = {
	Icon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
	title: string;
	price: {
		single: number;
		pass: number;
	}
}
export const PRICE_CARDS: Array<PriceCard> = [
	{
		Icon: Standing,
		title: 'Personalny',
		price: {
			single: 230,
			pass: 210,
		}
	},
	{
		Icon: Laying,
		title: 'Duo',
		price: {
			single: 170,
			pass: 150,
		}
	},
	{
		Icon: Stretching,
		title: 'Trio',
		price: {
			single: 100,
			pass: 95
		}
	}
]
export const PRICE_TITLE = {
	SINGLE: 'Pojedyncze',
	PASS: 'Karnet*'
}