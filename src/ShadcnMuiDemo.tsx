import React, { useMemo, useState } from 'react'
import {
  Box, Button, Card, CardContent, Checkbox, Divider, FormControlLabel, IconButton,
  MenuItem, Select, Slider, Stack, Switch, TextField, ThemeProvider, Tooltip,
  Typography, createTheme,
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import SearchIcon from '@mui/icons-material/Search'
import GitHubIcon from '@mui/icons-material/GitHub'
import CodeIcon from '@mui/icons-material/Code'
import CloseIcon from '@mui/icons-material/Close'
import AddIcon from '@mui/icons-material/Add'
import ShuffleIcon from '@mui/icons-material/Shuffle'

const palettes = {
  Neutral: { base: '#a1a1aa', accent: '#e4e4e7' },
  Olive: { base: '#a3a38b', accent: '#a3a38b' },
  Amber: { base: '#d97706', accent: '#d97706' },
  Stone: { base: '#a8a29e', accent: '#a8a29e' },
}

type PaletteName = keyof typeof palettes

function buildTheme(mode: 'light' | 'dark', base: PaletteName, themeColor: PaletteName, radius: number) {
  const dark = mode === 'dark'
  const baseColor = palettes[base].base
  const accent = palettes[themeColor].accent
  return createTheme({
    palette: {
      mode,
      primary: { main: dark ? accent : themeColor === 'Neutral' ? '#18181b' : accent },
      background: { default: dark ? '#0b0b0a' : '#fafafa', paper: dark ? '#151512' : '#ffffff' },
      text: { primary: dark ? '#f5f5f4' : '#18181b', secondary: dark ? '#a8a29e' : '#71717a' },
      divider: dark ? '#292923' : '#e4e4e7',
    },
    shape: { borderRadius: radius },
    typography: {
      fontFamily: 'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      fontSize: 13,
      button: { textTransform: 'none', fontWeight: 500, fontSize: 12 },
    },
    shadows: Array(25).fill('none') as any,
    components: {
      MuiButtonBase: { defaultProps: { disableRipple: true } },
      MuiCard: { styleOverrides: { root: { border: `1px solid ${dark ? '#292923' : '#e4e4e7'}`, boxShadow: 'none', backgroundImage: 'none' } } },
      MuiButton: { styleOverrides: { root: { minHeight: 32, borderRadius: radius, boxShadow: 'none', paddingInline: 12 }, outlined: { borderColor: dark ? '#34342d' : '#d4d4d8' } } },
      MuiOutlinedInput: { styleOverrides: { root: { minHeight: 34, borderRadius: radius, fontSize: 12, background: dark ? '#1b1b17' : '#fff', '& .MuiOutlinedInput-notchedOutline': { borderColor: dark ? '#3a3a32' : '#d4d4d8' } } } },
      MuiSelect: { styleOverrides: { select: { paddingBlock: 7 } } },
      MuiSwitch: { styleOverrides: { root: { width: 34, height: 20, padding: 0 }, switchBase: { padding: 2, '&.Mui-checked': { transform: 'translateX(14px)' } }, thumb: { width: 16, height: 16 }, track: { borderRadius: 10 } } },
      MuiSlider: { styleOverrides: { root: { paddingBlock: 8 }, thumb: { width: 13, height: 13 }, rail: { opacity: .18 }, track: { border: 0 } } },
      MuiCheckbox: { styleOverrides: { root: { padding: 3 } } },
    },
  })
}

const TinyLabel = ({ children }: { children: React.ReactNode }) => <Typography sx={{ fontSize: 9, color: 'text.secondary', textTransform: 'uppercase', letterSpacing: '.08em' }}>{children}</Typography>
const CardTitle = ({ children }: { children: React.ReactNode }) => <Typography sx={{ fontSize: 15, fontWeight: 650, letterSpacing: '-.01em' }}>{children}</Typography>
const CardDesc = ({ children }: { children: React.ReactNode }) => <Typography color="text.secondary" sx={{ fontSize: 11, lineHeight: 1.45 }}>{children}</Typography>

function SettingRow({ label, value, dot }: { label: string; value: string; dot?: string }) {
  return <Box sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 1.2, p: 1.2 }}>
    <Stack direction="row" justifyContent="space-between" alignItems="center">
      <Box><Typography sx={{ fontSize: 9, color: 'text.secondary' }}>{label}</Typography><Typography sx={{ fontSize: 12 }}>{value}</Typography></Box>
      {dot && <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: dot, border: '1px solid', borderColor: 'divider' }} />}
    </Stack>
  </Box>
}

