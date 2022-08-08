import { IconButton, RangeSlider, RangeSliderFilledTrack, RangeSliderThumb, RangeSliderTrack } from '@chakra-ui/react'
import { Box } from '@chakra-ui/layout'
import { FiVolume, FiVolume1, FiVolume2, FiVolumeX } from 'react-icons/fi'
import { useAppDispatch, useAppSelector } from '~/hooks/useStore'
import { playerSlice } from '~/store/player'
import { IconType } from 'react-icons'
import { useState } from 'react'

const getVolumeIcon = (volume: number): IconType => {
  if (volume >= 0.7) {
    return FiVolume2
  } if (volume >= 0.2) {
    return FiVolume1
  } if (volume > 0) {
    return FiVolume
  }

  return FiVolumeX
}

const PlayerSoundControls = () => {
  const { volume } = useAppSelector((state) => state.player)
  const [volumeBefore, setVolumeBefore] = useState(volume)
  const dispatch = useAppDispatch()
  const IconComponent: IconType = getVolumeIcon(volume)

  const handleSeekStartEnd = () => {
    if (volume) {
      setVolumeBefore(volume)
    }
  }

  const handleSeek = ([seekValue]: number[]) => {
    dispatch(playerSlice.actions.setVolume(seekValue))
  }

  const handleToggle = () => {
    dispatch(playerSlice.actions.setVolume(volume ? 0 : volumeBefore))
  }

  return (
    <Box
      sx={{
        display: 'flex',
        gap: '12px',
        alignItems: 'center',
      }}
    >
      <IconButton
        variant={'unstyled'}
        aria-label={volume > 0 ? 'Mute' : 'Unmute'}
        icon={(
          <IconComponent
            fontSize={20}
          />
        )}
        sx={{
          minWidth: 0,
          color: 'var(--colors-gray-400)',
          _hover: {
            color: 'var(--colors-white)',
          },
        }}
        onClick={handleToggle}
      />
      <RangeSlider
        role={'group'}
        value={[volume]}
        min={0}
        max={1}
        step={0.01}
        defaultValue={[0]/* eslint-disable-next-line jsx-a11y/aria-proptypes */}
        aria-label={['Thumb']}
        sx={{
          position: 'relative',
          width: '92px',
        }}
        _before={{
          content: '""',
          position: 'absolute',
          left: '-10px',
          top: '-14px',
          width: 'calc(100% + 20px)',
          height: 'calc(100% + 20px)',
        }}
        onChangeStart={handleSeekStartEnd}
        onChangeEnd={handleSeekStartEnd}
        onChange={handleSeek}
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
    </Box>
  )
}

export default PlayerSoundControls
