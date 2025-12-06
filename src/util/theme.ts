type BreakpointKey = 'xs' | 'sm' | 'md';
type MediaQueryType = 'min' | 'max';

const breakpoints: Record<BreakpointKey, number> = {
    xs: 0,
    sm: 600,
    md: 960,
};

export const theme = {
    mq: (
        breakpoint: BreakpointKey | number,
        type: MediaQueryType = 'min',
    ): string =>
        `@media (${type}-width: ${
            typeof breakpoint === 'string' && breakpoints[breakpoint]
                ? breakpoints[breakpoint]
                : breakpoint
        }px)`,
};
