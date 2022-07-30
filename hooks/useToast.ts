import { useToast as useChakraToast, UseToastOptions } from '@chakra-ui/react'

export const useToast = () => {
  const toast = useChakraToast()

  return (options: UseToastOptions) => {
    toast({
      ...options,
      position: 'top',
      isClosable: true,
    })
  }
}
