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

const sourceRadius = {
  button: 32,
  card: 16,
  dialog: 32,
  menu: 16,
  menuItem: 12,
  alert: 8,
  checkbox: 6,
}

const colors = {
  olive: '#a3a38b',
  amber: '#b45309',
}

function makeMaiaTheme(mode: 'light' | 'dark') {
  const dark = mode === 'dark'
  const background = dark ? '#10110d' : '#f7f7f5'
  const paper = dark ? '#1a1b15' : '#ffffff'
  const mutedSurface = dark ? '#202119' : '#f1f1ed'
  const border = dark ? '#2d2f25' : '#deded8'
  const foreground = dark ? '#f4f4ef' : '#1d1e19'
  const muted = dark ? '#a8a89a' : '#737469'
  const primary = dark ? '#c35308' : colors.amber

  return createTheme({
    palette: {
      mode,
      primary: { main: primary, contrastText: '#fff' },
      background: { default: background, paper },
      text: { primary: foreground, secondary: muted },
      divider: border,
      action: { hover: mutedSurface, selected: mutedSurface },
    },
    shape: { borderRadius: 16 },
    spacing: 8,
    typography: {
      fontFamily: 'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      fontSize: 13,
      button: { textTransform: 'none', fontWeight: 500, fontSize: 12 },
    },
    shadows: Array(25).fill('none') as any,
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          '*': { boxSizing: 'border-box' },
          body: { margin: 0, background },
        },
      },
      MuiButtonBase: { defaultProps: { disableRipple: true } },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: sourceRadius.card,
            border: `1px solid ${dark ? '#2d2f25' : '#e2e2dd'}`,
            boxShadow: `0 0 0 1px ${dark ? 'rgba(255,255,255,.025)' : 'rgba(0,0,0,.025)'}`,
            backgroundImage: 'none',
            overflow: 'hidden',
          },
        },
      },
      MuiCardContent: { styleOverrides: { root: { padding: 24, '&:last-child': { paddingBottom: 24 } } } },
      MuiButton: {
        defaultProps: { disableElevation: true },
        styleOverrides: {
          root: {
            minHeight: 36,
            borderRadius: sourceRadius.button,
            paddingInline: 14,
            boxShadow: 'none',
            fontSize: 12,
            fontWeight: 500,
          },
          sizeSmall: { minHeight: 32, paddingInline: 12 },
          sizeLarge: { minHeight: 40, paddingInline: 16 },
          outlined: {
            borderColor: border,
            background: dark ? 'rgba(255,255,255,.025)' : 'rgba(0,0,0,.018)',
            '&:hover': { borderColor: border, background: dark ? 'rgba(255,255,255,.055)' : 'rgba(0,0,0,.04)' },
          },
          containedPrimary: { '&:hover': { backgroundColor: dark ? '#a94808' : '#9f4608' } },
        },
      },
      MuiIconButton: {
        styleOverrides: {
          root: { borderRadius: '50%', width: 32, height: 32 },
          sizeSmall: { width: 28, height: 28 },
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            minHeight: 36,
            borderRadius: 999,
            background: dark ? 'rgba(255,255,255,.035)' : 'rgba(0,0,0,.025)',
            fontSize: 12,
            '& .MuiOutlinedInput-notchedOutline': { borderColor: border },
            '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: dark ? '#3b3e31' : '#cfcfc8' },
            '&.Mui-focused': { boxShadow: `0 0 0 3px ${dark ? 'rgba(195,83,8,.2)' : 'rgba(180,83,9,.14)'}` },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: primary, borderWidth: 1 },
          },
          input: { padding: '8px 12px' },
        },
      },
      MuiSelect: { styleOverrides: { select: { paddingTop: 7, paddingBottom: 7 } } },
      MuiMenu: { styleOverrides: { paper: { borderRadius: sourceRadius.menu, border: `1px solid ${border}`, padding: 4 } } },
      MuiMenuItem: { styleOverrides: { root: { minHeight: 36, borderRadius: sourceRadius.menuItem, fontSize: 12, marginBlock: 2 } } },
      MuiSwitch: {
        styleOverrides: {
          root: { width: 36, height: 22, padding: 0 },
          switchBase: { padding: 3, '&.Mui-checked': { transform: 'translateX(14px)' } },
          thumb: { width: 16, height: 16 },
          track: { borderRadius: 11 },
        },
      },
      MuiSlider: {
        styleOverrides: {
          root: { paddingBlock: 9 },
          thumb: { width: 13, height: 13, background: '#fff' },
          rail: { opacity: .16 },
          track: { border: 0 },
        },
      },
      MuiDivider: { styleOverrides: { root: { borderColor: border } } },
    },
  })
}

