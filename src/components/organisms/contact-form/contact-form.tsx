import emailjs from '@emailjs/browser';
import {
	useForm,
	type RegisterOptions,
	type SubmitErrorHandler,
	type SubmitHandler,
} from 'react-hook-form';
import { DevTool } from '@hookform/devtools';
import { type ElementType, useRef } from 'react';
import clsx from 'clsx';
import { ENV } from '~/env';
import { Button } from '~/components/molecules';
import { random_int } from '~';
import { INPUTS, type InputData } from '~/constants';

const input_props = {
	border_color: `[#e3e3e3]`,
	border_radius: `3xl`,
	border_style: `solid`,
	border_width: `2`,
	padding: [`3`, `8`],
	styles: `peer outline-none focus:border-[#0c46da] invalid:border-red-500 duration-[200ms]`,
};

const placeholder_focus_styles = `text-fluid-xs top-0 px-2`,
	label_styles = `duration-300 top-[50%] -translate-y-1/2 absolute bg-white transform transition-all left-8 peer-focus:text-fluid-xs peer-focus:top-0 peer-focus:px-2`;


function generate_reference_number(): string {
	return random_int(1, 1_000_000).toString();
}

export function ContactForm(): JSX.Element {
	const {
			control,
			formState: { errors },
			handleSubmit,
			register,
		} = useForm<InputData>({ reValidateMode: `onSubmit` }),
		on_submit: SubmitHandler<InputData> = async (data, event) => {
			event?.preventDefault();

			const reference_number = generate_reference_number();
			await emailjs.send(
				ENV.PUBLIC_FORM_SERVICE_ID,
				ENV.PUBLIC_FORM_TEMPLATE_ID,
				{ ...data, reference_number },
				ENV.PUBLIC_FORM_PUBLIC_KEY,
			);
		},
		on_error: SubmitErrorHandler<InputData> = (errors) => {
			for (const err of error_ref.current) {
				toggle_error(err);
			}
		},
		error_ref = useRef<Array<HTMLParagraphElement>>([]);

	function handle_change(e: React.ChangeEvent<HTMLInputElement>): void {
		toggle_label(e.target);
		hide_error(e.target.id);
	}

	function toggle_label(target: HTMLInputElement): void {
		const label = document.getElementById(`${target.id}_label`) as HTMLLabelElement | null;

		if (!label) {
			console.warn(`Failed to retrieve ${target.id} input label`);

			return;
		}

		const is_empty = target.value.length === 0;

		if (is_empty) {
			label.classList.remove(...placeholder_focus_styles.split(` `));
		} else {
			label.classList.add(...placeholder_focus_styles.split(` `));
		}
	}

	function hide_error(id?: string): void {
		const error = document.getElementById(`${id}_error`) as HTMLParagraphElement | null;

		if (!error) {
			console.warn(`Failed to retrieve ${id} input error`);

			return;
		}

		error.style.opacity = `0`;
	}

	function toggle_error(error: HTMLParagraphElement): void {
		// error.innerText = errors[error.id.slice(0, -6) as keyof InputData]?.message ?? ``;
		// error.style.opacity = error.innerText.length === 0 ? `0` : `1`;
		error.style.opacity = `1`;
	}
	
	return (
		<form
			className='relative flex w-[70%] flex-col gap-4 sm:w-1/2'
			noValidate
			onSubmit={handleSubmit(on_submit, on_error)}>
			{INPUTS.map(({ label, name, options, placeholder, Tag, type }, index) => (
				<div className='h-max' key={name}>
					<Tag
						className={`font-text focus:border-secondary-lighter peer w-full resize-none rounded-3xl border-2 border-solid border-[#e3e3e3] px-8 py-3 outline-none duration-[300ms]`}
						id={name}
						placeholder={placeholder}
						rows='4'
						type={type}
						{...register(name, { ...options, onChange: handle_change })}
					/>
					<label
						// eslint-disable-next-line tailwindcss/classnames-order
						className={clsx(
							`z-10 top-[2rem] -translate-y-1/2 absolute left-8  transform bg-white transition-all duration-300 peer-focus:(${placeholder_focus_styles}) pointer-events-none font-text`,
						)}
						id={`${name}_label`}>
						{label}
					</label>
					<p
						className={clsx(
							`text-fluid-sm font-text ml-3 mt-2 h-[1.5rem] leading-[1rem] text-rose-500 duration-[200ms]`,
						)}
						id={`${name}_error`}
						ref={(el) => {
							if (el) {
								error_ref.current[index] = el;
							}
						}}>
						{errors[name]?.message}
					</p>
				</div>
			))}
			{/* <Button
				class='text-center rounded-xl w-full md:w-[70%] mx-auto mt-6 hover:(text-white bg-black) focus:(text-white bg-black) bg-white border-black border-2 py-2 transition-all duration-300'
				text='Wyślij'
				icon='ic:baseline-arrow-forward-ios'
				color='primary'
			/> */}
		</form>);
}