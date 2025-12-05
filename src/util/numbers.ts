interface CurrencyOptions {
    locale?: string;
    currency?: string;
}

export const number = (value: number | string): string => {
    const num = Number(Number.parseFloat(value as string));

    if (Number.isNaN(num.valueOf())) {
        return '0';
    }

    return num.toLocaleString('fi');
};

export const currency = (value: number | string, precision: number = 2, options: CurrencyOptions = {}): string => {
    const num = Number(Number.parseFloat(value as string));

    return num.toLocaleString(options.locale || 'fi', {
        minimumFractionDigits: !Number.isNaN(Number.parseInt(`${precision}`, 10)) ? precision : 2,
        maximumFractionDigits: !Number.isNaN(Number.parseInt(`${precision}`, 10)) ? precision : 2,
        style: 'currency',
        currency: options.currency || 'EUR',
    });
};
