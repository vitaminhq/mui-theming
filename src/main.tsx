import React, { useState } from 'react'
import ReactDOM from 'react-dom/client'
import { Box, Button, ButtonGroup, CssBaseline, GlobalStyles, Stack, Typography } from '@mui/material'
import ThemeLab from './ThemeLab'
import ExactMaiaDemo from './ExactMaiaDemo'

type DemoView = 'theme-lab' | 'shadcn-mui'

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
        <Stack direction={{ xs: 'column', sm: 'row' }} alignItems={{ sm: 'center' }} justifyContent="space-between" gap={1} sx={{ px: { xs: 1.5, md: 2.5 }, py: 1 }}>
          <Box>
            <Typography sx={{ fontSize: 13, fontWeight: 700, lineHeight: 1.2 }}>MUI Design Playground</Typography>
            <Typography sx={{ fontSize: 11, color: '#a1a1aa', mt: .25 }}>Compare two approaches without losing either demo</Typography>
          </Box>
          <ButtonGroup size="small" sx={{ '& .MuiButton-root': { textTransform: 'none', borderColor: '#3f3f46', color: '#fafafa', minHeight: 32 }, '& .MuiButton-contained': { bgcolor: '#fafafa', color: '#09090b', '&:hover': { bgcolor: '#e4e4e7' } } }}>
            <Button variant={view === 'theme-lab' ? 'contained' : 'outlined'} onClick={() => setView('theme-lab')}>Theme Lab</Button>
            <Button variant={view === 'shadcn-mui' ? 'contained' : 'outlined'} onClick={() => setView('shadcn-mui')}>Exact Maia / MUI</Button>
          </ButtonGroup>
        </Stack>
      </Box>
      <Box sx={{ width: '100%', maxWidth: '100vw', minWidth: 0, overflowX: 'hidden' }}>
        {view === 'theme-lab' ? <ThemeLab /> : <ExactMaiaDemo />}
      </Box>
    </Box>
  </>
}

ReactDOM.createRoot(document.getElementById('root')!).render(<React.StrictMode><App /></React.StrictMode>)
