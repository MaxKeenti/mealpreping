import { describe, expect, it } from 'vitest';
import en from '../../../messages/en.json';
import es from '../../../messages/es.json';
import { formatCurrencyMxn } from './cost';
import { formatNumber } from './units';

describe('i18n catalogs and formatting', () => {
	it('keeps the Spanish catalog in parity with English', () => {
		const enKeys = Object.keys(en).sort();
		const esKeys = Object.keys(es).sort();

		expect(esKeys).toEqual(enKeys);
	});

	it('formats numbers and MXN using locale-aware helpers', () => {
		expect(formatNumber(1234.5, 1, 'es')).toBe(new Intl.NumberFormat('es-MX', {
			minimumFractionDigits: 0,
			maximumFractionDigits: 1
		}).format(1234.5));
		expect(formatCurrencyMxn(1234, 'es')).toBe(new Intl.NumberFormat('es-MX', {
			style: 'currency',
			currency: 'MXN',
			minimumFractionDigits: 0,
			maximumFractionDigits: 0
		}).format(1234));
	});
});
