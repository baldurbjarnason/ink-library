import friendlyWords from 'friendly-words'
import {collections} from './collections.js'

const workspaces = ['all', 'research', 'teaching', 'public', 'personal']

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
  const item = {
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
    tags:[]
  };
  for (let index = 0; index < tagNo; index++) {
    const tagIndex = Math.floor(Math.random() * Math.floor(collections.length));
    item.tags.push(collections[tagIndex])
  }
  library.items.push(item)
}
export async function get(req, res, next) {
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(library));
}