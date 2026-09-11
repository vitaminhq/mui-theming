import React, { useMemo, useState } from 'react'
import {
  Avatar, Box, Button, Card, CardContent, Checkbox, Chip, CssBaseline, Divider, FormControlLabel,
  IconButton, InputAdornment, List, ListItemButton, ListItemText, MenuItem, Paper, Select, Stack,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, ThemeProvider,
  Typography,
} from '@mui/material'
import SearchRounded from '@mui/icons-material/SearchRounded'
import MoreVertRounded from '@mui/icons-material/MoreVertRounded'
import SendRounded from '@mui/icons-material/SendRounded'
import AddRounded from '@mui/icons-material/AddRounded'
import DashboardRounded from '@mui/icons-material/DashboardRounded'
import GroupRounded from '@mui/icons-material/GroupRounded'
import SettingsRounded from '@mui/icons-material/SettingsRounded'
import ChatBubbleOutlineRounded from '@mui/icons-material/ChatBubbleOutlineRounded'
import { tokensForPreset } from './theme'
import { createMinimalTheme } from './minimalTheme'

const users = [
  ['Olivia Martin', 'olivia@acme.co', 'Admin', 'Active'],
  ['Jackson Lee', 'jackson@acme.co', 'Editor', 'Active'],
  ['Sophia Brown', 'sophia@acme.co', 'Support', 'Pending'],
  ['Liam Wilson', 'liam@acme.co', 'Viewer', 'Active'],
  ['Ava Anderson', 'ava@acme.co', 'Editor', 'Blocked'],
]
const contacts = [
  ['Olivia Martin', 'Can you check the new user flow?', '2m'],
  ['Jackson Lee', 'Everything is merged now.', '18m'],
  ['Sophia Brown', 'Sent an attachment', '1h'],
  ['Product Team', 'Ava: I updated the brief.', '3h'],
]

function Shell({ children, active = 'Users' }: { children: React.ReactNode; active?: string }) {
  return <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '260px minmax(0,1fr)' }, minHeight: 760, bgcolor: 'background.default' }}>
    <Box component="aside" sx={{ display: { xs: 'none', md: 'block' }, px: 2, py: 3, borderRight: '1px dashed', borderColor: t => t.palette.grey[300], bgcolor: 'background.paper' }}>
      <Stack direction="row" alignItems="center" spacing={1.2} sx={{ px: 1.5, mb: 4 }}><Box sx={{ width: 28, height: 28, borderRadius: '50% 50% 50% 10%', bgcolor: 'primary.main' }} /><Typography fontWeight={800}>Acme</Typography></Stack>
      <Typography variant="overline" color="text.secondary" sx={{ px: 1.5 }}>Overview</Typography>
      <List sx={{ mt: 1 }}>{[
        ['Dashboard', <DashboardRounded fontSize="small" />], ['Users', <GroupRounded fontSize="small" />], ['Chat', <ChatBubbleOutlineRounded fontSize="small" />], ['Settings', <SettingsRounded fontSize="small" />],
      ].map(([label, icon]) => <ListItemButton key={label as string} selected={active === label} sx={{ borderRadius: 1.5, mb: .5, minHeight: 44, '&.Mui-selected': { bgcolor: t => t.palette.mode === 'dark' ? 'rgba(0,167,111,.16)' : 'rgba(0,167,111,.08)', color: 'primary.main' } }}><Box sx={{ mr: 1.5, display: 'flex' }}>{icon}</Box><ListItemText primary={label} primaryTypographyProps={{ fontSize: 14, fontWeight: active === label ? 700 : 500 }} /></ListItemButton>)}</List>
    </Box>
    <Box minWidth={0}>{children}</Box>
  </Box>
}

