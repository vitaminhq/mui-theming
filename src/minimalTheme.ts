import { alpha, createTheme } from '@mui/material/styles'
import { createAppTheme, presets, type ThemeTokens } from './theme'

declare module '@mui/material/Chip' {
  interface ChipPropsVariantOverrides {
    soft: true
  }
}

// Reconstructed from Minimal's public demo/docs and MIT material-kit implementation.
// Kept as an ordinary MUI theme so existing MUI screens can adopt it without
// depending on Minimal's page/layout components.
presets.Minimal = {
  description: 'Minimal-inspired application UI: airy neutral surfaces, soft elevation, green identity, restrained 8px geometry, and polished data/forms.',
  radius: 8,
  controlHeight: 48,
  density: 'comfortable',
  panelStyle: 'soft',
  labelStyle: 'float-inside',
  light: {
    primary: '#00A76F', secondary: '#8E33FF', background: '#F9FAFB', surface: '#FFFFFF',
    surfaceRaised: '#FFFFFF', foreground: '#1C252E', muted: '#637381', border: '#DFE3E8',
    success: '#22C55E', error: '#FF5630',
  },
  dark: {
    primary: '#00A76F', secondary: '#8E33FF', background: '#141A21', surface: '#1C252E',
    surfaceRaised: '#222B33', foreground: '#FFFFFF', muted: '#919EAB', border: '#454F5B',
    success: '#22C55E', error: '#FF5630',
  },
}

export function createMinimalTheme(tokens: ThemeTokens) {
  const base = createAppTheme(tokens)
  const isDark = tokens.mode === 'dark'
  const grey = {
    50: '#FCFDFD', 100: '#F9FAFB', 200: '#F4F6F8', 300: '#DFE3E8', 400: '#C4CDD5',
    500: '#919EAB', 600: '#637381', 700: '#454F5B', 800: '#1C252E', 900: '#141A21',
  }
  const softShadow = isDark
    ? '0 0 2px rgba(0,0,0,.28), 0 12px 24px -4px rgba(0,0,0,.28)'
    : '0 0 2px rgba(145,158,171,.20), 0 12px 24px -4px rgba(145,158,171,.12)'
  const dropdownShadow = isDark
    ? '0 0 2px rgba(0,0,0,.34), 0 20px 40px -4px rgba(0,0,0,.34)'
    : '0 0 2px rgba(145,158,171,.24), 0 20px 40px -4px rgba(145,158,171,.24)'

  return createTheme(base, {
    palette: { grey },
    typography: {
      fontFamily: '"Public Sans", Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      h4: { fontWeight: 700, letterSpacing: '-0.02em' },
      h5: { fontWeight: 700, letterSpacing: '-0.015em' },
      h6: { fontWeight: 700 },
      subtitle1: { fontWeight: 600 },
      subtitle2: { fontWeight: 600 },
      button: { fontWeight: 700, textTransform: 'none' },
    },
    components: {
      MuiCssBaseline: { styleOverrides: { body: { backgroundColor: tokens.background }, '::selection': { background: alpha(tokens.primary, .22) } } },
      MuiPaper: {
        defaultProps: { elevation: 0 },
        styleOverrides: { root: { border: 0, backgroundImage: 'none' }, rounded: { borderRadius: 16 } },
      },
      MuiCard: {
        styleOverrides: { root: { border: 0, borderRadius: 16, boxShadow: softShadow, backgroundImage: 'none' } },
      },
      MuiCardHeader: { styleOverrides: { root: { padding: 24 }, title: { fontSize: 18, fontWeight: 700 } } },
      MuiCardContent: { styleOverrides: { root: { padding: 24, '&:last-child': { paddingBottom: 24 } } } },
      MuiButton: {
        defaultProps: { disableElevation: true },
        styleOverrides: {
          root: { minHeight: 36, borderRadius: 8, fontSize: 14, paddingInline: 16 },
          sizeLarge: { minHeight: 48, paddingInline: 22 },
          contained: { boxShadow: 'none' },
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            borderRadius: 8, backgroundColor: 'transparent',
            '& .MuiOutlinedInput-notchedOutline': { borderColor: alpha(tokens.muted, .20) },
            '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: tokens.foreground },
            '&.Mui-focused': { boxShadow: 'none' },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderWidth: 2, borderColor: tokens.foreground },
          },
        },
      },
      MuiInputLabel: { styleOverrides: { root: { color: tokens.muted } } },
      MuiTableContainer: { styleOverrides: { root: { borderRadius: 16 } } },
      MuiTableHead: { styleOverrides: { root: { backgroundColor: isDark ? alpha('#919EAB', .12) : '#F4F6F8' } } },
      MuiTableCell: {
        styleOverrides: {
          root: { borderBottom: `1px dashed ${alpha(tokens.muted, .20)}`, padding: '16px 16px' },
          head: { color: tokens.muted, fontSize: 14, fontWeight: 600, borderBottom: 0 },
        },
      },
      MuiChip: {
        styleOverrides: { root: { borderRadius: 8, fontWeight: 700 }, sizeSmall: { height: 24 } },
        variants: [{
          props: { variant: 'soft' },
          style: ({ theme }: any) => ({
            color: theme.palette.text.primary,
            backgroundColor: alpha(theme.palette.text.secondary, .10),
            '&.MuiChip-colorSuccess': { color: theme.palette.success.dark, backgroundColor: alpha(theme.palette.success.main, .16) },
            '&.MuiChip-colorError': { color: theme.palette.error.dark, backgroundColor: alpha(theme.palette.error.main, .16) },
            '&.MuiChip-colorWarning': { color: theme.palette.warning.dark, backgroundColor: alpha(theme.palette.warning.main, .16) },
          }),
        }],
      },
      MuiAvatar: { styleOverrides: { root: { fontWeight: 600 } } },
      MuiDialog: { styleOverrides: { paper: { borderRadius: 16, boxShadow: dropdownShadow } } },
      MuiMenu: { styleOverrides: { paper: { borderRadius: 12, boxShadow: dropdownShadow, padding: 4 } } },
      MuiMenuItem: { styleOverrides: { root: { borderRadius: 8, minHeight: 36 } } },
      MuiTooltip: { styleOverrides: { tooltip: { borderRadius: 8, fontSize: 12 } } },
      MuiTab: { styleOverrides: { root: { minHeight: 48, fontWeight: 600, textTransform: 'none' } } },
    },
  })
}
