import merge from 'lodash/merge';

import colors from './colors';
import tags from './tags';

enum BreakPoints {
  phoneSmall = 'phone_small',
  phone = 'phone',
  phablet = 'phablet',
  tablet = 'tablet',
  desktop = 'desktop',
  desktopMedium = 'desktop_medium',
  desktopLarge = 'desktop_large'
}

export const Sizes: Record<BreakPoints, number> = {
  [BreakPoints.phoneSmall]: 320,
  [BreakPoints.phone]: 376,
  [BreakPoints.phablet]: 540,
  [BreakPoints.tablet]: 735,
  [BreakPoints.desktop]: 1070,
  [BreakPoints.desktopMedium]: 1280,
  [BreakPoints.desktopLarge]: 1440
};

const breakpoints = Object.keys(Sizes).map(ok => [ok, Sizes[ok]]);

const fonts = {
  serif: "'Merriweather', Georgia, Serif",
  sansSerif:
    "'SF Pro Display', '-apple-system', 'BlinkMacSystemFont', 'San Francisco', 'Helvetica Neue', 'Helvetica', 'Ubuntu', 'Roboto', 'Noto', 'Segoe UI', 'Arial', sans-serif",
  monospace: `"Operator Mono", Consolas, Menlo, Monaco, source-code-pro, Courier New, monospace`
};

const colorModeTransition = 'background 0.25s var(--ease-in-out-quad), color 0.25s var(--ease-in-out-quad)';

export default merge({
  initialColorMode: 'light',
  useCustomProperties: true,
  colorModeTransition,
  colors,
  fonts,
  breakpoints,
  tags
});
