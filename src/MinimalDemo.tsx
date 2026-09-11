import React, { useMemo, useState } from 'react'
import {
  AppBar, Avatar, Badge, Box, Breadcrumbs, Button, Card, CardContent, Checkbox, Chip,
  CssBaseline, Divider, Drawer, FormControlLabel, IconButton, InputAdornment, Link, List,
  ListItemButton, ListItemIcon, ListItemText, MenuItem, Paper, Select, Stack, Switch, Table,
  TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, ThemeProvider, Toolbar,
  Tooltip, Typography,
} from '@mui/material'
import AddRounded from '@mui/icons-material/AddRounded'
import ArrowBackRounded from '@mui/icons-material/ArrowBackRounded'
import ChatBubbleOutlineRounded from '@mui/icons-material/ChatBubbleOutlineRounded'
import ChevronLeftRounded from '@mui/icons-material/ChevronLeftRounded'
import DashboardRounded from '@mui/icons-material/DashboardRounded'
import GroupRounded from '@mui/icons-material/GroupRounded'
import LogoutRounded from '@mui/icons-material/LogoutRounded'
import MenuRounded from '@mui/icons-material/MenuRounded'
import MoreVertRounded from '@mui/icons-material/MoreVertRounded'
import NotificationsNoneRounded from '@mui/icons-material/NotificationsNoneRounded'
import SearchRounded from '@mui/icons-material/SearchRounded'
import SendRounded from '@mui/icons-material/SendRounded'
import SettingsRounded from '@mui/icons-material/SettingsRounded'
import TrendingUpRounded from '@mui/icons-material/TrendingUpRounded'
import PersonAddAltRounded from '@mui/icons-material/PersonAddAltRounded'
import { tokensForPreset } from './theme'
import { createMinimalTheme } from './minimalTheme'

type Page = 'dashboard' | 'users' | 'new-user' | 'chat' | 'settings' | 'login'

const users = [
  ['Olivia Martin', 'olivia@acme.co', 'Admin', 'Active'],
  ['Jackson Lee', 'jackson@acme.co', 'Editor', 'Active'],
  ['Sophia Brown', 'sophia@acme.co', 'Support', 'Pending'],
  ['Liam Wilson', 'liam@acme.co', 'Viewer', 'Active'],
  ['Ava Anderson', 'ava@acme.co', 'Editor', 'Blocked'],
  ['Noah Thomas', 'noah@acme.co', 'Support', 'Active'],
]

const contacts = [
  ['Olivia Martin', 'Can you check the new user flow?', '2m'],
  ['Jackson Lee', 'Everything is merged now.', '18m'],
  ['Sophia Brown', 'Sent an attachment', '1h'],
  ['Product Team', 'Ava: I updated the brief.', '3h'],
]

const nav = [
  { section: 'Overview', items: [
    { label: 'Dashboard', page: 'dashboard' as Page, icon: <DashboardRounded fontSize="small" /> },
  ] },
  { section: 'Management', items: [
    { label: 'Users', page: 'users' as Page, icon: <GroupRounded fontSize="small" /> },
    { label: 'New user', page: 'new-user' as Page, icon: <PersonAddAltRounded fontSize="small" /> },
    { label: 'Chat', page: 'chat' as Page, icon: <ChatBubbleOutlineRounded fontSize="small" />, badge: 3 },
  ] },
  { section: 'System', items: [
    { label: 'Settings', page: 'settings' as Page, icon: <SettingsRounded fontSize="small" /> },
  ] },
]

function Brand({ collapsed = false }: { collapsed?: boolean }) {
  return <Stack direction="row" alignItems="center" spacing={1.3} sx={{ px: collapsed ? 1 : 1.5, minHeight: 72 }}>
    <Box sx={{ width: 32, height: 32, flex: '0 0 auto', borderRadius: '52% 52% 52% 14%', bgcolor: 'primary.main', boxShadow: t => `0 8px 20px ${t.palette.primary.main}38` }} />
    {!collapsed && <Typography sx={{ fontSize: 20, fontWeight: 800, letterSpacing: '-.04em' }}>Acme</Typography>}
  </Stack>
}

