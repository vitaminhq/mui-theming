import React, { useMemo, useState } from 'react'
import {
  Box, Button, Card, CardContent, Divider, IconButton, MenuItem, Select, Slider,
  Stack, Switch, TextField, ThemeProvider, Typography, createTheme,
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import SearchIcon from '@mui/icons-material/Search'
import GitHubIcon from '@mui/icons-material/GitHub'
import CodeIcon from '@mui/icons-material/Code'
import CloseIcon from '@mui/icons-material/Close'
import AddIcon from '@mui/icons-material/Add'
import ShuffleIcon from '@mui/icons-material/Shuffle'
import OpenInNewIcon from '@mui/icons-material/OpenInNew'

const swatches = {
  Neutral: '#a1a1aa',
  Olive: '#a3a38b',
  Amber: '#b45309',
  Stone: '#a8a29e',
}

type Swatch = keyof typeof swatches

type PlaygroundState = {
  mode: 'light' | 'dark'
  style: 'Nova' | 'Maia'
  base: Swatch
  theme: Swatch
  chart: Swatch
  radius: number
}

const presets: Record<'Nova' | 'Maia', Partial<PlaygroundState>> = {
  Nova: { style: 'Nova', base: 'Neutral', theme: 'Neutral', chart: 'Neutral', radius: 7 },
  Maia: { style: 'Maia', base: 'Olive', theme: 'Amber', chart: 'Olive', radius: 11 },
}

function makeTheme(s: PlaygroundState) {
  const dark = s.mode === 'dark'
  const accent = swatches[s.theme]
  const neutralTheme = s.theme === 'Neutral'
  const primary = dark
    ? neutralTheme ? '#f4f4f5' : accent
    : neutralTheme ? '#18181b' : accent
  const canvas = dark ? (s.base === 'Olive' ? '#10110d' : '#101010') : '#f4f4f5'
  const paper = dark ? (s.base === 'Olive' ? '#1a1b15' : '#171717') : '#ffffff'
  const raised = dark ? (s.base === 'Olive' ? '#202119' : '#202020') : '#f4f4f5'
  const border = dark ? (s.base === 'Olive' ? '#2c2e24' : '#2d2d2d') : '#e4e4e7'
  const muted = dark ? '#a1a1aa' : '#71717a'
  const fg = dark ? '#fafafa' : '#18181b'

  return createTheme({
    palette: {
      mode: s.mode,
      primary: { main: primary, contrastText: dark && !neutralTheme ? '#fff' : dark ? '#18181b' : '#fff' },
      background: { default: canvas, paper },
      text: { primary: fg, secondary: muted },
      divider: border,
      action: { hover: raised },
    },
    shape: { borderRadius: s.radius },
    typography: {
      fontFamily: 'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      fontSize: s.style === 'Nova' ? 12.5 : 13,
      button: { textTransform: 'none', fontWeight: 500, fontSize: 11 },
    },
    shadows: Array(25).fill('none') as any,
    components: {
      MuiCssBaseline: { styleOverrides: { '*': { boxSizing: 'border-box' }, body: { margin: 0 } } },
      MuiButtonBase: { defaultProps: { disableRipple: true } },
      MuiCard: {
        styleOverrides: {
          root: {
            border: `1px solid ${border}`,
            boxShadow: 'none',
            backgroundImage: 'none',
            overflow: 'hidden',
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            minHeight: s.style === 'Nova' ? 30 : 34,
            borderRadius: Math.max(5, s.radius - 1),
            boxShadow: 'none',
            paddingInline: 12,
          },
          outlined: { borderColor: border },
          contained: { boxShadow: 'none' },
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            minHeight: s.style === 'Nova' ? 32 : 36,
            borderRadius: Math.max(5, s.radius - 1),
            fontSize: 11,
            background: raised,
            '& .MuiOutlinedInput-notchedOutline': { borderColor: border },
            '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: muted },
          },
          input: { padding: '7px 10px' },
        },
      },
      MuiSelect: { styleOverrides: { select: { paddingTop: 6, paddingBottom: 6 } } },
      MuiSwitch: {
        styleOverrides: {
          root: { width: 31, height: 18, padding: 0 },
          switchBase: { padding: 2, '&.Mui-checked': { transform: 'translateX(13px)' } },
          thumb: { width: 14, height: 14 },
          track: { borderRadius: 9 },
        },
      },
      MuiSlider: {
        styleOverrides: {
          root: { paddingBlock: 7 },
          thumb: { width: 12, height: 12 },
          rail: { opacity: .18 },
          track: { border: 0 },
        },
      },
      MuiIconButton: { styleOverrides: { root: { borderRadius: Math.max(5, s.radius - 2) } } },
    },
  })
}

