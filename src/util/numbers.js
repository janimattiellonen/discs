export const number = (value) => {
    const num = Number(Number.parseFloat(value));

    if (Number.isNaN(num.valueOf())) {
        return 0;
    }

    return num.toLocaleString('fi');
};

export const currency = (value, precision = 2, options = {}) => {
    const num = Number(Number.parseFloat(value));

    return num.toLocaleString(options.locale || 'fi', {
        minimumFractionDigits: !Number.isNaN(Number.parseInt(`${precision}`, 10)) ? precision : 2,
        maximumFractionDigits: !Number.isNaN(Number.parseInt(`${precision}`, 10)) ? precision : 2,
        style: 'currency',
        currency: options.currency || 'EUR',
    });
};
