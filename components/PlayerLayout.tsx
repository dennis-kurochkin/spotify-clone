import { Box } from '@chakra-ui/layout'
import type { ReactElement } from 'react'
import Sidebar from './Sidebar'
import ProfileBadge from './ProfileBadge'

const PlayerLayout = ({ children }: { children: ReactElement }) => {
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
        as="aside"
        sx={{
          overflow: 'hidden',
        }}
      >
        <Sidebar />
      </Box>
      <Box
        as="main"
        sx={{
          overflow: 'auto',
          backgroundColor: 'var(--colors-background-400)',
        }}
      >
        <ProfileBadge name="John Doe" />
        {children}
      </Box>
      <Box
        as="footer"
        sx={{
          gridColumn: '1 / span 2',
        }}
      >
        footer
      </Box>
    </Box>
  )
}

export default PlayerLayout
