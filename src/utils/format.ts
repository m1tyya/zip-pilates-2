import { format } from 'date-fns';
import { pl } from 'date-fns/locale';

type DateString = Date | string

export function format_date_readable(date: DateString): string {
	return format(new Date(date), 'dd MMMM yyyy', { locale: pl });
}

export function format_date(date: DateString): string {
	return format(new Date(date), 'yyyy-MM-dd');
}