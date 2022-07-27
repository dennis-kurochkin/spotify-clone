import { Box, Text } from '@chakra-ui/layout'
import styles from '~/components/PlayerActions.module.scss'
import PlayerButton from '~/components/PlayerButton'
import { TbArrowsShuffle, TbRepeat, TbRepeatOff } from 'react-icons/tb'
import { MdSkipNext, MdSkipPrevious } from 'react-icons/md'
import { CSSObject,
  IconButton,
  RangeSlider,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  RangeSliderTrack } from '@chakra-ui/react'
import ReactHowler from 'react-howler'
import { useAppDispatch, useAppSelector } from '~/hooks/useStore'
import { MutableRefObject, useEffect, useRef, useState } from 'react'
import { playerSlice } from '~/store/player'
import { getFormattedSongDuration } from '~/helpers/song'

const getActionIconButtonStyles = (isActive?: boolean): CSSObject => ({
  display: 'flex',
  justifyContent: 'center',
  color: isActive ? 'green.700' : 'var(--colors-gray-400)',
  minWidth: '32px',
  height: '32px',
  _hover: {
    color: isActive ? 'green.500' : 'var(--colors-white)',
  },
})

const PlayerActions = () => {
  const dispatch = useAppDispatch()
  const howler: MutableRefObject<ReactHowler | null> = useRef(null)
  const { isPlaying, activeSong, activeSongs: songs } = useAppSelector((state) => state.player)
  const [isRepeating, setRepeating] = useState(false)
  const [isShuffling, setShuffling] = useState(false)
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (activeSong) {
      setIndex(songs.findIndex((song) => song.id === activeSong.id))
    }
  }, [activeSong, songs])

  const handlePlay = (isPlayingValue: boolean) => {
    dispatch(playerSlice.actions.setPlaying(isPlayingValue))
  }

  const handlePrev = () => {
    if (index !== -1) {
      dispatch(playerSlice.actions.setActiveSong(songs[index - 1] ?? songs[songs.length - 1]))
    }
  }

  const handleNext = () => {
    if (index !== -1) {
      dispatch(playerSlice.actions.setActiveSong(songs[index + 1] ?? songs[0]))
    }
  }

  const handleShuffle = () => {
    setShuffling((state) => !state)
  }

  const handleRepeat = () => {
    setRepeating((state) => !state)
  }

  const handleHowlerNext = () => {
    handleNext()
  }

  return (
    <Box>
      {!!activeSong && (
        <ReactHowler
          ref={howler}
          src={activeSong?.url ?? ''}
          playing={isPlaying}
          volume={0.1}
          html5
          onEnd={handleHowlerNext}
        />
      )}
      <Box className={styles.actionsRow}>
        <IconButton
          variant={'unstyled'}
          sx={getActionIconButtonStyles(isShuffling)}
          fontSize={'20px'}
          aria-label={'Toggle shuffle'}
          icon={<TbArrowsShuffle />}
          onClick={handleShuffle}
        />
        <IconButton
          variant={'unstyled'}
          sx={getActionIconButtonStyles()}
          fontSize={'28px'}
          aria-label={'Play previous'}
          icon={<MdSkipPrevious />}
          onClick={handlePrev}
        />
        <PlayerButton
          isPlaying={isPlaying}
          size={'sm'}
          colorScheme={'white'}
          className={styles.playerButton}
          onTogglePlay={handlePlay}
        />
        <IconButton
          variant={'unstyled'}
          sx={getActionIconButtonStyles()}
          fontSize={'28px'}
          aria-label={'Play next'}
          icon={<MdSkipNext />}
          onClick={handleNext}
        />
        <IconButton
          variant={'unstyled'}
          sx={getActionIconButtonStyles(isRepeating)}
          fontSize={'20px'}
          aria-label={'Toggle repeat'}
          icon={isRepeating ? <TbRepeat /> : <TbRepeatOff />}
          onClick={handleRepeat}
        />
      </Box>
      <Box className={styles.sliderRow}>
        <Text className={styles.timeCaption}>
          0:00
        </Text>
        <RangeSlider
          role={'group'}
          min={0}
          max={100}
          step={0.1}
          defaultValue={[0]/* eslint-disable-next-line jsx-a11y/aria-proptypes */}
          aria-label={['Thumb']}
          sx={{ position: 'relative' }}
          _before={{
            content: '""',
            position: 'absolute',
            left: '-10px',
            top: '-14px',
            width: 'calc(100% + 20px)',
            height: 'calc(100% + 28px)',
          }}
        >
          <RangeSliderTrack sx={{ background: 'var(--colors-gray-500)' }}>
            <RangeSliderFilledTrack
              sx={{ background: 'var(--colors-white)' }}
              _groupHover={{ background: 'var(--chakra-colors-green-700)' }}
            />
          </RangeSliderTrack>
          <RangeSliderThumb
            index={0}
            sx={{
              opacity: '0',
              width: '12px',
              height: '12px',
              _active: {
                opacity: 1,
              },
            }}
            _groupHover={{ opacity: '1' }}
          />
        </RangeSlider>
        <Text className={styles.timeCaption}>
          {activeSong ? getFormattedSongDuration(activeSong.duration) : ''}
        </Text>
      </Box>
    </Box>
  )
}

export default PlayerActions
