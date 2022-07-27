import { Box, Text } from '@chakra-ui/layout'
import PlayerActions from '~/components/PlayerActions'
import { useAppSelector } from '~/hooks/useStore'
import styles from './PlayerBar.module.scss'

const PlayerBar = () => {
  const activeSong = useAppSelector((state) => state.player.activeSong)

  return (
    <Box className={styles.player}>
      <Box>
        {!!activeSong && (
          <Box className={styles.songInfoContainer}>
            <Text className={styles.songName}>{activeSong.name}</Text>
            <Text className={styles.artistName}>{activeSong.artist.name}</Text>
          </Box>
        )}
      </Box>
      <PlayerActions />
      <Box />
    </Box>
  )
}

export default PlayerBar
