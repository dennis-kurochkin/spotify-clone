import { MenuItem } from '@chakra-ui/react'
import { ReactNode } from 'react'
import { Box, Link } from '@chakra-ui/layout'
import NextLink from 'next/link'

type ProfileBadgeMenuItemProps<TType = 'link' | 'button'> = TType extends 'link'
  ? {
    type: TType
    children: ReactNode
    href: string
  } : {
    type: TType
    children: ReactNode
    onClick: () => void
  }

const ProfileBadgeMenuItem = (props: ProfileBadgeMenuItemProps) => {
  const { type, children } = props

  const menuItem = (
    <MenuItem
      as={Box}
      sx={{
        paddingY: '10px',
        color: 'var(--colors-white)',
        fontSize: 'var(--font-size-400)',
        borderRadius: '4px',
        cursor: 'pointer',
        _hover: {
          background: 'var(--colors-background-200)',
        },
        _focus: {
          background: 'var(--colors-background-200)',
        },
      }}
      onClick={type === 'button' ? props.onClick : () => {}}
    >
      {children}
    </MenuItem>
  )

  return type === 'link' ? (
    <NextLink
      href={props.href}
      passHref
    >
      <Link>
        {menuItem}
      </Link>
    </NextLink>
  ) : menuItem
}

export default ProfileBadgeMenuItem
