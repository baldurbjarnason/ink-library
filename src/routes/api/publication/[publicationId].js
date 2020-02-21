
import got from "got";
import friendlyWords from 'friendly-words';
import ISO6391 from 'iso-639-1'

function friendlyName (type) {
  const index = Math.floor(Math.random() * Math.floor(friendlyWords[type].length));
  const word = friendlyWords[type][index].charAt(0).toUpperCase() + friendlyWords[type][index].slice(1)
  return word
}

function note () {
  const number = Math.floor(Math.random() * Math.floor(100));
  const result = {type: "TextualBody", purpose: "commenting"}
  const body = []
  for (let index = 0; index < number; index++) {
    body.push(`${friendlyName('predicates')} ${friendlyName('objects')}`)
  }
  result.value = body.join(' ')
  return result
}
function notes () {
  const result = []
  for (let index = 0; index < 10; index++) {
    result.push({body: [note()]})
  }
  return result

}

// Make a list of fake notes: motivation, lang, id, body

// This needs to filter by workspace
export async function get(req, res, next) {
  const url = `${process.env.API_SERVER}publications/${req.params.publicationId}`
  const response = await got(url, {
    headers: {
      Authorization: `Bearer ${req.user.token}`
    }
  }).json();
  if (!response.inLanguage) {
    response.inLanguage = ['en', 'en-gb', 'is']
  }
  if (response.inLanguage) {
    response.inLanguage = [].concat(response.inLanguage).map(code => {
      return {
        code,
        english: ISO6391.getName(code),
        native: ISO6391.getNativeName(code)
      }
    })
  }
  response.keywords = response.keywords || []
  response.replies = notes()
  res.json(response);
}