function SidebarContent({ page, onNavigate, collapsed, onCollapse }: { page: Page; onNavigate: (p: Page) => void; collapsed?: boolean; onCollapse?: () => void }) {
  return <Stack sx={{ height: '100%' }}>
    <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ px: 1 }}>
      <Brand collapsed={collapsed} />
      {onCollapse && !collapsed && <IconButton size="small" onClick={onCollapse}><ChevronLeftRounded /></IconButton>}
    </Stack>
    <Box sx={{ px: 1.5, overflowY: 'auto', flex: 1 }}>
      {nav.map(group => <Box key={group.section} sx={{ mb: 2.5 }}>
        {!collapsed && <Typography variant="overline" color="text.disabled" sx={{ px: 1.5, fontSize: 11 }}>{group.section}</Typography>}
        <List disablePadding sx={{ mt: collapsed ? .5 : 1 }}>
          {group.items.map(item => <Tooltip key={item.page} title={collapsed ? item.label : ''} placement="right">
            <ListItemButton selected={page === item.page} onClick={() => onNavigate(item.page)} sx={{ minHeight: 44, mb: .5, px: collapsed ? 1.25 : 1.5, justifyContent: collapsed ? 'center' : 'flex-start', borderRadius: 1.5, '&.Mui-selected': { bgcolor: t => t.palette.mode === 'dark' ? 'rgba(0,167,111,.16)' : 'rgba(0,167,111,.08)', color: 'primary.main' }, '&.Mui-selected:hover': { bgcolor: t => t.palette.mode === 'dark' ? 'rgba(0,167,111,.22)' : 'rgba(0,167,111,.12)' } }}>
              <ListItemIcon sx={{ minWidth: collapsed ? 0 : 36, color: 'inherit' }}>{item.badge ? <Badge badgeContent={item.badge} color="error">{item.icon}</Badge> : item.icon}</ListItemIcon>
              {!collapsed && <ListItemText primary={item.label} primaryTypographyProps={{ fontSize: 14, fontWeight: page === item.page ? 700 : 600 }} />}
            </ListItemButton>
          </Tooltip>)}
        </List>
      </Box>)}
    </Box>
    <Divider />
    <Box sx={{ p: 1.5 }}>
      {!collapsed && <Stack direction="row" spacing={1.2} alignItems="center" sx={{ p: 1, mb: 1 }}><Avatar sx={{ width: 36, height: 36 }}>AM</Avatar><Box minWidth={0}><Typography variant="subtitle2" noWrap>Alex Morgan</Typography><Typography variant="caption" color="text.secondary" noWrap>admin@acme.co</Typography></Box></Stack>}
      <Tooltip title={collapsed ? 'Sign out' : ''} placement="right"><ListItemButton onClick={() => onNavigate('login')} sx={{ borderRadius: 1.5, justifyContent: collapsed ? 'center' : 'flex-start', color: 'text.secondary' }}><ListItemIcon sx={{ minWidth: collapsed ? 0 : 36, color: 'inherit' }}><LogoutRounded fontSize="small" /></ListItemIcon>{!collapsed && <ListItemText primary="Sign out" primaryTypographyProps={{ fontSize: 14 }} />}</ListItemButton></Tooltip>
    </Box>
  </Stack>
}

function PageHeader({ title, description, action }: { title: string; description: string; action?: React.ReactNode }) {
  return <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" alignItems={{ sm: 'flex-end' }} gap={2} sx={{ mb: 4 }}>
    <Box><Typography variant="h4">{title}</Typography><Typography color="text.secondary" sx={{ mt: .7 }}>{description}</Typography></Box>
    {action}
  </Stack>
}

function Metric({ label, value, change, index }: { label: string; value: string; change: string; index: number }) {
  return <Card><CardContent sx={{ p: 3 }}><Stack direction="row" justifyContent="space-between" alignItems="flex-start"><Box><Typography variant="body2" color="text.secondary">{label}</Typography><Typography variant="h4" sx={{ mt: 1 }}>{value}</Typography><Stack direction="row" alignItems="center" spacing={.5} sx={{ mt: 1.2 }}><TrendingUpRounded color="success" sx={{ fontSize: 18 }} /><Typography variant="body2" color="success.main" fontWeight={700}>{change}</Typography><Typography variant="body2" color="text.secondary">this month</Typography></Stack></Box><Box sx={{ width: 48, height: 48, borderRadius: '50%', display: 'grid', placeItems: 'center', bgcolor: index % 2 ? 'secondary.lighter' : 'primary.lighter', color: index % 2 ? 'secondary.dark' : 'primary.dark', fontWeight: 800 }}>{['U','S','M','C'][index]}</Box></Stack></CardContent></Card>
}

