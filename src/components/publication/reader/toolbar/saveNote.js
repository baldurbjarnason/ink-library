
import {getToken} from '../../../../getToken'

export async function saveNote (note) {
  const response = await window.fetch(`/api/notes`, {
    method: 'POST',
    credentials: "include",
    headers: {
      "csrf-token": getToken(),
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(note),
  })
  return response.json()
}