import { Avatar, Menu, MenuButton, MenuList } from '@chakra-ui/react'
import { Box, Text } from '@chakra-ui/layout'
import { MdArrowDropDown } from 'react-icons/md'
import classNames from 'classnames'
import styles from './ProfileBadge.module.css'
import ProfileBadgeMenuItem from './ProfileBadgeMenuItem'

interface Props {
  name: string
  avatarURL: string
}

const ProfileBadge = ({ name, avatarURL }: Props) => {
  return (
    <Menu>
      {({ isOpen }) => (
        <>
          <MenuButton
            className={classNames([styles.button, isOpen && styles.buttonFocused])}
          >
            <Box className={styles.badge}>
              <Avatar
                src={avatarURL}
                size="sm"
                name={name}
                mr="10px"
              />
              <Text className={styles.name}>
                {name}
              </Text>
              <MdArrowDropDown
                className={classNames([isOpen && styles.iconRotated])}
                size="24px"
              />
            </Box>
          </MenuButton>
          <MenuList
            minWidth="200px"
            backgroundColor="var(--colors-background-300)"
            paddingX="8px"
          >
            <ProfileBadgeMenuItem href="/profile">
              Profile
            </ProfileBadgeMenuItem>
            <ProfileBadgeMenuItem href="/logout">
              Log out
            </ProfileBadgeMenuItem>
          </MenuList>
        </>
      )}
    </Menu>
  )
}

export default ProfileBadge
