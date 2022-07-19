import { Avatar, Menu, MenuButton, MenuList, Skeleton } from '@chakra-ui/react'
import { Box, Text } from '@chakra-ui/layout'
import { MdArrowDropDown, MdPersonOutline } from 'react-icons/md'
import classNames from 'classnames'
import styles from './ProfileBadge.module.css'
import ProfileBadgeMenuItem from './ProfileBadgeMenuItem'
import { useApiMe } from '../hooks/useApi'

interface Props {
  avatarURL?: string
}

const ProfileBadge = ({ avatarURL }: Props) => {
  const { user, isLoading } = useApiMe()

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
                icon={<MdPersonOutline size={'24px'} />}
                sx={{
                  width: '28px',
                  height: '28px',
                }}
                mr={'10px'}
              />
              <Text className={styles.name}>
                {!isLoading && !!user ? user.name : (
                  <Skeleton
                    as={'span'}
                    display={'inline-block'}
                    width={'54px'}
                    height={'16px'}
                    mt={'4px'}
                  />
                )}
              </Text>
              <MdArrowDropDown
                className={classNames([isOpen && styles.iconRotated])}
                size={'24px'}
              />
            </Box>
          </MenuButton>
          <MenuList
            minWidth={'200px'}
            backgroundColor={'var(--colors-background-300)'}
            padding={'4px'}
            boxShadow={'lg'}
          >
            <ProfileBadgeMenuItem href={'/profile'}>
              Profile
            </ProfileBadgeMenuItem>
            <ProfileBadgeMenuItem href={'/logout'}>
              Log out
            </ProfileBadgeMenuItem>
          </MenuList>
        </>
      )}
    </Menu>
  )
}

export default ProfileBadge
