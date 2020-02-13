
import got from "got";
import friendlyWords from 'friendly-words';
import ISO6391 from 'iso-639-1'

function friendlyName (type) {
  const index = Math.floor(Math.random() * Math.floor(friendlyWords[type].length));
  const word = friendlyWords[type][index].charAt(0).toUpperCase() + friendlyWords[type][index].slice(1)
  return word
}

function keywords () {
  const number = Math.floor(Math.random() * Math.floor(16));
  const result = []
  for (let index = 0; index < number; index++) {
    result.push(`${friendlyName('predicates')} ${friendlyName('objects')}`)
  }
  return result
}

// This needs to filter by workspace
export async function get(req, res, next) {
  const url = `${process.env.API_SERVER}publications/${req.params.publicationId}`
  const response = await got(url, {
    headers: {
      Authorization: `Bearer ${req.user.token}`
    }
  }).json();
  response.keywords = keywords();
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
  res.json(response);
}