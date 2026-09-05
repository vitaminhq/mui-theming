import { alpha, createTheme, darken, lighten, type PaletteMode } from '@mui/material/styles'
import { allThemes } from 'mui-theme-collection'

export type LabelStyle = 'above' | 'inside' | 'float-inside'

export type ThemeColors = {
  primary: string
  secondary: string
  background: string
  surface: string
  surfaceRaised: string
  foreground: string
  muted: string
  border: string
  success: string
  error: string
}

export type ThemeTokens = ThemeColors & {
  mode: PaletteMode
  radius: number
  controlHeight: number
  density: 'compact' | 'comfortable'
  panelStyle: 'flat' | 'soft' | 'glow' | 'glass'
  labelStyle: LabelStyle
}

export type ThemePreset = {
  description: string
  radius: number
  controlHeight: number
  density: ThemeTokens['density']
  panelStyle: ThemeTokens['panelStyle']
  labelStyle: LabelStyle
  light: ThemeColors
  dark: ThemeColors
}

export const presets: Record<string, ThemePreset> = {
  Maia: {
    description: 'Clean shadcn-like application UI with crisp neutral surfaces.',
    radius: 10, controlHeight: 40, density: 'comfortable', panelStyle: 'flat', labelStyle: 'above',
    light: { primary: '#18181b', secondary: '#7c3aed', background: '#f8fafc', surface: '#ffffff', surfaceRaised: '#ffffff', foreground: '#0f172a', muted: '#64748b', border: '#e2e8f0', success: '#16a34a', error: '#dc2626' },
    dark: { primary: '#fafafa', secondary: '#a78bfa', background: '#09090b', surface: '#111113', surfaceRaised: '#18181b', foreground: '#fafafa', muted: '#a1a1aa', border: '#27272a', success: '#4ade80', error: '#fb7185' },
  },
  Glassy: {
    description: 'Material-inspired glass system from the mobile chat demo: translucent blurred surfaces, expressive radii, pill controls, and violet/cyan atmosphere.',
    radius: 24, controlHeight: 44, density: 'comfortable', panelStyle: 'glass', labelStyle: 'above',
    light: { primary: '#6558d8', secondary: '#62c7d9', background: '#ecebff', surface: 'rgba(255,255,255,.62)', surfaceRaised: 'rgba(255,255,255,.55)', foreground: '#211f36', muted: '#6f6b84', border: 'rgba(255,255,255,.72)', success: '#299b74', error: '#cf4d6f' },
    dark: { primary: '#a99fff', secondary: '#79d8e7', background: '#111126', surface: 'rgba(34,33,58,.66)', surfaceRaised: 'rgba(45,43,74,.62)', foreground: '#f4f2ff', muted: '#aaa6c3', border: 'rgba(255,255,255,.13)', success: '#5bd1a4', error: '#ff7897' },
  },
  'Terminal Mint': {
    description: 'Dense derivatives terminal: low radius, hard borders, mint trading accent.',
    radius: 4, controlHeight: 34, density: 'compact', panelStyle: 'flat', labelStyle: 'float-inside',
    light: { primary: '#087f5b', secondary: '#0f766e', background: '#f4f8f6', surface: '#ffffff', surfaceRaised: '#f9fbfa', foreground: '#101814', muted: '#607068', border: '#d7e1dc', success: '#0f9f6e', error: '#dc4c64' },
    dark: { primary: '#3ee6a7', secondary: '#5eead4', background: '#080d0b', surface: '#0d1411', surfaceRaised: '#121b17', foreground: '#e8f5ef', muted: '#7e958a', border: '#203029', success: '#3ee6a7', error: '#ff667d' },
  },
  'Perps Violet': {
    description: 'Polished pro-trading aesthetic with violet identity and layered charcoal surfaces.',
    radius: 7, controlHeight: 38, density: 'compact', panelStyle: 'soft', labelStyle: 'float-inside',
    light: { primary: '#6554c0', secondary: '#8b5cf6', background: '#f7f7fb', surface: '#ffffff', surfaceRaised: '#fbfaff', foreground: '#171526', muted: '#716e83', border: '#e4e1ed', success: '#159570', error: '#d84f68' },
    dark: { primary: '#9b87f5', secondary: '#c084fc', background: '#0b0a10', surface: '#121118', surfaceRaised: '#191721', foreground: '#f0eef7', muted: '#8c879e', border: '#292633', success: '#42d3a2', error: '#ff6b83' },
  },
  'Neon Liquidity': {
    description: 'Crypto-native black canvas with acid lime and electric cyan accents.',
    radius: 12, controlHeight: 42, density: 'comfortable', panelStyle: 'glow', labelStyle: 'inside',
    light: { primary: '#167d3d', secondary: '#008c9e', background: '#f4fff8', surface: '#ffffff', surfaceRaised: '#f7fffb', foreground: '#08130d', muted: '#587064', border: '#cde7d8', success: '#10a866', error: '#e54867' },
    dark: { primary: '#b7ff3c', secondary: '#27e8d1', background: '#050706', surface: '#0a0e0c', surfaceRaised: '#0f1512', foreground: '#f3ffe9', muted: '#7d9386', border: '#1d2d24', success: '#69f5ad', error: '#ff5f79' },
  },
  'Midnight Exchange': {
    description: 'Institutional navy exchange UI with icy blue accents and restrained elevation.',
    radius: 6, controlHeight: 38, density: 'compact', panelStyle: 'soft', labelStyle: 'above',
    light: { primary: '#2563eb', secondary: '#0284c7', background: '#f4f7fb', surface: '#ffffff', surfaceRaised: '#f8fbff', foreground: '#101828', muted: '#667085', border: '#dfe5ee', success: '#12966f', error: '#d94c61' },
    dark: { primary: '#5aa7ff', secondary: '#38bdf8', background: '#07101d', surface: '#0b1626', surfaceRaised: '#102036', foreground: '#edf5ff', muted: '#8294ab', border: '#1c3049', success: '#45d5a5', error: '#ff6b7f' },
  },
}