function DashboardPage({ go }: { go: (p: Page) => void }) {
  const bars = [42, 55, 47, 72, 66, 86, 74, 96, 82, 105, 98, 118]
  return <><PageHeader title="Welcome back, Alex 👋" description="Here’s what’s happening with your workspace today." action={<Button variant="contained" startIcon={<AddRounded />} onClick={() => go('new-user')}>Invite user</Button>} />
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2,1fr)', xl: 'repeat(4,1fr)' }, gap: 3 }}>{[
      ['Total users','18,765','+12.4%'], ['Active sessions','4,876','+8.1%'], ['Messages','28,412','+18.7%'], ['Conversion','24.8%','+3.2%'],
    ].map((m,i) => <Metric key={m[0]} label={m[0]} value={m[1]} change={m[2]} index={i} />)}</Box>
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', lg: 'minmax(0,1.65fr) minmax(300px,.75fr)' }, gap: 3, mt: 3 }}>
      <Card><CardContent sx={{ p: { xs: 2.5, md: 3 } }}><Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" gap={1}><Box><Typography variant="h6">User activity</Typography><Typography variant="body2" color="text.secondary">Monthly active users</Typography></Box><Select size="small" defaultValue="year" sx={{ minWidth: 130 }}><MenuItem value="year">This year</MenuItem><MenuItem value="month">This month</MenuItem></Select></Stack><Box sx={{ height: 260, display: 'flex', alignItems: 'flex-end', gap: { xs: .8, sm: 1.5 }, pt: 4, borderBottom: '1px solid', borderColor: 'divider' }}>{bars.map((h,i) => <Tooltip title={`${(h * 23).toLocaleString()} users`} key={i}><Box sx={{ flex: 1, minWidth: 7, height: `${h * 1.65}px`, maxHeight: 220, borderRadius: '6px 6px 0 0', bgcolor: i === 11 ? 'primary.main' : 'primary.lighter' }} /></Tooltip>)}</Box><Stack direction="row" justifyContent="space-between" sx={{ pt: 1 }}><Typography variant="caption" color="text.secondary">Jan</Typography><Typography variant="caption" color="text.secondary">Dec</Typography></Stack></CardContent></Card>
      <Card><CardContent sx={{ p: 3 }}><Typography variant="h6">Recent activity</Typography><Typography variant="body2" color="text.secondary" sx={{ mb: 2.5 }}>Latest workspace events</Typography><Stack spacing={2.5}>{[['O','Olivia joined the team','2 min ago'],['J','Jackson updated permissions','24 min ago'],['S','Sophia created a conversation','1 hour ago'],['A','Ava changed workspace settings','3 hours ago']].map(a => <Stack direction="row" spacing={1.5} key={a[1]}><Avatar sx={{ width: 36, height: 36 }}>{a[0]}</Avatar><Box><Typography variant="body2" fontWeight={600}>{a[1]}</Typography><Typography variant="caption" color="text.secondary">{a[2]}</Typography></Box></Stack>)}</Stack><Button sx={{ mt: 2.5 }} onClick={() => go('users')}>View all users</Button></CardContent></Card>
    </Box>
  </>
}

