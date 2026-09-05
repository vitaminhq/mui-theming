import React, { useMemo, useState } from 'react'
import {
  Alert, AppBar, Autocomplete, Avatar, Badge, Box, Breadcrumbs, Button, ButtonGroup,
  Card, CardActions, CardContent, Checkbox, Chip, CircularProgress, CssBaseline,
  Dialog, DialogActions, DialogContent, DialogTitle, Divider, Fab, FormControl,
  FormControlLabel, FormGroup, FormHelperText, FormLabel, IconButton, InputLabel,
  LinearProgress, Link, List, ListItem, ListItemAvatar, ListItemText, Menu, MenuItem,
  Pagination, Paper, Radio, RadioGroup, Rating, Select, Skeleton, Slider, Snackbar,
  Stack, Step, StepLabel, Stepper, Switch, Tab, Tabs, TextField, ThemeProvider,
  ToggleButton, ToggleButtonGroup, Tooltip, Typography,
} from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import { createAppTheme, presets, tokensForPreset, type ThemeTokens } from './theme'

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <Box component="section" sx={{ mb: 5 }}>
    <Typography variant="h6" sx={{ mb: 2 }}>{title}</Typography>
    <Paper sx={{ p: { xs: 2, md: 3 } }}>{children}</Paper>
  </Box>
)

const ColorField = ({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) => (
  <Stack direction="row" spacing={1} alignItems="center">
    <Box component="input" type="color" value={value} onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e.target.value)} sx={{ width: 38, height: 38, p: 0, border: 0, bgcolor: 'transparent', cursor: 'pointer' }} />
    <TextField label={label} value={value} size="small" onChange={(e) => onChange(e.target.value)} sx={{ flex: 1 }} />
  </Stack>
)