type ThirdPartyPreset = { name?: string; description?: string; theme?: any }
const THIRD_PARTY_PREFIX = '3P · '
const thirdPartyEntries = Object.values(allThemes as Record<string, ThirdPartyPreset>)
  .filter((entry) => entry?.theme)
  .sort((a, b) => (a.name ?? '').localeCompare(b.name ?? ''))

const thirdPartyByDisplayName = new Map(
  thirdPartyEntries.map((entry) => [`${THIRD_PARTY_PREFIX}${entry.name ?? 'Unnamed'}`, entry]),
)

for (const [displayName, source] of thirdPartyByDisplayName) {
  presets[displayName] = {
    description: source.description
      ? `${source.description} Adapted from mui-theme-collection and normalized for this lab.`
      : 'Third-party mui-theme-collection preset, normalized to fill missing design-system tokens.',
    radius: 8, controlHeight: 38, density: 'compact', panelStyle: 'soft', labelStyle: 'above',
    light: presets.Maia.light,
    dark: presets.Maia.dark,
  }
}

export const presetNames = Object.keys(presets)
export function getPresetDescription(name: string) { return presets[name]?.description ?? presets.Maia.description }

function normalizeThirdParty(name: string, requestedMode: PaletteMode): ThemeTokens {
  const source = thirdPartyByDisplayName.get(name)
  if (!source) return tokensForPreset('Maia', requestedMode)
  const normalized = createTheme(source.theme)
  const sourceMode = normalized.palette.mode
  const primaryBase = normalized.palette.primary.main
  const secondaryBase = normalized.palette.secondary?.main ?? primaryBase
  const sameMode = sourceMode === requestedMode

  if (requestedMode === 'dark') {
    return {
      mode: 'dark',
      primary: sourceMode === 'dark' ? primaryBase : lighten(primaryBase, .18),
      secondary: sourceMode === 'dark' ? secondaryBase : lighten(secondaryBase, .14),
      background: sameMode ? normalized.palette.background.default : '#090b10',
      surface: sameMode ? normalized.palette.background.paper : '#10131a',
      surfaceRaised: sameMode ? lighten(normalized.palette.background.paper, .025) : '#161a23',
      foreground: sameMode ? normalized.palette.text.primary : '#f3f5f8',
      muted: sameMode ? normalized.palette.text.secondary : '#9aa3b2',
      border: sameMode ? normalized.palette.divider : '#292f3a',
      success: normalized.palette.success.main || '#42d392',
      error: normalized.palette.error.main || '#ff637d',
      radius: Number(normalized.shape.borderRadius) || 8,
      controlHeight: 38, density: 'compact', panelStyle: 'soft', labelStyle: 'above',
    }
  }

  return {
    mode: 'light',
    primary: sourceMode === 'light' ? primaryBase : darken(primaryBase, .22),
    secondary: sourceMode === 'light' ? secondaryBase : darken(secondaryBase, .18),
    background: sameMode ? normalized.palette.background.default : '#f6f7f9',
    surface: sameMode ? normalized.palette.background.paper : '#ffffff',
    surfaceRaised: sameMode ? darken(normalized.palette.background.paper, .012) : '#fafbfc',
    foreground: sameMode ? normalized.palette.text.primary : '#171a21',
    muted: sameMode ? normalized.palette.text.secondary : '#667085',
    border: sameMode ? normalized.palette.divider : '#dfe3ea',
    success: normalized.palette.success.main || '#159570',
    error: normalized.palette.error.main || '#d84f68',
    radius: Number(normalized.shape.borderRadius) || 8,
    controlHeight: 40, density: 'comfortable', panelStyle: 'soft', labelStyle: 'above',
  }
}