function AdminDemo() {
  return <Shell><Box sx={{ p: { xs: 2, md: 4 } }}>
    <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" gap={2} sx={{ mb: 4 }}><Box><Typography variant="h4">Users</Typography><Typography color="text.secondary" sx={{ mt: .5 }}>Manage team members and their account permissions.</Typography></Box><Button startIcon={<AddRounded />} variant="contained">New user</Button></Stack>
    <Card sx={{ mb: 3 }}><CardContent><Stack direction={{ xs: 'column', md: 'row' }} gap={2}><TextField fullWidth label="Search users" placeholder="Name or email" InputProps={{ startAdornment: <InputAdornment position="start"><SearchRounded /></InputAdornment> }} /><Select defaultValue="all" sx={{ minWidth: 160 }}><MenuItem value="all">All roles</MenuItem><MenuItem value="admin">Admin</MenuItem><MenuItem value="editor">Editor</MenuItem></Select></Stack></CardContent></Card>
    <Card><TableContainer><Table><TableHead><TableRow><TableCell padding="checkbox"><Checkbox /></TableCell><TableCell>User</TableCell><TableCell>Role</TableCell><TableCell>Status</TableCell><TableCell align="right" /></TableRow></TableHead><TableBody>{users.map((u, i) => <TableRow key={u[1]} hover><TableCell padding="checkbox"><Checkbox /></TableCell><TableCell><Stack direction="row" alignItems="center" spacing={2}><Avatar sx={{ width: 40, height: 40, bgcolor: i % 2 ? 'secondary.light' : 'primary.lighter', color: i % 2 ? 'secondary.dark' : 'primary.dark' }}>{u[0][0]}</Avatar><Box><Typography variant="subtitle2">{u[0]}</Typography><Typography variant="body2" color="text.secondary">{u[1]}</Typography></Box></Stack></TableCell><TableCell>{u[2]}</TableCell><TableCell><Chip size="small" label={u[3]} color={u[3] === 'Active' ? 'success' : u[3] === 'Blocked' ? 'error' : 'warning'} sx={{ bgcolor: t => `${t.palette[u[3] === 'Active' ? 'success' : u[3] === 'Blocked' ? 'error' : 'warning'].main}20` }} /></TableCell><TableCell align="right"><IconButton><MoreVertRounded /></IconButton></TableCell></TableRow>)}</TableBody></Table></TableContainer></Card>
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', lg: '1fr 1fr' }, gap: 3, mt: 3 }}><Card><CardContent><Typography variant="h6" sx={{ mb: 3 }}>Create user</Typography><Stack spacing={2.5}><TextField label="Full name" /><TextField label="Email address" type="email" /><TextField select label="Role" defaultValue="editor"><MenuItem value="admin">Admin</MenuItem><MenuItem value="editor">Editor</MenuItem><MenuItem value="viewer">Viewer</MenuItem></TextField><FormControlLabel control={<Checkbox defaultChecked />} label="Send welcome email" /><Button variant="contained" size="large">Create user</Button></Stack></CardContent></Card><LoginCard /></Box>
  </Box></Shell>
}

function LoginCard() {
  return <Card><CardContent sx={{ maxWidth: 440, mx: 'auto', width: '100%', py: 5 }}><Typography variant="h4" textAlign="center">Sign in to Acme</Typography><Typography color="text.secondary" textAlign="center" sx={{ mt: 1, mb: 4 }}>Enter your details to continue to the workspace.</Typography><Stack spacing={2.5}><TextField label="Email address" defaultValue="demo@acme.co" /><TextField label="Password" type="password" defaultValue="password123" /><Stack direction="row" justifyContent="space-between" alignItems="center"><FormControlLabel control={<Checkbox defaultChecked />} label="Remember me" /><Button variant="text">Forgot password?</Button></Stack><Button variant="contained" size="large">Sign in</Button></Stack></CardContent></Card>
}

