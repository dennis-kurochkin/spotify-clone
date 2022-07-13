import { Avatar, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react'
import { Box, Text } from '@chakra-ui/layout'

import { MdArrowDropDown } from 'react-icons/md'
import styles from './ProfileBadge.module.css'

interface Props {
  name: string
}

const ProfileBadge = ({ name }: Props) => {
  return (
    <Menu>
      <MenuButton
        className={styles.button}
      >
        <Box className={styles.badge}>
          <Avatar
            src="https://bit.ly/sage-adebayo"
            size="sm"
            name={name}
            mr={2}
          />
          <Text className={styles.name}>
            {name}
          </Text>
          <MdArrowDropDown size="24px" />
        </Box>
      </MenuButton>
      <MenuList
        minWidth="200px"
        backgroundColor="var(--colors-background-300)"
      >
        <MenuItem
          sx={{
            color: 'white',
          }}
        >
          Profile
        </MenuItem>
        <MenuItem
          sx={{
            color: 'white',
          }}
        >
          Log out
        </MenuItem>
      </MenuList>
    </Menu>
  )
}

export default ProfileBadge
