const breakpoints = {
    xs: 0,
    sm: 600,
    md: 960,
};

export const colors = {
    black: '#000000',
    white: '#ffffff',
    linkBlue: '#337ab7',
};

export const theme = {
    colors,
    mq: (breakpoint, type = 'min') =>
        `@media (${type}-width: ${breakpoints[breakpoint] ? breakpoints[breakpoint] : breakpoint}px)`,
};
