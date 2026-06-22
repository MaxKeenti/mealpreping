import type { Locale } from './types';

export interface LocalizedName {
	name: string;
	nameEs?: string;
}

export function localizedName(item: LocalizedName, locale: Locale = 'en'): string {
	return locale === 'es' ? (item.nameEs ?? item.name) : item.name;
}