function UsersPage({ go }: { go: (p: Page) => void }) {
  return <><PageHeader title="Users" description="Manage team members and their account permissions." action={<Button startIcon={<AddRounded />} variant="contained" onClick={() => go('new-user')}>New user</Button>} />
    <Card><Box sx={{ p: 2.5 }}><Stack direction={{ xs: 'column', md: 'row' }} gap={2}><TextField size="small" fullWidth placeholder="Search by name or email…" InputProps={{ startAdornment: <InputAdornment position="start"><SearchRounded fontSize="small" /></InputAdornment> }} /><Select size="small" defaultValue="all" sx={{ minWidth: { md: 150 } }}><MenuItem value="all">All roles</MenuItem><MenuItem value="admin">Admin</MenuItem><MenuItem value="editor">Editor</MenuItem></Select><Select size="small" defaultValue="any" sx={{ minWidth: { md: 150 } }}><MenuItem value="any">Any status</MenuItem><MenuItem value="active">Active</MenuItem><MenuItem value="pending">Pending</MenuItem></Select></Stack></Box><Divider />
      <TableContainer><Table sx={{ minWidth: 720 }}><TableHead><TableRow><TableCell padding="checkbox"><Checkbox /></TableCell><TableCell>User</TableCell><TableCell>Role</TableCell><TableCell>Status</TableCell><TableCell>Last active</TableCell><TableCell align="right" /></TableRow></TableHead><TableBody>{users.map((u,i) => <TableRow key={u[1]} hover><TableCell padding="checkbox"><Checkbox /></TableCell><TableCell><Stack direction="row" alignItems="center" spacing={2}><Avatar sx={{ width: 40, height: 40 }}>{u[0][0]}</Avatar><Box><Typography variant="subtitle2">{u[0]}</Typography><Typography variant="body2" color="text.secondary">{u[1]}</Typography></Box></Stack></TableCell><TableCell>{u[2]}</TableCell><TableCell><Chip size="small" label={u[3]} color={u[3] === 'Active' ? 'success' : u[3] === 'Blocked' ? 'error' : 'warning'} variant="soft" as any /></TableCell><TableCell><Typography variant="body2" color="text.secondary">{i < 2 ? 'Just now' : `${i + 1} hours ago`}</Typography></TableCell><TableCell align="right"><IconButton size="small"><MoreVertRounded /></IconButton></TableCell></TableRow>)}</TableBody></Table></TableContainer><Divider /><Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" alignItems={{ sm: 'center' }} gap={1} sx={{ p: 2 }}><Typography variant="body2" color="text.secondary">Showing 1–6 of 18,765 users</Typography><Stack direction="row" spacing={1}><Button size="small" variant="outlined" disabled>Previous</Button><Button size="small" variant="outlined">Next</Button></Stack></Stack></Card>
  </>
}

function NewUserPage({ go }: { go: (p: Page) => void }) {
  return <><PageHeader title="Create a new user" description="Add a team member and configure their initial access." action={<Button startIcon={<ArrowBackRounded />} onClick={() => go('users')}>Back to users</Button>} />
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', lg: 'minmax(0,1fr) 340px' }, gap: 3 }}><Card><CardContent sx={{ p: { xs: 2.5, md: 4 } }}><Typography variant="h6" sx={{ mb: 3 }}>Account details</Typography><Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2.5 }}><TextField label="First name" defaultValue="Taylor" /><TextField label="Last name" defaultValue="Reed" /><TextField label="Email address" type="email" sx={{ gridColumn: { sm: '1 / -1' } }} /><TextField select label="Role" defaultValue="editor"><MenuItem value="admin">Admin</MenuItem><MenuItem value="editor">Editor</MenuItem><MenuItem value="viewer">Viewer</MenuItem></TextField><TextField select label="Team" defaultValue="product"><MenuItem value="product">Product</MenuItem><MenuItem value="support">Support</MenuItem><MenuItem value="ops">Operations</MenuItem></TextField></Box><Divider sx={{ my: 4 }} /><Typography variant="h6" sx={{ mb: 2 }}>Access</Typography><Stack spacing={1}><FormControlLabel control={<Switch defaultChecked />} label="Can manage conversations" /><FormControlLabel control={<Switch />} label="Can manage billing" /><FormControlLabel control={<Switch defaultChecked />} label="Can invite other users" /><FormControlLabel control={<Checkbox defaultChecked />} label="Send welcome email after creation" /></Stack><Stack direction="row" justifyContent="flex-end" spacing={1.5} sx={{ mt: 4 }}><Button onClick={() => go('users')}>Cancel</Button><Button variant="contained" onClick={() => go('users')}>Create user</Button></Stack></CardContent></Card>
      <Card sx={{ alignSelf: 'start' }}><CardContent sx={{ p: 3 }}><Typography variant="h6">Role summary</Typography><Typography variant="body2" color="text.secondary" sx={{ mt: 1, mb: 3 }}>Editors can create and update content but cannot change workspace-level settings.</Typography><Stack spacing={1.5}>{['View all workspace data','Create and edit records','Manage conversations'].map(x => <Stack direction="row" spacing={1} key={x}><Chip size="small" color="success" label="✓" /><Typography variant="body2">{x}</Typography></Stack>)}<Stack direction="row" spacing={1}><Chip size="small" label="—" /><Typography variant="body2" color="text.secondary">Manage billing and security</Typography></Stack></Stack></CardContent></Card></Box>
  </>
}

