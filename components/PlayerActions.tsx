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
import { fetcher } from '~/lib/fetcher'
import { useToast } from '~/hooks/useToast'

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
  const { isPlaying, volume, activeSong, playlistSongs: songs } = useAppSelector((state) => state.player)
  const [isRepeating, setRepeating] = useState(false)
  const [isShuffling, setShuffling] = useState(false)
  const [isSeeking, setIsSeeking] = useState(false)
  const [index, setIndex] = useState(0)
  const [seek, setSeek] = useState(0)
  const [duration, setDuration] = useState(0)
  const toast = useToast()
  const howlerRef: MutableRefObject<ReactHowler | null> = useRef(null)
  const isRepeatingRef: MutableRefObject<typeof isRepeating> = useRef(isRepeating)
  const isShufflingRef: MutableRefObject<typeof isShuffling> = useRef(isShuffling)
  const indexRef: MutableRefObject<typeof index> = useRef(index)

  useEffect(() => {
    if (activeSong) {
      setIndex(songs.findIndex((song) => song.id === activeSong.id))
      setSeek(0)
      setDuration(activeSong.duration)
    }
  }, [activeSong, songs])

  useEffect(() => {
    let timerId = -1

    if (isPlaying && !isSeeking) {
      const f = () => {
        setSeek(howlerRef.current?.seek() ?? 0)
        timerId = requestAnimationFrame(f)
      }

      timerId = requestAnimationFrame(f)

      return () => cancelAnimationFrame(timerId)
    }

    if (timerId !== -1) {
      cancelAnimationFrame(timerId)
    }
  }, [isPlaying, isSeeking])

  useEffect(() => {
    isRepeatingRef.current = isRepeating
  }, [isRepeating])

  useEffect(() => {
    isShufflingRef.current = isShuffling
  }, [isShuffling])

  useEffect(() => {
    indexRef.current = index
  }, [index])

  const handlePlay = async (isPlayingValue: boolean) => {
    if (activeSong && songs) {
      dispatch(playerSlice.actions.setPlaying(isPlayingValue))
    } else if (isPlayingValue) {
      dispatch(playerSlice.actions.setPlaying(true))

      try {
        const response = await fetcher('/playlist/song')
        const playlist = await response.json()

        if (playlist) {
          dispatch(playerSlice.actions.setActiveSong(playlist.songs[0]))
          dispatch(playerSlice.actions.setPlaylist({
            playlistId: playlist.id,
            playlistSongs: playlist.songs,
          }))
        } else {
          toast({
            title: 'No playlists found',
            description: 'Please, try playing music from playlist page',
            status: 'error',
          })
          throw new Error()
        }
      } catch (error) {
        dispatch(playerSlice.actions.setPlaying(false))
      }
    }
  }

  const handlePrev = () => {
    if (index !== -1) {
      dispatch(playerSlice.actions.setActiveSong(songs[index - 1] ?? songs[songs.length - 1]))
    }
  }

  const handleNext = () => {
    if (indexRef.current === -1) {
      return
    }

    if (isShufflingRef.current) {
      const randomIndex = Math.floor(Math.random() * songs.length)

      if (randomIndex === indexRef.current) {
        handleNext()
        return
      }

      dispatch(playerSlice.actions.setActiveSong(songs[randomIndex]))
    } else {
      dispatch(playerSlice.actions.setActiveSong(songs[indexRef.current + 1] ?? songs[0]))
    }
  }

  const handleShuffle = () => {
    setShuffling((state) => !state)
  }

  const handleRepeat = () => {
    setRepeating((state) => !state)
  }

  const handleSeek = ([seekValue]: number[]) => {
    setSeek(seekValue)
  }

  const handleSeekStart = () => {
    setIsSeeking(true)
  }

  const handleSeekEnd = () => {
    howlerRef.current?.seek(seek)
    setIsSeeking(false)
  }

  const handleEnd = () => {
    if (isRepeatingRef.current) {
      howlerRef.current?.seek(0)
      setSeek(0)
    } else {
      handleNext()
    }
  }

  const handleLoad = () => {
    setDuration(howlerRef.current?.duration() ?? 0)
  }

  return (
    <Box>
      {!!activeSong && (
        <ReactHowler
          ref={howlerRef}
          src={activeSong.url}
          playing={isPlaying}
          volume={volume}
          html5
          onEnd={handleEnd}
          onLoad={handleLoad}
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
          {activeSong ? getFormattedSongDuration(seek) : ''}
        </Text>
        <RangeSlider
          role={'group'}
          value={[seek]}
          isDisabled={!duration}
          min={0}
          max={duration || 100}
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
            height: 'calc(100% + 20px)',
          }}
          onChange={handleSeek}
          onChangeStart={handleSeekStart}
          onChangeEnd={handleSeekEnd}
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
          {activeSong ? getFormattedSongDuration(duration) : ''}
        </Text>
      </Box>
    </Box>
  )
}

export default PlayerActions
