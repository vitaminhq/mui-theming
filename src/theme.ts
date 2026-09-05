import { alpha, createTheme, type PaletteMode } from '@mui/material/styles'

export type ThemeTokens = {
  mode: PaletteMode
  primary: string
  background: string
  surface: string
  foreground: string
  muted: string
  border: string
  radius: number
}

export const presets: Record<string, ThemeTokens> = {
  'Maia-inspired': {
    mode: 'light',
    primary: '#2563eb',
    background: '#f8fafc',
    surface: '#ffffff',
    foreground: '#0f172a',
    muted: '#64748b',
    border: '#e2e8f0',
    radius: 10,
  },
  'Warm Sand': {
    mode: 'light',
    primary: '#b45309',
    background: '#faf7f2',
    surface: '#fffdf9',
    foreground: '#292524',
    muted: '#78716c',
    border: '#e7e5e4',
    radius: 12,
  },
  'Graphite': {
    mode: 'dark',
    primary: '#a3e635',
    background: '#111315',
    surface: '#17191c',
    foreground: '#f4f4f5',
    muted: '#a1a1aa',
    border: '#2a2d31',
    radius: 8,
  },
}

export function createAppTheme(t: ThemeTokens) {
  const isDark = t.mode === 'dark'
  return createTheme({
    palette: {
      mode: t.mode,
      primary: { main: t.primary },
      background: { default: t.background, paper: t.surface },
      text: { primary: t.foreground, secondary: t.muted },
      divider: t.border,
    },
    shape: { borderRadius: t.radius },
    typography: {
      fontFamily: 'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      button: { textTransform: 'none', fontWeight: 600 },
      h4: { fontWeight: 750, letterSpacing: '-0.03em' },
      h6: { fontWeight: 700, letterSpacing: '-0.02em' },
    },
    shadows: Array(25).fill('none') as any,
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: { backgroundImage: 'none' },
          '*': { boxSizing: 'border-box' },
        },
      },
      MuiButtonBase: { defaultProps: { disableRipple: true } },
      MuiButton: {
        defaultProps: { disableElevation: true },
        styleOverrides: {
          root: {
            minHeight: 38,
            borderRadius: t.radius,
            paddingInline: 14,
            boxShadow: 'none',
          },
          outlined: { borderColor: t.border },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: { backgroundImage: 'none', border: `1px solid ${t.border}` },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: { boxShadow: 'none' },
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            minHeight: 40,
            borderRadius: t.radius,
            backgroundColor: t.surface,
            '& .MuiOutlinedInput-notchedOutline': { borderColor: t.border },
            '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: alpha(t.foreground, 0.28) },
            '&.Mui-focused': { boxShadow: `0 0 0 3px ${alpha(t.primary, 0.14)}` },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: t.primary, borderWidth: 1 },
          },
        },
      },
      MuiInputLabel: {
        styleOverrides: { root: { color: t.muted } },
      },
      MuiChip: {
        styleOverrides: {
          root: { borderRadius: Math.max(6, t.radius - 2), fontWeight: 600 },
        },
      },
      MuiDialog: {
        styleOverrides: { paper: { borderRadius: t.radius + 4 } },
      },
      MuiMenu: {
        styleOverrides: { paper: { padding: 4 } },
      },
      MuiMenuItem: {
        styleOverrides: { root: { borderRadius: Math.max(6, t.radius - 2), minHeight: 36 } },
      },
      MuiTabs: {
        styleOverrides: { indicator: { height: 2, borderRadius: 2 } },
      },
      MuiTab: {
        styleOverrides: { root: { textTransform: 'none', minHeight: 42, fontWeight: 600 } },
      },
      MuiTooltip: {
        styleOverrides: {
          tooltip: {
            background: isDark ? '#f4f4f5' : '#111827',
            color: isDark ? '#111827' : '#fff',
            fontSize: 12,
            borderRadius: 7,
          },
        },
      },
    },
  })
}