function ChatPage() {
  const [draft, setDraft] = useState('')
  return <><PageHeader title="Chat" description="Keep up with your team and customer conversations." />
    <Card sx={{ height: { xs: 620, md: 700 }, overflow: 'hidden', display: 'grid', gridTemplateColumns: { xs: '1fr', md: '300px minmax(0,1fr)' } }}>
      <Box sx={{ display: { xs: 'none', md: 'block' }, borderRight: '1px solid', borderColor: 'divider' }}><Box sx={{ p: 2.5 }}><Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}><Typography variant="h6">Conversations</Typography><IconButton size="small"><AddRounded /></IconButton></Stack><TextField size="small" fullWidth placeholder="Search chats" InputProps={{ startAdornment: <InputAdornment position="start"><SearchRounded fontSize="small" /></InputAdornment> }} /></Box><Divider />{contacts.map((c,i) => <ListItemButton selected={i === 0} key={c[0]} sx={{ py: 1.5, px: 2.5 }}><Badge color="success" variant={i === 0 ? 'dot' : 'standard'} overlap="circular" anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}><Avatar sx={{ width: 42, height: 42 }}>{c[0][0]}</Avatar></Badge><ListItemText sx={{ ml: 1.5, minWidth: 0 }} primary={c[0]} secondary={c[1]} primaryTypographyProps={{ fontSize: 14, fontWeight: 600 }} secondaryTypographyProps={{ fontSize: 12, noWrap: true }} /><Typography variant="caption" color="text.secondary">{c[2]}</Typography></ListItemButton>)}</Box>
      <Box sx={{ minWidth: 0, display: 'flex', flexDirection: 'column' }}><Stack direction="row" alignItems="center" sx={{ px: { xs: 2, md: 3 }, py: 2, borderBottom: '1px solid', borderColor: 'divider' }}><Avatar sx={{ mr: 1.5 }}>O</Avatar><Box><Typography variant="subtitle2">Olivia Martin</Typography><Typography variant="caption" color="success.main">Online</Typography></Box><IconButton sx={{ ml: 'auto' }}><MoreVertRounded /></IconButton></Stack><Stack spacing={2.5} sx={{ p: { xs: 2, md: 4 }, flex: 1, overflow: 'auto', bgcolor: t => t.palette.mode === 'dark' ? '#141A21' : '#FCFDFD' }}><Typography variant="caption" color="text.secondary" textAlign="center">Today</Typography><Box sx={{ alignSelf: 'flex-start', maxWidth: { xs: '88%', md: '70%' } }}><Paper sx={{ p: 1.5, borderRadius: '12px 12px 12px 4px' }}>Hey! Can you check the new user flow before our review?</Paper><Typography variant="caption" color="text.secondary">10:24 AM</Typography></Box><Box sx={{ alignSelf: 'flex-end', maxWidth: { xs: '88%', md: '70%' } }}><Paper sx={{ p: 1.5, borderRadius: '12px 12px 4px 12px', bgcolor: 'primary.main', color: 'primary.contrastText' }}>Yep — I’m looking through the table and invite form now.</Paper><Typography variant="caption" color="text.secondary" sx={{ display: 'block', textAlign: 'right' }}>10:26 AM</Typography></Box><Box sx={{ alignSelf: 'flex-start', maxWidth: { xs: '88%', md: '70%' } }}><Paper sx={{ p: 1.5, borderRadius: '12px 12px 12px 4px' }}>Great. The permissions selector is the main thing I want another set of eyes on.</Paper></Box></Stack><Box sx={{ p: 2, borderTop: '1px solid', borderColor: 'divider' }}><TextField fullWidth placeholder="Type a message…" value={draft} onChange={e => setDraft(e.target.value)} InputProps={{ endAdornment: <InputAdornment position="end"><IconButton color="primary"><SendRounded /></IconButton></InputAdornment> }} /></Box></Box>
    </Card>
  </>
}

