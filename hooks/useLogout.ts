import { logout } from '~/lib/mutations'
import { useRouter } from 'next/router'
import { useAppDispatch } from '~/hooks/useStore'

const useLogout = () => {
  const router = useRouter()
  const dispatch = useAppDispatch()
  let isRedirecting = false

  return async () => {
    if (!isRedirecting) {
      isRedirecting = true

      dispatch({ type: 'RESET' })
      await logout()
      await router.push('/signin')

      isRedirecting = false
    }
  }
}

export default useLogout