function ContributionHistory() {
  const bars = [60, 80, 65, 95, 50, 100]
  return <Card><CardContent sx={{ p: 2.2 }}><CardTitle>Contribution History</CardTitle><CardDesc>Last 6 months of activity</CardDesc>
    <Stack direction="row" alignItems="end" spacing={1.3} sx={{ height: 145, mt: 2.2 }}>{bars.map((v, i) => <Stack key={i} sx={{ flex: 1, height: '100%' }} justifyContent="end"><Box sx={{ height: `${v}%`, bgcolor: 'primary.main', opacity: .78, borderRadius: '5px 5px 0 0' }} /><Typography sx={{ mt: .7, fontSize: 9, color: 'text.secondary', textAlign: 'center' }}>{['Dec','Jan','Feb','Mar','Apr','May'][i]}</Typography></Stack>)}</Stack>
    <Box sx={{ mt: 1.8, bgcolor: 'action.hover', borderRadius: 1.2, p: 1.3 }}><TinyLabel>Upcoming</TinyLabel><Typography fontWeight={650}>May 25, 2024</Typography><CardDesc>$1,000 scheduled</CardDesc></Box>
    <Box sx={{ mt: 1, bgcolor: 'action.hover', borderRadius: 1.2, p: 1.3 }}><TinyLabel>Auto-save plan</TinyLabel><Typography fontWeight={650}>Accelerated</Typography><CardDesc>Recurring weekly</CardDesc></Box>
    <Button fullWidth variant="contained" sx={{ mt: 1.6 }}>View Full Report</Button>
  </CardContent></Card>
}

function PayoutThreshold() {
  const [amount, setAmount] = useState(2500)
  return <Card><CardContent sx={{ p: 2.2 }}><Stack direction="row" justifyContent="space-between"><Box><CardTitle>Payout Threshold</CardTitle><CardDesc>Set the minimum balance required<br/>before a payout is triggered.</CardDesc></Box><IconButton size="small"><CloseIcon sx={{ fontSize: 15 }}/></IconButton></Stack>
    <Typography sx={{ fontSize: 10, fontWeight: 600, mt: 2 }}>Preferred Currency</Typography><Select fullWidth size="small" defaultValue="usd"><MenuItem value="usd">USD — United States Dollar</MenuItem></Select>
    <Stack direction="row" justifyContent="space-between" alignItems="end" sx={{ mt: 2 }}><Typography sx={{ fontSize: 10, fontWeight: 600, maxWidth: 120 }}>Minimum Payout Amount</Typography><Typography sx={{ fontSize: 22, fontWeight: 700 }}>${amount.toFixed(2)}</Typography></Stack>
    <Slider min={50} max={10000} value={amount} onChange={(_,v)=>setAmount(v as number)} /><Stack direction="row" justifyContent="space-between"><CardDesc>$50 (MIN)</CardDesc><CardDesc>$10,000 (MAX)</CardDesc></Stack>
    <Typography sx={{ fontSize: 10, fontWeight: 600, mt: 2 }}>Notes</Typography><TextField multiline rows={3} fullWidth placeholder="Add any notes for this payout configuration..." />
    <Button fullWidth variant="contained" sx={{ mt: 1.8 }}>Save Threshold</Button>
  </CardContent></Card>
}

