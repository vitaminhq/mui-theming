import React, { useMemo, useState } from 'react'
import {
  Avatar, Badge, Box, BottomNavigation, BottomNavigationAction, Button, CssBaseline,
  Divider, IconButton, List, ListItem, ListItemAvatar, ListItemButton, ListItemText,
  Paper, Stack, Switch, TextField, ThemeProvider, Typography, createTheme,
} from '@mui/material'
import ChatBubbleRoundedIcon from '@mui/icons-material/ChatBubbleRounded'
import PeopleAltRoundedIcon from '@mui/icons-material/PeopleAltRounded'
import PersonRoundedIcon from '@mui/icons-material/PersonRounded'
import SearchRoundedIcon from '@mui/icons-material/SearchRounded'
import AddRoundedIcon from '@mui/icons-material/AddRounded'
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded'
import MoreVertRoundedIcon from '@mui/icons-material/MoreVertRounded'
import SendRoundedIcon from '@mui/icons-material/SendRounded'
import MicRoundedIcon from '@mui/icons-material/MicRounded'
import PhotoCameraRoundedIcon from '@mui/icons-material/PhotoCameraRounded'
import NotificationsRoundedIcon from '@mui/icons-material/NotificationsRounded'
import PaletteRoundedIcon from '@mui/icons-material/PaletteRounded'
import LockRoundedIcon from '@mui/icons-material/LockRounded'
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded'

const glass = {
  background: 'linear-gradient(180deg, rgba(255,255,255,.72), rgba(255,255,255,.48))',
  backdropFilter: 'blur(24px) saturate(145%)',
  WebkitBackdropFilter: 'blur(24px) saturate(145%)',
  border: '1px solid rgba(255,255,255,.72)',
  boxShadow: '0 12px 36px rgba(49,46,94,.12), inset 0 1px 0 rgba(255,255,255,.7)',
}

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: '#6558d8' },
    secondary: { main: '#62c7d9' },
    background: { default: '#ecebff', paper: 'rgba(255,255,255,.62)' },
    text: { primary: '#211f36', secondary: '#6f6b84' },
  },
  shape: { borderRadius: 24 },
  typography: {
    fontFamily: 'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    h4: { fontWeight: 760, letterSpacing: '-.04em' },
    h6: { fontWeight: 700, letterSpacing: '-.025em' },
    button: { textTransform: 'none', fontWeight: 650 },
  },
  components: {
    MuiCssBaseline: { styleOverrides: { '*': { boxSizing: 'border-box' } } },
    MuiButtonBase: { defaultProps: { disableRipple: true } },
    MuiPaper: { styleOverrides: { root: { backgroundImage: 'none' } } },
    MuiButton: {
      defaultProps: { disableElevation: true },
      styleOverrides: { root: { borderRadius: 999, minHeight: 44, paddingInline: 18 } },
    },
    MuiIconButton: { styleOverrides: { root: { borderRadius: 999 } } },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 999,
          background: 'rgba(255,255,255,.55)',
          backdropFilter: 'blur(18px)',
          '& .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(82,75,140,.10)' },
          '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(82,75,140,.18)' },
        },
      },
    },
  },
})

function GlassSurface({ children, sx = {} }: { children: React.ReactNode; sx?: any }) {
  return <Paper elevation={0} sx={{ ...glass, ...sx }}>{children}</Paper>
}

const chats = [
  { name: 'Nora', message: 'That glass nav actually looks really nice ✨', time: '9:41', unread: 2, color: '#d9c7ff' },
  { name: 'Product room', message: 'Maya: shipped the new onboarding flow', time: '8:18', unread: 4, color: '#b9e8ee' },
  { name: 'Sam', message: 'Coffee tomorrow?', time: 'Tue', unread: 0, color: '#ffd7c2' },
  { name: 'Design crew', message: '3 new photos', time: 'Mon', unread: 0, color: '#d9efbf' },
  { name: 'Alex', message: 'Perfect, thank you!', time: 'Sun', unread: 0, color: '#f2c9dc' },
]

function PhoneShell({ children }: { children: React.ReactNode }) {
  return <Box sx={{
    width: '100%', minHeight: 'calc(100dvh - 64px)', position: 'relative', overflow: 'hidden',
    background: 'radial-gradient(circle at 20% 4%, rgba(157,132,255,.42), transparent 31%), radial-gradient(circle at 85% 24%, rgba(94,211,221,.34), transparent 34%), linear-gradient(160deg,#f5f1ff 0%,#e9f5f7 48%,#f8eff7 100%)',
  }}>{children}</Box>
}

