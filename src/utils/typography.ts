export type FluidTypeScale = {
	base_step: string; // Not type-safe, has to be implemented;
	base_value_max: number;
	base_value_min: number;
	prefix?: string;
	scale_max: number;
	scale_min: number;
	steps: Array<string> | ReadonlyArray<string>;
};

export type FluidType = {
	max_screen_width: number;
	min_screen_width: number;
	precision?: number;
	rem_value: number;
};

export function fluid_type(
	{ max_screen_width, min_screen_width, precision = 2, rem_value }: FluidType,
	sizes_pixel: [number, number],
): string {
	const MINIMUM_SCREEN_WIDTH = 300,
		min_size_pixel = sizes_pixel[0],
		max_size_pixel = sizes_pixel[1];

	if (
		min_size_pixel <= 0 &&
		max_size_pixel <= 0 &&
		rem_value <= 0 &&
		max_screen_width <= 0 &&
		precision < 0
	) {
		throw new Error(`Provide positive values.`);
	}

	if (min_screen_width < MINIMUM_SCREEN_WIDTH) {
		throw new Error(`Minimal screen width must be greater than ${MINIMUM_SCREEN_WIDTH} pixels`);
	}

	const font_slope = (max_size_pixel - min_size_pixel) / (max_screen_width - min_screen_width),
		font_slope_percentage = round(font_slope * 100, precision),
		intercepter = round((min_size_pixel - font_slope * min_screen_width) / rem_value, precision),
		min_size_rem = round(min_size_pixel / rem_value, precision),
		max_size_rem = round(max_size_pixel / rem_value, precision);

	return `clamp(${min_size_rem}rem, ${font_slope_percentage}vw + ${intercepter}rem, ${max_size_rem}rem)`;
}

export function fluid_type_scale(
	{
		base_step,
		base_value_max,
		base_value_min,
		prefix,
		scale_max,
		scale_min,
		steps,
	}: FluidTypeScale,
	{ max_screen_width, min_screen_width, precision, rem_value }: FluidType,
): Record<string, string> {
	const res: Array<Record<string, string>> = [];

	for (const [index, step] of steps.entries()) {
		const power = index - steps.indexOf(base_step),
			min = base_value_min * scale_min ** power,
			max = base_value_max * scale_max ** power;
		res.push({
			[prefix === undefined ? step : `${prefix}-${step}`]: fluid_type(
				{
					max_screen_width,
					min_screen_width,
					precision,
					rem_value,
				},
				[min, max],
			),
		});
	}

	return flat_object_array(res);
}

export function weight_scale(): Record<string, string> {
	const res: Array<Record<string, string>> = [];

	for (let i = 50; i <= 1000; i += 50) {
		res.push({ [`${i}`]: `${i}` });
	}

	return flat_object_array(res);
}

export function round(num: number, precision: number): number {
	return +num.toFixed(precision);
}

export function flat_object_array(
	obj_array: Array<Record<string, string>>,
): Record<string, string> {
	return obj_array.reduce((prev, next) => ({ ...prev, ...next }));
}