const Label = ({ children }: { children: React.ReactNode }) => <Typography sx={{ fontSize: 9, color: 'text.secondary', lineHeight: 1.2 }}>{children}</Typography>
const Title = ({ children }: { children: React.ReactNode }) => <Typography sx={{ fontSize: 13, fontWeight: 600, lineHeight: 1.25 }}>{children}</Typography>
const Desc = ({ children }: { children: React.ReactNode }) => <Typography sx={{ fontSize: 10, color: 'text.secondary', lineHeight: 1.45 }}>{children}</Typography>

function CloseButton() { return <IconButton size="small" sx={{ bgcolor: 'action.hover' }}><CloseIcon sx={{ fontSize: 13 }} /></IconButton> }

function ContributionHistory() {
  const bars = [58, 79, 66, 94, 52, 100]
  return <Card><CardContent>
    <Title>Contribution History</Title><Desc>Last 6 months of activity</Desc>
    <Stack direction="row" alignItems="end" spacing={1.15} sx={{ height: 142, mt: 2.5 }}>
      {bars.map((v, i) => <Stack key={i} sx={{ flex: 1, height: '100%' }} justifyContent="end">
        <Box sx={{ height: `${v}%`, bgcolor: colors.olive, opacity: .76, borderRadius: '6px 6px 0 0' }} />
        <Typography sx={{ mt: .6, fontSize: 8, color: 'text.secondary', textAlign: 'center' }}>{['Dec','Jan','Feb','Mar','Apr','May'][i]}</Typography>
      </Stack>)}
    </Stack>
    <Box sx={{ mt: 1.7, p: 1.5, borderRadius: 2, bgcolor: 'action.hover' }}><Label>UPCOMING</Label><Typography sx={{ fontSize: 13, fontWeight: 600, mt: .25 }}>May 25, 2024</Typography><Desc>$1,000 scheduled</Desc></Box>
    <Box sx={{ mt: 1.1, p: 1.5, borderRadius: 2, bgcolor: 'action.hover' }}><Label>AUTO-SAVE PLAN</Label><Typography sx={{ fontSize: 13, fontWeight: 600, mt: .25 }}>Accelerated</Typography><Desc>Recurring weekly</Desc></Box>
    <Button variant="contained" fullWidth sx={{ mt: 2 }}>View Full Report</Button>
  </CardContent></Card>
}

function PayoutThreshold() {
  const [amount, setAmount] = useState(2500)
  return <Card><CardContent>
    <Stack direction="row" justifyContent="space-between"><Box><Title>Payout Threshold</Title><Desc>Set the minimum balance required<br/>before a payout is triggered.</Desc></Box><CloseButton /></Stack>
    <Typography sx={{ fontSize: 9, fontWeight: 600, mt: 2 }}>Preferred Currency</Typography>
    <Select size="small" fullWidth defaultValue="usd" sx={{ mt: .6 }}><MenuItem value="usd">USD — United States Dollar</MenuItem></Select>
    <Stack direction="row" justifyContent="space-between" alignItems="end" sx={{ mt: 2 }}><Typography sx={{ fontSize: 9, fontWeight: 600, maxWidth: 110 }}>Minimum Payout Amount</Typography><Typography sx={{ fontSize: 20, fontWeight: 700 }}>${amount.toFixed(2)}</Typography></Stack>
    <Slider min={50} max={10000} value={amount} onChange={(_, v) => setAmount(v as number)} />
    <Stack direction="row" justifyContent="space-between"><Desc>$50 (MIN)</Desc><Desc>$10,000 (MAX)</Desc></Stack>
    <Typography sx={{ fontSize: 9, fontWeight: 600, mt: 2 }}>Notes</Typography>
    <TextField fullWidth multiline rows={3} placeholder="Add any notes for this payout configuration..." sx={{ mt: .6, '& .MuiOutlinedInput-root': { borderRadius: 2 } }} />
    <Button variant="contained" fullWidth sx={{ mt: 2 }}>Save Threshold</Button>
  </CardContent></Card>
}

