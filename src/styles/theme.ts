const fontStack = [
  'Gotham',
  'system-ui',
  '-apple-system',
  'BlinkMacSystemFont',
  'San Francisco',
  'Roboto',
  'Segoe UI',
  'Oxygen',
  'Ubuntu',
  'Cantarell',
  'Helvetica Neue',
  'sans-serif',
];

const monoFontStack = [
  'SFMono Regular',
  'Roboto Mono',
  'Consolas',
  'Liberation Mono',
  'Menlo',
  'Courier',
  'monospace',
];

export type Theme = {
  id: 'light' | 'dark';
  curveFastoutSlowin: string;
  fontStack: string;
  monoFontStack: string;
  fontWeightRegular: number;
  fontWeightMedium: number;
  fontWeightBold: number;
  rgbBlack: string;
  rgbWhite: string;
  rgbBackground: string;
  rgbBackgroundLight: string;
  rgbTitle: string;
  rgbText: string;
  rgbPrimary: string;
  rgbAccent: string;
};

const base = {
  curveFastoutSlowin: 'cubic-bezier(0.4, 0.0, 0.2, 1)',
  fontStack: fontStack.join(', '),
  monoFontStack: monoFontStack.join(', '),
  fontWeightRegular: 400,
  fontWeightMedium: 500,
  fontWeightBold: 700,
  rgbBlack: '0 0 0',
  rgbWhite: '255 255 255',
};

const dark = {
  id: 'dark' as Theme['id'],
  ...base,
  rgbBackground: '17 17 17',
  rgbBackgroundLight: '26 26 26',
  rgbTitle: '255 255 255',
  rgbText: '255 255 255',
  rgbPrimary: '0 229 255',
  rgbAccent: '0 229 255',
};

const light = {
  id: 'light' as Theme['id'],
  ...base,
  rgbBackground: '242 242 242',
  rgbBackgroundLight: '255 255 255',
  rgbTitle: '0 0 0',
  rgbText: '51 51 51',
  rgbPrimary: '0 0 0',
  rgbAccent: '0 229 255',
};

export const createThemeProperties = (themeProperties: Theme) => {
  return Object.keys(themeProperties).map((key) => `--${key}: ${themeProperties[key]};`);
};

export const theme: { [name: string]: Theme } = { dark, light };