export function tokensForPreset(name: string, mode: PaletteMode): ThemeTokens {
  if (name.startsWith(THIRD_PARTY_PREFIX)) return normalizeThirdParty(name, mode)
  const preset = presets[name] ?? presets.Maia
  return {
    mode,
    ...(mode === 'dark' ? preset.dark : preset.light),
    radius: preset.radius,
    controlHeight: preset.controlHeight,
    density: preset.density,
    panelStyle: preset.panelStyle,
    labelStyle: preset.labelStyle,
  }
}

export function createAppTheme(t: ThemeTokens) {
  const isDark = t.mode === 'dark'
  const compact = t.density === 'compact'
  const isGlass = t.panelStyle === 'glass'
  const isAbove = t.labelStyle === 'above'
  const isInside = t.labelStyle === 'inside'
  const isFloatInside = t.labelStyle === 'float-inside'
  const fieldHeight = isAbove ? t.controlHeight : Math.max(t.controlHeight, 58)

  const softShadow = isDark ? '0 10px 30px rgba(0,0,0,.28)' : '0 10px 28px rgba(15,23,42,.07)'
  const glowShadow = `0 0 0 1px ${alpha(t.primary, .08)}, 0 16px 44px ${alpha(t.primary, isDark ? .08 : .05)}`
  const glassShadow = isDark
    ? '0 16px 44px rgba(0,0,0,.24), inset 0 1px 0 rgba(255,255,255,.08)'
    : '0 12px 36px rgba(49,46,94,.12), inset 0 1px 0 rgba(255,255,255,.7)'
  const panelShadow = isGlass ? glassShadow : t.panelStyle === 'glow' ? glowShadow : t.panelStyle === 'soft' ? softShadow : 'none'
  const glassSurface = isDark
    ? 'linear-gradient(180deg, rgba(44,42,72,.72), rgba(30,29,52,.52))'
    : 'linear-gradient(180deg, rgba(255,255,255,.72), rgba(255,255,255,.48))'
  const glassBackdrop = 'blur(24px) saturate(145%)'
  const glassPageBackground = isDark
    ? 'radial-gradient(circle at 20% 4%, rgba(128,105,230,.25), transparent 31%), radial-gradient(circle at 85% 24%, rgba(69,174,191,.18), transparent 34%), linear-gradient(160deg,#111126 0%,#12242a 48%,#211628 100%)'
    : 'radial-gradient(circle at 20% 4%, rgba(157,132,255,.42), transparent 31%), radial-gradient(circle at 85% 24%, rgba(94,211,221,.34), transparent 34%), linear-gradient(160deg,#f5f1ff 0%,#e9f5f7 48%,#f8eff7 100%)'

  const labelRoot: any = isAbove ? {
    position: 'static',
    transform: 'none',
    fontSize: 13,
    lineHeight: 1.25,
    marginLeft: 2,
    color: t.muted,
    '&.MuiInputLabel-shrink': { transform: 'none' },
  } : isInside ? {
    transform: 'translate(14px, 7px) scale(.75)',
    transformOrigin: 'top left',
    color: t.muted,
    pointerEvents: 'none',
    '&.MuiInputLabel-shrink': { transform: 'translate(14px, 7px) scale(.75)' },
  } : {
    transform: 'translate(14px, 18px) scale(1)',
    transformOrigin: 'top left',
    color: t.muted,
    pointerEvents: 'none',
    '&.MuiInputLabel-shrink': { transform: 'translate(14px, 7px) scale(.75)' },
  }

  return createTheme({
    palette: {
      mode: t.mode,
      primary: { main: t.primary }, secondary: { main: t.secondary },
      success: { main: t.success }, error: { main: t.error },
      background: { default: t.background, paper: t.surface },
      text: { primary: t.foreground, secondary: t.muted }, divider: t.border,
    },
    shape: { borderRadius: t.radius },
    spacing: compact ? 7 : 8,
    typography: {
      fontFamily: 'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      fontSize: compact ? 13 : 14,
      button: { textTransform: 'none', fontWeight: 650, letterSpacing: '-0.01em' },
      h4: { fontWeight: 760, letterSpacing: '-0.035em' },
      h6: { fontWeight: 720, letterSpacing: '-0.025em' },
      overline: { fontWeight: 700, letterSpacing: '.09em' },
    },
    shadows: Array(25).fill('none') as any,
    components: {
      MuiCssBaseline: { styleOverrides: { body: { backgroundImage: isGlass ? glassPageBackground : 'none', backgroundAttachment: isGlass ? 'fixed' : undefined }, '*': { boxSizing: 'border-box' }, '::selection': { background: alpha(t.primary, .25) } } },
      MuiButtonBase: { defaultProps: { disableRipple: true } },
      MuiFormControl: { styleOverrides: { root: isAbove ? { gap: 6 } : {} } },
      MuiInputLabel: { defaultProps: isInside ? { shrink: true } : {}, styleOverrides: { root: labelRoot } },
      MuiAppBar: { styleOverrides: { root: { backgroundImage: 'none', ...(isGlass ? { background: glassSurface, backdropFilter: glassBackdrop, WebkitBackdropFilter: glassBackdrop, borderColor: t.border } : {}) } } },
      MuiButton: {
        defaultProps: { disableElevation: true },
        styleOverrides: {
          root: { minHeight: t.controlHeight, borderRadius: isGlass ? 999 : t.radius, paddingInline: compact ? 12 : 15, boxShadow: 'none' },
          outlined: { borderColor: t.border, ...(isGlass ? { background: alpha(t.surfaceRaised, .72), backdropFilter: 'blur(18px)' } : {}) },
          containedPrimary: t.panelStyle === 'glow' ? { boxShadow: `0 0 22px ${alpha(t.primary, .16)}` } : {},
        },
      },
      MuiIconButton: { styleOverrides: { root: { borderRadius: isGlass ? 999 : t.radius } } },
      MuiPaper: { styleOverrides: { root: { backgroundImage: 'none', border: `1px solid ${t.border}`, ...(isGlass ? { background: glassSurface, backdropFilter: glassBackdrop, WebkitBackdropFilter: glassBackdrop, boxShadow: glassShadow } : {}) }, elevation1: { boxShadow: panelShadow } } },
      MuiCard: { styleOverrides: { root: { backgroundColor: isGlass ? 'transparent' : t.surface, ...(isGlass ? { background: glassSurface, backdropFilter: glassBackdrop, WebkitBackdropFilter: glassBackdrop } : {}), boxShadow: panelShadow, borderColor: t.border } } },
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            minHeight: fieldHeight,
            borderRadius: isGlass ? 999 : t.radius,
            backgroundColor: t.surfaceRaised,
            ...(isGlass ? { backdropFilter: 'blur(18px)', WebkitBackdropFilter: 'blur(18px)' } : {}),
            '& .MuiOutlinedInput-notchedOutline': { borderColor: t.border },
            '& .MuiOutlinedInput-notchedOutline legend': { maxWidth: 0, width: 0, padding: 0 },
            '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: alpha(t.foreground, .34) },
            '&.Mui-focused': { boxShadow: `0 0 0 3px ${alpha(t.primary, .14)}` },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: t.primary, borderWidth: 1 },
          },
          input: !isAbove ? { paddingTop: 22, paddingBottom: 7 } : {},
          multiline: !isAbove ? { paddingTop: 20 } : {},
        },
      },
      MuiSelect: { styleOverrides: { select: !isAbove ? { paddingTop: '22px !important', paddingBottom: '7px !important' } : {} } },
      MuiFormHelperText: { styleOverrides: { root: isAbove ? { marginLeft: 2 } : {} } },
      MuiChip: { styleOverrides: { root: { borderRadius: isGlass ? 999 : Math.max(4, t.radius - 2), fontWeight: 650, ...(isGlass ? { backdropFilter: 'blur(14px)' } : {}) } } },
      MuiDialog: { styleOverrides: { paper: { borderRadius: isGlass ? 32 : t.radius + 4, boxShadow: panelShadow, ...(isGlass ? { background: glassSurface, backdropFilter: glassBackdrop, WebkitBackdropFilter: glassBackdrop } : {}) } } },
      MuiMenu: { styleOverrides: { paper: { padding: 4, backgroundColor: isGlass ? 'transparent' : t.surfaceRaised, boxShadow: panelShadow, ...(isGlass ? { background: glassSurface, backdropFilter: glassBackdrop, WebkitBackdropFilter: glassBackdrop } : {}) } } },
      MuiMenuItem: { styleOverrides: { root: { borderRadius: isGlass ? 18 : Math.max(4, t.radius - 2), minHeight: compact ? 32 : 36 } } },
      MuiTabs: { styleOverrides: { indicator: { height: 2, borderRadius: 2 } } },
      MuiTab: { styleOverrides: { root: { textTransform: 'none', minHeight: compact ? 38 : 42, fontWeight: 650, borderRadius: isGlass ? 999 : undefined } } },
      MuiTableCell: { styleOverrides: { root: { borderColor: t.border, paddingTop: compact ? 8 : 12, paddingBottom: compact ? 8 : 12 } } },
      MuiTooltip: { styleOverrides: { tooltip: { background: isDark ? '#f4f4f5' : '#111827', color: isDark ? '#111827' : '#fff', fontSize: 12, borderRadius: isGlass ? 14 : Math.max(4, t.radius - 2) } } },
    },
  })
}