const Label = ({ children }: { children: React.ReactNode }) => (
  <Typography sx={{ fontSize: 9, color: 'text.secondary', lineHeight: 1.2 }}>{children}</Typography>
)
const Title = ({ children }: { children: React.ReactNode }) => (
  <Typography sx={{ fontSize: 13, fontWeight: 600, lineHeight: 1.25 }}>{children}</Typography>
)
const Desc = ({ children }: { children: React.ReactNode }) => (
  <Typography sx={{ fontSize: 10, color: 'text.secondary', lineHeight: 1.45 }}>{children}</Typography>
)

function CloseButton() {
  return <IconButton size="small" sx={{ bgcolor: 'action.hover', width: 24, height: 24 }}><CloseIcon sx={{ fontSize: 13 }} /></IconButton>
}

function ContributionHistory() {
  const bars = [58, 79, 66, 94, 52, 100]
  return <Card><CardContent sx={{ p: 2.2 }}>
    <Title>Contribution History</Title><Desc>Last 6 months of activity</Desc>
    <Stack direction="row" alignItems="end" spacing={1.15} sx={{ height: 142, mt: 2.2 }}>
      {bars.map((v, i) => <Stack key={i} sx={{ flex: 1, height: '100%' }} justifyContent="end">
        <Box sx={{ height: `${v}%`, bgcolor: 'primary.main', opacity: .58, borderRadius: '5px 5px 0 0' }} />
        <Typography sx={{ mt: .6, fontSize: 8, color: 'text.secondary', textAlign: 'center' }}>{['Dec','Jan','Feb','Mar','Apr','May'][i]}</Typography>
      </Stack>)}
    </Stack>
    <Box sx={{ mt: 1.5, p: 1.25, borderRadius: 1.25, bgcolor: 'action.hover' }}><Label>UPCOMING</Label><Typography sx={{ fontSize: 13, fontWeight: 600, mt: .2 }}>May 25, 2024</Typography><Desc>$1,000 scheduled</Desc></Box>
    <Box sx={{ mt: 1, p: 1.25, borderRadius: 1.25, bgcolor: 'action.hover' }}><Label>AUTO-SAVE PLAN</Label><Typography sx={{ fontSize: 13, fontWeight: 600, mt: .2 }}>Accelerated</Typography><Desc>Recurring weekly</Desc></Box>
    <Button variant="contained" fullWidth sx={{ mt: 1.4 }}>View Full Report</Button>
  </CardContent></Card>
}

function PayoutThreshold() {
  const [amount, setAmount] = useState(2500)
  return <Card><CardContent sx={{ p: 2.2 }}>
    <Stack direction="row" justifyContent="space-between"><Box><Title>Payout Threshold</Title><Desc>Set the minimum balance required<br />before a payout is triggered.</Desc></Box><CloseButton /></Stack>
    <Typography sx={{ fontSize: 9, fontWeight: 600, mt: 1.8 }}>Preferred Currency</Typography>
    <Select size="small" fullWidth defaultValue="usd" sx={{ mt: .5 }}><MenuItem value="usd">USD — United States Dollar</MenuItem></Select>
    <Stack direction="row" justifyContent="space-between" alignItems="end" sx={{ mt: 1.8 }}><Typography sx={{ fontSize: 9, fontWeight: 600, maxWidth: 110 }}>Minimum Payout Amount</Typography><Typography sx={{ fontSize: 20, fontWeight: 700 }}>${amount.toFixed(2)}</Typography></Stack>
    <Slider min={50} max={10000} value={amount} onChange={(_, v) => setAmount(v as number)} />
    <Stack direction="row" justifyContent="space-between"><Desc>$50 (MIN)</Desc><Desc>$10,000 (MAX)</Desc></Stack>
    <Typography sx={{ fontSize: 9, fontWeight: 600, mt: 1.8 }}>Notes</Typography>
    <TextField fullWidth multiline rows={3} placeholder="Add any notes for this payout configuration..." sx={{ mt: .5 }} />
    <Button variant="contained" fullWidth sx={{ mt: 1.5 }}>Save Threshold</Button>
  </CardContent></Card>
}

