import friendlyWords from 'friendly-words'
import {collections} from './collections.js'

const workspaces = ['all', 'research', 'teaching', 'public', 'personal']

const publicationTypes = [
  'Publication',
  'Article',
  'Blog',
  'Book',
  'Chapter',
  'Collection',
  'Comment',
  'Conversation',
  'Course',
  'Dataset',
  'Drawing',
  'Episode',
  'Manuscript',
  'Map',
  'MediaObject',
  'MusicRecordig',
  'Painting',
  'Photograph',
  'Play',
  'Poster',
  'PublicationIssue',
  'PublicationVolume',
  'Review',
  'ShortStory',
  'Thesis',
  'VisualArtwork',
  'WebContent'
]

function friendlyName (type) {
  const index = Math.floor(Math.random() * Math.floor(friendlyWords[type].length));
  const word = friendlyWords[type][index].charAt(0).toUpperCase() + friendlyWords[type][index].slice(1)
  return word
}
function workspace () {
  const index = Math.floor(Math.random() * Math.floor(workspaces.length));
  return workspaces[index]
}
const library = {
  tags: collections,
  totalItems: 100,
  items: []
}
for (let index = 0; index < 100; index++) {
  const tagNo = Math.floor(Math.random() * Math.floor(5));
  const pubType = Math.floor(Math.random() * Math.floor(publicationTypes.length));
  const item = {
    type: publicationTypes[pubType],
    name: `${friendlyName('predicates')} ${friendlyName('predicates')} ${friendlyName('objects')} ${friendlyName('collections')}`,
    id: `https://example.com/${index}`,
    json: {
      workspace: workspace()
    },
    author: [{
      name: `${friendlyName('predicates')} ${friendlyName('objects')}`,
      type: "Person"
    }],
    resources: [{
      href: "/img/placeholder-cover.jpg",
      rel: ["cover"]
    }],
    tags:[],
    updated: "05/12/2019"
  };
  for (let index = 0; index < tagNo; index++) {
    const tagIndex = Math.floor(Math.random() * Math.floor(collections.length));
    item.tags.push(collections[tagIndex])
  }
  library.items.push(item)
}
export async function get(req, res, next) {
  res.setHeader('Content-Type', 'application/json');
  const result = Object.assign({}, library)
  if (req.query.stack) {
    result.items = library.items.filter(item => item.tags.map(tag => tag.name).indexOf(req.query.stack) !== -1)
  } else if (req.query.workspace) {
    result.items = library.items.filter(item => item.tags.map(tag => tag.json.workspace).indexOf(req.query.workspace) !== -1)
  }
  res.end(JSON.stringify(result));
}