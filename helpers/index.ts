import { ApiError } from '../types'

export const isApiError = (error: unknown): error is ApiError => {
  return !!(error && typeof error === 'object' && 'message' in error)
}

export const getApiErrorMessage = (error: unknown, fallbackMessage: string): string => {
  return isApiError(error) ? error.message : fallbackMessage
}

export const logError = (error: unknown) => {
  console.error('[SBOTIFY-LOG]', error)
}