function EmptyDistributeTrack() {
  return <Card><CardContent sx={{ py: 3.4, px: 2.2, textAlign: 'center' }}>
    <Box sx={{ width: 30, height: 30, bgcolor: 'action.hover', borderRadius: 1, display: 'grid', placeItems: 'center', mx: 'auto' }}><AddIcon sx={{ fontSize: 17 }} /></Box>
    <Title><Box component="span" sx={{ display: 'block', mt: 1.7 }}>Distribute Track</Box></Title>
    <Desc>Upload your first master to<br />start reaching listeners on<br />Spotify, Apple Music, and more.</Desc>
    <Button variant="contained" sx={{ mt: 1.4 }}>Create Release</Button>
  </CardContent></Card>
}

function ClaimableBalance() {
  return <Card><CardContent sx={{ p: 2.2 }}>
    <Desc>Claimable Balance</Desc><Typography sx={{ fontSize: 38, lineHeight: 1.05, letterSpacing: '-.04em', mt: .3 }}>$0.00</Typography>
    <Typography sx={{ fontSize: 8.5, mt: .4 }}>🟡 Pending Setup</Typography>
    <Box sx={{ bgcolor: 'action.hover', borderRadius: 1.25, p: 1.3, mt: 1.5 }}>
      {[['Net Royalties','$0.00'],['Processing Fee','-$0.00']].map(([a,b]) => <Stack key={a} direction="row" justifyContent="space-between" sx={{ py: .45 }}><Desc>{a}</Desc><Typography sx={{ fontSize: 10 }}>{b}</Typography></Stack>)}
      <Divider sx={{ my: .7 }} /><Stack direction="row" justifyContent="space-between"><Desc>Total Ready to Claim</Desc><Typography sx={{ fontSize: 10, fontWeight: 600 }}>$0.00 USD</Typography></Stack>
    </Box>
    <Desc><Box component="span" sx={{ display: 'block', mt: 1.7 }}>Once your bank is connected, balances over $10.00 are automatically eligible for monthly distribution on the 15th of each month.</Box></Desc>
  </CardContent></Card>
}

function QRCode() {
  const cells = Array.from({ length: 25 * 25 }, (_, i) => ((i * 13 + Math.floor(i / 25) * 7 + (i % 6) * 3) % 5) < 3)
  return <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(25,4px)', gridAutoRows: '4px', bgcolor: '#fff', p: 1.2, borderRadius: 1, width: 'fit-content', mx: 'auto' }}>
    {cells.map((on, i) => <Box key={i} sx={{ bgcolor: on ? '#000' : '#fff' }} />)}
  </Box>
}

function QrConnect() {
  return <Card><CardContent sx={{ p: 2.6, textAlign: 'center' }}><QRCode />
    <Typography sx={{ fontSize: 11, fontWeight: 600, mt: 1.7 }}>Scan to connect your mobile<br />device</Typography>
    <Desc>Open the Ledger mobile app and scan<br />this code to link your device.</Desc>
    <Button fullWidth sx={{ mt: 1.8, bgcolor: 'action.hover', color: 'text.primary' }}>Got It</Button>
  </CardContent></Card>
}

