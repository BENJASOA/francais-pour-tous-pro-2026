// Color palette
export const colors = {
  primary: '#1976d2',
  secondary: '#dc004e',
  success: '#4caf50',
  error: '#f44336',
  warning: '#ff9800',
  info: '#2196f3',
  light: '#f5f5f5',
  dark: '#212121',
  background: '#fafafa',
  surface: '#ffffff',
  border: '#e0e0e0',
};

// Dark mode colors
export const darkColors = {
  primary: '#90caf9',
  secondary: '#f48fb1',
  success: '#81c784',
  error: '#ef5350',
  warning: '#ffb74d',
  info: '#64b5f6',
  light: '#424242',
  dark: '#fafafa',
  background: '#121212',
  surface: '#1e1e1e',
  border: '#424242',
};

// Spacing
export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

// Typography
export const typography = {
  h1: { fontSize: 32, fontWeight: 'bold' },
  h2: { fontSize: 28, fontWeight: 'bold' },
  h3: { fontSize: 24, fontWeight: 'bold' },
  h4: { fontSize: 20, fontWeight: 'bold' },
  h5: { fontSize: 18, fontWeight: 'bold' },
  h6: { fontSize: 16, fontWeight: 'bold' },
  body1: { fontSize: 16, fontWeight: 'normal' },
  body2: { fontSize: 14, fontWeight: 'normal' },
  caption: { fontSize: 12, fontWeight: 'normal' },
  button: { fontSize: 14, fontWeight: 'bold' },
};

// Border radius
export const borderRadius = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  full: 9999,
};

// Shadows
export const shadows = {
  sm: '0 1px 2px rgba(0,0,0,0.05)',
  md: '0 4px 6px rgba(0,0,0,0.1)',
  lg: '0 10px 15px rgba(0,0,0,0.1)',
  xl: '0 20px 25px rgba(0,0,0,0.1)',
};

// Animation
export const animation = {
  duration: {
    shortest: 150,
    shorter: 200,
    short: 250,
    standard: 300,
    complex: 375,
    enteringScreen: 225,
    leavingScreen: 195,
  },
  easing: {
    easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    easeOut: 'cubic-bezier(0.0, 0, 0.2, 1)',
    easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
    linear: 'linear',
  },
};

// Breakpoints
export const breakpoints = {
  xs: 0,
  sm: 600,
  md: 960,
  lg: 1264,
  xl: 1904,
};
