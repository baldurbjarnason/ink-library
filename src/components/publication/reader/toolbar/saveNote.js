
import {getToken} from '../../../../getToken'

export async function saveNote (note) {
  await window.fetch(`/api/notes`, {
    method: 'POST',
    credentials: "include",
    headers: {
      "csrf-token": getToken(),
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(note),
  })
}