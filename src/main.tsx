import React, { useState } from 'react'
import ReactDOM from 'react-dom/client'
import { Box, Button, ButtonGroup, CssBaseline, Stack, Typography } from '@mui/material'
import ThemeLab from './ThemeLab'
import ShadcnMuiDemo from './ShadcnMuiDemo'

type DemoView = 'theme-lab' | 'shadcn-mui'

function App() {
  const [view, setView] = useState<DemoView>('theme-lab')

  return <>
    <CssBaseline />
    <Box sx={{ position: 'sticky', top: 0, zIndex: 2000, bgcolor: '#09090b', color: '#fafafa', borderBottom: '1px solid #27272a' }}>
      <Stack direction={{ xs: 'column', sm: 'row' }} alignItems={{ sm: 'center' }} justifyContent="space-between" gap={1} sx={{ px: { xs: 1.5, md: 2.5 }, py: 1 }}>
        <Box>
          <Typography sx={{ fontSize: 13, fontWeight: 700, lineHeight: 1.2 }}>MUI Design Playground</Typography>
          <Typography sx={{ fontSize: 11, color: '#a1a1aa', mt: .25 }}>Compare two approaches without losing either demo</Typography>
        </Box>
        <ButtonGroup size="small" sx={{ '& .MuiButton-root': { textTransform: 'none', borderColor: '#3f3f46', color: '#fafafa', minHeight: 32 }, '& .MuiButton-contained': { bgcolor: '#fafafa', color: '#09090b', '&:hover': { bgcolor: '#e4e4e7' } } }}>
          <Button variant={view === 'theme-lab' ? 'contained' : 'outlined'} onClick={() => setView('theme-lab')}>Theme Lab</Button>
          <Button variant={view === 'shadcn-mui' ? 'contained' : 'outlined'} onClick={() => setView('shadcn-mui')}>Shadcn-style MUI</Button>
        </ButtonGroup>
      </Stack>
    </Box>
    {view === 'theme-lab' ? <ThemeLab /> : <ShadcnMuiDemo />}
  </>
}

ReactDOM.createRoot(document.getElementById('root')!).render(<React.StrictMode><App /></React.StrictMode>)
