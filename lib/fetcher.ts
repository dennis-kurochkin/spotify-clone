export const fetcher = <T>(url: string, data?: T) => {
  return fetch(`${window.location.origin}/api${url}`, {
    method: data ? 'POST' : 'GET',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(data),
  })
}

export default function fetcherSWR(url: string, data = undefined) {
  return fetcher(url, data).then((response) => response.json())
}
