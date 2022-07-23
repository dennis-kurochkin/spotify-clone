import { Box, Text } from '@chakra-ui/layout'
import PlayerButton from '~/components/PlayerButton'
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
      <Box>
        <Box className={styles.actionsRow}>
          <PlayerButton
            size={'sm'}
            colorScheme={'white'}
          />
        </Box>
      </Box>
      <div />
    </Box>
  )
}

export default PlayerBar
