import { Box } from '@chakra-ui/layout'
import type { ReactNode } from 'react'
import PlayerBar from '~/components/PlayerBar'
import Sidebar from './Sidebar'
import ProfileBadge from './ProfileBadge'

const PlayerLayout = ({ children }: { children: ReactNode }) => {
  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: '250px 1fr',
        gridTemplateRows: '1fr 90px',
        width: '100vw',
        height: '100vh',
      }}
    >
      <Box
        as={'aside'}
        sx={{
          overflow: 'hidden',
        }}
      >
        <Sidebar />
      </Box>
      <Box
        as={'main'}
        sx={{
          overflow: 'auto',
          backgroundColor: 'var(--colors-background-400)',
        }}
      >
        <ProfileBadge />
        {children}
      </Box>
      <Box
        sx={{
          gridColumn: '1 / span 2',
        }}
      >
        <PlayerBar />
      </Box>
    </Box>
  )
}

export default PlayerLayout
