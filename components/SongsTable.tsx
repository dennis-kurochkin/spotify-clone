import { Box, Text } from '@chakra-ui/layout'
import { Song } from '@prisma/client'
import { Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react'
import { BiTime } from 'react-icons/bi'
import { getFormattedSongDate, getFormattedSongDuration } from '~/helpers/song'
import styles from './SongsTable.module.scss'

interface SongsTableProps {
  songs: (Song & { artist: { id: number, name: string } })[]
}

const SongsTable = ({ songs }: SongsTableProps) => {
  return (
    <Box>
      <Table
        variant={'unstyled'}
        size={'sm'}
      >
        <Thead className={styles.tableHead}>
          <Tr
            sx={{
              borderBottom: '1px solid',
              borderColor: 'gray.800',
            }}
          >
            <Th
              sx={{
                width: '40px',
                textAlign: 'right',
              }}
            >
              #
            </Th>
            <Th>
              Title
            </Th>
            <Th>
              Date added
            </Th>
            <Th>
              <BiTime
                size={'18px'}
                style={{ marginBottom: '-4px' }}
              />
            </Th>
          </Tr>
        </Thead>
        <Tbody className={styles.tableBody}>
          <Tr aria-hidden>
            <Td
              colSpan={4}
              paddingY={'8px'}
              aria-hidden
            />
          </Tr>
          {songs.map((song, index) => (
            <Tr
              key={song.id}
              className={styles.songRow}
            >
              <Td>
                {index + 1}
              </Td>
              <Td>
                <Text>
                  {song.name}
                </Text>
                <Text>
                  {song.artist.name}
                </Text>
              </Td>
              <Td>
                {getFormattedSongDate(song.createdAt)}
              </Td>
              <Td>
                {getFormattedSongDuration(song.duration)}
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  )
}

export default SongsTable
