import React, { useMemo, useState } from 'react'
import {
  Alert, Avatar, Box, Button, Card, CardContent, Checkbox, Chip, Dialog, DialogActions,
  DialogContent, DialogTitle, Divider, FormControlLabel, IconButton, InputAdornment,
  MenuItem, Paper, Radio, RadioGroup, Select, Slider, Stack, Switch, Tab, Tabs,
  TextField, ThemeProvider, Tooltip, Typography, createTheme,
} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import AddIcon from '@mui/icons-material/Add'
import MoreHorizontalIcon from '@mui/icons-material/MoreHoriz'
import CheckIcon from '@mui/icons-material/Check'
import CloseIcon from '@mui/icons-material/Close'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import SettingsIcon from '@mui/icons-material/Settings'
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined'
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined'

const paletteOptions = [
  ['Neutral', '#18181b'], ['Blue', '#2563eb'], ['Violet', '#7c3aed'], ['Rose', '#e11d48'], ['Orange', '#ea580c'], ['Green', '#16a34a'],
] as const

function makeTheme(mode: 'light' | 'dark', accent: string, radius: number) {
  const dark = mode === 'dark'
  const bg = dark ? '#0a0a0a' : '#ffffff'
  const paper = dark ? '#0f0f10' : '#ffffff'
  const border = dark ? '#27272a' : '#e4e4e7'
  const text = dark ? '#fafafa' : '#09090b'
  const muted = dark ? '#a1a1aa' : '#71717a'
  return createTheme({
    palette: {
      mode,
      primary: { main: accent },
      background: { default: bg, paper },
      text: { primary: text, secondary: muted },
      divider: border,
      success: { main: '#16a34a' },
      error: { main: '#dc2626' },
    },
    shape: { borderRadius: radius },
    typography: {
      fontFamily: 'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      fontSize: 14,
      button: { textTransform: 'none', fontWeight: 500 },
      h5: { fontWeight: 700, letterSpacing: '-0.025em' },
      h6: { fontWeight: 650, letterSpacing: '-0.02em' },
    },
    shadows: Array(25).fill('none') as any,
    components: {
      MuiCssBaseline: { styleOverrides: { body: { backgroundImage: 'none' } } },
      MuiButtonBase: { defaultProps: { disableRipple: true } },
      MuiPaper: { styleOverrides: { root: { backgroundImage: 'none', border: `1px solid ${border}` } } },
      MuiButton: { styleOverrides: { root: { minHeight: 36, borderRadius: radius, paddingInline: 14, boxShadow: 'none' }, outlined: { borderColor: border } } },
      MuiOutlinedInput: { styleOverrides: { root: { minHeight: 36, borderRadius: radius, backgroundColor: paper, '& .MuiOutlinedInput-notchedOutline': { borderColor: border }, '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: dark ? '#3f3f46' : '#a1a1aa' }, '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: accent, borderWidth: 1 }, '&.Mui-focused': { boxShadow: `0 0 0 3px ${accent}20` } } } },
      MuiCard: { styleOverrides: { root: { border: `1px solid ${border}`, boxShadow: 'none' } } },
      MuiChip: { styleOverrides: { root: { height: 28, borderRadius: Math.max(5, radius - 2), fontWeight: 500 } } },
      MuiTabs: { styleOverrides: { root: { minHeight: 36 }, indicator: { height: 2 } } },
      MuiTab: { styleOverrides: { root: { minHeight: 36, minWidth: 0, paddingInline: 12, textTransform: 'none', fontWeight: 500 } } },
      MuiDialog: { styleOverrides: { paper: { borderRadius: radius + 2 } } },
      MuiMenuItem: { styleOverrides: { root: { minHeight: 34, borderRadius: radius } } },
    },
  })
}

const Label = ({ children }: { children: React.ReactNode }) => <Typography sx={{ fontSize: 12, fontWeight: 600, mb: .75 }}>{children}</Typography>

export default function ShadcnMuiDemo() {
  const [mode, setMode] = useState<'light' | 'dark'>('light')
  const [accentName, setAccentName] = useState('Neutral')
  const [accent, setAccent] = useState('#18181b')
  const [radius, setRadius] = useState(8)
  const [tab, setTab] = useState(0)
  const [dialog, setDialog] = useState(false)
  const theme = useMemo(() => makeTheme(mode, accent, radius), [mode, accent, radius])

  return <ThemeProvider theme={theme}>
    <Box sx={{ bgcolor: 'background.default', color: 'text.primary', minHeight: 'calc(100vh - 58px)' }}>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', xl: '280px minmax(0,1fr)' }, maxWidth: 1700, mx: 'auto' }}>
        <Box component="aside" sx={{ p: 2.5, borderRight: { xl: '1px solid' }, borderColor: 'divider', position: { xl: 'sticky' }, top: 58, height: { xl: 'calc(100vh - 58px)' }, overflowY: 'auto' }}>
          <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 2.5 }}>
            <Box><Typography fontWeight={700}>Customize</Typography><Typography variant="caption" color="text.secondary">shadcn-style controls</Typography></Box>
            <Tooltip title={mode === 'dark' ? 'Use light mode' : 'Use dark mode'}><IconButton size="small" onClick={() => setMode(mode === 'dark' ? 'light' : 'dark')}>{mode === 'dark' ? <LightModeOutlinedIcon fontSize="small"/> : <DarkModeOutlinedIcon fontSize="small"/>}</IconButton></Tooltip>
          </Stack>

          <Label>Style</Label>
          <Select fullWidth size="small" value="New York" sx={{ mb: 2 }}><MenuItem value="New York">New York</MenuItem></Select>

          <Label>Base color</Label>
          <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: .75, mb: 2.25 }}>
            {paletteOptions.map(([name, color]) => <Button key={name} size="small" variant={accentName === name ? 'contained' : 'outlined'} onClick={() => { setAccentName(name); setAccent(color) }} sx={{ justifyContent: 'flex-start', gap: 1 }}><Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: color, border: '1px solid', borderColor: 'divider' }} />{name}</Button>)}
          </Box>

          <Label>Theme radius</Label>
          <Stack direction="row" spacing={.75} sx={{ mb: 2.25 }}>{[4, 8, 12, 16].map(r => <Button key={r} size="small" variant={radius === r ? 'contained' : 'outlined'} onClick={() => setRadius(r)}>{r === 4 ? '0.3' : r === 8 ? '0.5' : r === 12 ? '0.75' : '1.0'}</Button>)}</Stack>

          <Label>Accent</Label>
          <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 2.25 }}><Box component="input" type="color" value={accent} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAccent(e.target.value)} sx={{ width: 34, height: 34, p: 0, border: 0, bgcolor: 'transparent' }}/><TextField size="small" value={accent} onChange={e => setAccent(e.target.value)} fullWidth /></Stack>

          <Divider sx={{ my: 2.25 }} />
          <Button fullWidth variant="outlined" startIcon={<ContentCopyIcon fontSize="small"/>}>Copy theme</Button>
        </Box>

        <Box component="main" sx={{ minWidth: 0, p: { xs: 1.5, md: 2.5 } }}>
          <Stack direction={{ xs: 'column', md: 'row' }} alignItems={{ md: 'center' }} justifyContent="space-between" gap={1.5} sx={{ mb: 2 }}>
            <Box><Typography variant="h5">MUI, styled like shadcn</Typography><Typography color="text.secondary" sx={{ fontSize: 13 }}>A component playground using MUI primitives with a shadcn-inspired visual system.</Typography></Box>
            <Stack direction="row" spacing={1}><Button variant="outlined" startIcon={<SettingsIcon fontSize="small"/>}>Settings</Button><Button variant="contained">Deploy</Button></Stack>
          </Stack>

          <Paper sx={{ overflow: 'hidden' }}>
            <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ px: 1.5, py: 1, borderBottom: '1px solid', borderColor: 'divider', bgcolor: t => t.palette.mode === 'dark' ? '#0d0d0e' : '#fafafa' }}>
              <Tabs value={tab} onChange={(_, v) => setTab(v)}><Tab label="Preview"/><Tab label="Components"/><Tab label="Examples"/></Tabs>
              <Stack direction="row" spacing={.5}><Chip label="MUI" variant="outlined"/><IconButton size="small"><MoreHorizontalIcon fontSize="small"/></IconButton></Stack>
            </Stack>

            <Box sx={{ p: { xs: 2, md: 3.5 }, bgcolor: 'background.default' }}>
              <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', lg: 'minmax(0,1.2fr) minmax(320px,.8fr)' }, gap: 3 }}>
                <Stack spacing={3}>
                  <Box>
                    <Typography variant="h6" sx={{ mb: .5 }}>Account</Typography><Typography color="text.secondary" sx={{ fontSize: 13, mb: 2 }}>Make changes to your account here. Click save when you're done.</Typography>
                    <Stack spacing={1.5}><Box><Label>Name</Label><TextField fullWidth size="small" defaultValue="Satoshi Nakamoto"/></Box><Box><Label>Username</Label><TextField fullWidth size="small" defaultValue="satoshi"/></Box><Button variant="contained" sx={{ alignSelf: 'flex-start' }}>Save changes</Button></Stack>
                  </Box>

                  <Divider />

                  <Box><Typography variant="h6" sx={{ mb: 1.5 }}>Controls</Typography><Stack direction="row" gap={1} flexWrap="wrap"><Button variant="contained">Primary</Button><Button variant="outlined">Outline</Button><Button>Ghost</Button><Button color="error">Destructive</Button><IconButton><AddIcon fontSize="small"/></IconButton></Stack></Box>

                  <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 2 }}>
                    <TextField size="small" label="Email" placeholder="m@example.com" />
                    <TextField size="small" placeholder="Search..." InputProps={{ startAdornment: <InputAdornment position="start"><SearchIcon fontSize="small"/></InputAdornment> }} />
                    <Select size="small" defaultValue="btc"><MenuItem value="btc">BTC / USD</MenuItem><MenuItem value="eth">ETH / USD</MenuItem></Select>
                    <Stack direction="row" alignItems="center" spacing={1}><Switch defaultChecked/><Typography sx={{ fontSize: 13 }}>Airplane Mode</Typography></Stack>
                    <FormControlLabel control={<Checkbox defaultChecked/>} label="Remember me" />
                    <RadioGroup row defaultValue="comfortable"><FormControlLabel value="default" control={<Radio/>} label="Default"/><FormControlLabel value="comfortable" control={<Radio/>} label="Comfortable"/></RadioGroup>
                  </Box>

                  <Box><Label>Position size</Label><Slider defaultValue={42}/></Box>
                  <Alert severity="success" icon={<CheckIcon fontSize="inherit"/>}>Your order has been submitted successfully.</Alert>
                </Stack>

                <Stack spacing={2}>
                  <Card><CardContent><Typography variant="h6">Create account</Typography><Typography color="text.secondary" sx={{ fontSize: 13, mb: 2 }}>Enter your details below to create your account.</Typography><Stack spacing={1.25}><TextField size="small" label="Email"/><TextField size="small" label="Password" type="password"/><Button variant="contained" fullWidth>Create account</Button><Button variant="outlined" fullWidth>Continue with GitHub</Button></Stack></CardContent></Card>

                  <Card><CardContent><Stack direction="row" justifyContent="space-between" alignItems="center"><Box><Typography sx={{ fontSize: 13, color: 'text.secondary' }}>Total Balance</Typography><Typography variant="h5">$12,405.32</Typography></Box><Avatar sx={{ width: 36, height: 36 }}>₿</Avatar></Stack><Divider sx={{ my: 2 }}/><Stack direction="row" justifyContent="space-between"><Box><Typography variant="caption" color="text.secondary">Available</Typography><Typography fontWeight={600}>$8,420.20</Typography></Box><Box><Typography variant="caption" color="text.secondary">PnL</Typography><Typography fontWeight={600} color="success.main">+$642.18</Typography></Box></Stack></CardContent></Card>

                  <Paper sx={{ p: 2 }}><Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1.5 }}><Box><Typography fontWeight={650}>Team Members</Typography><Typography variant="caption" color="text.secondary">Invite your team members to collaborate.</Typography></Box><Button size="small" variant="outlined">Invite</Button></Stack>{['Ada Lovelace','Grace Hopper','Linus Torvalds'].map((n,i) => <Stack key={n} direction="row" alignItems="center" justifyContent="space-between" sx={{ py: 1 }}><Stack direction="row" spacing={1.25} alignItems="center"><Avatar sx={{ width: 32, height: 32 }}>{n[0]}</Avatar><Box><Typography sx={{ fontSize: 13, fontWeight: 600 }}>{n}</Typography><Typography variant="caption" color="text.secondary">{['Owner','Developer','Viewer'][i]}</Typography></Box></Stack><Chip size="small" label={['Admin','Member','Member'][i]} variant="outlined"/></Stack>)}</Paper>

                  <Button variant="outlined" onClick={() => setDialog(true)}>Open dialog example</Button>
                </Stack>
              </Box>
            </Box>
          </Paper>
        </Box>
      </Box>

      <Dialog open={dialog} onClose={() => setDialog(false)} fullWidth maxWidth="xs"><DialogTitle>Edit profile</DialogTitle><DialogContent><Typography color="text.secondary" sx={{ fontSize: 13, mb: 2 }}>Make changes to your profile here.</Typography><TextField fullWidth size="small" label="Username" defaultValue="satoshi"/></DialogContent><DialogActions><Button onClick={() => setDialog(false)} startIcon={<CloseIcon fontSize="small"/>}>Cancel</Button><Button variant="contained" onClick={() => setDialog(false)}>Save changes</Button></DialogActions></Dialog>
    </Box>
  </ThemeProvider>
}
