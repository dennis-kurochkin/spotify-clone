import { Box } from '@chakra-ui/layout'
import type { ReactElement } from 'react'

const PlayerLayout = ({ children }: { children: ReactElement }) => {
  return (
    <Box>
      hello world
      {children}
    </Box>
  )
}

export default PlayerLayout