function Preferences() {
  const [stats, setStats] = useState(true)
  const [email, setEmail] = useState(true)
  return <Card><CardContent sx={{ p: 2.2 }}>
    <Stack direction="row" justifyContent="space-between"><Box><Title>Preferences</Title><Desc>Manage your account settings<br />and notifications.</Desc></Box><CloseButton /></Stack>
    <Typography sx={{ fontSize: 9, fontWeight: 600, mt: 1.6 }}>Default Currency</Typography><Select size="small" fullWidth defaultValue="usd" sx={{ mt: .5 }}><MenuItem value="usd">USD — United States Dollar</MenuItem></Select>
    <Divider sx={{ my: 1.4 }} />
    <Stack direction="row" justifyContent="space-between" gap={1}><Box><Typography sx={{ fontSize: 9.5, fontWeight: 600 }}>Public Statistics</Typography><Desc>Allow others to see your total stream<br />count and listening activity</Desc></Box><Switch checked={stats} onChange={e => setStats(e.target.checked)} /></Stack>
    <Divider sx={{ my: 1.2 }} />
    <Stack direction="row" justifyContent="space-between" gap={1}><Box><Typography sx={{ fontSize: 9.5, fontWeight: 600 }}>Email Notifications</Typography><Desc>Monthly royalty reports and<br />distribution updates</Desc></Box><Switch checked={email} onChange={e => setEmail(e.target.checked)} /></Stack>
    <Stack direction="row" justifyContent="space-between" sx={{ mt: 1.5 }}><Button variant="outlined">Reset</Button><Button variant="contained">Save Preferences</Button></Stack>
  </CardContent></Card>
}

function DividendIncome() {
  return <Card><CardContent sx={{ p: 2.2 }}><Stack direction="row" justifyContent="space-between"><Box><Title>Q2 Dividend Income</Title><Desc>Quarterly dividend payouts across<br />your portfolio holdings.</Desc></Box><CloseButton /></Stack>
    {[['Vanguard VIG','450 Shares'],['S&P 500 VOO','112 Shares'],['Apple AAPL','85 Shares'],['Realty Income','320 Shares']].map(([a,b]) => <Box key={a} sx={{ mt: .9, p: 1.2, bgcolor: 'action.hover', borderRadius: 1.2 }}><Typography sx={{ fontSize: 10.5 }}>{a}</Typography><Desc>{b}</Desc></Box>)}
  </CardContent></Card>
}

function DonutCard() {
  return <Card><CardContent sx={{ p: 2.2 }}>
    <Box sx={{ width: 150, height: 150, borderRadius: '50%', background: 'conic-gradient(currentColor 0 80%, rgba(255,255,255,.15) 80% 100%)', color: 'primary.main', opacity: .75, mx: 'auto', position: 'relative' }}>
      <Box sx={{ position: 'absolute', inset: 18, borderRadius: '50%', bgcolor: 'background.paper', display: 'grid', placeItems: 'center', textAlign: 'center' }}><Box><Typography sx={{ fontSize: 19, fontWeight: 700 }}>$24,000</Typography><Desc>80% of $30,000</Desc></Box></Box>
    </Box>
    <Divider sx={{ my: 1.7 }} />
    {[['Projected Finish','October 2024'],['Monthly Average','$1,250'],['Top Contributor','Auto-Transfer']].map(([a,b]) => <Stack key={a} direction="row" justifyContent="space-between" sx={{ py: .55 }}><Desc>{a}</Desc><Typography sx={{ fontSize: 10, fontWeight: 600 }}>{b}</Typography></Stack>)}
  </CardContent></Card>
}

function GenericCard({ title, lines = 3 }: { title: string; lines?: number }) {
  return <Card><CardContent sx={{ p: 2.2 }}><Stack direction="row" justifyContent="space-between"><Box><Title>{title}</Title><Desc>Manage and review your settings.</Desc></Box><CloseButton /></Stack>
    {Array.from({ length: lines }, (_, i) => <Box key={i} sx={{ mt: .9, p: 1.25, bgcolor: 'action.hover', borderRadius: 1.2 }}><Stack direction="row" justifyContent="space-between"><Typography sx={{ fontSize: 10.5 }}>{['Overview','Status','Activity','Details'][i % 4]}</Typography><Typography sx={{ fontSize: 10, color: 'text.secondary' }}>{['Active','$1,250','Enabled','Updated'][i % 4]}</Typography></Stack></Box>)}
  </CardContent></Card>
}

function SidebarSetting({ label, value, dot, right }: { label: string; value: string; dot?: string; right?: React.ReactNode }) {
  return <Box sx={{ px: 1.2, py: 1.05, borderBottom: '1px solid', borderColor: 'divider' }}>
    <Stack direction="row" alignItems="center" justifyContent="space-between">
      <Box><Label>{label}</Label><Typography sx={{ fontSize: 10.5, mt: .15 }}>{value}</Typography></Box>
      {right ?? (dot ? <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: dot, border: '1px solid', borderColor: 'divider' }} /> : null)}
    </Stack>
  </Box>
}

