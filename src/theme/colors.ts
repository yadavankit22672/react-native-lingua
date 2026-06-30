export const colors = {
  primary: '#58CC02',
  'primary-shadow': '#58A700',
  secondary: '#1CB0F6',
  'secondary-shadow': '#1899D6',
  danger: '#FF4B4B',
  'danger-shadow': '#EA1515',
  warning: '#FFC800',
  'warning-shadow': '#F49000',
  neutral: {
    100: '#F7F7F7',
    200: '#E5E5E5',
    300: '#AFAFAF',
    400: '#777777',
    500: '#4B4B4B',
  },
  white: '#FFFFFF',
  black: '#000000',
} as const;

export type Colors = typeof colors;