function ChatsPage({ openChat }: { openChat: () => void }) {
  return <Box sx={{ px: 2, pt: 2, pb: 12, maxWidth: 560, mx: 'auto' }}>
    <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ px: .5, mb: 2 }}>
      <Box><Typography variant="h4">Chats</Typography><Typography color="text.secondary" fontSize={13}>5 conversations</Typography></Box>
      <Stack direction="row" spacing={1}><GlassSurface sx={{ borderRadius: 999 }}><IconButton><SearchRoundedIcon /></IconButton></GlassSurface><GlassSurface sx={{ borderRadius: 999 }}><IconButton color="primary"><AddRoundedIcon /></IconButton></GlassSurface></Stack>
    </Stack>

    <GlassSurface sx={{ p: 1, borderRadius: 8 }}>
      <List disablePadding>
        {chats.map((chat, i) => <React.Fragment key={chat.name}>
          <ListItem disablePadding>
            <ListItemButton onClick={i === 0 ? openChat : undefined} sx={{ borderRadius: 6, py: 1.25, px: 1.2 }}>
              <ListItemAvatar><Badge color="primary" badgeContent={chat.unread || undefined} overlap="circular"><Avatar sx={{ bgcolor: chat.color, color: '#39334d', fontWeight: 700 }}>{chat.name[0]}</Avatar></Badge></ListItemAvatar>
              <ListItemText primary={<Typography fontWeight={700} fontSize={15}>{chat.name}</Typography>} secondary={<Typography noWrap color="text.secondary" fontSize={13}>{chat.message}</Typography>} />
              <Typography color="text.secondary" fontSize={11} alignSelf="flex-start" sx={{ mt: .8 }}>{chat.time}</Typography>
            </ListItemButton>
          </ListItem>
          {i < chats.length - 1 && <Divider sx={{ ml: 8, opacity: .35 }} />}
        </React.Fragment>)}
      </List>
    </GlassSurface>

    <GlassSurface sx={{ mt: 2, p: 2, borderRadius: 7 }}>
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Box><Typography fontWeight={750}>Start a group</Typography><Typography color="text.secondary" fontSize={12}>Bring people together in one place.</Typography></Box>
        <Button variant="contained">Create</Button>
      </Stack>
    </GlassSurface>
  </Box>
}

function Message({ mine, children, time }: { mine?: boolean; children: React.ReactNode; time: string }) {
  return <Stack alignItems={mine ? 'flex-end' : 'flex-start'} sx={{ mb: 1.1 }}>
    <Box sx={{ maxWidth: '78%', px: 1.7, py: 1.15, borderRadius: mine ? '24px 24px 7px 24px' : '24px 24px 24px 7px', bgcolor: mine ? 'primary.main' : 'rgba(255,255,255,.68)', color: mine ? '#fff' : 'text.primary', boxShadow: mine ? '0 8px 20px rgba(101,88,216,.18)' : 'inset 0 1px 0 rgba(255,255,255,.8)', backdropFilter: 'blur(16px)' }}>
      <Typography fontSize={14} lineHeight={1.45}>{children}</Typography>
    </Box>
    <Typography fontSize={10} color="text.secondary" sx={{ mt: .35, px: .6 }}>{time}</Typography>
  </Stack>
}

function ConversationPage({ back }: { back: () => void }) {
  return <Box sx={{ minHeight: 'calc(100dvh - 64px)', display: 'flex', flexDirection: 'column', maxWidth: 560, mx: 'auto' }}>
    <Box sx={{ position: 'sticky', top: 0, zIndex: 4, p: 1.5 }}>
      <GlassSurface sx={{ borderRadius: 999, px: .7, py: .55 }}>
        <Stack direction="row" alignItems="center">
          <IconButton onClick={back}><ArrowBackRoundedIcon /></IconButton><Avatar sx={{ ml: .5, bgcolor: '#d9c7ff', color: '#39334d' }}>N</Avatar>
          <Box sx={{ ml: 1.2, flex: 1 }}><Typography fontWeight={750} fontSize={14}>Nora</Typography><Typography color="text.secondary" fontSize={11}>online</Typography></Box>
          <IconButton><MoreVertRoundedIcon /></IconButton>
        </Stack>
      </GlassSurface>
    </Box>

    <Box sx={{ flex: 1, px: 2, py: 1 }}>
      <Typography align="center" color="text.secondary" fontSize={11} sx={{ mb: 2 }}>Today</Typography>
      <Message time="9:22">I tried that new Android expressive redesign you mentioned.</Message>
      <Message mine time="9:24">The more rounded one with those floating surfaces?</Message>
      <Message time="9:25">Yep. I like the depth, but I think glass could make it feel even lighter.</Message>
      <Message mine time="9:26">Exactly. Especially for chat — the navigation can float instead of feeling like a hard bar.</Message>
      <Message time="9:28">That glass nav actually looks really nice ✨</Message>
    </Box>

    <Box sx={{ position: 'sticky', bottom: 0, zIndex: 5, p: 1.5 }}>
      <GlassSurface sx={{ borderRadius: 999, p: .65 }}>
        <Stack direction="row" alignItems="center" spacing={.4}>
          <IconButton size="small"><PhotoCameraRoundedIcon /></IconButton>
          <TextField variant="outlined" fullWidth placeholder="Message" size="small" sx={{ '& .MuiOutlinedInput-root': { bgcolor: 'transparent' } }} />
          <IconButton size="small"><MicRoundedIcon /></IconButton>
          <IconButton color="primary"><SendRoundedIcon /></IconButton>
        </Stack>
      </GlassSurface>
    </Box>
  </Box>
}

