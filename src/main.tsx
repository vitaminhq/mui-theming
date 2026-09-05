import React, { useState } from 'react'
import ReactDOM from 'react-dom/client'
import { Box, Button, ButtonGroup, CssBaseline, GlobalStyles, Stack, Typography } from '@mui/material'
import ThemeLab from './ThemeLab'
import ExactMaiaDemo from './ExactMaiaDemo'
import GlassChatDemo from './GlassChatDemo'

type DemoView = 'theme-lab' | 'shadcn-mui' | 'glass-chat'

function App() {
  const [view, setView] = useState<DemoView>('theme-lab')

  return <>
    <CssBaseline />
    <GlobalStyles styles={{
      html: { width: '100%', maxWidth: '100%', overflowX: 'hidden' },
      body: { width: '100%', maxWidth: '100%', overflowX: 'hidden', margin: 0 },
      '#root': { width: '100%', maxWidth: '100%', overflowX: 'hidden' },
    }} />
    <Box sx={{ width: '100%', maxWidth: '100vw', overflowX: 'hidden' }}>
      <Box sx={{ position: 'sticky', top: 0, zIndex: 2000, bgcolor: '#09090b', color: '#fafafa', borderBottom: '1px solid #27272a' }}>
        <Stack direction={{ xs: 'column', md: 'row' }} alignItems={{ md: 'center' }} justifyContent="space-between" gap={1} sx={{ px: { xs: 1.5, md: 2.5 }, py: 1 }}>
          <Box>
            <Typography sx={{ fontSize: 13, fontWeight: 700, lineHeight: 1.2 }}>MUI Design Playground</Typography>
            <Typography sx={{ fontSize: 11, color: '#a1a1aa', mt: .25 }}>Theme systems and product demos built on MUI</Typography>
          </Box>
          <Box sx={{ width: { xs: '100%', md: 'auto' }, overflowX: 'auto', pb: { xs: .25, md: 0 } }}>
            <ButtonGroup size="small" sx={{ minWidth: 'max-content', '& .MuiButton-root': { textTransform: 'none', borderColor: '#3f3f46', color: '#fafafa', minHeight: 32, px: 1.3 }, '& .MuiButton-contained': { bgcolor: '#fafafa', color: '#09090b', '&:hover': { bgcolor: '#e4e4e7' } } }}>
              <Button variant={view === 'theme-lab' ? 'contained' : 'outlined'} onClick={() => setView('theme-lab')}>Theme Lab</Button>
              <Button variant={view === 'shadcn-mui' ? 'contained' : 'outlined'} onClick={() => setView('shadcn-mui')}>Exact Maia / MUI</Button>
              <Button variant={view === 'glass-chat' ? 'contained' : 'outlined'} onClick={() => setView('glass-chat')}>Material Glass Chat</Button>
            </ButtonGroup>
          </Box>
        </Stack>
      </Box>
      <Box sx={{ width: '100%', maxWidth: '100vw', minWidth: 0, overflowX: 'hidden' }}>
        {view === 'theme-lab' ? <ThemeLab /> : view === 'shadcn-mui' ? <ExactMaiaDemo /> : <GlassChatDemo />}
      </Box>
    </Box>
  </>
}

ReactDOM.createRoot(document.getElementById('root')!).render(<React.StrictMode><App /></React.StrictMode>)
