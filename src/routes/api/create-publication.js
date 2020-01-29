
import {create} from './_create'
// import {post as createTag} from './create-collection'
// import got from 'got'

export const post = create('publications')

// async function getTags (req) {
//   const response = await got(`${process.env.API_SERVER}tags`, {
//     headers: {
//       Authorization: `Bearer ${req.user.token}`
//     }
//   }).json();
//   return response
// } 

// async function addTag (token, id, tagId) {
//   const response = await got.put(`${id}tags/${tagId}`, {
//     headers: {
//       "content-type": "application/ld+json",
//       Authorization: `Bearer ${token}`
//     }
//   }).json();
//   return response
// }


// // This needs to create the publication, the collections, add collections to pub (put /publications/:pubId/tags/:tagId)
// const createPub = create('publications')
// export async function post(req, res, next) {
//   const publication = await createPub(req, res)
//   const tags = await getTags(req)
//   // Get list of existing tags
//   for (const tag of req.body.tags) {
//     // check if tag exists, if not create
//     let existing = tags.find(existing => existing.name === tag.name)
//     if (!existing) {
//       try {
//         existing = await createTag({user: req.user, body: tag}, {json: () => {}, status: () => {}})
//         // add result to tag list
//       } catch {}
//       tags.push(existing)
//     }
//     // Add existing to pub using existing.id
//     await addTag(req.user.token, publication.id, existing.id)
//   }
//   return res.json(publication)
// }
