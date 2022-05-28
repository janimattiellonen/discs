const breakpoints = {
  xs: 0,
  sm: 600,
  md: 960,
}

export const theme = {
  mq: (breakpoint, type = 'min') => {
    return `@media (${type}-width: ${breakpoints[breakpoint] ? breakpoints[breakpoint] : breakpoint}px)`
  },
}
