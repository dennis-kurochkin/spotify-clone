import { Box, Text } from '@chakra-ui/layout'
import PlayerActions from '~/components/PlayerActions'
import styles from './PlayerBar.module.scss'

const PlayerBar = () => {
  return (
    <Box className={styles.player}>
      <Box>
        <Box className={styles.songInfoContainer}>
          <Text className={styles.songName}>Song name</Text>
          <Text className={styles.artistName}>Artist name</Text>
        </Box>
      </Box>
      <PlayerActions />
      <Box />
    </Box>
  )
}

export default PlayerBar