function ClaimableBalance() {
  return <Card><CardContent>
    <Desc>Claimable Balance</Desc><Typography sx={{ fontSize: 38, lineHeight: 1.05, letterSpacing: '-.04em', mt: .3 }}>$0.00</Typography>
    <Typography sx={{ fontSize: 8.5, mt: .5 }}>🟡 Pending Setup</Typography>
    <Box sx={{ bgcolor: 'action.hover', borderRadius: 2, p: 1.5, mt: 1.8 }}>
      {[['Net Royalties','$0.00'],['Processing Fee','-$0.00']].map(([a,b]) => <Stack key={a} direction="row" justifyContent="space-between" sx={{ py: .45 }}><Desc>{a}</Desc><Typography sx={{ fontSize: 10 }}>{b}</Typography></Stack>)}
      <Divider sx={{ my: .8 }}/><Stack direction="row" justifyContent="space-between"><Desc>Total Ready to Claim</Desc><Typography sx={{ fontSize: 10, fontWeight: 600 }}>$0.00 USD</Typography></Stack>
    </Box>
    <Desc><Box component="span" sx={{ display:'block', mt: 2 }}>Once your bank is connected, balances over $10.00 are automatically eligible for monthly distribution on the 15th of each month.</Box></Desc>
  </CardContent></Card>
}

function Preferences() {
  const [stats,setStats]=useState(true); const [email,setEmail]=useState(true)
  return <Card><CardContent>
    <Stack direction="row" justifyContent="space-between"><Box><Title>Preferences</Title><Desc>Manage your account settings<br/>and notifications.</Desc></Box><CloseButton /></Stack>
    <Typography sx={{fontSize:9,fontWeight:600,mt:2}}>Default Currency</Typography><Select fullWidth size="small" defaultValue="usd" sx={{mt:.6}}><MenuItem value="usd">USD — United States Dollar</MenuItem></Select><Divider sx={{my:1.8}}/>
    <Stack direction="row" justifyContent="space-between" gap={1}><Box><Typography sx={{fontSize:9.5,fontWeight:600}}>Public Statistics</Typography><Desc>Allow others to see your total stream<br/>count and listening activity</Desc></Box><Switch checked={stats} onChange={e=>setStats(e.target.checked)}/></Stack><Divider sx={{my:1.5}}/>
    <Stack direction="row" justifyContent="space-between" gap={1}><Box><Typography sx={{fontSize:9.5,fontWeight:600}}>Email Notifications</Typography><Desc>Monthly royalty reports and<br/>distribution updates</Desc></Box><Switch checked={email} onChange={e=>setEmail(e.target.checked)}/></Stack>
    <Stack direction="row" justifyContent="space-between" sx={{mt:2}}><Button variant="outlined">Reset</Button><Button variant="contained">Save Preferences</Button></Stack>
  </CardContent></Card>
}

function EmptyDistributeTrack() { return <Card><CardContent sx={{ py: 4, textAlign:'center' }}><Box sx={{mx:'auto',width:32,height:32,borderRadius:'50%',bgcolor:'action.hover',display:'grid',placeItems:'center'}}><AddIcon fontSize="small"/></Box><Typography fontWeight={600} sx={{mt:2}}>Distribute Track</Typography><Desc>Upload your first master to<br/>start reaching listeners on<br/>Spotify, Apple Music, and more.</Desc><Button variant="contained" sx={{mt:2}}>Create Release</Button></CardContent></Card> }

