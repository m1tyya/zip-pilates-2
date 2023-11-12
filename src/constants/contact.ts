import {
	type RegisterOptions,
} from 'react-hook-form';
import { type ElementType } from 'react';

export type InputData = {
	email: string;
	message: string;
	name: string;
	subject: string;
};

export const VALIDATION_MESSAGES = {
	EMAIL: `Nieprawidłowy e-mail`,
	MAX: `Za długo`,
	MIN: `Za krótki`,
	REQUIRED: `Wymagane`,
};

export const INPUTS: Array<{
	label: string;
	name: keyof InputData;
	options?: RegisterOptions;
	placeholder?: string;
	Tag: ElementType;
	type: string;
}> = [
	{
		label: `Imię`,
		name: `name`,
		options: {
			maxLength: {
				message: VALIDATION_MESSAGES.MAX,
				value: 25,
			},
			minLength: { message: VALIDATION_MESSAGES.MIN, value: 2 },
			required: VALIDATION_MESSAGES.REQUIRED,
		},
		Tag: `input`,
		type: `text`,
	},
	{
		label: `Email`,
		name: `email`,
		options: {
			maxLength: {
				message: VALIDATION_MESSAGES.MAX,
				value: 40,
			},
			pattern: {
				message: VALIDATION_MESSAGES.EMAIL,
				value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
			},
			required: VALIDATION_MESSAGES.REQUIRED,
		},
		Tag: `input`,
		type: `email`,
	},
	{
		label: `Temat`,
		name: `subject`,
		options: {
			maxLength: {
				message: VALIDATION_MESSAGES.MAX,
				value: 30,
			},
			minLength: { message: VALIDATION_MESSAGES.MIN, value: 5 },
			required: VALIDATION_MESSAGES.REQUIRED,
		},
		Tag: `input`,
		type: `text`,
	},
	{
		label: `Wiadomość`,
		name: `message`,
		options: {
			maxLength: {
				message: VALIDATION_MESSAGES.MAX,
				value: 600,
			},
			minLength: { message: VALIDATION_MESSAGES.MIN, value: 10 },
			required: VALIDATION_MESSAGES.REQUIRED,
		},
		Tag: `textarea`,
		type: `text`,
	},
];