function ChatDemo() {
  const [draft, setDraft] = useState('')
  return <Shell active="Chat"><Box sx={{ p: { xs: 1.5, md: 3 }, height: 760 }}><Card sx={{ height: '100%', overflow: 'hidden', display: 'grid', gridTemplateColumns: { xs: '1fr', md: '310px minmax(0,1fr)' } }}>
    <Box sx={{ display: { xs: 'none', md: 'block' }, borderRight: '1px solid', borderColor: 'divider' }}><Box sx={{ p: 2.5 }}><Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}><Typography variant="h6">Chats</Typography><IconButton size="small"><AddRounded /></IconButton></Stack><TextField size="small" fullWidth placeholder="Search conversations" InputProps={{ startAdornment: <InputAdornment position="start"><SearchRounded fontSize="small" /></InputAdornment> }} /></Box><Divider />{contacts.map((c, i) => <ListItemButton selected={i === 0} key={c[0]} sx={{ py: 1.5, px: 2.5, '&.Mui-selected': { bgcolor: t => t.palette.mode === 'dark' ? 'rgba(145,158,171,.10)' : '#F4F6F8' } }}><Avatar sx={{ mr: 1.5, width: 42, height: 42 }}>{c[0][0]}</Avatar><ListItemText primary={c[0]} secondary={c[1]} primaryTypographyProps={{ fontSize: 14, fontWeight: 600 }} secondaryTypographyProps={{ fontSize: 12, noWrap: true }} /><Typography variant="caption" color="text.secondary">{c[2]}</Typography></ListItemButton>)}</Box>
    <Box sx={{ minWidth: 0, display: 'flex', flexDirection: 'column' }}><Stack direction="row" alignItems="center" sx={{ px: 3, py: 2, borderBottom: '1px solid', borderColor: 'divider' }}><Avatar sx={{ mr: 1.5 }}>O</Avatar><Box><Typography variant="subtitle2">Olivia Martin</Typography><Typography variant="caption" color="success.main">Online</Typography></Box><IconButton sx={{ ml: 'auto' }}><MoreVertRounded /></IconButton></Stack>
      <Stack spacing={2} sx={{ p: { xs: 2, md: 4 }, flex: 1, overflow: 'auto', bgcolor: t => t.palette.mode === 'dark' ? '#141A21' : '#FCFDFD' }}><Box sx={{ alignSelf: 'flex-start', maxWidth: '72%' }}><Paper sx={{ p: 1.5, borderRadius: '12px 12px 12px 4px', bgcolor: 'background.paper' }}>Hey! Can you check the new user flow before our review?</Paper><Typography variant="caption" color="text.secondary">10:24 AM</Typography></Box><Box sx={{ alignSelf: 'flex-end', maxWidth: '72%' }}><Paper sx={{ p: 1.5, borderRadius: '12px 12px 4px 12px', bgcolor: 'primary.main', color: 'primary.contrastText' }}>Yep — I’m looking through the table and invite form now.</Paper><Typography variant="caption" color="text.secondary" sx={{ display: 'block', textAlign: 'right' }}>10:26 AM</Typography></Box><Box sx={{ alignSelf: 'flex-start', maxWidth: '72%' }}><Paper sx={{ p: 1.5, borderRadius: '12px 12px 12px 4px', bgcolor: 'background.paper' }}>Great. The permissions selector is the main thing I want another set of eyes on.</Paper></Box></Stack>
      <Box sx={{ p: 2, borderTop: '1px solid', borderColor: 'divider' }}><TextField fullWidth placeholder="Type a message…" value={draft} onChange={e => setDraft(e.target.value)} InputProps={{ endAdornment: <InputAdornment position="end"><IconButton color="primary"><SendRounded /></IconButton></InputAdornment> }} /></Box>
    </Box>
  </Card></Box></Shell>
}

export default function MinimalDemo() {
  const [page, setPage] = useState<'admin' | 'chat'>('admin')
  const [dark, setDark] = useState(false)
  const tokens = useMemo(() => tokensForPreset('Minimal', dark ? 'dark' : 'light'), [dark])
  const theme = useMemo(() => createMinimalTheme(tokens), [tokens])
  return <ThemeProvider theme={theme}><CssBaseline /><Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}><Stack direction="row" justifyContent="center" gap={1} sx={{ p: 1.5 }}><Button variant={page === 'admin' ? 'contained' : 'text'} onClick={() => setPage('admin')}>Admin + forms</Button><Button variant={page === 'chat' ? 'contained' : 'text'} onClick={() => setPage('chat')}>Chat</Button><Button color="inherit" onClick={() => setDark(v => !v)}>{dark ? 'Light' : 'Dark'}</Button></Stack>{page === 'admin' ? <AdminDemo /> : <ChatDemo />}</Box></ThemeProvider>
}