function ClaimableBalance() {
  return <Card><CardContent sx={{ p: 2.2 }}><CardDesc>Claimable Balance</CardDesc><Typography sx={{ fontSize: 39, lineHeight: 1.05, letterSpacing: '-.04em' }}>$0.00</Typography><Typography sx={{ fontSize: 9, mt: .5 }}>🟡 Pending Setup</Typography>
    <Box sx={{ bgcolor: 'action.hover', borderRadius: 1.2, p: 1.4, mt: 1.7 }}><Stack spacing={1}><Stack direction="row" justifyContent="space-between"><CardDesc>Net Royalties</CardDesc><Typography sx={{fontSize:11}}>$0.00</Typography></Stack><Stack direction="row" justifyContent="space-between"><CardDesc>Processing Fee</CardDesc><Typography sx={{fontSize:11}}>-$0.00</Typography></Stack><Divider/><Stack direction="row" justifyContent="space-between"><CardDesc>Total Ready to Claim</CardDesc><Typography sx={{fontSize:11,fontWeight:700}}>$0.00 USD</Typography></Stack></Stack></Box>
    <CardDesc><Box component="span" sx={{ display:'block', mt: 2 }}>Once your bank is connected, balances over $10.00 are automatically eligible for monthly distribution on the 15th of each month.</Box></CardDesc>
  </CardContent></Card>
}

function Preferences() {
  const [stats,setStats]=useState(true); const [email,setEmail]=useState(true)
  return <Card><CardContent sx={{ p: 2.2 }}><Stack direction="row" justifyContent="space-between"><Box><CardTitle>Preferences</CardTitle><CardDesc>Manage your account settings<br/>and notifications.</CardDesc></Box><IconButton size="small"><CloseIcon sx={{fontSize:15}}/></IconButton></Stack>
    <Typography sx={{fontSize:10,fontWeight:600,mt:2}}>Default Currency</Typography><Select fullWidth size="small" defaultValue="usd"><MenuItem value="usd">USD — United States Dollar</MenuItem></Select><Divider sx={{my:1.7}}/>
    <Stack direction="row" justifyContent="space-between"><Box><Typography sx={{fontSize:10,fontWeight:600}}>Public Statistics</Typography><CardDesc>Allow others to see your total stream count and listening activity</CardDesc></Box><Switch checked={stats} onChange={e=>setStats(e.target.checked)}/></Stack><Divider sx={{my:1.5}}/>
    <Stack direction="row" justifyContent="space-between"><Box><Typography sx={{fontSize:10,fontWeight:600}}>Email Notifications</Typography><CardDesc>Monthly royalty reports and distribution updates</CardDesc></Box><Switch checked={email} onChange={e=>setEmail(e.target.checked)}/></Stack>
    <Stack direction="row" justifyContent="space-between" sx={{mt:1.8}}><Button variant="outlined">Reset</Button><Button variant="contained">Save Preferences</Button></Stack>
  </CardContent></Card>
}

function EmptyDistributeTrack() { return <Card><CardContent sx={{ p: 2.5, textAlign:'center' }}><Box sx={{mx:'auto',width:32,height:32,borderRadius:1,bgcolor:'action.hover',display:'grid',placeItems:'center'}}><AddIcon fontSize="small"/></Box><Typography fontWeight={600} sx={{mt:2}}>Distribute Track</Typography><CardDesc>Upload your first master to<br/>start reaching listeners on<br/>Spotify, Apple Music, and more.</CardDesc><Button variant="contained" sx={{mt:1.6}}>Create Release</Button></CardContent></Card> }

function QRCode() {
  const cells = Array.from({length: 21*21}, (_,i) => ((i*7 + Math.floor(i/21)*11 + i%5) % 4) !== 0)
  return <Box sx={{display:'grid',gridTemplateColumns:'repeat(21,5px)',gridAutoRows:'5px',bgcolor:'#fff',p:1.2,borderRadius:1,width:'fit-content',mx:'auto'}}>{cells.map((on,i)=><Box key={i} sx={{bgcolor:on?'#000':'#fff'}}/>)}</Box>
}