export default function ThemeLab() {
  const [presetName, setPresetName] = useState('Maia')
  const [tokens, setTokens] = useState<ThemeTokens>(() => tokensForPreset('Maia', 'light'))
  const [tab, setTab] = useState(0)
  const [dialog, setDialog] = useState(false)
  const [snack, setSnack] = useState(false)
  const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null)
  const theme = useMemo(() => createAppTheme(tokens), [tokens])
  const update = <K extends keyof ThemeTokens>(key: K, value: ThemeTokens[K]) => setTokens(t => ({ ...t, [key]: value }))

  const pickPreset = (name: string) => {
    setPresetName(name)
    setTokens(tokensForPreset(name, tokens.mode))
  }

  const switchMode = (dark: boolean) => {
    const mode = dark ? 'dark' : 'light'
    setTokens(tokensForPreset(presetName, mode))
  }

  return <ThemeProvider theme={theme}><CssBaseline />
    <Box sx={{ minHeight: '100vh' }}>
      <AppBar position="sticky" color="transparent" elevation={0} sx={{ backdropFilter: 'blur(14px)', bgcolor: t => `${t.palette.background.default}e6`, borderBottom: '1px solid', borderColor: 'divider' }}>
        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ px: { xs: 2, md: 4 }, py: 1.25 }}>
          <Box><Typography fontWeight={800}>MUI Theme Lab</Typography><Typography variant="caption" color="text.secondary">DEX-oriented design systems on top of MUI</Typography></Box>
          <Stack direction="row" spacing={1}><Chip label={presetName} variant="outlined" /><Button size="small" variant="contained" onClick={() => setSnack(true)}>Save preview</Button></Stack>
        </Stack>
      </AppBar>

      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', lg: '320px minmax(0, 1fr)' }, maxWidth: 1500, mx: 'auto' }}>
        <Box component="aside" sx={{ p: 3, borderRight: { lg: '1px solid' }, borderColor: 'divider', position: { lg: 'sticky' }, top: 73, alignSelf: 'start', maxHeight: { lg: 'calc(100vh - 73px)' }, overflow: 'auto' }}>
          <Typography variant="overline" color="text.secondary">Style preset</Typography>
          <FormControl fullWidth size="small" sx={{ mt: 1 }}>
            <Select value={presetName} onChange={(e) => pickPreset(String(e.target.value))}>{Object.keys(presets).map(p => <MenuItem key={p} value={p}>{p}</MenuItem>)}</Select>
          </FormControl>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1.25, mb: 2.5, lineHeight: 1.5 }}>{presets[presetName].description}</Typography>

          <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 2.5, p: 1.25, border: '1px solid', borderColor: 'divider', borderRadius: 1.5, bgcolor: 'background.paper' }}>
            <Box><Typography variant="body2" fontWeight={700}>{tokens.mode === 'dark' ? 'Dark' : 'Light'} scheme</Typography><Typography variant="caption" color="text.secondary">Real preset color scheme</Typography></Box>
            <Switch checked={tokens.mode === 'dark'} onChange={(e) => switchMode(e.target.checked)} />
          </Stack>

          <Typography variant="overline" color="text.secondary">Semantic colors</Typography>
          <Stack spacing={1.5} sx={{ mt: 1 }}>
            <ColorField label="Primary" value={tokens.primary} onChange={v => update('primary', v)} />
            <ColorField label="Secondary" value={tokens.secondary} onChange={v => update('secondary', v)} />
            <ColorField label="Background" value={tokens.background} onChange={v => update('background', v)} />
            <ColorField label="Surface" value={tokens.surface} onChange={v => update('surface', v)} />
            <ColorField label="Foreground" value={tokens.foreground} onChange={v => update('foreground', v)} />
            <ColorField label="Muted" value={tokens.muted} onChange={v => update('muted', v)} />
            <ColorField label="Border" value={tokens.border} onChange={v => update('border', v)} />
          </Stack>
          <Divider sx={{ my: 3 }} />
          <Typography variant="overline" color="text.secondary">Shape & density</Typography>
          <Typography variant="body2" sx={{ mt: 1 }}>Radius: {tokens.radius}px</Typography>
          <Slider min={2} max={20} value={tokens.radius} onChange={(_, v) => update('radius', v as number)} />
          <Stack direction="row" gap={1} flexWrap="wrap" sx={{ mt: 1 }}><Chip size="small" label={tokens.density} /><Chip size="small" label={`${tokens.controlHeight}px controls`} /><Chip size="small" label={`${tokens.panelStyle} panels`} /></Stack>
        </Box>

        <Box component="main" sx={{ p: { xs: 2, md: 4, xl: 5 }, minWidth: 0 }}>
          <Box sx={{ mb: 5 }}>
            <Typography variant="overline" color="primary.main">{presetName}</Typography>
            <Typography variant="h4">Component showcase</Typography>
            <Typography color="text.secondary" sx={{ mt: 1, maxWidth: 760 }}>Switch between genuinely different visual languages—terminal, professional derivatives, crypto-native neon, institutional exchange, or Maia—and tune the semantic tokens live.</Typography>
            <Stack direction="row" gap={1} sx={{ mt: 2 }} flexWrap="wrap"><Chip size="small" color="primary" label="BTC-PERP 67,842.1" /><Chip size="small" color="success" label="+2.84%" /><Chip size="small" variant="outlined" label="Funding 0.0100%" /><Chip size="small" color="secondary" label="20x leverage" /></Stack>
          </Box>

          <Section title="Buttons & actions"><Stack spacing={2}>
            <Stack direction="row" gap={1} flexWrap="wrap"><Button variant="contained">Place order</Button><Button variant="outlined">Limit</Button><Button variant="text">Ghost</Button><Button variant="contained" color="error">Close position</Button><Button disabled>Disabled</Button><IconButton><FavoriteBorderIcon /></IconButton><Fab size="small" color="primary"><AddIcon /></Fab></Stack>
            <ButtonGroup size="small"><Button>1m</Button><Button>5m</Button><Button>1h</Button><Button>1d</Button></ButtonGroup>
            <ToggleButtonGroup exclusive value="cross" size="small"><ToggleButton value="cross">Cross</ToggleButton><ToggleButton value="isolated">Isolated</ToggleButton></ToggleButtonGroup>
          </Stack></Section>

          <Section title="Inputs & selection"><Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' }, gap: 2 }}>
            <TextField label="Price" placeholder="67,842.1" />
            <TextField label="Order size" defaultValue="0.25 BTC" />
            <Autocomplete options={['BTC-PERP', 'ETH-PERP', 'SOL-PERP']} renderInput={(params) => <TextField {...params} label="Market" />} />
            <FormControl><InputLabel>Order type</InputLabel><Select label="Order type" defaultValue="limit"><MenuItem value="market">Market</MenuItem><MenuItem value="limit">Limit</MenuItem><MenuItem value="stop">Stop</MenuItem></Select><FormHelperText>Execution method</FormHelperText></FormControl>
            <FormGroup><FormControlLabel control={<Checkbox defaultChecked />} label="Reduce only" /><FormControlLabel control={<Switch defaultChecked />} label="Post only" /></FormGroup>
            <FormControl><FormLabel>Side</FormLabel><RadioGroup row defaultValue="long"><FormControlLabel value="long" control={<Radio />} label="Long" /><FormControlLabel value="short" control={<Radio />} label="Short" /></RadioGroup></FormControl>
            <Box><Typography gutterBottom>Leverage</Typography><Slider defaultValue={20} min={1} max={50} /></Box>
            <Box><Typography gutterBottom>Risk score</Typography><Rating defaultValue={4} /></Box>
          </Box></Section>

          <Section title="Navigation"><Stack spacing={3}><Breadcrumbs><Link underline="hover">Portfolio</Link><Link underline="hover">Perpetuals</Link><Typography>BTC-PERP</Typography></Breadcrumbs><Tabs value={tab} onChange={(_, v) => setTab(v)}><Tab label="Chart" /><Tab label="Order book" /><Tab label="Trades" /><Tab label="Positions" /></Tabs><Pagination count={8} page={3} /></Stack></Section>

          <Section title="Data display"><Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 2 }}>
            <Card><CardContent><Stack direction="row" justifyContent="space-between"><Box><Typography variant="overline" color="text.secondary">Account equity</Typography><Typography variant="h4" sx={{ mt: .5 }}>$48,290.42</Typography><Typography variant="body2" color="success.main">+$1,274.12 today</Typography></Box><Avatar>₿</Avatar></Stack></CardContent><CardActions><Button size="small">Portfolio</Button></CardActions></Card>
            <Paper sx={{ p: 2 }}><Typography fontWeight={700} gutterBottom>Open positions</Typography><List disablePadding>{['BTC-PERP','ETH-PERP','SOL-PERP'].map((n,i) => <ListItem key={n} disableGutters secondaryAction={<IconButton size="small"><MoreHorizIcon /></IconButton>}><ListItemAvatar><Badge color={i === 2 ? 'error' : 'success'} variant="dot" overlap="circular"><Avatar>{n[0]}</Avatar></Badge></ListItemAvatar><ListItemText primary={n} secondary={['Long · 8.2x','Long · 4.5x','Short · 3.1x'][i]} /></ListItem>)}</List></Paper>
            <Stack direction="row" gap={1} flexWrap="wrap"><Chip label="Maker" /><Chip label="Isolated" variant="outlined" /><Chip label="Profitable" color="success" /><Chip label="Close" onDelete={() => {}} /></Stack>
            <Stack spacing={1}><Skeleton variant="text" width="55%" /><Skeleton variant="rounded" height={70} /><LinearProgress /><Stack direction="row" spacing={2} alignItems="center"><CircularProgress size={24} /><Typography color="text.secondary">Loading order book…</Typography></Stack></Stack>
          </Box></Section>

          <Section title="Feedback & overlays"><Stack direction="row" gap={1} flexWrap="wrap"><Alert severity="success" sx={{ flex: '1 1 280px' }}>Limit order filled at $67,842.1.</Alert><Alert severity="warning" sx={{ flex: '1 1 280px' }}>Margin usage is approaching your configured threshold.</Alert><Button variant="outlined" onClick={() => setDialog(true)}>Open dialog</Button><Button variant="outlined" onClick={e => setMenuAnchor(e.currentTarget)}>Open menu</Button><Tooltip title="Cancel order"><IconButton color="error"><DeleteOutlineIcon /></IconButton></Tooltip></Stack></Section>

          <Section title="Workflow"><Stepper activeStep={1} alternativeLabel>{['Deposit collateral','Configure order','Confirm trade'].map(s => <Step key={s}><StepLabel>{s}</StepLabel></Step>)}</Stepper></Section>
        </Box>
      </Box>

      <Dialog open={dialog} onClose={() => setDialog(false)} fullWidth maxWidth="sm"><DialogTitle>Confirm order</DialogTitle><DialogContent><Typography color="text.secondary" sx={{ mb: 2 }}>Review the order details before submitting to the market.</Typography><TextField autoFocus fullWidth label="Order size" placeholder="0.25 BTC" /></DialogContent><DialogActions><Button onClick={() => setDialog(false)}>Cancel</Button><Button variant="contained" onClick={() => setDialog(false)}>Place order</Button></DialogActions></Dialog>
      <Menu anchorEl={menuAnchor} open={Boolean(menuAnchor)} onClose={() => setMenuAnchor(null)}><MenuItem>Edit order</MenuItem><MenuItem>Duplicate</MenuItem><Divider /><MenuItem sx={{ color: 'error.main' }}>Cancel order</MenuItem></Menu>
      <Snackbar open={snack} autoHideDuration={2200} onClose={() => setSnack(false)} message="Preview state captured" />
    </Box>
  </ThemeProvider>
}
