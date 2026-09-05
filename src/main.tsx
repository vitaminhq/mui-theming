import React, { useMemo, useState } from 'react'
import ReactDOM from 'react-dom/client'
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
import { createAppTheme, presets, type ThemeTokens } from './theme'

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <Box component="section" sx={{ mb: 5 }}>
    <Typography variant="h6" sx={{ mb: 2 }}>{title}</Typography>
    <Paper sx={{ p: { xs: 2, md: 3 } }}>{children}</Paper>
  </Box>
)

const ColorField = ({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) => (
  <Stack direction="row" spacing={1} alignItems="center">
    <Box component="input" type="color" value={value} onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e.target.value)}
      sx={{ width: 38, height: 38, p: 0, border: 0, bgcolor: 'transparent', cursor: 'pointer' }} />
    <TextField label={label} value={value} size="small" onChange={(e) => onChange(e.target.value)} sx={{ flex: 1 }} />
  </Stack>
)

function App() {
  const [presetName, setPresetName] = useState('Maia-inspired')
  const [tokens, setTokens] = useState<ThemeTokens>(presets['Maia-inspired'])
  const [tab, setTab] = useState(0)
  const [dialog, setDialog] = useState(false)
  const [snack, setSnack] = useState(false)
  const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null)
  const theme = useMemo(() => createAppTheme(tokens), [tokens])
  const update = <K extends keyof ThemeTokens>(key: K, value: ThemeTokens[K]) => setTokens(t => ({ ...t, [key]: value }))

  const pickPreset = (name: string) => {
    setPresetName(name)
    setTokens({ ...presets[name] })
  }

  return <ThemeProvider theme={theme}><CssBaseline />
    <Box sx={{ minHeight: '100vh' }}>
      <AppBar position="sticky" color="transparent" elevation={0} sx={{ backdropFilter: 'blur(14px)', bgcolor: t => `${t.palette.background.default}dd`, borderBottom: '1px solid', borderColor: 'divider' }}>
        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ px: { xs: 2, md: 4 }, py: 1.25 }}>
          <Box><Typography fontWeight={800}>MUI Theme Lab</Typography><Typography variant="caption" color="text.secondary">MUI behavior, custom design language</Typography></Box>
          <Stack direction="row" spacing={1}><Chip label={presetName} variant="outlined" /><Button size="small" variant="contained" onClick={() => setSnack(true)}>Save preview</Button></Stack>
        </Stack>
      </AppBar>

      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', lg: '300px minmax(0, 1fr)' }, maxWidth: 1500, mx: 'auto' }}>
        <Box component="aside" sx={{ p: 3, borderRight: { lg: '1px solid' }, borderColor: 'divider', position: { lg: 'sticky' }, top: 73, alignSelf: 'start', maxHeight: { lg: 'calc(100vh - 73px)' }, overflow: 'auto' }}>
          <Typography variant="overline" color="text.secondary">Style preset</Typography>
          <FormControl fullWidth size="small" sx={{ mt: 1, mb: 3 }}>
            <Select value={presetName} onChange={(e) => pickPreset(String(e.target.value))}>{Object.keys(presets).map(p => <MenuItem key={p} value={p}>{p}</MenuItem>)}</Select>
          </FormControl>
          <Typography variant="overline" color="text.secondary">Semantic colors</Typography>
          <Stack spacing={1.5} sx={{ mt: 1 }}>
            <ColorField label="Primary" value={tokens.primary} onChange={v => update('primary', v)} />
            <ColorField label="Background" value={tokens.background} onChange={v => update('background', v)} />
            <ColorField label="Surface" value={tokens.surface} onChange={v => update('surface', v)} />
            <ColorField label="Foreground" value={tokens.foreground} onChange={v => update('foreground', v)} />
            <ColorField label="Muted" value={tokens.muted} onChange={v => update('muted', v)} />
            <ColorField label="Border" value={tokens.border} onChange={v => update('border', v)} />
          </Stack>
          <Divider sx={{ my: 3 }} />
          <Typography variant="overline" color="text.secondary">Shape</Typography>
          <Typography variant="body2" sx={{ mt: 1 }}>Radius: {tokens.radius}px</Typography>
          <Slider min={2} max={20} value={tokens.radius} onChange={(_, v) => update('radius', v as number)} />
          <FormControlLabel control={<Switch checked={tokens.mode === 'dark'} onChange={(e) => update('mode', e.target.checked ? 'dark' : 'light')} />} label="Dark mode" />
        </Box>

        <Box component="main" sx={{ p: { xs: 2, md: 4, xl: 5 }, minWidth: 0 }}>
          <Box sx={{ mb: 5 }}><Typography variant="h4">Component showcase</Typography><Typography color="text.secondary" sx={{ mt: 1, maxWidth: 760 }}>A living preview for building a non-Material visual system on top of MUI. Change the preset or tokens and every component below updates immediately.</Typography></Box>

          <Section title="Buttons & actions"><Stack spacing={2}>
            <Stack direction="row" gap={1} flexWrap="wrap"><Button variant="contained">Primary</Button><Button variant="outlined">Secondary</Button><Button variant="text">Ghost</Button><Button variant="contained" color="error">Destructive</Button><Button disabled>Disabled</Button><IconButton><FavoriteBorderIcon /></IconButton><Fab size="small" color="primary"><AddIcon /></Fab></Stack>
            <ButtonGroup size="small"><Button>Day</Button><Button>Week</Button><Button>Month</Button></ButtonGroup>
            <ToggleButtonGroup exclusive value="left" size="small"><ToggleButton value="left">Left</ToggleButton><ToggleButton value="center">Center</ToggleButton><ToggleButton value="right">Right</ToggleButton></ToggleButtonGroup>
          </Stack></Section>

          <Section title="Inputs & selection"><Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' }, gap: 2 }}>
            <TextField label="Email" placeholder="you@example.com" />
            <TextField label="Error state" defaultValue="Wrong value" error helperText="Please check this field" />
            <Autocomplete options={['Design', 'Engineering', 'Product']} renderInput={(params) => <TextField {...params} label="Team" />} />
            <FormControl><InputLabel>Role</InputLabel><Select label="Role" defaultValue="editor"><MenuItem value="admin">Admin</MenuItem><MenuItem value="editor">Editor</MenuItem><MenuItem value="viewer">Viewer</MenuItem></Select><FormHelperText>Choose access level</FormHelperText></FormControl>
            <FormGroup><FormControlLabel control={<Checkbox defaultChecked />} label="Email updates" /><FormControlLabel control={<Switch defaultChecked />} label="Auto save" /></FormGroup>
            <FormControl><FormLabel>Plan</FormLabel><RadioGroup row defaultValue="pro"><FormControlLabel value="free" control={<Radio />} label="Free" /><FormControlLabel value="pro" control={<Radio />} label="Pro" /></RadioGroup></FormControl>
            <Box><Typography gutterBottom>Volume</Typography><Slider defaultValue={42} /></Box>
            <Box><Typography gutterBottom>Rating</Typography><Rating defaultValue={4} /></Box>
          </Box></Section>

          <Section title="Navigation"><Stack spacing={3}><Breadcrumbs><Link underline="hover">Workspace</Link><Link underline="hover">Projects</Link><Typography>Theme Lab</Typography></Breadcrumbs><Tabs value={tab} onChange={(_, v) => setTab(v)}><Tab label="Overview" /><Tab label="Activity" /><Tab label="Settings" /></Tabs><Pagination count={8} page={3} /></Stack></Section>

          <Section title="Data display"><Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 2 }}>
            <Card><CardContent><Stack direction="row" justifyContent="space-between"><Box><Typography variant="overline" color="text.secondary">Monthly revenue</Typography><Typography variant="h4" sx={{ mt: .5 }}>$48,290</Typography><Typography variant="body2" color="success.main">+12.4% this month</Typography></Box><Avatar>R</Avatar></Stack></CardContent><CardActions><Button size="small">View report</Button></CardActions></Card>
            <Paper sx={{ p: 2 }}><Typography fontWeight={700} gutterBottom>Team</Typography><List disablePadding>{['Maya Chen','Noah Williams','Ava Patel'].map((n,i) => <ListItem key={n} disableGutters secondaryAction={<IconButton size="small"><MoreHorizIcon /></IconButton>}><ListItemAvatar><Badge color="success" variant="dot" overlap="circular"><Avatar>{n[0]}</Avatar></Badge></ListItemAvatar><ListItemText primary={n} secondary={['Designer','Engineer','Product'][i]} /></ListItem>)}</List></Paper>
            <Stack direction="row" gap={1} flexWrap="wrap"><Chip label="Default" /><Chip label="Outlined" variant="outlined" /><Chip label="Success" color="success" /><Chip label="Deletable" onDelete={() => {}} /></Stack>
            <Stack spacing={1}><Skeleton variant="text" width="55%" /><Skeleton variant="rounded" height={70} /><LinearProgress /><Stack direction="row" spacing={2} alignItems="center"><CircularProgress size={24} /><Typography color="text.secondary">Loading data…</Typography></Stack></Stack>
          </Box></Section>

          <Section title="Feedback & overlays"><Stack direction="row" gap={1} flexWrap="wrap"><Alert severity="success" sx={{ flex: '1 1 280px' }}>Your changes have been saved.</Alert><Alert severity="warning" sx={{ flex: '1 1 280px' }}>This preview is using local token overrides.</Alert><Button variant="outlined" onClick={() => setDialog(true)}>Open dialog</Button><Button variant="outlined" onClick={e => setMenuAnchor(e.currentTarget)}>Open menu</Button><Tooltip title="Delete permanently"><IconButton color="error"><DeleteOutlineIcon /></IconButton></Tooltip></Stack></Section>

          <Section title="Workflow"><Stepper activeStep={1} alternativeLabel>{['Create project','Customize theme','Export MUI theme'].map(s => <Step key={s}><StepLabel>{s}</StepLabel></Step>)}</Stepper></Section>
        </Box>
      </Box>

      <Dialog open={dialog} onClose={() => setDialog(false)} fullWidth maxWidth="sm"><DialogTitle>Invite teammate</DialogTitle><DialogContent><Typography color="text.secondary" sx={{ mb: 2 }}>Enter an email address to invite someone to this workspace.</Typography><TextField autoFocus fullWidth label="Email" placeholder="name@company.com" /></DialogContent><DialogActions><Button onClick={() => setDialog(false)}>Cancel</Button><Button variant="contained" onClick={() => setDialog(false)}>Send invite</Button></DialogActions></Dialog>
      <Menu anchorEl={menuAnchor} open={Boolean(menuAnchor)} onClose={() => setMenuAnchor(null)}><MenuItem>Duplicate</MenuItem><MenuItem>Archive</MenuItem><Divider /><MenuItem sx={{ color: 'error.main' }}>Delete</MenuItem></Menu>
      <Snackbar open={snack} autoHideDuration={2200} onClose={() => setSnack(false)} message="Preview state captured" />
    </Box>
  </ThemeProvider>
}

ReactDOM.createRoot(document.getElementById('root')!).render(<React.StrictMode><App /></React.StrictMode>)