function QrConnect() { return <Card><CardContent sx={{p:2.5,textAlign:'center'}}><QRCode/><Typography fontWeight={600} sx={{mt:2}}>Scan to connect your mobile device</Typography><CardDesc>Open the Ledger mobile app and scan this<br/>code to link your device.</CardDesc><Button fullWidth sx={{mt:2,bgcolor:'action.hover'}}>Got It</Button></CardContent></Card> }

function DividendIncome() { return <Card><CardContent sx={{p:2.2}}><Stack direction="row" justifyContent="space-between"><Box><CardTitle>Q2 Dividend Income</CardTitle><CardDesc>Quarterly dividend payouts across<br/>your portfolio holdings.</CardDesc></Box><IconButton size="small"><CloseIcon sx={{fontSize:15}}/></IconButton></Stack>{[['Vanguard VIG','450 Shares'],['S&P 500 VOO','112 Shares'],['Apple AAPL','85 Shares'],['Realty Income','320 Shares']].map(([a,b])=><Box key={a} sx={{p:1.3,bgcolor:'action.hover',borderRadius:1.2,mt:1}}><Typography sx={{fontSize:11}}>{a}</Typography><CardDesc>{b}</CardDesc></Box>)}</CardContent></Card> }

function DonutCard() { return <Card><CardContent sx={{p:2.2}}><Box sx={{width:145,height:145,borderRadius:'50%',background:'conic-gradient(currentColor 0 80%, transparent 80% 100%)',color:'primary.main',opacity:.6,mx:'auto',position:'relative'}}><Box sx={{position:'absolute',inset:18,borderRadius:'50%',bgcolor:'background.paper',display:'grid',placeItems:'center',textAlign:'center'}}><Box><Typography fontWeight={700} sx={{fontSize:19}}>$24,000</Typography><CardDesc>80% of $30,000</CardDesc></Box></Box></Box><Divider sx={{my:2}}/>{[['Projected Finish','October 2024'],['Monthly Average','$1,250'],['Top Contributor','Auto-Transfer']].map(([a,b])=><Stack key={a} direction="row" justifyContent="space-between" sx={{py:.7}}><CardDesc>{a}</CardDesc><Typography sx={{fontSize:11,fontWeight:600}}>{b}</Typography></Stack>)}</CardContent></Card> }

