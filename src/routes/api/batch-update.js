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
  }
  // If delete, delete ids one by one.
  // If update, update id one by one.
  // const response = await got(`${process.env.API_SERVER}tags`, {
  //   headers: {
  //     Authorization: `Bearer ${req.user.token}`
  //   }
  // }).json();
  res.json({type: 'success'});
}