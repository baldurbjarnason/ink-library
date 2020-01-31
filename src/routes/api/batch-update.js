// We need a batch update endpoint:
//  Goes through the items, one by one.
//    Changes type
//    Adds authors
//    Adds collections (if necessary)
//    Adds workspaces (if necessary)


import got from "got";

export async function post(req, res, next) {
  if (req.body.action === "delete") {
    const ids = req.body.items.map(item => item.id)
    let responses = []
    for (const id of ids) {
      try {
        const response = await got.delete(id, {
          headers: {
            Authorization: `Bearer ${req.user.token}`
          }
        }).json();
        responses = responses.concat(response)
      } catch (err) {
        responses = responses.concat(err.response)
      }
    }
    return res.json(responses)
  } else {
    console.log(req.body)
    // Check workspace, if there is one, add
    const ids = req.body.items.map(item => item.id)
    let responses = []
    for (const id of ids) {
      try {
        if (req.body["chooseWorkspace-public"]) {
          const response = await addWorkspace(req.body["chooseWorkspace-public"], id, req.user.token);
          responses = responses.concat(response)
        }
        if (req.body["chooseWorkspace-teaching"]) {
          const response = await addWorkspace(req.body["chooseWorkspace-teaching"], id, req.user.token);
          responses = responses.concat(response)
        }
        if (req.body["chooseWorkspace-research"]) {
          const response = await addWorkspace(req.body["chooseWorkspace-research"], id, req.user.token);
          responses = responses.concat(response)
        }
        if (req.body["chooseWorkspace-personal"]) {
          const response = await addWorkspace(req.body["chooseWorkspace-personal"], id, req.user.token);
          responses = responses.concat(response)
        }
      } catch (err) {
        console.log(err)
        responses = responses.concat(err.response.body)
      }
      let patch
      if (req.body.pubType !== 'none') {
        patch = {
          type: req.body.pubType
        }
      }
      if (req.body.updateAddAuthors) {
        patch = Object.assign({}, patch, {
          author: req.body.updateAddAuthors.split(',').map(author => author.trim())
        })
      }
      if (patch) {
        try {
          const response = await got.patch(id, {
            headers: {
              "content-type": "application/ld+json",
              Authorization: `Bearer ${req.user.token}`
            },
            json: patch
          }).json();
          responses = responses.concat(response)
        } catch (err) {
          console.log(err)
          responses = responses.concat(err.response.body)
        }
      }
    }
    return res.json(responses)
    // if change collection, add pub to collection one by one.
    // if change type/add author create change objects for PATCH
  }
}

function addWorkspace (workspace, id, token) {
  return got.put(`${id}tags/${workspace}`, {
    headers: {
      "content-type": "application/ld+json",
      Authorization: `Bearer ${token}`
    }
  }).json();
}