export default function ShadcnMuiDemo() {
  const [mode,setMode]=useState<'light'|'dark'>('dark')
  const [style,setStyle]=useState('Nova')
  const [base,setBase]=useState<PaletteName>('Neutral')
  const [themeColor,setThemeColor]=useState<PaletteName>('Neutral')
  const [chart,setChart]=useState<PaletteName>('Neutral')
  const [radius,setRadius]=useState(8)
  const theme=useMemo(()=>buildTheme(mode,base,themeColor,radius),[mode,base,themeColor,radius])
  const setPalette=(setter:(v:PaletteName)=>void,value:string)=>setter(value as PaletteName)

  return <ThemeProvider theme={theme}><Box sx={{minHeight:'calc(100vh - 58px)',bgcolor:'background.default',color:'text.primary'}}>
    <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{height:48,px:2,borderBottom:'1px solid',borderColor:'divider',position:'sticky',top:58,zIndex:5,bgcolor:'background.default'}}>
      <Stack direction="row" spacing={1} alignItems="center"><MenuIcon sx={{fontSize:16}}/><Typography sx={{fontSize:12,fontWeight:650}}>Menu</Typography></Stack>
      <Stack direction="row" spacing={1} alignItems="center"><TextField size="small" placeholder="Search..." sx={{width:135}} InputProps={{startAdornment:<SearchIcon sx={{fontSize:13,mr:.5,color:'text.secondary'}}/>}}/><GitHubIcon sx={{fontSize:15}}/><Typography sx={{fontSize:10}}>123K</Typography><Divider orientation="vertical" flexItem/><Button variant="outlined">Open in v0</Button><Button variant="contained" startIcon={<CodeIcon sx={{fontSize:13}}/>}>Get Code</Button></Stack>
    </Stack>
    <Box sx={{display:'grid',gridTemplateColumns:{xs:'1fr',md:'150px minmax(0,1fr)'},gap:2,p:2}}>
      <Box component="aside" sx={{position:{md:'sticky'},top:{md:122},alignSelf:'start',border:'1px solid',borderColor:'divider',borderRadius:2,overflow:'hidden',bgcolor:'background.paper'}}>
        <Box sx={{p:1,borderBottom:'1px solid',borderColor:'divider'}}><Button fullWidth variant="outlined" sx={{justifyContent:'space-between'}}>Menu <MenuIcon sx={{fontSize:14}}/></Button></Box>
        <Stack spacing={.9} sx={{p:1}}>
          <Box onClick={()=>setStyle(style==='Nova'?'Maia':'Nova')} sx={{cursor:'pointer'}}><SettingRow label="Style" value={style} dot={style==='Nova'?'#fff':'#a3a38b'}/></Box>
          <Box onClick={()=>setPalette(setBase,base==='Neutral'?'Olive':'Neutral')} sx={{cursor:'pointer'}}><SettingRow label="Base Color" value={base} dot={palettes[base].base}/></Box>
          <Box onClick={()=>setPalette(setThemeColor,themeColor==='Neutral'?'Amber':'Neutral')} sx={{cursor:'pointer'}}><SettingRow label="Theme" value={themeColor} dot={palettes[themeColor].accent}/></Box>
          <Box onClick={()=>setPalette(setChart,chart==='Neutral'?'Olive':'Neutral')} sx={{cursor:'pointer'}}><SettingRow label="Chart Color" value={chart} dot={palettes[chart].base}/></Box>
          <SettingRow label="Heading" value="Inter"/><SettingRow label="Font" value="Inter"/><SettingRow label="Icon Library" value="Lucide"/><Box onClick={()=>setRadius(radius===8?12:8)} sx={{cursor:'pointer'}}><SettingRow label="Radius" value={radius===8?'Default':'Large'}/></Box><SettingRow label="Menu" value="Default / Solid"/><SettingRow label="Menu Accent" value="Subtle"/>
          <Button variant="outlined" sx={{fontSize:9}}>--preset b6sUdwFcm</Button><Button variant="outlined">Open Preset</Button><Button variant="outlined" startIcon={<ShuffleIcon sx={{fontSize:13}}/>}>Shuffle</Button><Button variant="contained">Get Code</Button>
          <FormControlLabel control={<Switch checked={mode==='dark'} onChange={e=>setMode(e.target.checked?'dark':'light')}/>} label={<Typography sx={{fontSize:10}}>Dark</Typography>}/>
        </Stack>
      </Box>
      <Box sx={{border:'1px solid',borderColor:'divider',borderRadius:2,p:{xs:1.4,md:1.8},overflowX:'auto',bgcolor: mode==='dark' ? '#11110d' : '#f4f4f5'}}>
        <Box sx={{display:'grid',gridTemplateColumns:{xs:'minmax(225px,1fr) minmax(225px,1fr)',xl:'repeat(4,minmax(245px,1fr))'},gap:1.5,minWidth:{xs:500,xl:1100},alignItems:'start'}}>
          <Stack spacing={1.5}><ContributionHistory/><EmptyDistributeTrack/><QrConnect/><DividendIncome/></Stack>
          <Stack spacing={1.5}><PayoutThreshold/><ClaimableBalance/><Preferences/><DonutCard/></Stack>
          <Stack spacing={1.5} sx={{display:{xs:'none',xl:'flex'}}}><DividendIncome/><ContributionHistory/><EmptyDistributeTrack/></Stack>
          <Stack spacing={1.5} sx={{display:{xs:'none',xl:'flex'}}}><Preferences/><QrConnect/><ClaimableBalance/></Stack>
        </Box>
      </Box>
    </Box>
  </Box></ThemeProvider>
}