function SettingsPage() {
  const [notifications, setNotifications] = useState(true)
  return <Box sx={{ px: 2, pt: 2, pb: 12, maxWidth: 560, mx: 'auto' }}>
    <Typography variant="h4" sx={{ px: .5, mb: 2 }}>You</Typography>
    <GlassSurface sx={{ p: 2, borderRadius: 8 }}>
      <Stack alignItems="center" spacing={1}>
        <Avatar sx={{ width: 78, height: 78, bgcolor: '#cfc3ff', color: '#302b48', fontSize: 28, fontWeight: 750 }}>RQ</Avatar>
        <Typography variant="h6">Rasoul</Typography><Typography color="text.secondary" fontSize={12}>@rasoul</Typography>
        <Button variant="contained" sx={{ mt: 1 }}>Edit profile</Button>
      </Stack>
    </GlassSurface>

    <GlassSurface sx={{ mt: 2, p: 1, borderRadius: 8 }}>
      {[
        [NotificationsRoundedIcon, 'Notifications', 'Messages, mentions and calls'],
        [PaletteRoundedIcon, 'Appearance', 'Glass · Violet'],
        [LockRoundedIcon, 'Privacy', 'Last seen, blocked people'],
      ].map(([Icon, title, subtitle]: any, i) => <React.Fragment key={title}>
        <ListItem sx={{ px: 1.2, py: 1.2 }} secondaryAction={i === 0 ? <Switch checked={notifications} onChange={e => setNotifications(e.target.checked)} /> : <ChevronRightRoundedIcon color="action" />}>
          <ListItemAvatar><Box sx={{ width: 42, height: 42, borderRadius: 4, bgcolor: 'rgba(101,88,216,.10)', display: 'grid', placeItems: 'center' }}><Icon color="primary" /></Box></ListItemAvatar>
          <ListItemText primary={<Typography fontWeight={700} fontSize={14}>{title}</Typography>} secondary={<Typography color="text.secondary" fontSize={11}>{subtitle}</Typography>} />
        </ListItem>
        {i < 2 && <Divider sx={{ ml: 7.5, opacity: .35 }} />}
      </React.Fragment>)}
    </GlassSurface>
  </Box>
}

export default function GlassChatDemo() {
  const [nav, setNav] = useState(0)
  const [chatOpen, setChatOpen] = useState(false)
  const content = useMemo(() => {
    if (chatOpen) return <ConversationPage back={() => setChatOpen(false)} />
    if (nav === 2) return <SettingsPage />
    if (nav === 1) return <Box sx={{ px: 2, pt: 2, pb: 12, maxWidth: 560, mx: 'auto' }}><Typography variant="h4" sx={{ mb: 2 }}>People</Typography><GlassSurface sx={{ p: 3, borderRadius: 8 }}><Stack alignItems="center" spacing={1}><PeopleAltRoundedIcon color="primary" sx={{ fontSize: 42 }} /><Typography variant="h6">Find your people</Typography><Typography color="text.secondary" align="center" fontSize={13}>Contacts and suggested people would live here.</Typography><Button variant="contained">Invite someone</Button></Stack></GlassSurface></Box>
    return <ChatsPage openChat={() => setChatOpen(true)} />
  }, [nav, chatOpen])

  return <ThemeProvider theme={theme}><CssBaseline /><PhoneShell>{content}{!chatOpen && <Box sx={{ position: 'fixed', left: 0, right: 0, bottom: 0, zIndex: 10, p: 1.5, pointerEvents: 'none' }}><GlassSurface sx={{ maxWidth: 520, mx: 'auto', borderRadius: 999, overflow: 'hidden', pointerEvents: 'auto' }}><BottomNavigation value={nav} onChange={(_, v) => setNav(v)} showLabels sx={{ bgcolor: 'transparent', height: 68, '& .MuiBottomNavigationAction-root': { minWidth: 0, mx: .3, my: .7, borderRadius: 999 }, '& .Mui-selected': { bgcolor: 'rgba(101,88,216,.12)' } }}><BottomNavigationAction label="Chats" icon={<ChatBubbleRoundedIcon />} /><BottomNavigationAction label="People" icon={<PeopleAltRoundedIcon />} /><BottomNavigationAction label="You" icon={<PersonRoundedIcon />} /></BottomNavigation></GlassSurface></Box>}</PhoneShell></ThemeProvider>
}
