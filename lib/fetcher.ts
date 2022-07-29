export const fetcher = <T>(url: string, data?: T) => {
  return fetch(`${window.location?.origin}/api${url}`, {
    method: data ? 'POST' : 'GET',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(data),
  })
}

export default async function fetcherSWR(url: string, data = undefined) {
  const response = await fetcher(url, data)

  if (!response.ok) {
    throw response
  }

  return response.json()
}