function SettingsPage() {
  return <><PageHeader title="Settings" description="Manage workspace preferences, notifications and security." /><Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', lg: '1fr 1fr' }, gap: 3 }}><Card><CardContent sx={{ p: 3 }}><Typography variant="h6">Workspace profile</Typography><Typography variant="body2" color="text.secondary" sx={{ mt: .5, mb: 3 }}>Basic information visible to your team.</Typography><Stack spacing={2.5}><TextField label="Workspace name" defaultValue="Acme Inc." /><TextField label="Workspace URL" defaultValue="acme.minimal.app" /><TextField label="Support email" defaultValue="support@acme.co" /><Button variant="contained" sx={{ alignSelf: 'flex-start' }}>Save changes</Button></Stack></CardContent></Card><Card><CardContent sx={{ p: 3 }}><Typography variant="h6">Notifications</Typography><Typography variant="body2" color="text.secondary" sx={{ mt: .5, mb: 2 }}>Choose which activity should reach you.</Typography><Stack><FormControlLabel control={<Switch defaultChecked />} label="New user registrations" /><FormControlLabel control={<Switch defaultChecked />} label="Direct messages" /><FormControlLabel control={<Switch />} label="Weekly product digest" /><FormControlLabel control={<Switch defaultChecked />} label="Security alerts" /></Stack><Divider sx={{ my: 3 }} /><Typography variant="h6">Security</Typography><Typography variant="body2" color="text.secondary" sx={{ my: 1.5 }}>Two-factor authentication is enabled for your account.</Typography><Button variant="outlined">Manage security</Button></CardContent></Card></Box></>
}

function LoginPage({ onLogin }: { onLogin: () => void }) {
  return <Box sx={{ minHeight: 'calc(100vh - 64px)', display: 'grid', gridTemplateColumns: { xs: '1fr', lg: '1fr 1fr' }, bgcolor: 'background.default' }}><Box sx={{ display: { xs: 'none', lg: 'flex' }, p: 6, flexDirection: 'column', justifyContent: 'space-between', bgcolor: t => t.palette.mode === 'dark' ? '#141A21' : '#F4F6F8' }}><Brand /><Box sx={{ maxWidth: 520 }}><Typography variant="h2" sx={{ fontSize: 54, fontWeight: 800, lineHeight: 1.05, letterSpacing: '-.05em' }}>Manage your team without the clutter.</Typography><Typography color="text.secondary" sx={{ mt: 2, fontSize: 18 }}>A responsive MUI application using the same Minimal-inspired theme from the component lab.</Typography></Box><Typography variant="caption" color="text.secondary">© 2026 Acme Inc.</Typography></Box><Box sx={{ display: 'grid', placeItems: 'center', p: 3 }}><Box sx={{ width: '100%', maxWidth: 440 }}><Box sx={{ display: { lg: 'none' }, mb: 4 }}><Brand /></Box><Typography variant="h4">Sign in to Acme</Typography><Typography color="text.secondary" sx={{ mt: 1, mb: 4 }}>Enter your details to continue to the workspace.</Typography><Stack spacing={2.5}><TextField label="Email address" defaultValue="demo@acme.co" /><TextField label="Password" type="password" defaultValue="password123" /><Stack direction="row" justifyContent="space-between" alignItems="center"><FormControlLabel control={<Checkbox defaultChecked />} label="Remember me" /><Button variant="text">Forgot password?</Button></Stack><Button variant="contained" size="large" onClick={onLogin}>Sign in</Button><Divider>OR</Divider><Button variant="outlined" size="large">Continue with Google</Button></Stack></Box></Box></Box>
}