export default function ShadcnMuiDemo() {
  const [state, setState] = useState<PlaygroundState>({ mode: 'dark', style: 'Nova', base: 'Neutral', theme: 'Neutral', chart: 'Neutral', radius: 7 })
  const theme = useMemo(() => makeTheme(state), [state])
  const patch = (p: Partial<PlaygroundState>) => setState(s => ({ ...s, ...p }))
  const applyStyle = (style: 'Nova' | 'Maia') => patch({ ...presets[style], style })
  const randomize = () => {
    const names = Object.keys(swatches) as Swatch[]
    const random = () => names[Math.floor(Math.random() * names.length)]
    patch({ base: random(), theme: random(), chart: random(), radius: [5,7,9,11][Math.floor(Math.random()*4)] })
  }

  const cols = [
    [<ContributionHistory key="c1" />, <EmptyDistributeTrack key="c2" />, <QrConnect key="c3" />, <DividendIncome key="c4" />, <GenericCard key="c5" title="Index Investing" />, <GenericCard key="c6" title="Syncing State" />],
    [<PayoutThreshold key="p1" />, <ClaimableBalance key="p2" />, <Preferences key="p3" />, <DonutCard key="p4" />, <GenericCard key="p5" title="Kitchen Island" />],
    [<GenericCard key="x1" title="Savings Targets" lines={5} />, <GenericCard key="x2" title="Recent Transactions" lines={6} />, <GenericCard key="x3" title="Sidebar Navigation" lines={5} />, <GenericCard key="x4" title="FAQ" lines={4} />],
    [<GenericCard key="x5" title="Payments" lines={5} />, <GenericCard key="x6" title="Front Door" />, <GenericCard key="x7" title="Release Catalog" lines={6} />],
    [<GenericCard key="x8" title="Account Access" />, <GenericCard key="x9" title="Card Overview" lines={4} />, <GenericCard key="x10" title="Transfer Funds" />, <GenericCard key="x11" title="Cover Art" />, <GenericCard key="x12" title="Loading Card" />],
    [<GenericCard key="x13" title="Receiving Method" />, <GenericCard key="x14" title="Power Usage" />, <GenericCard key="x15" title="Connect Bank" />, <GenericCard key="x16" title="Upcoming Payments" />, <GenericCard key="x17" title="Roller Shades" />],
    [<GenericCard key="x18" title="Stock Performance" lines={5} />, <GenericCard key="x19" title="Explore Catalog" />, <GenericCard key="x20" title="New Milestone" />, <GenericCard key="x21" title="Social Links" />, <GenericCard key="x22" title="Notification Settings" />],
  ]

  return <ThemeProvider theme={theme}>
    <Box sx={{ minHeight: 'calc(100vh - 58px)', bgcolor: state.mode === 'dark' ? '#0a0a0a' : '#fafafa', color: 'text.primary' }}>
      <Box sx={{ height: 46, px: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid', borderColor: 'divider', bgcolor: state.mode === 'dark' ? '#0a0a0a' : '#fafafa', position: 'sticky', top: 58, zIndex: 10 }}>
        <Stack direction="row" spacing={.7} alignItems="center"><MenuIcon sx={{ fontSize: 14 }} /><Typography sx={{ fontSize: 11, fontWeight: 600 }}>Menu</Typography></Stack>
        <Stack direction="row" spacing={1} alignItems="center">
          <TextField size="small" placeholder="Search..." sx={{ width: 145 }} InputProps={{ startAdornment: <SearchIcon sx={{ fontSize: 12, mr: .5, color: 'text.secondary' }} /> }} />
          <GitHubIcon sx={{ fontSize: 14 }} /><Typography sx={{ fontSize: 9 }}>123K</Typography>
          <Divider orientation="vertical" flexItem />
          <IconButton size="small" onClick={() => patch({ mode: state.mode === 'dark' ? 'light' : 'dark' })}><Box sx={{ width: 10, height: 10, border: '1px solid', borderColor: 'text.primary', borderRadius: '50%', bgcolor: state.mode === 'dark' ? 'text.primary' : 'transparent' }} /></IconButton>
          <Button variant="outlined" endIcon={<OpenInNewIcon sx={{ fontSize: 11 }} />}>Open in v0</Button>
          <Button variant="contained" startIcon={<CodeIcon sx={{ fontSize: 11 }} />}>Get Code</Button>
        </Stack>
      </Box>

      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '150px minmax(0,1fr)', md: '190px minmax(0,1fr)' }, gap: 2, p: 2 }}>
        <Box component="aside" sx={{ alignSelf: 'start', position: 'sticky', top: 120, border: '1px solid', borderColor: 'divider', borderRadius: 2, overflow: 'hidden', bgcolor: 'background.paper' }}>
          <SidebarSetting label="" value="Menu" right={<MenuIcon sx={{ fontSize: 13 }} />} />
          <Box onClick={() => applyStyle(state.style === 'Nova' ? 'Maia' : 'Nova')} sx={{ cursor: 'pointer' }}><SidebarSetting label="Style" value={state.style} right={<Box sx={{ width: 10, height: 10, border: '1px solid', borderColor: 'text.primary', borderRadius: state.style === 'Nova' ? 0.5 : '50%' }} />} /></Box>
          <Box onClick={() => patch({ base: state.base === 'Neutral' ? 'Olive' : 'Neutral' })} sx={{ cursor: 'pointer' }}><SidebarSetting label="Base Color" value={state.base} dot={swatches[state.base]} /></Box>
          <Box onClick={() => patch({ theme: state.theme === 'Neutral' ? 'Amber' : 'Neutral' })} sx={{ cursor: 'pointer' }}><SidebarSetting label="Theme" value={state.theme} dot={swatches[state.theme]} /></Box>
          <Box onClick={() => patch({ chart: state.chart === 'Neutral' ? 'Olive' : 'Neutral' })} sx={{ cursor: 'pointer' }}><SidebarSetting label="Chart Color" value={state.chart} dot={swatches[state.chart]} /></Box>
          <SidebarSetting label="Heading" value="Inter" right={<Typography sx={{ fontSize: 13 }}>Aa</Typography>} />
          <SidebarSetting label="Font" value="Inter" right={<Typography sx={{ fontSize: 13 }}>Aa</Typography>} />
          <SidebarSetting label="Icon Library" value="Lucide" right={<Typography sx={{ fontSize: 12 }}>@</Typography>} />
          <Box onClick={() => patch({ radius: state.radius === 7 ? 11 : 7 })} sx={{ cursor: 'pointer' }}><SidebarSetting label="Radius" value={state.radius === 7 ? 'Default' : 'Large'} right={<Box sx={{ width: 10, height: 10, borderTop: '1px solid', borderRight: '1px solid', borderColor: 'text.primary', borderRadius: '0 7px 0 0' }} />} /></Box>
          <SidebarSetting label="Menu" value="Default / Solid" right={<MenuIcon sx={{ fontSize: 13 }} />} />
          <SidebarSetting label="Menu Accent" value="Subtle" right={<Box sx={{ width: 12, height: 12, border: '1px solid', borderColor: 'text.secondary', transform: 'rotate(45deg)' }} />} />
          <Box sx={{ p: 1.1 }}><Button variant="outlined" fullWidth sx={{ fontSize: 9, mb: .7 }}>--preset {state.style === 'Maia' ? 'b6sUdwFcm' : 'b0'}</Button><Button variant="outlined" fullWidth sx={{ mb: .7 }}>Open Preset</Button><Button variant="outlined" fullWidth startIcon={<ShuffleIcon sx={{ fontSize: 12 }} />} onClick={randomize} sx={{ mb: .7 }}>Shuffle</Button><Button variant="contained" fullWidth>Get Code</Button></Box>
        </Box>

        <Box sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 2.2, overflow: 'auto', bgcolor: 'background.default', minHeight: 'calc(100vh - 140px)' }}>
          <Box sx={{ minWidth: 2380, display: 'grid', gridTemplateColumns: 'repeat(7, 320px)', alignItems: 'start', gap: 2.2, p: 2.2 }}>
            {cols.map((column, i) => <Stack key={i} spacing={2.2}>{column}</Stack>)}
          </Box>
        </Box>
      </Box>
    </Box>
  </ThemeProvider>
}