function QRCode() {
  const cells = Array.from({length:25*25},(_,i)=>((i*13+Math.floor(i/25)*7+(i%6)*3)%5)<3)
  return <Box sx={{display:'grid',gridTemplateColumns:'repeat(25,4px)',gridAutoRows:'4px',bgcolor:'#fff',p:1.3,borderRadius:2,width:'fit-content',mx:'auto'}}>{cells.map((on,i)=><Box key={i} sx={{bgcolor:on?'#000':'#fff'}}/>)}</Box>
}
function QrConnect() { return <Card><CardContent sx={{py:3.5,textAlign:'center'}}><QRCode/><Typography sx={{fontSize:11,fontWeight:600,mt:2}}>Scan to connect your mobile<br/>device</Typography><Desc>Open the Ledger mobile app and scan<br/>this code to link your device.</Desc><Button fullWidth sx={{mt:2,bgcolor:'action.hover',color:'text.primary'}}>Got It</Button></CardContent></Card> }

function DividendIncome() { return <Card><CardContent><Stack direction="row" justifyContent="space-between"><Box><Title>Q2 Dividend Income</Title><Desc>Quarterly dividend payouts across<br/>your portfolio holdings.</Desc></Box><CloseButton /></Stack>{[['Vanguard VIG','450 Shares'],['S&P 500 VOO','112 Shares'],['Apple AAPL','85 Shares'],['Realty Income','320 Shares']].map(([a,b])=><Box key={a} sx={{mt:1.1,p:1.5,bgcolor:'action.hover',borderRadius:2}}><Typography sx={{fontSize:10.5}}>{a}</Typography><Desc>{b}</Desc></Box>)}</CardContent></Card> }

function DonutCard() { return <Card><CardContent><Box sx={{width:150,height:150,borderRadius:'50%',background:'conic-gradient(#a3a38b 0 80%, rgba(163,163,139,.18) 80% 100%)',mx:'auto',position:'relative'}}><Box sx={{position:'absolute',inset:18,borderRadius:'50%',bgcolor:'background.paper',display:'grid',placeItems:'center',textAlign:'center'}}><Box><Typography sx={{fontSize:19,fontWeight:700}}>$24,000</Typography><Desc>80% of $30,000</Desc></Box></Box></Box><Divider sx={{my:2}}/>{[['Projected Finish','October 2024'],['Monthly Average','$1,250'],['Top Contributor','Auto-Transfer']].map(([a,b])=><Stack key={a} direction="row" justifyContent="space-between" sx={{py:.7}}><Desc>{a}</Desc><Typography sx={{fontSize:10.5,fontWeight:600}}>{b}</Typography></Stack>)}</CardContent></Card> }

function Setting({ label, value, dot }: { label:string; value:string; dot?:string }) { return <Box sx={{p:1.25,border:'1px solid',borderColor:'divider',borderRadius:2}}><Stack direction="row" alignItems="center" justifyContent="space-between"><Box><Label>{label}</Label><Typography sx={{fontSize:11}}>{value}</Typography></Box>{dot&&<Box sx={{width:12,height:12,borderRadius:'50%',bgcolor:dot,border:'1px solid',borderColor:'divider'}}/>}</Stack></Box> }

function PlaceholderCard({ title, lines = 3 }: { title:string; lines?:number }) { return <Card><CardContent><Title>{title}</Title><Desc>Maia component treatment using source-derived radius, spacing, and surface rules.</Desc><Stack spacing={1.1} sx={{mt:2}}>{Array.from({length:lines}).map((_,i)=><Box key={i} sx={{height:34,borderRadius:2,bgcolor:'action.hover'}}/>)}</Stack></CardContent></Card> }