function AppShell({ page, setPage, dark, setDark }: { page: Page; setPage: (p: Page) => void; dark: boolean; setDark: (v: boolean) => void }) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [collapsed, setCollapsed] = useState(false)
  const drawerWidth = collapsed ? 88 : 280
  const navigate = (p: Page) => { setPage(p); setMobileOpen(false) }
  const title = page === 'new-user' ? 'New user' : page.charAt(0).toUpperCase() + page.slice(1)

  return <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
    <Drawer variant="permanent" sx={{ display: { xs: 'none', md: 'block' }, width: drawerWidth, flexShrink: 0, '& .MuiDrawer-paper': { width: drawerWidth, boxSizing: 'border-box', border: 0, borderRight: '1px dashed', borderColor: 'divider', transition: 'width .2s ease', overflowX: 'hidden' } }} open><SidebarContent page={page} onNavigate={navigate} collapsed={collapsed} onCollapse={() => setCollapsed(v => !v)} /></Drawer>
    <Drawer variant="temporary" open={mobileOpen} onClose={() => setMobileOpen(false)} ModalProps={{ keepMounted: true }} sx={{ display: { xs: 'block', md: 'none' }, '& .MuiDrawer-paper': { width: 280, border: 0 } }}><SidebarContent page={page} onNavigate={navigate} /></Drawer>
    <AppBar position="fixed" color="inherit" elevation={0} sx={{ width: { md: `calc(100% - ${drawerWidth}px)` }, ml: { md: `${drawerWidth}px` }, borderBottom: '1px solid', borderColor: 'divider', bgcolor: t => t.palette.mode === 'dark' ? 'rgba(20,26,33,.88)' : 'rgba(255,255,255,.88)', backdropFilter: 'blur(14px)', transition: 'width .2s ease, margin .2s ease' }}><Toolbar sx={{ minHeight: '72px !important', gap: 1 }}><IconButton sx={{ display: { md: 'none' } }} onClick={() => setMobileOpen(true)}><MenuRounded /></IconButton>{collapsed && <IconButton sx={{ display: { xs: 'none', md: 'inline-flex' } }} onClick={() => setCollapsed(false)}><MenuRounded /></IconButton>}<Box sx={{ display: { xs: 'none', sm: 'block' }, flex: 1, maxWidth: 360 }}><TextField size="small" fullWidth placeholder="Search anything…" InputProps={{ startAdornment: <InputAdornment position="start"><SearchRounded fontSize="small" /></InputAdornment> }} /></Box><Box sx={{ flex: 1 }} /><Tooltip title={dark ? 'Use light mode' : 'Use dark mode'}><IconButton onClick={() => setDark(!dark)}>{dark ? '☀️' : '🌙'}</IconButton></Tooltip><IconButton><Badge color="error" variant="dot"><NotificationsNoneRounded /></Badge></IconButton><Avatar sx={{ width: 36, height: 36, ml: .5, cursor: 'pointer' }}>AM</Avatar></Toolbar></AppBar>
    <Box component="main" sx={{ ml: { md: `${drawerWidth}px` }, pt: '72px', minWidth: 0, transition: 'margin .2s ease' }}><Box sx={{ px: { xs: 2, sm: 3, lg: 4 }, py: 2, borderBottom: '1px solid', borderColor: 'divider' }}><Breadcrumbs sx={{ fontSize: 13 }}><Link component="button" color="text.secondary" underline="hover" onClick={() => navigate('dashboard')}>Home</Link>{page !== 'dashboard' && <Typography color="text.primary" fontSize={13}>{title}</Typography>}</Breadcrumbs></Box><Box sx={{ p: { xs: 2, sm: 3, lg: 4 }, maxWidth: 1500, mx: 'auto' }}>{page === 'dashboard' ? <DashboardPage go={navigate} /> : page === 'users' ? <UsersPage go={navigate} /> : page === 'new-user' ? <NewUserPage go={navigate} /> : page === 'chat' ? <ChatPage /> : <SettingsPage />}</Box></Box>
  </Box>
}

export default function MinimalDemo() {
  const [page, setPage] = useState<Page>('dashboard')
  const [dark, setDark] = useState(false)
  const tokens = useMemo(() => tokensForPreset('Minimal', dark ? 'dark' : 'light'), [dark])
  const theme = useMemo(() => createMinimalTheme(tokens), [tokens])
  return <ThemeProvider theme={theme}><CssBaseline />{page === 'login' ? <LoginPage onLogin={() => setPage('dashboard')} /> : <AppShell page={page} setPage={setPage} dark={dark} setDark={setDark} />}</ThemeProvider>
}
