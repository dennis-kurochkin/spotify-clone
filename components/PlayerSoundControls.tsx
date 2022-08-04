import { RangeSlider, RangeSliderFilledTrack, RangeSliderThumb, RangeSliderTrack } from '@chakra-ui/react'
import { Box } from '@chakra-ui/layout'
import { FiVolume2 } from 'react-icons/fi'

const PlayerSoundControls = () => {
  return (
    <Box sx={{
      display: 'flex',
      gap: '12px',
      alignItems: 'center',
    }}
    >
      <FiVolume2 fontSize={20} />
      <RangeSlider
        role={'group'}
        value={[0]}
        min={0}
        max={100}
        step={1}
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