export default function ExactMaiaDemo() {
  const [mode,setMode]=useState<'light'|'dark'>('dark')
  const theme=useMemo(()=>makeMaiaTheme(mode),[mode])
  return <ThemeProvider theme={theme}><Box sx={{minHeight:'calc(100vh - 58px)',bgcolor:'background.default',color:'text.primary'}}>
    <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{height:48,px:2,borderBottom:'1px solid',borderColor:'divider',position:'sticky',top:58,zIndex:5,bgcolor:'background.default'}}>
      <Stack direction="row" spacing={1} alignItems="center"><MenuIcon sx={{fontSize:15}}/><Typography sx={{fontSize:12,fontWeight:600}}>Menu</Typography></Stack>
      <Stack direction="row" spacing={1} alignItems="center"><TextField size="small" placeholder="Search..." sx={{width:136}} InputProps={{startAdornment:<SearchIcon sx={{fontSize:13,mr:.5,color:'text.secondary'}}/>}}/><GitHubIcon sx={{fontSize:15}}/><Typography sx={{fontSize:10}}>123K</Typography><Divider orientation="vertical" flexItem/><Button variant="outlined">Open in v0</Button><Button variant="contained" startIcon={<CodeIcon sx={{fontSize:13}}/>}>Get Code</Button></Stack>
    </Stack>

    <Box sx={{display:'grid',gridTemplateColumns:{xs:'1fr',md:'152px minmax(0,1fr)'},gap:2,p:2}}>
      <Box component="aside" sx={{position:{md:'sticky'},top:{md:122},alignSelf:'start',border:'1px solid',borderColor:'divider',borderRadius:2,overflow:'hidden',bgcolor:'background.paper'}}>
        <Stack spacing={1} sx={{p:1}}>
          <Setting label="Style" value="Maia" />
          <Setting label="Base Color" value="Olive" dot={colors.olive} />
          <Setting label="Theme" value="Amber" dot={colors.amber} />
          <Setting label="Chart Color" value="Olive" dot={colors.olive} />
          <Divider/>
          <Setting label="Heading" value="Inter" /><Setting label="Font" value="Inter" />
          <Divider/>
          <Setting label="Icon Library" value="Lucide" /><Setting label="Radius" value="Default" />
          <Setting label="Menu" value="Default / Solid" /><Setting label="Menu Accent" value="Subtle" />
          <Button variant="outlined" fullWidth sx={{mt:.5}}>--preset b6sUdwFcm</Button>
          <Button variant="outlined" fullWidth>Open Preset</Button>
          <Button variant="outlined" fullWidth startIcon={<ShuffleIcon sx={{fontSize:13}}/>}>Shuffle</Button>
          <Button variant="contained" fullWidth>Get Code</Button>
          <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{pt:.5}}><Label>Dark mode</Label><Switch checked={mode==='dark'} onChange={e=>setMode(e.target.checked?'dark':'light')}/></Stack>
        </Stack>
      </Box>

      <Box sx={{overflowX:'auto',overflowY:'hidden',border:'1px solid',borderColor:'divider',borderRadius:2,bgcolor:'background.default'}}>
        <Box sx={{width:{xs:1180,lg:2400},display:'grid',gridTemplateColumns:'repeat(7, minmax(0,1fr))',gap:3,p:3,alignItems:'start'}}>
          <Stack spacing={3}><ContributionHistory/><EmptyDistributeTrack/><QrConnect/><DividendIncome/><PlaceholderCard title="Index Investing"/><PlaceholderCard title="Syncing State" lines={2}/></Stack>
          <Stack spacing={3}><PayoutThreshold/><ClaimableBalance/><Preferences/><DonutCard/><PlaceholderCard title="Kitchen Island"/></Stack>
          <Stack spacing={3} sx={{gridColumn:'span 2'}}><PlaceholderCard title="Savings Targets" lines={5}/><PlaceholderCard title="Recent Transactions" lines={6}/><Box sx={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:3}}><Stack spacing={3}><PlaceholderCard title="Sidebar Nav"/><PlaceholderCard title="FAQ"/></Stack><Stack spacing={3}><PlaceholderCard title="Payments"/><PlaceholderCard title="Front Door"/></Stack></Box><PlaceholderCard title="Release Catalog" lines={4}/></Stack>
          <Stack spacing={3}><PlaceholderCard title="Account Access"/><PlaceholderCard title="Card Overview"/><PlaceholderCard title="Transfer Funds"/><PlaceholderCard title="Cover Art"/><PlaceholderCard title="Loading Card"/></Stack>
          <Stack spacing={3}><PlaceholderCard title="Receiving Method"/><PlaceholderCard title="Power Usage"/><PlaceholderCard title="Connect Bank"/><PlaceholderCard title="Upcoming Payments"/><PlaceholderCard title="Roller Shades"/></Stack>
          <Stack spacing={3}><PlaceholderCard title="Stock Performance"/><PlaceholderCard title="Explore Catalog"/><PlaceholderCard title="New Milestone"/><PlaceholderCard title="Social Links"/><PlaceholderCard title="Notification Settings"/></Stack>
        </Box>
      </Box>
    </Box>
  </Box></ThemeProvider>
}
